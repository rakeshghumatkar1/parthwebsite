import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  TaxonomyProjectsListing,
  TaxonomyProjectsNav,
} from "@/components/projects/taxonomy-projects-listing";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { getPublicProjects } from "@/lib/public/projects";
import {
  allIndustrySlugs,
  industryLabel,
  industryValueFromSlug,
} from "@/lib/projects/taxonomy";

type IndustryProjectsPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return allIndustrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: IndustryProjectsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = industryValueFromSlug(slug);

  if (!industry) {
    return {
      title: "Industry not found | Think Big AI Systems",
    };
  }

  const label = industryLabel(industry);

  return {
    title: `${label} Projects | Think Big AI Systems`,
    description: `Projects connected to ${label}, including current systems and selected early work where relevant.`,
  };
}

export default async function IndustryProjectsPage({
  params,
}: IndustryProjectsPageProps) {
  const { slug } = await params;
  const industry = industryValueFromSlug(slug);

  if (!industry) {
    notFound();
  }

  const label = industryLabel(industry);
  const projects = await getPublicProjects({ industry });

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main>
        <Section tone="light">
          <SectionHeader
            title={`${label} Projects`}
            description={`Projects connected to ${label}, including current systems and selected early work where relevant.`}
          />
          <TaxonomyProjectsNav />
          <TaxonomyProjectsListing
            projects={projects}
            emptyMessage="No published projects are currently listed for this industry."
          />
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
