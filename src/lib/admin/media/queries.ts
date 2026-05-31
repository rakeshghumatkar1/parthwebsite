import { and, desc, eq, ilike, or, type SQL } from "drizzle-orm";
import { getDb } from "@/db";
import { media } from "@/db/schema/media";
import type { Media, MediaListFilters } from "./types";

function buildConditions(filters: MediaListFilters): SQL | undefined {
  const conditions: SQL[] = [];
  const q = filters.q?.trim();
  if (q) {
    const pattern = `%${q}%`;
    conditions.push(or(ilike(media.fileName, pattern), ilike(media.fileUrl, pattern), ilike(media.altText, pattern), ilike(media.caption, pattern))!);
  }
  if (filters.fileType) conditions.push(eq(media.fileType, filters.fileType));
  if (filters.imageRole) conditions.push(eq(media.imageRole, filters.imageRole as never));
  if (filters.imageDisplayMode) conditions.push(eq(media.imageDisplayMode, filters.imageDisplayMode as never));
  if (filters.relatedProjectId) conditions.push(eq(media.relatedProjectId, filters.relatedProjectId));
  return conditions.length > 0 ? and(...conditions) : undefined;
}

export async function listMediaRecords(filters: MediaListFilters = {}): Promise<Media[]> {
  const db = getDb();
  return db.select().from(media).where(buildConditions(filters)).orderBy(desc(media.updatedAt));
}

export async function getMediaById(id: string) {
  const db = getDb();
  const [row] = await db.select().from(media).where(eq(media.id, id)).limit(1);
  return row;
}

export async function createMediaRecord(data: typeof media.$inferInsert) {
  const db = getDb();
  const [created] = await db.insert(media).values(data).returning();
  if (!created) throw new Error("Could not create media record.");
  return created;
}

export async function updateMediaRecord(id: string, data: Partial<typeof media.$inferInsert>) {
  const db = getDb();
  const [updated] = await db.update(media).set({ ...data, updatedAt: new Date() }).where(eq(media.id, id)).returning();
  return updated;
}
