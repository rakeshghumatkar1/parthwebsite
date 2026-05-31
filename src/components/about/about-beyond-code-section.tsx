import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ABOUT_IMAGE_PATHS } from "@/lib/about-page-content";

export function AboutBeyondCodeSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-tb-navy-deep via-tb-navy to-tb-navy text-tb-text-on-dark">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
          <div className="lg:pr-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tb-cyan sm:text-sm">
              Beyond Code
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Beyond code.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-tb-text-on-dark-muted sm:text-lg">
              Away from the screen, biking became one of Parth&apos;s personal
              passions — a different expression of focus, control, and machine
              curiosity.
            </p>
            <div className="mt-8">
              <Button href="/about-us/build-journey" variant="secondary" dark size="lg">
                Explore Build Journey
              </Button>
            </div>
          </div>

          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-2 rounded-2xl bg-gradient-to-br from-tb-cyan/10 via-transparent to-tb-blue/10 opacity-80"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-2xl border border-tb-navy-border/90 shadow-2xl shadow-black/40 ring-1 ring-tb-cyan/15">
              <div className="relative aspect-[16/10] w-full min-h-[220px] sm:min-h-[280px] lg:aspect-[5/3] lg:min-h-[320px]">
                <Image
                  src={ABOUT_IMAGE_PATHS.bike}
                  alt="Parth Ghumatkar with motorcycle"
                  fill
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="object-cover object-[center_55%]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-tb-navy/70 via-tb-navy/10 to-transparent"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-tb-navy/30 via-transparent to-transparent"
                  aria-hidden
                />
              </div>
              <div className="border-t border-tb-navy-border/60 bg-tb-navy/80 px-4 py-2.5 text-center text-xs text-tb-text-on-dark-muted">
                Focus, control, and machine curiosity off the screen
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
