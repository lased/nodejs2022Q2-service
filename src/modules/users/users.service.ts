import { NotFoundException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';
import { v4 } from 'uuid';

import { IService } from 'src/shared/service.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InMemoryStore } from 'src/services';
import { MESSAGE } from './users.constants';

@Injectable()
export class UsersService implements IService<User> {
  constructor(
    private configService: ConfigService,
    private inMemoryStore: InMemoryStore<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // const user = this.inMemoryStore.findOne({ login: createUserDto.login });

    // if (user) {
    //   throw new BadRequestException(MESSAGE.EXISTS(createUserDto.login));
    // }

    const newUser = new User();

    newUser.id = v4();
    newUser.login = createUserDto.login;
    newUser.password = await this.hashPassword(createUserDto.password);
    newUser.createdAt = Date.now();
    newUser.updatedAt = Date.now();
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

  async update(
    id: string,
    { password, version }: Pick<Required<User>, 'version' | 'password'>,
  ) {
    const newHashedPassword = await this.hashPassword(password);

    const newUserData: Partial<User> = {
      password: newHashedPassword,
      updatedAt: Date.now(),
      version,
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
