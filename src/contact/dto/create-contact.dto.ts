import { IsNotEmpty, IsString, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  surname: string;

  @ApiProperty({ example: '+998901234567' })
  @IsPhoneNumber(undefined)
  phone: string;

  @ApiProperty({ example: 'A. Navoiy' })
  @IsString()
  address: string;

  @ApiProperty({
    example: 'Bironta habar yozing',
  })
  @IsString()
  message: string;
}
