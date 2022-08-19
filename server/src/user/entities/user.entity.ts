import { ChatContent } from 'src/chat/entities/chat-content.entity';
import { ChatRoom } from 'src/chat/entities/chat-room.entity';
import { ProductLike } from 'src/product/entities/product-like.entity';
import { Product } from 'src/product/entities/product.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { UserRegion } from './user-region.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'char', length: 20 })
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

  @OneToMany(() => ProductLike, (productLike) => productLike.user)
  productLikes: ProductLike[];

  primaryRegion: UserRegion;
}
