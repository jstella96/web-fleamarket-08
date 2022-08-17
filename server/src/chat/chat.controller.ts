import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@ApiTags('chats')
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  findChatRooms() {
    return this.chatService.findChatRooms();
  }

  @Get(':id')
  findContent(@Param('id') id: number) {
    return this.chatService.findContent(id);
  }

  @Post(':id')
  createContent(@Param('id') id: number, @Body() createChatDto: CreateChatDto) {
    return this.chatService.createContent(id, createChatDto);
  }
}
