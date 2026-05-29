import { Section } from "@/components/ui/section";
import { SoftwareFirstDiagram } from "@/components/home/workflow-diagram";

export function SoftwareFirstSection() {
  return (
    <Section id="software-first" tone="light">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="max-w-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tb-blue">
            Software First
          </p>
          <h2 className="mt-3 max-w-md text-balance text-2xl font-semibold leading-snug tracking-tight text-tb-text sm:text-[1.65rem] lg:text-[1.85rem]">
            AI works best when the surrounding system is clear.
          </h2>
          <div className="mt-5 max-w-prose space-y-3.5 text-sm leading-relaxed text-tb-text-muted sm:text-base">
            <p>
              AI can support analysis, summaries, classification, routing,
              research, content creation, reporting, and workflow automation.
            </p>
            <p>
              But the surrounding system still matters: software structure, data
              flow, interface design, permissions, testing, documentation,
              deployment, and user adoption.
            </p>
            <p>
              The focus here is not AI as a slogan. The focus is on software
              systems that can be built, reviewed, improved, and used.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200/90 bg-gradient-to-br from-slate-50/80 via-white to-blue-50/30 p-5 sm:p-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-tb-blue">
            Workflow line
          </p>
          <SoftwareFirstDiagram />
        </div>
      </div>
    </Section>
  );
}
