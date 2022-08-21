import { ChatContent } from 'src/chat/entities/chat-content.entity';
import { EventEmitter } from 'stream';

const chatEmitters = new Map<string, EventEmitter>();

export { getChatEmitter, setChatEmitter, emitChat };

const getChatEmitter = (chatRoomId: number) =>
  chatEmitters.get(`${chatRoomId}`);

function setChatEmitter(chatRoomId: number) {
  const emitter = new EventEmitter();
  chatEmitters.set(`${chatRoomId}`, emitter);
  return emitter;
}

const emitChat = (chatRoomId: number, chatContent: ChatContent) =>
  getChatEmitter(chatRoomId).emit(`${chatRoomId}`, chatContent);
