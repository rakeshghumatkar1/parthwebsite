import { AdminShell } from "@/components/admin/admin-shell";
import { VideoForm } from "@/components/admin/video-form";
import { requireAdminSession } from "@/lib/admin/page-guard";
import {
  getMediaOptions,
  getProjectOptions,
} from "@/lib/admin/shared/relation-options";

export const metadata = {
  title: "New video | Parth Admin",
};

export default async function AdminNewVideoPage() {
  const admin = await requireAdminSession();
  const [projectOptions, mediaOptions] = await Promise.all([
    getProjectOptions(),
    getMediaOptions(),
  ]);

  return (
    <AdminShell admin={admin}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Create video</h1>
          <p className="mt-2 text-sm text-tb-text-muted">
            Add a new video record. Save as draft until you are ready to publish.
          </p>
        </div>
        <VideoForm
          mode="create"
          projectOptions={projectOptions}
          mediaOptions={mediaOptions}
        />
      </div>
    </AdminShell>
  );
}
