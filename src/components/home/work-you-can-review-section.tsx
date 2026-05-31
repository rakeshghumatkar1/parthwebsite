import Link from "next/link";
import type { ComponentType } from "react";
import { Section } from "@/components/ui/section";
import { FeatureCard } from "@/components/ui/feature-card";
import {
  IconBranch,
  IconDashboard,
  IconDocumentation,
  IconTerminal,
} from "@/components/ui/icons";
import { homeReviewTrailCards } from "@/lib/home-data";

const trailIcons: ComponentType<{ className?: string }>[] = [
  IconBranch,
  IconTerminal,
  IconDocumentation,
  IconDashboard,
];

export function WorkYouCanReviewSection() {
  return (
    <Section
      id="work-you-can-review"
      tone="light"
      dense
      className="border-b border-slate-100/80"
    >
      <div className="overflow-hidden rounded-lg border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-100/80">
        <div className="h-0.5 bg-gradient-to-r from-tb-blue via-tb-cyan/80 to-transparent" aria-hidden />
        <div className="grid gap-3 p-3.5 sm:p-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-3.5">
          <div className="max-w-sm lg:pr-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tb-blue">
              Work You Can Review
            </p>
            <h2 className="mt-1.5 text-balance text-xl font-semibold leading-[1.15] tracking-tight text-tb-text sm:text-2xl">
              Visible work you can review.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-tb-text-muted">
              Current Work and Early Work projects bring together code, documentation,
              system context, and project links in one place.
            </p>
            <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1">
              <Link
                href="/projects"
                className="text-sm font-medium text-tb-blue hover:underline"
              >
                View current projects
              </Link>
              <Link
                href="/projects/early-work"
                className="text-sm font-medium text-tb-text-muted hover:text-tb-blue hover:underline"
              >
                View early work
              </Link>
            </div>
          </div>

          <div className="grid gap-1.5 rounded-md border border-slate-100 bg-slate-50/50 p-1.5 sm:grid-cols-2 sm:gap-2 sm:p-2">
            {homeReviewTrailCards.map((card, index) => {
              const Icon = trailIcons[index % trailIcons.length];
              return (
                <FeatureCard
                  key={card.id}
                  title={card.title}
                  description={card.description}
                  icon={<Icon className="h-3.5 w-3.5" />}
                  variant="default"
                  compact
                />
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
