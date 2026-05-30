import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { media } from "./media";

export const pageSections = pgTable(
  "page_sections",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    pageKey: text("page_key").notNull(),
    sectionKey: text("section_key").notNull(),
    eyebrow: text("eyebrow"),
    heading: text("heading"),
    body: text("body"),
    ctaLabel: text("cta_label"),
    ctaUrl: text("cta_url"),
    imageMediaId: uuid("image_media_id").references(() => media.id, {
      onDelete: "set null",
    }),
    displayOrder: integer("display_order").notNull().default(100),
    published: boolean("published").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("page_sections_page_section_unique").on(
      table.pageKey,
      table.sectionKey,
    ),
    index("page_sections_page_key_idx").on(table.pageKey),
  ],
);

export type PageSection = typeof pageSections.$inferSelect;
export type NewPageSection = typeof pageSections.$inferInsert;
