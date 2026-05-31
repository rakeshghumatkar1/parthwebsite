import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  PublicEmptyState,
  PublicListingSummary,
} from "@/components/public/empty-state";
import { PublicListingFiltersShell } from "@/components/public/listing-filters-shell";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectsFilters } from "@/components/projects/projects-filters";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import {
  hasActivePublicFilters,
  shouldShowPublicFilters,
} from "@/lib/public/filter-visibility";
import {
  getPublicProjects,
  getPublicProjectsCount,
  type PublicProjectListFilters,
} from "@/lib/public/projects";

export const metadata: Metadata = {
  title: "Early Work | Think Big AI Systems",
  description:
    "Early robotics, Arduino, IoT, drone, automation, and learning-era builds from Parth's formative technical years.",
};

const FILTER_KEYS = ["q", "projectType", "status"] as const;
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
    projectType: params.projectType,
    status: params.status,
  };
  const hasActiveFilters = hasActivePublicFilters(params, FILTER_KEYS);

  const [projects, totalCount] = await Promise.all([
    getPublicProjects(filters),
    getPublicProjectsCount({ projectPhase: EARLY_WORK_PHASE }),
  ]);

  const showFilters = shouldShowPublicFilters(totalCount, hasActiveFilters);
  const showSummary =
    !showFilters && totalCount > 0 && !hasActiveFilters && projects.length > 0;

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main>
        <Section tone="light">
          <SectionHeader
            title="Early Work"
            description="Early projects from Parth's robotics, electronics, Arduino, IoT, drone, and home-automation learning years. These entries support the Build Journey and show how the technical foundation developed over time."
          />
          <div className="mb-10 flex flex-wrap gap-4 sm:mb-12">
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
          {showFilters ? (
            <PublicListingFiltersShell>
              <Suspense fallback={null}>
                <ProjectsFilters basePath={BASE_PATH} />
              </Suspense>
            </PublicListingFiltersShell>
          ) : null}
          {showSummary ? (
            <PublicListingSummary totalCount={totalCount} noun="project" />
          ) : null}
          {projects.length > 0 ? (
            <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${showSummary || showFilters ? "mt-6" : "mt-10"}`}>
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <PublicEmptyState
              className={showFilters ? "mt-6" : "mt-10"}
              message={
                hasActiveFilters
                  ? "No early work projects match the current filters. Clear filters to see all published early work projects."
                  : "Early work entries will appear here after selected childhood and learning-era builds are published."
              }
              clearHref={hasActiveFilters ? BASE_PATH : undefined}
            />
          )}
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
