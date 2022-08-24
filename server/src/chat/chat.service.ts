import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { emitChat, getChatEmitter, setChatEmitter } from 'src/utils/chat';
import { CreateChatContentDto } from './dto/create-chat-content.dto';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { ChatContent } from './entities/chat-content.entity';
import { ChatRoom } from './entities/chat-room.entity';

@Injectable()
export class ChatService {
  async createChatRoom(buyerId: number, createChatRoomDto: CreateChatRoomDto) {
    const { productId } = createChatRoomDto;
    const product = await Product.findOne({
      where: { id: productId },
      relations: { user: true },
    });
    const { user: seller } = product;

    const nowDate = new Date();
    const chatRoom = ChatRoom.create({
      buyer: {
        id: buyerId,
      },
      seller,
      product,
      isSellerActive: true,
      isBuyerActive: true,
      sellerLastActiveTime: nowDate,
      buyerLastActiveTime: nowDate,
    });
    await chatRoom.save();
    return await ChatRoom.getChatRoomQuery({
      productId,
      userId: buyerId,
    }).getOne();
  }

  async findChatRooms(userId: number, productId?: number) {
    const chatRooms = await ChatRoom.getChatRoomQuery({
      productId,
      userId,
    }).getMany();
    return chatRooms;
  }

  async findChatDetail(userId: number, productId: number) {
    const chatRoom = await ChatRoom.getChatRoomQuery({
      productId,
      userId,
    }).getOne();

    const chatContents = await ChatContent.createQueryBuilder('chatContent')
      .where(`chatContent.chatRoom.id=${chatRoom?.id || null}`)
      .leftJoinAndSelect('chatContent.user', 'user')
      .orderBy('chatContent.createdAt', 'ASC')
      .getMany();

    const product = await Product.getOne(productId);

    return {
      chatContents,
      chatRoom,
      product,
    };
  }

  async createContent(
    chatRoomId: number,
    userId: number,
    createChatContentDto: CreateChatContentDto
  ) {
    const { content } = createChatContentDto;

    const user = await User.createQueryBuilder()
      .select()
      .where(`id=${userId}`)
      .getOne();

    if (!user) return;

    const chatContent = await ChatContent.create({
      chatRoom: { id: chatRoomId },
      user,
      content,
    }).save();

    delete chatContent.chatRoom;

    emitChat(chatRoomId, chatContent);

    return chatContent;
  }

  async createConnection(chatRoomId: number, res: Response) {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache',
    });

    let emitter = getChatEmitter(chatRoomId);
    if (!emitter) {
      emitter = setChatEmitter(chatRoomId);
    }

    emitter.on(`${chatRoomId}`, (data) => {
      res.write('data: ' + JSON.stringify(data) + '\n\n');
    });
  }
}
