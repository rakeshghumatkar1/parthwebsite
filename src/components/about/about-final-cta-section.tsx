import { Button } from "@/components/ui/button";

export function AboutFinalCtaSection() {
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
          Ready to Review the Work?
        </p>
        <h2 className="mt-5 max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
          Review the work, not just the story.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-tb-text-on-dark-muted sm:text-lg">
          The best way to understand Parth&apos;s capability is to review the
          project trail — GitHub repositories, YouTube demos, proof material,
          current systems, screenshots, build notes, and project documentation.
        </p>

        <div className="mt-10 max-w-3xl space-y-3">
          <Button
            href="/projects"
            variant="primary"
            dark
            size="lg"
            className="w-full justify-center shadow-lg shadow-tb-blue/20"
          >
            View Current Projects
          </Button>
          <div className="grid gap-3 sm:grid-cols-3">
            <Button href="/videos" variant="secondary" dark size="lg" className="w-full justify-center">
              Watch YouTube Demos
            </Button>
            <Button href="/proof" variant="secondary" dark size="lg" className="w-full justify-center">
              Review Proof Library
            </Button>
            <Button href="/#contact" variant="secondary" dark size="lg" className="w-full justify-center sm:col-span-1">
              Discuss a Software Use Case
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
