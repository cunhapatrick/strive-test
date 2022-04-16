import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewPlayerInput } from './dto';
import { PlayerModel } from './models';
import { PlayersService } from './players.service';

@Resolver(() => PlayerModel)
export class PlayersResolver {
	constructor(private readonly playersService: PlayersService) {}

	@Query(() => PlayerModel)
	async player(@Args('id') id: string): Promise<PlayerModel> {
		const player = await this.playersService.findOneById(id);

		if (!player) {
			throw new NotFoundException(id);
		}
		return {
			...player,
			birthDate: new Date(player.birthDate),
		};
	}

	@Mutation(() => PlayerModel)
	async addPlayer(
		@Args('newPlayerData') newPlayerData: NewPlayerInput
	): Promise<PlayerModel> {
		return this.playersService.create(newPlayerData);
	}
}
