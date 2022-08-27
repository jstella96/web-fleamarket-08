import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guards';
import { ChatService } from './chat.service';
import { CreateChatContentDto } from './dto/create-chat-content.dto';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';

@UseGuards(AuthGuard)
@ApiTags('chats')
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async createChatRoom(
    @Body() createChatRoomDto: CreateChatRoomDto,
    @Req() request: Request
  ) {
    const userId = request['userId'];
    return await this.chatService.createChatRoom(userId, createChatRoomDto);
  }

  @ApiQuery({ name: 'productId', type: Number, required: false })
  @Get()
  findChatRooms(
    @Req() request: Request,
    @Query('productId') productId?: number
  ) {
    const userId = request['userId'];
    return this.chatService.findChatRooms(userId, productId);
  }

  @Post('/detail/:productId')
  findChatDetail(
    @Req() request: Request,
    @Param('productId') productId: number
  ) {
    const userId = request['userId'];
    return this.chatService.findChatDetail(userId, productId);
  }

  @Post(':id')
  createContent(
    @Param('id') id: number,
    @Body() createChatContentDto: CreateChatContentDto,
    @Req() request: Request
  ) {
    const userId = request['userId'];
    return this.chatService.createContent(id, userId, createChatContentDto);
  }

  @Post(':id/leave')
  leaveChatRoom(@Param('id') id: number, @Req() request: Request) {
    const userId = request['userId'];
    return this.chatService.leaveChatRoom(id, userId);
  }

  @Get(':id/connect')
  createConnection(
    @Param('id') id: number,
    @Res() res: Response,
    @Req() request: Request
  ) {
    const userId = request['userId'];
    this.chatService.createConnection(id, res, userId);
  }

  @Post(':id/active-time')
  updateActiveTime(@Param('id') id: number, @Req() request: Request) {
    const userId = request['userId'];
    this.chatService.updateActiveTime(id, userId);
  }
}
