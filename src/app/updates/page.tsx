import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PublicEmptyState } from "@/components/public/empty-state";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { UpdateListItem } from "@/components/updates/update-list-item";
import { UpdatesFilters } from "@/components/updates/updates-filters";
import { getPublicProjectFilterOptions } from "@/lib/public/projects";
import {
  getPublicUpdates,
  type PublicUpdateListFilters,
} from "@/lib/public/updates";

export const metadata: Metadata = {
  title: "Updates / Build Notes | Think Big AI Systems",
  description:
    "Approved build notes, improvements, technical updates, project progress, and launch notes from the Parth CMS.",
};

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

  const [updates, projectOptions] = await Promise.all([
    getPublicUpdates(filters),
    getPublicProjectFilterOptions(),
  ]);

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main>
        <Section tone="light">
          <SectionHeader
            title="Updates / Build Notes"
            description="Approved build notes, improvements, technical updates, project progress, and launch notes—published through the CMS when ready for review."
          />
          <Suspense fallback={null}>
            <UpdatesFilters projectOptions={projectOptions} />
          </Suspense>
          {updates.length > 0 ? (
            <div className="mt-10 space-y-4">
              {updates.map((update) => (
                <UpdateListItem key={update.id} update={update} />
              ))}
            </div>
          ) : (
            <PublicEmptyState
              className="mt-10"
              message="Updates will appear here after approved build notes are published in the CMS."
            />
          )}
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
