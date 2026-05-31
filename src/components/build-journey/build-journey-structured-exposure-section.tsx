import { BuildJourneyOrbitDiagram } from "@/components/build-journey/build-journey-orbit-diagram";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import {
  BUILD_JOURNEY_STRUCTURED_EXPOSURE_ANCHOR,
  BUILD_JOURNEY_TECHNICAL_BASE,
} from "@/lib/build-journey-page-content";

export function BuildJourneyStructuredExposureSection() {
  return (
    <Section
      id={BUILD_JOURNEY_STRUCTURED_EXPOSURE_ANCHOR}
      tone="muted"
      className="scroll-mt-24"
    >
      <SectionHeader
        eyebrow="First Structured Exposure"
        title="Robotics gave the curiosity a structure."
        description="Parth completed all three levels of Lego Advanced Robotics and started understanding electronics, C++ coding, assembly, and project thinking. The learning was not only theoretical. It involved components, movement, logic, control, troubleshooting, and real-world behavior."
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-12">
        <BuildJourneyOrbitDiagram />

        <aside className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-100 lg:sticky lg:top-28">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-tb-blue">
            Early Technical Base
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {BUILD_JOURNEY_TECHNICAL_BASE.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm leading-snug text-tb-text-muted"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tb-blue"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Section>
  );
}
