import Link from "next/link";
import type { ProjectRecord } from "@/types/cms";
import { SectionHeader } from "@/components/ui/section-header";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

type SelectedProjectBuildsSectionProps = {
  projects: ProjectRecord[];
  showDetailLinks?: boolean;
};

/**
 * Selected Project Builds — CMS featured projects with static fallback on Home.
 */
export function FeaturedProjectsSection({
  projects,
  showDetailLinks = false,
}: SelectedProjectBuildsSectionProps) {
  if (projects.length === 0) {
    return null;
  }

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
          eyebrow="Selected Project Builds"
          title="Working applications, project notes, repositories, and demos in one place."
          description="Featured projects show how the work moves from idea to system: the problem, the software approach, the AI or automation layer where relevant, and the material available for review."
        />
        <p className="-mt-5 mb-8 max-w-3xl text-sm leading-relaxed text-tb-text-on-dark-muted">
          Some projects may include live links, GitHub repositories, screenshots,
          videos, downloads, or build notes. Some may be shown in limited form
          where code, data, or client context cannot be shared.
        </p>

        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {projects.map((project) => (
            <article
              key={project.id}
              className="flex min-h-[180px] flex-col rounded-xl border border-tb-navy-border/80 bg-tb-navy-elevated/90 p-5 shadow-lg shadow-black/15 transition-colors hover:border-tb-cyan/20 sm:p-6"
            >
              <div
                className="mb-4 h-1 w-10 rounded-full bg-gradient-to-r from-tb-blue to-tb-cyan"
                aria-hidden
              />
              <h3 className="text-lg font-semibold leading-snug text-white sm:text-xl">
                {project.title}
              </h3>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-tb-text-on-dark-muted">
                {project.shortDescription}
              </p>
              {project.techStack.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {project.techStack.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-tb-navy-border bg-tb-navy/60 px-3 py-1 text-xs font-medium text-tb-text-on-dark sm:text-sm"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}
              {showDetailLinks ? (
                <div className="mt-4">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-sm font-medium text-tb-cyan hover:underline"
                  >
                    View project
                  </Link>
                </div>
              ) : null}
            </article>
          ))}
        </div>

        <div className="mt-8">
          <Button href="/projects" variant="secondary" dark size="lg">
            Explore All Projects
          </Button>
        </div>
      </div>
    </Section>
  );
}
