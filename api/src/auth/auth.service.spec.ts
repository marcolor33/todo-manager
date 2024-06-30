import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            insert: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            save: jest.fn(),
            // other repository methods as needed
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('authService should be defined', () => {
    expect(authService).toBeDefined();
  });
});
