import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateMasterDto {
  @ApiProperty({ type: String, example: 'John Doe' })
  @IsString()
  fullname: string;

  @ApiProperty({ type: String, example: '+998901234567' })
  @IsString()
  @Matches(/^\+998\d{9}$/, {
    message:
      'Telefon raqam +998 bilan boshlanib, 13 ta belgidan iborat bo‘lishi kerak. Masalan: +998901234567',
  })
  phone: string;

  @ApiProperty({ type: Boolean, example: true })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ type: Number, example: 1991 })
  @IsNumber()
  year: number;

  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  levelId: number;

  @ApiProperty({ type: String, example: 'image link' })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({ type: String, example: 'About master' })
  @IsString()
  about: string;
}
