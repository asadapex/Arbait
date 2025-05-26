import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateSizeDto {
  @ApiProperty({ type: String, example: 'XL' })
  @IsString()
  name: string;

  @ApiProperty({ type: String, example: 'XL' })
  @IsString()
  @IsOptional()
  name_ru?: string;

  @ApiProperty({ type: String, example: 'XL' })
  @IsString()
  @IsOptional()
  name_eng?: string;
}
