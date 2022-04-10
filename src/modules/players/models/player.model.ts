import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'player' })
export class PlayerModel {
  @Field(() => ID)
  playerId: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  jerseyNumber?: string;

  @Field({ nullable: true })
  birthDate?: string;
}
