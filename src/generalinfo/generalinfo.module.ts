import { Module } from '@nestjs/common';
import { GeneralInfoController } from './generalinfo.controller';
import { GeneralInfoService } from './generalinfo.service';

@Module({
  controllers: [GeneralInfoController],
  providers: [GeneralInfoService],
})
export class GeneralInfoModule {}
