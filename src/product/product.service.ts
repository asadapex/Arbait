import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductDto) {
    try {
      const product = await this.prisma.product.create({
        data: { ...data },
      });
      return product;
    } catch (error) {
      throw new BadRequestException(`Error creating product: ${error.message}`);
    }
  }

  async findAll(page: number = 1, limit: number = 10) {
    try {
      const all = await this.prisma.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: {
          masterProfession: true,
          productLevel: true,
          tools: true,
        },
      });

      const totalCount = await this.prisma.product.count();

      return {
        data: all,
        meta: {
          currentPage: page,
          totalPages: Math.ceil(totalCount / limit),
          totalItems: totalCount,
          limit: limit,
        },
      };
    } catch (error) {
      throw new BadRequestException(
        `Error retrieving products: ${error.message}`,
      );
    }
  }

  async findOne(id: number) {
    try {
      const one = await this.prisma.product.findUnique({
        where: { id },
        include: {
          masterProfession: true,
          productLevel: true,
          tools: true,
        },
      });

      if (!one) {
        throw new NotFoundException(`Product not found`);
      }

      return one;
    } catch (error) {
      throw new NotFoundException(`Error retrieving product: ${error.message}`);
    }
  }

  async update(id: number, data: UpdateProductDto) {
    try {
      const updated = await this.prisma.product.update({
        where: { id },
        data: { ...data },
      });
      await this.prisma.basket.deleteMany();
      return updated;
    } catch (error) {
      throw new NotFoundException(`Error updating product: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const deleted = await this.prisma.product.delete({
        where: { id },
      });
      return deleted;
    } catch (error) {
      throw new NotFoundException(`Error deleting product: ${error.message}`);
    }
  }
}
