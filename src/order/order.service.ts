import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { OrderStatus, PaymentType } from '@prisma/client';
import { TgBotService } from 'src/tg_bot/tg_bot.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private tgBotService: TgBotService,
  ) {}

  async create(createOrderDto: CreateOrderDto, request: Request) {
    const ownerId = request['user-id'];
    if (!ownerId) throw new UnauthorizedException();

    const { orderProduct, ...orderData } = createOrderDto;
    if (!orderProduct || orderProduct.length === 0) {
      throw new BadRequestException('Maxsulotlarni tanlang');
    }

    for (const item of orderProduct) {
      const tool = await this.prisma.tools.findUnique({
        where: { id: item.toolId },
      });
      if (!tool) {
        throw new NotFoundException(`Tool with id ${item.toolId} not found`);
      }
      if (tool.quantity < item.count) {
        throw new BadRequestException(
          `Tool "${tool.name}" stolkda ${tool.quantity} dona bor, siz ${item.count} dona talab qildingiz`,
        );
      }

      const level = await this.prisma.level.findUnique({
        where: { id: item.levelId },
      });
      if (!level) {
        throw new NotFoundException(`Level with id ${item.levelId} not found`);
      }

      const product = await this.prisma.product.findUnique({
        where: { id: item.productId },
      });
      if (!product) {
        throw new NotFoundException(
          `Product with id ${item.productId} not found`,
        );
      }
    }

    const [newOrder] = await this.prisma.$transaction([
      this.prisma.order.create({
        data: {
          ...orderData,
          userId: ownerId,
          status: OrderStatus.PENDING,
        },
      }),
    ]);

    const ops = orderProduct.flatMap((item) => [
      this.prisma.orderProduct.create({
        data: {
          orderId: newOrder.id,
          toolId: item.toolId,
          levelId: item.levelId,
          productId: item.productId,
          workingTime: item.workingTime,
          price: item.price,
          count: item.count,
          timeUnit: item.timeUnit,
          isActive: true,
        },
      }),
      this.prisma.tools.update({
        where: { id: item.toolId },
        data: {
          quantity: { decrement: item.count },
        },
      }),
    ]);

    await this.prisma.$transaction(ops);

    await this.tgBotService.sendOrderDetailsToUser(ownerId, newOrder.id);

    return newOrder;
  }

  async findAll() {
    let orders = await this.prisma.order.findMany({
      include: {
        orderProduct: true,
      },
    });
    return { orders };
  }

  async findOne(id: number) {
    let order = await this.prisma.order.findUnique({ where: { id } });
    return order;
  }

  async update(id: number, data: UpdateOrderDto) {
    const existingOrder = await this.prisma.order.findUnique({ where: { id } });
    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    // const updatedOrder = await this.prisma.order.update({
    //   where: { id },
    //   data: { ...data },
    // });

    return { message: 'updated' };
  }

  async remove(id: number) {
    const existingOrder = await this.prisma.order.findUnique({ where: { id } });
    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    const deleted = await this.prisma.order.delete({ where: { id } });
    return deleted;
  }
}
