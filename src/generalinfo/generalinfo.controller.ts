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
import { GeneralInfoService } from './generalinfo.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/decorators/role-decorator';
import { UserRole } from '@prisma/client';
import { CreateGeneralInfoDto } from './dto/create-generalinfo.dto';
import { UpdateGeneralinfoDto } from './dto/update-generalinfo.dto';

@Controller('general-info')
export class GeneralInfoController {
  constructor(private readonly generalInfoService: GeneralInfoService) {}

  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createGeneralInfoDto: CreateGeneralInfoDto) {
    return this.generalInfoService.create(createGeneralInfoDto);
  }

  @Get()
  findAll() {
    return this.generalInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generalInfoService.findOne(+id);
  }

  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGeneralInfoDto: UpdateGeneralinfoDto,
  ) {
    return this.generalInfoService.update(+id, updateGeneralInfoDto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generalInfoService.remove(+id);
  }
}
