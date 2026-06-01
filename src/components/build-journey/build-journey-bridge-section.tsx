import { Button } from "@/components/ui/button";

export function BuildJourneyBridgeSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-tb-navy-deep via-tb-navy to-tb-navy text-tb-text-on-dark">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(37,99,235,0.14),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-10 sm:px-8 sm:py-12 lg:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tb-cyan sm:text-sm">
          From Early Builds to Current Systems
        </p>
        <h2 className="mt-2 max-w-2xl text-balance text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
          From early builds to current systems.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-tb-text-on-dark-muted sm:text-base">
          The early work shows the pattern: curiosity, testing, debugging, and
          persistence. Current projects now apply that pattern to software systems,
          automation, data, and AI workflows.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href="/projects/early-work" variant="primary" dark size="lg">
            View Early Work
          </Button>
          <Button href="/projects" variant="secondary" dark size="lg">
            View Current Projects
          </Button>
          <Button href="/about-us" variant="secondary" dark size="lg">
            Back to About Us
          </Button>
        </div>
      </div>
    </section>
  );
}
