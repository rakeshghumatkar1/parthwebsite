import { Suspense } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { MediaForm } from "@/components/admin/media-form";
import { MediaNewModeTabs } from "@/components/admin/media-new-mode-tabs";
import { MediaUploadForm } from "@/components/admin/media-upload-form";
import { requireAdminSession } from "@/lib/admin/page-guard";
import {
  getProjectOptions,
  getProofOptions,
  getVideoOptions,
} from "@/lib/admin/shared/relation-options";
import { isBlobUploadConfigured } from "@/lib/blob/constants";

export const metadata = {
  title: "New media | Parth Admin",
};

type PageProps = {
  searchParams: Promise<{ mode?: string; error?: string }>;
};

export default async function AdminNewMediaPage({ searchParams }: PageProps) {
  const admin = await requireAdminSession();
  const params = await searchParams;
  const mode = params.mode === "upload" ? "upload" : "url";
  const errorMessage = params.error?.trim() || undefined;

  const [projectOptions, videoOptions, proofOptions] = await Promise.all([
    getProjectOptions(),
    getVideoOptions(),
    getProofOptions(),
  ]);

  const uploadConfigured = isBlobUploadConfigured();

  return (
    <AdminShell admin={admin}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Add media record</h1>
          <p className="mt-2 text-sm text-tb-text-muted">
            Paste an approved file URL or upload a public website asset to Vercel
            Blob under parthwebsite/.
          </p>
        </div>

        <Suspense fallback={null}>
          <MediaNewModeTabs activeMode={mode} />
        </Suspense>

        {mode === "upload" ? (
          <MediaUploadForm
            uploadConfigured={uploadConfigured}
            errorMessage={errorMessage}
            projectOptions={projectOptions}
            videoOptions={videoOptions}
            proofOptions={proofOptions}
          />
        ) : (
          <MediaForm
            mode="create"
            projectOptions={projectOptions}
            videoOptions={videoOptions}
            proofOptions={proofOptions}
          />
        )}
      </div>
    </AdminShell>
  );
}
