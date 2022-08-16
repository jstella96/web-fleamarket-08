import { ChatContent } from 'src/chat/entities/chat-content.entity';
import { ChatRoom } from 'src/chat/entities/chat-room.entity';
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRegion } from './user-region.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 10 })
  name: string;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @OneToMany(() => ChatRoom, (chatRoom) => chatRoom.seller)
  sellerChatRooms: ChatRoom[];

  @OneToMany(() => ChatRoom, (chatRoom) => chatRoom.buyer)
  buyerChatRooms: ChatRoom[];

  @OneToMany(() => ChatContent, (chatContent) => chatContent.user)
  chatContents: ChatContent[];

  @OneToMany(() => UserRegion, (userRegion) => userRegion.user)
  userRegions: UserRegion[];
}
