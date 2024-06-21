ALTER TABLE "animes" ADD COLUMN "parent_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "animes" ADD CONSTRAINT "animes_parent_id_animes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."animes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
