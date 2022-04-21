import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePlayer1650475949710 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'players',
				columns: [
					{
						name: 'playerId',
						type: 'int',
						isPrimary: true,
					},
					{
						name: 'name',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'jerseyNumber',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'birthDate',
						type: 'date',
						isNullable: true,
					},
				],
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('players', true);
	}
}
