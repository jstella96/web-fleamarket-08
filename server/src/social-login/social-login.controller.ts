import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ACCESS_SESSION_ID } from 'src/constants/session';
import { AuthGuard } from 'src/guards/auth.guards';
import { createSessionId } from 'src/utils/session';
import { SocialLoginDto } from './dto/social-login.dto';
import { SocialLoginService } from './social-login.service';

@ApiTags('social-login')
@Controller('social-login')
export class SocialLoginController {
  constructor(private readonly socialLoginService: SocialLoginService) {}

  @Post()
  async login(
    @Body() socialLoginDto: SocialLoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const user = await this.socialLoginService.login(socialLoginDto);
    const sessionId = createSessionId(user.id);
    res.cookie(ACCESS_SESSION_ID, sessionId, {
      expires: new Date(new Date().getTime() + 100 * 1000),
      sameSite: 'strict',
      httpOnly: true,
    });
    return res.send(user);
  }

  @UseGuards(AuthGuard)
  @Get()
  test(@Req() request: Request) {
    const userId = request['userId'];
    console.log(userId);
  }
}
