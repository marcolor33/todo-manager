import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { AuthGuard, Public } from './auth.guard';
import { accessTokenCookieKey } from './constants';
import { User } from '../user/entities/user.entity';
import { DefaultException } from 'src/common/interfaces/defaultException';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { RequestJwt } from 'src/common/decorators/requestJwt.decorator';
import { JwtPayload } from 'src/common/interfaces/jwtPayload';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBadRequestResponse({ type: DefaultException })
  @ApiOkResponse({
    description: 'register',
    type: User,
  })
  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    const user = await this.authService.register(registerDto);
    return user;
  }

  @ApiBadRequestResponse({ type: DefaultException })
  @ApiOkResponse({
    description: 'Login',
    type: LoginResponseDto,
  })
  @Public()
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponseDto> {
    const accessToken = await this.authService.login(loginDto);

    // setting the access_token in the cookie
    res.cookie(accessTokenCookieKey, accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    });

    return { accessToken };
  }

  @ApiUnauthorizedResponse({ type: DefaultException })
  @ApiOkResponse({
    description: 'getMe',
    type: User,
  })
  @UseGuards(AuthGuard)
  @Post('getMe')
  async getMe(@RequestJwt() JwtPayload: JwtPayload): Promise<User> {
    return this.authService.getMe(JwtPayload);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(accessTokenCookieKey).send({ status: 'ok' });
  }
}
