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
import { formatAdminDate } from "@/lib/admin/shared/validation";
import { optionLabel, type RelationOption } from "@/lib/admin/shared/relation-options";

type MilestoneTableProps = {
  milestones: Milestone[];
  projectOptions: RelationOption[];
};

export function MilestoneTable({
  milestones,
  projectOptions,
}: MilestoneTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-tb-navy-border bg-tb-surface">
      <table className="min-w-full divide-y divide-tb-navy-border text-sm">
        <thead className="bg-tb-surface-muted">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Title</th>
            <th className="px-4 py-3 text-left font-medium">Event</th>
            <th className="px-4 py-3 text-left font-medium">Category</th>
            <th className="px-4 py-3 text-left font-medium">Project</th>
            <th className="px-4 py-3 text-left font-medium">Visibility</th>
            <th className="px-4 py-3 text-left font-medium">Featured</th>
            <th className="px-4 py-3 text-left font-medium">Order</th>
            <th className="px-4 py-3 text-left font-medium">Updated</th>
            <th className="px-4 py-3 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-tb-navy-border">
          {milestones.map((milestone) => (
            <tr key={milestone.id} className="align-top">
              <td className="px-4 py-3">
                <div className="font-medium">{milestone.title}</div>
                {milestone.shortDescription ? (
                  <div className="mt-0.5 line-clamp-2 text-xs text-tb-text-muted">
                    {milestone.shortDescription}
                  </div>
                ) : null}
              </td>
              <td className="px-4 py-3">
                <div>{milestone.eventLabel ?? "—"}</div>
                {milestone.eventDate ? (
                  <div className="text-xs text-tb-text-muted">
                    {milestone.eventDate}
                  </div>
                ) : null}
              </td>
              <td className="px-4 py-3">
                {milestone.category
                  ? (MILESTONE_CATEGORY_LABELS[milestone.category] ??
                    milestone.category)
                  : "—"}
              </td>
              <td className="px-4 py-3">
                {optionLabel(projectOptions, milestone.relatedProjectId)}
              </td>
              <td className="px-4 py-3">
                <VisibilityBadges
                  published={milestone.published}
                  hidden={milestone.hidden}
                />
              </td>
              <td className="px-4 py-3">
                <FeaturedFlags
                  featuredOnHome={milestone.featuredOnHome}
                  featuredOnAbout={milestone.featuredOnAbout}
                />
              </td>
              <td className="px-4 py-3">{milestone.displayOrder}</td>
              <td className="px-4 py-3 whitespace-nowrap text-tb-text-muted">
                {formatAdminDate(milestone.updatedAt)}
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-col gap-1">
                  <Link
                    href={`/admin/milestones/${milestone.id}`}
                    className="font-medium text-tb-blue hover:underline"
                  >
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
    </div>
  );
}
