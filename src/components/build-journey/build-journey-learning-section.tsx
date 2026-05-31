import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { IconArrowRight } from "@/components/ui/icons";
import {
  BUILD_JOURNEY_LEARNING_KEY_LINE,
  BUILD_JOURNEY_LEARNING_STEPS,
} from "@/lib/build-journey-page-content";

function ProcessStep({
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
    <li className={vertical ? "flex gap-4" : "flex items-center gap-2 lg:gap-3"}>
      <div className={`flex min-w-0 gap-3 ${vertical ? "flex-1" : "items-center"}`}>
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tb-blue/10 text-xs font-bold tabular-nums text-tb-blue ring-1 ring-tb-blue/20"
          aria-hidden
        >
          {step}
        </span>
        <span className="rounded-xl border border-slate-200/90 bg-white px-3.5 py-2.5 text-sm leading-snug text-tb-text shadow-sm ring-1 ring-slate-100 sm:px-4">
          {label}
        </span>
      </div>
      {showArrow && !vertical ? (
        <IconArrowRight className="hidden h-4 w-4 shrink-0 text-tb-blue/50 lg:block" aria-hidden />
      ) : null}
    </li>
  );
}

export function BuildJourneyLearningSection() {
  return (
    <Section tone="light">
      <SectionHeader
        eyebrow="Learning by Building"
        title="Build. Test. Debug. Improve. Repeat."
      />
      <div className="max-w-3xl space-y-4 text-base leading-relaxed text-tb-text-muted sm:text-lg">
        <p>
          Parth&apos;s learning method became build-led. He used Arduino forums to
          find project ideas, understand how others solved problems, and study
          technical approaches. He used YouTube for visual understanding —
          circuits, assembly, component behavior, demonstrations, and project
          walkthroughs.
        </p>
        <p>
          When he got stuck, his process was to search, watch, test, fail, change
          the approach, and try again.
        </p>
      </div>

      <ol className="mt-10 flex flex-col gap-3 lg:hidden">
        {BUILD_JOURNEY_LEARNING_STEPS.map((step, index) => (
          <ProcessStep
            key={step}
            step={index + 1}
            label={step}
            showArrow={index < BUILD_JOURNEY_LEARNING_STEPS.length - 1}
            vertical
          />
        ))}
      </ol>

      <div className="mt-10 hidden rounded-2xl border border-slate-200/90 bg-tb-surface-muted/50 p-4 ring-1 ring-slate-100 lg:block lg:p-6">
        <ol className="flex flex-wrap items-center gap-y-3">
          {BUILD_JOURNEY_LEARNING_STEPS.map((step, index) => (
            <ProcessStep
              key={step}
              step={index + 1}
              label={step}
              showArrow={index < BUILD_JOURNEY_LEARNING_STEPS.length - 1}
            />
          ))}
        </ol>
      </div>

      <div className="relative mx-auto mt-12 max-w-2xl">
        <div
          className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-br from-tb-blue/10 via-transparent to-tb-cyan/10"
          aria-hidden
        />
        <div className="relative rounded-2xl border-2 border-tb-blue/20 bg-white px-6 py-6 text-center shadow-md ring-1 ring-tb-blue/10 sm:px-8 sm:py-7">
          <p className="text-lg font-semibold leading-snug text-tb-text sm:text-xl">
            {BUILD_JOURNEY_LEARNING_KEY_LINE}
          </p>
        </div>
      </div>
    </Section>
  );
}
