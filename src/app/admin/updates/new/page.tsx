import { AdminShell } from "@/components/admin/admin-shell";
import { UpdateForm } from "@/components/admin/update-form";
import { requireAdminSession } from "@/lib/admin/page-guard";
import {
  getProjectOptions,
  getProofOptions,
  getVideoOptions,
} from "@/lib/admin/shared/relation-options";

export const metadata = {
  title: "New update | Parth Admin",
};

export default async function AdminNewUpdatePage() {
  const admin = await requireAdminSession();

  const [projectOptions, videoOptions, proofOptions] = await Promise.all([
    getProjectOptions(),
    getVideoOptions(),
    getProofOptions(),
  ]);

  return (
    <AdminShell admin={admin}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Create update</h1>
          <p className="mt-2 text-sm text-tb-text-muted">
            Add a new timeline entry. Save as draft until you are ready to publish.
          </p>
        </div>
        <UpdateForm
          mode="create"
          projectOptions={projectOptions}
          videoOptions={videoOptions}
          proofOptions={proofOptions}
        />
      </div>
    </AdminShell>
  );
}
