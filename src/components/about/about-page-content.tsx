import Link from "next/link";
import { ProjectCard } from "@/components/projects/project-card";
import { ProofCard } from "@/components/proof/proof-card";
import { PublicEmptyState } from "@/components/public/empty-state";
import { VideoCard } from "@/components/videos/video-card";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { PublicMilestone } from "@/lib/public/about";
import { milestoneCategoryLabel } from "@/lib/public/about";
import { formatPublicDate } from "@/lib/public/format";
import type { PublicProofItem } from "@/lib/public/proof";
import type { PublicProject } from "@/lib/public/projects";
import type { PublicVideo } from "@/lib/public/videos";
import type { PublicMedia } from "@/lib/public/media";

type AboutPageContentProps = {
  milestones: PublicMilestone[];
  featuredProjects: PublicProject[];
  featuredProof: PublicProofItem[];
  featuredVideos: PublicVideo[];
  proofMediaMap: Map<string, PublicMedia>;
  videoMediaMap: Map<string, PublicMedia>;
};

function MilestoneItem({ milestone }: { milestone: PublicMilestone }) {
  const eventDate = formatPublicDate(milestone.eventDate);
  const category = milestoneCategoryLabel(milestone.category);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-2 text-xs text-tb-text-muted">
        {milestone.eventLabel ? (
          <span className="font-medium text-tb-text">{milestone.eventLabel}</span>
        ) : null}
        {eventDate ? <span>{eventDate}</span> : null}
        {category ? (
          <span className="rounded-full bg-tb-surface-muted px-2.5 py-0.5">
            {category}
          </span>
        ) : null}
      </div>
      <h3 className="mt-3 text-lg font-semibold text-tb-text">{milestone.title}</h3>
      {milestone.shortDescription ? (
        <p className="mt-2 text-sm leading-relaxed text-tb-text-muted sm:text-base">
          {milestone.shortDescription}
        </p>
      ) : null}
      {milestone.relatedProjectTitle && milestone.relatedProjectSlug ? (
        <p className="mt-4 text-sm">
          <Link
            href={`/projects/${milestone.relatedProjectSlug}`}
            className="font-medium text-tb-blue hover:underline"
          >
            {milestone.relatedProjectTitle}
          </Link>
        </p>
      ) : null}
    </article>
  );
}

export function AboutPageContent({
  milestones,
  featuredProjects,
  featuredProof,
  featuredVideos,
  proofMediaMap,
  videoMediaMap,
}: AboutPageContentProps) {
  return (
    <>
      <Section tone="light">
        <SectionHeader
          title="About Parth"
          description="A project-led software and AI systems portfolio connected to Think Big Digital Solutions. This site documents real builds, workflows, and evidence—not marketing claims."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-tb-text">Overview</h2>
            <p className="mt-4 text-sm leading-relaxed text-tb-text-muted sm:text-base">
              Think Big AI Systems is Parth Ghumatkar&apos;s technical portfolio
              under Think Big Digital Solutions. The focus is software systems,
              AI-enabled workflows, automation, internal tools, and data platforms
              built around concrete use cases—with proof you can review when it is
              approved for publication.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-tb-text">How this site is structured</h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-tb-text-muted sm:text-base">
              <li>
                <Link href="/projects" className="font-medium text-tb-blue hover:underline">
                  Projects
                </Link>{" "}
                — software builds and system descriptions
              </li>
              <li>
                <Link href="/proof" className="font-medium text-tb-blue hover:underline">
                  Proof Library
                </Link>{" "}
                — repositories, documents, screenshots, and technical evidence
              </li>
              <li>
                <Link href="/videos" className="font-medium text-tb-blue hover:underline">
                  Videos
                </Link>{" "}
                — walkthroughs, demos, and technical explanations
              </li>
              <li>
                <Link href="/updates" className="font-medium text-tb-blue hover:underline">
                  Updates
                </Link>{" "}
                — build notes and progress records
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeader
          title="Milestones"
          description="Timeline highlights from the CMS when About-page records are published."
        />
        {milestones.length > 0 ? (
          <div className="space-y-4">
            {milestones.map((milestone) => (
              <MilestoneItem key={milestone.id} milestone={milestone} />
            ))}
          </div>
        ) : (
          <PublicEmptyState message="Milestones will appear here after About-page records are published in the CMS." />
        )}
      </Section>

      <Section tone="light">
        <SectionHeader
          title="Featured projects"
          description="Selected builds flagged for the About page in the CMS."
        />
        {featuredProjects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <PublicEmptyState message="Featured projects will appear here after About-page project records are published in the CMS." />
        )}
      </Section>

      <Section tone="muted">
        <SectionHeader
          title="Featured proof"
          description="Evidence items selected for the About page."
        />
        {featuredProof.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProof.map((item) => (
              <ProofCard
                key={item.id}
                item={item}
                media={item.mediaId ? proofMediaMap.get(item.mediaId) : null}
              />
            ))}
          </div>
        ) : (
          <PublicEmptyState message="Featured proof will appear here after About-page proof records are published in the CMS." />
        )}
      </Section>

      <Section tone="light">
        <SectionHeader
          title="Featured videos"
          description="Demos and walkthroughs selected for the About page."
        />
        {featuredVideos.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                thumbnail={
                  video.thumbnailMediaId
                    ? videoMediaMap.get(video.thumbnailMediaId)
                    : null
                }
              />
            ))}
          </div>
        ) : (
          <PublicEmptyState message="Featured videos will appear here after About-page video records are published in the CMS." />
        )}
        <div className="mt-12 flex flex-wrap gap-4">
          <Button href="/projects" variant="ghost" size="lg">
            View all projects
          </Button>
          <Button href="/proof" variant="ghost" size="lg">
            Browse proof library
          </Button>
        </div>
      </Section>
    </>
  );
}
