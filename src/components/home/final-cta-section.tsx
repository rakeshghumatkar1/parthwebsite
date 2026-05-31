import { Button } from "@/components/ui/button";

export function FinalCtaSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-tb-navy-deep via-tb-navy to-tb-navy text-tb-text-on-dark"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(37,99,235,0.15),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-12 text-center sm:px-8 lg:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tb-cyan sm:text-sm">
          Get in Touch
        </p>
        <h2 className="mx-auto mt-3 max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.35rem] lg:leading-[1.12]">
          Have a software or AI workflow idea?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-tb-text-on-dark sm:text-lg">
          Bring the problem, workflow, or rough idea. We can help think through
          the system, define the build, and shape it into software that connects
          business needs with AI, automation, data, and product execution.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-tb-text-on-dark-muted sm:text-base">
          For larger or client-critical projects, delivery can include review,
          documentation, QA, security checks, deployment discipline, and
          structured oversight through Think Big.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
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
    </section>
  );
}
