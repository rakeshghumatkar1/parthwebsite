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
    <Section id="selected-project-builds" tone="dark">
      <SectionHeader
        dark
        eyebrow="Selected Project Builds"
        title="Working applications, project notes, repositories, and demos in one place."
        description="Featured projects show how the work moves from idea to system: the problem, the software approach, the AI or automation layer where relevant, and the material available for review."
      />
      <p className="-mt-6 mb-10 max-w-3xl text-sm leading-relaxed text-tb-text-on-dark-muted sm:text-base">
        Some projects may include live links, GitHub repositories, screenshots,
        videos, downloads, or build notes. Some may be shown in limited form
        where code, data, or client context cannot be shared.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.id}
            className="rounded-xl border border-tb-navy-border bg-tb-navy-elevated p-6"
          >
            <h3 className="text-lg font-semibold text-white">{project.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-tb-text-on-dark-muted">
              {project.shortDescription}
            </p>
            {project.techStack.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-tb-navy-border px-2.5 py-0.5 text-xs text-tb-text-on-dark-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>

      <div className="mt-10">
        <Button href="#selected-project-builds" variant="secondary" dark>
          Explore All Projects
        </Button>
      </div>
    </Section>
  );
}
