import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  PublicEmptyState,
  PublicListingSummary,
} from "@/components/public/empty-state";
import { PublicListingFiltersShell } from "@/components/public/listing-filters-shell";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { UpdateListItem } from "@/components/updates/update-list-item";
import { UpdatesFilters } from "@/components/updates/updates-filters";
import {
  hasActivePublicFilters,
  shouldShowPublicFilters,
} from "@/lib/public/filter-visibility";
import { getPublicProjectFilterOptions } from "@/lib/public/projects";
import {
  getPublicUpdates,
  getPublicUpdatesCount,
  type PublicUpdateListFilters,
} from "@/lib/public/updates";

export const metadata: Metadata = {
  title: "Updates / Build Notes | Think Big AI Systems",
  description:
    "Approved build notes, improvements, technical updates, project progress, and launch notes from the Parth CMS.",
};

const FILTER_KEYS = ["q", "updateType", "relatedProjectId"] as const;

type UpdatesPageProps = {
  searchParams: Promise<{
    q?: string;
    updateType?: string;
    relatedProjectId?: string;
  }>;
};

export default async function UpdatesPage({ searchParams }: UpdatesPageProps) {
  const params = await searchParams;
  const filters: PublicUpdateListFilters = {
    q: params.q,
    updateType: params.updateType,
    relatedProjectId: params.relatedProjectId,
  };
  const hasActiveFilters = hasActivePublicFilters(params, FILTER_KEYS);

  const [updates, projectOptions, totalCount] = await Promise.all([
    getPublicUpdates(filters),
    getPublicProjectFilterOptions(),
    getPublicUpdatesCount(),
  ]);

  const showFilters = shouldShowPublicFilters(totalCount, hasActiveFilters);
  const showSummary =
    !showFilters && totalCount > 0 && !hasActiveFilters && updates.length > 0;

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main>
        <Section tone="light">
          <SectionHeader
            title="Updates / Build Notes"
            description="Approved build notes, improvements, technical updates, project progress, and launch notes—published through the CMS when ready for review."
          />
          {showFilters ? (
            <PublicListingFiltersShell>
              <Suspense fallback={null}>
                <UpdatesFilters projectOptions={projectOptions} />
              </Suspense>
            </PublicListingFiltersShell>
          ) : null}
          {showSummary ? (
            <PublicListingSummary totalCount={totalCount} noun="update" />
          ) : null}
          {updates.length > 0 ? (
            <div className={`space-y-4 ${showSummary || showFilters ? "mt-6" : "mt-10"}`}>
              {updates.map((update) => (
                <UpdateListItem key={update.id} update={update} />
              ))}
            </div>
          ) : (
            <PublicEmptyState
              className={showFilters ? "mt-6" : "mt-10"}
              message={
                hasActiveFilters
                  ? "No updates match the current filters. Clear filters to see all published updates."
                  : "Updates will appear here after approved build notes are published in the CMS."
              }
              clearHref={hasActiveFilters ? "/updates" : undefined}
            />
          )}
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
