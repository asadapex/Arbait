import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BasketService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateBasketDto, request: Request) {
    let user = request['user-id'];

    let product = await this.prisma.product.findUnique({
      where: { id: data.productId },
    });
    if (!product) {
      throw new NotFoundException('Not found Product');
    }
    let tool = await this.prisma.tools.findUnique({
      where: { id: data.toolsId },
    });
    if (!tool) {
      throw new NotFoundException('Not found Tool');
    }
    let level = await this.prisma.level.findUnique({
      where: { id: data.levelId },
    });
    if (!level) {
      throw new NotFoundException('Not found level');
    }

    let basket = await this.prisma.basket.create({
      data: { ...data, userId: user },
    });
    return basket;
  }

  async findOne(request: Request) {
    let userId = request['user-id'];
    let basket = await this.prisma.basket.findMany({
      where: { userId: userId },
    });
    return basket;
  }

  async update(id: number, updateBasketDto: UpdateBasketDto) {
    try {
      let updatedBasket = await this.prisma.basket.update({
        where: { id },
        data: { ...updateBasketDto },
      });
      return { updatedBasket };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: number) {
    const deleted = await this.prisma.basket.delete({ where: { id } });
    return deleted;
  }
}
