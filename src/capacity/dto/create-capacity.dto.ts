import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCapacityDto {
  @ApiProperty({ type: String, example: '10L' })
  name: string;

  @ApiProperty({ type: String, example: '10L' })
  @IsString()
  @IsOptional()
  name_ru?: string;

  @ApiProperty({ type: String, example: '10L' })
  @IsString()
  @IsOptional()
  name_eng?: string;
}
