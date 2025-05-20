import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSizeDto {
  @ApiProperty({ type: String, example: 'XL' })
  @IsString()
  size: string;
}
