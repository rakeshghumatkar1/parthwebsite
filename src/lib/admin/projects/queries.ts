import {
  and,
  asc,
  desc,
  eq,
  ilike,
  ne,
  or,
  type SQL,
} from "drizzle-orm";
import { getDb } from "@/db";
import { projects } from "@/db/schema/projects";
import type { Project, ProjectListFilters } from "./types";

function buildListConditions(filters: ProjectListFilters): SQL | undefined {
  const conditions: SQL[] = [];

  const q = filters.q?.trim();
  if (q) {
    const pattern = `%${q}%`;
    conditions.push(
      or(
        ilike(projects.title, pattern),
        ilike(projects.slug, pattern),
        ilike(projects.shortDescription, pattern),
      )!,
    );
  }

  if (filters.status) {
    conditions.push(eq(projects.status, filters.status as never));
  }

  if (filters.projectType) {
    conditions.push(eq(projects.projectType, filters.projectType as never));
  }

  if (filters.published === "true") {
    conditions.push(eq(projects.published, true));
  } else if (filters.published === "false") {
    conditions.push(eq(projects.published, false));
  }

  if (filters.hidden === "true") {
    conditions.push(eq(projects.hidden, true));
  } else if (filters.hidden === "false") {
    conditions.push(eq(projects.hidden, false));
  }

  if (filters.archived === "true") {
    conditions.push(eq(projects.archived, true));
  } else if (filters.archived === "false") {
    conditions.push(eq(projects.archived, false));
  }

  if (filters.featuredOnHome === "true") {
    conditions.push(eq(projects.featuredOnHome, true));
  } else if (filters.featuredOnHome === "false") {
    conditions.push(eq(projects.featuredOnHome, false));
  }

  if (filters.featuredOnAbout === "true") {
    conditions.push(eq(projects.featuredOnAbout, true));
  } else if (filters.featuredOnAbout === "false") {
    conditions.push(eq(projects.featuredOnAbout, false));
  }

  return conditions.length > 0 ? and(...conditions) : undefined;
}

export async function listProjects(
  filters: ProjectListFilters = {},
): Promise<Project[]> {
  const db = getDb();
  const where = buildListConditions(filters);

  return db
    .select()
    .from(projects)
    .where(where)
    .orderBy(asc(projects.displayOrder), desc(projects.updatedAt));
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const db = getDb();
  const [project] = await db
    .select()
    .from(projects)
    .where(eq(projects.id, id))
    .limit(1);
  return project;
}

export async function isSlugTaken(
  slug: string,
  excludeId?: string,
): Promise<boolean> {
  const db = getDb();
  const conditions = excludeId
    ? and(eq(projects.slug, slug), ne(projects.id, excludeId))
    : eq(projects.slug, slug);

  const [row] = await db
    .select({ id: projects.id })
    .from(projects)
    .where(conditions)
    .limit(1);

  return Boolean(row);
}

export async function createProjectRecord(
  data: typeof projects.$inferInsert,
): Promise<Project> {
  const db = getDb();
  const [created] = await db.insert(projects).values(data).returning();
  if (!created) {
    throw new Error("Could not create project.");
  }
  return created;
}

export async function updateProjectRecord(
  id: string,
  data: Partial<typeof projects.$inferInsert>,
): Promise<Project | undefined> {
  const db = getDb();
  const [updated] = await db
    .update(projects)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(projects.id, id))
    .returning();
  return updated;
}

export async function updateProjectFlags(
  id: string,
  flags: Partial<
    Pick<
      Project,
      "published" | "hidden" | "archived" | "featuredOnHome" | "featuredOnAbout"
    >
  >,
): Promise<Project | undefined> {
  return updateProjectRecord(id, flags);
}
