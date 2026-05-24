import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { FinalCtaSection } from "@/components/home/final-cta-section";
import { FeaturedProjectsSection } from "@/components/home/featured-projects-section";
import { HeroSection } from "@/components/home/hero-section";
import { HowWorkHappensSection } from "@/components/home/how-work-happens-section";
import { LatestUpdatesSection } from "@/components/home/latest-updates-section";
import { ProofBeforeClaimsSection } from "@/components/home/proof-before-claims-section";
import { ProofLibrarySection } from "@/components/home/proof-library-section";
import { SoftwareFirstSection } from "@/components/home/software-first-section";
import { TechnicalFounderSection } from "@/components/home/technical-founder-section";
import { WhatWeBuildSection } from "@/components/home/what-we-build-section";
import {
  featuredProjects,
  featuredProofItems,
  featuredUpdates,
} from "@/lib/home-data";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main>
        <HeroSection />
        <ProofBeforeClaimsSection />
        <WhatWeBuildSection />
        <FeaturedProjectsSection projects={featuredProjects} />
        <TechnicalFounderSection />
        <HowWorkHappensSection />
        <ProofLibrarySection items={featuredProofItems} />
        <SoftwareFirstSection />
        <LatestUpdatesSection updates={featuredUpdates} />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
