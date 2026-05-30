import {
  bigint,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { mediaDisplayModeEnum, mediaRoleEnum } from "./enums";

/**
 * Media metadata. Optional related_* columns are back-links only (no FK)
 * to avoid circular migration dependencies with content tables.
 */
export const media = pgTable("media", {
  id: uuid("id").primaryKey().defaultRandom(),
  fileUrl: text("file_url").notNull(),
  fileName: text("file_name"),
  fileType: text("file_type"),
  mimeType: text("mime_type"),
  fileSizeBytes: bigint("file_size_bytes", { mode: "number" }),
  altText: text("alt_text"),
  caption: text("caption"),
  imageRole: mediaRoleEnum("image_role"),
  imageFocalPoint: text("image_focal_point"),
  imageDisplayMode: mediaDisplayModeEnum("image_display_mode"),
  mobileFileUrl: text("mobile_file_url"),
  ogImageUrl: text("og_image_url"),
  relatedProjectId: uuid("related_project_id"),
  relatedProofId: uuid("related_proof_id"),
  relatedVideoId: uuid("related_video_id"),
  uploadedBy: text("uploaded_by"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Media = typeof media.$inferSelect;
export type NewMedia = typeof media.$inferInsert;
