import { Section } from "@/components/ui/section";
import { BUILD_JOURNEY_TIMELINE, BUILD_JOURNEY_TIMELINE_NOTE } from "@/lib/build-journey-page-content";

export function BuildJourneyTimelineSection() {
  return (
    <Section tone="light" dense>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tb-blue">
          Early Journey Timeline
        </p>
        <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-tb-text sm:text-2xl">
          The path in nine short steps.
        </h2>
      </div>

      <div className="mt-3 overflow-hidden rounded-lg border border-slate-200/90 bg-white p-2 shadow-sm sm:p-2.5">
        <ol className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {BUILD_JOURNEY_TIMELINE.map((label, index) => (
            <li key={label}>
              <article className="flex h-full min-h-[3.25rem] gap-2 rounded-md border border-slate-200/80 bg-slate-50/50 p-2.5">
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-tb-blue/30 bg-white text-[10px] font-bold tabular-nums text-tb-blue"
                  aria-hidden
                >
                  {index + 1}
                </span>
                <p className="text-xs font-medium leading-snug text-tb-text sm:text-sm">
                  {label}
                </p>
              </article>
            </li>
          ))}
        </ol>

        <div
          className="my-2 hidden h-px bg-gradient-to-r from-transparent via-tb-blue/20 to-transparent sm:block"
          aria-hidden
        />

        <article className="rounded-md border border-tb-blue/25 bg-gradient-to-r from-tb-blue/[0.06] via-tb-blue/[0.04] to-tb-blue/[0.06] p-2.5 sm:p-3">
          <p className="text-xs font-medium leading-snug text-tb-text sm:text-sm">
            {BUILD_JOURNEY_TIMELINE_NOTE}
          </p>
        </article>
      </div>
    </Section>
  );
}
