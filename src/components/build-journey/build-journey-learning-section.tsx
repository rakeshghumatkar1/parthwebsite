import { Section } from "@/components/ui/section";
import { IconArrowRight, IconPipeline } from "@/components/ui/icons";
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
    <li className={vertical ? "flex gap-2" : "flex min-w-0 items-center gap-1.5 lg:gap-2"}>
      <div className={`flex min-w-0 gap-2 ${vertical ? "flex-1" : "items-center"}`}>
        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-tb-blue/10 text-[10px] font-bold tabular-nums text-tb-blue ring-1 ring-tb-blue/20"
          aria-hidden
        >
          {step}
        </span>
        <span className="min-w-0 rounded-md border border-slate-200/90 bg-white px-2.5 py-1.5 text-xs leading-snug text-tb-text">
          {label}
        </span>
      </div>
      {showArrow && !vertical ? (
        <IconArrowRight className="hidden h-3.5 w-3.5 shrink-0 text-tb-blue/50 xl:block" aria-hidden />
      ) : null}
    </li>
  );
}

export function BuildJourneyLearningSection() {
  return (
    <Section tone="muted" dense>
      <div className="overflow-hidden rounded-lg border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-100/80">
        <div
          className="h-0.5 bg-gradient-to-r from-tb-blue via-tb-cyan/80 to-transparent"
          aria-hidden
        />
        <div className="p-3.5 sm:p-4">
          <div className="flex items-start gap-2.5">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-200/90 bg-slate-50 text-tb-blue">
              <IconPipeline className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tb-blue">
                Problem-Solving Method
              </p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight text-tb-text sm:text-2xl">
                Build. Test. Debug. Improve. Repeat.
              </h2>
            </div>
          </div>

          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-tb-text-muted sm:text-base">
            When stuck: search sources, test, fail, debug, adjust, and retry.
          </p>

          <div className="mt-3 rounded-md border border-slate-200/80 bg-slate-50/50 p-2.5 sm:p-3">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-tb-text-muted">
              Learning loop
            </p>
            <ol className="flex flex-col gap-1.5 xl:hidden">
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
            <ol className="hidden flex-wrap items-center gap-x-1.5 gap-y-2 xl:flex">
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

          <div className="mt-3 rounded-md border border-tb-blue/20 bg-tb-blue/[0.04] px-3.5 py-3 text-center">
            <p className="text-sm font-semibold leading-snug text-tb-text sm:text-base">
              {BUILD_JOURNEY_LEARNING_KEY_LINE}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
