import Link from "next/link";
import type { PublicProject } from "@/lib/public/projects";
import {
  projectHasLinks,
  projectStatusLabel,
  projectTypeLabel,
} from "@/lib/public/projects";

type ProjectLinksPanelProps = {
  project: PublicProject;
};

export function ProjectLinksPanel({ project }: ProjectLinksPanelProps) {
  if (!projectHasLinks(project)) {
    return null;
  }

  const links = [
    { label: "GitHub", href: project.githubUrl },
    { label: "Live demo", href: project.demoUrl },
    { label: "Video", href: project.videoUrl },
    { label: "PDF download", href: project.pdfDownloadUrl },
  ].filter((link): link is { label: string; href: string } => Boolean(link.href));

  return (
    <aside className="rounded-2xl border border-slate-200 bg-tb-surface-muted p-6">
      <h2 className="text-lg font-semibold text-tb-text">Project links</h2>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-tb-blue hover:underline"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

type ProjectDetailSectionProps = {
  title: string;
  children: React.ReactNode;
};

export function ProjectDetailSection({
  title,
  children,
}: ProjectDetailSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-tb-text">{title}</h2>
      <div className="mt-4 text-sm leading-relaxed text-tb-text-muted sm:text-base">
        {children}
      </div>
    </section>
  );
}

export function ProjectDetailHeader({ project }: { project: PublicProject }) {
  const isEarlyWork = project.projectPhase === "early_work";
  const backHref = isEarlyWork ? "/projects/early-work" : "/projects";
  const backLabel = isEarlyWork ? "Back to early work" : "Back to current projects";

  return (
    <div className="space-y-6">
      <Link
        href={backHref}
        className="inline-flex text-sm font-medium text-tb-blue hover:underline"
      >
        ← {backLabel}
      </Link>
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-tb-surface-muted px-3 py-1 text-xs font-medium text-tb-text-muted">
          {projectTypeLabel(project.projectType)}
        </span>
        <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-tb-text-muted">
          {projectStatusLabel(project.status)}
        </span>
      </div>
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-tb-text sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-tb-text-muted sm:text-lg">
          {project.shortDescription}
        </p>
      </div>
      {project.techStack.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {project.techStack.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-slate-200 bg-tb-surface-muted px-3 py-1 text-xs font-medium text-tb-text sm:text-sm"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
