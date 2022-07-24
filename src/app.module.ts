import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import MODULES from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV ? '.env' : '.env.local',
    }),
    ...MODULES,
  ],
})
export class AppModule {}
