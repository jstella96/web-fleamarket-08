import { User } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatRoom } from './chat-room.entity';

@Entity()
export class ChatContent extends BaseEntity {
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
