import { Button } from "@/components/ui/button";

export function FinalCtaSection() {
  return (
    <section id="contact" className="bg-tb-navy text-tb-text-on-dark">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 text-center sm:px-8 sm:py-20 lg:py-24">
        <p className="text-xs font-semibold uppercase tracking-widest text-tb-cyan">
          Get in Touch
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
          Have a software or AI workflow idea?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-tb-text-on-dark-muted sm:text-lg">
          Bring the problem, workflow, or rough idea. We can help think through
          the system, define the build, and shape it into software that connects
          business needs with AI, automation, data, and product execution.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-tb-text-on-dark-muted sm:text-base">
          For larger or client-critical projects, delivery can include review,
          documentation, QA, security checks, deployment discipline, and
          structured oversight through Think Big.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href="#contact" variant="primary" dark>
            Discuss a Software Use Case
          </Button>
          <Button href="#selected-project-builds" variant="secondary" dark>
            View Current Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
