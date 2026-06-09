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
      <div className="relative mx-auto grid w-full max-w-6xl gap-6 px-6 py-10 sm:px-8 sm:py-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-6 lg:py-14">
        <div className="max-w-xl lg:max-w-none">
          <nav aria-label="Breadcrumb" className="text-xs text-tb-text-on-dark-muted sm:text-sm">
            <Link href="/about-us" className="text-tb-cyan hover:underline">
              About Us
            </Link>
            <span className="mx-2 text-tb-navy-border">/</span>
            <span className="text-tb-text-on-dark">Build Journey</span>
          </nav>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-tb-cyan sm:text-sm">
            Parth&apos;s Early Build Journey
          </p>
          <h1 className="mt-3 text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            The childhood{" "}
            <span className="text-tb-blue">journey</span> behind the builder.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-tb-text-on-dark sm:text-lg">
            From football and YouTube to robotics, Arduino, drones, and working
            hardware projects — this is the period where curiosity became a habit
            of building.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/projects/early-work" variant="primary" dark size="lg">
              View Early Work
            </Button>
            <Button href="/about-us" variant="secondary" dark size="lg">
              Back to About Us
            </Button>
          </div>
        </div>

        <div className="relative min-w-0 lg:pl-1">
          <BuildJourneyBlueprintDiagram />
        </div>
      </div>
    </section>
  );
}
