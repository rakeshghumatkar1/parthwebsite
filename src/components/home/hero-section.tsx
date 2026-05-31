import { Button } from "@/components/ui/button";
import { WorkflowDiagram } from "@/components/home/workflow-diagram";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-tb-navy-deep via-tb-navy to-tb-navy text-tb-text-on-dark">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_40%,rgba(37,99,235,0.12),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto grid w-full max-w-6xl gap-5 px-6 py-10 sm:px-8 sm:py-12 lg:grid-cols-[0.96fr_1.04fr] lg:items-center lg:gap-5 lg:py-14">
        <div className="max-w-xl lg:max-w-none">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tb-cyan sm:text-sm">
            AI SOFTWARE SYSTEMS
          </p>
          <h1 className="mt-3 text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl sm:leading-[1.08] lg:text-[2.65rem]">
            Software systems where AI, automation, and data support real work.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-tb-text-on-dark sm:text-lg">
            Custom internal tools, workflow automation, AI-assisted applications,
            and data platforms built around business use cases — with visible
            project records.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-tb-text-on-dark-muted sm:text-base">
            A Think Big Digital Solutions vertical led by Parth Ghumatkar.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="#contact" variant="primary" dark size="lg">
              Discuss a Software Use Case
            </Button>
            <Button
              href="#selected-project-builds"
              variant="secondary"
              dark
              size="lg"
            >
              View Current Projects
            </Button>
          </div>
        </div>

        <div className="min-w-0 max-lg:overflow-x-auto max-lg:pb-1 lg:pl-0.5">
          <div className="max-lg:min-w-[272px]">
            <WorkflowDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}
