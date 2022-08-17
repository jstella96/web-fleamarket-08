import { Injectable } from '@nestjs/common';
import { SocialLoginDto } from './dto/social-login.dto';

@Injectable()
export class SocialLoginService {
  login(socialLoginDto: SocialLoginDto) {
    return {
      id: 0,
      name: '',
      regions: [
        {
          code: '',
          name: '',
          isPrimary: true,
        },
      ],
    };
  }
}
