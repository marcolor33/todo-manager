// users.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { InsertResult, Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  const now = new Date();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
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

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('userRepository should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('findOneById', () => {
    it('should return a user', async () => {
      const user: User = {
        id: 1,
        email: 'test@example.com',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      jest.spyOn(userRepository, 'create').mockReturnValue(user);
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);

      const result = await service.findOneById(1);
      expect(result).toEqual(user);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should return null if user not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
      const result = await service.findOneById(1);
      expect(result).toEqual(null);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const tobeCreatedUser = {
        email: 'test@example.com',
        password: 'password',
      };
      const createdUser: User = {
        id: 1,
        ...tobeCreatedUser,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
      };

      const insertedId = 1;
      const insertResult: InsertResult = {
        identifiers: [{ id: insertedId }],
        generatedMaps: [],
        raw: undefined,
      };
      jest.spyOn(userRepository, 'insert').mockResolvedValue(insertResult);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(createdUser);

      const result = await service.create(tobeCreatedUser);
      expect(result).toEqual(createdUser);
      expect(userRepository.insert).toHaveBeenCalledWith(tobeCreatedUser);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
