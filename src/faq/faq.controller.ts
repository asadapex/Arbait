import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/decorators/role-decorator';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createFaqDto: CreateFaqDto) {
    return this.faqService.create(createFaqDto);
  }

  @Get()
  findAll() {
    return this.faqService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.faqService.findOne(+id);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto) {
    return this.faqService.update(+id, updateFaqDto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.faqService.remove(+id);
  }
}
