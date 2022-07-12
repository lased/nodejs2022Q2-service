import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { InMemoryStore } from 'src/services';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    ConfigService,
    { provide: 'InMemoryStore', useClass: InMemoryStore },
  ],
})
export class UsersModule {}
