import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewPlayerInput } from './dto';
import { PlayerEntity, PlayerModel } from './models';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(PlayerEntity)
    protected readonly playerRepository: Repository<PlayerEntity>
  ) {}

  async create(data: NewPlayerInput): Promise<PlayerModel> {
    const newPlayer = this.playerRepository.create(data);
    return this.playerRepository.save(newPlayer);
  }

  async findOneById(playerId: string): Promise<PlayerModel> {
    return this.playerRepository.findOneBy({ playerId });
  }
}
