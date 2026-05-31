import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { ABOUT_PATH_SNAPSHOT } from "@/lib/about-page-content";

export function AboutPathSnapshotSection() {
  return (
    <Section tone="muted">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          eyebrow="Technical Path Snapshot"
          title="A technical path built over time."
          className="mb-0 lg:max-w-2xl"
        />
        <Button href="/about-us/build-journey" variant="ghost" size="lg" className="shrink-0">
          Explore Full Build Journey
        </Button>
      </div>

      <div className="relative mt-10">
        <div
          className="absolute left-4 right-4 top-[1.125rem] hidden h-0.5 bg-gradient-to-r from-tb-blue/10 via-tb-blue/35 to-tb-blue/10 lg:block"
          aria-hidden
        />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-3">
          {ABOUT_PATH_SNAPSHOT.map((node, index) => (
            <li key={node.period} className="relative">
              <div className="mb-3 hidden items-center justify-center lg:flex">
                <span
                  className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-tb-blue/30 bg-white text-xs font-bold tabular-nums text-tb-blue shadow-sm ring-4 ring-tb-surface-muted"
                  aria-hidden
                >
                  {index + 1}
                </span>
              </div>
              <article className="h-full rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-md">
                <p className="text-sm font-semibold text-tb-blue">{node.period}</p>
                <p className="mt-2 text-sm leading-relaxed text-tb-text-muted">
                  {node.label}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
