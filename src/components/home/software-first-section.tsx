import { Section } from "@/components/ui/section";
import { SoftwareFirstDiagram } from "@/components/home/workflow-diagram";

export function SoftwareFirstSection() {
  return (
    <Section id="software-first" tone="light" dense>
      <div className="rounded-xl border border-slate-200/90 bg-gradient-to-br from-white via-white to-slate-50/60 p-4 shadow-sm sm:p-5">
        <div className="grid gap-3.5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-4">
          <div className="max-w-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tb-blue">
              How We Think About AI
            </p>
            <h2 className="mt-1.5 max-w-md text-balance text-2xl font-semibold leading-snug tracking-tight text-tb-text sm:text-[1.55rem]">
              AI works best inside a clear system.
            </h2>
            <div className="mt-2 max-w-prose space-y-2 text-sm leading-relaxed text-tb-text-muted sm:text-base">
              <p>
                AI can support analysis, routing, content, reporting, and automation
                — but the surrounding software still matters: data flow, permissions,
                testing, documentation, deployment, and user adoption.
              </p>
              <p>
                The focus is not AI as a slogan. The focus is useful systems that
                can be built, reviewed, improved, and used.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200/80 bg-white/90 p-3 sm:p-3.5">
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-tb-blue">
              Workflow line
            </p>
            <SoftwareFirstDiagram />
          </div>
        </div>
      </div>
    </Section>
  );
}
