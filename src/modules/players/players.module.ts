import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from './models';
import { PlayersResolver } from './players.resolver';
import { PlayersService } from './players.service';

@Module({
	imports: [TypeOrmModule.forFeature([PlayerEntity])],
	providers: [PlayersResolver, PlayersService],
})
export class PlayersModule {}
