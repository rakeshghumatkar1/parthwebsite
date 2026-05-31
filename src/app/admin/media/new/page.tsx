import { AdminShell } from "@/components/admin/admin-shell";
import { MediaForm } from "@/components/admin/media-form";
import { requireAdminSession } from "@/lib/admin/page-guard";
import {
  getProjectOptions,
  getProofOptions,
  getVideoOptions,
} from "@/lib/admin/shared/relation-options";

export const metadata = {
  title: "New media | Parth Admin",
};

export default async function AdminNewMediaPage() {
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
          <h1 className="text-2xl font-semibold tracking-tight">Add media record</h1>
          <p className="mt-2 text-sm text-tb-text-muted">
            Paste an approved file URL and optional metadata. No upload in this phase.
          </p>
        </div>
        <MediaForm
          mode="create"
          projectOptions={projectOptions}
          videoOptions={videoOptions}
          proofOptions={proofOptions}
        />
      </div>
    </AdminShell>
  );
}
