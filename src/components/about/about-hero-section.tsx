import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  IconAward,
  IconLayers,
  IconSystems,
  IconWorkflow,
} from "@/components/ui/icons";
import {
  ABOUT_HERO_BADGES,
  ABOUT_IMAGE_PATHS,
} from "@/lib/about-page-content";

const badgeIcons = [IconAward, IconSystems, IconWorkflow, IconLayers, IconSystems];

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

export function AboutHeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-tb-navy-deep via-tb-navy to-tb-navy text-tb-text-on-dark">
      <HeroGridOverlay />
      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:py-28">
        <div className="max-w-xl lg:max-w-none">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tb-cyan sm:text-sm">
            About Parth
          </p>
          <h1 className="mt-4 text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Coder by Accident.
            <span className="block text-tb-blue">Builder by Choice.</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-tb-text-on-dark sm:text-lg">
            Parth Ghumatkar builds AI-assisted software systems, automation
            workflows, and project-oriented tools. His credibility comes from
            years of building, debugging, documenting, and improving real
            technology work — not from borrowed credentials alone.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <Button href="/projects" variant="primary" dark size="lg">
              View Current Projects
            </Button>
            <Button href="/about-us/build-journey" variant="secondary" dark size="lg">
              Explore Build Journey
            </Button>
            <Button href="/projects/early-work" variant="secondary" dark size="lg">
              View Early Work
            </Button>
          </div>
        </div>

        <div className="relative min-w-0 lg:pl-2">
          {/* Connector accents */}
          <div
            className="pointer-events-none absolute -left-3 top-1/2 hidden h-px w-8 -translate-y-1/2 bg-gradient-to-r from-transparent to-tb-cyan/40 lg:block"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-2 -top-2 h-16 w-16 rounded-full border border-tb-cyan/20 opacity-60"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-3 -left-2 h-12 w-12 rounded-full border border-tb-blue/20 opacity-50"
            aria-hidden
          />

          <div className="relative overflow-hidden rounded-2xl border border-tb-navy-border/90 bg-tb-navy-elevated/80 shadow-2xl shadow-black/30 ring-1 ring-tb-cyan/10">
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-tb-blue/10 via-transparent to-tb-cyan/5"
              aria-hidden
            />
            <div className="relative aspect-[4/5] w-full max-h-[480px] sm:max-h-[520px]">
              <Image
                src={ABOUT_IMAGE_PATHS.hero}
                alt="Parth Ghumatkar"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover object-[center_20%]"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-tb-navy/80 to-transparent"
                aria-hidden
              />
            </div>

            <ul className="relative grid gap-2 border-t border-tb-navy-border/80 bg-tb-navy/90 p-4 sm:grid-cols-2">
              {ABOUT_HERO_BADGES.map((badge, index) => {
                const Icon = badgeIcons[index] ?? IconSystems;
                return (
                  <li
                    key={badge}
                    className="flex items-center gap-2 rounded-lg border border-tb-navy-border/80 bg-tb-navy-elevated/90 px-3 py-2 ring-1 ring-white/5"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-tb-blue/20 text-tb-cyan">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-xs leading-snug text-tb-text-on-dark sm:text-[13px]">
                      {badge}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
