import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { ProjectForm } from "@/components/admin/project-form";
import { requireAdminSession } from "@/lib/admin/page-guard";
import { getProjectById } from "@/lib/admin/projects/queries";
import { projectToFormValues } from "@/lib/admin/projects/validation";

export const metadata = {
  title: "Edit project | Parth Admin",
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

export default async function AdminEditProjectPage({
  params,
  searchParams,
}: PageProps) {
  const admin = await requireAdminSession();
  const { id } = await params;
  const query = await searchParams;
  const project = await getProjectById(id);

  if (!project) {
    return (
      <AdminShell admin={admin}>
        <div className="mx-auto max-w-lg space-y-4 rounded-lg border border-tb-navy-border bg-tb-surface p-8 text-center">
          <h1 className="text-xl font-semibold">Project not found</h1>
          <p className="text-sm text-tb-text-muted">
            This project may have been removed or the link is incorrect.
          </p>
          <Link
            href="/admin/projects"
            className="inline-flex rounded-md bg-tb-blue px-4 py-2 text-sm font-medium text-white hover:bg-tb-blue-hover"
          >
            Back to projects
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
          <h1 className="text-2xl font-semibold tracking-tight">Edit project</h1>
          <p className="mt-2 text-sm text-tb-text-muted">{project.title}</p>
          {saved ? (
            <p className="mt-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
              Project saved successfully.
            </p>
          ) : null}
        </div>

        <ProjectForm
          mode="edit"
          projectId={project.id}
          initialValues={projectToFormValues(project)}
          updatedAt={formatDate(project.updatedAt)}
        />
      </div>
    </AdminShell>
  );
}
