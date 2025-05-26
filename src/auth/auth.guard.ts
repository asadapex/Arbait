import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split(' ')?.[1];

    if (!token) {
      throw new UnauthorizedException({ message: 'Token not provided' });
    }

    try {
      const data = this.jwt.verify(token);
      const session = await this.prisma.session.findFirst({
        where: { userId: data.id, ip: req.ip },
      });
      if (!session) {
        throw new UnauthorizedException();
      }
      req['user-id'] = data.id;
      req['user-role'] = data.role;

      return true;
    } catch (error) {
      throw new UnauthorizedException({ message: 'Wrong credentials' });
    }
  }
}
