import { EarlyWorkProjectCard } from "@/components/projects/early-work-project-card";
import type { PublicProject } from "@/lib/public/projects";

type EarlyWorkProjectGridProps = {
  projects: PublicProject[];
  archiveTotal: number;
  hasActiveSearch: boolean;
};

function buildGridCountLabel(
  filteredTotal: number,
  archiveTotal: number,
  hasActiveSearch: boolean,
): string {
  const projectLabel = archiveTotal === 1 ? "project" : "projects";

  if (hasActiveSearch) {
    return `Showing ${filteredTotal} of ${archiveTotal} ${projectLabel}`;
  }

  return `Showing all ${archiveTotal} ${projectLabel}`;
}

export function EarlyWorkProjectGrid({
  projects,
  archiveTotal,
  hasActiveSearch,
}: EarlyWorkProjectGridProps) {
  const filteredTotal = projects.length;

  return (
    <div>
      <p className="text-sm text-tb-text-muted">
        {buildGridCountLabel(filteredTotal, archiveTotal, hasActiveSearch)}
      </p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <EarlyWorkProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
