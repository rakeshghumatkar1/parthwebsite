import type { ProjectRecord } from "@/types/cms";
import { SectionHeader } from "@/components/ui/section-header";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

type SelectedProjectBuildsSectionProps = {
  projects: ProjectRecord[];
};

/**
 * Selected Project Builds — static launch data now; replace with Projects CMS later.
 */
export function FeaturedProjectsSection({
  projects,
}: SelectedProjectBuildsSectionProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <Section
      id="selected-project-builds"
      tone="dark"
      className="relative overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(56,189,248,0.08),transparent)]"
        aria-hidden
      />
      <div className="relative">
        <SectionHeader
          dark
          eyebrow="Selected Project Builds"
          title="Working applications, project notes, repositories, and demos in one place."
          description="Featured projects show how the work moves from idea to system: the problem, the software approach, the AI or automation layer where relevant, and the material available for review."
        />
        <p className="-mt-8 mb-12 max-w-3xl text-base leading-relaxed text-tb-text-on-dark-muted">
          Some projects may include live links, GitHub repositories, screenshots,
          videos, downloads, or build notes. Some may be shown in limited form
          where code, data, or client context cannot be shared.
        </p>

        <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {projects.map((project) => (
            <article
              key={project.id}
              className="flex min-h-[200px] flex-col rounded-2xl border border-tb-navy-border/80 bg-tb-navy-elevated/90 p-7 shadow-lg shadow-black/15 transition-colors hover:border-tb-cyan/20 sm:p-8"
            >
              <div
                className="mb-5 h-1 w-12 rounded-full bg-gradient-to-r from-tb-blue to-tb-cyan"
                aria-hidden
              />
              <h3 className="text-xl font-semibold leading-snug text-white">
                {project.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-tb-text-on-dark-muted sm:text-base">
                {project.shortDescription}
              </p>
              {project.techStack.length > 0 ? (
                <ul className="mt-6 flex flex-wrap gap-2">
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
            </article>
          ))}
        </div>

        <div className="mt-12">
          <Button href="#selected-project-builds" variant="secondary" dark size="lg">
            Explore All Projects
          </Button>
        </div>
      </div>
    </Section>
  );
}
