import { ApiProperty } from '@nestjs/swagger';
import { OrderType, PaymentType } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

class CreateOrderProductDto {
  @IsString()
  isActive: string;

  @ApiProperty({ enum: OrderType, example: OrderType.HOUR })
  @IsEnum(OrderType)
  timeUnit: OrderType;

  @ApiProperty({ example: 5 })
  @IsInt()
  workingTime: number;

  @ApiProperty({ example: 123 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  count: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt()
  toolId?: number;

  @ApiProperty({ example: 2, required: false })
  @IsOptional()
  @IsInt()
  levelId?: number;

  @ApiProperty({ example: 3, required: false })
  @IsOptional()
  @IsInt()
  productId?: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: 450 })
  @IsNumber()
  total: number;

  @ApiProperty({ example: 'Olmazor tumani' })
  @IsString()
  location: string;

  @ApiProperty({ example: 'Faroviy Blok E' })
  @IsString()
  address: string;

  @ApiProperty({ enum: PaymentType, example: PaymentType.CLICK })
  @IsEnum(PaymentType, { message: 'Wrong payment type' })
  paymentType: PaymentType;

  @ApiProperty({ example: true })
  @IsBoolean()
  withDelivery: boolean;

  @ApiProperty({ example: '46-maktab ro`parasidagi dom' })
  @IsString()
  extraComment?: string;

  @ApiProperty({ type: [CreateOrderProductDto] })
  orderProduct: CreateOrderProductDto[];
}
