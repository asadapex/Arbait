import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createContactDto: CreateContactDto) {
    const contact = await this.prisma.contact.create({
      data: createContactDto,
    });
    return { message: 'Contact created successfully', contact };
  }

  async findAll() {
    const contacts = await this.prisma.contact.findMany();
    return contacts;
  }

  async findOne(id: number) {
    const contact = await this.prisma.contact.findUnique({
      where: { id },
    });
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    return { message: 'Contact retrieved successfully', contact };
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    const existingContact = await this.prisma.contact.findUnique({
      where: { id },
    });
    if (!existingContact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    const updatedContact = await this.prisma.contact.update({
      where: { id },
      data: updateContactDto,
    });
    return { message: 'Contact updated successfully', updatedContact };
  }

  async remove(id: number) {
    const existingContact = await this.prisma.contact.findUnique({
      where: { id },
    });
    if (!existingContact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    await this.prisma.contact.delete({
      where: { id },
    });
    return { message: 'Contact deleted successfully' };
  }
}
