import { and, asc, eq, sql } from "drizzle-orm";
import { getDb, isDatabaseConfigured } from "@/db";
import { milestones, type Milestone } from "@/db/schema/milestones";
import { projects } from "@/db/schema/projects";
import { getPublicFeaturedAboutProjects } from "@/lib/public/projects";
import { getPublicFeaturedAboutProof } from "@/lib/public/proof";
import { getPublicFeaturedAboutVideos } from "@/lib/public/videos";

export const MILESTONE_CATEGORY_LABELS: Record<string, string> = {
  hardware: "Hardware",
  software: "Software",
  recognition: "Recognition",
  presentation: "Presentation",
  other: "Other",
};

export type PublicMilestone = {
  id: string;
  title: string;
  eventLabel: string | null;
  eventDate: string | null;
  shortDescription: string | null;
  category: string | null;
  relatedProjectId: string | null;
  relatedProjectTitle: string | null;
  relatedProjectSlug: string | null;
  displayOrder: number;
};

function publicMilestoneConditions(extra?: ReturnType<typeof and>) {
  const base = and(eq(milestones.published, true), eq(milestones.hidden, false));
  return extra ? and(base, extra) : base;
}

const publicRelatedProjectJoin = and(
  eq(milestones.relatedProjectId, projects.id),
  eq(projects.published, true),
  eq(projects.hidden, false),
  eq(projects.archived, false),
);

function mapMilestoneRow(
  row: Milestone,
  related?: { title: string | null; slug: string | null },
): PublicMilestone {
  return {
    id: row.id,
    title: row.title,
    eventLabel: row.eventLabel,
    eventDate: row.eventDate,
    shortDescription: row.shortDescription,
    category: row.category,
    relatedProjectId: row.relatedProjectId,
    relatedProjectTitle: related?.title ?? null,
    relatedProjectSlug: related?.slug ?? null,
    displayOrder: row.displayOrder,
  };
}

export function milestoneCategoryLabel(
  value: string | null | undefined,
): string | null {
  if (!value) {
    return null;
  }
  return MILESTONE_CATEGORY_LABELS[value] ?? value;
}

async function queryPublicMilestones(
  extra?: ReturnType<typeof and>,
): Promise<PublicMilestone[]> {
  if (!isDatabaseConfigured()) {
    return [];
  }

  try {
    const db = getDb();
    const rows = await db
      .select({
        milestone: milestones,
        relatedProjectTitle: projects.title,
        relatedProjectSlug: projects.slug,
      })
      .from(milestones)
      .leftJoin(projects, publicRelatedProjectJoin)
      .where(publicMilestoneConditions(extra))
      .orderBy(
        asc(milestones.displayOrder),
        sql`${milestones.eventDate} asc nulls last`,
      );

    return rows.map((row) =>
      mapMilestoneRow(row.milestone, {
        title: row.relatedProjectTitle,
        slug: row.relatedProjectSlug,
      }),
    );
  } catch {
    return [];
  }
}

/**
 * About milestones: featured_on_about first; if none exist, all published milestones.
 */
export async function getAboutMilestones(): Promise<PublicMilestone[]> {
  const featured = await queryPublicMilestones(
    eq(milestones.featuredOnAbout, true),
  );
  if (featured.length > 0) {
    return featured;
  }
  return queryPublicMilestones();
}

export async function getAboutPageData() {
  const [milestonesList, featuredProjects, featuredProof, featuredVideos] =
    await Promise.all([
      getAboutMilestones(),
      getPublicFeaturedAboutProjects(6),
      getPublicFeaturedAboutProof(6),
      getPublicFeaturedAboutVideos(6),
    ]);

  return {
    milestones: milestonesList,
    featuredProjects,
    featuredProof,
    featuredVideos,
  };
}
