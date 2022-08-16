import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatContent } from './chat-content.entity';

@Entity()
export class ChatRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isSellerActive: boolean;

  @Column()
  isBuyerActive: boolean;

  @Column()
  sellerLastActiveTime: Date;

  @Column()
  buyerLastActiveTime: Date;

  @ManyToOne(() => User, (user) => user.sellerChatRooms)
  seller: User;

  @ManyToOne(() => User, (user) => user.buyerChatRooms)
  buyer: User;

  @ManyToOne(() => Product, (product) => product.chatRooms)
  product: Product;

  @OneToMany(() => ChatContent, (chatContent) => chatContent.chatRoom)
  chatContents: ChatContent[];
}
