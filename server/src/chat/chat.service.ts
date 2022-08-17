import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  findChatRooms() {
    return {
      id: 0,
      partner: {
        id: '',
        name: '',
      },
      partnerLastActiveTime: new Date(),
      lastActiveTime: new Date(),
      lastChat: {
        content: '',
        userId: '',
        createdAt: new Date(),
      },
      unReadContentsCount: 0,
      thumbnail: '',
    };
  }

  findContent(id: number) {
    return {
      contents: [
        {
          id: 0,
          content: '',
          createdAt: new Date(),
          user: {
            id: '',
            name: '',
          },
        },
      ],
      thumbnail: '',
      title: '',
      price: 0,
      status: '',
    };
  }

  createContent(id: number, createChatDto: CreateChatDto) {
    return { id };
  }
}
