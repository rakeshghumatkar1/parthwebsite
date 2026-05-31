import Link from "next/link";
import {
  FeaturedFlags,
  VisibilityBadges,
} from "@/components/admin/admin-list-shared";
import { QuickToggleForm } from "@/components/admin/quick-toggle-form";
import {
  toggleUpdateHiddenAction,
  toggleUpdatePublishedAction,
} from "@/lib/admin/updates/actions";
import { UPDATE_TYPE_LABELS } from "@/lib/admin/updates/constants";
import type { Update } from "@/lib/admin/updates/types";
import {
  adminBtnGhostClass,
  adminTableBodyCellClass,
  adminTableHeadCellClass,
} from "@/lib/admin/admin-ui";
import { optionLabel, type RelationOption } from "@/lib/admin/shared/relation-options";
import { AdminTableShell } from "./ui/admin-table-shell";

type UpdateTableProps = {
  updates: Update[];
  projectOptions: RelationOption[];
};

function formatDate(value: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

export function UpdateTable({ updates, projectOptions }: UpdateTableProps) {
  return (
    <AdminTableShell>
      <table className="min-w-full divide-y divide-slate-100 text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className={adminTableHeadCellClass}>Title</th>
            <th className={adminTableHeadCellClass}>Type</th>
            <th className={adminTableHeadCellClass}>Visibility</th>
            <th className={adminTableHeadCellClass}>Featured</th>
            <th className={adminTableHeadCellClass}>Project</th>
            <th className={adminTableHeadCellClass}>Order</th>
            <th className={adminTableHeadCellClass}>Updated</th>
            <th className={adminTableHeadCellClass}>Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {updates.map((update) => (
            <tr key={update.id} className="hover:bg-slate-50/80">
              <td className={adminTableBodyCellClass}>
                <div className="font-medium">{update.title}</div>
                <div className="text-xs text-tb-text-muted">{update.slug}</div>
              </td>
              <td className={adminTableBodyCellClass}>
                {UPDATE_TYPE_LABELS[update.updateType] ?? update.updateType}
              </td>
              <td className={adminTableBodyCellClass}>
                <VisibilityBadges
                  published={update.published}
                  hidden={update.hidden}
                />
              </td>
              <td className={adminTableBodyCellClass}>
                <FeaturedFlags featuredOnHome={update.featuredOnHome} />
              </td>
              <td className={adminTableBodyCellClass}>
                {optionLabel(projectOptions, update.relatedProjectId)}
              </td>
              <td className={adminTableBodyCellClass}>{update.displayOrder}</td>
              <td className={`${adminTableBodyCellClass} whitespace-nowrap text-tb-text-muted`}>
                {formatDate(update.updatedAt)}
              </td>
              <td className={adminTableBodyCellClass}>
                <div className="flex flex-col gap-1">
                  <Link href={`/admin/updates/${update.id}`} className={adminBtnGhostClass}>
                    Edit
                  </Link>
                  <QuickToggleForm
                    action={toggleUpdatePublishedAction}
                    id={update.id}
                    field="published"
                    value={update.published}
                    label={update.published ? "Unpublish" : "Publish"}
                  />
                  <QuickToggleForm
                    action={toggleUpdateHiddenAction}
                    id={update.id}
                    field="hidden"
                    value={update.hidden}
                    label={update.hidden ? "Unhide" : "Hide"}
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
