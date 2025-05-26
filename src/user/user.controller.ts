import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { ResendOtpAuthDto } from './dto/resend-otp.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/decorators/role-decorator';
import { RolesGuard } from 'src/role/role.guard';
import { CreateAdminDto } from './dto/create-admin.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('verify')
  verify(@Body() data: VerifyUserDto) {
    return this.userService.verify(data);
  }

  @Post('resend-otp')
  resendOtp(@Body() data: ResendOtpAuthDto) {
    return this.userService.resendOtp(data);
  }

  @Post('login')
  login(@Body() data: LoginUserDto, @Req() req: Request) {
    return this.userService.login(data, req);
  }

  @UseGuards(AuthGuard)
  @Get('my-sessions')
  getSessions(@Req() req: Request) {
    return this.userService.allSession(req);
  }

  @UseGuards(AuthGuard)
  @Delete('session:id')
  removeSession(@Param('id') id: string) {
    return this.userService.deleteSession(+id);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Req() req: Request) {
    return this.userService.me(req);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Post('create-admin')
  async createAdmin(createAdminDto: CreateAdminDto) {
    return this.userService.createAdmin(createAdminDto);
  }
}
