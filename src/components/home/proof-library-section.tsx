import type { ProofRecord } from "@/types/cms";
import type { ProofCategoryCard } from "@/lib/home-data";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/feature-card";
import {
  IconAward,
  IconBranch,
  IconDocumentation,
  IconDownload,
  IconImage,
  IconPlay,
} from "@/components/ui/icons";

type ProofLibrarySectionProps = {
  items?: ProofRecord[];
  categories?: ProofCategoryCard[];
};

const categoryIcons = [
  IconBranch,
  IconPlay,
  IconImage,
  IconDocumentation,
  IconDownload,
  IconAward,
];

export function ProofLibrarySection({
  items = [],
  categories = [],
}: ProofLibrarySectionProps) {
  const hasCategories = categories.length > 0;
  const hasItems = items.length > 0;

  if (!hasCategories && !hasItems) {
    return null;
  }

  return (
    <Section id="proof-library" tone="muted" dense>
      <SectionHeader
        dense
        eyebrow="Proof Library"
        title="Repositories, demos, screenshots, downloads, and build notes behind the work."
        description="The Proof Library brings together material that helps visitors understand the project history and current work: repositories, demos, screenshots, presentations, recognition proof, downloads, PDFs, and technical notes."
      />
      <p className="-mt-5 mb-8 max-w-3xl text-sm leading-relaxed text-tb-text-muted sm:text-base">
        This section gives visitors a path to review supporting material when
        they want more detail.
      </p>

      {hasCategories ? (
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {categories.map((category, index) => {
            const Icon = categoryIcons[index % categoryIcons.length];
            return (
              <FeatureCard
                key={category.id}
                title={category.title}
                description={category.description}
                icon={<Icon className="h-5 w-5" />}
                variant="library"
                compact
              />
            );
          })}
        </div>
      ) : null}

      {hasItems ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-tb-blue">
                {item.proofType}
              </p>
              <h3 className="mt-2 text-base font-semibold text-tb-text sm:text-lg">
                {item.title}
              </h3>
              {item.shortDescription ? (
                <p className="mt-2 text-sm text-tb-text-muted">
                  {item.shortDescription}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      ) : null}

      <div className="mt-8">
        <Button href="#proof-library" variant="ghost">
          Review Proof Library
        </Button>
      </div>
    </Section>
  );
}
