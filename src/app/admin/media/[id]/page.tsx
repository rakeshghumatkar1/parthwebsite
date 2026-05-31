import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { MediaForm } from "@/components/admin/media-form";
import { requireAdminSession } from "@/lib/admin/page-guard";
import {
  getProjectOptions,
  getProofOptions,
  getVideoOptions,
} from "@/lib/admin/shared/relation-options";
import { getMediaById } from "@/lib/admin/media/queries";
import { mediaToFormValues } from "@/lib/admin/media/validation";

export const metadata = {
  title: "Edit media | Parth Admin",
};

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function formatDate(value: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(value);
}

export default async function AdminEditMediaPage({
  params,
  searchParams,
}: PageProps) {
  const admin = await requireAdminSession();
  const { id } = await params;
  const query = await searchParams;

  const [mediaRecord, projectOptions, videoOptions, proofOptions] =
    await Promise.all([
      getMediaById(id),
      getProjectOptions(),
      getVideoOptions(),
      getProofOptions(),
    ]);

  if (!mediaRecord) {
    return (
      <AdminShell admin={admin}>
        <div className="mx-auto max-w-lg space-y-4 rounded-lg border border-tb-navy-border bg-tb-surface p-8 text-center">
          <h1 className="text-xl font-semibold">Media record not found</h1>
          <p className="text-sm text-tb-text-muted">
            This record may have been removed or the link is incorrect.
          </p>
          <Link
            href="/admin/media"
            className="inline-flex rounded-md bg-tb-blue px-4 py-2 text-sm font-medium text-white hover:bg-tb-blue-hover"
          >
            Back to media
          </Link>
        </div>
      </AdminShell>
    );
  }

  const saved = query.saved === "1";

  return (
    <AdminShell admin={admin}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Edit media record</h1>
          <p className="mt-2 text-sm text-tb-text-muted">
            {mediaRecord.fileName || mediaRecord.fileUrl}
          </p>
          {saved ? (
            <p className="mt-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
              Media record saved successfully.
            </p>
          ) : null}
        </div>

        <MediaForm
          mode="edit"
          recordId={mediaRecord.id}
          initialValues={mediaToFormValues(mediaRecord)}
          updatedAt={formatDate(mediaRecord.updatedAt)}
          projectOptions={projectOptions}
          videoOptions={videoOptions}
          proofOptions={proofOptions}
        />
      </div>
    </AdminShell>
  );
}
