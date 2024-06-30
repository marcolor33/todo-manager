import { TodoService } from './todo.service';
import { Todo, TodoStatus } from './entities/todo.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateTodoDto } from './dto/createTodo.dto';
import { InsertResult, Repository } from 'typeorm';
import { UpdateTodoDto } from './dto/updateTodo.dto';

describe('TodoService', () => {
  let todoService: TodoService;
  let todoRepository: Repository<Todo>;
  const now = new Date();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
          },
        },
      ],
    }).compile();

    todoService = module.get<TodoService>(TodoService);
    todoRepository = module.get<Repository<Todo>>(getRepositoryToken(Todo));
  });

  it('should be defined', () => {
    expect(todoService).toBeDefined();
  });

  it('todoRepository should be defined', () => {
    expect(todoRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const userId = 1;
      const toBecreatedTodoDto: CreateTodoDto = {
        name: 'New Todo',
        description: 'This is a new todo',
      };

      const createdTodo: Todo = {
        id: 1,
        name: toBecreatedTodoDto.name,
        description: toBecreatedTodoDto.description,
        dueDate: null,
        status: TodoStatus.NOT_STARTED,
        userId,
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
      jest.spyOn(todoRepository, 'insert').mockResolvedValue(insertResult);
      jest.spyOn(todoRepository, 'findOne').mockResolvedValue(createdTodo);
      jest.spyOn(todoRepository, 'create').mockReturnValue(createdTodo);
      jest.spyOn(todoRepository, 'save').mockResolvedValue(createdTodo);

      const result = await todoService.create(toBecreatedTodoDto, userId);

      expect(result).toBeDefined();
      expect(result.name).toEqual(toBecreatedTodoDto.name);
      expect(result.description).toEqual(toBecreatedTodoDto.description);
      expect(result.userId).toEqual(userId);
    });
  });

  describe('findOne', () => {
    it('should find a todo by id', async () => {
      const id = 1;
      const todo: Todo = {
        id,
        name: 'test',
        description: '',
        dueDate: null,
        status: TodoStatus.NOT_STARTED,
        userId: 1,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
      };

      jest.spyOn(todoRepository, 'findOne').mockResolvedValue(todo);
      const result = await todoService.findOneById(id);

      expect(result).toEqual(todo);
      expect(todoRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      // Add assertions for the expected result
    });
  });

  describe('update', () => {
    it('should update a todo', async () => {
      const id = 1;
      const updateTodoDto: UpdateTodoDto = {
        name: 'Updated Todo',
        description: 'This todo has been updated',
      };
      const todo: Todo = {
        id,
        name: updateTodoDto.name,
        description: updateTodoDto.description,
        dueDate: null,
        status: TodoStatus.NOT_STARTED,
        userId: 1,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
      };

      jest.spyOn(todoRepository, 'findOne').mockResolvedValue(todo);

      const result = await todoService.update(id, updateTodoDto);

      expect(result).toBeDefined();
      expect(todoRepository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(todoRepository.update).toHaveBeenCalledWith({ id }, updateTodoDto);
      // Add assertions for the expected result
    });
  });

  describe('delete', () => {
    it('should remove a todo', async () => {
      const id = 1;
      const deletedTodo: Todo = {
        id,
        userId: 1,
        name: 'my name',
        description: '',
        dueDate: null,
        status: TodoStatus.NOT_STARTED,
        createdAt: now,
        updatedAt: now,
        deletedAt: now,
      };

      jest.spyOn(todoRepository, 'findOne').mockResolvedValue(deletedTodo);

      const result = await todoService.remove(id);
      expect(result).toBeDefined();
      // Add assertions for the expected result
    });
  });
});
