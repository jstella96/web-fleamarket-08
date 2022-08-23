import { Region } from 'src/region/entities/region.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserRegion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  regionCode: number;

  @ManyToOne(() => User, (user) => user.userRegions)
  user: User;

  @ManyToOne(() => Region, (region) => region.userRegions)
  region: Region;

  @Column()
  isPrimary: boolean;

  static async updateAllPrimaryRegion(userId: number, isPrimary: boolean) {
    return await UserRegion.createQueryBuilder()
      .update()
      .set({ isPrimary })
      .where('user_id = :userId', { userId })
      .execute();
  }
}
