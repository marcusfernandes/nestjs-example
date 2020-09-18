import { NestFactory } from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express' 
import { AppModule } from './app.module';
import 'reflect-metadata';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.useStaticAssets(join(__dirname, '..', 'public'));

  await app.listen(3002);
}
bootstrap();
