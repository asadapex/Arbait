import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ type: Boolean, example: true })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ type: String, example: 'Santexnik' })
  @IsString()
  name: string;

  @ApiProperty({ type: String, example: 'image link' })
  @IsString()
  image: string;

  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  minWorkingHour: number;

  @ApiProperty({ type: Array, example: [1, 2] })
  @IsArray()
  levels: number[];

  @ApiProperty({ type: Number, example: 123 })
  @IsNumber()
  price_hourly: number;

  @ApiProperty({ type: Number, example: 123 })
  @IsNumber()
  price_daily: number;
}
