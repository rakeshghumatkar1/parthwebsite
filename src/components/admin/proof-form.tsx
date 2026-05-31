"use client";

import { useActionState, useState } from "react";
import {
  AdminField,
  AdminFormError,
  adminInputClassName,
} from "@/components/admin/admin-auth-panel";
import { AdminCmsNotice } from "@/components/admin/admin-cms-notice";
import {
  AdminFieldHint,
  AdminFormSection,
} from "@/components/admin/admin-form-section";
import { AdminWhatAppearsWhere } from "@/components/admin/admin-what-appears-where";
import { RelationSelect } from "@/components/admin/admin-list-shared";
import { PublishingSidebar } from "@/components/admin/publishing-sidebar";
import { FIELD_HINTS, MODULE_GUIDANCE } from "@/lib/admin/cms-guidance";
import {
  createProofAction,
  updateProofAction,
} from "@/lib/admin/proof/actions";
import { PROOF_TYPE_OPTIONS } from "@/lib/admin/proof/constants";
import type { ProofFormState, ProofFormValues } from "@/lib/admin/proof/types";
import type { RelationOption } from "@/lib/admin/shared/relation-options";
import { suggestSlug } from "@/lib/admin/shared/slug";

const emptyValues: ProofFormValues = {
  title: "",
  slug: "",
  proofType: "",
  shortDescription: "",
  whatThisProves: "",
  fileUrl: "",
  externalUrl: "",
  eventDate: "",
  relatedProjectId: "",
  relatedMilestoneId: "",
  mediaId: "",
  displayOrder: "100",
  featuredOnHome: false,
  featuredOnAbout: false,
  published: false,
  hidden: false,
};

type ProofFormProps = {
  mode: "create" | "edit";
  recordId?: string;
  initialValues?: ProofFormValues;
  updatedAt?: string;
  projectOptions: RelationOption[];
  milestoneOptions: RelationOption[];
  mediaOptions: RelationOption[];
};

export function ProofForm({
  mode,
  recordId,
  initialValues,
  updatedAt,
  projectOptions,
  milestoneOptions,
  mediaOptions,
}: ProofFormProps) {
  const action = mode === "create" ? createProofAction : updateProofAction;
  const [state, formAction, pending] = useActionState(action, {
    values: initialValues ?? emptyValues,
  } as ProofFormState);

  const values = state.values ?? initialValues ?? emptyValues;
  const errors = state.errors ?? {};

  const [slugTouched, setSlugTouched] = useState(mode === "edit");

  function handleTitleChange(title: string) {
    if (!slugTouched && mode === "create") {
      const slugInput = document.getElementById("slug") as HTMLInputElement | null;
      if (slugInput) {
        slugInput.value = suggestSlug(title);
      }
    }
  }

  return (
    <form action={formAction} className="space-y-6">
      {mode === "edit" && recordId ? (
        <input type="hidden" name="recordId" value={recordId} />
      ) : null}

      <AdminFormError message={errors.form} />

      <AdminCmsNotice />
      <p className="text-sm text-tb-text-muted">{MODULE_GUIDANCE.proof.formIntro}</p>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-6">
          <AdminFormSection
            title="Basic info"
            description="Core proof identity for the Proof Library."
          >
            <AdminField
              id="title"
              label="Title"
              error={errors.title}
              hint={FIELD_HINTS.title}
            >
              <input
                id="title"
                name="title"
                defaultValue={values.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className={adminInputClassName(Boolean(errors.title))}
                required
              />
            </AdminField>

            <AdminField
              id="slug"
              label="Slug"
              error={errors.slug}
              hint={FIELD_HINTS.slug}
            >
              <input
                id="slug"
                name="slug"
                defaultValue={values.slug}
                onChange={() => setSlugTouched(true)}
                className={adminInputClassName(Boolean(errors.slug))}
                required
              />
            </AdminField>

            <AdminField
              id="proofType"
              label="Proof type"
              error={errors.proofType}
              hint={FIELD_HINTS.proofType}
            >
              <select
                id="proofType"
                name="proofType"
                defaultValue={values.proofType}
                className={adminInputClassName(Boolean(errors.proofType))}
                required
              >
                <option value="">Select type</option>
                {PROOF_TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </AdminField>

            <AdminField
              id="shortDescription"
              label="Short description"
              error={errors.shortDescription}
              hint="Card excerpt for Home and Proof Library previews."
            >
              <textarea
                id="shortDescription"
                name="shortDescription"
                rows={3}
                defaultValue={values.shortDescription}
                className={adminInputClassName(Boolean(errors.shortDescription))}
              />
            </AdminField>

            <AdminField
              id="whatThisProves"
              label="What this proves"
              error={errors.whatThisProves}
              hint={FIELD_HINTS.whatThisProves}
            >
              <textarea
                id="whatThisProves"
                name="whatThisProves"
                rows={4}
                defaultValue={values.whatThisProves}
                className={adminInputClassName(Boolean(errors.whatThisProves))}
              />
            </AdminField>
          </AdminFormSection>

          <AdminFormSection
            title="Links and dates"
            description="Only add approved real URLs. Leave blank if not available yet."
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
              />
            </AdminField>

            <AdminField
              id="externalUrl"
              label="External URL"
              error={errors.externalUrl}
              hint={FIELD_HINTS.externalUrl}
            >
              <input
                id="externalUrl"
                name="externalUrl"
                type="url"
                defaultValue={values.externalUrl}
                placeholder="https://..."
                className={adminInputClassName(Boolean(errors.externalUrl))}
              />
            </AdminField>

            <AdminField
              id="eventDate"
              label="Event date"
              error={errors.eventDate}
              hint={FIELD_HINTS.eventDate}
            >
              <input
                id="eventDate"
                name="eventDate"
                type="date"
                defaultValue={values.eventDate}
                className={adminInputClassName(Boolean(errors.eventDate))}
              />
            </AdminField>

            <AdminFieldHint>
              Prefer linking a media library record when available. Upload files
              in Media Library or paste approved public URLs.
            </AdminFieldHint>
          </AdminFormSection>

          <AdminFormSection
            title="Relations"
            description="Optional links to projects, milestones, and media."
          >
            <RelationSelect
              id="relatedProjectId"
              name="relatedProjectId"
              label="Related project"
              options={projectOptions}
              defaultValue={values.relatedProjectId}
              hint={FIELD_HINTS.relatedProjectId}
            />

            <RelationSelect
              id="relatedMilestoneId"
              name="relatedMilestoneId"
              label="Related milestone"
              options={milestoneOptions}
              defaultValue={values.relatedMilestoneId}
              hint={FIELD_HINTS.relatedMilestoneId}
            />

            <RelationSelect
              id="mediaId"
              name="mediaId"
              label="Media library item"
              options={mediaOptions}
              defaultValue={values.mediaId}
              hint={FIELD_HINTS.mediaId}
            />
          </AdminFormSection>
        </div>

        <aside className="space-y-4">
          <PublishingSidebar
            values={{
              published: values.published,
              hidden: values.hidden,
              featuredOnHome: values.featuredOnHome,
              featuredOnAbout: values.featuredOnAbout,
              displayOrder: values.displayOrder,
            }}
            errors={{ displayOrder: errors.displayOrder }}
            updatedAt={updatedAt}
            pending={pending}
            submitLabel={mode === "create" ? "Create proof item" : "Save changes"}
            backHref="/admin/proof"
            extraNote="Proof Library public pages are not connected yet."
          />

          <AdminWhatAppearsWhere items={MODULE_GUIDANCE.proof.whereAppears} />
        </aside>
      </div>
    </form>
  );
}
