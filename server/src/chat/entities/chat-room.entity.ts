import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatContent } from './chat-content.entity';

@Entity()
export class ChatRoom extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isSellerActive: boolean;

  @Column()
  isBuyerActive: boolean;

  @Column({ type: 'datetime', precision: 6 })
  sellerLastActiveTime: Date;

  @Column({ type: 'datetime', precision: 6 })
  buyerLastActiveTime: Date;

  @ManyToOne(() => User, (user) => user.sellerChatRooms)
  seller: User;

  @ManyToOne(() => User, (user) => user.buyerChatRooms)
  buyer: User;

  @ManyToOne(() => Product, (product) => product.chatRooms, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @OneToMany(() => ChatContent, (chatContent) => chatContent.chatRoom, {
    eager: true,
  })
  chatContents: ChatContent[];

  unReadContents: ChatContent[];
  lastChat: ChatContent;

  static getChatRoomQuery({
    userId,
    productId,
  }: {
    userId: number;
    productId?: number;
  }) {
    const userCondition = `seller_id=${userId} OR buyer_id=${userId}`;

    return this.createQueryBuilder('chatRoom')
      .leftJoinAndSelect('chatRoom.product', 'product')
      .leftJoinAndSelect('chatRoom.seller', 'seller')
      .leftJoinAndSelect('chatRoom.buyer', 'buyer')
      .where(
        productId !== undefined
          ? `(${userCondition}) AND (product.id=${productId})`
          : userCondition
      )
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
        `chatContents.chat_room_id = chatRoom.id AND (
          (seller.id=${userId}) AND (chatContents.createdAt > chatRoom.seller_last_active_time)   
          OR (buyer.id=${userId}) AND (chatContents.createdAt > chatRoom.buyer_last_active_time)
        )
        `
      )
      .leftJoinAndMapOne(
        'product.author',
        'product.user',
        'author',
        'author.id=product.user_id'
      )
      .loadRelationCountAndMap('product.chatCount', 'product.chatRooms')
      .loadRelationCountAndMap('product.likeCount', 'product.productLikes')
      .leftJoinAndMapOne(
        'product.thumbnail',
        'product.images',
        'thumbnail',
        'thumbnail.id=(SELECT min(id) FROM product_image WHERE product_image.product_id=product.id)'
      )
      .leftJoinAndMapOne(
        'product.isLiked',
        'product.productLikes',
        'isLiked',
        `isLiked.user_id=${userId || null}`
      )
      .leftJoinAndSelect('product.region', 'region');
  }

  static async setActive(userId: number, chatRoom: ChatRoom) {
    if (chatRoom.seller.id === userId) {
      await ChatRoom.createQueryBuilder('chatRoom')
        .where(`id=${chatRoom.id}`)
        .update({
          isSellerActive: true,
          isBuyerActive: true,
          sellerLastActiveTime: new Date(),
        })
        .execute();
    } else {
      await ChatRoom.createQueryBuilder('chatRoom')
        .where(`id=${chatRoom.id}`)
        .update({
          isSellerActive: true,
          isBuyerActive: true,
          buyerLastActiveTime: new Date(),
        })
        .execute();
    }
  }
}
