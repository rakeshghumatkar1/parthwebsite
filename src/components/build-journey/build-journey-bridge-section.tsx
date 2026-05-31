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
          backgroundSize: "56px 56px",
        }}
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-24 sm:px-8 sm:py-28 lg:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tb-cyan sm:text-sm">
          From Early Builds to Current Systems
        </p>
        <h2 className="mt-5 max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
          The early story explains the foundation.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-tb-text-on-dark-muted sm:text-lg">
          The childhood and early build years show how the habit formed: curiosity,
          search, testing, failure, debugging, and repeated improvement. The main
          About Us page connects this foundation to his current AI-assisted
          software, automation, data, and workflow systems.
        </p>

        <div className="mt-10 flex max-w-3xl flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button
            href="/about-us"
            variant="primary"
            dark
            size="lg"
            className="w-full justify-center shadow-lg shadow-tb-blue/20 sm:w-auto"
          >
            Back to About Us
          </Button>
          <Button
            href="/projects/early-work"
            variant="secondary"
            dark
            size="lg"
            className="w-full justify-center sm:w-auto"
          >
            View Early Work
          </Button>
          <Button
            href="/projects"
            variant="secondary"
            dark
            size="lg"
            className="w-full justify-center sm:w-auto"
          >
            View Current Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
