import { AdminShell } from "@/components/admin/admin-shell";
import { AdminCmsNotice } from "@/components/admin/admin-cms-notice";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminModuleGuide } from "@/components/admin/admin-module-guide";
import { VideoFilters } from "@/components/admin/video-filters";
import { VideoTable } from "@/components/admin/video-table";
import { AdminCreateLink } from "@/components/admin/ui/admin-create-link";
import { AdminPageHeader } from "@/components/admin/ui/admin-page-header";
import { MODULE_GUIDANCE } from "@/lib/admin/cms-guidance";
import { adminPageStackClass } from "@/lib/admin/admin-ui";
import { requireAdminSession } from "@/lib/admin/page-guard";
import { getProjectOptions } from "@/lib/admin/shared/relation-options";
import { listVideos } from "@/lib/admin/videos/queries";
import type { VideoListFilters } from "@/lib/admin/videos/types";

export const metadata = { title: "Videos | Parth Admin" };

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function readFilter(
  params: Record<string, string | string[] | undefined>,
  key: keyof VideoListFilters,
): string | undefined {
  const value = params[key];
  return typeof value === "string" ? value : undefined;
}

const guidance = MODULE_GUIDANCE.videos;

export default async function AdminVideosPage({ searchParams }: PageProps) {
  const admin = await requireAdminSession();
  const params = await searchParams;
  const filters: VideoListFilters = {
    q: readFilter(params, "q"),
    category: readFilter(params, "category"),
    published: readFilter(params, "published"),
    hidden: readFilter(params, "hidden"),
    featuredOnHome: readFilter(params, "featuredOnHome"),
    featuredOnAbout: readFilter(params, "featuredOnAbout"),
    relatedProjectId: readFilter(params, "relatedProjectId"),
  };
  const [videos, projectOptions] = await Promise.all([
    listVideos(filters),
    getProjectOptions(),
  ]);

  return (
    <AdminShell admin={admin}>
      <div className={adminPageStackClass}>
        <AdminPageHeader
          title={guidance.title}
          description={guidance.subtitle}
          action={<AdminCreateLink href="/admin/videos/new">Create video</AdminCreateLink>}
        />
        <AdminCmsNotice variant="info" />
        <AdminModuleGuide module="videos" />
        <VideoFilters filters={filters} projectOptions={projectOptions} />
        {videos.length === 0 ? (
          <AdminEmptyState
            title={guidance.emptyTitle}
            description={guidance.emptyDescription}
            waitNote={guidance.emptyWaitNote}
            action={<AdminCreateLink href="/admin/videos/new">Create video</AdminCreateLink>}
          />
        ) : (
          <VideoTable videos={videos} projectOptions={projectOptions} />
        )}
      </div>
    </AdminShell>
  );
}
