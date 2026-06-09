import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PublicEmptyState } from "@/components/public/empty-state";
import { PublicListingFiltersShell } from "@/components/public/listing-filters-shell";
import { EarlyWorkArchiveSummary } from "@/components/projects/early-work-archive-summary";
import { EarlyWorkFilters } from "@/components/projects/early-work-filters";
import { EarlyWorkProjectGrid } from "@/components/projects/early-work-project-grid";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import {
  hasActivePublicFilters,
  shouldShowPublicFilters,
} from "@/lib/public/filter-visibility";
import {
  EARLY_WORK_PAGE_INTRO,
  EARLY_WORK_PAGE_INTRO_SECOND,
} from "@/lib/build-journey-page-content";
import {
  getPublicProjects,
  getPublicProjectsCount,
  type PublicProjectListFilters,
} from "@/lib/public/projects";

export const metadata: Metadata = {
  title: "Early Work | Think Big AI Systems",
  description:
    "Parth's early hands-on projects from around age 12 — LEGO robotics, drones, Arduino, IoT, and nearly 35 documented builds from 2016–2018.",
};

const FILTER_KEYS = ["q"] as const;
const EARLY_WORK_PHASE = "early_work" as const;
const BASE_PATH = "/projects/early-work";

type EarlyWorkPageProps = {
  searchParams: Promise<{
    q?: string;
    projectType?: string;
    status?: string;
  }>;
};

export default async function EarlyWorkProjectsPage({
  searchParams,
}: EarlyWorkPageProps) {
  const params = await searchParams;
  const filters: PublicProjectListFilters = {
    projectPhase: EARLY_WORK_PHASE,
    q: params.q,
  };
  const hasActiveFilters = hasActivePublicFilters(params, FILTER_KEYS);

  const [projects, totalCount] = await Promise.all([
    getPublicProjects(filters),
    getPublicProjectsCount({ projectPhase: EARLY_WORK_PHASE }),
  ]);

  const showFilters = shouldShowPublicFilters(totalCount, hasActiveFilters);

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main>
        <Section tone="light" containerClassName="max-w-7xl">
          <SectionHeader title="Early Work" description={EARLY_WORK_PAGE_INTRO} />
          <p className="-mt-8 mb-10 max-w-3xl text-sm leading-relaxed text-tb-text-muted sm:mb-12 sm:text-base">
            {EARLY_WORK_PAGE_INTRO_SECOND}
          </p>
          <div className="mb-8 flex flex-wrap gap-4 sm:mb-10">
            <Link
              href="/about-us/build-journey"
              className="text-sm font-medium text-tb-blue hover:underline"
            >
              Back to Build Journey
            </Link>
            <Link
              href="/projects"
              className="text-sm font-medium text-tb-blue hover:underline"
            >
              View Current Projects
            </Link>
          </div>

          {totalCount > 0 ? (
            <EarlyWorkArchiveSummary totalCount={totalCount} />
          ) : null}

          {showFilters ? (
            <PublicListingFiltersShell>
              <Suspense fallback={null}>
                <EarlyWorkFilters basePath={BASE_PATH} />
              </Suspense>
            </PublicListingFiltersShell>
          ) : null}

          {projects.length > 0 ? (
            <div className={showFilters ? "mt-5" : "mt-6"}>
              <EarlyWorkProjectGrid
                key={params.q?.trim() || "all"}
                projects={projects}
                archiveTotal={totalCount}
              />
            </div>
          ) : (
            <PublicEmptyState
              className={showFilters ? "mt-5" : "mt-6"}
              message={
                hasActiveFilters
                  ? "No early work projects match your search. Clear search to see all published early work projects."
                  : "Early work entries will appear here after selected childhood and learning-era builds are published."
              }
              clearHref={hasActiveFilters ? BASE_PATH : undefined}
              clearLabel="Clear search"
            />
          )}
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
