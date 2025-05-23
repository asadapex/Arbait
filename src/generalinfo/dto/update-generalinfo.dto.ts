import { PartialType } from '@nestjs/swagger';
import { CreateGeneralInfoDto } from './create-generalinfo.dto';

export class UpdateGeneralinfoDto extends PartialType(CreateGeneralInfoDto) {}
