import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, isPhoneNumber, IsString } from 'class-validator';

export class CreateGeneralInfoDto {
  @ApiProperty({ example: 'link' })
  @IsString()
  link: string;

  @ApiProperty({ example: 'johndoe@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+998901234567' })
  @IsString()
  phone: string;
}
