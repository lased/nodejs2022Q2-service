import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ConfigService],
})
export class UsersModule {}
