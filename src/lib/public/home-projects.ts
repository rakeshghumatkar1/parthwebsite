import {
  getFeaturedHomeProjects,
  type PublicProject,
} from "@/lib/public/projects";
import type { ProjectRecord } from "@/types/cms";

export function publicProjectToHomeRecord(project: PublicProject): ProjectRecord {
  return {
    id: project.id,
    title: project.title,
    slug: project.slug,
    shortDescription: project.shortDescription,
    techStack: project.techStack,
    coverImageUrl: project.coverImageUrl ?? undefined,
    coverImageAlt: project.coverImageAlt ?? undefined,
    coverImageFit: project.coverImageFit,
    coverImagePosition: project.coverImagePosition,
    githubUrl: project.githubUrl ?? undefined,
    demoUrl: project.demoUrl ?? undefined,
  };
}

export async function getHomeFeaturedProjects(
  staticFallback: ProjectRecord[],
  limit = 6,
): Promise<{ projects: ProjectRecord[]; fromCms: boolean }> {
  try {
    const cmsProjects = await getFeaturedHomeProjects(limit);
    if (cmsProjects.length > 0) {
      return {
        projects: cmsProjects.map(publicProjectToHomeRecord),
        fromCms: true,
      };
    }
  } catch {
    // Fall back to static launch projects when DB is unavailable.
  }
  return { projects: staticFallback, fromCms: false };
}
