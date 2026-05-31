"use client";

import { useActionState, useState } from "react";
import {
  AdminField,
  AdminFormError,
  adminInputClassName,
} from "@/components/admin/admin-auth-panel";
import { AdminCmsNotice } from "@/components/admin/admin-cms-notice";
import { AdminFormSection } from "@/components/admin/admin-form-section";
import { AdminWhatAppearsWhere } from "@/components/admin/admin-what-appears-where";
import { RelationSelect } from "@/components/admin/admin-list-shared";
import { PublishingSidebar } from "@/components/admin/publishing-sidebar";
import { FIELD_HINTS, MODULE_GUIDANCE } from "@/lib/admin/cms-guidance";
import { createVideoAction, updateVideoAction } from "@/lib/admin/videos/actions";
import { VIDEO_CATEGORY_OPTIONS } from "@/lib/admin/videos/constants";
import type { VideoFormState, VideoFormValues } from "@/lib/admin/videos/types";
import type { RelationOption } from "@/lib/admin/shared/relation-options";
import { suggestSlug } from "@/lib/admin/shared/slug";

const emptyValues: VideoFormValues = {
  title: "",
  slug: "",
  youtubeUrl: "",
  category: "",
  eventDate: "",
  relatedProjectId: "",
  thumbnailMediaId: "",
  shortDescription: "",
  displayOrder: "100",
  featuredOnHome: false,
  featuredOnAbout: false,
  published: false,
  hidden: false,
};

type VideoFormProps = {
  mode: "create" | "edit";
  recordId?: string;
  initialValues?: VideoFormValues;
  updatedAt?: string;
  projectOptions: RelationOption[];
  mediaOptions: RelationOption[];
};

export function VideoForm({
  mode,
  recordId,
  initialValues,
  updatedAt,
  projectOptions,
  mediaOptions,
}: VideoFormProps) {
  const action = mode === "create" ? createVideoAction : updateVideoAction;
  const [state, formAction, pending] = useActionState(action, {
    values: initialValues ?? emptyValues,
  } as VideoFormState);

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
      <p className="text-sm text-tb-text-muted">{MODULE_GUIDANCE.videos.formIntro}</p>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-6">
          <AdminFormSection
            title="Basic info"
            description="Core video identity for future public video pages."
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
              id="youtubeUrl"
              label="YouTube URL"
              error={errors.youtubeUrl}
              hint={FIELD_HINTS.youtubeUrl}
            >
              <input
                id="youtubeUrl"
                name="youtubeUrl"
                type="url"
                defaultValue={values.youtubeUrl}
                placeholder="https://www.youtube.com/watch?v=..."
                className={adminInputClassName(Boolean(errors.youtubeUrl))}
                required
              />
            </AdminField>

            <AdminField
              id="shortDescription"
              label="Short description"
              error={errors.shortDescription}
            >
              <textarea
                id="shortDescription"
                name="shortDescription"
                rows={3}
                defaultValue={values.shortDescription}
                className={adminInputClassName(Boolean(errors.shortDescription))}
              />
            </AdminField>

            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField id="category" label="Category" error={errors.category} hint={FIELD_HINTS.category}>
                <select
                  id="category"
                  name="category"
                  defaultValue={values.category}
                  className={adminInputClassName(Boolean(errors.category))}
                >
                  <option value="">None</option>
                  {VIDEO_CATEGORY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
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
            </div>
          </AdminFormSection>

          <AdminFormSection
            title="Relations"
            description="Link this video to a project and optional thumbnail from the media library."
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
              id="thumbnailMediaId"
              name="thumbnailMediaId"
              label="Thumbnail media"
              options={mediaOptions}
              defaultValue={values.thumbnailMediaId}
              hint={FIELD_HINTS.thumbnailMediaId}
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
            submitLabel={mode === "create" ? "Create video" : "Save changes"}
            backHref="/admin/videos"
          />

          <AdminWhatAppearsWhere items={MODULE_GUIDANCE.videos.whereAppears} />
        </aside>
      </div>
    </form>
  );
}
