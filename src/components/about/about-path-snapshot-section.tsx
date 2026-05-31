import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { ABOUT_PATH_SNAPSHOT } from "@/lib/about-page-content";

export function AboutPathSnapshotSection() {
  return (
    <Section tone="muted" dense>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tb-blue">
            Technical Path Snapshot
          </p>
          <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-tb-text sm:text-2xl">
            A technical path built over time.
          </h2>
        </div>
        <Button href="/about-us/build-journey" variant="ghost" className="shrink-0">
          Explore Full Build Journey
        </Button>
      </div>

      <div className="relative mt-3 overflow-hidden rounded-lg border border-slate-200/90 bg-white p-2 shadow-sm sm:p-2.5">
        <div
          className="absolute left-6 right-6 top-[1.75rem] hidden h-px bg-gradient-to-r from-tb-blue/10 via-tb-blue/30 to-tb-blue/10 lg:block"
          aria-hidden
        />
        <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5 lg:gap-2">
          {ABOUT_PATH_SNAPSHOT.map((node, index) => (
            <li key={node.period} className="relative">
              <div className="mb-2 hidden items-center justify-center lg:flex">
                <span
                  className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border border-tb-blue/30 bg-white text-[10px] font-bold tabular-nums text-tb-blue"
                  aria-hidden
                >
                  {index + 1}
                </span>
              </div>
              <article className="h-full rounded-md border border-slate-200/80 bg-slate-50/50 p-3">
                <p className="text-xs font-semibold text-tb-blue">{node.period}</p>
                <p className="mt-1 text-sm leading-relaxed text-tb-text-muted">
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
