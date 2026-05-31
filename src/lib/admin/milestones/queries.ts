import { and, asc, desc, eq, ilike, or, type SQL } from "drizzle-orm";
import { getDb } from "@/db";
import { milestones } from "@/db/schema/milestones";
import type { Milestone, MilestoneListFilters } from "./types";

function buildConditions(filters: MilestoneListFilters): SQL | undefined {
  const conditions: SQL[] = [];
  const q = filters.q?.trim();
  if (q) {
    const pattern = `%${q}%`;
    conditions.push(or(ilike(milestones.title, pattern), ilike(milestones.eventLabel, pattern), ilike(milestones.shortDescription, pattern))!);
  }
  if (filters.category) conditions.push(eq(milestones.category, filters.category as never));
  if (filters.published === "true") conditions.push(eq(milestones.published, true));
  else if (filters.published === "false") conditions.push(eq(milestones.published, false));
  if (filters.hidden === "true") conditions.push(eq(milestones.hidden, true));
  else if (filters.hidden === "false") conditions.push(eq(milestones.hidden, false));
  if (filters.featuredOnHome === "true") conditions.push(eq(milestones.featuredOnHome, true));
  else if (filters.featuredOnHome === "false") conditions.push(eq(milestones.featuredOnHome, false));
  if (filters.featuredOnAbout === "true") conditions.push(eq(milestones.featuredOnAbout, true));
  else if (filters.featuredOnAbout === "false") conditions.push(eq(milestones.featuredOnAbout, false));
  if (filters.relatedProjectId) conditions.push(eq(milestones.relatedProjectId, filters.relatedProjectId));
  return conditions.length > 0 ? and(...conditions) : undefined;
}

export async function listMilestones(filters: MilestoneListFilters = {}): Promise<Milestone[]> {
  const db = getDb();
  return db.select().from(milestones).where(buildConditions(filters)).orderBy(asc(milestones.displayOrder), desc(milestones.updatedAt));
}

export async function getMilestoneById(id: string) {
  const db = getDb();
  const [row] = await db.select().from(milestones).where(eq(milestones.id, id)).limit(1);
  return row;
}

export async function createMilestoneRecord(data: typeof milestones.$inferInsert) {
  const db = getDb();
  const [created] = await db.insert(milestones).values(data).returning();
  if (!created) throw new Error("Could not create milestone.");
  return created;
}

export async function updateMilestoneRecord(id: string, data: Partial<typeof milestones.$inferInsert>) {
  const db = getDb();
  const [updated] = await db.update(milestones).set({ ...data, updatedAt: new Date() }).where(eq(milestones.id, id)).returning();
  return updated;
}

export async function updateMilestoneFlags(id: string, flags: Partial<Pick<Milestone, "published" | "hidden">>) {
  return updateMilestoneRecord(id, flags);
}
