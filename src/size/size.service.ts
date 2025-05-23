import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SizeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSizeDto) {
    try {
      const size = await this.prisma.size.findFirst({
        where: { name: data.name },
      });
      if (size) {
        throw new BadRequestException({ message: 'Size already exists' });
      }
      const newSize = await this.prisma.size.create({ data });
      return newSize;
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

  async findAll() {
    try {
      const all = await this.prisma.size.findMany();
      return all;
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
      const one = await this.prisma.size.findUnique({ where: { id } });
      if (!one) {
        throw new NotFoundException({ message: 'Size not found' });
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

  async update(id: number, data: UpdateSizeDto) {
    try {
      const one = await this.prisma.size.findUnique({ where: { id } });
      if (!one) {
        throw new NotFoundException({ message: 'Size not found' });
      }
      const updated = await this.prisma.size.update({
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
      const one = await this.prisma.size.findUnique({ where: { id } });
      if (!one) {
        throw new NotFoundException({ message: 'Size not found' });
      }
      const deleted = await this.prisma.size.delete({ where: { id } });
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
