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
import { PublishingSidebar } from "@/components/admin/publishing-sidebar";
import { FIELD_HINTS, MODULE_GUIDANCE } from "@/lib/admin/cms-guidance";
import {
  createProjectAction,
  updateProjectAction,
} from "@/lib/admin/projects/actions";
import {
  PROJECT_PHASE_OPTIONS,
  PROJECT_STATUS_OPTIONS,
  PROJECT_TYPE_OPTIONS,
} from "@/lib/admin/projects/constants";
import { suggestSlug } from "@/lib/admin/projects/slug";
import type { ProjectFormState, ProjectFormValues } from "@/lib/admin/projects/types";

const emptyValues: ProjectFormValues = {
  title: "",
  slug: "",
  shortDescription: "",
  fullDescription: "",
  projectType: "",
  projectPhase: "current_work",
  status: "active",
  techStack: "",
  problemSolved: "",
  whatItDoes: "",
  parthRole: "",
  githubUrl: "",
  demoUrl: "",
  videoUrl: "",
  pdfDownloadUrl: "",
  displayOrder: "100",
  featuredOnHome: false,
  featuredOnAbout: false,
  published: false,
  hidden: false,
  archived: false,
};

type ProjectFormProps = {
  mode: "create" | "edit";
  projectId?: string;
  initialValues?: ProjectFormValues;
  updatedAt?: string;
};

export function ProjectForm({
  mode,
  projectId,
  initialValues,
  updatedAt,
}: ProjectFormProps) {
  const action = mode === "create" ? createProjectAction : updateProjectAction;
  const [state, formAction, pending] = useActionState(action, {
    values: initialValues ?? emptyValues,
  } as ProjectFormState);

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
      {mode === "edit" && projectId ? (
        <input type="hidden" name="projectId" value={projectId} />
      ) : null}

      <AdminFormError message={errors.form} />

      <AdminCmsNotice />
      <p className="text-sm text-tb-text-muted">{MODULE_GUIDANCE.projects.formIntro}</p>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-6">
          <AdminFormSection
            title="Basic info"
            description="Core project identity used across future public pages."
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
              id="shortDescription"
              label="Short description"
              error={errors.shortDescription}
              hint={FIELD_HINTS.shortDescription}
            >
              <textarea
                id="shortDescription"
                name="shortDescription"
                rows={3}
                defaultValue={values.shortDescription}
                className={adminInputClassName(Boolean(errors.shortDescription))}
                required
              />
            </AdminField>

            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField
                id="projectType"
                label="Project type"
                error={errors.projectType}
                hint={FIELD_HINTS.projectType}
              >
                <select
                  id="projectType"
                  name="projectType"
                  defaultValue={values.projectType}
                  className={adminInputClassName(Boolean(errors.projectType))}
                  required
                >
                  <option value="">Select type</option>
                  {PROJECT_TYPE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </AdminField>

              <AdminField
                id="projectPhase"
                label="Project phase"
                error={errors.projectPhase}
                hint={FIELD_HINTS.projectPhase}
              >
                <select
                  id="projectPhase"
                  name="projectPhase"
                  defaultValue={values.projectPhase || "current_work"}
                  className={adminInputClassName(Boolean(errors.projectPhase))}
                  required
                >
                  {PROJECT_PHASE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </AdminField>
            </div>

            <AdminField
              id="status"
              label="Status"
              error={errors.status}
              hint={FIELD_HINTS.status}
            >
              <select
                id="status"
                name="status"
                defaultValue={values.status}
                className={adminInputClassName(Boolean(errors.status))}
                required
              >
                <option value="">Select status</option>
                {PROJECT_STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </AdminField>
          </AdminFormSection>

          <AdminFormSection
            title="Project details"
            description="Longer copy for detail pages and About references."
          >
            <AdminField
              id="fullDescription"
              label="Full description"
              error={errors.fullDescription}
              hint={FIELD_HINTS.fullDescription}
            >
              <textarea
                id="fullDescription"
                name="fullDescription"
                rows={5}
                defaultValue={values.fullDescription}
                className={adminInputClassName(Boolean(errors.fullDescription))}
              />
            </AdminField>

            <AdminField
              id="problemSolved"
              label="Problem solved"
              error={errors.problemSolved}
              hint={FIELD_HINTS.problemSolved}
            >
              <textarea
                id="problemSolved"
                name="problemSolved"
                rows={3}
                defaultValue={values.problemSolved}
                className={adminInputClassName(Boolean(errors.problemSolved))}
              />
            </AdminField>

            <AdminField
              id="whatItDoes"
              label="What it does"
              error={errors.whatItDoes}
              hint={FIELD_HINTS.whatItDoes}
            >
              <textarea
                id="whatItDoes"
                name="whatItDoes"
                rows={3}
                defaultValue={values.whatItDoes}
                className={adminInputClassName(Boolean(errors.whatItDoes))}
              />
            </AdminField>

            <AdminField
              id="parthRole"
              label="Parth's role"
              error={errors.parthRole}
              hint={FIELD_HINTS.parthRole}
            >
              <textarea
                id="parthRole"
                name="parthRole"
                rows={2}
                defaultValue={values.parthRole}
                className={adminInputClassName(Boolean(errors.parthRole))}
              />
            </AdminField>
          </AdminFormSection>

          <AdminFormSection
            title="Tech stack"
            description="Comma-separated tags shown as pills on cards."
          >
            <AdminField
              id="techStack"
              label="Tags"
              error={errors.techStack}
              hint={FIELD_HINTS.techStack}
            >
              <input
                id="techStack"
                name="techStack"
                defaultValue={values.techStack}
                className={adminInputClassName(Boolean(errors.techStack))}
              />
            </AdminField>
          </AdminFormSection>

          <AdminFormSection
            title="Links"
            description="Only add approved real URLs. Leave blank if not available yet."
          >
            <AdminField
              id="githubUrl"
              label="GitHub URL"
              error={errors.githubUrl}
              hint={FIELD_HINTS.githubUrl}
            >
              <input
                id="githubUrl"
                name="githubUrl"
                type="url"
                defaultValue={values.githubUrl}
                placeholder="https://github.com/..."
                className={adminInputClassName(Boolean(errors.githubUrl))}
              />
            </AdminField>

            <AdminField
              id="demoUrl"
              label="Demo URL"
              error={errors.demoUrl}
              hint={FIELD_HINTS.demoUrl}
            >
              <input
                id="demoUrl"
                name="demoUrl"
                type="url"
                defaultValue={values.demoUrl}
                placeholder="https://..."
                className={adminInputClassName(Boolean(errors.demoUrl))}
              />
            </AdminField>

            <AdminField
              id="videoUrl"
              label="Video URL"
              error={errors.videoUrl}
              hint={FIELD_HINTS.videoUrl}
            >
              <input
                id="videoUrl"
                name="videoUrl"
                type="url"
                defaultValue={values.videoUrl}
                placeholder="https://..."
                className={adminInputClassName(Boolean(errors.videoUrl))}
              />
            </AdminField>

            <AdminField
              id="pdfDownloadUrl"
              label="PDF download URL"
              error={errors.pdfDownloadUrl}
              hint={FIELD_HINTS.pdfDownloadUrl}
            >
              <input
                id="pdfDownloadUrl"
                name="pdfDownloadUrl"
                type="url"
                defaultValue={values.pdfDownloadUrl}
                placeholder="https://..."
                className={adminInputClassName(Boolean(errors.pdfDownloadUrl))}
              />
            </AdminField>

            <AdminFieldHint>
              Add cover images in Media Library, then paste the URL here or link
              via project detail fields when ready.
            </AdminFieldHint>
          </AdminFormSection>
        </div>

        <aside className="space-y-3">
          <PublishingSidebar
            showArchived
            values={{
              published: values.published,
              hidden: values.hidden,
              archived: values.archived,
              featuredOnHome: values.featuredOnHome,
              featuredOnAbout: values.featuredOnAbout,
              displayOrder: values.displayOrder,
            }}
            errors={{ displayOrder: errors.displayOrder }}
            updatedAt={updatedAt}
            pending={pending}
            submitLabel={mode === "create" ? "Create project" : "Save changes"}
            backHref="/admin/projects"
            backLabel="Back to projects"
          />

          <AdminWhatAppearsWhere items={MODULE_GUIDANCE.projects.whereAppears} />
        </aside>
      </div>
    </form>
  );
}
