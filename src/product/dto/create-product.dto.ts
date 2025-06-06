import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsBoolean, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Santexnik',
  })
  @IsString()
  name: string;

  @ApiProperty({ type: String, example: 'Santexnik' })
  @IsString()
  @IsOptional()
  name_ru?: string;

  @ApiProperty({ type: String, example: 'Santexnik' })
  @IsString()
  @IsOptional()
  name_eng?: string;

  @ApiProperty({
    example: 'image link',
  })
  @IsOptional()
  image?: string;

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  isActive: boolean;
}
