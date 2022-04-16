import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';

@InputType()
export class NewPlayerInput {
	@Field()
	@IsString()
	name: string;

	@Field({ nullable: true })
	@IsOptional()
	jerseyNumber?: string | null;

	@Field({ nullable: true })
	@IsOptional()
	birthDate?: Date | null;
}
