import * as dotenv from 'dotenv';
import * as pgtools from 'pgtools';

dotenv.config();

const dbName = process.env.DB_NAME || 'strive-hw';
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
    process.exit(0);
  } catch (e) {
    console.error('error creating db', e);
    process.exit(1);
  }
})();
