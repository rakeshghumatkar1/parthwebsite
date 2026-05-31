import Link from "next/link";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { IconArrowRight } from "@/components/ui/icons";
import { ABOUT_ORIGIN_CHAIN } from "@/lib/about-page-content";

export function AboutOriginSection() {
  return (
    <Section tone="light">
      <SectionHeader
        eyebrow="From Football to Technology"
        title="A different path into building."
        description="Football was one of Parth's early interests. A knee problem stopped him from continuing with football the way he wanted. YouTube became a way to pass time. A simple motor-based pencil-sharpener video triggered his curiosity about electronics and led him into robotics, Arduino, C++, IoT, and drones."
      />
      <div className="overflow-x-auto pb-2">
        <ol className="flex min-w-max items-center gap-2 sm:gap-3">
          {ABOUT_ORIGIN_CHAIN.map((step, index) => (
            <li key={step} className="flex items-center gap-2 sm:gap-3">
              <span className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-tb-text shadow-sm">
                {step}
              </span>
              {index < ABOUT_ORIGIN_CHAIN.length - 1 ? (
                <IconArrowRight className="h-4 w-4 shrink-0 text-tb-text-muted" />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-10">
        <Link
          href="/about-us/build-journey"
          className="inline-flex items-center gap-2 text-sm font-medium text-tb-blue hover:underline sm:text-base"
        >
          Read the full early build journey
          <IconArrowRight className="h-4 w-4" />
        </Link>
      </p>
    </Section>
  );
}
