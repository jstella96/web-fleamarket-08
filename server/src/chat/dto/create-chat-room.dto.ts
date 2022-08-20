import { ApiProperty } from '@nestjs/swagger';

export class CreateChatRoomDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  productId: number;
}
