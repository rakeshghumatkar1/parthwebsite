import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ABOUT_HERO_BADGES,
  ABOUT_IMAGE_PATHS,
} from "@/lib/about-page-content";

export function AboutHeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-tb-navy-deep via-tb-navy to-tb-navy text-tb-text-on-dark">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_40%,rgba(37,99,235,0.12),transparent)]"
        aria-hidden
      />
      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:py-32">
        <div className="max-w-xl lg:max-w-none">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tb-cyan sm:text-sm">
            About Parth
          </p>
          <h1 className="mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Coder by Accident.
            <span className="block text-tb-blue">Builder by Choice.</span>
          </h1>
          <p className="mt-7 text-base leading-relaxed text-tb-text-on-dark sm:text-lg">
            Parth Ghumatkar&apos;s technical credibility is self-built. It does not
            depend only on a college name, formal credential, or job title. His
            proof comes from years of building, debugging, documenting, and
            improving real technology projects.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/projects" variant="primary" dark size="lg">
              View Current Projects
            </Button>
            <Button href="/about-us/build-journey" variant="secondary" dark size="lg">
              Explore Build Journey
            </Button>
          </div>
        </div>

        <div className="min-w-0 lg:pl-2">
          <div className="relative overflow-hidden rounded-2xl border border-tb-navy-border/80 bg-tb-navy-elevated/50 shadow-xl shadow-black/20">
            <div className="relative aspect-[4/5] w-full max-h-[520px] sm:max-h-[560px]">
              <Image
                src={ABOUT_IMAGE_PATHS.hero}
                alt="Parth Ghumatkar"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover object-[center_20%]"
              />
            </div>
            <ul className="flex flex-wrap gap-2 border-t border-tb-navy-border/80 bg-tb-navy/80 p-4">
              {ABOUT_HERO_BADGES.map((badge) => (
                <li
                  key={badge}
                  className="rounded-full border border-tb-navy-border bg-tb-navy-elevated/90 px-3 py-1 text-xs text-tb-text-on-dark-muted"
                >
                  {badge}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
