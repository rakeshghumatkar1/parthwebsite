"use client";

import Link from "next/link";
import {
  AdminField,
  adminInputClassName,
} from "@/components/admin/admin-auth-panel";
import { AdminCmsNotice } from "@/components/admin/admin-cms-notice";
import { AdminFormSection } from "@/components/admin/admin-form-section";
import { AdminHelpBox } from "@/components/admin/admin-help-box";
import { RelationSelect } from "@/components/admin/admin-list-shared";
import {
  BLOB_PREFIX_RULE,
  FIELD_HINTS,
} from "@/lib/admin/cms-guidance";
import {
  adminBtnPrimaryClass,
  adminBtnSecondaryClass,
  adminActionRailClass,
} from "@/lib/admin/admin-ui";
import {
  MEDIA_DISPLAY_MODE_OPTIONS,
  MEDIA_ROLE_OPTIONS,
} from "@/lib/admin/media/constants";
import type { RelationOption } from "@/lib/admin/shared/relation-options";
import {
  MAX_UPLOAD_BYTES,
  UPLOAD_FOLDER_OPTIONS,
  UPLOAD_MIME_LABELS,
} from "@/lib/blob/constants";

type MediaUploadFormProps = {
  uploadConfigured: boolean;
  errorMessage?: string;
  projectOptions: RelationOption[];
  videoOptions: RelationOption[];
  proofOptions: RelationOption[];
};

export function MediaUploadForm({
  uploadConfigured,
  errorMessage,
  projectOptions,
  videoOptions,
  proofOptions,
}: MediaUploadFormProps) {
  const maxMb = Math.floor(MAX_UPLOAD_BYTES / (1024 * 1024));
  const allowedTypes = Object.values(UPLOAD_MIME_LABELS).join(", ");

  return (
    <form
      action="/admin/media/upload"
      method="post"
      encType="multipart/form-data"
      className="mx-auto max-w-3xl space-y-6"
    >
      {errorMessage ? (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {errorMessage}
        </div>
      ) : null}

      {!uploadConfigured ? (
        <div
          role="alert"
          className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
        >
          Blob upload is not configured. Set BLOB_READ_WRITE_TOKEN in the server
          environment, or use Add by URL instead.
        </div>
      ) : null}

      <AdminCmsNotice />
      <AdminHelpBox title="Shared Blob store — parthwebsite/ only">
        <ul className="list-disc space-y-1 pl-5">
          <li>{BLOB_PREFIX_RULE}</li>
          <li>Files upload to the shared thinkbigdigital-blob store under parthwebsite/ only.</li>
          <li>Do not upload private or sensitive files.</li>
          <li>Use PDFs, images, screenshots, and thumbnails for public website assets only.</li>
          <li>Other website files in the shared store are never listed or touched.</li>
          <li>Delete from Blob is not available in this phase.</li>
        </ul>
      </AdminHelpBox>

      <AdminFormSection
        title="Upload file"
        description={`Images and PDFs up to ${maxMb} MB. Allowed: ${allowedTypes}.`}
      >
        <AdminField
          id="uploadFolder"
          label="Upload folder"
          hint="Server assigns the final path — custom folders are not allowed."
        >
          <select
            id="uploadFolder"
            name="uploadFolder"
            required
            disabled={!uploadConfigured}
            defaultValue="projects"
            className={adminInputClassName(false)}
          >
            {UPLOAD_FOLDER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} ({option.path})
              </option>
            ))}
          </select>
        </AdminField>

        <AdminField id="file" label="File" hint="Choose one file per upload.">
          <input
            id="file"
            name="file"
            type="file"
            required
            disabled={!uploadConfigured}
            accept="image/jpeg,image/png,image/webp,image/gif,application/pdf,text/plain,text/markdown"
            className={adminInputClassName(false)}
          />
        </AdminField>
      </AdminFormSection>

      <AdminFormSection
        title="Image metadata"
        description="Optional but recommended for images on public pages."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField
            id="imageRole"
            label="Image role"
            hint={FIELD_HINTS.imageRole}
          >
            <select
              id="imageRole"
              name="imageRole"
              defaultValue=""
              className={adminInputClassName(false)}
            >
              <option value="">None</option>
              {MEDIA_ROLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </AdminField>

          <AdminField
            id="imageDisplayMode"
            label="Display mode"
            hint={FIELD_HINTS.imageDisplayMode}
          >
            <select
              id="imageDisplayMode"
              name="imageDisplayMode"
              defaultValue=""
              className={adminInputClassName(false)}
            >
              <option value="">None</option>
              {MEDIA_DISPLAY_MODE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </AdminField>
        </div>

        <AdminField id="altText" label="Alt text" hint={FIELD_HINTS.altText}>
          <input
            id="altText"
            name="altText"
            className={adminInputClassName(false)}
          />
        </AdminField>

        <AdminField id="caption" label="Caption">
          <textarea
            id="caption"
            name="caption"
            rows={2}
            className={adminInputClassName(false)}
          />
        </AdminField>
      </AdminFormSection>

      <AdminFormSection
        title="Related content"
        description="Optional back-links to projects, proof, or videos."
      >
        <RelationSelect
          id="relatedProjectId"
          name="relatedProjectId"
          label="Related project"
          options={projectOptions}
          defaultValue=""
        />
        <RelationSelect
          id="relatedProofId"
          name="relatedProofId"
          label="Related proof"
          options={proofOptions}
          defaultValue=""
        />
        <RelationSelect
          id="relatedVideoId"
          name="relatedVideoId"
          label="Related video"
          options={videoOptions}
          defaultValue=""
        />
      </AdminFormSection>

      <div className={`${adminActionRailClass} flex flex-wrap items-center gap-3`}>
        <Link href="/admin/media" className={adminBtnSecondaryClass}>
          Back to media
        </Link>
        <button
          type="submit"
          disabled={!uploadConfigured}
          className={`ml-auto disabled:opacity-60 ${adminBtnPrimaryClass}`}
        >
          Upload file
        </button>
      </div>
    </form>
  );
}
