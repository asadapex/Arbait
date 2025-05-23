import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerService } from 'src/mailer/mailer.service';
import { totp } from 'otplib';
import * as bcrypt from 'bcrypt';
import { VerifyUserDto } from './dto/verify-user.dto';
import { ResendOtpAuthDto } from './dto/resend-otp.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserStatus } from '@prisma/client';
import { Request } from 'express';

totp.options = {
  step: 120,
  digits: 5,
};

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailerService,
    private readonly jwt: JwtService,
  ) {}

  generateOtpHtml(code: string): string {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #4CAF50; text-align: center;">🔐 Service</h2>
      <p style="font-size: 16px;">Assalomu alaykum,</p>
      <p style="font-size: 16px;">Sizning bir martalik parolingiz (OTP):</p>
      <div style="font-size: 30px; font-weight: bold; color: #333; text-align: center; margin: 20px 0;">
        ${code}
      </div>
      <p style="font-size: 14px; color: #555;">Kod 2 daqiqa davomida amal qiladi. Kodni hech kim bilan bo'lishmang.</p>
      <hr />
      <p style="font-size: 12px; color: #999;">Agar bu xabar siz kutmagan bo‘lsangiz, iltimos, e'tiborsiz qoldiring.</p>
    </div>
    `;
  }

  async findUser(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });
    return user;
  }

  async register(data: CreateUserDto) {
    try {
      const user = await this.findUser(data.email);
      if (user) {
        throw new BadRequestException({ message: 'User already exists' });
      }

      const otp = totp.generate(data.email + 'apex');
      await this.mailService.sendMail(
        data.email,
        '🔐 Your OTP Code',
        this.generateOtpHtml(`${otp}`),
      );

      const hash = bcrypt.hashSync(data.password, 10);

      const newUser = await this.prisma.user.create({
        data: { ...data, status: UserStatus.PENDING, password: hash },
      });

      return { message: 'Verification code sent to your email' };
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

  async verify(dto: VerifyUserDto) {
    try {
      const user = await this.findUser(dto.email);
      if (!user) {
        throw new NotFoundException({ message: 'User not found' });
      }

      const match = totp.verify({ token: dto.otp, secret: dto.email + 'apex' });
      if (!match) {
        throw new BadRequestException({ message: 'Wrong code' });
      }

      await this.prisma.user.update({
        where: { id: user.id },
        data: { status: UserStatus.ACTIVE },
      });

      return { message: 'Verified' };
    } catch (error) {
      console.log(error);
      if (error != InternalServerErrorException) {
        throw error;
      }
      throw new InternalServerErrorException({
        message: 'Internal server error',
      });
    }
  }

  async resendOtp(dto: ResendOtpAuthDto) {
    try {
      const user = await this.findUser(dto.email);
      if (!user) {
        throw new NotFoundException({ message: 'User not found' });
      }

      const otp = totp.generate(dto.email + 'apex');
      await this.mailService.sendMail(
        dto.email,
        '🔐 Your OTP Code',
        this.generateOtpHtml(`${otp}`),
      );

      return { message: 'Verification code sent to your email' };
    } catch (error) {
      if (error != InternalServerErrorException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException({
        message: 'Something went wrong',
      });
    }
  }

  async login(dto: LoginUserDto, req: Request) {
    try {
      const user = await this.findUser(dto.email);
      if (!user) {
        throw new NotFoundException({ message: 'User not found' });
      }

      const match = bcrypt.compareSync(dto.password, user.password);
      if (!match) {
        throw new BadRequestException({ message: 'Wrong password' });
      }

      if (user.status == 'PENDING') {
        throw new BadRequestException({
          message: "You haven't verified yet please verify",
        });
      }

      let session = await this.prisma.session.findFirst({
        where: { userId: user.id, ip: req.ip },
      });
      if (!session) {
        if (req.ip) {
          await this.prisma.session.create({
            data: { userId: user.id, ip: req.ip },
          });
        }
      }

      const token = this.jwt.sign({ id: user.id, role: user.role });
      return { token };
    } catch (error) {
      if (error != InternalServerErrorException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException({
        message: 'Something went wrong',
      });
    }
  }

  async allSession(req: Request) {
    let user = req['user-id'];
    let session = await this.prisma.session.findMany({
      where: { userId: user },
    });
    return { session };
  }
}
