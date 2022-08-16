import { Region } from 'src/region/entities/region.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserRegion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userRegions)
  user: User;

  @ManyToOne(() => Region, (region) => region.userRegions)
  region: Region;

  @Column()
  isPrimary: boolean;
}
