import {
  and,
  asc,
  desc,
  eq,
  ilike,
  or,
  sql,
  type SQL,
} from "drizzle-orm";
import { getDb, isDatabaseConfigured } from "@/db";
import { projects } from "@/db/schema/projects";
import { videos, type Video } from "@/db/schema/videos";

export const VIDEO_CATEGORY_LABELS: Record<string, string> = {
  demo: "Demo",
  walkthrough: "Walkthrough",
  presentation: "Presentation",
  hardware: "Hardware",
  software: "Software",
  other: "Other",
};

export type PublicVideo = {
  id: string;
  title: string;
  slug: string;
  youtubeUrl: string;
  category: string | null;
  shortDescription: string | null;
  eventDate: string | null;
  thumbnailMediaId: string | null;
  relatedProjectId: string | null;
  relatedProjectTitle: string | null;
  relatedProjectSlug: string | null;
  displayOrder: number;
  updatedAt: Date;
};

export type PublicVideoListFilters = {
  category?: string;
  relatedProjectId?: string;
  q?: string;
};

function publicVideoConditions(extra?: SQL) {
  const base = and(eq(videos.published, true), eq(videos.hidden, false));
  return extra ? and(base, extra) : base;
}

const publicRelatedProjectJoin = and(
  eq(videos.relatedProjectId, projects.id),
  eq(projects.published, true),
  eq(projects.hidden, false),
  eq(projects.archived, false),
);

function mapVideoRow(
  row: Video,
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

export function videoCategoryLabel(value: string | null | undefined): string | null {
  if (!value) {
    return null;
  }
  return VIDEO_CATEGORY_LABELS[value] ?? value;
}

export async function getPublicVideos(
  filters: PublicVideoListFilters = {},
): Promise<PublicVideo[]> {
  if (!isDatabaseConfigured()) {
    return [];
  }

  const conditions: SQL[] = [];

  if (filters.category) {
    conditions.push(eq(videos.category, filters.category as never));
  }
  if (filters.relatedProjectId) {
    conditions.push(eq(videos.relatedProjectId, filters.relatedProjectId));
  }
  const q = filters.q?.trim();
  if (q) {
    const pattern = `%${q}%`;
    conditions.push(
      or(
        ilike(videos.title, pattern),
        ilike(videos.slug, pattern),
        ilike(videos.shortDescription, pattern),
        ilike(videos.youtubeUrl, pattern),
      )!,
    );
  }

  const extra = conditions.length > 0 ? and(...conditions) : undefined;

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
      .where(publicVideoConditions(extra))
      .orderBy(
        asc(videos.displayOrder),
        sql`${videos.eventDate} desc nulls last`,
        desc(videos.updatedAt),
      );

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

export async function getPublicFeaturedAboutVideos(
  limit?: number,
): Promise<PublicVideo[]> {
  if (!isDatabaseConfigured()) {
    return [];
  }

  try {
    const db = getDb();
    const baseQuery = db
      .select({
        video: videos,
        relatedProjectTitle: projects.title,
        relatedProjectSlug: projects.slug,
      })
      .from(videos)
      .leftJoin(projects, publicRelatedProjectJoin)
      .where(publicVideoConditions(eq(videos.featuredOnAbout, true)))
      .orderBy(
        asc(videos.displayOrder),
        sql`${videos.eventDate} desc nulls last`,
        desc(videos.updatedAt),
      );

    const rows = limit ? await baseQuery.limit(limit) : await baseQuery;
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
