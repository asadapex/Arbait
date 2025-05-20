import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class VerifyUserDto {
  @ApiProperty({ type: String, example: 'johndoe@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, example: '12345' })
  @IsString()
  @MinLength(5)
  @MaxLength(5)
  otp: string;
}
