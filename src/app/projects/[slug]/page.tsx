import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  ProjectContextPanel,
  ProjectDetailHeader,
  ProjectDetailSection,
  ProjectLinksPanel,
  ProjectVideoEmbed,
} from "@/components/projects/project-detail";
import { Section } from "@/components/ui/section";
import { getPublicProjectBySlug } from "@/lib/public/projects";
import { parseYouTubeUrl } from "@/lib/public/youtube";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublicProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found | Think Big AI Systems",
    };
  }

  return {
    title: `${project.title} | Think Big AI Systems`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} | Think Big AI Systems`,
      description: project.shortDescription,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getPublicProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const sections = [
    { title: "Overview", content: project.fullDescription },
    { title: "Problem solved", content: project.problemSolved },
    { title: "What it does", content: project.whatItDoes },
    { title: "Contribution", content: project.parthRole },
  ].filter((section) => section.content?.trim());

  const youtubeEmbed = project.videoUrl
    ? parseYouTubeUrl(project.videoUrl)
    : null;

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main>
        <Section tone="light">
          <div className="grid gap-10 lg:grid-cols-[1fr_280px] lg:items-start">
            <div className="space-y-8">
              <ProjectDetailHeader project={project} />
              <div className="lg:hidden">
                <ProjectContextPanel project={project} />
              </div>
              {youtubeEmbed ? (
                <ProjectVideoEmbed project={project} embed={youtubeEmbed} />
              ) : null}
              {sections.length > 0 ? (
                <div className="space-y-6">
                  {sections.map((section) => (
                    <ProjectDetailSection key={section.title} title={section.title}>
                      <p className="whitespace-pre-wrap">{section.content}</p>
                    </ProjectDetailSection>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="space-y-6">
              <div className="hidden lg:block">
                <ProjectContextPanel project={project} />
              </div>
              <ProjectLinksPanel project={project} youtubeEmbed={youtubeEmbed} />
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
