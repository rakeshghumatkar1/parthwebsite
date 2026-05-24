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
            AI Software Systems Built Around Business Workflows
          </h1>
          <p className="mt-6 text-base leading-relaxed text-tb-text-on-dark-muted sm:text-lg">
            Software, automation, AI-assisted tools, data platforms, internal
            systems, and workflow applications — built with visible project proof
            and technical ownership.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-tb-text-on-dark-muted sm:text-base">
            This is the AI software systems vertical of Think Big Digital
            Solutions. The focus is simple: build software that supports real
            work. That may mean an internal tool, a reporting system, an
            automation pipeline, a local AI application, a dashboard, a content
            workflow, or a business-facing software product.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-tb-text-on-dark-muted sm:text-base">
            The work is led by Parth Ghumatkar, a self-led technical founder
            whose project history moves from school-age electronics, IoT,
            drones, and Python into current software, automation, AI workflow,
            and data-system builds.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#contact" variant="primary" dark>
              Discuss a Software Use Case
            </Button>
            <Button href="#what-we-build" variant="secondary" dark>
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
