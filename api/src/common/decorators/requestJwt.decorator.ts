import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwtPayload';

export const RequestJwt = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const jwtPayload: JwtPayload = request.jwtpayload;

    return key ? jwtPayload?.[key] : jwtPayload;
  },
);
