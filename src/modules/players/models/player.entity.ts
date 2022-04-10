import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'players' })
export class PlayerEntity {
  @PrimaryGeneratedColumn()
  playerId: string;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  jerseyNumber?: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  birthDate?: string;
}
