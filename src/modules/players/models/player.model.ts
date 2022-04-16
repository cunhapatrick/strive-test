import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'player' })
export class PlayerModel {
	@Field(() => ID)
	playerId: string;

	@Field()
	name: string;

	@Field({ nullable: true })
	jerseyNumber?: string | null;

	@Field({ nullable: true })
	birthDate?: Date | null;
}
