"use client";

import { useActionState, useState } from "react";
import {
  AdminField,
  AdminFormError,
  adminInputClassName,
} from "@/components/admin/admin-auth-panel";
import { AdminFormSection } from "@/components/admin/admin-form-section";
import { AdminHelpBox } from "@/components/admin/admin-help-box";
import { PublishingSidebar } from "@/components/admin/publishing-sidebar";
import { RelationSelect } from "@/components/admin/admin-list-shared";
import {
  createUpdateAction,
  updateUpdateAction,
} from "@/lib/admin/updates/actions";
import { UPDATE_TYPE_OPTIONS } from "@/lib/admin/updates/constants";
import { suggestSlug } from "@/lib/admin/shared/slug";
import type { RelationOption } from "@/lib/admin/shared/relation-options";
import type { UpdateFormState, UpdateFormValues } from "@/lib/admin/updates/types";

const emptyValues: UpdateFormValues = {
  title: "",
  slug: "",
  updateType: "",
  shortSummary: "",
  body: "",
  relatedProjectId: "",
  relatedVideoId: "",
  relatedProofId: "",
  eventDate: "",
  displayOrder: "100",
  featuredOnHome: false,
  published: false,
  hidden: false,
};

type UpdateFormProps = {
  mode: "create" | "edit";
  recordId?: string;
  initialValues?: UpdateFormValues;
  updatedAt?: string;
  projectOptions: RelationOption[];
  videoOptions: RelationOption[];
  proofOptions: RelationOption[];
};

export function UpdateForm({
  mode,
  recordId,
  initialValues,
  updatedAt,
  projectOptions,
  videoOptions,
  proofOptions,
}: UpdateFormProps) {
  const action = mode === "create" ? createUpdateAction : updateUpdateAction;
  const [state, formAction, pending] = useActionState(action, {
    values: initialValues ?? emptyValues,
  } as UpdateFormState);

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

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-6">
          <AdminFormSection
            title="Basic info"
            description="Timeline entries for future Home and Updates pages."
          >
            <AdminField id="title" label="Title" error={errors.title}>
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
              hint="URL-safe identifier. Lowercase letters, numbers, and hyphens."
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
              id="updateType"
              label="Update type"
              error={errors.updateType}
            >
              <select
                id="updateType"
                name="updateType"
                defaultValue={values.updateType}
                className={adminInputClassName(Boolean(errors.updateType))}
                required
              >
                <option value="">Select type</option>
                {UPDATE_TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </AdminField>

            <AdminField
              id="shortSummary"
              label="Short summary"
              error={errors.shortSummary}
              hint="Brief excerpt for cards and list previews."
            >
              <textarea
                id="shortSummary"
                name="shortSummary"
                rows={3}
                defaultValue={values.shortSummary}
                className={adminInputClassName(Boolean(errors.shortSummary))}
              />
            </AdminField>

            <AdminField id="body" label="Body" error={errors.body}>
              <textarea
                id="body"
                name="body"
                rows={6}
                defaultValue={values.body}
                className={adminInputClassName(Boolean(errors.body))}
              />
            </AdminField>

            <AdminField
              id="eventDate"
              label="Event date"
              error={errors.eventDate}
              hint="Optional date shown on the timeline."
            >
              <input
                id="eventDate"
                name="eventDate"
                type="date"
                defaultValue={values.eventDate}
                className={adminInputClassName(Boolean(errors.eventDate))}
              />
            </AdminField>
          </AdminFormSection>

          <AdminFormSection
            title="Related content"
            description="Optional links to projects, videos, or proof items."
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
              id="relatedVideoId"
              name="relatedVideoId"
              label="Related video"
              options={videoOptions}
              defaultValue={values.relatedVideoId}
              error={errors.relatedVideoId}
            />

            <RelationSelect
              id="relatedProofId"
              name="relatedProofId"
              label="Related proof"
              options={proofOptions}
              defaultValue={values.relatedProofId}
              error={errors.relatedProofId}
            />
          </AdminFormSection>
        </div>

        <aside className="space-y-4">
          <PublishingSidebar
            values={{
              published: values.published,
              hidden: values.hidden,
              featuredOnHome: values.featuredOnHome,
              displayOrder: values.displayOrder,
            }}
            errors={{ displayOrder: errors.displayOrder }}
            updatedAt={updatedAt}
            pending={pending}
            submitLabel={mode === "create" ? "Create update" : "Save changes"}
            backHref="/admin/updates"
            showFeaturedAbout={false}
          />

          <AdminHelpBox title="Where this appears later">
            <ul className="list-disc space-y-1 pl-4">
              <li>Home timeline / activity feed</li>
              <li>Public Updates page</li>
              <li>Related project, video, or proof detail pages</li>
            </ul>
          </AdminHelpBox>
        </aside>
      </div>
    </form>
  );
}
