import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { InMemoryStore } from 'src/services';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ConfigService, InMemoryStore],
  exports: [UsersService],
})
export class UsersModule {}
