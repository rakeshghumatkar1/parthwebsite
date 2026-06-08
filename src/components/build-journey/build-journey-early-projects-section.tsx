import Link from "next/link";
import { BuildJourneyEarlyWorkCard } from "@/components/build-journey/build-journey-early-work-card";
import { Section } from "@/components/ui/section";
import { IconArrowRight } from "@/components/ui/icons";
import { BUILD_JOURNEY_EXPERIMENTS } from "@/lib/build-journey-page-content";
import type { PublicProject } from "@/lib/public/projects";

type BuildJourneyEarlyProjectsSectionProps = {
  earlyWorkProjects: PublicProject[];
};

export function BuildJourneyEarlyProjectsSection({
  earlyWorkProjects,
}: BuildJourneyEarlyProjectsSectionProps) {
  const projectCount = earlyWorkProjects.length;

  return (
    <Section tone="light" dense>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tb-blue">
          Selected Early Work
        </p>
        <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-tb-text sm:text-2xl">
          Early builds that became working examples.
        </h2>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-tb-text-muted">
          Hands-on early projects, experiments, and automation builds are shown
          here as they are added.
        </p>
      </div>

      {projectCount === 0 ? (
        <div className="mt-3 rounded-lg border border-slate-200/90 bg-white px-4 py-4 shadow-sm ring-1 ring-slate-100 sm:px-5 sm:py-5">
          <p className="text-sm leading-relaxed text-tb-text-muted">
            Selected early work builds will appear here as they are added.
          </p>
          <p className="mt-3">
            <Link
              href="/projects/early-work"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-tb-blue hover:underline"
            >
              View Early Work
              <IconArrowRight className="h-3.5 w-3.5" />
            </Link>
          </p>
        </div>
      ) : projectCount === 1 ? (
        <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <BuildJourneyEarlyWorkCard project={earlyWorkProjects[0]!} />
          <aside className="rounded-lg border border-slate-200/80 bg-slate-50/50 px-3.5 py-4 sm:px-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-tb-text-muted">
              Early Work Archive
            </p>
            <p className="mt-2 text-sm leading-relaxed text-tb-text-muted">
              Selected early work entries link to individual project pages with
              summaries, images, and build context.
            </p>
          </aside>
        </div>
      ) : (
        <div
          className={`mt-3 grid gap-3 ${
            projectCount >= 3
              ? "sm:grid-cols-2 lg:grid-cols-3"
              : "lg:grid-cols-2"
          }`}
        >
          {earlyWorkProjects.map((project) => (
            <BuildJourneyEarlyWorkCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {projectCount > 0 ? (
        <div className="mt-3 rounded-md border border-slate-200/80 bg-slate-50/50 px-3 py-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-tb-text-muted">
            Other early experiment areas
          </p>
          <ul className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-3">
            {BUILD_JOURNEY_EXPERIMENTS.map((item) => (
              <li
                key={item}
                className="rounded-md border border-slate-200/90 bg-white px-2.5 py-1.5 text-xs font-medium leading-snug text-tb-text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {projectCount > 0 ? (
        <p className="mt-2.5">
          <Link
            href="/projects/early-work"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-tb-blue hover:underline"
          >
            View Early Work
            <IconArrowRight className="h-3.5 w-3.5" />
          </Link>
        </p>
      ) : null}
    </Section>
  );
}
