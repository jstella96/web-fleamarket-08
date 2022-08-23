import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class LoginService {
  async checkLogin(userId: number) {
    const user = await User.createQueryBuilder('user')
      .select()
      .where(`user.id=${userId}`)
      .leftJoinAndSelect('user.userRegions', 'userRegions')
      .leftJoinAndSelect('userRegions.region', 'region')
      .getOne();

    return user;
  }

  async mockLogin() {
    const user = await User.createQueryBuilder('user')
      .select()
      .where(`user.id=1 and user.name='배달이'`)
      .leftJoinAndSelect('user.userRegions', 'userRegions')
      .leftJoinAndSelect('userRegions.region', 'region')
      .getOne();
    return user;
  }
}
