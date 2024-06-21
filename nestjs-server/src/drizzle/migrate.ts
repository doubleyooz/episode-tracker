import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';

import * as schema from './schema';

export async function main() {
  const db_url = process.env.POSTGRES_URL;
  const db_ssl = process.env.POSTGRES_SSL;
  const pool = new Pool({
    connectionString: db_url,
    ssl: db_ssl === 'true',
  });
  try {
    await migrate(drizzle(pool, { schema }), {
      migrationsFolder: './src/drizzle/migrations',
    });
  } catch (err) {
    console.log(err);
  }
}

main();
