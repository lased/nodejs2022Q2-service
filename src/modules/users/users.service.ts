import { ConfigService } from '@nestjs/config';
import { hash, compare } from 'bcrypt';
import { v4 } from 'uuid';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { MESSAGE } from './users.constants';
import { InMemoryStore } from 'src/services';

@Injectable()
export class UsersService {
  constructor(
    private configService: ConfigService,
    private inMemoryStore: InMemoryStore<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.inMemoryStore.findOne({ login: createUserDto.login });

    if (user) {
      throw new BadRequestException(MESSAGE.EXISTS(createUserDto.login));
    }

    const newUser = new User();

    newUser.id = v4();
    newUser.login = createUserDto.login;
    newUser.password = await this.hashPassword(createUserDto.password);
    newUser.createdAt = Math.floor(Date.now() / 1000);
    newUser.updatedAt = Math.floor(Date.now() / 1000);
    newUser.version = 1;

    this.inMemoryStore.create(newUser);

    return newUser;
  }

  findAll() {
    return this.inMemoryStore.findAll();
  }

  findById(id: string) {
    const user = this.inMemoryStore.findById(id);

    if (!user) {
      throw new NotFoundException(MESSAGE.NOT_FOUND);
    }

    return user;
  }

  async update(id: string, { oldPassword, newPassword }: UpdateUserDto) {
    if (newPassword === oldPassword) {
      throw new ForbiddenException(MESSAGE.PASSWORD_MATCH);
    }

    const user = this.findById(id);
    const newHashedPassword = await this.hashPassword(newPassword);
    const isCompare = await compare(oldPassword, user.password);

    if (!isCompare) {
      throw new ForbiddenException(MESSAGE.PASSWORD_DONT_MATCH);
    }

    const newUserData: Partial<User> = {
      password: newHashedPassword,
      updatedAt: Math.floor(Date.now() / 1000),
      version: user.version + 1,
    };

    return this.inMemoryStore.update(id, newUserData);
  }

  remove(id: string) {
    const deletedUser = this.inMemoryStore.remove(id);

    if (!deletedUser) {
      throw new NotFoundException(MESSAGE.NOT_FOUND);
    }

    return deletedUser;
  }

  private hashPassword(password: string) {
    return hash(password, +this.configService.get('CRYPT_SALT'));
  }
}
