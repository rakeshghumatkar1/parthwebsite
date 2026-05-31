CREATE TYPE "public"."project_phase" AS ENUM('current_work', 'early_work');--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "project_phase" "project_phase" DEFAULT 'current_work' NOT NULL;