import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMasterDto } from './dto/create-master.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MasterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMasterDto: CreateMasterDto) {
    const { MasterProduct, ...masterData } = createMasterDto;
    let profession = await this.prisma.product.findUnique({
      where: { id: MasterProduct[0].productId },
    });
    if (!profession) {
      throw new NotFoundException('Not found Product');
    }
    let level = await this.prisma.level.findUnique({
      where: { id: MasterProduct[0].levelId },
    });
    if (!level) {
      throw new NotFoundException('Not found level');
    }
    const createdMaster = await this.prisma.master.create({
      data: {
        ...masterData,
      },
    });

    if (MasterProduct && MasterProduct.length > 0) {
      await Promise.all(
        MasterProduct.map((product) =>
          this.prisma.masterProduct.create({
            data: {
              ...product,
              masterId: createdMaster.id,
            },
          }),
        ),
      );
    }
    return createdMaster;
  }

  async findAll(query: any) {
    const fullname = query.fullname?.trim() ?? '';
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    const take = limit;

    const sortOrder = query.sort === 'desc' ? 'desc' : 'asc';

    const [masters, totalCount] = await this.prisma.$transaction([
      this.prisma.master.findMany({
        skip,
        take,
        where: {
          fullname: {
            contains: fullname,
            mode: 'insensitive',
          },
        },
        orderBy: {
          fullname: sortOrder,
        },
        include: {
          MasterStar: true,
          MasterProduct: {
            include: {
              level: true,
              product: true,
            },
          },
        },
      }),
      this.prisma.master.count({
        where: {
          fullname: {
            contains: fullname,
            mode: 'insensitive',
          },
        },
      }),
    ]);

    const mastersWithAvgStar = masters.map((master) => {
      const stars = master.MasterStar;
      const avgStar =
        stars.length > 0
          ? stars.reduce((acc, curr) => acc + curr.star, 0) / stars.length
          : 0;

      return {
        ...master,
        avgStar,
      };
    });

    return {
      data: mastersWithAvgStar,
      totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
    };
  }

  async findOne(id: number) {
    const one = await this.prisma.master.findUnique({
      where: { id },
      include: {
        MasterProduct: {
          include: {
            level: true,
            product: true,
          },
        },
      },
    });
    if (!one) {
      throw new NotFoundException({ message: 'Master not found' });
    }

    return one;
  }

  async update(id: number, updateMasterDto: UpdateMasterDto) {
    const { MasterProduct, ...masterData } = updateMasterDto;

    return await this.prisma.$transaction(async (prisma) => {
      const updatedMaster = await prisma.master.update({
        where: { id },
        data: masterData,
      });

      if (MasterProduct && MasterProduct.length > 0) {
        await prisma.masterProduct.deleteMany({
          where: { masterId: id },
        });

        await Promise.all(
          MasterProduct.map((profession) =>
            prisma.masterProduct.create({
              data: {
                ...profession,
                masterId: id,
              },
            }),
          ),
        );
      }

      return updatedMaster;
    });
  }

  async remove(id: number) {
    try {
      let master = await this.prisma.master.findUnique({ where: { id } });
      if (!master) {
        throw Error('Not found');
      }

      await this.prisma.masterProduct.deleteMany({
        where: { masterId: id },
      });

      await this.prisma.master.delete({
        where: { id },
      });
      return { message: 'Deleted' };
    } catch (error) {
      return { Error: error.message };
    }
  }

  async findByPhone(phone: string, page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const masters = await this.prisma.master.findMany({
      where: {
        phone: phone,
      },
      skip,
      take,
      include: {
        MasterProduct: true,
      },
    });

    const totalCount = await this.prisma.master.count({
      where: {
        phone: phone,
      },
    });

    return {
      data: masters,
      totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    };
  }
}
