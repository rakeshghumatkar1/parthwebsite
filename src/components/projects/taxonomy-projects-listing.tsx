import Link from "next/link";
import { PublicEmptyState } from "@/components/public/empty-state";
import { ProjectCard } from "@/components/projects/project-card";
import type { PublicProject } from "@/lib/public/projects";

type TaxonomyProjectsListingProps = {
  projects: PublicProject[];
  emptyMessage: string;
};

function ProjectGrid({ projects }: { projects: PublicProject[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

export function TaxonomyProjectsListing({
  projects,
  emptyMessage,
}: TaxonomyProjectsListingProps) {
  if (projects.length === 0) {
    return <PublicEmptyState className="mt-10" message={emptyMessage} />;
  }

  const currentWork = projects.filter(
    (project) => project.projectPhase === "current_work",
  );
  const earlyWork = projects.filter(
    (project) => project.projectPhase === "early_work",
  );
  const showPhaseGroups = currentWork.length > 0 && earlyWork.length > 0;

  if (!showPhaseGroups) {
    return (
      <div className="mt-10">
        <ProjectGrid projects={projects} />
      </div>
    );
  }

  return (
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="text-xl font-semibold text-tb-text">Current Work</h2>
        <div className="mt-6">
          <ProjectGrid projects={currentWork} />
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-tb-text">Early Work</h2>
        <div className="mt-6">
          <ProjectGrid projects={earlyWork} />
        </div>
      </section>
    </div>
  );
}

export function TaxonomyProjectsNav() {
  return (
    <div className="mb-10 flex flex-wrap gap-4 sm:mb-12">
      <Link
        href="/projects"
        className="text-sm font-medium text-tb-blue hover:underline"
      >
        View Current Projects
      </Link>
      <Link
        href="/projects/early-work"
        className="text-sm font-medium text-tb-blue hover:underline"
      >
        View Early Work
      </Link>
    </div>
  );
}
