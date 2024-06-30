import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/createTodo.dto';
import { UpdateTodoDto } from './dto/updateTodo.dto';
import { Todo, TodoStatus } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto, userId: number) {
    const defaultStatus = TodoStatus.NOT_STARTED;
    const { status, description } = createTodoDto;
    const user = await this.todoRepository.create({
      ...createTodoDto,
      description: description || '',
      status: status || defaultStatus,
      userId,
    });
    const { identifiers } = await this.todoRepository.insert(user);
    const insertedId = identifiers[0].id;
    const created = await this.findOneById(insertedId);
    return created;
  }

  async query(queryOption: {
    userId?: number;
    status?: string;
    dueDateBefore?: Date;
    dueDateAfter?: Date;
    sortBy?: 'name' | 'dueDate' | 'status';
    sortOrder?: 'asc' | 'desc';
  }): Promise<Todo[]> {
    const {
      userId,
      status,
      dueDateBefore,
      dueDateAfter,
      sortBy = 'dueDate',
      sortOrder = 'desc',
    } = queryOption;
    let query = this.todoRepository.createQueryBuilder('todo');

    if (status) {
      query.andWhere('todo.status = :status', { status });
    }

    if (dueDateBefore) {
      query.andWhere('todo.dueDate <= :dueDateBefore', { dueDateBefore });
    }

    if (dueDateAfter) {
      query.andWhere('todo.dueDate >= :dueDateAfter', { dueDateAfter });
    }

    if (userId) {
      query.andWhere(`todo.userId = :userId`, { userId });
    }

    query = query.addOrderBy(
      `todo.${sortBy}`,
      sortOrder.toUpperCase() as 'ASC' | 'DESC',
    );
    query = query.addOrderBy('todo.createdAt', 'DESC');

    const todos = await query.getMany();
    return todos;
  }

  findOneById(id: number) {
    return this.todoRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    await this.todoRepository.update({ id }, updateTodoDto);
    return this.findOneById(id);
  }

  async remove(id: number): Promise<Todo> {
    this.todoRepository.softDelete({ id });
    return this.todoRepository.findOne({ where: { id }, withDeleted: true });
  }
}
