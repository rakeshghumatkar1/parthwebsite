import { Button } from "@/components/ui/button";
import { WorkflowDiagram } from "@/components/home/workflow-diagram";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-tb-navy-deep via-tb-navy to-tb-navy text-tb-text-on-dark">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_40%,rgba(37,99,235,0.12),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:py-32">
        <div className="max-w-xl lg:max-w-none">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tb-cyan sm:text-sm">
            AI Software Systems
          </p>
          <h1 className="mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl sm:leading-[1.08] lg:text-5xl xl:text-[3.25rem]">
            AI software systems, automation, and data workflows built around
            business use cases.
          </h1>
          <p className="mt-7 text-base leading-relaxed text-tb-text-on-dark sm:text-lg">
            Custom software, internal tools, AI-assisted applications, automation
            workflows, and data platforms built with technical ownership and
            reviewable project history.
          </p>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-tb-text-on-dark-muted sm:text-base">
            <p>
              This is the AI software systems vertical of Think Big Digital
              Solutions, shaped around software architecture, workflow logic,
              automation, data handling, and working applications.
            </p>
            <p>
              Led by Parth Ghumatkar, the work connects years of independent
              technical building with current software, AI workflow, automation,
              and data-system projects.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
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

        <div className="min-w-0 lg:pl-2">
          <WorkflowDiagram />
        </div>
      </div>
    </section>
  );
}
