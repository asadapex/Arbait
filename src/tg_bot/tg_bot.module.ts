import { Global, Module } from '@nestjs/common';
import { TgBotService } from './tg_bot.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Global()
@Module({
  providers: [TgBotService, PrismaService],
  exports: [TgBotService],
})
export class TgBotModule {}
