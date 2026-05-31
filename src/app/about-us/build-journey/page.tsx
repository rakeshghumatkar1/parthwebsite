import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Build Journey | Think Big AI Systems",
  description:
    "Full early build journey for Parth Ghumatkar — coming soon on Think Big AI Systems.",
};

export default function BuildJourneyStubPage() {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main>
        <Section tone="light">
          <SectionHeader
            eyebrow="Build Journey"
            title="Full early build journey — coming soon."
            description="This page will expand on Parth's early path from curiosity and experiments into software systems. For now, review current project evidence and the About page summary."
          />
          <div className="flex flex-wrap gap-4">
            <Button href="/about-us" variant="primary" size="lg">
              Back to About Us
            </Button>
            <Button href="/projects" variant="ghost" size="lg">
              View Current Projects
            </Button>
          </div>
          <p className="mt-8 text-sm text-tb-text-muted">
            <Link href="/about-us" className="font-medium text-tb-blue hover:underline">
              Return to About Us
            </Link>
          </p>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
