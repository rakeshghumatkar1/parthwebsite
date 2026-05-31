import Link from "next/link";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { IconArrowRight } from "@/components/ui/icons";
import { ABOUT_ORIGIN_CHAIN } from "@/lib/about-page-content";

function OriginStep({
  step,
  label,
  showArrow,
  vertical,
}: {
  step: number;
  label: string;
  showArrow: boolean;
  vertical?: boolean;
}) {
  return (
    <li className={vertical ? "flex flex-col items-center" : "flex items-center gap-2 sm:gap-3"}>
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tb-blue/10 text-xs font-bold tabular-nums text-tb-blue ring-1 ring-tb-blue/20"
          aria-hidden
        >
          {step}
        </span>
        <span className="rounded-xl border border-slate-200/90 bg-white px-3.5 py-2.5 text-sm font-medium text-tb-text shadow-sm ring-1 ring-slate-100 sm:px-4">
          {label}
        </span>
      </div>
      {showArrow ? (
        vertical ? (
          <IconArrowRight
            className="my-1 h-4 w-4 rotate-90 text-tb-blue/50"
            aria-hidden
          />
        ) : (
          <IconArrowRight className="hidden h-4 w-4 shrink-0 text-tb-blue/60 sm:block" aria-hidden />
        )
      ) : null}
    </li>
  );
}

export function AboutOriginSection() {
  return (
    <Section tone="light">
      <SectionHeader
        eyebrow="From Football to Technology"
        title="A different path into building."
        description="Football was one of Parth's early interests. A knee problem stopped him from continuing with football the way he wanted. YouTube became a way to pass time. A simple motor-based pencil-sharpener video triggered his curiosity about electronics and led him into robotics, Arduino, C++, IoT, and drones."
      />

      {/* Mobile: vertical chain */}
      <ol className="mx-auto flex max-w-md flex-col items-stretch sm:hidden">
        {ABOUT_ORIGIN_CHAIN.map((step, index) => (
          <OriginStep
            key={step}
            step={index + 1}
            label={step}
            showArrow={index < ABOUT_ORIGIN_CHAIN.length - 1}
            vertical
          />
        ))}
      </ol>

      {/* Tablet+: horizontal wrapped chain in contained panel */}
      <div className="hidden rounded-2xl border border-slate-200/90 bg-tb-surface-muted/50 p-4 ring-1 ring-slate-100 sm:block sm:p-6">
        <ol className="flex flex-wrap items-center justify-center gap-y-3">
          {ABOUT_ORIGIN_CHAIN.map((step, index) => (
            <OriginStep
              key={step}
              step={index + 1}
              label={step}
              showArrow={index < ABOUT_ORIGIN_CHAIN.length - 1}
            />
          ))}
        </ol>
      </div>

      <p className="mt-10">
        <Link
          href="/about-us/build-journey"
          className="inline-flex items-center gap-2 text-sm font-medium text-tb-blue hover:underline sm:text-base"
        >
          Read the full early build journey
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </p>
    </Section>
  );
}
