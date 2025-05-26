import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { IsEnum, IsString, IsNumber } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'johndoe@gmail.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  password: string;

  @ApiProperty({ enum: UserRole, example: UserRole.ADMIN })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({ example: 1 })
  @IsNumber()
  regionId: number;
}
