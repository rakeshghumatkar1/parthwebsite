import { AdminShell } from "@/components/admin/admin-shell";
import { ProjectForm } from "@/components/admin/project-form";
import { requireAdminSession } from "@/lib/admin/page-guard";

export const metadata = {
  title: "New project | Parth Admin",
};

export default async function AdminNewProjectPage() {
  const admin = await requireAdminSession();

  return (
    <AdminShell admin={admin}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Create project</h1>
          <p className="mt-2 text-sm text-tb-text-muted">
            Add a new project record. Save as draft until you are ready to publish.
          </p>
        </div>
        <ProjectForm mode="create" />
      </div>
    </AdminShell>
  );
}
