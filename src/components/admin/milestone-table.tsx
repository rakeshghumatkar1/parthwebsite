import Link from "next/link";
import {
  FeaturedFlags,
  VisibilityBadges,
} from "@/components/admin/admin-list-shared";
import { QuickToggleForm } from "@/components/admin/quick-toggle-form";
import {
  toggleMilestoneHiddenAction,
  toggleMilestonePublishedAction,
} from "@/lib/admin/milestones/actions";
import { MILESTONE_CATEGORY_LABELS } from "@/lib/admin/milestones/constants";
import type { Milestone } from "@/lib/admin/milestones/types";
import {
  adminBtnGhostClass,
  adminTableBodyCellClass,
  adminTableHeadCellClass,
} from "@/lib/admin/admin-ui";
import { formatAdminDate } from "@/lib/admin/shared/validation";
import { optionLabel, type RelationOption } from "@/lib/admin/shared/relation-options";
import { AdminTableShell } from "./ui/admin-table-shell";

type MilestoneTableProps = {
  milestones: Milestone[];
  projectOptions: RelationOption[];
};

export function MilestoneTable({
  milestones,
  projectOptions,
}: MilestoneTableProps) {
  return (
    <AdminTableShell>
      <table className="min-w-full divide-y divide-slate-100 text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className={adminTableHeadCellClass}>Title</th>
            <th className={adminTableHeadCellClass}>Event</th>
            <th className={adminTableHeadCellClass}>Category</th>
            <th className={adminTableHeadCellClass}>Project</th>
            <th className={adminTableHeadCellClass}>Visibility</th>
            <th className={adminTableHeadCellClass}>Featured</th>
            <th className={adminTableHeadCellClass}>Order</th>
            <th className={adminTableHeadCellClass}>Updated</th>
            <th className={adminTableHeadCellClass}>Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {milestones.map((milestone) => (
            <tr key={milestone.id} className="hover:bg-slate-50/80">
              <td className={adminTableBodyCellClass}>
                <div className="font-medium">{milestone.title}</div>
                {milestone.shortDescription ? (
                  <div className="mt-0.5 line-clamp-2 text-xs text-tb-text-muted">
                    {milestone.shortDescription}
                  </div>
                ) : null}
              </td>
              <td className={adminTableBodyCellClass}>
                <div>{milestone.eventLabel ?? "—"}</div>
                {milestone.eventDate ? (
                  <div className="text-xs text-tb-text-muted">
                    {milestone.eventDate}
                  </div>
                ) : null}
              </td>
              <td className={adminTableBodyCellClass}>
                {milestone.category
                  ? (MILESTONE_CATEGORY_LABELS[milestone.category] ??
                    milestone.category)
                  : "—"}
              </td>
              <td className={adminTableBodyCellClass}>
                {optionLabel(projectOptions, milestone.relatedProjectId)}
              </td>
              <td className={adminTableBodyCellClass}>
                <VisibilityBadges
                  published={milestone.published}
                  hidden={milestone.hidden}
                />
              </td>
              <td className={adminTableBodyCellClass}>
                <FeaturedFlags
                  featuredOnHome={milestone.featuredOnHome}
                  featuredOnAbout={milestone.featuredOnAbout}
                />
              </td>
              <td className={adminTableBodyCellClass}>{milestone.displayOrder}</td>
              <td className={`${adminTableBodyCellClass} whitespace-nowrap text-tb-text-muted`}>
                {formatAdminDate(milestone.updatedAt)}
              </td>
              <td className={adminTableBodyCellClass}>
                <div className="flex flex-col gap-1">
                  <Link href={`/admin/milestones/${milestone.id}`} className={adminBtnGhostClass}>
                    Edit
                  </Link>
                  <QuickToggleForm
                    action={toggleMilestonePublishedAction}
                    id={milestone.id}
                    field="published"
                    value={milestone.published}
                    label={milestone.published ? "Unpublish" : "Publish"}
                  />
                  <QuickToggleForm
                    action={toggleMilestoneHiddenAction}
                    id={milestone.id}
                    field="hidden"
                    value={milestone.hidden}
                    label={milestone.hidden ? "Unhide" : "Hide"}
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
