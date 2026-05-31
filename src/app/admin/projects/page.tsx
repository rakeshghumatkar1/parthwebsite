import { AdminShell } from "@/components/admin/admin-shell";
import { AdminCmsNotice } from "@/components/admin/admin-cms-notice";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminModuleGuide } from "@/components/admin/admin-module-guide";
import { ProjectsFilters } from "@/components/admin/projects-filters";
import { ProjectsTable } from "@/components/admin/projects-table";
import { AdminCreateLink } from "@/components/admin/ui/admin-create-link";
import { AdminPageHeader } from "@/components/admin/ui/admin-page-header";
import { MODULE_GUIDANCE } from "@/lib/admin/cms-guidance";
import { adminPageStackClass } from "@/lib/admin/admin-ui";
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

const guidance = MODULE_GUIDANCE.projects;

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
      <div className={adminPageStackClass}>
        <AdminPageHeader
          title={guidance.title}
          description={guidance.subtitle}
          action={<AdminCreateLink href="/admin/projects/new">Create project</AdminCreateLink>}
        />

        <AdminCmsNotice variant="info" />
        <AdminModuleGuide module="projects" />
        <ProjectsFilters filters={filters} />

        {projects.length === 0 ? (
          <AdminEmptyState
            title={guidance.emptyTitle}
            description={guidance.emptyDescription}
            waitNote={guidance.emptyWaitNote}
            action={
              <AdminCreateLink href="/admin/projects/new">Create project</AdminCreateLink>
            }
          />
        ) : (
          <ProjectsTable projects={projects} />
        )}
      </div>
    </AdminShell>
  );
}
