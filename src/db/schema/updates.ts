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
import { updateTypeEnum } from "./enums";
import { proofItems } from "./proof-items";
import { projects } from "./projects";
import { videos } from "./videos";

export const updates = pgTable(
  "updates",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    updateType: updateTypeEnum("update_type").notNull(),
    shortSummary: text("short_summary"),
    body: text("body"),
    relatedProjectId: uuid("related_project_id").references(
      () => projects.id,
      { onDelete: "set null" },
    ),
    relatedVideoId: uuid("related_video_id").references(() => videos.id, {
      onDelete: "set null",
    }),
    relatedProofId: uuid("related_proof_id").references(() => proofItems.id, {
      onDelete: "set null",
    }),
    eventDate: date("event_date"),
    featuredOnHome: boolean("featured_on_home").notNull().default(false),
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
    index("updates_public_home_idx").on(
      table.published,
      table.hidden,
      table.featuredOnHome,
      table.displayOrder,
    ),
    index("updates_event_date_idx").on(table.eventDate),
  ],
);

export type Update = typeof updates.$inferSelect;
export type NewUpdate = typeof updates.$inferInsert;
