import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PublicEmptyState } from "@/components/public/empty-state";
import { FeatureCard } from "@/components/ui/feature-card";
import {
  IconDocumentation,
  IconDownload,
  IconLayers,
  IconSystems,
  IconWorkflow,
} from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import {
  DOWNLOADS_AVAILABILITY_NOTE,
  DOWNLOADS_CONTACT_URL,
  DOWNLOADS_METADATA,
  DOWNLOADS_RESOURCE_CATEGORIES,
} from "@/lib/downloads-page-content";

export const metadata: Metadata = {
  title: DOWNLOADS_METADATA.title,
  description: DOWNLOADS_METADATA.description,
};

const categoryIcons = [
  IconWorkflow,
  IconSystems,
  IconLayers,
  IconDocumentation,
  IconDownload,
  IconLayers,
];

export default function DownloadsPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main>
        <Section tone="light">
          <SectionHeader
            eyebrow="Downloads"
            title="Resources and reusable files"
            description="A place for selected workflows, templates, scripts, setup guides, and technical resources connected to AI systems, automation, and project work."
          />
          <div className="mt-8">
            <Link
              href={DOWNLOADS_CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-transparent bg-tb-blue px-6 py-3 text-sm font-medium text-white shadow-sm shadow-tb-blue/25 transition-colors hover:bg-tb-blue-hover sm:px-8 sm:py-3.5 sm:text-base"
            >
              Discuss a Software Use Case
            </Link>
          </div>
        </Section>

        <Section tone="muted">
          <SectionHeader
            title="Resource categories"
            description="Reusable files and technical material will be grouped here as reviewed resources are published."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DOWNLOADS_RESOURCE_CATEGORIES.map((category, index) => {
              const Icon = categoryIcons[index] ?? IconDownload;
              return (
                <FeatureCard
                  key={category.title}
                  title={category.title}
                  description={category.description}
                  icon={<Icon className="h-6 w-6" />}
                  variant="library"
                />
              );
            })}
          </div>
        </Section>

        <Section tone="light" compact>
          <PublicEmptyState message={DOWNLOADS_AVAILABILITY_NOTE} />
        </Section>

        <Section tone="dark">
          <SectionHeader
            title="Looking for something specific?"
            description="For project-specific resources or reusable workflow files, contact Think Big Digital Solutions."
            dark
          />
          <div className="mt-8">
            <Link
              href={DOWNLOADS_CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-transparent bg-tb-blue px-6 py-3 text-sm font-medium text-white shadow-sm shadow-tb-blue/25 transition-colors hover:bg-tb-blue-hover sm:px-8 sm:py-3.5 sm:text-base"
            >
              Discuss a Software Use Case
            </Link>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
