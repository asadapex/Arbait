import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RegionModule } from './region/region.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailerService } from './mailer/mailer.service';
import { MasterModule } from './master/master.module';
import { JwtModule } from '@nestjs/jwt';
import { LevelModule } from './level/level.module';
import { BrandModule } from './brand/brand.module';
import { SizeModule } from './size/size.module';
import { CapacityModule } from './capacity/capacity.module';
import { ProductModule } from './product/product.module';
import { ToolModule } from './tool/tool.module';
import { OrderModule } from './order/order.module';
import { CommentModule } from './comment/comment.module';
import { BasketModule } from './basket/basket.module';
import { FaqModule } from './faq/faq.module';
import { ContactModule } from './contact/contact.module';
import { GeneralInfoModule } from './generalinfo/generalinfo.module';
import { TgBotModule } from './tg_bot/tg_bot.module';

@Module({
  imports: [
    UserModule,
    RegionModule,
    PrismaModule,
    MasterModule,
    JwtModule.register({
      global: true,
      secret: 'apex',
    }),
    LevelModule,
    BrandModule,
    SizeModule,
    CapacityModule,
    ProductModule,
    ToolModule,
    OrderModule,
    CommentModule,
    BasketModule,
    FaqModule,
    ContactModule,
    GeneralInfoModule,
    TgBotModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailerService],
})
export class AppModule {}
