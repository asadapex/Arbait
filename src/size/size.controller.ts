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
import { SizeService } from './size.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/role/role.guard';
import { Roles } from 'src/decorators/role-decorator';
import { UserRole } from '@prisma/client';

@Controller('size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createSizeDto: CreateSizeDto) {
    return this.sizeService.create(createSizeDto);
  }

  @Get()
  findAll() {
    return this.sizeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sizeService.findOne(+id);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSizeDto: UpdateSizeDto) {
    return this.sizeService.update(+id, updateSizeDto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sizeService.remove(+id);
  }
}
