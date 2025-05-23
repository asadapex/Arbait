import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsUrl,
  IsPhoneNumber,
  IsArray,
  ValidateNested,
  IsInt,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMasterProfessionDto {
  @ApiPropertyOptional({
    example: 2,
  })
  @IsOptional()
  @IsInt()
  minWorkingHours?: number;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  productId: number;

  @ApiProperty({
    example: 3,
  })
  @IsInt()
  experience: number;

  @ApiProperty({
    example: 1,
  })
  @IsInt()
  levelId: number;

  @ApiPropertyOptional({
    example: 13,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price_hour?: number;

  @ApiPropertyOptional({
    example: 100,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price_day?: number;
}

export class CreateMasterDto {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  fullname: string;

  @ApiProperty({
    example: '+998901234567',
  })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiPropertyOptional({
    example: 'image link',
  })
  @IsOptional()
  @IsUrl()
  image?: string;

  @ApiProperty({
    example: 'I`m nigga',
  })
  @IsString()
  about: string;

  @ApiProperty({ type: [CreateMasterProfessionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMasterProfessionDto)
  MasterProduct: CreateMasterProfessionDto[];
}
