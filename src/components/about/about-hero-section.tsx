import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  IconAutomation,
  IconChip,
  IconDatabase,
  IconTerminal,
  IconWorkflow,
} from "@/components/ui/icons";
import {
  ABOUT_HERO_BADGES,
  ABOUT_IMAGE_PATHS,
} from "@/lib/about-page-content";
import type { ComponentType } from "react";

const badgeIcons: ComponentType<{ className?: string }>[] = [
  IconTerminal,
  IconChip,
  IconAutomation,
  IconDatabase,
  IconWorkflow,
];

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
      <div className="relative mx-auto grid w-full max-w-6xl gap-6 px-6 py-10 sm:px-8 sm:py-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-6 lg:py-14">
        <div className="max-w-xl lg:max-w-none">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tb-cyan sm:text-sm">
            About Parth
          </p>
          <h1 className="mt-3 text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            Coder by Accident.
            <span className="block text-tb-blue">Builder by Choice.</span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-tb-text-on-dark sm:text-lg">
            Parth Ghumatkar builds AI-assisted software systems, automation
            workflows, and project-oriented tools. His credibility comes from
            years of building, debugging, documenting, and improving real
            technology work — not from borrowed credentials alone.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5 sm:gap-3">
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

        <div className="relative min-w-0 lg:pl-1">
          <div className="relative overflow-hidden rounded-xl border border-tb-cyan/20 bg-tb-navy-elevated/80 shadow-xl shadow-black/30 ring-1 ring-tb-cyan/10">
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-tb-blue/10 via-transparent to-tb-cyan/5"
              aria-hidden
            />
            <div className="relative aspect-[4/5] w-full max-h-[380px] sm:max-h-[420px]">
              <Image
                src={ABOUT_IMAGE_PATHS.hero}
                alt="Parth Ghumatkar"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-[center_20%]"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-tb-navy/80 to-transparent"
                aria-hidden
              />
            </div>

            <ul className="relative grid gap-1.5 border-t border-tb-navy-border/80 bg-tb-navy/90 p-2.5 sm:grid-cols-2 sm:p-3">
              {ABOUT_HERO_BADGES.map((badge, index) => {
                const Icon = badgeIcons[index] ?? IconTerminal;
                return (
                  <li
                    key={badge}
                    className="flex items-center gap-2 rounded-md border border-tb-navy-border/80 bg-tb-navy-elevated/90 px-2.5 py-1.5"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-tb-cyan/20 bg-tb-blue/20 text-tb-cyan">
                      <Icon className="h-3 w-3" />
                    </span>
                    <span className="text-[11px] leading-snug text-tb-text-on-dark sm:text-xs">
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
