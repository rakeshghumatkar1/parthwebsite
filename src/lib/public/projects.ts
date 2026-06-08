import { and, asc, count, desc, eq, ilike, or, sql, type SQL } from "drizzle-orm";
import { getDb, isDatabaseConfigured } from "@/db";
import { projects, type Project } from "@/db/schema/projects";
import {
  domainLabel,
  domainLabels,
  industryLabel,
} from "@/lib/projects/taxonomy";

/** Public-visible projects only: published, not hidden, not archived. */
export function publicProjectConditions(extra?: SQL) {
  const base = and(
    eq(projects.published, true),
    eq(projects.hidden, false),
    eq(projects.archived, false),
  );
  return extra ? and(base, extra) : base;
}

export type PublicProject = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string | null;
  projectType: string;
  projectPhase: string;
  status: string;
  industry: string;
  domains: string[];
  techStack: string[];
  problemSolved: string | null;
  whatItDoes: string | null;
  parthRole: string | null;
  githubUrl: string | null;
  demoUrl: string | null;
  videoUrl: string | null;
  pdfDownloadUrl: string | null;
  coverImageUrl: string | null;
  coverImageAlt: string | null;
  coverImageFit: string;
  coverImagePosition: string;
  displayOrder: number;
  updatedAt: Date;
};

export type PublicProjectListFilters = {
  projectType?: string;
  status?: string;
  q?: string;
  projectPhase?: "current_work" | "early_work";
  industry?: string;
  domain?: string;
};

function buildPublicProjectListConditions(
  filters: PublicProjectListFilters,
): SQL | undefined {
  const conditions: SQL[] = [];

  if (filters.projectPhase) {
    conditions.push(eq(projects.projectPhase, filters.projectPhase));
  }
  if (filters.projectType) {
    conditions.push(eq(projects.projectType, filters.projectType as never));
  }
  if (filters.status) {
    conditions.push(eq(projects.status, filters.status as never));
  }
  if (filters.industry) {
    conditions.push(eq(projects.industry, filters.industry as never));
  }
  if (filters.domain) {
    conditions.push(
      sql`${projects.domains} @> ARRAY[${filters.domain}]::project_domain[]`,
    );
  }
  const q = filters.q?.trim();
  if (q) {
    const pattern = `%${q}%`;
    conditions.push(
      or(
        ilike(projects.title, pattern),
        ilike(projects.shortDescription, pattern),
        ilike(projects.slug, pattern),
      )!,
    );
  }

  return conditions.length > 0 ? and(...conditions) : undefined;
}

export const PROJECT_TYPE_LABELS: Record<string, string> = {
  internal_tool: "Internal Tool",
  ai_system: "AI System",
  automation: "Automation",
  data_platform: "Data Platform",
  saas: "SaaS",
  content_media: "Content / Media",
  other: "Other",
};

export const PROJECT_STATUS_LABELS: Record<string, string> = {
  active: "Active",
  experiment: "Experiment",
  archived: "Archived",
  concept: "Concept",
};

export const PROJECT_PHASE_LABELS: Record<string, string> = {
  current_work: "Current Work",
  early_work: "Early Work",
};

function mapProject(row: Project): PublicProject {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    shortDescription: row.shortDescription,
    fullDescription: row.fullDescription,
    projectType: row.projectType,
    projectPhase: row.projectPhase,
    status: row.status,
    industry: row.industry,
    domains: row.domains ?? [],
    techStack: row.techStack ?? [],
    problemSolved: row.problemSolved,
    whatItDoes: row.whatItDoes,
    parthRole: row.parthRole,
    githubUrl: row.githubUrl,
    demoUrl: row.demoUrl,
    videoUrl: row.videoUrl,
    pdfDownloadUrl: row.pdfDownloadUrl,
    coverImageUrl: row.coverImageUrl,
    coverImageAlt: row.coverImageAlt,
    coverImageFit: row.coverImageFit,
    coverImagePosition: row.coverImagePosition,
    displayOrder: row.displayOrder,
    updatedAt: row.updatedAt,
  };
}

async function queryPublicProjects(
  extra?: SQL,
  limit?: number,
): Promise<PublicProject[]> {
  if (!isDatabaseConfigured()) {
    return [];
  }

  try {
    const db = getDb();
    const baseQuery = db
      .select()
      .from(projects)
      .where(publicProjectConditions(extra))
      .orderBy(asc(projects.displayOrder), desc(projects.updatedAt));

    const rows = limit ? await baseQuery.limit(limit) : await baseQuery;
    return rows.map(mapProject);
  } catch {
    return [];
  }
}

/** Featured home projects — CMS only when records exist; caller applies static fallback. */
export async function getFeaturedHomeProjects(
  limit = 6,
): Promise<PublicProject[]> {
  return queryPublicProjects(eq(projects.featuredOnHome, true), limit);
}

/** Featured about projects — published, visible, not archived, featured_on_about. */
export async function getPublicFeaturedAboutProjects(
  limit?: number,
): Promise<PublicProject[]> {
  return queryPublicProjects(eq(projects.featuredOnAbout, true), limit);
}

/** Early Work projects for Build Journey and similar listings. */
export async function getPublicEarlyWorkProjects(
  limit = 3,
): Promise<PublicProject[]> {
  return queryPublicProjects(eq(projects.projectPhase, "early_work"), limit);
}

/** Lightweight options for public filter dropdowns. */
export async function getPublicProjectFilterOptions(): Promise<
  { id: string; title: string }[]
> {
  const items = await queryPublicProjects();
  return items.map((project) => ({ id: project.id, title: project.title }));
}

export async function getPublicProjects(
  filters: PublicProjectListFilters = {},
): Promise<PublicProject[]> {
  if (!isDatabaseConfigured()) {
    return [];
  }

  return queryPublicProjects(buildPublicProjectListConditions(filters));
}

/** Total published public projects, optionally filtered. */
export async function getPublicProjectsCount(
  filters: Pick<
    PublicProjectListFilters,
    "projectPhase" | "industry" | "domain"
  > = {},
): Promise<number> {
  if (!isDatabaseConfigured()) {
    return 0;
  }

  try {
    const db = getDb();
    const extra = buildPublicProjectListConditions(filters);
    const [row] = await db
      .select({ count: count() })
      .from(projects)
      .where(publicProjectConditions(extra));
    return row?.count ?? 0;
  } catch {
    return 0;
  }
}

export async function getPublicProjectBySlug(
  slug: string,
): Promise<PublicProject | null> {
  if (!isDatabaseConfigured()) {
    return null;
  }

  try {
    const db = getDb();
    const [row] = await db
      .select()
      .from(projects)
      .where(publicProjectConditions(eq(projects.slug, slug)))
      .limit(1);

    return row ? mapProject(row) : null;
  } catch {
    return null;
  }
}

export function projectTypeLabel(value: string): string {
  return PROJECT_TYPE_LABELS[value] ?? value;
}

export function projectStatusLabel(value: string): string {
  return PROJECT_STATUS_LABELS[value] ?? value;
}

export function projectPhaseLabel(value: string): string {
  return PROJECT_PHASE_LABELS[value] ?? value;
}

export { domainLabel, domainLabels, industryLabel };

export function projectHasLinks(project: PublicProject): boolean {
  return Boolean(
    project.githubUrl ||
      project.demoUrl ||
      project.videoUrl ||
      project.pdfDownloadUrl,
  );
}
