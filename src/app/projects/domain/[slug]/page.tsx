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
  allDomainSlugs,
  domainLabel,
  domainValueFromSlug,
} from "@/lib/projects/taxonomy";

type DomainProjectsPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return allDomainSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: DomainProjectsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const domain = domainValueFromSlug(slug);

  if (!domain) {
    return {
      title: "Domain not found | Think Big AI Systems",
    };
  }

  const label = domainLabel(domain);

  return {
    title: `${label} Projects | Think Big AI Systems`,
    description: `Projects connected to ${label}, across current systems and selected early work.`,
  };
}

export default async function DomainProjectsPage({
  params,
}: DomainProjectsPageProps) {
  const { slug } = await params;
  const domain = domainValueFromSlug(slug);

  if (!domain) {
    notFound();
  }

  const label = domainLabel(domain);
  const projects = await getPublicProjects({ domain });

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main>
        <Section tone="light">
          <SectionHeader
            title={`${label} Projects`}
            description={`Projects connected to ${label}, across current systems and selected early work.`}
          />
          <TaxonomyProjectsNav />
          <TaxonomyProjectsListing
            projects={projects}
            emptyMessage="No published projects are currently listed for this domain."
          />
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
