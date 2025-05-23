import { ApiProperty } from '@nestjs/swagger';

export class CreateFaqDto {
  @ApiProperty({
    example: 'To`lov usullari qanday?',
  })
  question: string;

  @ApiProperty({
    example: 'Click va payme orqali to`lovni amalga oshirsa bo`ladi',
  })
  answer: string;
}
