import Link from "next/link";
import { ProjectCoverImage } from "@/components/projects/project-cover-image";
import type { PublicProject } from "@/lib/public/projects";
import {
  projectStatusLabel,
  projectTypeLabel,
} from "@/lib/public/projects";

type BuildJourneyEarlyWorkCardProps = {
  project: PublicProject;
};

export function BuildJourneyEarlyWorkCard({
  project,
}: BuildJourneyEarlyWorkCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col rounded-lg border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-100 transition-colors hover:border-tb-blue/30 hover:ring-tb-blue/10"
    >
      {project.coverImageUrl ? (
        <div className="border-b border-slate-200/80 p-2.5">
          <ProjectCoverImage
            src={project.coverImageUrl}
            alt={project.coverImageAlt || `${project.title} cover image`}
            fit={project.coverImageFit}
            position={project.coverImagePosition}
            className="!aspect-[16/9]"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium">
          <span className="rounded-full bg-tb-surface-muted px-2 py-0.5 text-tb-text-muted">
            {projectTypeLabel(project.projectType)}
          </span>
          <span className="rounded-full border border-slate-200 px-2 py-0.5 text-tb-text-muted">
            {projectStatusLabel(project.status)}
          </span>
        </div>
        <h3 className="mt-2.5 text-base font-semibold text-tb-text group-hover:text-tb-blue sm:text-lg">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-tb-text-muted">
          {project.shortDescription}
        </p>
        <p className="mt-3 text-xs font-medium text-tb-blue group-hover:underline">
          View project
        </p>
      </div>
    </Link>
  );
}
