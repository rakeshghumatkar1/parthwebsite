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
import { proofItems } from "@/db/schema/proof-items";
import type { ProofItem, ProofListFilters } from "./types";

function buildConditions(filters: ProofListFilters): SQL | undefined {
  const conditions: SQL[] = [];
  const q = filters.q?.trim();
  if (q) {
    const pattern = `%${q}%`;
    conditions.push(
      or(
        ilike(proofItems.title, pattern),
        ilike(proofItems.slug, pattern),
        ilike(proofItems.shortDescription, pattern),
      )!,
    );
  }
  if (filters.proofType) {
    conditions.push(eq(proofItems.proofType, filters.proofType as never));
  }
  if (filters.published === "true") conditions.push(eq(proofItems.published, true));
  else if (filters.published === "false") conditions.push(eq(proofItems.published, false));
  if (filters.hidden === "true") conditions.push(eq(proofItems.hidden, true));
  else if (filters.hidden === "false") conditions.push(eq(proofItems.hidden, false));
  if (filters.featuredOnHome === "true") conditions.push(eq(proofItems.featuredOnHome, true));
  else if (filters.featuredOnHome === "false") conditions.push(eq(proofItems.featuredOnHome, false));
  if (filters.featuredOnAbout === "true") conditions.push(eq(proofItems.featuredOnAbout, true));
  else if (filters.featuredOnAbout === "false") conditions.push(eq(proofItems.featuredOnAbout, false));
  if (filters.relatedProjectId) {
    conditions.push(eq(proofItems.relatedProjectId, filters.relatedProjectId));
  }
  return conditions.length > 0 ? and(...conditions) : undefined;
}

export async function listProofItems(filters: ProofListFilters = {}): Promise<ProofItem[]> {
  const db = getDb();
  return db.select().from(proofItems).where(buildConditions(filters)).orderBy(asc(proofItems.displayOrder), desc(proofItems.updatedAt));
}

export async function getProofItemById(id: string): Promise<ProofItem | undefined> {
  const db = getDb();
  const [row] = await db.select().from(proofItems).where(eq(proofItems.id, id)).limit(1);
  return row;
}

export async function isProofSlugTaken(slug: string, excludeId?: string): Promise<boolean> {
  const db = getDb();
  const conditions = excludeId
    ? and(eq(proofItems.slug, slug), ne(proofItems.id, excludeId))
    : eq(proofItems.slug, slug);
  const [row] = await db.select({ id: proofItems.id }).from(proofItems).where(conditions).limit(1);
  return Boolean(row);
}

export async function createProofRecord(data: typeof proofItems.$inferInsert): Promise<ProofItem> {
  const db = getDb();
  const [created] = await db.insert(proofItems).values(data).returning();
  if (!created) throw new Error("Could not create proof item.");
  return created;
}

export async function updateProofRecord(id: string, data: Partial<typeof proofItems.$inferInsert>): Promise<ProofItem | undefined> {
  const db = getDb();
  const [updated] = await db.update(proofItems).set({ ...data, updatedAt: new Date() }).where(eq(proofItems.id, id)).returning();
  return updated;
}

export async function updateProofFlags(id: string, flags: Partial<Pick<ProofItem, "published" | "hidden">>): Promise<ProofItem | undefined> {
  return updateProofRecord(id, flags);
}
