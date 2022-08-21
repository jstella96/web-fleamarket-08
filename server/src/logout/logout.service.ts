import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ACCESS_SESSION_ID } from 'src/constants/session';
import { deleteSession } from 'src/utils/session';

@Injectable()
export class LogoutService {
  logout(sessionId: string, res: Response) {
    deleteSession(sessionId);
    res.cookie(ACCESS_SESSION_ID, sessionId, {
      expires: new Date(),
      sameSite: 'strict',
      httpOnly: true,
    });
    return res.send();
  }
}
