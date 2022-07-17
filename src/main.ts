import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { cwd } from 'process';
import { parse } from 'yaml';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = await readFile(resolve(cwd(), 'doc', 'api.yaml'), {
    encoding: 'utf8',
  });
  app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup('doc', app, parse(document));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
