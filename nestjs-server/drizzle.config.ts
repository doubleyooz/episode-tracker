import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql', // "mysql" | "sqlite"
  out: './src/drizzle/migrations',
  schema: './src/drizzle/schema.ts',
  migrations: {
    // table: 'migrations_custom', // default `__drizzle_migrations`,
    schema: 'public', // used in PostgreSQL only and default to `drizzle`
  },
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
