import { Exclude } from 'class-transformer';
import { Todo } from '../../todo/entities/todo.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  email: string;

  @Column()
  @Exclude() // exclude password from responses
  password: string;

  // internal mapping
  @OneToMany(() => Todo, (todo) => todo._user, { cascade: true })
  @Exclude()
  _todos?: never;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
