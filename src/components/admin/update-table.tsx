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
import { optionLabel, type RelationOption } from "@/lib/admin/shared/relation-options";

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
    <div className="overflow-x-auto rounded-lg border border-tb-navy-border bg-tb-surface">
      <table className="min-w-full divide-y divide-tb-navy-border text-sm">
        <thead className="bg-tb-surface-muted">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Title</th>
            <th className="px-4 py-3 text-left font-medium">Type</th>
            <th className="px-4 py-3 text-left font-medium">Visibility</th>
            <th className="px-4 py-3 text-left font-medium">Featured</th>
            <th className="px-4 py-3 text-left font-medium">Project</th>
            <th className="px-4 py-3 text-left font-medium">Order</th>
            <th className="px-4 py-3 text-left font-medium">Updated</th>
            <th className="px-4 py-3 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-tb-navy-border">
          {updates.map((update) => (
            <tr key={update.id} className="align-top">
              <td className="px-4 py-3">
                <div className="font-medium">{update.title}</div>
                <div className="text-xs text-tb-text-muted">{update.slug}</div>
              </td>
              <td className="px-4 py-3">
                {UPDATE_TYPE_LABELS[update.updateType] ?? update.updateType}
              </td>
              <td className="px-4 py-3">
                <VisibilityBadges
                  published={update.published}
                  hidden={update.hidden}
                />
              </td>
              <td className="px-4 py-3">
                <FeaturedFlags featuredOnHome={update.featuredOnHome} />
              </td>
              <td className="px-4 py-3">
                {optionLabel(projectOptions, update.relatedProjectId)}
              </td>
              <td className="px-4 py-3">{update.displayOrder}</td>
              <td className="px-4 py-3 whitespace-nowrap text-tb-text-muted">
                {formatDate(update.updatedAt)}
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-col gap-1">
                  <Link
                    href={`/admin/updates/${update.id}`}
                    className="font-medium text-tb-blue hover:underline"
                  >
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
    </div>
  );
}
