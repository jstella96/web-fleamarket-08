import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  productId: number;
}
