import { and, asc, desc, eq, ilike, ne, or, type SQL } from "drizzle-orm";
import { getDb } from "@/db";
import { videos } from "@/db/schema/videos";
import type { Video, VideoListFilters } from "./types";

function buildConditions(filters: VideoListFilters): SQL | undefined {
  const conditions: SQL[] = [];
  const q = filters.q?.trim();
  if (q) {
    const pattern = `%${q}%`;
    conditions.push(or(ilike(videos.title, pattern), ilike(videos.slug, pattern), ilike(videos.shortDescription, pattern), ilike(videos.youtubeUrl, pattern))!);
  }
  if (filters.category) conditions.push(eq(videos.category, filters.category as never));
  if (filters.published === "true") conditions.push(eq(videos.published, true));
  else if (filters.published === "false") conditions.push(eq(videos.published, false));
  if (filters.hidden === "true") conditions.push(eq(videos.hidden, true));
  else if (filters.hidden === "false") conditions.push(eq(videos.hidden, false));
  if (filters.featuredOnHome === "true") conditions.push(eq(videos.featuredOnHome, true));
  else if (filters.featuredOnHome === "false") conditions.push(eq(videos.featuredOnHome, false));
  if (filters.featuredOnAbout === "true") conditions.push(eq(videos.featuredOnAbout, true));
  else if (filters.featuredOnAbout === "false") conditions.push(eq(videos.featuredOnAbout, false));
  if (filters.relatedProjectId) conditions.push(eq(videos.relatedProjectId, filters.relatedProjectId));
  return conditions.length > 0 ? and(...conditions) : undefined;
}

export async function listVideos(filters: VideoListFilters = {}): Promise<Video[]> {
  const db = getDb();
  return db.select().from(videos).where(buildConditions(filters)).orderBy(asc(videos.displayOrder), desc(videos.updatedAt));
}

export async function getVideoById(id: string) {
  const db = getDb();
  const [row] = await db.select().from(videos).where(eq(videos.id, id)).limit(1);
  return row;
}

export async function isVideoSlugTaken(slug: string, excludeId?: string) {
  const db = getDb();
  const conditions = excludeId ? and(eq(videos.slug, slug), ne(videos.id, excludeId)) : eq(videos.slug, slug);
  const [row] = await db.select({ id: videos.id }).from(videos).where(conditions).limit(1);
  return Boolean(row);
}

export async function createVideoRecord(data: typeof videos.$inferInsert) {
  const db = getDb();
  const [created] = await db.insert(videos).values(data).returning();
  if (!created) throw new Error("Could not create video.");
  return created;
}

export async function updateVideoRecord(id: string, data: Partial<typeof videos.$inferInsert>) {
  const db = getDb();
  const [updated] = await db.update(videos).set({ ...data, updatedAt: new Date() }).where(eq(videos.id, id)).returning();
  return updated;
}

export async function updateVideoFlags(id: string, flags: Partial<Pick<Video, "published" | "hidden">>) {
  return updateVideoRecord(id, flags);
}
