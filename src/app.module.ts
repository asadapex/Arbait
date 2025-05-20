import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RegionModule } from './region/region.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailerService } from './mailer/mailer.service';
import { MasterModule } from './master/master.module';

@Module({
  imports: [UserModule, RegionModule, PrismaModule, MasterModule],
  controllers: [AppController],
  providers: [AppService, MailerService],
})
export class AppModule {}
