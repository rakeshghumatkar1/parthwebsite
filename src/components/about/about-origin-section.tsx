import Link from "next/link";
import { Section } from "@/components/ui/section";
import { IconArrowRight } from "@/components/ui/icons";
import { ABOUT_EARLY_BACKGROUND } from "@/lib/about-page-content";

export function AboutOriginSection() {
  return (
    <Section tone="light" dense>
      <div className="max-w-3xl rounded-lg border border-slate-200/90 bg-white px-3.5 py-3.5 shadow-sm sm:px-4 sm:py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tb-blue">
          Early Background
        </p>
        <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-tb-text sm:text-2xl">
          A self-built path into technology.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-tb-text-muted sm:text-base">
          {ABOUT_EARLY_BACKGROUND}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-tb-text-muted">
          Football, YouTube, robotics class, Arduino, IoT, and early hardware
          experiments formed the foundation — but the full childhood-to-builder
          story is on Build Journey, and early project entries live under Early
          Work.
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
          <Link
            href="/about-us/build-journey"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-tb-blue hover:underline"
          >
            Explore Build Journey
            <IconArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/projects/early-work"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-tb-text-muted hover:text-tb-blue hover:underline"
          >
            View Early Work
            <IconArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
