import { ApiProperty } from '@nestjs/swagger';

export class CreateCapacityDto {
  @ApiProperty({ type: String, example: '10L' })
  name: string;
}
