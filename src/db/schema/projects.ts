import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { projectStatusEnum, projectTypeEnum } from "./enums";
import { media } from "./media";

export const projects = pgTable(
  "projects",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    shortDescription: text("short_description").notNull(),
    fullDescription: text("full_description"),
    projectType: projectTypeEnum("project_type").notNull(),
    status: projectStatusEnum("status").notNull(),
    featuredOnHome: boolean("featured_on_home").notNull().default(false),
    featuredOnAbout: boolean("featured_on_about").notNull().default(false),
    displayOrder: integer("display_order").notNull().default(100),
    techStack: text("tech_stack").array(),
    problemSolved: text("problem_solved"),
    whatItDoes: text("what_it_does"),
    parthRole: text("parth_role"),
    githubUrl: text("github_url"),
    demoUrl: text("demo_url"),
    videoUrl: text("video_url"),
    pdfDownloadUrl: text("pdf_download_url"),
    coverMediaId: uuid("cover_media_id").references(() => media.id, {
      onDelete: "set null",
    }),
    published: boolean("published").notNull().default(false),
    hidden: boolean("hidden").notNull().default(false),
    archived: boolean("archived").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("projects_public_home_idx").on(
      table.published,
      table.hidden,
      table.archived,
      table.featuredOnHome,
      table.displayOrder,
    ),
    index("projects_public_list_idx").on(
      table.published,
      table.hidden,
      table.archived,
      table.displayOrder,
    ),
  ],
);

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
