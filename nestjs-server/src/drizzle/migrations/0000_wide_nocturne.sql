CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text,
	"email" text,
	"password" text,
	"activated" boolean
);
