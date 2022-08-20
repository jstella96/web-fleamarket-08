import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth.guards';
import { ChatService } from './chat.service';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';

@UseGuards(AuthGuard)
@ApiTags('chats')
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  findChatRooms(@Req() request: Request) {
    const userId = request['userId'];
    return this.chatService.findChatRooms(userId);
  }

  @Post()
  async createChatRoom(
    @Body() createChatDto: CreateChatRoomDto,
    @Req() request: Request
  ) {
    const userId = request['userId'];
    const { id } = await this.chatService.createChatRoom(userId, createChatDto);
    return this.chatService.createContent(id, userId, createChatDto);
  }

  @Get(':id')
  findContent(@Param('id') id: number) {
    return this.chatService.findContent(id);
  }

  @Post(':id')
  createContent(
    @Param('id') id: number,
    @Body() createChatDto: CreateChatRoomDto,
    @Req() request: Request
  ) {
    const userId = request['userId'];
    return this.chatService.createContent(id, userId, createChatDto);
  }
}
