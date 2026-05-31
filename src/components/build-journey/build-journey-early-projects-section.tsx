import Link from "next/link";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { IconCheck, IconLayers, IconSystems } from "@/components/ui/icons";
import {
  BUILD_JOURNEY_EARLY_PROJECTS,
  BUILD_JOURNEY_EARLY_PROJECTS_INTRO,
  BUILD_JOURNEY_EXPERIMENTS,
} from "@/lib/build-journey-page-content";

const projectIcons = [IconSystems, IconLayers];

export function BuildJourneyEarlyProjectsSection() {
  return (
    <Section tone="light">
      <SectionHeader
        eyebrow="Selected Early Builds"
        title="Early builds that shaped the foundation."
        description={BUILD_JOURNEY_EARLY_PROJECTS_INTRO}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {BUILD_JOURNEY_EARLY_PROJECTS.map((project, index) => {
          const Icon = projectIcons[index] ?? IconSystems;
          return (
            <article
              key={project.title}
              className="flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-100"
            >
              <div className="flex items-center justify-center border-b border-slate-200/80 bg-gradient-to-br from-tb-surface-muted to-white px-6 py-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-tb-blue/10 text-tb-blue ring-1 ring-tb-blue/20">
                  <Icon className="h-7 w-7" />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="text-xl font-semibold text-tb-text">{project.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-tb-text-muted sm:text-base">
                  {project.description}
                </p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-tb-blue">
                  What it shows
                </p>
                <ul className="mt-3 space-y-2">
                  {project.shows.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-tb-text-muted"
                    >
                      <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-tb-blue" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-tb-text-muted">
          Other early experiments
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {BUILD_JOURNEY_EXPERIMENTS.map((item) => (
            <span
              key={item}
              className="rounded-full border border-slate-200/90 bg-white px-3.5 py-1.5 text-sm font-medium text-tb-text shadow-sm ring-1 ring-slate-100"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Button href="/projects/early-work" variant="primary" size="lg">
          View Early Work
        </Button>
        <Link
          href="/projects"
          className="text-sm font-medium text-tb-blue hover:underline"
        >
          View Current Projects
        </Link>
      </div>
    </Section>
  );
}
