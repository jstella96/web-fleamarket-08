import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guards';
import { ChatService } from './chat.service';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { ChatRoom } from './entities/chat-room.entity';

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
    // FIXME: 배달이와의 채팅을 위해 임시로 구현한 코드 수정하기
    const userId = request['userId'];
    const { productId } = createChatDto;

    const chatRoom = await ChatRoom.findOneBy({
      seller: { id: 1 },
      product: { id: productId },
    });

    if (chatRoom) return chatRoom;

    return await this.chatService.createChatRoom(userId, createChatDto);
    // return this.chatService.createContent(id, userId, createChatDto);
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

  @Get(':id/connect')
  createConnection(@Param('id') id: number, @Res() res: Response) {
    this.chatService.createConnection(id, res);
  }
}
