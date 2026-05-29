import { Section } from "@/components/ui/section";
import { SoftwareFirstDiagram } from "@/components/home/workflow-diagram";

export function SoftwareFirstSection() {
  return (
    <Section id="software-first" tone="light">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-14 xl:gap-16">
        <div className="flex max-w-xl flex-col justify-center lg:max-w-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tb-blue">
            Software First
          </p>
          <h2 className="mt-3 max-w-md text-balance text-2xl font-semibold leading-snug tracking-tight text-tb-text sm:text-[1.75rem] lg:text-3xl">
            AI works best when the surrounding system is clear.
          </h2>
          <div className="mt-6 max-w-prose space-y-4 text-base leading-relaxed text-tb-text-muted sm:text-lg">
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

        <div className="flex min-h-[280px] flex-col justify-center lg:min-h-[320px]">
          <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-gradient-to-br from-slate-50 via-white to-blue-50/40 p-6 shadow-md ring-1 ring-slate-100 sm:p-8 lg:p-10">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.15em] text-tb-blue">
              Workflow line
            </p>
            <SoftwareFirstDiagram />
          </div>
        </div>
      </div>
    </Section>
  );
}
