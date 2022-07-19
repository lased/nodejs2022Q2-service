import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { dirname, join } from 'path';
import { parse } from 'yaml';

import { HttpExceptionFilter } from './filters';
import { AppModule } from './app.module';
import { readFile } from 'fs/promises';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  if (!process.env.NODE_ENV) {
    const rootDirname = dirname(__dirname);
    const DOC_API = await readFile(
      join(rootDirname, 'doc', 'api.yaml'),
      'utf-8',
    );
    const document = parse(DOC_API);

    SwaggerModule.setup('doc', app, document);
  }

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(configService.get('PORT'));
}
bootstrap();
