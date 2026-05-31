import Link from "next/link";
import {
  toggleProjectArchivedAction,
  toggleProjectHiddenAction,
  toggleProjectPublishedAction,
} from "@/lib/admin/projects/actions";
import type { Project } from "@/lib/admin/projects/types";
import {
  ProjectFeaturedFlags,
  ProjectStatusBadge,
  ProjectStatusLabel,
  ProjectTypeLabel,
} from "./project-status-badge";

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
    <div className="overflow-x-auto rounded-lg border border-tb-navy-border bg-tb-surface">
      <table className="min-w-full divide-y divide-tb-navy-border text-sm">
        <thead className="bg-tb-surface-muted">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Title</th>
            <th className="px-4 py-3 text-left font-medium">Type</th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
            <th className="px-4 py-3 text-left font-medium">Visibility</th>
            <th className="px-4 py-3 text-left font-medium">Featured</th>
            <th className="px-4 py-3 text-left font-medium">Order</th>
            <th className="px-4 py-3 text-left font-medium">Updated</th>
            <th className="px-4 py-3 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-tb-navy-border">
          {projects.map((project) => (
            <tr key={project.id} className="align-top">
              <td className="px-4 py-3">
                <div className="font-medium">{project.title}</div>
                <div className="text-xs text-tb-text-muted">{project.slug}</div>
              </td>
              <td className="px-4 py-3">
                <ProjectTypeLabel value={project.projectType} />
              </td>
              <td className="px-4 py-3">
                <ProjectStatusLabel value={project.status} />
              </td>
              <td className="px-4 py-3">
                <ProjectStatusBadge
                  published={project.published}
                  hidden={project.hidden}
                  archived={project.archived}
                />
              </td>
              <td className="px-4 py-3">
                <ProjectFeaturedFlags
                  featuredOnHome={project.featuredOnHome}
                  featuredOnAbout={project.featuredOnAbout}
                />
              </td>
              <td className="px-4 py-3">{project.displayOrder}</td>
              <td className="px-4 py-3 whitespace-nowrap text-tb-text-muted">
                {formatDate(project.updatedAt)}
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-col gap-1">
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="font-medium text-tb-blue hover:underline"
                  >
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
    </div>
  );
}
