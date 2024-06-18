ALTER TABLE "animes" ADD COLUMN "list_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "animes" ADD CONSTRAINT "animes_list_id_lists_id_fk" FOREIGN KEY ("list_id") REFERENCES "public"."lists"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
