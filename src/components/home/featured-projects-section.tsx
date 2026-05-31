import Link from "next/link";
import type { ProjectRecord } from "@/types/cms";
import { SectionHeader } from "@/components/ui/section-header";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import {
  IconAutomation,
  IconChip,
  IconDashboard,
  IconPipeline,
  IconTerminal,
  IconWorkflow,
} from "@/components/ui/icons";

type SelectedProjectBuildsSectionProps = {
  projects: ProjectRecord[];
  showDetailLinks?: boolean;
};

const projectIcons = [
  IconTerminal,
  IconDashboard,
  IconChip,
  IconAutomation,
  IconPipeline,
  IconWorkflow,
];

function ProjectCard({
  project,
  index,
  showDetailLinks,
  className = "",
}: {
  project: ProjectRecord;
  index: number;
  showDetailLinks: boolean;
  className?: string;
}) {
  const Icon = projectIcons[index % projectIcons.length];

  return (
    <article
      className={`flex min-h-[132px] flex-col rounded-lg border border-tb-navy-border/80 bg-tb-navy-elevated/90 p-3.5 transition-colors hover:border-tb-cyan/20 sm:p-4 ${className}`}
    >
      <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-md border border-tb-navy-border bg-tb-navy/70 text-tb-cyan">
        <Icon className="h-3.5 w-3.5" />
      </div>
      <h3 className="text-base font-semibold leading-snug text-white">
        {project.title}
      </h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-tb-text-on-dark-muted">
        {project.shortDescription}
      </p>
      {project.techStack.length > 0 ? (
        <ul className="mt-2 flex flex-wrap gap-1">
          {project.techStack.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-tb-navy-border bg-tb-navy/60 px-1.5 py-px text-[10px] font-medium text-tb-text-on-dark sm:text-[11px]"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
      {showDetailLinks ? (
        <div className="mt-2">
          <Link
            href={`/projects/${project.slug}`}
            className="text-sm font-medium text-tb-cyan hover:underline"
          >
            View project
          </Link>
        </div>
      ) : null}
    </article>
  );
}

function FeaturedAside() {
  return (
    <aside className="flex flex-1 flex-col justify-center rounded-lg border border-tb-navy-border/70 bg-tb-navy/50 p-3.5 sm:p-4">
      <p className="text-sm leading-relaxed text-tb-text-on-dark-muted">
        Featured projects highlight current and early builds with code, documentation,
        and project links. Explore the full Current Work and Early Work listings
        for the complete published record.
      </p>
      <div className="mt-2.5 flex flex-wrap gap-3">
        <Link
          href="/projects"
          className="text-sm font-medium text-tb-cyan hover:underline"
        >
          View all current projects
        </Link>
        <Link
          href="/projects/early-work"
          className="text-sm font-medium text-tb-text-on-dark-muted hover:text-tb-cyan hover:underline"
        >
          View early work
        </Link>
      </div>
    </aside>
  );
}

/**
 * Featured projects — CMS featured projects with static fallback on Home.
 */
export function FeaturedProjectsSection({
  projects,
  showDetailLinks = false,
}: SelectedProjectBuildsSectionProps) {
  if (projects.length === 0) {
    return null;
  }

  const isLowCount = projects.length <= 2;
  const isSingle = projects.length === 1;

  return (
    <Section
      id="selected-project-builds"
      tone="dark"
      dense
      className="relative overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(56,189,248,0.08),transparent)]"
        aria-hidden
      />
      <div className="relative">
        <SectionHeader
          dense
          dark
          eyebrow="Featured Projects"
          title="Real projects. Real code. Real systems you can explore."
          description={
            isLowCount
              ? "Featured builds from Current Work and Early Work — with more published projects available on the projects pages."
              : "Selected builds from Current Work and Early Work — each with its own project page for context, links, and technical detail."
          }
        />

        {isLowCount ? (
          <div
            className={
              isSingle
                ? "flex flex-col gap-2.5 sm:flex-row sm:items-stretch sm:gap-3"
                : "grid gap-2.5 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:items-stretch lg:gap-3"
            }
          >
            <div
              className={
                isSingle
                  ? "w-full sm:max-w-[17rem] sm:shrink-0"
                  : projects.length === 2
                    ? "grid gap-2.5"
                    : ""
              }
            >
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  showDetailLinks={showDetailLinks}
                />
              ))}
            </div>
            <FeaturedAside />
          </div>
        ) : (
          <div className="grid auto-rows-fr gap-2.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                showDetailLinks={showDetailLinks}
              />
            ))}
          </div>
        )}

        <div className="mt-3.5 flex flex-wrap gap-3">
          <Button href="/projects" variant="secondary" dark size="lg">
            Explore current projects
          </Button>
          <Button href="/projects/early-work" variant="ghost" dark>
            View early work
          </Button>
        </div>
      </div>
    </Section>
  );
}
