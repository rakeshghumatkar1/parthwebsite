import Link from "next/link";
import type { ComponentType } from "react";
import { FeatureCard } from "@/components/ui/feature-card";
import {
  IconBranch,
  IconDocumentation,
  IconLayers,
  IconTerminal,
  IconWorkflow,
} from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { ABOUT_WORK_TRAIL } from "@/lib/about-page-content";

const trailIcons: ComponentType<{ className?: string }>[] = [
  IconTerminal,
  IconDocumentation,
  IconBranch,
  IconLayers,
  IconWorkflow,
];

export function AboutProofTrailSection() {
  return (
    <Section tone="light" dense className="border-b border-slate-100/80">
      <div className="overflow-hidden rounded-lg border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-100/80">
        <div className="h-0.5 bg-gradient-to-r from-tb-blue via-tb-cyan/80 to-transparent" aria-hidden />
        <div className="p-3.5 sm:p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tb-blue">
            Visible Work
          </p>
          <h2 className="mt-1.5 text-balance text-xl font-semibold leading-snug tracking-tight text-tb-text sm:text-2xl">
            The story matters. The work matters more.
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-tb-text-muted">
            Work records visitors can review across current projects, build
            documentation, repositories, and early work.
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

          <div className="mt-3 grid gap-1.5 rounded-md border border-slate-100 bg-slate-50/50 p-1.5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-2 lg:p-2">
            {ABOUT_WORK_TRAIL.map((item, index) => {
              const Icon = trailIcons[index] ?? IconTerminal;
              return (
                <FeatureCard
                  key={item.title}
                  title={item.title}
                  description={item.description}
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
