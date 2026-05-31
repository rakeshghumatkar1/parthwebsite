import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectsFilters } from "@/components/projects/projects-filters";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import {
  getPublicProjects,
  type PublicProjectListFilters,
} from "@/lib/public/projects";

export const metadata: Metadata = {
  title: "Projects | Think Big AI Systems",
  description:
    "Software systems, AI-enabled workflows, automation builds, and project evidence maintained through the Parth CMS.",
};

type ProjectsPageProps = {
  searchParams: Promise<{
    q?: string;
    projectType?: string;
    status?: string;
  }>;
};

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const params = await searchParams;
  const filters: PublicProjectListFilters = {
    q: params.q,
    projectType: params.projectType,
    status: params.status,
  };
  const projects = await getPublicProjects(filters);

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main>
        <Section tone="light">
          <SectionHeader
            title="Projects"
            description="Software systems, AI-enabled workflows, automation builds, and project evidence created and maintained through the Parth CMS."
          />
          <Suspense fallback={null}>
            <ProjectsFilters />
          </Suspense>
          {projects.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-slate-200 bg-tb-surface-muted px-6 py-16 text-center">
              <p className="text-base text-tb-text-muted sm:text-lg">
                Projects will appear here after approved project records are
                published in the CMS.
              </p>
            </div>
          )}
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
