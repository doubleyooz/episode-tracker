import { boolean, serial, pgTable, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username'),
  email: text('email'),
  password: text('password'),
  activated: boolean('activated'),
});
