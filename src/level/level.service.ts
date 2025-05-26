import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LevelService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateLevelDto) {
    try {
      const level = await this.prisma.level.findFirst({
        where: { name: data.name },
      });
      if (level) {
        throw new BadRequestException({ message: 'Level already exists' });
      }
      const newLevel = await this.prisma.level.create({ data });
      return newLevel;
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
      const all = await this.prisma.level.findMany();
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
      const one = await this.prisma.level.findUnique({ where: { id } });
      if (!one) {
        throw new NotFoundException({ message: 'Level not found' });
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

  async update(id: number, updateLevelDto: UpdateLevelDto) {
    try {
      const one = await this.prisma.level.findUnique({ where: { id } });
      if (!one) {
        throw new NotFoundException({ message: 'Level not found' });
      }
      const updated = await this.prisma.level.update({
        where: { id },
        data: updateLevelDto,
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
      const one = await this.prisma.level.findUnique({ where: { id } });
      if (!one) {
        throw new NotFoundException({ message: 'Level not found' });
      }
      const deleted = await this.prisma.level.delete({ where: { id } });
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
