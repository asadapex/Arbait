import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: String, example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ type: String, example: 'johndoe@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, example: 'password123' })
  @IsString()
  @MinLength(4)
  @MaxLength(32)
  password: string;

  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  @Min(1)
  regionId: number;

  @ApiProperty({ enum: UserRole, example: UserRole.USER_FIZ })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({ type: String, example: 'image link' })
  @IsOptional()
  @IsString()
  image?: string;
}
