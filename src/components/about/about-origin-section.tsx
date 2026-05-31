import Link from "next/link";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { IconArrowRight } from "@/components/ui/icons";
import { ABOUT_EARLY_BACKGROUND } from "@/lib/about-page-content";

export function AboutOriginSection() {
  return (
    <Section tone="light">
      <SectionHeader
        eyebrow="Early Background"
        title="A self-built path into technology."
        description={ABOUT_EARLY_BACKGROUND}
      />

      <p className="max-w-3xl text-base leading-relaxed text-tb-text-muted sm:text-lg">
        Football, YouTube, robotics class, Arduino, IoT, and early hardware
        experiments formed the foundation — but the full childhood-to-builder
        story is on Build Journey, and early project entries live under Early
        Work.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Link
          href="/about-us/build-journey"
          className="inline-flex items-center gap-2 text-sm font-medium text-tb-blue hover:underline sm:text-base"
        >
          Explore Build Journey
          <IconArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/projects/early-work"
          className="inline-flex items-center gap-2 text-sm font-medium text-tb-blue hover:underline sm:text-base"
        >
          View Early Work
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}
