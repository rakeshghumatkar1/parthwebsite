import type { Metadata } from "next";
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
  title: "Projects | Think Big AI Systems",
  description:
    "Software systems, AI-enabled workflows, automation builds, and project evidence maintained through the Parth CMS.",
};

const FILTER_KEYS = ["q", "projectType", "status"] as const;

type ProjectsPageProps = {
  searchParams: Promise<{
    q?: string;
    projectType?: string;
    status?: string;
  }>;
};

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const params = await searchParams;
  const filters: PublicProjectListFilters = {
    q: params.q,
    projectType: params.projectType,
    status: params.status,
  };
  const hasActiveFilters = hasActivePublicFilters(params, FILTER_KEYS);

  const [projects, totalCount] = await Promise.all([
    getPublicProjects(filters),
    getPublicProjectsCount(),
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
            title="Projects"
            description="Software systems, AI-enabled workflows, automation builds, and project evidence created and maintained through the Parth CMS."
          />
          {showFilters ? (
            <PublicListingFiltersShell>
              <Suspense fallback={null}>
                <ProjectsFilters />
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
                  ? "No projects match the current filters. Clear filters to see all published projects."
                  : "Projects will appear here after approved project records are published in the CMS."
              }
              clearHref={hasActiveFilters ? "/projects" : undefined}
            />
          )}
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
