import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BuildJourney2018ProofSection } from "@/components/build-journey/build-journey-2018-proof-section";
import { BuildJourneyBridgeSection } from "@/components/build-journey/build-journey-bridge-section";
import { BuildJourneyEarlyProjectsSection } from "@/components/build-journey/build-journey-early-projects-section";
import { BuildJourneyHeroSection } from "@/components/build-journey/build-journey-hero-section";
import { BuildJourneyLearningSection } from "@/components/build-journey/build-journey-learning-section";
import { BuildJourneyOriginSection } from "@/components/build-journey/build-journey-origin-section";
import { BuildJourneyStructuredExposureSection } from "@/components/build-journey/build-journey-structured-exposure-section";
import { BuildJourneyTimelineSection } from "@/components/build-journey/build-journey-timeline-section";
import { BUILD_JOURNEY_METADATA } from "@/lib/build-journey-page-content";
import { getPublicEarlyWorkProjects } from "@/lib/public/projects";

export const metadata: Metadata = {
  title: BUILD_JOURNEY_METADATA.title,
  description: BUILD_JOURNEY_METADATA.description,
};

export default async function BuildJourneyPage() {
  const earlyWorkProjects = await getPublicEarlyWorkProjects(3);

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main>
        <BuildJourneyHeroSection />
        <BuildJourneyOriginSection />
        <BuildJourneyStructuredExposureSection />
        <BuildJourneyEarlyProjectsSection
          earlyWorkProjects={earlyWorkProjects}
        />
        <BuildJourneyLearningSection />
        <BuildJourney2018ProofSection />
        <BuildJourneyTimelineSection />
        <BuildJourneyBridgeSection />
      </main>
      <SiteFooter />
    </div>
  );
}
