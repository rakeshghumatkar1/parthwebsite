import { BuildJourneyOrbitDiagram } from "@/components/build-journey/build-journey-orbit-diagram";
import { Section } from "@/components/ui/section";
import { IconChip, IconTerminal } from "@/components/ui/icons";
import {
  BUILD_JOURNEY_STRUCTURED_EXPOSURE_ANCHOR,
  BUILD_JOURNEY_TECHNICAL_BASE,
} from "@/lib/build-journey-page-content";

export function BuildJourneyStructuredExposureSection() {
  return (
    <Section
      id={BUILD_JOURNEY_STRUCTURED_EXPOSURE_ANCHOR}
      tone="muted"
      dense
      className="scroll-mt-20"
    >
      <div className="overflow-hidden rounded-lg border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-100/80">
        <div
          className="h-0.5 bg-gradient-to-r from-tb-blue via-tb-cyan/80 to-transparent"
          aria-hidden
        />
        <div className="p-3.5 sm:p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tb-blue">
            First Structured Exposure
          </p>
          <h2 className="mt-1.5 text-balance text-xl font-semibold leading-snug tracking-tight text-tb-text sm:text-2xl">
            Robotics turned interest into structured building.
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-tb-text-muted sm:text-base">
            Parth completed all three levels of Lego Advanced Robotics — learning
            electronics, C++ coding, assembly, and project thinking through
            components, movement, logic, control, and troubleshooting.
          </p>

          <div className="mt-3.5 grid gap-3.5 xl:grid-cols-[1fr_232px] xl:items-start">
            <BuildJourneyOrbitDiagram compact />

            <aside className="rounded-md border border-slate-200/80 bg-slate-50/60 p-3.5">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-200/90 bg-white text-tb-blue">
                  <IconChip className="h-3.5 w-3.5" />
                </span>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-tb-blue">
                  Early Technical Base
                </p>
              </div>
              <ul className="mt-2.5 grid gap-1.5 sm:grid-cols-2 xl:grid-cols-1">
                {BUILD_JOURNEY_TECHNICAL_BASE.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-1.5 text-xs leading-snug text-tb-text-muted"
                  >
                    <IconTerminal className="mt-0.5 h-3 w-3 shrink-0 text-tb-blue/70" />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </Section>
  );
}
