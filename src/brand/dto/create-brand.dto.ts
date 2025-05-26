import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({ type: String, example: 'Bosch' })
  @IsString()
  name: string;

  @ApiProperty({ type: String, example: 'Bosch' })
  @IsString()
  @IsOptional()
  name_ru?: string;

  @ApiProperty({ type: String, example: 'Bosch' })
  @IsString()
  @IsOptional()
  name_eng?: string;
}
