import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({ type: String, example: 'Bosch' })
  @IsString()
  name: string;
}
