import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { MilestoneForm } from "@/components/admin/milestone-form";
import { requireAdminSession } from "@/lib/admin/page-guard";
import { getMilestoneById } from "@/lib/admin/milestones/queries";
import { milestoneToFormValues } from "@/lib/admin/milestones/validation";
import {
  getProjectOptions,
  getProofOptions,
  getVideoOptions,
} from "@/lib/admin/shared/relation-options";
import { formatAdminDateLong } from "@/lib/admin/shared/validation";

export const metadata = {
  title: "Edit milestone | Parth Admin",
};

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminEditMilestonePage({
  params,
  searchParams,
}: PageProps) {
  const admin = await requireAdminSession();
  const { id } = await params;
  const query = await searchParams;

  const [milestone, projectOptions, proofOptions, videoOptions] =
    await Promise.all([
      getMilestoneById(id),
      getProjectOptions(),
      getProofOptions(),
      getVideoOptions(),
    ]);

  if (!milestone) {
    return (
      <AdminShell admin={admin}>
        <div className="mx-auto max-w-lg space-y-4 rounded-lg border border-tb-navy-border bg-tb-surface p-8 text-center">
          <h1 className="text-xl font-semibold">Milestone not found</h1>
          <p className="text-sm text-tb-text-muted">
            This milestone may have been removed or the link is incorrect.
          </p>
          <Link
            href="/admin/milestones"
            className="inline-flex rounded-md bg-tb-blue px-4 py-2 text-sm font-medium text-white hover:bg-tb-blue-hover"
          >
            Back to milestones
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
            Edit milestone
          </h1>
          <p className="mt-2 text-sm text-tb-text-muted">{milestone.title}</p>
          {saved ? (
            <p className="mt-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
              Milestone saved successfully.
            </p>
          ) : null}
        </div>

        <MilestoneForm
          mode="edit"
          recordId={milestone.id}
          initialValues={milestoneToFormValues(milestone)}
          updatedAt={formatAdminDateLong(milestone.updatedAt)}
          projectOptions={projectOptions}
          proofOptions={proofOptions}
          videoOptions={videoOptions}
        />
      </div>
    </AdminShell>
  );
}
