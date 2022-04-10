import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
dotenv.config();
const PORT = process.env.PORT || 3333;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: true,
  });
  await app.listen(PORT);
  Logger.log(`app listening on port ${PORT}`);
}
bootstrap();
