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
import { AuthGuard } from 'src/guards/auth.guards';
import { sendSessionResponse } from 'src/utils/session';
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
    return sendSessionResponse(user, res);
  }

  @UseGuards(AuthGuard)
  @Get()
  test(@Req() request: Request) {
    const userId = request['userId'];
  }
}
