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

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto, request: Request) {
    let ownerId = request['user-id'];

    if (!ownerId) {
      throw new UnauthorizedException();
    }
    if (createOrderDto.orderProduct.length == 0) {
      throw new BadRequestException('Maxsulotlarni tanlang');
    }
    const { orderProduct, ...order } = createOrderDto;

    let tool = await this.prisma.tools.findMany({
      where: { id: orderProduct[0].toolId },
    });
    if (tool) {
      if (!tool) {
        throw new NotFoundException('Not found Tool');
      }
    }
    let Level = await this.prisma.level.findUnique({
      where: { id: orderProduct[0].levelId },
    });
    if (Level) {
      if (!Level) {
        throw new NotFoundException('Not found Level');
      }
    }
    let profession = await this.prisma.product.findUnique({
      where: { id: orderProduct[0].productId },
    });
    if (profession) {
      if (!profession) {
        throw new NotFoundException('Not found Product');
      }
    }

    let newOrder = await this.prisma.order.create({
      data: { ...order, userId: ownerId, status: OrderStatus.PENDING },
    });

    for (let i = 0; i < orderProduct.length; i++) {
      await this.prisma.orderProduct.create({
        data: {
          orderId: newOrder.id,
          ...orderProduct[i],
          isActive: true,
        },
      });
    }

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
