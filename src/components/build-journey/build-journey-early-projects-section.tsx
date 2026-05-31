import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { IconCheck, IconLayers, IconSystems } from "@/components/ui/icons";
import {
  BUILD_JOURNEY_EARLY_PROJECTS,
  BUILD_JOURNEY_EXPERIMENTS,
} from "@/lib/build-journey-page-content";

const projectIcons = [IconSystems, IconLayers];

export function BuildJourneyEarlyProjectsSection() {
  return (
    <Section tone="light">
      <SectionHeader
        eyebrow="Notable Early Projects"
        title="These were not just coding exercises. They were working systems."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {BUILD_JOURNEY_EARLY_PROJECTS.map((project, index) => {
          const Icon = projectIcons[index] ?? IconSystems;
          return (
            <article
              key={project.title}
              className="flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-100"
            >
              <div className="flex items-center justify-center border-b border-slate-200/80 bg-gradient-to-br from-tb-surface-muted to-white px-6 py-10">
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-tb-blue/10 text-tb-blue ring-1 ring-tb-blue/20">
                    <Icon className="h-8 w-8" />
                  </div>
                  <p className="text-xs font-medium uppercase tracking-wide text-tb-text-muted">
                    Icon / diagram treatment
                  </p>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="text-xl font-semibold text-tb-text">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-tb-text-muted sm:text-base">
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

      <div className="mt-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-tb-text-muted">
          Other Early Experiments
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {BUILD_JOURNEY_EXPERIMENTS.map((item) => (
            <span
              key={item}
              className="rounded-full border border-slate-200/90 bg-white px-4 py-2 text-sm font-medium text-tb-text shadow-sm ring-1 ring-slate-100"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
