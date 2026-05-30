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
import { milestoneCategoryEnum } from "./enums";
import { projects } from "./projects";

/**
 * related_proof_id and related_video_id are nullable UUIDs without FK
 * constraints to avoid circular dependencies with proof_items.
 */
export const milestones = pgTable(
  "milestones",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    eventLabel: text("event_label"),
    eventDate: date("event_date"),
    title: text("title").notNull(),
    shortDescription: text("short_description"),
    category: milestoneCategoryEnum("category"),
    relatedProjectId: uuid("related_project_id").references(() => projects.id, {
      onDelete: "set null",
    }),
    relatedProofId: uuid("related_proof_id"),
    relatedVideoId: uuid("related_video_id"),
    displayOrder: integer("display_order").notNull().default(100),
    featuredOnAbout: boolean("featured_on_about").notNull().default(false),
    featuredOnHome: boolean("featured_on_home").notNull().default(false),
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
    index("milestones_about_idx").on(
      table.featuredOnAbout,
      table.displayOrder,
    ),
    index("milestones_event_date_idx").on(table.eventDate),
  ],
);

export type Milestone = typeof milestones.$inferSelect;
export type NewMilestone = typeof milestones.$inferInsert;
