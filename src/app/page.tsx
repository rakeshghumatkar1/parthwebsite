import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { FeaturedProjectsSection } from "@/components/home/featured-projects-section";
import { HeroSection } from "@/components/home/hero-section";
import { HowWorkHappensSection } from "@/components/home/how-work-happens-section";
import { LatestUpdatesSection } from "@/components/home/latest-updates-section";
import { SoftwareFirstSection } from "@/components/home/software-first-section";
import { TechnicalFounderSection } from "@/components/home/technical-founder-section";
import { WhatWeBuildSection } from "@/components/home/what-we-build-section";
import { WorkYouCanReviewSection } from "@/components/home/work-you-can-review-section";
import { featuredUpdates, launchProjects } from "@/lib/home-data";
import { getHomeFeaturedProjects } from "@/lib/public/home-projects";

export default async function Home() {
  const { projects: homeProjects, fromCms } = await getHomeFeaturedProjects(
    launchProjects,
    6,
  );

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main>
        <HeroSection />
        <WorkYouCanReviewSection />
        <TechnicalFounderSection />
        <WhatWeBuildSection />
        <FeaturedProjectsSection
          projects={homeProjects}
          showDetailLinks={fromCms}
        />
        <SoftwareFirstSection />
        <HowWorkHappensSection />
        <LatestUpdatesSection updates={featuredUpdates} />
      </main>
      <SiteFooter />
    </div>
  );
}
