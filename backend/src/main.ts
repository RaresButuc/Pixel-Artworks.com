import 'reflect-metadata';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  await app.listen(8080);
}
bootstrap();
