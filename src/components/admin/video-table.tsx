import Link from "next/link";
import {
  FeaturedFlags,
  UrlStatus,
  VisibilityBadges,
} from "@/components/admin/admin-list-shared";
import { QuickToggleForm } from "@/components/admin/quick-toggle-form";
import {
  toggleVideoHiddenAction,
  toggleVideoPublishedAction,
} from "@/lib/admin/videos/actions";
import { VIDEO_CATEGORY_LABELS } from "@/lib/admin/videos/constants";
import type { Video } from "@/lib/admin/videos/types";
import {
  adminBtnGhostClass,
  adminTableBodyCellClass,
  adminTableHeadCellClass,
} from "@/lib/admin/admin-ui";
import { formatAdminDate } from "@/lib/admin/shared/validation";
import { optionLabel, type RelationOption } from "@/lib/admin/shared/relation-options";
import { AdminTableShell } from "./ui/admin-table-shell";

type VideoTableProps = {
  videos: Video[];
  projectOptions: RelationOption[];
};

export function VideoTable({ videos, projectOptions }: VideoTableProps) {
  return (
    <AdminTableShell>
      <table className="min-w-full divide-y divide-slate-100 text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className={adminTableHeadCellClass}>Title</th>
            <th className={adminTableHeadCellClass}>Category</th>
            <th className={adminTableHeadCellClass}>YouTube</th>
            <th className={adminTableHeadCellClass}>Project</th>
            <th className={adminTableHeadCellClass}>Visibility</th>
            <th className={adminTableHeadCellClass}>Featured</th>
            <th className={adminTableHeadCellClass}>Order</th>
            <th className={adminTableHeadCellClass}>Updated</th>
            <th className={adminTableHeadCellClass}>Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {videos.map((video) => (
            <tr key={video.id} className="hover:bg-slate-50/80">
              <td className={adminTableBodyCellClass}>
                <div className="font-medium">{video.title}</div>
                <div className="text-xs text-tb-text-muted">{video.slug}</div>
              </td>
              <td className={adminTableBodyCellClass}>
                {video.category
                  ? (VIDEO_CATEGORY_LABELS[video.category] ?? video.category)
                  : "—"}
              </td>
              <td className={adminTableBodyCellClass}>
                <UrlStatus url={video.youtubeUrl} />
              </td>
              <td className={adminTableBodyCellClass}>
                {optionLabel(projectOptions, video.relatedProjectId)}
              </td>
              <td className={adminTableBodyCellClass}>
                <VisibilityBadges
                  published={video.published}
                  hidden={video.hidden}
                />
              </td>
              <td className={adminTableBodyCellClass}>
                <FeaturedFlags
                  featuredOnHome={video.featuredOnHome}
                  featuredOnAbout={video.featuredOnAbout}
                />
              </td>
              <td className={adminTableBodyCellClass}>{video.displayOrder}</td>
              <td className={`${adminTableBodyCellClass} whitespace-nowrap text-tb-text-muted`}>
                {formatAdminDate(video.updatedAt)}
              </td>
              <td className={adminTableBodyCellClass}>
                <div className="flex flex-col gap-1">
                  <Link href={`/admin/videos/${video.id}`} className={adminBtnGhostClass}>
                    Edit
                  </Link>
                  <QuickToggleForm
                    action={toggleVideoPublishedAction}
                    id={video.id}
                    field="published"
                    value={video.published}
                    label={video.published ? "Unpublish" : "Publish"}
                  />
                  <QuickToggleForm
                    action={toggleVideoHiddenAction}
                    id={video.id}
                    field="hidden"
                    value={video.hidden}
                    label={video.hidden ? "Unhide" : "Hide"}
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
