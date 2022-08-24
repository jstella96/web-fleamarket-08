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

  @Get('/detail/:productId')
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

  @Get(':id/connect')
  createConnection(@Param('id') id: number, @Res() res: Response) {
    this.chatService.createConnection(id, res);
  }
}
