import Link from "next/link";
import { EarlyWorkCardThumbnail } from "@/components/projects/early-work-card-thumbnail";
import { IconArrowRight } from "@/components/ui/icons";
import {
  buildEarlyWorkCardMeta,
  EARLY_WORK_VISIBLE_TAG_LIMIT,
} from "@/lib/public/early-work-card";
import type { PublicProject } from "@/lib/public/projects";

type EarlyWorkProjectCardProps = {
  project: PublicProject;
};

export function EarlyWorkProjectCard({ project }: EarlyWorkProjectCardProps) {
  const meta = buildEarlyWorkCardMeta(project);
  const visibleTags = project.techStack.slice(0, EARLY_WORK_VISIBLE_TAG_LIMIT);
  const extraTagCount = project.techStack.length - visibleTags.length;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm transition-colors hover:border-tb-blue/30 hover:shadow-md">
      <Link href={`/projects/${project.slug}`} className="group flex flex-1 flex-col">
        <EarlyWorkCardThumbnail project={project} />

        <div className="flex flex-1 flex-col p-4">
          {meta ? (
            <p className="text-[11px] font-medium tracking-wide text-tb-text-muted">
              {meta}
            </p>
          ) : null}

          <h3
            className={`line-clamp-2 text-base font-semibold leading-snug text-tb-text group-hover:text-tb-blue sm:text-[1.05rem] ${meta ? "mt-2" : ""}`}
          >
            {project.title}
          </h3>

          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-tb-text-muted">
            {project.shortDescription}
          </p>

          {visibleTags.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {visibleTags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-slate-200/90 bg-slate-50 px-2 py-0.5 text-[10px] font-medium leading-snug text-tb-text-muted"
                >
                  {tag}
                </li>
              ))}
              {extraTagCount > 0 ? (
                <li className="rounded-full border border-slate-200/90 bg-white px-2 py-0.5 text-[10px] font-medium leading-snug text-tb-text-muted">
                  +{extraTagCount} more
                </li>
              ) : null}
            </ul>
          ) : null}

          <p className="mt-auto flex items-center gap-1 pt-4 text-sm font-medium text-tb-blue group-hover:underline">
            View project
            <IconArrowRight className="h-3.5 w-3.5" />
          </p>
        </div>
      </Link>
    </article>
  );
}
