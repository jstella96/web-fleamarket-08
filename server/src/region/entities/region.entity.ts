import { Product } from 'src/product/entities/product.entity';
import { UserRegion } from 'src/user/entities/user-region.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Region extends BaseEntity {
  @PrimaryColumn()
  code: number;

  @Column({ type: 'char', length: 100 })
  name: string;

  @OneToMany(() => Product, (product) => product.region)
  products: Product[];

  @OneToMany(() => UserRegion, (userRegion) => userRegion.region)
  userRegions: UserRegion[];
}
