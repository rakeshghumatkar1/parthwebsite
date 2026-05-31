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
import { formatAdminDate } from "@/lib/admin/shared/validation";
import { optionLabel, type RelationOption } from "@/lib/admin/shared/relation-options";

type VideoTableProps = {
  videos: Video[];
  projectOptions: RelationOption[];
};

export function VideoTable({ videos, projectOptions }: VideoTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-tb-navy-border bg-tb-surface">
      <table className="min-w-full divide-y divide-tb-navy-border text-sm">
        <thead className="bg-tb-surface-muted">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Title</th>
            <th className="px-4 py-3 text-left font-medium">Category</th>
            <th className="px-4 py-3 text-left font-medium">YouTube</th>
            <th className="px-4 py-3 text-left font-medium">Project</th>
            <th className="px-4 py-3 text-left font-medium">Visibility</th>
            <th className="px-4 py-3 text-left font-medium">Featured</th>
            <th className="px-4 py-3 text-left font-medium">Order</th>
            <th className="px-4 py-3 text-left font-medium">Updated</th>
            <th className="px-4 py-3 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-tb-navy-border">
          {videos.map((video) => (
            <tr key={video.id} className="align-top">
              <td className="px-4 py-3">
                <div className="font-medium">{video.title}</div>
                <div className="text-xs text-tb-text-muted">{video.slug}</div>
              </td>
              <td className="px-4 py-3">
                {video.category
                  ? (VIDEO_CATEGORY_LABELS[video.category] ?? video.category)
                  : "—"}
              </td>
              <td className="px-4 py-3">
                <UrlStatus url={video.youtubeUrl} />
              </td>
              <td className="px-4 py-3">
                {optionLabel(projectOptions, video.relatedProjectId)}
              </td>
              <td className="px-4 py-3">
                <VisibilityBadges
                  published={video.published}
                  hidden={video.hidden}
                />
              </td>
              <td className="px-4 py-3">
                <FeaturedFlags
                  featuredOnHome={video.featuredOnHome}
                  featuredOnAbout={video.featuredOnAbout}
                />
              </td>
              <td className="px-4 py-3">{video.displayOrder}</td>
              <td className="px-4 py-3 whitespace-nowrap text-tb-text-muted">
                {formatAdminDate(video.updatedAt)}
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-col gap-1">
                  <Link
                    href={`/admin/videos/${video.id}`}
                    className="font-medium text-tb-blue hover:underline"
                  >
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
    </div>
  );
}
