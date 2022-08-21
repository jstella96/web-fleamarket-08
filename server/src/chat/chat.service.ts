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
  async findChatRooms(userId: number) {
    //FIXME
    if (!userId) userId = 49304239;
    const chatRooms = await ChatRoom.createQueryBuilder('chatRoom')
      .where('seller_id = :userId OR buyer_id = :userId ', { userId })
      .leftJoinAndMapOne(
        'chatRoom.lastChat',
        'chatRoom.chatContents',
        'contents',
        'contents.id=(SELECT max(id) FROM chat_content where chat_content.chat_room_id = chatRoom.id)'
      )
      .leftJoinAndMapMany(
        'chatRoom.unReadContents',
        'chatRoom.chatContents',
        'chatContents',
        `chatContents.chat_room_id = chatRoom.id and ( 
          (chatRoom.seller_id = ${userId}) and ( chatContents.createdAt >  chatRoom.seller_last_active_time) )  
           or (  chatRoom.buyer_id = ${userId}) and  (chatContents.createdAt > chatRoom.buyer_last_active_time)`
      )
      .leftJoinAndSelect('chatRoom.seller', 'seller')
      .leftJoinAndSelect('chatRoom.buyer', 'buyer')
      .getMany();

    return chatRooms;
  }

  async findContent(chatRoomId: number) {
    const chatContents = await ChatContent.find({
      where: {
        chatRoom: {
          id: chatRoomId,
        },
      },
      join: {
        alias: 'chatContent',
        leftJoinAndSelect: {
          user: 'chatContent.user',
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });

    const chatRoom = await ChatRoom.findOne({
      where: { id: chatRoomId },
      relations: { product: true },
    });

    const product = await Product.findOne({
      select: {
        id: true,
        title: true,
        price: true,
        status: true,
        images: true,
      },
      where: { id: chatRoom.product.id },
      relations: { images: true },
      order: {
        images: {
          id: 'ASC',
        },
      },
    });
    product['thumbnail'] = product.images[0]?.imageUrl || '';
    delete product.images;
    return { contents: [...chatContents], ...product };
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

    const chatContent = await ChatContent.create({
      chatRoom: { id: chatRoomId },
      user,
      content,
    }).save();

    delete chatContent.chatRoom;

    emitChat(chatRoomId, chatContent);

    return chatContent;
  }

  async createChatRoom(buyerId: number, createChatDto: CreateChatRoomDto) {
    const { productId } = createChatDto;
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
    return await chatRoom.save();
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
