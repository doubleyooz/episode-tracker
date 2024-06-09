import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';

import * as schema from './schema';

dotenv.config({
  path: '.env',
});

async function main() {
  const database = process.env.POSTGRES_DB;
  const user = process.env.POSTGRES_USER;
  const password = process.env.POSTGRES_PASSWORD;
  const port = process.env.POSTGRES_PORT;
  const host = process.env.POSTGRES_HOST;
  const pool = new Pool({
    connectionString: `postgres://${user}:${password}@${host}:${port}/${database}`,
  });

  await migrate(drizzle(pool, { schema }), { migrationsFolder: 'migrations' });
}

main();
