CREATE TYPE "public"."media_display_mode" AS ENUM('bleed', 'cover', 'contain', 'natural', 'thumbnail', 'background_decorative');--> statement-breakpoint
CREATE TYPE "public"."media_role" AS ENUM('hero_atmospheric', 'section_artwork', 'card_thumbnail', 'video_thumbnail', 'proof_document', 'gallery_image', 'detail_image', 'profile_photo', 'lifestyle_photo', 'og_social');--> statement-breakpoint
CREATE TYPE "public"."milestone_category" AS ENUM('hardware', 'software', 'recognition', 'presentation', 'other');--> statement-breakpoint
CREATE TYPE "public"."project_status" AS ENUM('active', 'experiment', 'archived', 'concept');--> statement-breakpoint
CREATE TYPE "public"."project_type" AS ENUM('internal_tool', 'ai_system', 'automation', 'data_platform', 'saas', 'content_media', 'other');--> statement-breakpoint
CREATE TYPE "public"."proof_type" AS ENUM('github', 'youtube', 'screenshot', 'pdf', 'recognition', 'presentation', 'technical_note', 'certificate', 'milestone_proof', 'build_document');--> statement-breakpoint
CREATE TYPE "public"."update_type" AS ENUM('new_project', 'new_repo', 'new_video', 'new_proof', 'new_feature', 'technical_note', 'status_change');--> statement-breakpoint
CREATE TYPE "public"."video_category" AS ENUM('demo', 'walkthrough', 'presentation', 'hardware', 'software', 'other');--> statement-breakpoint
CREATE TABLE "media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"file_url" text NOT NULL,
	"file_name" text,
	"file_type" text,
	"mime_type" text,
	"file_size_bytes" bigint,
	"alt_text" text,
	"caption" text,
	"image_role" "media_role",
	"image_focal_point" text,
	"image_display_mode" "media_display_mode",
	"mobile_file_url" text,
	"og_image_url" text,
	"related_project_id" uuid,
	"related_proof_id" uuid,
	"related_video_id" uuid,
	"uploaded_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"short_description" text NOT NULL,
	"full_description" text,
	"project_type" "project_type" NOT NULL,
	"status" "project_status" NOT NULL,
	"featured_on_home" boolean DEFAULT false NOT NULL,
	"featured_on_about" boolean DEFAULT false NOT NULL,
	"display_order" integer DEFAULT 100 NOT NULL,
	"tech_stack" text[],
	"problem_solved" text,
	"what_it_does" text,
	"parth_role" text,
	"github_url" text,
	"demo_url" text,
	"video_url" text,
	"pdf_download_url" text,
	"cover_media_id" uuid,
	"published" boolean DEFAULT false NOT NULL,
	"hidden" boolean DEFAULT false NOT NULL,
	"archived" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "milestones" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_label" text,
	"event_date" date,
	"title" text NOT NULL,
	"short_description" text,
	"category" "milestone_category",
	"related_project_id" uuid,
	"related_proof_id" uuid,
	"related_video_id" uuid,
	"display_order" integer DEFAULT 100 NOT NULL,
	"featured_on_about" boolean DEFAULT false NOT NULL,
	"featured_on_home" boolean DEFAULT false NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"hidden" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "proof_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"proof_type" "proof_type" NOT NULL,
	"short_description" text,
	"what_this_proves" text,
	"file_url" text,
	"media_id" uuid,
	"external_url" text,
	"event_date" date,
	"related_project_id" uuid,
	"related_milestone_id" uuid,
	"featured_on_home" boolean DEFAULT false NOT NULL,
	"featured_on_about" boolean DEFAULT false NOT NULL,
	"display_order" integer DEFAULT 100 NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"hidden" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "proof_items_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "videos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"youtube_url" text NOT NULL,
	"thumbnail_media_id" uuid,
	"category" "video_category",
	"event_date" date,
	"related_project_id" uuid,
	"short_description" text,
	"featured_on_home" boolean DEFAULT false NOT NULL,
	"featured_on_about" boolean DEFAULT false NOT NULL,
	"display_order" integer DEFAULT 100 NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"hidden" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "videos_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "updates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"update_type" "update_type" NOT NULL,
	"short_summary" text,
	"body" text,
	"related_project_id" uuid,
	"related_video_id" uuid,
	"related_proof_id" uuid,
	"event_date" date,
	"featured_on_home" boolean DEFAULT false NOT NULL,
	"display_order" integer DEFAULT 100 NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"hidden" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "updates_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "page_sections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"page_key" text NOT NULL,
	"section_key" text NOT NULL,
	"eyebrow" text,
	"heading" text,
	"body" text,
	"cta_label" text,
	"cta_url" text,
	"image_media_id" uuid,
	"display_order" integer DEFAULT 100 NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_cover_media_id_media_id_fk" FOREIGN KEY ("cover_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "milestones" ADD CONSTRAINT "milestones_related_project_id_projects_id_fk" FOREIGN KEY ("related_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "proof_items" ADD CONSTRAINT "proof_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "proof_items" ADD CONSTRAINT "proof_items_related_project_id_projects_id_fk" FOREIGN KEY ("related_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "proof_items" ADD CONSTRAINT "proof_items_related_milestone_id_milestones_id_fk" FOREIGN KEY ("related_milestone_id") REFERENCES "public"."milestones"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "videos" ADD CONSTRAINT "videos_thumbnail_media_id_media_id_fk" FOREIGN KEY ("thumbnail_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "videos" ADD CONSTRAINT "videos_related_project_id_projects_id_fk" FOREIGN KEY ("related_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "updates" ADD CONSTRAINT "updates_related_project_id_projects_id_fk" FOREIGN KEY ("related_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "updates" ADD CONSTRAINT "updates_related_video_id_videos_id_fk" FOREIGN KEY ("related_video_id") REFERENCES "public"."videos"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "updates" ADD CONSTRAINT "updates_related_proof_id_proof_items_id_fk" FOREIGN KEY ("related_proof_id") REFERENCES "public"."proof_items"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "page_sections" ADD CONSTRAINT "page_sections_image_media_id_media_id_fk" FOREIGN KEY ("image_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "projects_public_home_idx" ON "projects" USING btree ("published","hidden","archived","featured_on_home","display_order");--> statement-breakpoint
CREATE INDEX "projects_public_list_idx" ON "projects" USING btree ("published","hidden","archived","display_order");--> statement-breakpoint
CREATE INDEX "milestones_about_idx" ON "milestones" USING btree ("featured_on_about","display_order");--> statement-breakpoint
CREATE INDEX "milestones_event_date_idx" ON "milestones" USING btree ("event_date");--> statement-breakpoint
CREATE INDEX "proof_items_public_idx" ON "proof_items" USING btree ("published","hidden","display_order");--> statement-breakpoint
CREATE INDEX "proof_items_type_public_idx" ON "proof_items" USING btree ("proof_type","published","hidden");--> statement-breakpoint
CREATE INDEX "proof_items_event_date_idx" ON "proof_items" USING btree ("event_date");--> statement-breakpoint
CREATE INDEX "videos_public_home_idx" ON "videos" USING btree ("published","hidden","featured_on_home","display_order");--> statement-breakpoint
CREATE INDEX "videos_event_date_idx" ON "videos" USING btree ("event_date");--> statement-breakpoint
CREATE INDEX "updates_public_home_idx" ON "updates" USING btree ("published","hidden","featured_on_home","display_order");--> statement-breakpoint
CREATE INDEX "updates_event_date_idx" ON "updates" USING btree ("event_date");--> statement-breakpoint
CREATE UNIQUE INDEX "page_sections_page_section_unique" ON "page_sections" USING btree ("page_key","section_key");--> statement-breakpoint
CREATE INDEX "page_sections_page_key_idx" ON "page_sections" USING btree ("page_key");