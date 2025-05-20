import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateLevelDto {
  @ApiProperty({ type: String, example: 'Junior' })
  @IsString()
  level: string;
}
