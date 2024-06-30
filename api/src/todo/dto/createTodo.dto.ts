import { ApiProperty } from '@nestjs/swagger';
import { TodoStatus } from '../entities/todo.entity';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTodoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false, nullable: true })
  @ValidateIf((object, value) => value !== null)
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  dueDate?: Date | null;

  @ApiProperty({
    required: false,
    enum: TodoStatus,
    enumName: 'TodoStatus',
    default: TodoStatus.NOT_STARTED,
  })
  status?: TodoStatus;
}
