import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ABOUT_CONTACT_URL } from "@/lib/about-page-content";

export function AboutFinalCtaSection() {
  return (
    <section className="relative overflow-hidden border-t border-tb-navy-border/40 bg-gradient-to-b from-tb-navy-deep via-tb-navy to-tb-navy text-tb-text-on-dark">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(37,99,235,0.12),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-10 sm:px-8 sm:py-12 lg:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tb-cyan sm:text-sm">
          Ready to Review the Work?
        </p>
        <h2 className="mt-2 max-w-2xl text-balance text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
          Review the work, not just the story.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-tb-text-on-dark-muted sm:text-base">
          The best way to understand Parth&apos;s capability is to review current
          projects, explore the early build journey, and see how Think Big
          supports delivery with review structure and accountability.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Button href="/projects" variant="primary" dark size="lg">
            View Current Projects
          </Button>
          <Button href="/about-us/build-journey" variant="secondary" dark size="lg">
            Explore Build Journey
          </Button>
          <Button href="/projects/early-work" variant="secondary" dark size="lg">
            View Early Work
          </Button>
          <Link
            href={ABOUT_CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-white/25 bg-transparent px-5 py-2.5 text-sm font-medium text-tb-text-on-dark transition-colors hover:border-white/50 hover:bg-white/5 sm:px-6 sm:py-3"
          >
            Discuss a Software Use Case
          </Link>
        </div>
      </div>
    </section>
  );
}
