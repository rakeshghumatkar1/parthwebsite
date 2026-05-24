import type { ProjectRecord } from "@/types/cms";
import { SectionHeader } from "@/components/ui/section-header";
import { Section } from "@/components/ui/section";

type FeaturedProjectsSectionProps = {
  projects: ProjectRecord[];
};

/**
 * CMS-ready: renders only when published featured projects exist.
 * Phase 1–2: empty array → section hidden on public page.
 */
export function FeaturedProjectsSection({
  projects,
}: FeaturedProjectsSectionProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <Section id="featured-projects" tone="dark">
      <SectionHeader
        dark
        eyebrow="Featured Project Evidence"
        title="Real projects. Real code. Real systems you can explore."
        description="The current portfolio shows how the work has moved from early experiments into software systems. Featured projects appear here from the project CMS, with links to GitHub, demos, screenshots, videos, or project notes where available."
      />
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
    </Section>
  );
}
