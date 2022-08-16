import { Category } from 'src/category/entities/category.entity';
import { ChatRoom } from 'src/chat/entities/chat-room.entity';
import { Region } from 'src/region/entities/region.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '../enums/status.enum';
import { ProductImage } from './product-image.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'char', length: 30 })
  title: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'varchar', length: 500 })
  content: string;

  @Column({ type: 'enum', enum: Status, nullable: true })
  status: string;

  @Column()
  views: number;

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToOne(() => Region, (region) => region.products)
  region: Region;

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  images: ProductImage[];

  @OneToMany(() => ChatRoom, (chatRoom) => chatRoom.product)
  chatRooms: ChatRoom[];

  @ManyToMany(() => User)
  @JoinTable({
    name: 'product_like',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
  })
  likedUsers: User[];
}
