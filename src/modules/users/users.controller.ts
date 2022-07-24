import { compare } from 'bcrypt';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  Put,
  ForbiddenException,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { MESSAGE } from './users.constants';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.usersService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() { oldPassword, newPassword }: UpdateUserDto,
  ) {
    if (newPassword === oldPassword) {
      throw new ForbiddenException(MESSAGE.PASSWORD_MATCH);
    }

    const user = this.usersService.findById(id);
    const isCompare = await compare(oldPassword, user.password);

    if (!isCompare) {
      throw new ForbiddenException(MESSAGE.PASSWORD_DONT_MATCH);
    }

    return this.usersService.update(id, {
      password: newPassword,
      version: user.version + 1,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.usersService.remove(id);
  }
}
