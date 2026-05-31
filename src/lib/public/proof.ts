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
import { proofItems, type ProofItem } from "@/db/schema/proof-items";
import { projects } from "@/db/schema/projects";

export const PROOF_TYPE_LABELS: Record<string, string> = {
  github: "GitHub",
  youtube: "YouTube",
  screenshot: "Screenshot",
  pdf: "PDF",
  recognition: "Recognition",
  presentation: "Presentation",
  technical_note: "Technical Note",
  certificate: "Certificate",
  milestone_proof: "Milestone Proof",
  build_document: "Build Document",
};

export type PublicProofItem = {
  id: string;
  title: string;
  slug: string;
  proofType: string;
  shortDescription: string | null;
  whatThisProves: string | null;
  fileUrl: string | null;
  externalUrl: string | null;
  eventDate: string | null;
  mediaId: string | null;
  relatedProjectId: string | null;
  relatedProjectTitle: string | null;
  relatedProjectSlug: string | null;
  displayOrder: number;
  updatedAt: Date;
};

export type PublicProofListFilters = {
  proofType?: string;
  relatedProjectId?: string;
  q?: string;
};

function publicProofConditions(extra?: SQL) {
  const base = and(eq(proofItems.published, true), eq(proofItems.hidden, false));
  return extra ? and(base, extra) : base;
}

const publicRelatedProjectJoin = and(
  eq(proofItems.relatedProjectId, projects.id),
  eq(projects.published, true),
  eq(projects.hidden, false),
  eq(projects.archived, false),
);

function mapProofRow(
  row: ProofItem,
  related?: { title: string | null; slug: string | null },
): PublicProofItem {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    proofType: row.proofType,
    shortDescription: row.shortDescription,
    whatThisProves: row.whatThisProves,
    fileUrl: row.fileUrl,
    externalUrl: row.externalUrl,
    eventDate: row.eventDate,
    mediaId: row.mediaId,
    relatedProjectId: row.relatedProjectId,
    relatedProjectTitle: related?.title ?? null,
    relatedProjectSlug: related?.slug ?? null,
    displayOrder: row.displayOrder,
    updatedAt: row.updatedAt,
  };
}

export function proofTypeLabel(value: string): string {
  return PROOF_TYPE_LABELS[value] ?? value;
}

export function proofPrimaryLink(item: PublicProofItem): string | null {
  return item.externalUrl?.trim() || item.fileUrl?.trim() || null;
}

export async function getPublicProofItems(
  filters: PublicProofListFilters = {},
): Promise<PublicProofItem[]> {
  if (!isDatabaseConfigured()) {
    return [];
  }

  const conditions: SQL[] = [];

  if (filters.proofType) {
    conditions.push(eq(proofItems.proofType, filters.proofType as never));
  }
  if (filters.relatedProjectId) {
    conditions.push(eq(proofItems.relatedProjectId, filters.relatedProjectId));
  }
  const q = filters.q?.trim();
  if (q) {
    const pattern = `%${q}%`;
    conditions.push(
      or(
        ilike(proofItems.title, pattern),
        ilike(proofItems.slug, pattern),
        ilike(proofItems.shortDescription, pattern),
        ilike(proofItems.whatThisProves, pattern),
      )!,
    );
  }

  const extra = conditions.length > 0 ? and(...conditions) : undefined;

  try {
    const db = getDb();
    const rows = await db
      .select({
        proof: proofItems,
        relatedProjectTitle: projects.title,
        relatedProjectSlug: projects.slug,
      })
      .from(proofItems)
      .leftJoin(projects, publicRelatedProjectJoin)
      .where(publicProofConditions(extra))
      .orderBy(
        asc(proofItems.displayOrder),
        sql`${proofItems.eventDate} desc nulls last`,
        desc(proofItems.updatedAt),
      );

    return rows.map((row) =>
      mapProofRow(row.proof, {
        title: row.relatedProjectTitle,
        slug: row.relatedProjectSlug,
      }),
    );
  } catch {
    return [];
  }
}

/** Total published public proof items (no list filters applied). */
export async function getPublicProofItemsCount(): Promise<number> {
  if (!isDatabaseConfigured()) {
    return 0;
  }

  try {
    const db = getDb();
    const [row] = await db
      .select({ count: count() })
      .from(proofItems)
      .where(publicProofConditions());
    return row?.count ?? 0;
  } catch {
    return 0;
  }
}

export async function getPublicFeaturedAboutProof(
  limit?: number,
): Promise<PublicProofItem[]> {
  if (!isDatabaseConfigured()) {
    return [];
  }

  try {
    const db = getDb();
    const baseQuery = db
      .select({
        proof: proofItems,
        relatedProjectTitle: projects.title,
        relatedProjectSlug: projects.slug,
      })
      .from(proofItems)
      .leftJoin(projects, publicRelatedProjectJoin)
      .where(
        publicProofConditions(eq(proofItems.featuredOnAbout, true)),
      )
      .orderBy(
        asc(proofItems.displayOrder),
        sql`${proofItems.eventDate} desc nulls last`,
        desc(proofItems.updatedAt),
      );

    const rows = limit ? await baseQuery.limit(limit) : await baseQuery;
    return rows.map((row) =>
      mapProofRow(row.proof, {
        title: row.relatedProjectTitle,
        slug: row.relatedProjectSlug,
      }),
    );
  } catch {
    return [];
  }
}
