import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 20 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  iconUrl: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
