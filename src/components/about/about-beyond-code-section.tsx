import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ABOUT_CONTACT_URL, ABOUT_IMAGE_PATHS } from "@/lib/about-page-content";

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
      <div className="relative mx-auto w-full max-w-6xl px-6 py-10 sm:px-8 sm:py-12 lg:py-14">
        <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tb-cyan sm:text-sm">
              Beyond Code
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Beyond code.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-tb-text-on-dark-muted sm:text-base">
              Away from the screen, biking became one of Parth&apos;s personal
              passions — a different expression of focus, control, and machine
              curiosity.
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <Button href="/about-us/build-journey" variant="secondary" dark size="lg">
                Explore Build Journey
              </Button>
              <Link
                href={ABOUT_CONTACT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-transparent px-5 py-2.5 text-sm font-medium text-tb-text-on-dark transition-colors hover:border-white/50 hover:bg-white/5 sm:px-6 sm:py-3"
              >
                Discuss a Use Case
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-tb-navy-border/90 shadow-xl shadow-black/40 ring-1 ring-tb-cyan/15">
            <div className="relative aspect-[4/5] w-full max-h-[420px] sm:max-h-[460px] lg:max-h-[480px]">
              <Image
                src={ABOUT_IMAGE_PATHS.bike}
                alt="Parth Ghumatkar with motorcycle"
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover object-[center_62%]"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-tb-navy/55 to-transparent"
                aria-hidden
              />
            </div>
            <div className="border-t border-tb-navy-border/60 bg-tb-navy/80 px-3 py-2 text-center text-[11px] text-tb-text-on-dark-muted sm:text-xs">
              Focus, control, and machine curiosity off the screen
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
