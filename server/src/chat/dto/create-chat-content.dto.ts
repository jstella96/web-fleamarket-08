import { ApiProperty } from '@nestjs/swagger';

export class CreateChatContentDto {
  @ApiProperty()
  content: string;
}
