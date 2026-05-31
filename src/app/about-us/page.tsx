import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AboutBeyondCodeSection } from "@/components/about/about-beyond-code-section";
import { AboutCredibilitySection } from "@/components/about/about-credibility-section";
import { AboutCurrentSystemsSection } from "@/components/about/about-current-systems-section";
import { AboutFeaturedProjectsSection } from "@/components/about/about-featured-projects-section";
import { AboutFinalCtaSection } from "@/components/about/about-final-cta-section";
import { AboutHeroSection } from "@/components/about/about-hero-section";
import { AboutOriginSection } from "@/components/about/about-origin-section";
import { AboutOwnershipSection } from "@/components/about/about-ownership-section";
import { AboutPathSnapshotSection } from "@/components/about/about-path-snapshot-section";
import { AboutProofTrailSection } from "@/components/about/about-proof-trail-section";
import { getPublicFeaturedAboutProjects } from "@/lib/public/projects";

export const metadata: Metadata = {
  title: "About Us | Think Big AI Systems",
  description:
    "Parth Ghumatkar — current AI-assisted software systems, automation, internal tools, and project-oriented build capability under Think Big Digital Solutions.",
};

export default async function AboutUsPage() {
  const featuredProjects = (await getPublicFeaturedAboutProjects(6))
    .filter((project) => project.projectPhase === "current_work")
    .slice(0, 3);

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main>
        <AboutHeroSection />
        <AboutProofTrailSection />
        <AboutCredibilitySection />
        <AboutOriginSection />
        <AboutPathSnapshotSection />
        <AboutCurrentSystemsSection />
        <AboutFeaturedProjectsSection projects={featuredProjects} />
        <AboutOwnershipSection />
        <AboutBeyondCodeSection />
        <AboutFinalCtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
