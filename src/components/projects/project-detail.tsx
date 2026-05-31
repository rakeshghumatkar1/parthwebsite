import Link from "next/link";
import type { PublicProject } from "@/lib/public/projects";
import {
  domainLabels,
  industryLabel,
  projectHasLinks,
  projectPhaseLabel,
  projectStatusLabel,
  projectTypeLabel,
} from "@/lib/public/projects";
import type { YouTubeEmbed } from "@/lib/public/youtube";

type ProjectLinksPanelProps = {
  project: PublicProject;
  youtubeEmbed?: YouTubeEmbed | null;
};

export function ProjectLinksPanel({ project, youtubeEmbed }: ProjectLinksPanelProps) {
  if (!projectHasLinks(project)) {
    return null;
  }

  const links = [
    { label: "GitHub", href: project.githubUrl },
    { label: "Live demo", href: project.demoUrl },
    ...(youtubeEmbed
      ? []
      : [{ label: "Video", href: project.videoUrl }]),
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

type ProjectContextRowProps = {
  label: string;
  children: React.ReactNode;
};

function ProjectContextRow({ label, children }: ProjectContextRowProps) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-tb-text-muted">
        {label}
      </dt>
      <dd className="mt-1.5 text-sm text-tb-text">{children}</dd>
    </div>
  );
}

function ProjectTagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) {
    return <span className="text-tb-text-muted">—</span>;
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="max-w-full rounded-full border border-slate-200 bg-tb-surface-muted px-3 py-1 text-xs font-medium text-tb-text break-words sm:text-sm"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

export function ProjectContextPanel({ project }: { project: PublicProject }) {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-tb-text">Project context</h2>
      <dl className="mt-4 space-y-4">
        <ProjectContextRow label="Phase">
          {projectPhaseLabel(project.projectPhase)}
        </ProjectContextRow>
        <ProjectContextRow label="Type">
          {projectTypeLabel(project.projectType)}
        </ProjectContextRow>
        <ProjectContextRow label="Status">
          {projectStatusLabel(project.status)}
        </ProjectContextRow>
        <ProjectContextRow label="Industry">
          {industryLabel(project.industry)}
        </ProjectContextRow>
        <ProjectContextRow label="Domains">
          <ProjectTagList tags={domainLabels(project.domains)} />
        </ProjectContextRow>
        <ProjectContextRow label="Tech stack">
          <ProjectTagList tags={project.techStack} />
        </ProjectContextRow>
      </dl>
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

type ProjectVideoEmbedProps = {
  project: PublicProject;
  embed: YouTubeEmbed;
};

export function ProjectVideoEmbed({ project, embed }: ProjectVideoEmbedProps) {
  const sectionTitle =
    project.projectPhase === "early_work" ? "Early project demo" : "Project video";
  const iframeTitle = `${project.title} video on YouTube`;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-tb-text">{sectionTitle}</h2>
      <p className="mt-2 text-sm leading-relaxed text-tb-text-muted sm:text-base">
        Watch the demo directly on this page.
      </p>
      <div className="mt-4 aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-black">
        <iframe
          src={embed.embedUrl}
          title={iframeTitle}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="h-full w-full"
        />
      </div>
      <a
        href={embed.originalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex text-sm font-medium text-tb-blue hover:underline"
      >
        Open on YouTube
      </a>
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
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-tb-text sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-tb-text-muted sm:text-lg">
          {project.shortDescription}
        </p>
      </div>
    </div>
  );
}
