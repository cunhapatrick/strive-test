import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlayersService } from './players.service';
import { PlayerEntity } from './models/player.entity';
import { Repository } from 'typeorm';
import { PlayerModel } from './models';
import { NewPlayerInput } from './dto';

describe('PlayersService', () => {
	let app: TestingModule;
	let service: PlayersService;
	let playerRepositoryMock: MockType<Repository<PlayerEntity>>;
	let playerMock: PlayerModel;

	type MockType<T> = {
		[P in keyof T]?: jest.Mock<Record<string, unknown>>;
	};

	beforeAll(async () => {
		playerRepositoryMock = {
			save: jest.fn(),
			create: jest.fn(),
			findOneBy: jest.fn(),
		};

		playerMock = {
			playerId: '1',
			name: 'test',
			jerseyNumber: '1',
			birthDate: new Date('1994-04-06'),
		};

		app = await Test.createTestingModule({
			providers: [
				PlayersService,
				{
					provide: getRepositoryToken(PlayerEntity),
					useValue: playerRepositoryMock,
				},
			],
		}).compile();

		service = app.get<PlayersService>(PlayersService);
	});

	it('Should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('GET player', () => {
		it('should return a player register from database', async () => {
			playerRepositoryMock.findOneBy.mockReturnValue({ ...playerMock });
			const result = await service.findOneById('1');

			expect(result).toMatchObject(playerMock);
			expect(playerRepositoryMock.findOneBy).toBeCalledTimes(1);
			expect(playerRepositoryMock.findOneBy).toBeCalledWith({ playerId: '1' });
		});
	});

	describe('POST player', () => {
		it('should create a player register on database', async () => {
			const newPlayerInput: NewPlayerInput = {
				name: 'test',
				jerseyNumber: '1',
				birthDate: new Date('1994-04-06'),
			};

			playerRepositoryMock.create.mockReturnValue({ ...playerMock });
			playerRepositoryMock.save.mockReturnValue({ ...playerMock });
			const result = await service.create(newPlayerInput);
			expect(result).toMatchObject(playerMock);
			expect(playerRepositoryMock.create).toBeCalledTimes(1);
			expect(playerRepositoryMock.create).toBeCalledWith(newPlayerInput);
			expect(playerRepositoryMock.save).toBeCalledTimes(1);
			expect(playerRepositoryMock.save).toBeCalledWith(playerMock);
		});
	});
});
