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
import { videoCategoryEnum } from "./enums";
import { media } from "./media";
import { projects } from "./projects";

export const videos = pgTable(
  "videos",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    youtubeUrl: text("youtube_url").notNull(),
    thumbnailMediaId: uuid("thumbnail_media_id").references(() => media.id, {
      onDelete: "set null",
    }),
    category: videoCategoryEnum("category"),
    eventDate: date("event_date"),
    relatedProjectId: uuid("related_project_id").references(
      () => projects.id,
      { onDelete: "set null" },
    ),
    shortDescription: text("short_description"),
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
    index("videos_public_home_idx").on(
      table.published,
      table.hidden,
      table.featuredOnHome,
      table.displayOrder,
    ),
    index("videos_event_date_idx").on(table.eventDate),
  ],
);

export type Video = typeof videos.$inferSelect;
export type NewVideo = typeof videos.$inferInsert;
