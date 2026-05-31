import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminHelpBox } from "@/components/admin/admin-help-box";
import { ProjectsFilters } from "@/components/admin/projects-filters";
import { ProjectsTable } from "@/components/admin/projects-table";
import { requireAdminSession } from "@/lib/admin/page-guard";
import { listProjects } from "@/lib/admin/projects/queries";
import type { ProjectListFilters } from "@/lib/admin/projects/types";

export const metadata = {
  title: "Projects | Parth Admin",
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function readFilter(
  params: Record<string, string | string[] | undefined>,
  key: keyof ProjectListFilters,
): string | undefined {
  const value = params[key];
  return typeof value === "string" ? value : undefined;
}

export default async function AdminProjectsPage({ searchParams }: PageProps) {
  const admin = await requireAdminSession();
  const params = await searchParams;

  const filters: ProjectListFilters = {
    q: readFilter(params, "q"),
    status: readFilter(params, "status"),
    projectType: readFilter(params, "projectType"),
    published: readFilter(params, "published"),
    hidden: readFilter(params, "hidden"),
    archived: readFilter(params, "archived"),
    featuredOnHome: readFilter(params, "featuredOnHome"),
    featuredOnAbout: readFilter(params, "featuredOnAbout"),
  };

  const projects = await listProjects(filters);

  return (
    <AdminShell admin={admin}>
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
            <p className="mt-2 max-w-2xl text-sm text-tb-text-muted">
              Manage portfolio project records for future public pages.
            </p>
          </div>
          <Link
            href="/admin/projects/new"
            className="rounded-md bg-tb-blue px-4 py-2.5 text-sm font-medium text-white transition hover:bg-tb-blue-hover"
          >
            Create project
          </Link>
        </div>

        <AdminHelpBox title="About projects">
          Projects can appear later on the Home page, Projects page, About Parth
          page, and Project detail pages. This phase only manages project records.
          Public pages are not connected yet. Use approved real URLs only — do not
          invent GitHub, demo, or download links.
        </AdminHelpBox>

        <ProjectsFilters filters={filters} />

        {projects.length === 0 ? (
          <AdminEmptyState
            title="No projects yet"
            description="Add the first project from the approved launch projects later."
            action={
              <Link
                href="/admin/projects/new"
                className="inline-flex rounded-md bg-tb-blue px-4 py-2 text-sm font-medium text-white hover:bg-tb-blue-hover"
              >
                Create project
              </Link>
            }
          />
        ) : (
          <ProjectsTable projects={projects} />
        )}
      </div>
    </AdminShell>
  );
}
