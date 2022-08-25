import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { EventEmitter } from 'node:events';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateChatContentDto } from './dto/create-chat-content.dto';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { ChatContent } from './entities/chat-content.entity';
import { ChatRoom } from './entities/chat-room.entity';

const chatEventEmitter = new EventEmitter();

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

    return chatRooms.filter((chatRoom) =>
      chatRoom.seller.id === userId
        ? chatRoom.isSellerActive
        : chatRoom.isBuyerActive
    );
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

    await ChatRoom.createQueryBuilder('chatRoom')
      .where(`id=${chatRoomId}`)
      .update({ isSellerActive: true, isBuyerActive: true })
      .execute();

    delete chatContent.chatRoom;

    chatEventEmitter.emit(`${chatRoomId}`, chatContent);

    return chatContent;
  }

  async createConnection(chatRoomId: number, res: Response) {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache',
    });

    const chatListener = (data) => {
      res.write('data: ' + JSON.stringify(data) + '\n\n');
    };

    const eventName = `${chatRoomId}`;
    chatEventEmitter.addListener(eventName, chatListener);

    setTimeout(() => {
      chatEventEmitter.removeListener(eventName, chatListener);
      res.write('event: bye\ndata: bye-bye\n\n');
      res.end();
    }, 1000 * 60 * 5);
  }

  async leaveChatRoom(chatRoomId: number, userId: number) {
    const chatRoom = await ChatRoom.createQueryBuilder('chatRoom')
      .where(`chatRoom.id=${chatRoomId}`)
      .leftJoinAndSelect('chatRoom.product', 'product')
      .leftJoinAndSelect('product.user', 'user')
      .getOne();

    let result;
    const isUserSeller = chatRoom.product.user.id === userId;
    if (isUserSeller) {
      if (!chatRoom.isBuyerActive) {
        result = await ChatRoom.delete({ id: chatRoomId });
      } else {
        result = await ChatRoom.createQueryBuilder('chatRoom')
          .where(`seller.id=${userId}`)
          .update({ isSellerActive: false })
          .execute();
      }
    } else {
      if (!chatRoom.isSellerActive) {
        result = await ChatRoom.delete({ id: chatRoomId });
      } else {
        result = await ChatRoom.createQueryBuilder('chatRoom')
          .where(`buyer.id=${userId}`)
          .update({ isBuyerActive: false })
          .execute();
      }
    }

    return result;
  }
}
