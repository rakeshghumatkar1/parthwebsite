"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  AdminField,
  AdminFormError,
  adminInputClassName,
} from "@/components/admin/admin-auth-panel";
import { AdminCmsNotice } from "@/components/admin/admin-cms-notice";
import { AdminFormSection } from "@/components/admin/admin-form-section";
import { AdminHelpBox } from "@/components/admin/admin-help-box";
import { AdminWhatAppearsWhere } from "@/components/admin/admin-what-appears-where";
import { RelationSelect } from "@/components/admin/admin-list-shared";
import {
  BLOB_PREFIX_RULE,
  FIELD_HINTS,
  MODULE_GUIDANCE,
} from "@/lib/admin/cms-guidance";
import {
  createMediaAction,
  updateMediaAction,
} from "@/lib/admin/media/actions";
import {
  MEDIA_DISPLAY_MODE_OPTIONS,
  MEDIA_ROLE_OPTIONS,
} from "@/lib/admin/media/constants";
import type { RelationOption } from "@/lib/admin/shared/relation-options";
import type { MediaFormState, MediaFormValues } from "@/lib/admin/media/types";
import {
  adminActionRailClass,
  adminBtnPrimaryClass,
  adminBtnSecondaryClass,
} from "@/lib/admin/admin-ui";

const emptyValues: MediaFormValues = {
  fileUrl: "",
  fileName: "",
  fileType: "",
  mimeType: "",
  fileSizeBytes: "",
  altText: "",
  caption: "",
  imageRole: "",
  imageFocalPoint: "",
  imageDisplayMode: "",
  mobileFileUrl: "",
  ogImageUrl: "",
  relatedProjectId: "",
  relatedProofId: "",
  relatedVideoId: "",
  uploadedBy: "",
};

type MediaFormProps = {
  mode: "create" | "edit";
  recordId?: string;
  initialValues?: MediaFormValues;
  updatedAt?: string;
  projectOptions: RelationOption[];
  videoOptions: RelationOption[];
  proofOptions: RelationOption[];
};

export function MediaForm({
  mode,
  recordId,
  initialValues,
  updatedAt,
  projectOptions,
  videoOptions,
  proofOptions,
}: MediaFormProps) {
  const action = mode === "create" ? createMediaAction : updateMediaAction;
  const [state, formAction, pending] = useActionState(action, {
    values: initialValues ?? emptyValues,
  } as MediaFormState);

  const values = state.values ?? initialValues ?? emptyValues;
  const errors = state.errors ?? {};

  return (
    <form action={formAction} className="mx-auto max-w-3xl space-y-6">
      {mode === "edit" && recordId ? (
        <input type="hidden" name="recordId" value={recordId} />
      ) : null}

      <AdminFormError message={errors.form} />

      <AdminCmsNotice />
      <p className="text-sm text-tb-text-muted">{MODULE_GUIDANCE.media.formIntro}</p>

      <AdminHelpBox title="Media sources">
        <p>
          Paste approved external URLs, or use <strong>Upload to Blob</strong> to
          store files in the shared thinkbigdigital-blob store under parthwebsite/
          only. {BLOB_PREFIX_RULE}
        </p>
      </AdminHelpBox>

      <AdminWhatAppearsWhere items={MODULE_GUIDANCE.media.whereAppears} />

      <AdminFormSection
        title="File"
        description="Primary file URL and optional metadata."
      >
        <AdminField
          id="fileUrl"
          label="File URL"
          error={errors.fileUrl}
          hint={FIELD_HINTS.fileUrl}
        >
          <input
            id="fileUrl"
            name="fileUrl"
            type="url"
            defaultValue={values.fileUrl}
            placeholder="https://..."
            className={adminInputClassName(Boolean(errors.fileUrl))}
            required
          />
        </AdminField>

        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField id="fileName" label="File name" error={errors.fileName}>
            <input
              id="fileName"
              name="fileName"
              defaultValue={values.fileName}
              className={adminInputClassName(Boolean(errors.fileName))}
            />
          </AdminField>

          <AdminField id="fileType" label="File type" error={errors.fileType}>
            <input
              id="fileType"
              name="fileType"
              defaultValue={values.fileType}
              placeholder="e.g. image, video, pdf"
              className={adminInputClassName(Boolean(errors.fileType))}
            />
          </AdminField>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField id="mimeType" label="MIME type" error={errors.mimeType}>
            <input
              id="mimeType"
              name="mimeType"
              defaultValue={values.mimeType}
              placeholder="e.g. image/jpeg"
              className={adminInputClassName(Boolean(errors.mimeType))}
            />
          </AdminField>

          <AdminField
            id="fileSizeBytes"
            label="File size (bytes)"
            error={errors.fileSizeBytes}
          >
            <input
              id="fileSizeBytes"
              name="fileSizeBytes"
              type="number"
              min="0"
              defaultValue={values.fileSizeBytes}
              className={adminInputClassName(Boolean(errors.fileSizeBytes))}
            />
          </AdminField>
        </div>
      </AdminFormSection>

      <AdminFormSection
        title="Image metadata"
        description="Display hints for images on future public pages."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField
            id="imageRole"
            label="Image role"
            error={errors.imageRole}
            hint={FIELD_HINTS.imageRole}
          >
            <select
              id="imageRole"
              name="imageRole"
              defaultValue={values.imageRole}
              className={adminInputClassName(Boolean(errors.imageRole))}
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
            error={errors.imageDisplayMode}
            hint={FIELD_HINTS.imageDisplayMode}
          >
            <select
              id="imageDisplayMode"
              name="imageDisplayMode"
              defaultValue={values.imageDisplayMode}
              className={adminInputClassName(Boolean(errors.imageDisplayMode))}
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

        <AdminField
          id="imageFocalPoint"
          label="Image focal point"
          error={errors.imageFocalPoint}
          hint="Optional focal point hint, e.g. center, top-left."
        >
          <input
            id="imageFocalPoint"
            name="imageFocalPoint"
            defaultValue={values.imageFocalPoint}
            className={adminInputClassName(Boolean(errors.imageFocalPoint))}
          />
        </AdminField>

        <AdminField
          id="altText"
          label="Alt text"
          error={errors.altText}
          hint={FIELD_HINTS.altText}
        >
          <input
            id="altText"
            name="altText"
            defaultValue={values.altText}
            className={adminInputClassName(Boolean(errors.altText))}
          />
        </AdminField>

        <AdminField id="caption" label="Caption" error={errors.caption}>
          <textarea
            id="caption"
            name="caption"
            rows={2}
            defaultValue={values.caption}
            className={adminInputClassName(Boolean(errors.caption))}
          />
        </AdminField>
      </AdminFormSection>

      <AdminFormSection
        title="Additional URLs"
        description="Optional responsive or social variants."
      >
        <AdminField
          id="mobileFileUrl"
          label="Mobile file URL"
          error={errors.mobileFileUrl}
        >
          <input
            id="mobileFileUrl"
            name="mobileFileUrl"
            type="url"
            defaultValue={values.mobileFileUrl}
            placeholder="https://..."
            className={adminInputClassName(Boolean(errors.mobileFileUrl))}
          />
        </AdminField>

        <AdminField id="ogImageUrl" label="OG image URL" error={errors.ogImageUrl}>
          <input
            id="ogImageUrl"
            name="ogImageUrl"
            type="url"
            defaultValue={values.ogImageUrl}
            placeholder="https://..."
            className={adminInputClassName(Boolean(errors.ogImageUrl))}
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
          defaultValue={values.relatedProjectId}
          error={errors.relatedProjectId}
        />

        <RelationSelect
          id="relatedProofId"
          name="relatedProofId"
          label="Related proof"
          options={proofOptions}
          defaultValue={values.relatedProofId}
          error={errors.relatedProofId}
        />

        <RelationSelect
          id="relatedVideoId"
          name="relatedVideoId"
          label="Related video"
          options={videoOptions}
          defaultValue={values.relatedVideoId}
          error={errors.relatedVideoId}
        />

        <AdminField id="uploadedBy" label="Uploaded by" error={errors.uploadedBy}>
          <input
            id="uploadedBy"
            name="uploadedBy"
            defaultValue={values.uploadedBy}
            className={adminInputClassName(Boolean(errors.uploadedBy))}
          />
        </AdminField>
      </AdminFormSection>

      <div className={`${adminActionRailClass} flex flex-wrap items-center gap-3`}>
        {updatedAt ? (
          <p className="text-xs text-tb-text-muted">Last updated: {updatedAt}</p>
        ) : null}
        <div className="ml-auto flex flex-wrap gap-2">
          <Link href="/admin/media" className={adminBtnSecondaryClass}>
            Back to media
          </Link>
          <button
            type="submit"
            disabled={pending}
            className={`disabled:opacity-60 ${adminBtnPrimaryClass}`}
          >
            {pending
              ? "Saving…"
              : mode === "create"
                ? "Create media record"
                : "Save changes"}
          </button>
        </div>
      </div>
    </form>
  );
}
