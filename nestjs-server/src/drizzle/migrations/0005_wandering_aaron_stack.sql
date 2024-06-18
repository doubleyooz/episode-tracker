ALTER TABLE "episodes" ADD COLUMN "stoppedAtHours" integer;--> statement-breakpoint
ALTER TABLE "episodes" ADD COLUMN "stoppedAtMinutes" integer;--> statement-breakpoint
ALTER TABLE "episodes" ADD COLUMN "stoppedAtSeconds" integer;--> statement-breakpoint
ALTER TABLE "episodes" DROP COLUMN IF EXISTS "stoppedAt";