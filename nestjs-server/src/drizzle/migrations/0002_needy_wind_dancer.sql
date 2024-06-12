ALTER TABLE "users" RENAME COLUMN "activate" TO "active";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");