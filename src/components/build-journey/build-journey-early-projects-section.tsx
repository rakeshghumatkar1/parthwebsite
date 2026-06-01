import Link from "next/link";
import { Section } from "@/components/ui/section";
import { IconArrowRight, IconAutomation, IconCheck, IconSystems } from "@/components/ui/icons";
import {
  BUILD_JOURNEY_EARLY_PROJECTS,
  BUILD_JOURNEY_EARLY_PROJECTS_INTRO,
  BUILD_JOURNEY_EXPERIMENTS,
} from "@/lib/build-journey-page-content";

const projectIcons = [IconAutomation, IconSystems];

export function BuildJourneyEarlyProjectsSection() {
  return (
    <Section tone="light" dense>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tb-blue">
          Selected Early Builds
        </p>
        <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-tb-text sm:text-2xl">
          Early builds that became working examples.
        </h2>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-tb-text-muted">
          {BUILD_JOURNEY_EARLY_PROJECTS_INTRO}
        </p>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        {BUILD_JOURNEY_EARLY_PROJECTS.map((project, index) => {
          const Icon = projectIcons[index] ?? IconSystems;
          return (
            <article
              key={project.title}
              className="flex h-full flex-col rounded-lg border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-100"
            >
              <div className="flex items-center gap-3 border-b border-slate-200/80 bg-gradient-to-r from-tb-surface-muted/80 to-white px-3.5 py-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-tb-blue/20 bg-tb-blue/10 text-tb-blue">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="text-base font-semibold text-tb-text sm:text-lg">
                  {project.title}
                </h3>
              </div>
              <div className="flex flex-1 flex-col p-3.5 sm:p-4">
                <p className="text-sm leading-relaxed text-tb-text-muted">
                  {project.description}
                </p>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-tb-blue">
                  What it shows
                </p>
                <ul className="mt-1.5 grid gap-1 sm:grid-cols-2">
                  {project.shows.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-1.5 text-xs text-tb-text-muted sm:text-sm"
                    >
                      <IconCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-tb-blue" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-3 rounded-md border border-slate-200/80 bg-slate-50/50 px-3 py-2.5">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-tb-text-muted">
          Other early experiments
        </p>
        <ul className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-3">
          {BUILD_JOURNEY_EXPERIMENTS.map((item) => (
            <li
              key={item}
              className="rounded-md border border-slate-200/90 bg-white px-2.5 py-1.5 text-xs font-medium leading-snug text-tb-text"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-2.5">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-tb-blue hover:underline"
        >
          View Current Projects
          <IconArrowRight className="h-3.5 w-3.5" />
        </Link>
      </p>
    </Section>
  );
}
