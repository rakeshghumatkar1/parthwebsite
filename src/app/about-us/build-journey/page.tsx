import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BuildJourney2018ProofSection } from "@/components/build-journey/build-journey-2018-proof-section";
import { BuildJourneyBridgeSection } from "@/components/build-journey/build-journey-bridge-section";
import { BuildJourneyEarlyProjectsSection } from "@/components/build-journey/build-journey-early-projects-section";
import { BuildJourneyHeroSection } from "@/components/build-journey/build-journey-hero-section";
import { BuildJourneyLearningSection } from "@/components/build-journey/build-journey-learning-section";
import { BuildJourneyOriginSection } from "@/components/build-journey/build-journey-origin-section";
import { BuildJourneyProofLibrarySection } from "@/components/build-journey/build-journey-proof-library-section";
import { BuildJourneyStructuredExposureSection } from "@/components/build-journey/build-journey-structured-exposure-section";
import { BuildJourneyTimelineSection } from "@/components/build-journey/build-journey-timeline-section";
import { BuildJourneyVideosSection } from "@/components/build-journey/build-journey-videos-section";
import {
  BUILD_JOURNEY_METADATA,
  BUILD_JOURNEY_PROOF_SLUGS,
} from "@/lib/build-journey-page-content";
import {
  getBuildJourneyProofLinksBySlug,
  getPublicEarlyBuildProof,
  getPublicEarlyBuildVideos,
} from "@/lib/public/build-journey";
import { getPublicMediaByIds } from "@/lib/public/media";

export const metadata: Metadata = {
  title: BUILD_JOURNEY_METADATA.title,
  description: BUILD_JOURNEY_METADATA.description,
};

export default async function BuildJourneyPage() {
  const [earlyVideos, earlyProof, proofLinks] = await Promise.all([
    getPublicEarlyBuildVideos(6),
    getPublicEarlyBuildProof(8),
    getBuildJourneyProofLinksBySlug([
      BUILD_JOURNEY_PROOF_SLUGS.nelkinda2018,
      BUILD_JOURNEY_PROOF_SLUGS.coderetreat2018,
    ]),
  ]);

  const mediaIds = [
    ...earlyVideos
      .map((video) => video.thumbnailMediaId)
      .filter((id): id is string => Boolean(id)),
    ...earlyProof
      .map((item) => item.mediaId)
      .filter((id): id is string => Boolean(id)),
  ];

  const mediaMap = await getPublicMediaByIds(mediaIds);

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main>
        <BuildJourneyHeroSection />
        <BuildJourneyOriginSection />
        <BuildJourneyStructuredExposureSection />
        <BuildJourneyEarlyProjectsSection />
        <BuildJourneyVideosSection videos={earlyVideos} mediaMap={mediaMap} />
        <BuildJourneyLearningSection />
        <BuildJourney2018ProofSection proofLinks={proofLinks} />
        <BuildJourneyTimelineSection />
        <BuildJourneyProofLibrarySection
          proofItems={earlyProof}
          mediaMap={mediaMap}
        />
        <BuildJourneyBridgeSection />
      </main>
      <SiteFooter />
    </div>
  );
}
