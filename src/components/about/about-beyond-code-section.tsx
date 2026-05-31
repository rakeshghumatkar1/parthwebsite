import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ABOUT_IMAGE_PATHS } from "@/lib/about-page-content";

export function AboutBeyondCodeSection() {
  return (
    <section className="relative overflow-hidden bg-tb-navy text-tb-text-on-dark">
      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div>
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
          <div className="relative overflow-hidden rounded-2xl border border-tb-navy-border/80 shadow-xl shadow-black/30">
            <div className="relative aspect-[16/10] w-full min-h-[240px] sm:min-h-[280px] lg:aspect-[4/3]">
              <Image
                src={ABOUT_IMAGE_PATHS.bike}
                alt="Parth Ghumatkar with motorcycle"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover object-[center_55%]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
