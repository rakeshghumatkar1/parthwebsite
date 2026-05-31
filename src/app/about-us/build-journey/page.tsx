import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BuildJourney2018ProofSection } from "@/components/build-journey/build-journey-2018-proof-section";
import { BuildJourneyBridgeSection } from "@/components/build-journey/build-journey-bridge-section";
import { BuildJourneyEarlyProjectsSection } from "@/components/build-journey/build-journey-early-projects-section";
import { BuildJourneyEarlyWorkBridgeSection } from "@/components/build-journey/build-journey-early-work-bridge-section";
import { BuildJourneyHeroSection } from "@/components/build-journey/build-journey-hero-section";
import { BuildJourneyLearningSection } from "@/components/build-journey/build-journey-learning-section";
import { BuildJourneyOriginSection } from "@/components/build-journey/build-journey-origin-section";
import { BuildJourneyStructuredExposureSection } from "@/components/build-journey/build-journey-structured-exposure-section";
import { BuildJourneyTimelineSection } from "@/components/build-journey/build-journey-timeline-section";
import {
  BUILD_JOURNEY_METADATA,
  BUILD_JOURNEY_PROOF_SLUGS,
} from "@/lib/build-journey-page-content";
import { getBuildJourneyProofLinksBySlug } from "@/lib/public/build-journey";

export const metadata: Metadata = {
  title: BUILD_JOURNEY_METADATA.title,
  description: BUILD_JOURNEY_METADATA.description,
};

export default async function BuildJourneyPage() {
  const proofLinks = await getBuildJourneyProofLinksBySlug([
    BUILD_JOURNEY_PROOF_SLUGS.nelkinda2018,
    BUILD_JOURNEY_PROOF_SLUGS.coderetreat2018,
  ]);

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main>
        <BuildJourneyHeroSection />
        <BuildJourneyOriginSection />
        <BuildJourneyStructuredExposureSection />
        <BuildJourneyEarlyProjectsSection />
        <BuildJourneyLearningSection />
        <BuildJourney2018ProofSection proofLinks={proofLinks} />
        <BuildJourneyTimelineSection />
        <BuildJourneyEarlyWorkBridgeSection />
        <BuildJourneyBridgeSection />
      </main>
      <SiteFooter />
    </div>
  );
}
