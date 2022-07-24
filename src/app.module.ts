import { Module } from '@nestjs/common';

import { AppConfigModule, DatabaseModule } from './config';
import MODULES from './modules';

@Module({
  imports: [AppConfigModule, DatabaseModule, ...MODULES],
})
export class AppModule {}
