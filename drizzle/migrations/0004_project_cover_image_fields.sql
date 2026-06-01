ALTER TABLE "projects" ADD COLUMN "cover_image_url" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "cover_image_alt" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "cover_image_fit" text DEFAULT 'contain' NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "cover_image_position" text DEFAULT 'center' NOT NULL;
