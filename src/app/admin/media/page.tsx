import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminHelpBox } from "@/components/admin/admin-help-box";
import { MediaFilters } from "@/components/admin/media-filters";
import { MediaTable } from "@/components/admin/media-table";
import { requireAdminSession } from "@/lib/admin/page-guard";
import { getProjectOptions } from "@/lib/admin/shared/relation-options";
import { listMediaRecords } from "@/lib/admin/media/queries";
import type { MediaListFilters } from "@/lib/admin/media/types";

export const metadata = {
  title: "Media | Parth Admin",
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function readFilter(
  params: Record<string, string | string[] | undefined>,
  key: keyof MediaListFilters,
): string | undefined {
  const value = params[key];
  return typeof value === "string" ? value : undefined;
}

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
            <h1 className="text-2xl font-semibold tracking-tight">Media</h1>
            <p className="mt-2 max-w-2xl text-sm text-tb-text-muted">
              Manage media metadata records linked by URL for future public pages.
            </p>
          </div>
          <Link
            href="/admin/media/new"
            className="rounded-md bg-tb-blue px-4 py-2.5 text-sm font-medium text-white transition hover:bg-tb-blue-hover"
          >
            Add media record
          </Link>
        </div>

        <AdminHelpBox title="URL-only media">
          Media records store approved file URLs only — there is no upload in this
          phase. In a future phase, files may use a Blob prefix such as{" "}
          <code className="text-xs">parthwebsite/</code>. Media has no
          published/hidden flags.
        </AdminHelpBox>

        <MediaFilters filters={filters} projectOptions={projectOptions} />

        {mediaRecords.length === 0 ? (
          <AdminEmptyState
            title="No media records yet"
            description="Add the first media record when you have an approved file URL."
            action={
              <Link
                href="/admin/media/new"
                className="inline-flex rounded-md bg-tb-blue px-4 py-2 text-sm font-medium text-white hover:bg-tb-blue-hover"
              >
                Add media record
              </Link>
            }
          />
        ) : (
          <MediaTable
            mediaRecords={mediaRecords}
            projectOptions={projectOptions}
          />
        )}
      </div>
    </AdminShell>
  );
}
