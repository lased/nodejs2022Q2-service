import { Module } from '@nestjs/common';

import { AppConfigModule, DatabaseModule } from './configs';
import MODULES from './modules';

@Module({
  imports: [AppConfigModule, DatabaseModule, ...MODULES],
})
export class AppModule {}
