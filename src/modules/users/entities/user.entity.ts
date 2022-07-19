import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Exclude, Transform, Type } from 'class-transformer';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  @Exclude()
  password: string;

  @VersionColumn({
    default: 1,
  })
  version: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  @Transform(({ value }) => +new Date(value))
  createdAt: number;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  @Transform(({ value }) => +new Date(value))
  updatedAt: number;
}
