import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsInt,
  IsBoolean,
  IsOptional,
  Min,
  MinLength,
  IsUrl,
} from 'class-validator';

export class CreateToolDto {
  @ApiProperty({ example: 'Drel' })
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name: string;

  @ApiProperty({ type: String, example: 'Drel' })
  @IsString()
  @IsOptional()
  name_ru?: string;

  @ApiProperty({ type: String, example: 'Drel' })
  @IsString()
  @IsOptional()
  name_eng?: string;

  @ApiProperty({
    example: 'Karochi ishlatiladida qayerdadur',
  })
  @IsString()
  @MinLength(10, { message: 'Description must be at least 10 characters long' })
  description: string;

  @ApiProperty({ example: 15 })
  @IsNumber()
  @Min(0, { message: 'Hourly price must be a positive number' })
  price: number;

  @ApiProperty({ example: 20 })
  @IsInt()
  @Min(0, { message: 'Quantity must be a non-negative integer' })
  quantity: number;

  @ApiProperty({
    example: 1,
  })
  @IsInt()
  brandId: number;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsInt()
  capacityId?: number;

  @ApiProperty({
    example: 3,
    required: false,
  })
  @IsOptional()
  @IsInt()
  sizeId?: number;

  @ApiProperty({
    example: 'image link',
  })
  @IsOptional()
  @IsString()
  image?: string;
}
