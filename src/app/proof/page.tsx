import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ProofCard } from "@/components/proof/proof-card";
import { ProofFilters } from "@/components/proof/proof-filters";
import {
  PublicEmptyState,
  PublicListingSummary,
} from "@/components/public/empty-state";
import { PublicListingFiltersShell } from "@/components/public/listing-filters-shell";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import {
  hasActivePublicFilters,
  shouldShowPublicFilters,
} from "@/lib/public/filter-visibility";
import { getPublicMediaByIds } from "@/lib/public/media";
import {
  getPublicProofItems,
  getPublicProofItemsCount,
  type PublicProofListFilters,
} from "@/lib/public/proof";
import { getPublicProjectFilterOptions } from "@/lib/public/projects";

export const metadata: Metadata = {
  title: "Proof Library | Think Big AI Systems",
  description:
    "Approved evidence, repositories, videos, screenshots, PDFs, recognitions, presentations, and technical notes related to Parth's project work.",
};

const FILTER_KEYS = ["q", "proofType", "relatedProjectId"] as const;

type ProofPageProps = {
  searchParams: Promise<{
    q?: string;
    proofType?: string;
    relatedProjectId?: string;
  }>;
};

export default async function ProofPage({ searchParams }: ProofPageProps) {
  const params = await searchParams;
  const filters: PublicProofListFilters = {
    q: params.q,
    proofType: params.proofType,
    relatedProjectId: params.relatedProjectId,
  };
  const hasActiveFilters = hasActivePublicFilters(params, FILTER_KEYS);

  const [items, projectOptions, totalCount] = await Promise.all([
    getPublicProofItems(filters),
    getPublicProjectFilterOptions(),
    getPublicProofItemsCount(),
  ]);

  const showFilters = shouldShowPublicFilters(totalCount, hasActiveFilters);
  const showSummary =
    !showFilters && totalCount > 0 && !hasActiveFilters && items.length > 0;

  const mediaMap = await getPublicMediaByIds(
    items.map((item) => item.mediaId).filter((id): id is string => Boolean(id)),
  );

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main>
        <Section tone="light">
          <SectionHeader
            title="Proof Library"
            description="Approved evidence, repositories, videos, screenshots, PDFs, recognitions, presentations, and technical notes related to Parth's project work—published through the CMS when ready for review."
          />
          {showFilters ? (
            <PublicListingFiltersShell>
              <Suspense fallback={null}>
                <ProofFilters projectOptions={projectOptions} />
              </Suspense>
            </PublicListingFiltersShell>
          ) : null}
          {showSummary ? (
            <PublicListingSummary totalCount={totalCount} noun="proof item" />
          ) : null}
          {items.length > 0 ? (
            <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${showSummary || showFilters ? "mt-6" : "mt-10"}`}>
              {items.map((item) => (
                <ProofCard
                  key={item.id}
                  item={item}
                  media={item.mediaId ? mediaMap.get(item.mediaId) : null}
                />
              ))}
            </div>
          ) : (
            <PublicEmptyState
              className={showFilters ? "mt-6" : "mt-10"}
              message={
                hasActiveFilters
                  ? "No proof items match the current filters. Clear filters to see all published proof."
                  : "Proof items will appear here after approved records are published in the CMS."
              }
              clearHref={hasActiveFilters ? "/proof" : undefined}
            />
          )}
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
