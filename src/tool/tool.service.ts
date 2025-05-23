import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ToolService {
  constructor(private readonly prisma: PrismaService) {}

  generateSixDigitCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async create(data: CreateToolDto) {
    try {
      const brand = await this.prisma.brand.findUnique({
        where: { id: data.brandId },
      });
      if (!brand) {
        throw new NotFoundException({ message: 'Brand not found' });
      }

      const size = await this.prisma.size.findUnique({
        where: { id: data.sizeId },
      });
      if (!size) {
        throw new NotFoundException({ message: 'Size not found' });
      }

      const capacity = await this.prisma.capacity.findUnique({
        where: { id: data.capacityId },
      });
      if (!capacity) {
        throw new NotFoundException({ message: 'Capacity not found' });
      }

      const newTool = await this.prisma.tools.create({
        data: { ...data, code: this.generateSixDigitCode() },
      });
      return newTool;
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

      const where: Prisma.ToolsWhereInput = search
        ? {
            name: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          }
        : {};

      const all = await this.prisma.tools.findMany({
        where,
        orderBy: {
          name: sortName.toLowerCase() === 'desc' ? 'desc' : 'asc',
        },
        skip,
        take,
        include: { size: true, capacity: true, brand: true },
      });

      const total = await this.prisma.tools.count({ where });

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
      if (error != InternalServerErrorException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException({
        message: 'Internal server error',
      });
    }
  }

  async findOne(id: number) {
    try {
      const one = await this.prisma.tools.findUnique({
        where: { id },
        include: { size: true, capacity: true, brand: true },
      });
      if (!one) {
        throw new NotFoundException({ message: 'Tool not found' });
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

  async update(id: number, data: UpdateToolDto) {
    try {
      const one = await this.prisma.tools.findUnique({ where: { id } });
      if (!one) {
        throw new NotFoundException({ message: 'Tool not found' });
      }

      if (data.brandId) {
        const brand = await this.prisma.brand.findUnique({
          where: { id: data.brandId },
        });
        if (!brand) {
          throw new NotFoundException({ message: 'Brand not found' });
        }
      }

      if (data.sizeId) {
        const size = await this.prisma.size.findUnique({
          where: { id: data.sizeId },
        });
        if (!size) {
          throw new NotFoundException({ message: 'Size not found' });
        }
      }

      if (data.capacityId) {
        const capacity = await this.prisma.capacity.findUnique({
          where: { id: data.capacityId },
        });
        if (!capacity) {
          throw new NotFoundException({ message: 'Capacity not found' });
        }
      }

      const updated = await this.prisma.tools.update({
        where: { id },
        data,
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
      const one = await this.prisma.tools.findUnique({ where: { id } });
      if (!one) {
        throw new NotFoundException({ message: 'Tool not found' });
      }

      const deleted = await this.prisma.tools.delete({ where: { id } });
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
