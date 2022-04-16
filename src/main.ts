import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
dotenv.config();
const PORT = process.env.PORT || 3333;

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: true,
	});

	app
		.useGlobalPipes(new ValidationPipe({ transform: true }))
		.useGlobalFilters(new HttpExceptionFilter());

	await app.listen(PORT);
	Logger.log(`app listening on port ${PORT}`);
}
bootstrap();
