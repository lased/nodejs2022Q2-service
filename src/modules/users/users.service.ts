import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

import { IService } from 'src/shared/service.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { MESSAGE } from './users.constants';

@Injectable()
export class UsersService implements IService<User> {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // const user = this.inMemoryStore.findOne({ login: createUserDto.login });

    // if (user) {
    //   throw new BadRequestException(MESSAGE.EXISTS(createUserDto.login));
    // }

    const newUser = new User();

    newUser.login = createUserDto.login;
    newUser.password = await this.hashPassword(createUserDto.password);

    return this.userRepo.save(newUser);
  }

  findAll() {
    return this.userRepo.find();
  }

  async findById(id: string) {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(MESSAGE.NOT_FOUND);
    }

    return user;
  }

  async update(id: string, { password }: Pick<Required<User>, 'password'>) {
    const newHashedPassword = await this.hashPassword(password);
    const newUserData: Partial<User> = {
      password: newHashedPassword,
    };

    await this.userRepo.update(id, newUserData);

    return this.findById(id);
  }

  async remove(id: string) {
    const { affected } = await this.userRepo.delete(id);

    if (!affected) {
      throw new NotFoundException(MESSAGE.NOT_FOUND);
    }

    return true;
  }

  private hashPassword(password: string) {
    return hash(password, +this.configService.get('CRYPT_SALT'));
  }
}
