"use client";

import { useState } from "react";
import { EarlyWorkProjectCard } from "@/components/projects/early-work-project-card";
import type { PublicProject } from "@/lib/public/projects";

const BATCH_SIZE = 12;

type EarlyWorkProjectGridProps = {
  projects: PublicProject[];
  archiveTotal: number;
};

export function EarlyWorkProjectGrid({
  projects,
  archiveTotal,
}: EarlyWorkProjectGridProps) {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const filteredTotal = projects.length;
  const shownCount = Math.min(visibleCount, filteredTotal);
  const hasMore = visibleCount < filteredTotal;
  const visibleProjects = projects.slice(0, visibleCount);

  return (
    <div>
      <p className="text-sm text-tb-text-muted">
        Showing {shownCount} of {archiveTotal} projects
      </p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project) => (
          <EarlyWorkProjectCard key={project.id} project={project} />
        ))}
      </div>

      {hasMore ? (
        <div className="mt-8 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() =>
              setVisibleCount((count) =>
                Math.min(count + BATCH_SIZE, filteredTotal),
              )
            }
            className="rounded-full border border-slate-300 bg-white px-6 py-2.5 text-sm font-medium text-tb-text transition hover:border-tb-blue/30 hover:bg-tb-surface-muted"
          >
            Load more early projects
          </button>
        </div>
      ) : filteredTotal > BATCH_SIZE ? (
        <p className="mt-8 text-center text-sm text-tb-text-muted">
          All projects shown
        </p>
      ) : null}
    </div>
  );
}
