import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { VideoForm } from "@/components/admin/video-form";
import { requireAdminSession } from "@/lib/admin/page-guard";
import {
  getMediaOptions,
  getProjectOptions,
} from "@/lib/admin/shared/relation-options";
import { formatAdminDateLong } from "@/lib/admin/shared/validation";
import { getVideoById } from "@/lib/admin/videos/queries";
import { videoToFormValues } from "@/lib/admin/videos/validation";

export const metadata = {
  title: "Edit video | Parth Admin",
};

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminEditVideoPage({
  params,
  searchParams,
}: PageProps) {
  const admin = await requireAdminSession();
  const { id } = await params;
  const query = await searchParams;

  const [video, projectOptions, mediaOptions] = await Promise.all([
    getVideoById(id),
    getProjectOptions(),
    getMediaOptions(),
  ]);

  if (!video) {
    return (
      <AdminShell admin={admin}>
        <div className="mx-auto max-w-lg space-y-4 rounded-lg border border-tb-navy-border bg-tb-surface p-8 text-center">
          <h1 className="text-xl font-semibold">Video not found</h1>
          <p className="text-sm text-tb-text-muted">
            This video may have been removed or the link is incorrect.
          </p>
          <Link
            href="/admin/videos"
            className="inline-flex rounded-md bg-tb-blue px-4 py-2 text-sm font-medium text-white hover:bg-tb-blue-hover"
          >
            Back to videos
          </Link>
        </div>
      </AdminShell>
    );
  }

  const saved = query.saved === "1";

  return (
    <AdminShell admin={admin}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Edit video</h1>
          <p className="mt-2 text-sm text-tb-text-muted">{video.title}</p>
          {saved ? (
            <p className="mt-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
              Video saved successfully.
            </p>
          ) : null}
        </div>

        <VideoForm
          mode="edit"
          recordId={video.id}
          initialValues={videoToFormValues(video)}
          updatedAt={formatAdminDateLong(video.updatedAt)}
          projectOptions={projectOptions}
          mediaOptions={mediaOptions}
        />
      </div>
    </AdminShell>
  );
}
