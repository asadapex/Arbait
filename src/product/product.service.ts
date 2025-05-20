import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductDto) {
    try {
      const levels = await this.prisma.level.findMany({
        where: { id: { in: data.levels } },
      });
      if (levels.length !== data.levels.length) {
        throw new NotFoundException({
          message: 'One or more levels not found',
        });
      }

      const newPrd = await this.prisma.product.create({
        data: {
          ...data,
          levels: { connect: data.levels.map((id) => ({ id })) },
        },
      });
      return newPrd;
    } catch (error) {
      if (error != InternalServerErrorException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException({
        message: 'Internal server error',
      });
    }
  }

  async findAll(query: any) {
    try {
      const { search = '', sortName = 'asc', limit = 10, page = 1 } = query;

      const take = Number(limit);
      const skip = (Number(page) - 1) * take;

      const where: Prisma.ProductWhereInput = search
        ? {
            name: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          }
        : {};

      const all = await this.prisma.product.findMany({
        where,
        orderBy: {
          name: sortName.toLowerCase() === 'desc' ? 'desc' : 'asc',
        },
        skip,
        take,
        include: { levels: true },
      });

      const total = await this.prisma.product.count({ where });

      return {
        data: all,
        meta: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / take),
        },
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException({
        message: 'Internal server error',
      });
    }
  }

  async findOne(id: number) {
    try {
      const one = await this.prisma.product.findUnique({ where: { id } });
      if (!one) {
        throw new NotFoundException({ message: 'Product not found' });
      }
      return one;
    } catch (error) {
      if (error != InternalServerErrorException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException({
        message: 'Internal server error',
      });
    }
  }

  async update(id: number, data: UpdateProductDto) {
    try {
      const one = await this.prisma.product.findUnique({ where: { id } });
      if (!one) {
        throw new NotFoundException({ message: 'Product not found' });
      }
      const updated = await this.prisma.product.update({
        where: { id },
        data: { ...data, levels: { set: data.levels?.map((id) => ({ id })) } },
      });
      return updated;
    } catch (error) {
      if (error != InternalServerErrorException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException({
        message: 'Internal server error',
      });
    }
  }

  async remove(id: number) {
    try {
      const one = await this.prisma.product.findUnique({ where: { id } });
      if (!one) {
        throw new NotFoundException({ message: 'Product not found' });
      }
      const deleted = await this.prisma.product.delete({ where: { id } });
      return deleted;
    } catch (error) {
      if (error != InternalServerErrorException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException({
        message: 'Internal server error',
      });
    }
  }
}
