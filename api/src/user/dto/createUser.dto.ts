import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class CreateUserDto implements Pick<User, 'email' | 'password'> {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
