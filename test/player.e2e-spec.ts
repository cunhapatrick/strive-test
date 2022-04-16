import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { PlayersModule } from '../src/modules/players/players.module';
import * as dotenv from 'dotenv';
import { Repository } from 'typeorm';
import { PlayerEntity } from '../src/modules/players/models';
import * as request from 'supertest';
import { GraphQLModule } from '@nestjs/graphql';
dotenv.config();

let app: INestApplication;
let repository: Repository<PlayerEntity>;

beforeAll(async () => {
	const module = await Test.createTestingModule({
		imports: [
			GraphQLModule.forRoot({
				autoSchemaFile: true,
				debug: false,
			}),
			TypeOrmModule.forRoot({
				type: 'postgres',
				host: process.env.DB_HOST,
				port: parseInt(process.env.DB_PORT, 10),
				username: process.env.DB_USER,
				password: process.env.DB_PASSWORD,
				database: process.env.DB_NAME_TEST,
				autoLoadEntities: true,
				synchronize: true,
			}),
			PlayersModule,
		],
	}).compile();
	app = module.createNestApplication();
	await app.init();

	repository = module.get<Repository<PlayerEntity>>(
		getRepositoryToken(PlayerEntity)
	);
});

afterAll(async () => {
	await app.close();
});

afterEach(async () => {
	await repository.query(`DELETE FROM players;`);
});

describe('PLayer Integration Test', () => {
	describe('CREATE player', () => {
		it('Should create a player', async () => {
			const player = {
				name: 'test-name-0',
				jerseyNumber: '1',
				birthDate: null,
			};

			const { status } = await request
				.agent(app.getHttpServer())
				.post('/graphql')
				.send({
					query: `mutation { addPlayer(newPlayerData: { name: "${player.name}", jerseyNumber: "${player.jerseyNumber}", birthDate: null }) { name }}`,
				});

			expect(status).toBe(200);

			const data = await repository.findOneBy({ name: player.name });

			expect(data.jerseyNumber).toBe(player.jerseyNumber);
		});
	});

	describe('GET player by Id', () => {
		it('should return a player object', async () => {
			const player = repository.create({
				name: 'test-name-0',
				jerseyNumber: '1',
				birthDate: '1994-04-06',
			});

			const newPlayer = await repository.save(player);

			const { body, status } = await request
				.agent(app.getHttpServer())
				.post('/graphql')
				.send({
					query: `{ player(id: "${newPlayer.playerId}") { name, jerseyNumber, birthDate }}`,
				});

			expect(status).toBe(200);

			const { player: playerData } = body.data;

			expect(playerData).toHaveProperty('name', newPlayer.name);
			expect(playerData).toHaveProperty('jerseyNumber', newPlayer.jerseyNumber);
			expect(new Date(playerData.birthDate).getFullYear()).toBe(
				new Date(playerData.birthDate).getFullYear()
			);
		});
	});
});
