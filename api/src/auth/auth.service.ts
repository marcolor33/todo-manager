import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from '../common/interfaces/jwtPayload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email } = registerDto;
    const foundUser = await this.userService.findOneByEmail(email);
    if (foundUser) {
      throw new BadRequestException('Email already exists');
    }

    // insert user
    return await this.userService.create(registerDto);
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.signAccessToken(user);
    return accessToken;
  }

  async signAccessToken(user: User) {
    const payload: JwtPayload = { userId: user.id, email: user.email };
    return await this.jwtService.signAsync(payload);
  }
}
