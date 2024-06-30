import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo, TodoStatus } from './entities/todo.entity';
import { JwtPayload } from '../common/interfaces/jwtPayload';
import { InsertResult, Repository } from 'typeorm';
import { CanActivate } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

describe('TodoController', () => {
  let todoController: TodoController;
  let todoService: TodoService;
  let todoRepository: Repository<Todo>;

  const authenticatedJwtPayload: JwtPayload = { userId: 1, email: 'testuser' };

  beforeEach(async () => {
    const mockGuard: CanActivate = { canActivate: jest.fn(() => true) };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(Todo),
          useValue: {
            findOne: jest.fn(),
            insert: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
            softDelete: jest.fn(),
            createQueryBuilder: jest.fn(),
            // other repository methods as needed
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockGuard)
      .compile();

    todoController = module.get<TodoController>(TodoController);
    todoService = module.get<TodoService>(TodoService);
    todoRepository = module.get<Repository<Todo>>(getRepositoryToken(Todo));
  });

  it('todoController should be defined', () => {
    expect(todoController).toBeDefined();
  });

  it('todoService should be defined', () => {
    expect(todoService).toBeDefined();
  });

  it('create should call todoService.create with the correct parameters', async () => {
    const tobeCreateTodo = {
      name: 'Test Todo',
      description: 'Test Description',
    };
    const insertedId = 1;
    const createdTodo = {
      ...tobeCreateTodo,
      id: insertedId,
      status: TodoStatus.NOT_STARTED,
      userId: authenticatedJwtPayload.userId,
      dueDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    const insertResult: InsertResult = {
      identifiers: [{ id: insertedId }],
      generatedMaps: [],
      raw: undefined,
    };
    jest.spyOn(todoRepository, 'insert').mockResolvedValue(insertResult);
    jest.spyOn(todoRepository, 'findOne').mockResolvedValue(createdTodo);

    const result = await todoService.create(
      tobeCreateTodo,
      authenticatedJwtPayload.userId,
    );
    expect(result).toEqual(createdTodo);
    expect(todoRepository.insert).toHaveBeenCalledWith(tobeCreateTodo);
    expect(todoRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });

    const createSpy = jest.spyOn(todoService, 'create');

    todoController.create(authenticatedJwtPayload, tobeCreateTodo);
    jest.spyOn(todoRepository, 'findOne').mockResolvedValue(createdTodo);

    expect(createSpy).toHaveBeenCalledWith(
      tobeCreateTodo,
      authenticatedJwtPayload.userId,
    );
  });

  it('findOneById should call todoService.findOneById with the correct parameter', () => {
    const id = 1;
    const todo: Todo = {
      id,
      name: 'Test Todo',
      description: 'Test Description',
      status: TodoStatus.NOT_STARTED,
      userId: 1,
      dueDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
    const findOneByIdSpy = jest.spyOn(todoService, 'findOneById');

    todoController.findOneById(authenticatedJwtPayload, id);
    jest.spyOn(todoRepository, 'findOne').mockResolvedValue(todo);

    expect(findOneByIdSpy).toHaveBeenCalledWith(id);
  });

  it('update should call todoService.update with the correct parameters', () => {
    const updateTodoDto = {
      title: 'Updated Todo',
      description: 'Updated Description',
    };
    const id = 1;
    const updateSpy = jest.spyOn(todoService, 'update');

    todoController.update(authenticatedJwtPayload, id, updateTodoDto);

    expect(updateSpy).toHaveBeenCalledWith(
      authenticatedJwtPayload,
      id,
      updateTodoDto,
    );
  });

  it('remove should call todoService.remove with the correct parameters', () => {
    const id = 1;
    const removeSpy = jest.spyOn(todoService, 'remove');

    todoController.remove(authenticatedJwtPayload, id);

    expect(removeSpy).toHaveBeenCalledWith(authenticatedJwtPayload, id);
  });
});
