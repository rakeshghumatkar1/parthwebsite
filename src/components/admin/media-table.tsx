import Link from "next/link";
import { UrlStatus } from "@/components/admin/admin-list-shared";
import {
  MEDIA_DISPLAY_MODE_OPTIONS,
  MEDIA_ROLE_OPTIONS,
} from "@/lib/admin/media/constants";
import type { Media } from "@/lib/admin/media/types";
import {
  adminBtnGhostClass,
  adminTableBodyCellClass,
  adminTableHeadCellClass,
} from "@/lib/admin/admin-ui";
import { optionLabel, type RelationOption } from "@/lib/admin/shared/relation-options";
import { parseParthBlobFolder, isParthBlobUploadUrl } from "@/lib/blob/path";
import { UPLOAD_FOLDER_OPTIONS } from "@/lib/blob/constants";
import { AdminTableShell } from "./ui/admin-table-shell";

type MediaTableProps = {
  mediaRecords: Media[];
  projectOptions: RelationOption[];
};

function formatDate(value: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

function roleLabel(value: string | null): string {
  if (!value) return "—";
  return MEDIA_ROLE_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

function displayModeLabel(value: string | null): string {
  if (!value) return "—";
  return MEDIA_DISPLAY_MODE_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

function sourceLabel(fileUrl: string): string {
  return isParthBlobUploadUrl(fileUrl) ? "Uploaded" : "External URL";
}

function folderLabel(fileUrl: string): string {
  const folder = parseParthBlobFolder(fileUrl);
  if (!folder) return "—";
  return UPLOAD_FOLDER_OPTIONS.find((o) => o.value === folder)?.label ?? folder;
}

export function MediaTable({ mediaRecords, projectOptions }: MediaTableProps) {
  return (
    <AdminTableShell>
      <table className="min-w-full divide-y divide-slate-100 text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className={adminTableHeadCellClass}>File</th>
            <th className={adminTableHeadCellClass}>Source</th>
            <th className={adminTableHeadCellClass}>Folder</th>
            <th className={adminTableHeadCellClass}>Type</th>
            <th className={adminTableHeadCellClass}>Role</th>
            <th className={adminTableHeadCellClass}>Display</th>
            <th className={adminTableHeadCellClass}>Project</th>
            <th className={adminTableHeadCellClass}>URL</th>
            <th className={adminTableHeadCellClass}>Updated</th>
            <th className={adminTableHeadCellClass}>Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {mediaRecords.map((record) => (
            <tr key={record.id} className="hover:bg-slate-50/80">
              <td className={adminTableBodyCellClass}>
                <div className="font-medium">
                  {record.fileName || "Untitled"}
                </div>
                <div className="max-w-xs truncate text-xs text-tb-text-muted">
                  {record.fileUrl}
                </div>
              </td>
              <td className={adminTableBodyCellClass}>{sourceLabel(record.fileUrl)}</td>
              <td className={adminTableBodyCellClass}>{folderLabel(record.fileUrl)}</td>
              <td className={adminTableBodyCellClass}>{record.fileType ?? "—"}</td>
              <td className={adminTableBodyCellClass}>{roleLabel(record.imageRole)}</td>
              <td className={adminTableBodyCellClass}>
                {displayModeLabel(record.imageDisplayMode)}
              </td>
              <td className={adminTableBodyCellClass}>
                {optionLabel(projectOptions, record.relatedProjectId)}
              </td>
              <td className={adminTableBodyCellClass}>
                <UrlStatus url={record.fileUrl} />
              </td>
              <td className={`${adminTableBodyCellClass} whitespace-nowrap text-tb-text-muted`}>
                {formatDate(record.updatedAt)}
              </td>
              <td className={adminTableBodyCellClass}>
                <Link href={`/admin/media/${record.id}`} className={adminBtnGhostClass}>
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminTableShell>
  );
}
