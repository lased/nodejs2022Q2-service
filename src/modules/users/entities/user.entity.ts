import { Exclude, Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity('users')
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

  @CreateDateColumn()
  @Transform(({ value }) => +new Date(value))
  createdAt: number;

  @UpdateDateColumn()
  @Transform(({ value }) => +new Date(value))
  updatedAt: number;
}
