import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { BUILD_JOURNEY_TIMELINE } from "@/lib/build-journey-page-content";

export function BuildJourneyTimelineSection() {
  return (
    <Section tone="muted">
      <SectionHeader
        eyebrow="Early Journey Timeline"
        title="The early path, step by step."
      />

      <div className="relative mt-2">
        <div
          className="absolute bottom-4 left-[1.125rem] top-4 hidden w-0.5 bg-gradient-to-b from-tb-blue/10 via-tb-blue/35 to-tb-blue/10 lg:block"
          aria-hidden
        />
        <ol className="grid gap-4 lg:gap-3">
          {BUILD_JOURNEY_TIMELINE.map((label, index) => (
            <li key={label} className="relative lg:pl-12">
              <div className="mb-2 flex items-center gap-3 lg:absolute lg:left-0 lg:top-1/2 lg:mb-0 lg:-translate-y-1/2">
                <span
                  className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-tb-blue/30 bg-white text-xs font-bold tabular-nums text-tb-blue shadow-sm ring-4 ring-tb-surface-muted"
                  aria-hidden
                >
                  {index + 1}
                </span>
              </div>
              <article className="rounded-2xl border border-slate-200/90 bg-white px-5 py-4 shadow-sm ring-1 ring-slate-100 lg:py-5">
                <p className="text-sm font-medium leading-snug text-tb-text sm:text-base">
                  {label}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
