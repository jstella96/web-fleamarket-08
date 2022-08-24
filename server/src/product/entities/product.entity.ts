import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/category/entities/category.entity';
import { ChatRoom } from 'src/chat/entities/chat-room.entity';
import { Region } from 'src/region/entities/region.entity';
import { User } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '../enums/status.enum';
import { ProductImage } from './product-image.entity';
import { ProductLike } from './product-like.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @Column({ type: 'char', length: 30 })
  title: string;

  @ApiProperty()
  @Column({ type: 'decimal' })
  price: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 500 })
  content: string;

  @Column({
    type: 'enum',
    enum: Status,
    nullable: true,
    default: Status.판매중,
  })
  status: string;

  @Column({ default: 0 })
  views: number;

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToOne(() => Region, (region) => region.products)
  region: Region;

  @ApiProperty()
  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  images: ProductImage[];

  @OneToMany(() => ChatRoom, (chatRoom) => chatRoom.product)
  chatRooms: ChatRoom[];

  @OneToMany(() => ProductLike, (productLike) => productLike.product)
  productLikes: ProductLike[];

  static getProductQuery(userId?: number) {
    return this.createQueryBuilder('product')
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
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.region', 'region')
      .leftJoinAndSelect('product.category', 'category')
      .orderBy('product.createdAt', 'DESC')
      .select([
        'product',
        'author',
        'thumbnail',
        'isLiked',
        'images',
        'region',
        'category',
      ]);
  }

  static async getOne(id: number, userId?: number) {
    const product = await Product.getProductQuery(userId)
      .select(['product', 'author', 'isLiked', 'images', 'region', 'category'])
      .where(`product.id=${id}`)
      .getOne();

    product['isLiked'] = product['isLiked'] ? true : false;

    return product;
  }
}
