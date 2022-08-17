import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SocialLoginDto } from './dto/social-login.dto';
import { SocialLoginService } from './social-login.service';

@ApiTags('social-login')
@Controller('social-login')
export class SocialLoginController {
  constructor(private readonly socialLoginService: SocialLoginService) {}

  @Post()
  login(@Body() socialLoginDto: SocialLoginDto) {
    return this.socialLoginService.login(socialLoginDto);
  }
}
