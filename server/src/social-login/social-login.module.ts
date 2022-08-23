import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SocialLoginController } from './social-login.controller';
import { SocialLoginService } from './social-login.service';

@Module({
  controllers: [SocialLoginController],
  providers: [SocialLoginService, UserService],
})
export class SocialLoginModule {}
