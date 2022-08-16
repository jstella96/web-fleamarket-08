import { Product } from 'src/product/entities/product.entity';
import { UserRegion } from 'src/user/entities/user-region.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Region {
  @PrimaryColumn()
  code: number;

  @Column({ type: 'char', length: 50 })
  name: string;

  @OneToMany(() => Product, (product) => product.region)
  products: Product[];

  @OneToMany(() => UserRegion, (userRegion) => userRegion.region)
  userRegions: UserRegion[];
}
