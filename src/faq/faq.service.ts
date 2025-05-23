import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FaqService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFaqDto: CreateFaqDto) {
    const faq = await this.prisma.fAQ.create({
      data: createFaqDto,
    });
    return faq;
  }

  async findAll() {
    const faqs = await this.prisma.fAQ.findMany();
    return faqs;
  }

  async findOne(id: number) {
    const faq = await this.prisma.fAQ.findUnique({
      where: { id },
    });
    if (!faq) {
      throw new NotFoundException(`FAQ with id ${id} not found`);
    }
    return faq;
  }

  async update(id: number, updateFaqDto: UpdateFaqDto) {
    const faq = await this.prisma.fAQ.findUnique({
      where: { id },
    });
    if (!faq) {
      throw new NotFoundException(`FAQ with id ${id} not found`);
    }
    const updatedFaq = await this.prisma.fAQ.update({
      where: { id },
      data: updateFaqDto,
    });
    return updatedFaq;
  }

  async remove(id: number) {
    const faq = await this.prisma.fAQ.findUnique({
      where: { id },
    });
    if (!faq) {
      throw new NotFoundException(`FAQ with id ${id} not found`);
    }
    const deleted = await this.prisma.fAQ.delete({
      where: { id },
    });
    return deleted;
  }
}
