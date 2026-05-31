import { Button } from "@/components/ui/button";
import { ProofCard } from "@/components/proof/proof-card";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { BUILD_JOURNEY_EMPTY_COPY } from "@/lib/build-journey-page-content";
import type { PublicMedia } from "@/lib/public/media";
import type { PublicProofItem } from "@/lib/public/proof";

type BuildJourneyProofLibrarySectionProps = {
  proofItems: PublicProofItem[];
  mediaMap: Map<string, PublicMedia>;
};

export function BuildJourneyProofLibrarySection({
  proofItems,
  mediaMap,
}: BuildJourneyProofLibrarySectionProps) {
  return (
    <Section tone="light">
      <SectionHeader
        eyebrow="Early Proof Library"
        title="Early proof documents, videos, and recognition."
      />

      {proofItems.length > 0 ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {proofItems.map((item) => (
            <li key={item.id}>
              <ProofCard
                item={item}
                media={item.mediaId ? mediaMap.get(item.mediaId) ?? null : null}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="max-w-2xl text-base leading-relaxed text-tb-text-muted sm:text-lg">
          {BUILD_JOURNEY_EMPTY_COPY.proofLibrary}
        </p>
      )}

      <div className="mt-10">
        <Button href="/proof" variant="ghost" size="lg">
          Review Early Proof Library
        </Button>
      </div>
    </Section>
  );
}
