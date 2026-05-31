import { and, asc, desc, eq, ilike, ne, or, type SQL } from "drizzle-orm";
import { getDb } from "@/db";
import { updates } from "@/db/schema/updates";
import type { Update, UpdateListFilters } from "./types";

function buildConditions(filters: UpdateListFilters): SQL | undefined {
  const conditions: SQL[] = [];
  const q = filters.q?.trim();
  if (q) {
    const pattern = `%${q}%`;
    conditions.push(or(ilike(updates.title, pattern), ilike(updates.slug, pattern), ilike(updates.shortSummary, pattern), ilike(updates.body, pattern))!);
  }
  if (filters.updateType) conditions.push(eq(updates.updateType, filters.updateType as never));
  if (filters.published === "true") conditions.push(eq(updates.published, true));
  else if (filters.published === "false") conditions.push(eq(updates.published, false));
  if (filters.hidden === "true") conditions.push(eq(updates.hidden, true));
  else if (filters.hidden === "false") conditions.push(eq(updates.hidden, false));
  if (filters.featuredOnHome === "true") conditions.push(eq(updates.featuredOnHome, true));
  else if (filters.featuredOnHome === "false") conditions.push(eq(updates.featuredOnHome, false));
  if (filters.relatedProjectId) conditions.push(eq(updates.relatedProjectId, filters.relatedProjectId));
  return conditions.length > 0 ? and(...conditions) : undefined;
}

export async function listUpdates(filters: UpdateListFilters = {}): Promise<Update[]> {
  const db = getDb();
  return db.select().from(updates).where(buildConditions(filters)).orderBy(asc(updates.displayOrder), desc(updates.updatedAt));
}

export async function getUpdateById(id: string) {
  const db = getDb();
  const [row] = await db.select().from(updates).where(eq(updates.id, id)).limit(1);
  return row;
}

export async function isUpdateSlugTaken(slug: string, excludeId?: string) {
  const db = getDb();
  const conditions = excludeId ? and(eq(updates.slug, slug), ne(updates.id, excludeId)) : eq(updates.slug, slug);
  const [row] = await db.select({ id: updates.id }).from(updates).where(conditions).limit(1);
  return Boolean(row);
}

export async function createUpdateRecord(data: typeof updates.$inferInsert) {
  const db = getDb();
  const [created] = await db.insert(updates).values(data).returning();
  if (!created) throw new Error("Could not create update.");
  return created;
}

export async function updateUpdateRecord(id: string, data: Partial<typeof updates.$inferInsert>) {
  const db = getDb();
  const [updated] = await db.update(updates).set({ ...data, updatedAt: new Date() }).where(eq(updates.id, id)).returning();
  return updated;
}

export async function updateUpdateFlags(id: string, flags: Partial<Pick<Update, "published" | "hidden">>) {
  return updateUpdateRecord(id, flags);
}
