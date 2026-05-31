import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import {
  IconAutomation,
  IconChip,
  IconDashboard,
  IconPipeline,
  IconTerminal,
  IconWorkflow,
} from "@/components/ui/icons";
import type { PublicProject } from "@/lib/public/projects";

type AboutFeaturedProjectsSectionProps = {
  projects: PublicProject[];
};

const projectIcons = [
  IconTerminal,
  IconDashboard,
  IconChip,
  IconAutomation,
  IconPipeline,
  IconWorkflow,
];

function FeaturedAside() {
  return (
    <aside className="flex flex-col justify-center rounded-lg border border-tb-navy-border/70 bg-tb-navy/50 p-3.5 sm:p-4">
      <p className="text-sm leading-relaxed text-tb-text-on-dark-muted">
        Featured current-work projects from the portfolio. Early builds are
        listed separately under Early Work — explore both for the full build
        record.
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

function CompactProjectCard({
  project,
  index,
  wide = false,
}: {
  project: PublicProject;
  index: number;
  wide?: boolean;
}) {
  const Icon = projectIcons[index % projectIcons.length];

  return (
    <article
      className={`rounded-lg border border-tb-navy-border/80 bg-tb-navy-elevated/90 transition-colors hover:border-tb-cyan/20 ${
        wide
          ? "flex flex-col gap-3 p-3.5 sm:flex-row sm:items-start sm:gap-4 sm:p-4"
          : "flex min-h-0 flex-col p-3.5 sm:p-4"
      }`}
    >
      <div
        className={`flex shrink-0 items-center justify-center rounded-md border border-tb-navy-border bg-tb-navy/70 text-tb-cyan ${
          wide ? "h-10 w-10" : "mb-2 h-7 w-7"
        }`}
      >
        <Icon className={wide ? "h-4 w-4" : "h-3.5 w-3.5"} />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-semibold leading-snug text-white">
          {project.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-tb-text-on-dark-muted">
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
        <div className="mt-2.5">
          <Link
            href={`/projects/${project.slug}`}
            className="text-sm font-medium text-tb-cyan hover:underline"
          >
            View project
          </Link>
        </div>
      </div>
    </article>
  );
}

export function AboutFeaturedProjectsSection({
  projects,
}: AboutFeaturedProjectsSectionProps) {
  if (projects.length === 0) {
    return null;
  }

  const isLowCount = projects.length <= 2;
  const isSingle = projects.length === 1;

  return (
    <Section tone="dark" dense className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(56,189,248,0.08),transparent)]"
        aria-hidden
      />
      <div className="relative">
        <SectionHeader
          dense
          dark
          eyebrow="Current Project Work"
          title="Current systems you can review."
          description={
            isLowCount
              ? "Featured current-work projects from the portfolio — with more published projects on the projects pages."
              : "Featured current-work projects from the portfolio. Early builds are listed separately under Early Work."
          }
        />

        {isLowCount ? (
          <div className="grid gap-2.5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-stretch lg:gap-3">
            {isSingle ? (
              <CompactProjectCard project={projects[0]} index={0} wide />
            ) : (
              <div className="grid gap-2.5 sm:grid-cols-2">
                {projects.map((project, index) => (
                  <CompactProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            )}
            <FeaturedAside />
          </div>
        ) : (
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3">
            {projects.map((project, index) => (
              <CompactProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        )}

        <div className="mt-3.5">
          <Button href="/projects" variant="secondary" dark size="lg">
            View Current Projects
          </Button>
        </div>
      </div>
    </Section>
  );
}
