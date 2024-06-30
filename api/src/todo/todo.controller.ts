import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ForbiddenException,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/createTodo.dto';
import { UpdateTodoDto } from './dto/updateTodo.dto';
import { Todo, TodoStatus } from './entities/todo.entity';
import { RequestJwt } from '../common/decorators/requestJwt.decorator';
import { JwtPayload } from '../common/interfaces/jwtPayload';
import { DefaultException } from '../common/interfaces/defaultException';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiCookieAuth()
@ApiTags('todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiBadRequestResponse({ type: DefaultException })
  @ApiOkResponse({
    description: 'Greate a new todo',
    type: Todo,
  })
  @Post()
  create(
    @RequestJwt() jwtPayload: JwtPayload,
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<Todo> {
    return this.todoService.create(createTodoDto, jwtPayload.userId);
  }

  @ApiBadRequestResponse({ type: DefaultException })
  @ApiOkResponse({
    description: 'Query todos',
    type: Todo,
    isArray: true,
  })
  @ApiQuery({ name: 'status', enum: TodoStatus, required: false })
  @ApiQuery({ name: 'dueDate', required: false })
  @ApiQuery({ name: 'sortBy', required: false })
  @ApiQuery({ name: 'sortOrder', required: false })
  @Get('query')
  async query(
    @RequestJwt() jwtPayload: JwtPayload,
    @Query('status') status?: TodoStatus,
    @Query('dueDate') dueDate?: Date,
    @Query('sortBy') sortBy?: 'name' | 'dueDate' | 'status',
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
  ): Promise<Todo[]> {
    const queryOption = {
      status,
      dueDate,
      sortBy,
      sortOrder,
      userId: jwtPayload.userId,
    };
    const todos = await this.todoService.query(queryOption);
    return todos;
  }

  @ApiBadRequestResponse({ type: DefaultException })
  @ApiOkResponse({
    description: 'get a todo by id',
    type: Todo,
  })
  @Get(':id')
  async findOneById(
    @RequestJwt() jwtPayload: JwtPayload,
    @Param('id') id: number,
  ): Promise<Todo> {
    const todo = await this.todoService.findOneById(id);
    if (!todo || todo.userId !== jwtPayload.userId) {
      throw new ForbiddenException(
        'You are not authorized to update this todo.',
      );
    }
    return todo;
  }

  @ApiBadRequestResponse({ type: DefaultException })
  @ApiOkResponse({
    description: 'update a todo by id',
    type: Todo,
  })
  @Patch(':id')
  async update(
    @RequestJwt() jwtPayload: JwtPayload,
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    const todo = await this.todoService.findOneById(id);
    if (!todo || todo.userId !== jwtPayload.userId) {
      throw new ForbiddenException(
        'You are not authorized to update this todo.',
      );
    }
    return this.todoService.update(id, updateTodoDto);
  }

  @ApiBadRequestResponse({ type: DefaultException })
  @ApiCreatedResponse({
    description: 'delete a todo by id',
  })
  @Delete(':id')
  async remove(
    @RequestJwt() jwtPayload: JwtPayload,
    @Param('id') id: number,
  ): Promise<Todo> {
    const todo = await this.todoService.findOneById(id);
    if (!todo || todo.userId !== jwtPayload.userId) {
      throw new ForbiddenException(
        'You are not authorized to delete this todo.',
      );
    }
    return this.todoService.remove(id);
  }
}
