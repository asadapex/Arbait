import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class MasterRatingDto {
  @ApiProperty({
    example: 4.5,
  })
  @IsNumber()
  star: number;

  @ApiProperty({
    example: 'masterId',
  })
  @IsNumber()
  masterId: number;
}

export class CreateCommentDto {
  @ApiProperty({
    example: 'Nice my nigga',
  })
  @IsString()
  message: string;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  orderId: number;

  @ApiProperty({
    example: [
      {
        star: 4.5,
        masterId: 1,
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MasterRatingDto)
  masterStar: MasterRatingDto[];
}
