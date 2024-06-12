ALTER TABLE "users" RENAME COLUMN "activated" TO "activate";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "activate" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "tokenVersion" integer DEFAULT 0;