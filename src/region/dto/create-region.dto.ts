import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateRegionDto {
  @ApiProperty({ type: String, example: 'Toshkent' })
  @IsString()
  name: string;

  @ApiProperty({ type: String, example: 'Tashkent' })
  @IsString()
  @IsOptional()
  name_ru?: string;

  @ApiProperty({ type: String, example: 'Tashkent' })
  @IsString()
  @IsOptional()
  name_eng?: string;
}
