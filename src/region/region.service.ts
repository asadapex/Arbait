import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegionService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateRegionDto) {
    try {
      const newRegion = await this.prisma.region.create({ data });
      return newRegion;
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
      const all = await this.prisma.region.findMany();
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
      const one = await this.prisma.region.findUnique({ where: { id } });
      if (!one) {
        throw new NotFoundException({ message: 'Region not found' });
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

  async update(id: number, data: UpdateRegionDto) {
    try {
      const one = await this.prisma.region.findUnique({ where: { id } });
      if (!one) {
        throw new NotFoundException({ message: 'Region not found' });
      }

      const updated = await this.prisma.region.update({ where: { id }, data });
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
      const one = await this.prisma.region.findUnique({ where: { id } });
      if (!one) {
        throw new NotFoundException({ message: 'Region not found' });
      }
      const deleted = await this.prisma.region.delete({ where: { id } });
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
