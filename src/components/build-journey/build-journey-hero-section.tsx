import Link from "next/link";
import { BuildJourneyBlueprintDiagram } from "@/components/build-journey/build-journey-blueprint-diagram";
import { Button } from "@/components/ui/button";

function HeroGridOverlay() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_40%,rgba(37,99,235,0.14),transparent)]"
        aria-hidden
      />
    </>
  );
}

export function BuildJourneyHeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-tb-navy-deep via-tb-navy to-tb-navy text-tb-text-on-dark">
      <HeroGridOverlay />
      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:py-28">
        <div className="max-w-xl lg:max-w-none">
          <nav aria-label="Breadcrumb" className="text-sm text-tb-text-on-dark-muted">
            <Link href="/about-us" className="text-tb-cyan hover:underline">
              About Us
            </Link>
            <span className="mx-2 text-tb-navy-border">/</span>
            <span className="text-tb-text-on-dark">Build Journey</span>
          </nav>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-tb-cyan sm:text-sm">
            Parth&apos;s Early Build Journey
          </p>
          <h1 className="mt-4 text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
            The childhood{" "}
            <span className="text-tb-blue">journey</span> behind the builder.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-tb-text-on-dark sm:text-lg">
            A deeper look at how football, a knee problem, YouTube, electronics,
            robotics, Arduino, drones, and early public proof shaped Parth&apos;s
            technical path.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <Button href="/about-us" variant="primary" dark size="lg">
              Back to About Us
            </Button>
            <Button href="/videos" variant="secondary" dark size="lg">
              Watch Early Videos
            </Button>
            <Button href="/proof" variant="secondary" dark size="lg">
              Review Early Proof
            </Button>
          </div>
        </div>

        <div className="relative min-w-0 lg:pl-2">
          <BuildJourneyBlueprintDiagram />
        </div>
      </div>
    </section>
  );
}
