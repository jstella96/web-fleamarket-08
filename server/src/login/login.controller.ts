import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guards';
import { sendSessionResponse } from 'src/utils/session';
import { LoginService } from './login.service';

@UseGuards(AuthGuard)
@ApiTags('login')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get('/check')
  checkLogin(@Req() request: Request) {
    const userId = request['userId'];
    return this.loginService.checkLogin(userId);
  }

  @Post('/mock')
  async mockLogin(@Res({ passthrough: true }) res: Response) {
    const user = await this.loginService.mockLogin();
    return sendSessionResponse(user, res);
  }
}
