import { AdminShell } from "@/components/admin/admin-shell";
import { AdminCmsNotice } from "@/components/admin/admin-cms-notice";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminHelpBox } from "@/components/admin/admin-help-box";
import { AdminModuleGuide } from "@/components/admin/admin-module-guide";
import { MediaFilters } from "@/components/admin/media-filters";
import { MediaTable } from "@/components/admin/media-table";
import { AdminCreateLink } from "@/components/admin/ui/admin-create-link";
import { AdminPageHeader } from "@/components/admin/ui/admin-page-header";
import { BLOB_PREFIX_RULE, MODULE_GUIDANCE } from "@/lib/admin/cms-guidance";
import { adminPageStackClass } from "@/lib/admin/admin-ui";
import { requireAdminSession } from "@/lib/admin/page-guard";
import { getProjectOptions } from "@/lib/admin/shared/relation-options";
import { listMediaRecords } from "@/lib/admin/media/queries";
import type { MediaListFilters } from "@/lib/admin/media/types";

export const metadata = { title: "Media Library | Parth Admin" };

type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

function readFilter(params: Record<string, string | string[] | undefined>, key: keyof MediaListFilters) {
  const value = params[key];
  return typeof value === "string" ? value : undefined;
}

const guidance = MODULE_GUIDANCE.media;

export default async function AdminMediaPage({ searchParams }: PageProps) {
  const admin = await requireAdminSession();
  const params = await searchParams;
  const filters: MediaListFilters = {
    q: readFilter(params, "q"),
    fileType: readFilter(params, "fileType"),
    imageRole: readFilter(params, "imageRole"),
    imageDisplayMode: readFilter(params, "imageDisplayMode"),
    relatedProjectId: readFilter(params, "relatedProjectId"),
  };
  const [mediaRecords, projectOptions] = await Promise.all([
    listMediaRecords(filters),
    getProjectOptions(),
  ]);

  return (
    <AdminShell admin={admin}>
      <div className={adminPageStackClass}>
        <AdminPageHeader
          title={guidance.title}
          description={guidance.subtitle}
          action={<AdminCreateLink href="/admin/media/new">Add media</AdminCreateLink>}
        />
        <AdminCmsNotice variant="info">
          <p className="font-medium">URL or Blob upload</p>
          <p className="mt-1 opacity-90">
            Paste approved URLs or upload files to parthwebsite/ in the shared Blob
            store. Only Neon media records are listed — never other sites&apos; files.
          </p>
        </AdminCmsNotice>
        <AdminModuleGuide module="media" />
        <AdminHelpBox title="Blob storage rule">
          {BLOB_PREFIX_RULE} Delete from Blob is not available in this phase.
        </AdminHelpBox>
        <MediaFilters filters={filters} projectOptions={projectOptions} />
        {mediaRecords.length === 0 ? (
          <AdminEmptyState
            title={guidance.emptyTitle}
            description={guidance.emptyDescription}
            waitNote={guidance.emptyWaitNote}
            action={<AdminCreateLink href="/admin/media/new">Add media record</AdminCreateLink>}
          />
        ) : (
          <MediaTable mediaRecords={mediaRecords} projectOptions={projectOptions} />
        )}
      </div>
    </AdminShell>
  );
}
