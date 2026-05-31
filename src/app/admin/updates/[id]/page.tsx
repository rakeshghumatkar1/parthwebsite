import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { UpdateForm } from "@/components/admin/update-form";
import { requireAdminSession } from "@/lib/admin/page-guard";
import {
  getProjectOptions,
  getProofOptions,
  getVideoOptions,
} from "@/lib/admin/shared/relation-options";
import { getUpdateById } from "@/lib/admin/updates/queries";
import { updateToFormValues } from "@/lib/admin/updates/validation";

export const metadata = {
  title: "Edit update | Parth Admin",
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

export default async function AdminEditUpdatePage({
  params,
  searchParams,
}: PageProps) {
  const admin = await requireAdminSession();
  const { id } = await params;
  const query = await searchParams;

  const [update, projectOptions, videoOptions, proofOptions] = await Promise.all([
    getUpdateById(id),
    getProjectOptions(),
    getVideoOptions(),
    getProofOptions(),
  ]);

  if (!update) {
    return (
      <AdminShell admin={admin}>
        <div className="mx-auto max-w-lg space-y-4 rounded-lg border border-tb-navy-border bg-tb-surface p-8 text-center">
          <h1 className="text-xl font-semibold">Update not found</h1>
          <p className="text-sm text-tb-text-muted">
            This update may have been removed or the link is incorrect.
          </p>
          <Link
            href="/admin/updates"
            className="inline-flex rounded-md bg-tb-blue px-4 py-2 text-sm font-medium text-white hover:bg-tb-blue-hover"
          >
            Back to updates
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
          <h1 className="text-2xl font-semibold tracking-tight">Edit update</h1>
          <p className="mt-2 text-sm text-tb-text-muted">{update.title}</p>
          {saved ? (
            <p className="mt-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
              Update saved successfully.
            </p>
          ) : null}
        </div>

        <UpdateForm
          mode="edit"
          recordId={update.id}
          initialValues={updateToFormValues(update)}
          updatedAt={formatDate(update.updatedAt)}
          projectOptions={projectOptions}
          videoOptions={videoOptions}
          proofOptions={proofOptions}
        />
      </div>
    </AdminShell>
  );
}
