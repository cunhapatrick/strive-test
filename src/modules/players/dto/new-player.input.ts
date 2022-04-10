import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsOptional } from 'class-validator';

@InputType()
export class NewPlayerInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsOptional()
  @IsString()
  jerseyNumber?: string;

  @Field()
  @IsOptional()
  @IsString()
  birthDate: string;
}
