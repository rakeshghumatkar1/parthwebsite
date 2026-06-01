import Link from "next/link";
import {
  toggleProjectArchivedAction,
  toggleProjectHiddenAction,
  toggleProjectPublishedAction,
} from "@/lib/admin/projects/actions";
import type { Project } from "@/lib/admin/projects/types";
import {
  adminTableBodyCellClass,
  adminTableHeadCellClass,
  adminBtnGhostClass,
} from "@/lib/admin/admin-ui";
import { AdminTableShell } from "./ui/admin-table-shell";
import {
  ProjectFeaturedFlags,
  ProjectIndustryLabel,
  ProjectPhaseLabel,
  ProjectStatusBadge,
  ProjectStatusLabel,
  ProjectTypeLabel,
} from "./project-status-badge";
import { formatDomainsCompact } from "@/lib/projects/taxonomy";

type ProjectsTableProps = {
  projects: Project[];
};

function formatDate(value: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

function QuickToggleForm({
  action,
  id,
  field,
  value,
  label,
}: {
  action: (formData: FormData) => Promise<void>;
  id: string;
  field: string;
  value: boolean;
  label: string;
}) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name={field} value={String(!value)} />
      <button
        type="submit"
        className="text-xs font-medium text-tb-blue hover:underline"
      >
        {label}
      </button>
    </form>
  );
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
  return (
    <AdminTableShell>
      <table className="min-w-full divide-y divide-slate-100 text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className={adminTableHeadCellClass}>Title</th>
            <th className={adminTableHeadCellClass}>Phase</th>
            <th className={adminTableHeadCellClass}>Industry</th>
            <th className={adminTableHeadCellClass}>Type</th>
            <th className={adminTableHeadCellClass}>Status</th>
            <th className={adminTableHeadCellClass}>Visibility</th>
            <th className={adminTableHeadCellClass}>Featured</th>
            <th className={adminTableHeadCellClass}>Cover</th>
            <th className={adminTableHeadCellClass}>Order</th>
            <th className={adminTableHeadCellClass}>Updated</th>
            <th className={adminTableHeadCellClass}>Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-slate-50/80">
              <td className={adminTableBodyCellClass}>
                <div className="font-medium">{project.title}</div>
                <div className="text-xs text-tb-text-muted">{project.slug}</div>
                <div className="text-xs text-tb-text-muted">
                  {formatDomainsCompact(project.domains)}
                </div>
              </td>
              <td className={adminTableBodyCellClass}>
                <ProjectPhaseLabel value={project.projectPhase} />
              </td>
              <td className={adminTableBodyCellClass}>
                <ProjectIndustryLabel value={project.industry} />
              </td>
              <td className={adminTableBodyCellClass}>
                <ProjectTypeLabel value={project.projectType} />
              </td>
              <td className={adminTableBodyCellClass}>
                <ProjectStatusLabel value={project.status} />
              </td>
              <td className={adminTableBodyCellClass}>
                <ProjectStatusBadge
                  published={project.published}
                  hidden={project.hidden}
                  archived={project.archived}
                />
              </td>
              <td className={adminTableBodyCellClass}>
                <ProjectFeaturedFlags
                  featuredOnHome={project.featuredOnHome}
                  featuredOnAbout={project.featuredOnAbout}
                />
              </td>
              <td className={adminTableBodyCellClass}>
                <span
                  className={
                    project.coverImageUrl
                      ? "inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700"
                      : "inline-flex rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-600"
                  }
                >
                  {project.coverImageUrl ? "Yes" : "No"}
                </span>
              </td>
              <td className={adminTableBodyCellClass}>{project.displayOrder}</td>
              <td className={`${adminTableBodyCellClass} whitespace-nowrap text-tb-text-muted`}>
                {formatDate(project.updatedAt)}
              </td>
              <td className={adminTableBodyCellClass}>
                <div className="flex flex-col gap-1">
                  <Link href={`/admin/projects/${project.id}`} className={adminBtnGhostClass}>
                    Edit
                  </Link>
                  <QuickToggleForm
                    action={toggleProjectPublishedAction}
                    id={project.id}
                    field="published"
                    value={project.published}
                    label={project.published ? "Unpublish" : "Publish"}
                  />
                  <QuickToggleForm
                    action={toggleProjectHiddenAction}
                    id={project.id}
                    field="hidden"
                    value={project.hidden}
                    label={project.hidden ? "Unhide" : "Hide"}
                  />
                  <QuickToggleForm
                    action={toggleProjectArchivedAction}
                    id={project.id}
                    field="archived"
                    value={project.archived}
                    label={project.archived ? "Unarchive" : "Archive"}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminTableShell>
  );
}
