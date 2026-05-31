import { and, asc, desc, eq, inArray, isNotNull, lte, sql } from "drizzle-orm";
import { getDb, isDatabaseConfigured } from "@/db";
import { proofItems } from "@/db/schema/proof-items";
import { projects } from "@/db/schema/projects";
import { videos } from "@/db/schema/videos";
import { BUILD_JOURNEY_EARLY_ERA_CUTOFF } from "@/lib/build-journey-page-content";
import {
  proofPrimaryLink,
  type PublicProofItem,
} from "@/lib/public/proof";
import { type PublicVideo } from "@/lib/public/videos";

function publicVideoBase() {
  return and(eq(videos.published, true), eq(videos.hidden, false));
}

function publicProofBase() {
  return and(eq(proofItems.published, true), eq(proofItems.hidden, false));
}

const publicRelatedProjectJoin = and(
  eq(videos.relatedProjectId, projects.id),
  eq(projects.published, true),
  eq(projects.hidden, false),
  eq(projects.archived, false),
);

const publicProofRelatedProjectJoin = and(
  eq(proofItems.relatedProjectId, projects.id),
  eq(projects.published, true),
  eq(projects.hidden, false),
  eq(projects.archived, false),
);

function mapVideoRow(
  row: typeof videos.$inferSelect,
  related?: { title: string | null; slug: string | null },
): PublicVideo {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    youtubeUrl: row.youtubeUrl,
    category: row.category,
    shortDescription: row.shortDescription,
    eventDate: row.eventDate,
    thumbnailMediaId: row.thumbnailMediaId,
    relatedProjectId: row.relatedProjectId,
    relatedProjectTitle: related?.title ?? null,
    relatedProjectSlug: related?.slug ?? null,
    displayOrder: row.displayOrder,
    updatedAt: row.updatedAt,
  };
}

function mapProofRow(
  row: typeof proofItems.$inferSelect,
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

export async function getPublicEarlyBuildVideos(
  limit = 6,
): Promise<PublicVideo[]> {
  if (!isDatabaseConfigured()) {
    return [];
  }

  try {
    const db = getDb();
    const rows = await db
      .select({
        video: videos,
        relatedProjectTitle: projects.title,
        relatedProjectSlug: projects.slug,
      })
      .from(videos)
      .leftJoin(projects, publicRelatedProjectJoin)
      .where(
        and(
          publicVideoBase(),
          isNotNull(videos.eventDate),
          lte(videos.eventDate, BUILD_JOURNEY_EARLY_ERA_CUTOFF),
        ),
      )
      .orderBy(
        asc(videos.displayOrder),
        sql`${videos.eventDate} desc nulls last`,
        desc(videos.updatedAt),
      )
      .limit(limit);

    return rows.map((row) =>
      mapVideoRow(row.video, {
        title: row.relatedProjectTitle,
        slug: row.relatedProjectSlug,
      }),
    );
  } catch {
    return [];
  }
}

export async function getPublicEarlyBuildProof(
  limit = 8,
): Promise<PublicProofItem[]> {
  if (!isDatabaseConfigured()) {
    return [];
  }

  try {
    const db = getDb();
    const rows = await db
      .select({
        proof: proofItems,
        relatedProjectTitle: projects.title,
        relatedProjectSlug: projects.slug,
      })
      .from(proofItems)
      .leftJoin(projects, publicProofRelatedProjectJoin)
      .where(
        and(
          publicProofBase(),
          isNotNull(proofItems.eventDate),
          lte(proofItems.eventDate, BUILD_JOURNEY_EARLY_ERA_CUTOFF),
        ),
      )
      .orderBy(
        asc(proofItems.displayOrder),
        sql`${proofItems.eventDate} desc nulls last`,
        desc(proofItems.updatedAt),
      )
      .limit(limit);

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

export async function getBuildJourneyProofLinksBySlug(
  slugs: string[],
): Promise<Map<string, string>> {
  const links = new Map<string, string>();

  if (!isDatabaseConfigured() || slugs.length === 0) {
    return links;
  }

  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(proofItems)
      .where(and(publicProofBase(), inArray(proofItems.slug, slugs)));

    for (const row of rows) {
      const item = mapProofRow(row);
      const link = proofPrimaryLink(item);
      if (link) {
        links.set(row.slug, link);
      }
    }
  } catch {
    return links;
  }

  return links;
}
