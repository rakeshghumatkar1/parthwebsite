import { ProjectCard } from "@/components/projects/project-card";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { PublicProject } from "@/lib/public/projects";

type AboutFeaturedProjectsSectionProps = {
  projects: PublicProject[];
};

export function AboutFeaturedProjectsSection({
  projects,
}: AboutFeaturedProjectsSectionProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <Section tone="dark">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          eyebrow="Current Project Evidence"
          title="Current systems you can review."
          dark
          className="mb-0 lg:max-w-2xl"
        />
        <Button href="/projects" variant="secondary" dark size="lg" className="shrink-0">
          View Project Portfolio
        </Button>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} dark />
        ))}
      </div>
    </Section>
  );
}
