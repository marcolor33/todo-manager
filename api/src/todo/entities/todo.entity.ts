import { Exclude } from 'class-transformer';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum TodoStatus {
  NOT_STARTED = 'notStarted',
  IN_PROGRESS = 'inProgress',
  COMPLETED = 'completed',
}

@Entity()
export class Todo {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  @Exclude()
  _user?: never;

  @ApiProperty()
  @Column({ name: 'userId' })
  userId: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty({ nullable: true })
  @Column({ nullable: true })
  dueDate: Date | null;

  @ApiProperty({ enum: TodoStatus, enumName: 'TodoStatus' })
  @Column()
  status: TodoStatus;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ nullable: true })
  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;
}
