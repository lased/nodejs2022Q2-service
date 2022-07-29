import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { join } from 'path';

import { AppConfigModule } from './config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: `postgresql://${configService.get(
          'POSTGRES_USER',
        )}:${configService.get('POSTGRES_PASSWORD')}@${configService.get(
          'POSTGRES_CONTAINER_NAME',
        )}:${configService.get('POSTGRES_PORT')}/${configService.get(
          'POSTGRES_DB',
        )}?schema=public`,
        entities: [join(__dirname, '../**/*.entity.{ts,js}')],
        synchronize: process.env.NODE_ENV ? false : true,
      }),
    }),
  ],
})
export class DatabaseModule {}
