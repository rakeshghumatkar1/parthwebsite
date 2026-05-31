import Link from "next/link";
import type { PublicProject } from "@/lib/public/projects";
import {
  industryLabel,
  projectHasLinks,
  projectStatusLabel,
  projectTypeLabel,
} from "@/lib/public/projects";
import { domainLabels } from "@/lib/projects/taxonomy";

type ProjectCardProps = {
  project: PublicProject;
  dark?: boolean;
};

export function ProjectCard({ project, dark = false }: ProjectCardProps) {
  const border = dark
    ? "border-tb-navy-border/80 bg-tb-navy-elevated/90 hover:border-tb-cyan/20"
    : "border-slate-200 bg-white hover:border-tb-blue/30 shadow-sm";

  const mutedText = dark ? "text-tb-text-on-dark-muted" : "text-tb-text-muted";
  const domainLabelList = domainLabels(project.domains);
  const visibleDomains = domainLabelList.slice(0, 2);
  const extraDomainCount = domainLabelList.length - visibleDomains.length;
  const domainsText =
    visibleDomains.length === 0
      ? "—"
      : extraDomainCount > 0
        ? `${visibleDomains.join(", ")} +${extraDomainCount}`
        : visibleDomains.join(", ");

  return (
    <article
      className={`flex min-h-[200px] flex-col rounded-2xl border p-7 transition-colors sm:p-8 ${border}`}
    >
      <div
        className={`mb-5 h-1 w-12 rounded-full bg-gradient-to-r from-tb-blue to-tb-cyan`}
        aria-hidden
      />
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
        <span
          className={
            dark
              ? "rounded-full border border-tb-navy-border bg-tb-navy/60 px-2.5 py-0.5 text-tb-text-on-dark-muted"
              : "rounded-full bg-tb-surface-muted px-2.5 py-0.5 text-tb-text-muted"
          }
        >
          {projectTypeLabel(project.projectType)}
        </span>
        <span
          className={
            dark
              ? "rounded-full border border-tb-navy-border bg-tb-navy/60 px-2.5 py-0.5 text-tb-text-on-dark-muted"
              : "rounded-full border border-slate-200 px-2.5 py-0.5 text-tb-text-muted"
          }
        >
          {projectStatusLabel(project.status)}
        </span>
      </div>
      <h3
        className={`mt-4 text-xl font-semibold leading-snug ${dark ? "text-white" : "text-tb-text"}`}
      >
        {project.title}
      </h3>
      <p
        className={`mt-3 flex-1 text-sm leading-relaxed sm:text-base ${mutedText}`}
      >
        {project.shortDescription}
      </p>
      <div className={`mt-4 space-y-1.5 text-xs leading-relaxed ${mutedText}`}>
        <p>
          <span className={`font-medium ${dark ? "text-tb-text-on-dark" : "text-tb-text"}`}>
            Industry:
          </span>{" "}
          {industryLabel(project.industry)}
        </p>
        <p className="break-words">
          <span className={`font-medium ${dark ? "text-tb-text-on-dark" : "text-tb-text"}`}>
            Domains:
          </span>{" "}
          {domainsText}
        </p>
      </div>
      {project.techStack.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tag) => (
            <li
              key={tag}
              className={
                dark
                  ? "rounded-full border border-tb-navy-border bg-tb-navy/60 px-3 py-1 text-xs font-medium text-tb-text-on-dark sm:text-sm"
                  : "rounded-full border border-slate-200 bg-tb-surface-muted px-3 py-1 text-xs font-medium text-tb-text sm:text-sm"
              }
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Link
          href={`/projects/${project.slug}`}
          className="text-sm font-medium text-tb-blue hover:underline"
        >
          View project
        </Link>
        {projectHasLinks(project) ? (
          <span className={`text-xs ${dark ? "text-tb-text-on-dark-muted" : "text-tb-text-muted"}`}>
            Links available on detail page
          </span>
        ) : null}
      </div>
    </article>
  );
}
