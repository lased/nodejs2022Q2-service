import { hash, compare } from 'bcrypt';
import { v4 } from 'uuid';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { MESSAGE } from './users.constants';

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor(private configService: ConfigService) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.users.find((usr) => usr.login === createUserDto.login);

    if (user) {
      throw new BadRequestException(MESSAGE.EXISTS(createUserDto.login));
    }

    const newUser = new User();

    newUser.id = v4();
    newUser.login = createUserDto.login;
    newUser.password = await this.hashPassword(createUserDto.password);
    newUser.createdAt = Date.now();
    newUser.updatedAt = Date.now();
    newUser.version = 1;

    this.users.push(newUser);

    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find((usr) => usr.id === id);

    if (!user) {
      throw new NotFoundException(MESSAGE.NOT_FOUND);
    }

    return user;
  }

  async update(id: string, { oldPassword, newPassword }: UpdateUserDto) {
    if (newPassword === oldPassword) {
      throw new ForbiddenException(MESSAGE.PASSWORD_MATCH);
    }

    const updatedUser = this.findOne(id);
    const newHashedPassword = await this.hashPassword(newPassword);
    const isCompare = await compare(oldPassword, updatedUser.password);

    if (!isCompare) {
      throw new ForbiddenException(MESSAGE.PASSWORD_DONT_MATCH);
    }

    updatedUser.password = newHashedPassword;
    updatedUser.updatedAt = Date.now();
    updatedUser.version++;

    return updatedUser;
  }

  remove(id: string) {
    const deletedUser = this.findOne(id);

    this.users = this.users.filter((usr) => usr.id !== id);

    return deletedUser;
  }

  private hashPassword(password: string) {
    return hash(password, +this.configService.get('CRYPT_SALT'));
  }
}
