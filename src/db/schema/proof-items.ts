import {
  boolean,
  date,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { proofTypeEnum } from "./enums";
import { media } from "./media";
import { milestones } from "./milestones";
import { projects } from "./projects";

export const proofItems = pgTable(
  "proof_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    proofType: proofTypeEnum("proof_type").notNull(),
    shortDescription: text("short_description"),
    whatThisProves: text("what_this_proves"),
    fileUrl: text("file_url"),
    mediaId: uuid("media_id").references(() => media.id, {
      onDelete: "set null",
    }),
    externalUrl: text("external_url"),
    eventDate: date("event_date"),
    relatedProjectId: uuid("related_project_id").references(
      () => projects.id,
      { onDelete: "set null" },
    ),
    relatedMilestoneId: uuid("related_milestone_id").references(
      () => milestones.id,
      { onDelete: "set null" },
    ),
    featuredOnHome: boolean("featured_on_home").notNull().default(false),
    featuredOnAbout: boolean("featured_on_about").notNull().default(false),
    displayOrder: integer("display_order").notNull().default(100),
    published: boolean("published").notNull().default(false),
    hidden: boolean("hidden").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("proof_items_public_idx").on(
      table.published,
      table.hidden,
      table.displayOrder,
    ),
    index("proof_items_type_public_idx").on(
      table.proofType,
      table.published,
      table.hidden,
    ),
    index("proof_items_event_date_idx").on(table.eventDate),
  ],
);

export type ProofItem = typeof proofItems.$inferSelect;
export type NewProofItem = typeof proofItems.$inferInsert;
