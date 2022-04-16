import * as dotenv from 'dotenv';
import * as pgtools from 'pgtools';

dotenv.config();

const dbName = process.env.DB_NAME;
const dbNameTest = process.env.DB_NAME_TEST;

(async function () {
	const pgConfig = {
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		port: process.env.DB_PORT,
		host: process.env.DB_HOST,
	};

	try {
		console.log('creating db', dbName);
		await pgtools.createdb(pgConfig, dbName);
		console.log('created db', dbName);
		console.log('creating db test', dbNameTest);
		await pgtools.createdb(pgConfig, dbNameTest);
		console.log('created db', dbNameTest);
		process.exit(0);
	} catch (e) {
		console.error('error creating db', e);
		process.exit(1);
	}
})();
