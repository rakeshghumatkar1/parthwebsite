import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { ProofForm } from "@/components/admin/proof-form";
import { requireAdminSession } from "@/lib/admin/page-guard";
import { getProofItemById } from "@/lib/admin/proof/queries";
import { proofToFormValues } from "@/lib/admin/proof/validation";
import {
  getMediaOptions,
  getMilestoneOptions,
  getProjectOptions,
} from "@/lib/admin/shared/relation-options";

export const metadata = {
  title: "Edit proof item | Parth Admin",
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

export default async function AdminEditProofPage({
  params,
  searchParams,
}: PageProps) {
  const admin = await requireAdminSession();
  const { id } = await params;
  const query = await searchParams;

  const [item, projectOptions, milestoneOptions, mediaOptions] =
    await Promise.all([
      getProofItemById(id),
      getProjectOptions(),
      getMilestoneOptions(),
      getMediaOptions(),
    ]);

  if (!item) {
    return (
      <AdminShell admin={admin}>
        <div className="mx-auto max-w-lg space-y-4 rounded-lg border border-tb-navy-border bg-tb-surface p-8 text-center">
          <h1 className="text-xl font-semibold">Proof item not found</h1>
          <p className="text-sm text-tb-text-muted">
            This proof item may have been removed or the link is incorrect.
          </p>
          <Link
            href="/admin/proof"
            className="inline-flex rounded-md bg-tb-blue px-4 py-2 text-sm font-medium text-white hover:bg-tb-blue-hover"
          >
            Back to proof library
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
          <h1 className="text-2xl font-semibold tracking-tight">
            Edit proof item
          </h1>
          <p className="mt-2 text-sm text-tb-text-muted">{item.title}</p>
          {saved ? (
            <p className="mt-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
              Proof item saved successfully.
            </p>
          ) : null}
        </div>

        <ProofForm
          mode="edit"
          recordId={item.id}
          initialValues={proofToFormValues(item)}
          updatedAt={formatDate(item.updatedAt)}
          projectOptions={projectOptions}
          milestoneOptions={milestoneOptions}
          mediaOptions={mediaOptions}
        />
      </div>
    </AdminShell>
  );
}
