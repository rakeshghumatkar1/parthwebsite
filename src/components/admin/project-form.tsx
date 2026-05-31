"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import {
  AdminField,
  AdminFormError,
  adminInputClassName,
} from "@/components/admin/admin-auth-panel";
import {
  AdminFieldHint,
  AdminFormSection,
} from "@/components/admin/admin-form-section";
import { AdminHelpBox } from "@/components/admin/admin-help-box";
import {
  createProjectAction,
  updateProjectAction,
} from "@/lib/admin/projects/actions";
import {
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

function checkboxClassName() {
  return "h-4 w-4 rounded border-tb-navy-border text-tb-blue focus:ring-tb-blue/30";
}

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

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-6">
          <AdminFormSection
            title="Basic info"
            description="Core project identity used across future public pages."
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
              id="shortDescription"
              label="Short description"
              error={errors.shortDescription}
              hint="Card excerpt for Home, Projects list, and previews."
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

              <AdminField id="status" label="Status" error={errors.status}>
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
            </div>
          </AdminFormSection>

          <AdminFormSection
            title="Project details"
            description="Longer copy for detail pages and About references."
          >
            <AdminField
              id="fullDescription"
              label="Full description"
              error={errors.fullDescription}
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
              hint='Example: Python, PostgreSQL, Next.js'
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

            <AdminField id="demoUrl" label="Demo URL" error={errors.demoUrl}>
              <input
                id="demoUrl"
                name="demoUrl"
                type="url"
                defaultValue={values.demoUrl}
                placeholder="https://..."
                className={adminInputClassName(Boolean(errors.demoUrl))}
              />
            </AdminField>

            <AdminField id="videoUrl" label="Video URL" error={errors.videoUrl}>
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
              Cover image upload is not available yet. Media library and blob
              uploads will come in a later phase.
            </AdminFieldHint>
          </AdminFormSection>
        </div>

        <aside className="space-y-4">
          <section className="space-y-4 rounded-lg border border-tb-navy-border bg-tb-surface p-5">
            <div>
              <h2 className="text-base font-semibold">Publishing</h2>
              <p className="mt-1 text-sm text-tb-text-muted">
                Public pages are not connected yet. These flags prepare projects
                for future Home, Projects, About, and detail pages.
              </p>
            </div>

            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                name="published"
                defaultChecked={values.published}
                className={checkboxClassName()}
              />
              <span>
                <span className="font-medium">Published</span>
                <AdminFieldHint>
                  Draft projects stay out of future public listings.
                </AdminFieldHint>
              </span>
            </label>

            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                name="hidden"
                defaultChecked={values.hidden}
                className={checkboxClassName()}
              />
              <span>
                <span className="font-medium">Hidden</span>
                <AdminFieldHint>
                  Hides from public views even when published.
                </AdminFieldHint>
              </span>
            </label>

            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                name="archived"
                defaultChecked={values.archived}
                className={checkboxClassName()}
              />
              <span>
                <span className="font-medium">Archived</span>
                <AdminFieldHint>
                  Marks older work without deleting the record.
                </AdminFieldHint>
              </span>
            </label>

            <hr className="border-tb-navy-border" />

            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                name="featuredOnHome"
                defaultChecked={values.featuredOnHome}
                className={checkboxClassName()}
              />
              <span>
                <span className="font-medium">Featured on Home</span>
                <AdminFieldHint>
                  For future Home featured project cards (lower display order
                  appears first).
                </AdminFieldHint>
              </span>
            </label>

            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                name="featuredOnAbout"
                defaultChecked={values.featuredOnAbout}
                className={checkboxClassName()}
              />
              <span>
                <span className="font-medium">Featured on About</span>
                <AdminFieldHint>
                  For future About Parth project highlights.
                </AdminFieldHint>
              </span>
            </label>

            <AdminField
              id="displayOrder"
              label="Display order"
              error={errors.displayOrder}
              hint="Lower numbers appear first in lists."
            >
              <input
                id="displayOrder"
                name="displayOrder"
                type="number"
                defaultValue={values.displayOrder}
                className={adminInputClassName(Boolean(errors.displayOrder))}
              />
            </AdminField>

            {updatedAt ? (
              <p className="text-xs text-tb-text-muted">
                Last updated: {updatedAt}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-md bg-tb-blue px-4 py-2.5 text-sm font-medium text-white transition hover:bg-tb-blue-hover disabled:opacity-60"
            >
              {pending
                ? "Saving…"
                : mode === "create"
                  ? "Create project"
                  : "Save changes"}
            </button>

            <Link
              href="/admin/projects"
              className="block text-center text-sm font-medium text-tb-blue hover:underline"
            >
              Back to projects
            </Link>
          </section>

          <AdminHelpBox title="Where this appears later">
            <ul className="list-disc space-y-1 pl-4">
              <li>Home featured projects</li>
              <li>Public Projects page</li>
              <li>About Parth highlights</li>
              <li>Individual project detail pages</li>
            </ul>
          </AdminHelpBox>
        </aside>
      </div>
    </form>
  );
}
