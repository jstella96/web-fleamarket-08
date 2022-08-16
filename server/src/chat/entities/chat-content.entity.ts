import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatRoom } from './chat-room.entity';

@Entity()
export class ChatContent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.chatContents)
  chatRoom: ChatRoom;

  @ManyToOne(() => User, (user) => user.chatContents)
  user: User;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;
}
