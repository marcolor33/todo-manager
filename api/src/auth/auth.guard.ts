import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { accessTokenCookieKey, jwtConstants } from './constants';
import { Request } from 'express';

import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtPayload } from '../common/interfaces/jwtPayload';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = AuthGuard.extractJWTFromCookie(request);

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // passing guard as it is public
      return true;
    }

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: jwtConstants.secret,
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request.jwtpayload = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private static extractJWTFromCookie(req: Request): string | null {
    if (req.cookies && req.cookies[accessTokenCookieKey]) {
      return req.cookies[accessTokenCookieKey];
    }
    return null;
  }
}
