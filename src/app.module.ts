import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { GraphQLError } from 'graphql';
import 'reflect-metadata';
import { PlayersModule } from './modules/players/players.module';
dotenv.config();

@Module({
	imports: [
		GraphQLModule.forRoot({
			autoSchemaFile: true,
			debug: process.env?.NODE_ENV === 'local',
			formatError: (error: GraphQLError) =>
				error.extensions?.exception?.response || error.message,
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DB_HOST || 'localhost',
			port: Number(process.env?.DB_PORT || NaN) || 5432,
			username: process.env.DB_USER || 'root',
			password: process.env.DB_PASSWORD || 'root',
			database: process.env.DB_NAME || 'strive-hw',
			synchronize: process.env?.NODE_ENV === 'local',
			migrations: ['./src/migrations/*.ts'],
			autoLoadEntities: true,
		}),
		PlayersModule,
	],
})
export class AppModule {}
