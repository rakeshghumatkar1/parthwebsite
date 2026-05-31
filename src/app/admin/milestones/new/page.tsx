import { AdminShell } from "@/components/admin/admin-shell";
import { MilestoneForm } from "@/components/admin/milestone-form";
import { requireAdminSession } from "@/lib/admin/page-guard";
import {
  getProjectOptions,
  getProofOptions,
  getVideoOptions,
} from "@/lib/admin/shared/relation-options";

export const metadata = {
  title: "New milestone | Parth Admin",
};

export default async function AdminNewMilestonePage() {
  const admin = await requireAdminSession();
  const [projectOptions, proofOptions, videoOptions] = await Promise.all([
    getProjectOptions(),
    getProofOptions(),
    getVideoOptions(),
  ]);

  return (
    <AdminShell admin={admin}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Create milestone
          </h1>
          <p className="mt-2 text-sm text-tb-text-muted">
            Add a new timeline milestone. Save as draft until you are ready to
            publish.
          </p>
        </div>
        <MilestoneForm
          mode="create"
          projectOptions={projectOptions}
          proofOptions={proofOptions}
          videoOptions={videoOptions}
        />
      </div>
    </AdminShell>
  );
}
