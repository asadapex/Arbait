import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGeneralInfoDto } from './dto/create-generalinfo.dto';
import { UpdateGeneralinfoDto } from './dto/update-generalinfo.dto';

@Injectable()
export class GeneralInfoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGeneralInfoDto: CreateGeneralInfoDto) {
    const { link, email, phone } = createGeneralInfoDto;
    return this.prisma.generalInfo.create({
      data: {
        link,
        email,
        phone,
      },
    });
  }

  async findAll() {
    return this.prisma.generalInfo.findMany();
  }

  async findOne(id: number) {
    const generalInfo = await this.prisma.generalInfo.findUnique({
      where: { id },
    });
    if (!generalInfo) {
      throw new NotFoundException(`General info with ID ${id} not found`);
    }
    return generalInfo;
  }

  async update(id: number, updateGeneralInfoDto: UpdateGeneralinfoDto) {
    return this.prisma.generalInfo.update({
      where: { id },
      data: {
        ...updateGeneralInfoDto,
      },
    });
  }

  async remove(id: number) {
    const generalInfo = await this.prisma.generalInfo.findUnique({
      where: { id },
    });

    if (!generalInfo) {
      throw new NotFoundException(`General info with ID ${id} not found`);
    }

    return this.prisma.generalInfo.delete({
      where: { id },
    });
  }
}
