import { Request } from 'express';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { getSeesionValue } from 'src/utils/session';
import { ACCESS_SESSION_ID } from 'src/constants/session';
@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const sessionId = request?.cookies[ACCESS_SESSION_ID];
    const userId = getSeesionValue(sessionId);
    request['userId'] = userId;
    return true;
  }
}
