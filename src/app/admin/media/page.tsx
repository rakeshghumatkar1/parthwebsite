import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminCmsNotice } from "@/components/admin/admin-cms-notice";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminHelpBox } from "@/components/admin/admin-help-box";
import { AdminModuleGuide } from "@/components/admin/admin-module-guide";
import { MediaFilters } from "@/components/admin/media-filters";
import { MediaTable } from "@/components/admin/media-table";
import { BLOB_PREFIX_RULE, MODULE_GUIDANCE } from "@/lib/admin/cms-guidance";
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
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{guidance.title}</h1>
            <p className="mt-2 max-w-2xl text-sm text-tb-text-muted">{guidance.subtitle}</p>
          </div>
          <Link href="/admin/media/new" className="rounded-md bg-tb-blue px-4 py-2.5 text-sm font-medium text-white hover:bg-tb-blue-hover">Add media record</Link>
        </div>
        <AdminCmsNotice variant="info">
          <p className="font-medium">URL-only — no upload yet</p>
          <p className="mt-1 opacity-90">Paste approved public URLs. Upload support will be added later.</p>
        </AdminCmsNotice>
        <AdminModuleGuide module="media" />
        <AdminHelpBox title="Blob storage rule (future uploads)">
          {BLOB_PREFIX_RULE}
        </AdminHelpBox>
        <MediaFilters filters={filters} projectOptions={projectOptions} />
        {mediaRecords.length === 0 ? (
          <AdminEmptyState title={guidance.emptyTitle} description={guidance.emptyDescription} waitNote={guidance.emptyWaitNote} action={<Link href="/admin/media/new" className="inline-flex rounded-md bg-tb-blue px-4 py-2 text-sm font-medium text-white hover:bg-tb-blue-hover">Add media record</Link>} />
        ) : (
          <MediaTable mediaRecords={mediaRecords} projectOptions={projectOptions} />
        )}
      </div>
    </AdminShell>
  );
}
