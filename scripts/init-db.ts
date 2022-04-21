import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

const dbName = process.env.DB_NAME;
const dbNameTest = process.env.DB_NAME_TEST;

(async function () {
	const dataSource = new DataSource({
		type: 'postgres',
		host: process.env.DB_HOST || 'localhost',
		port: Number(process.env?.DB_PORT || NaN) || 5432,
		username: process.env.DB_USER || 'root',
		password: process.env.DB_PASSWORD || 'root',
		synchronize: process.env?.NODE_ENV === 'local',
		migrations: ['../src/migrations/*.ts'],
		entities: ['../src/modules/**/models/*.entities.ts'],
	});

	try {
		await dataSource.initialize();
		console.log('creating db', dbName);
		await dataSource.createQueryRunner().createDatabase(dbName, true);
		console.log(`run migrations on ${dbName}`);
		await dataSource.runMigrations();
		console.log('creating db test', dbNameTest);
		await dataSource.createQueryRunner().createDatabase(dbNameTest, true);
		process.exit(0);
	} catch (e) {
		console.error('error creating db', e);
		process.exit(1);
	}
})();
