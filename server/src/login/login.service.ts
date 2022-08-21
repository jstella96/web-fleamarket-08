import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class LoginService {
  async checkLogin(userId: number) {
    const user = await User.createQueryBuilder()
      .select()
      .where(`id=${userId}`)
      .getOne();
    return user;
  }

  async mockLogin() {
    const user = await User.createQueryBuilder()
      .select()
      .where(`id=1 and name='배달이'`)
      .getOne();
    return user;
  }
}
