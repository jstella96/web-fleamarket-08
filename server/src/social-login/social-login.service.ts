import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GithubUser } from 'src/types';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { SocialLoginDto } from './dto/social-login.dto';

@Injectable()
export class SocialLoginService {
  userService = new UserService();

  async login(socialLoginDto: SocialLoginDto) {
    //try {
    const { authorizationCode } = socialLoginDto;
    const githubUser = await getGitHubUser(authorizationCode);
    const { id, name, login } = githubUser;

    let user = await User.createQueryBuilder()
      .select()
      .where(`id=${id}`)
      .getOne();

    if (!user) {
      user = User.create({ id, name: name || login });
      await user.save();
    }

    user = await User.findOne({
      where: { id: user.id },
      relations: { userRegions: true },
    });
    console.log('user', user);

    return this.userService.findUser(user.id);
    // } catch (error) {
    //   throw new HttpException('깃헙 로그인 실패', HttpStatus.UNAUTHORIZED);
    // }
  }
}

async function getGitHubAccessToken(code: string) {
  const {
    data: { access_token },
  } = await axios.post(
    'https://github.com/login/oauth/access_token',
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    },
    { headers: { Accept: 'application/json' } }
  );

  return access_token;
}

async function getGitHubUser(authorizationCode: string) {
  const access_token = await getGitHubAccessToken(authorizationCode);
  const { data: githubUser } = await axios.get<GithubUser>(
    'https://api.github.com/user',
    { headers: { Authorization: `token ${access_token}` } }
  );

  return githubUser;
}
