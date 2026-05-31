import Link from "next/link";
import { UrlStatus } from "@/components/admin/admin-list-shared";
import {
  MEDIA_DISPLAY_MODE_OPTIONS,
  MEDIA_ROLE_OPTIONS,
} from "@/lib/admin/media/constants";
import type { Media } from "@/lib/admin/media/types";
import { optionLabel, type RelationOption } from "@/lib/admin/shared/relation-options";
import { parseParthBlobFolder, isParthBlobUploadUrl } from "@/lib/blob/path";
import { UPLOAD_FOLDER_OPTIONS } from "@/lib/blob/constants";

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
    <div className="overflow-x-auto rounded-lg border border-tb-navy-border bg-tb-surface">
      <table className="min-w-full divide-y divide-tb-navy-border text-sm">
        <thead className="bg-tb-surface-muted">
          <tr>
            <th className="px-4 py-3 text-left font-medium">File</th>
            <th className="px-4 py-3 text-left font-medium">Source</th>
            <th className="px-4 py-3 text-left font-medium">Folder</th>
            <th className="px-4 py-3 text-left font-medium">Type</th>
            <th className="px-4 py-3 text-left font-medium">Role</th>
            <th className="px-4 py-3 text-left font-medium">Display</th>
            <th className="px-4 py-3 text-left font-medium">Project</th>
            <th className="px-4 py-3 text-left font-medium">URL</th>
            <th className="px-4 py-3 text-left font-medium">Updated</th>
            <th className="px-4 py-3 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-tb-navy-border">
          {mediaRecords.map((record) => (
            <tr key={record.id} className="align-top">
              <td className="px-4 py-3">
                <div className="font-medium">
                  {record.fileName || "Untitled"}
                </div>
                <div className="max-w-xs truncate text-xs text-tb-text-muted">
                  {record.fileUrl}
                </div>
              </td>
              <td className="px-4 py-3">{sourceLabel(record.fileUrl)}</td>
              <td className="px-4 py-3">{folderLabel(record.fileUrl)}</td>
              <td className="px-4 py-3">{record.fileType ?? "—"}</td>
              <td className="px-4 py-3">{roleLabel(record.imageRole)}</td>
              <td className="px-4 py-3">
                {displayModeLabel(record.imageDisplayMode)}
              </td>
              <td className="px-4 py-3">
                {optionLabel(projectOptions, record.relatedProjectId)}
              </td>
              <td className="px-4 py-3">
                <UrlStatus url={record.fileUrl} />
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-tb-text-muted">
                {formatDate(record.updatedAt)}
              </td>
              <td className="px-4 py-3">
                <Link
                  href={`/admin/media/${record.id}`}
                  className="font-medium text-tb-blue hover:underline"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
