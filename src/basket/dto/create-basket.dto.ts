import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderType } from '@prisma/client';
import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class CreateBasketDto {
  @ApiPropertyOptional({
    example: 2,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  productId: number;

  @ApiPropertyOptional({
    example: 1,
  })
  @IsInt()
  @IsPositive()
  toolsId: number;

  @ApiPropertyOptional({
    example: 1,
  })
  @IsInt()
  @IsPositive()
  levelId: number;

  @ApiProperty({
    example: 100,
  })
  @IsInt()
  @IsPositive()
  totalPrice: number;

  @ApiProperty({
    enum: OrderType,
    example: OrderType.HOUR,
  })
  @IsString()
  @IsNotEmpty()
  timeUnit: OrderType;

  @ApiProperty({
    example: 5,
  })
  @IsInt()
  @IsPositive()
  workTime: number;
}
