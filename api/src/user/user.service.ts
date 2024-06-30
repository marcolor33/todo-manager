import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { identifiers } = await this.userRepository.insert(createUserDto);
    const insertedId = identifiers[0].id;
    const created = await this.findOneById(insertedId);
    return created;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id }, updateUserDto);
  }

  async remove(id: number) {
    await this.userRepository.softDelete({ id });
  }
}
