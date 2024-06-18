import { relations } from 'drizzle-orm';
import {
  boolean,
  serial,
  pgTable,
  text,
  integer,
  date,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username'),
  email: text('email').unique(),
  password: text('password'),
  tokenVersion: integer('tokenVersion').default(0),
  active: boolean('active').default(false),
  codeToValidate: text('codeToValidate'),
  codeExpiration: date('codeExpiration'),
});

export const animes = pgTable('animes', {
  id: serial('id').primaryKey(),
  description: text('description'),
  title: text('title'),
  studio: text('studio'),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  finished: boolean('finished').default(false),
});

export const animeRelations = relations(animes, ({ one }) => ({
  userId: one(users, {
    fields: [animes.userId],
    references: [users.id],
  }),

  listId: one(lists, {
    fields: [animes.userId],
    references: [lists.id],
  }),
}));

export const episodes = pgTable('episodes', {
  id: serial('id').primaryKey(),
  title: text('title'),
  description: text('description'),
  stoppedAtHours: integer('stoppedAtHours'),
  stoppedAtMinutes: integer('stoppedAtMinutes'),
  stoppedAtSeconds: integer('stoppedAtSeconds'),
  animeId: integer('anime_id')
    .notNull()
    .references(() => animes.id),
  finished: boolean('finished').default(false),
});

export const episodesRelations = relations(episodes, ({ one }) => ({
  animeId: one(animes, {
    fields: [episodes.animeId],
    references: [animes.id],
  }),
}));

export const lists = pgTable('lists', {
  id: serial('id').primaryKey(),
  title: text('title'),
  description: text('description'),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
});

export const listsRelations = relations(lists, ({ one }) => ({
  userId: one(users, {
    fields: [lists.userId],
    references: [users.id],
  }),
}));

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  finished: boolean('finished').default(false),
  description: text('description'),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  animeId: integer('anime_id')
    .notNull()
    .references(() => animes.id),
});

export const reviewsRelations = relations(reviews, ({ one }) => ({
  userId: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
  animeId: one(animes, {
    fields: [reviews.animeId],
    references: [animes.id],
  }),
}));
