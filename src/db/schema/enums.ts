import { pgEnum } from "drizzle-orm/pg-core";

export const projectTypeEnum = pgEnum("project_type", [
  "internal_tool",
  "ai_system",
  "automation",
  "data_platform",
  "saas",
  "content_media",
  "other",
]);

export const projectStatusEnum = pgEnum("project_status", [
  "active",
  "experiment",
  "archived",
  "concept",
]);

export const projectPhaseEnum = pgEnum("project_phase", [
  "current_work",
  "early_work",
]);

export const proofTypeEnum = pgEnum("proof_type", [
  "github",
  "youtube",
  "screenshot",
  "pdf",
  "recognition",
  "presentation",
  "technical_note",
  "certificate",
  "milestone_proof",
  "build_document",
]);

export const videoCategoryEnum = pgEnum("video_category", [
  "demo",
  "walkthrough",
  "presentation",
  "hardware",
  "software",
  "other",
]);

export const milestoneCategoryEnum = pgEnum("milestone_category", [
  "hardware",
  "software",
  "recognition",
  "presentation",
  "other",
]);

export const updateTypeEnum = pgEnum("update_type", [
  "new_project",
  "new_repo",
  "new_video",
  "new_proof",
  "new_feature",
  "technical_note",
  "status_change",
]);

export const mediaRoleEnum = pgEnum("media_role", [
  "hero_atmospheric",
  "section_artwork",
  "card_thumbnail",
  "video_thumbnail",
  "proof_document",
  "gallery_image",
  "detail_image",
  "profile_photo",
  "lifestyle_photo",
  "og_social",
]);

export const mediaDisplayModeEnum = pgEnum("media_display_mode", [
  "bleed",
  "cover",
  "contain",
  "natural",
  "thumbnail",
  "background_decorative",
]);
