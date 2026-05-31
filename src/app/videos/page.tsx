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
import { VideoCard } from "@/components/videos/video-card";
import { VideoFilters } from "@/components/videos/video-filters";
import {
  hasActivePublicFilters,
  shouldShowPublicFilters,
} from "@/lib/public/filter-visibility";
import { getPublicMediaByIds } from "@/lib/public/media";
import { getPublicProjectFilterOptions } from "@/lib/public/projects";
import {
  getPublicVideos,
  getPublicVideosCount,
  type PublicVideoListFilters,
} from "@/lib/public/videos";

export const metadata: Metadata = {
  title: "Videos | Think Big AI Systems",
  description:
    "Approved walkthroughs, demos, technical explanations, and project videos from the Parth CMS.",
};

const FILTER_KEYS = ["q", "category", "relatedProjectId"] as const;

type VideosPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    relatedProjectId?: string;
  }>;
};

export default async function VideosPage({ searchParams }: VideosPageProps) {
  const params = await searchParams;
  const filters: PublicVideoListFilters = {
    q: params.q,
    category: params.category,
    relatedProjectId: params.relatedProjectId,
  };
  const hasActiveFilters = hasActivePublicFilters(params, FILTER_KEYS);

  const [videos, projectOptions, totalCount] = await Promise.all([
    getPublicVideos(filters),
    getPublicProjectFilterOptions(),
    getPublicVideosCount(),
  ]);

  const showFilters = shouldShowPublicFilters(totalCount, hasActiveFilters);
  const showSummary =
    !showFilters && totalCount > 0 && !hasActiveFilters && videos.length > 0;

  const mediaMap = await getPublicMediaByIds(
    videos
      .map((video) => video.thumbnailMediaId)
      .filter((id): id is string => Boolean(id)),
  );

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main>
        <Section tone="light">
          <SectionHeader
            title="Videos"
            description="Approved walkthroughs, demos, technical explanations, and project videos—published through the CMS when ready for review."
          />
          {showFilters ? (
            <PublicListingFiltersShell>
              <Suspense fallback={null}>
                <VideoFilters projectOptions={projectOptions} />
              </Suspense>
            </PublicListingFiltersShell>
          ) : null}
          {showSummary ? (
            <PublicListingSummary totalCount={totalCount} noun="video" />
          ) : null}
          {videos.length > 0 ? (
            <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${showSummary || showFilters ? "mt-6" : "mt-10"}`}>
              {videos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  thumbnail={
                    video.thumbnailMediaId
                      ? mediaMap.get(video.thumbnailMediaId)
                      : null
                  }
                />
              ))}
            </div>
          ) : (
            <PublicEmptyState
              className={showFilters ? "mt-6" : "mt-10"}
              message={
                hasActiveFilters
                  ? "No videos match the current filters. Clear filters to see all published videos."
                  : "Videos will appear here after approved YouTube/demo records are published in the CMS."
              }
              clearHref={hasActiveFilters ? "/videos" : undefined}
            />
          )}
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
