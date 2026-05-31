import {
  and,
  asc,
  count,
  desc,
  eq,
  ilike,
  or,
  sql,
  type SQL,
} from "drizzle-orm";
import { getDb, isDatabaseConfigured } from "@/db";
import { projects } from "@/db/schema/projects";
import { updates, type Update } from "@/db/schema/updates";

export const UPDATE_TYPE_LABELS: Record<string, string> = {
  new_project: "New Project",
  new_repo: "New Repo",
  new_video: "New Video",
  new_proof: "New Proof",
  new_feature: "New Feature",
  technical_note: "Technical Note",
  status_change: "Status Change",
};

export type PublicUpdate = {
  id: string;
  title: string;
  slug: string;
  updateType: string;
  shortSummary: string | null;
  body: string | null;
  eventDate: string | null;
  relatedProjectId: string | null;
  relatedProjectTitle: string | null;
  relatedProjectSlug: string | null;
  displayOrder: number;
  updatedAt: Date;
};

export type PublicUpdateListFilters = {
  updateType?: string;
  relatedProjectId?: string;
  q?: string;
};

function publicUpdateConditions(extra?: SQL) {
  const base = and(eq(updates.published, true), eq(updates.hidden, false));
  return extra ? and(base, extra) : base;
}

const publicRelatedProjectJoin = and(
  eq(updates.relatedProjectId, projects.id),
  eq(projects.published, true),
  eq(projects.hidden, false),
  eq(projects.archived, false),
);

function mapUpdateRow(
  row: Update,
  related?: { title: string | null; slug: string | null },
): PublicUpdate {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    updateType: row.updateType,
    shortSummary: row.shortSummary,
    body: row.body,
    eventDate: row.eventDate,
    relatedProjectId: row.relatedProjectId,
    relatedProjectTitle: related?.title ?? null,
    relatedProjectSlug: related?.slug ?? null,
    displayOrder: row.displayOrder,
    updatedAt: row.updatedAt,
  };
}

export function updateTypeLabel(value: string): string {
  return UPDATE_TYPE_LABELS[value] ?? value;
}

export async function getPublicUpdates(
  filters: PublicUpdateListFilters = {},
): Promise<PublicUpdate[]> {
  if (!isDatabaseConfigured()) {
    return [];
  }

  const conditions: SQL[] = [];

  if (filters.updateType) {
    conditions.push(eq(updates.updateType, filters.updateType as never));
  }
  if (filters.relatedProjectId) {
    conditions.push(eq(updates.relatedProjectId, filters.relatedProjectId));
  }
  const q = filters.q?.trim();
  if (q) {
    const pattern = `%${q}%`;
    conditions.push(
      or(
        ilike(updates.title, pattern),
        ilike(updates.slug, pattern),
        ilike(updates.shortSummary, pattern),
        ilike(updates.body, pattern),
      )!,
    );
  }

  const extra = conditions.length > 0 ? and(...conditions) : undefined;

  try {
    const db = getDb();
    const rows = await db
      .select({
        update: updates,
        relatedProjectTitle: projects.title,
        relatedProjectSlug: projects.slug,
      })
      .from(updates)
      .leftJoin(projects, publicRelatedProjectJoin)
      .where(publicUpdateConditions(extra))
      .orderBy(
        asc(updates.displayOrder),
        sql`${updates.eventDate} desc nulls last`,
        desc(updates.updatedAt),
      );

    return rows.map((row) =>
      mapUpdateRow(row.update, {
        title: row.relatedProjectTitle,
        slug: row.relatedProjectSlug,
      }),
    );
  } catch {
    return [];
  }
}

/** Total published public updates (no list filters applied). */
export async function getPublicUpdatesCount(): Promise<number> {
  if (!isDatabaseConfigured()) {
    return 0;
  }

  try {
    const db = getDb();
    const [row] = await db
      .select({ count: count() })
      .from(updates)
      .where(publicUpdateConditions());
    return row?.count ?? 0;
  } catch {
    return 0;
  }
}
