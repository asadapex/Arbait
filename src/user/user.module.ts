import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MailerService } from 'src/mailer/mailer.service';

@Module({
  controllers: [UserController],
  providers: [UserService, MailerService],
})
export class UserModule {}
