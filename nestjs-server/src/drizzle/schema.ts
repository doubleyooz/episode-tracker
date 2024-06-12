import { boolean, serial, pgTable, text, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username'),
  email: text('email').unique(),
  password: text('password'),
  tokenVersion: integer('tokenVersion').default(0),
  active: boolean('active').default(false),
});
