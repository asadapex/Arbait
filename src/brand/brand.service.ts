import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateBrandDto) {
    try {
      const brand = await this.prisma.brand.findFirst({
        where: { name: data.name },
      });
      if (brand) {
        throw new BadRequestException({ message: 'Brand already exists' });
      }
      const newBrand = await this.prisma.brand.create({ data });
      return newBrand;
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
      const all = await this.prisma.brand.findMany();
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
      const one = await this.prisma.brand.findUnique({ where: { id } });
      if (!one) {
        throw new NotFoundException({ message: 'Brand not found' });
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

  async update(id: number, data: UpdateBrandDto) {
    try {
      const one = await this.prisma.brand.findUnique({ where: { id } });
      if (!one) {
        throw new NotFoundException({ message: 'Brand not found' });
      }
      const updated = await this.prisma.level.update({
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
      const one = await this.prisma.brand.findUnique({ where: { id } });
      if (!one) {
        throw new NotFoundException({ message: 'Brand not found' });
      }
      const deleted = await this.prisma.brand.delete({ where: { id } });
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
