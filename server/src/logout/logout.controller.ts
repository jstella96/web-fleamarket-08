import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { LogoutService } from './logout.service';

@Controller('logout')
export class LogoutController {
  constructor(private readonly logoutService: LogoutService) {}

  @Post()
  logout(@Req() request: Request, @Res() res: Response) {
    const sessionId = request.cookies['access-session-id'];
    return this.logoutService.logout(sessionId, res);
  }
}
