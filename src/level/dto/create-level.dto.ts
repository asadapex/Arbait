import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateLevelDto {
  @ApiProperty({ type: String, example: 'Junior' })
  @IsString()
  name: string;

  @ApiProperty({ type: String, example: 'Junior' })
  @IsString()
  @IsOptional()
  name_ru?: string;

  @ApiProperty({ type: String, example: 'Junior' })
  @IsOptional()
  @IsString()
  name_eng?: string;
}
