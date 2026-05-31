import Link from "next/link";
import {
  FeaturedFlags,
  VisibilityBadges,
} from "@/components/admin/admin-list-shared";
import { QuickToggleForm } from "@/components/admin/quick-toggle-form";
import {
  toggleProofHiddenAction,
  toggleProofPublishedAction,
} from "@/lib/admin/proof/actions";
import { PROOF_TYPE_LABELS } from "@/lib/admin/proof/constants";
import type { ProofItem } from "@/lib/admin/proof/types";
import {
  optionLabel,
  type RelationOption,
} from "@/lib/admin/shared/relation-options";

type ProofTableProps = {
  items: ProofItem[];
  projectOptions: RelationOption[];
};

function formatDate(value: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

export function ProofTable({ items, projectOptions }: ProofTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-tb-navy-border bg-tb-surface">
      <table className="min-w-full divide-y divide-tb-navy-border text-sm">
        <thead className="bg-tb-surface-muted">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Title</th>
            <th className="px-4 py-3 text-left font-medium">Type</th>
            <th className="px-4 py-3 text-left font-medium">Project</th>
            <th className="px-4 py-3 text-left font-medium">Visibility</th>
            <th className="px-4 py-3 text-left font-medium">Featured</th>
            <th className="px-4 py-3 text-left font-medium">Order</th>
            <th className="px-4 py-3 text-left font-medium">Updated</th>
            <th className="px-4 py-3 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-tb-navy-border">
          {items.map((item) => (
            <tr key={item.id} className="align-top">
              <td className="px-4 py-3">
                <div className="font-medium">{item.title}</div>
                <div className="text-xs text-tb-text-muted">{item.slug}</div>
              </td>
              <td className="px-4 py-3">
                {PROOF_TYPE_LABELS[item.proofType] ?? item.proofType}
              </td>
              <td className="px-4 py-3">
                {optionLabel(projectOptions, item.relatedProjectId)}
              </td>
              <td className="px-4 py-3">
                <VisibilityBadges
                  published={item.published}
                  hidden={item.hidden}
                />
              </td>
              <td className="px-4 py-3">
                <FeaturedFlags
                  featuredOnHome={item.featuredOnHome}
                  featuredOnAbout={item.featuredOnAbout}
                />
              </td>
              <td className="px-4 py-3">{item.displayOrder}</td>
              <td className="px-4 py-3 whitespace-nowrap text-tb-text-muted">
                {formatDate(item.updatedAt)}
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-col gap-1">
                  <Link
                    href={`/admin/proof/${item.id}`}
                    className="font-medium text-tb-blue hover:underline"
                  >
                    Edit
                  </Link>
                  <QuickToggleForm
                    action={toggleProofPublishedAction}
                    id={item.id}
                    field="published"
                    value={item.published}
                    label={item.published ? "Unpublish" : "Publish"}
                  />
                  <QuickToggleForm
                    action={toggleProofHiddenAction}
                    id={item.id}
                    field="hidden"
                    value={item.hidden}
                    label={item.hidden ? "Unhide" : "Hide"}
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
