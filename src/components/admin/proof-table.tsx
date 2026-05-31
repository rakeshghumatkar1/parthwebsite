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
  adminBtnGhostClass,
  adminTableBodyCellClass,
  adminTableHeadCellClass,
} from "@/lib/admin/admin-ui";
import {
  optionLabel,
  type RelationOption,
} from "@/lib/admin/shared/relation-options";
import { AdminTableShell } from "./ui/admin-table-shell";

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
    <AdminTableShell>
      <table className="min-w-full divide-y divide-slate-100 text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className={adminTableHeadCellClass}>Title</th>
            <th className={adminTableHeadCellClass}>Type</th>
            <th className={adminTableHeadCellClass}>Project</th>
            <th className={adminTableHeadCellClass}>Visibility</th>
            <th className={adminTableHeadCellClass}>Featured</th>
            <th className={adminTableHeadCellClass}>Order</th>
            <th className={adminTableHeadCellClass}>Updated</th>
            <th className={adminTableHeadCellClass}>Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50/80">
              <td className={adminTableBodyCellClass}>
                <div className="font-medium">{item.title}</div>
                <div className="text-xs text-tb-text-muted">{item.slug}</div>
              </td>
              <td className={adminTableBodyCellClass}>
                {PROOF_TYPE_LABELS[item.proofType] ?? item.proofType}
              </td>
              <td className={adminTableBodyCellClass}>
                {optionLabel(projectOptions, item.relatedProjectId)}
              </td>
              <td className={adminTableBodyCellClass}>
                <VisibilityBadges
                  published={item.published}
                  hidden={item.hidden}
                />
              </td>
              <td className={adminTableBodyCellClass}>
                <FeaturedFlags
                  featuredOnHome={item.featuredOnHome}
                  featuredOnAbout={item.featuredOnAbout}
                />
              </td>
              <td className={adminTableBodyCellClass}>{item.displayOrder}</td>
              <td className={`${adminTableBodyCellClass} whitespace-nowrap text-tb-text-muted`}>
                {formatDate(item.updatedAt)}
              </td>
              <td className={adminTableBodyCellClass}>
                <div className="flex flex-col gap-1">
                  <Link href={`/admin/proof/${item.id}`} className={adminBtnGhostClass}>
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
    </AdminTableShell>
  );
}
