import { AdminShell } from "@/components/admin/admin-shell";
import { ProofForm } from "@/components/admin/proof-form";
import { requireAdminSession } from "@/lib/admin/page-guard";
import {
  getMediaOptions,
  getMilestoneOptions,
  getProjectOptions,
} from "@/lib/admin/shared/relation-options";

export const metadata = {
  title: "New proof item | Parth Admin",
};

export default async function AdminNewProofPage() {
  const admin = await requireAdminSession();

  const [projectOptions, milestoneOptions, mediaOptions] = await Promise.all([
    getProjectOptions(),
    getMilestoneOptions(),
    getMediaOptions(),
  ]);

  return (
    <AdminShell admin={admin}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Create proof item
          </h1>
          <p className="mt-2 text-sm text-tb-text-muted">
            Add a new proof record. Save as draft until you are ready to publish.
          </p>
        </div>
        <ProofForm
          mode="create"
          projectOptions={projectOptions}
          milestoneOptions={milestoneOptions}
          mediaOptions={mediaOptions}
        />
      </div>
    </AdminShell>
  );
}
