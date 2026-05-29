import { Button } from "@/components/ui/button";
import { WorkflowDiagram } from "@/components/home/workflow-diagram";

export function HeroSection() {
  return (
    <section className="bg-tb-navy text-tb-text-on-dark">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-tb-cyan">
            AI Software Systems
          </p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            AI software systems, automation, and data workflows built around
            business use cases.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-tb-text-on-dark-muted sm:text-lg">
            Custom software, internal tools, AI-assisted applications, automation
            workflows, and data platforms built with technical ownership and
            reviewable project history.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-tb-text-on-dark-muted sm:text-base">
            This is the AI software systems vertical of Think Big Digital
            Solutions, shaped around software architecture, workflow logic,
            automation, data handling, and working applications.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-tb-text-on-dark-muted sm:text-base">
            Led by Parth Ghumatkar, the work connects years of independent
            technical building with current software, AI workflow, automation,
            and data-system projects.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#contact" variant="primary" dark>
              Discuss a Software Use Case
            </Button>
            <Button href="#selected-project-builds" variant="secondary" dark>
              View Current Projects
            </Button>
          </div>
        </div>

        <div className="min-w-0">
          <WorkflowDiagram />
        </div>
      </div>
    </section>
  );
}
