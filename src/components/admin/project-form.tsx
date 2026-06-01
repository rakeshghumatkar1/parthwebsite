"use client";

import { useActionState, useState } from "react";
import {
  AdminField,
  AdminFormError,
  adminInputClassName,
} from "@/components/admin/admin-auth-panel";
import { AdminCmsNotice } from "@/components/admin/admin-cms-notice";
import {
  AdminCollapsibleFormSection,
  AdminFieldHint,
  AdminFormSection,
  AdminOptionalFieldsNote,
  AdminRequiredFieldsNote,
} from "@/components/admin/admin-form-section";
import { AdminWhatAppearsWhere } from "@/components/admin/admin-what-appears-where";
import { PublishingSidebar } from "@/components/admin/publishing-sidebar";
import { FIELD_HINTS, MODULE_GUIDANCE, PROJECT_TAXONOMY_OTHER_NOTE } from "@/lib/admin/cms-guidance";
import {
  createProjectAction,
  updateProjectAction,
} from "@/lib/admin/projects/actions";
import {
  DOMAIN_OPTIONS,
  INDUSTRY_OPTIONS,
  PROJECT_PHASE_OPTIONS,
  PROJECT_STATUS_OPTIONS,
  PROJECT_TYPE_OPTIONS,
} from "@/lib/admin/projects/constants";
import { suggestSlug } from "@/lib/admin/projects/slug";
import type { ProjectFormErrors, ProjectFormState, ProjectFormValues } from "@/lib/admin/projects/types";
import {
  PROJECT_COVER_FIT_OPTIONS,
  PROJECT_COVER_POSITION_OPTIONS,
} from "@/lib/projects/cover-image";
import { MAX_UPLOAD_BYTES } from "@/lib/blob/constants";

const DETAIL_FIELDS = [
  "fullDescription",
  "problemSolved",
  "whatItDoes",
  "parthRole",
] as const satisfies ReadonlyArray<keyof ProjectFormValues>;

const TECH_FIELDS = ["techStack"] as const satisfies ReadonlyArray<
  keyof ProjectFormValues
>;

const LINK_FIELDS = [
  "githubUrl",
  "demoUrl",
  "videoUrl",
  "pdfDownloadUrl",
] as const satisfies ReadonlyArray<keyof ProjectFormValues>;

const COVER_FIELDS = [
  "coverImageUrl",
  "coverImageAlt",
  "coverImageFit",
  "coverImagePosition",
] as const satisfies ReadonlyArray<keyof ProjectFormValues>;

function sectionHasContent(
  values: ProjectFormValues,
  fields: ReadonlyArray<keyof ProjectFormValues>,
) {
  return fields.some((field) => String(values[field]).trim());
}

function sectionHasErrors(
  errors: ProjectFormErrors,
  fields: ReadonlyArray<keyof ProjectFormValues>,
) {
  return fields.some((field) => Boolean(errors[field]));
}

function defaultSectionOpen(
  mode: "create" | "edit",
  values: ProjectFormValues,
  errors: ProjectFormErrors,
  fields: ReadonlyArray<keyof ProjectFormValues>,
) {
  if (sectionHasErrors(errors, fields)) return true;
  if (mode === "edit" && sectionHasContent(values, fields)) return true;
  return false;
}

const emptyValues: ProjectFormValues = {
  title: "",
  slug: "",
  shortDescription: "",
  fullDescription: "",
  projectType: "",
  projectPhase: "current_work",
  status: "active",
  industry: "general_business",
  domains: ["other"],
  techStack: "",
  problemSolved: "",
  whatItDoes: "",
  parthRole: "",
  githubUrl: "",
  demoUrl: "",
  videoUrl: "",
  pdfDownloadUrl: "",
  coverImageUrl: "",
  coverImageAlt: "",
  coverImageFit: "contain",
  coverImagePosition: "center",
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
  const formKey = state.resetKey ?? "initial";

  const [slugEditedManually, setSlugEditedManually] = useState(mode === "edit");
  const slugTouched =
    mode === "edit" ||
    slugEditedManually ||
    Boolean(state.resetKey && values.slug);

  const [prevResetKey, setPrevResetKey] = useState(state.resetKey);
  const [detailsOpen, setDetailsOpen] = useState(() =>
    defaultSectionOpen(mode, values, errors, DETAIL_FIELDS),
  );
  const [techOpen, setTechOpen] = useState(() =>
    defaultSectionOpen(mode, values, errors, TECH_FIELDS),
  );
  const [linksOpen, setLinksOpen] = useState(() =>
    defaultSectionOpen(mode, values, errors, LINK_FIELDS),
  );
  const [coverOpen, setCoverOpen] = useState(() =>
    defaultSectionOpen(mode, values, errors, COVER_FIELDS),
  );
  const [coverImageUrl, setCoverImageUrl] = useState(values.coverImageUrl);
  const [coverImageAlt, setCoverImageAlt] = useState(values.coverImageAlt);
  const [coverImageFit, setCoverImageFit] = useState(
    values.coverImageFit || "contain",
  );
  const [coverImagePosition, setCoverImagePosition] = useState(
    values.coverImagePosition || "center",
  );
  const [coverUploadPending, setCoverUploadPending] = useState(false);
  const [coverUploadError, setCoverUploadError] = useState("");

  if (state.resetKey !== prevResetKey) {
    setPrevResetKey(state.resetKey);
    if (sectionHasErrors(errors, DETAIL_FIELDS)) setDetailsOpen(true);
    if (sectionHasErrors(errors, TECH_FIELDS)) setTechOpen(true);
    if (sectionHasErrors(errors, LINK_FIELDS)) setLinksOpen(true);
    if (sectionHasErrors(errors, COVER_FIELDS)) setCoverOpen(true);
    setCoverImageUrl(values.coverImageUrl);
    setCoverImageAlt(values.coverImageAlt);
    setCoverImageFit(values.coverImageFit || "contain");
    setCoverImagePosition(values.coverImagePosition || "center");
    setCoverUploadError("");
  }

  const showDetails =
    sectionHasErrors(errors, DETAIL_FIELDS) || detailsOpen;
  const showTech = sectionHasErrors(errors, TECH_FIELDS) || techOpen;
  const showLinks = sectionHasErrors(errors, LINK_FIELDS) || linksOpen;
  const showCover =
    sectionHasErrors(errors, COVER_FIELDS) ||
    coverOpen ||
    Boolean(coverImageUrl) ||
    Boolean(coverUploadError);
  const coverAltWarning = Boolean(coverImageUrl) && !coverImageAlt.trim();

  async function handleCoverFileChange(file: File | null) {
    if (!file) {
      return;
    }

    setCoverUploadError("");
    setCoverUploadPending(true);
    setCoverOpen(true);

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);
      if (projectId) {
        uploadData.append("projectId", projectId);
      }
      if (coverImageAlt.trim()) {
        uploadData.append("altText", coverImageAlt.trim());
      }

      const response = await fetch("/admin/projects/cover-upload", {
        method: "POST",
        body: uploadData,
      });
      const data = (await response.json()) as
        | { ok: true; fileUrl: string }
        | { ok?: false; error?: string };

      if (!response.ok || data.ok !== true) {
        setCoverUploadError(
          "error" in data && data.error ? data.error : "Upload failed. Try again.",
        );
        return;
      }

      if (!data.fileUrl) {
        setCoverUploadError("Upload succeeded but no URL was returned.");
        return;
      }

      setCoverImageUrl(data.fileUrl);
    } catch {
      setCoverUploadError("Upload failed. Try again.");
    } finally {
      setCoverUploadPending(false);
    }
  }

  function handleTitleChange(title: string) {
    if (!slugTouched && mode === "create") {
      const slugInput = document.getElementById("slug") as HTMLInputElement | null;
      if (slugInput) {
        slugInput.value = suggestSlug(title);
      }
    }
  }

  return (
    <form key={formKey} action={formAction} className="space-y-6">
      {mode === "edit" && projectId ? (
        <input type="hidden" name="projectId" value={projectId} />
      ) : null}

      <AdminFormError message={errors.form} />

      <AdminCmsNotice />
      <p className="text-sm text-tb-text-muted">{MODULE_GUIDANCE.projects.formIntro}</p>
      <AdminRequiredFieldsNote />
      <AdminOptionalFieldsNote />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-6">
          <AdminFormSection
            title="Basic info"
            description="Core project identity used across future public pages."
          >
            <AdminField
              id="title"
              label="Title"
              required
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
              required
              error={errors.slug}
              hint={FIELD_HINTS.slug}
            >
              <input
                id="slug"
                name="slug"
                defaultValue={values.slug}
                onChange={() => setSlugEditedManually(true)}
                className={adminInputClassName(Boolean(errors.slug))}
                required
              />
            </AdminField>

            <AdminField
              id="shortDescription"
              label="Short description"
              required
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
                required
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
                required
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
              required
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

            <AdminField
              id="industry"
              label="Industry"
              required
              error={errors.industry}
              hint={FIELD_HINTS.industry}
            >
              <select
                id="industry"
                name="industry"
                defaultValue={values.industry || "general_business"}
                className={adminInputClassName(Boolean(errors.industry))}
                required
              >
                {INDUSTRY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </AdminField>

            <AdminField
              id="domains"
              label="Domains"
              required
              error={errors.domains}
              hint={FIELD_HINTS.domains}
            >
              <div
                className={[
                  "grid gap-2 rounded-md border bg-tb-surface p-3 sm:grid-cols-2",
                  errors.domains ? "border-red-400" : "border-tb-navy-border",
                ].join(" ")}
              >
                {DOMAIN_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-start gap-2 text-sm leading-snug"
                  >
                    <input
                      type="checkbox"
                      name="domains"
                      value={option.value}
                      defaultChecked={values.domains.includes(option.value)}
                      className="mt-0.5 shrink-0"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </AdminField>
            <AdminFieldHint>{PROJECT_TAXONOMY_OTHER_NOTE}</AdminFieldHint>
          </AdminFormSection>

          <AdminCollapsibleFormSection
            id="project-details"
            title="Project details"
            description="Longer copy for detail pages and About references."
            open={showDetails}
            onToggle={() => setDetailsOpen((open) => !open)}
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
              label="Contribution"
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
          </AdminCollapsibleFormSection>

          <AdminCollapsibleFormSection
            id="project-tech-stack"
            title="Tech stack"
            description="Comma-separated tags shown as pills on cards."
            open={showTech}
            onToggle={() => setTechOpen((open) => !open)}
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
          </AdminCollapsibleFormSection>

          <AdminCollapsibleFormSection
            id="project-links"
            title="Links"
            description="Only add approved real URLs. Leave blank if not available yet."
            open={showLinks}
            onToggle={() => setLinksOpen((open) => !open)}
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
              Add approved real URLs only.
            </AdminFieldHint>
          </AdminCollapsibleFormSection>

          <AdminCollapsibleFormSection
            id="project-cover-image"
            title="Cover image"
            description="Upload and manage one project cover image used in cards and detail page."
            open={showCover}
            onToggle={() => setCoverOpen((open) => !open)}
          >
            <AdminFieldHint>
              Recommended cover image size: 1800 × 1100 px. Use a clear project screenshot, video frame, hardware photo, or designed cover image. This image appears as a thumbnail on project cards and as a larger cover image on the project detail page. Use Contain when the full image must remain visible.
            </AdminFieldHint>
            <AdminFieldHint>
              Accepted formats: JPG, PNG, WebP. Max file size:{" "}
              {Math.floor(MAX_UPLOAD_BYTES / (1024 * 1024))} MB.
            </AdminFieldHint>

            <AdminField
              id="coverImageUpload"
              label="Upload cover image"
              hint="Direct upload saves the file URL into this project form."
            >
              <input
                id="coverImageUpload"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className={adminInputClassName(false)}
                disabled={coverUploadPending}
                onChange={(event) =>
                  handleCoverFileChange(event.currentTarget.files?.[0] ?? null)
                }
              />
            </AdminField>

            {coverUploadPending ? (
              <p className="text-xs text-tb-text-muted">Uploading cover image...</p>
            ) : null}
            {coverUploadError ? (
              <p
                role="alert"
                className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700"
              >
                {coverUploadError}
              </p>
            ) : null}

            <AdminField
              id="coverImageUrl"
              label="Cover image URL"
              error={errors.coverImageUrl}
              hint="Auto-filled after upload. You can edit it if needed."
            >
              <input
                id="coverImageUrl"
                name="coverImageUrl"
                value={coverImageUrl}
                onChange={(event) => setCoverImageUrl(event.target.value)}
                placeholder="https://..."
                className={adminInputClassName(Boolean(errors.coverImageUrl))}
              />
            </AdminField>

            <AdminField
              id="coverImageAlt"
              label="Cover image alt text"
              error={errors.coverImageAlt}
              hint="Describe what is visible in the project image, for example: TradePre ML trading dashboard screenshot."
            >
              <input
                id="coverImageAlt"
                name="coverImageAlt"
                value={coverImageAlt}
                onChange={(event) => setCoverImageAlt(event.target.value)}
                className={adminInputClassName(Boolean(errors.coverImageAlt))}
              />
            </AdminField>
            {coverAltWarning ? (
              <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
                Cover image alt text is recommended when an image is present.
              </p>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField
                id="coverImageFit"
                label="Image fit"
                error={errors.coverImageFit}
                hint="Use Contain when the full screenshot, video frame, hardware photo, or project image must remain visible."
              >
                <select
                  id="coverImageFit"
                  name="coverImageFit"
                  value={coverImageFit}
                  onChange={(event) => setCoverImageFit(event.target.value)}
                  className={adminInputClassName(Boolean(errors.coverImageFit))}
                >
                  {PROJECT_COVER_FIT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label} — {option.helper}
                    </option>
                  ))}
                </select>
              </AdminField>

              <AdminField
                id="coverImagePosition"
                label="Image position"
                error={errors.coverImagePosition}
                hint="Use this only if Cover is selected and the important part of the image needs alignment."
              >
                <select
                  id="coverImagePosition"
                  name="coverImagePosition"
                  value={coverImagePosition}
                  onChange={(event) => setCoverImagePosition(event.target.value)}
                  className={adminInputClassName(Boolean(errors.coverImagePosition))}
                >
                  {PROJECT_COVER_POSITION_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </AdminField>
            </div>

            {coverImageUrl ? (
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-tb-text-muted">
                  Preview
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="overflow-hidden rounded-md border border-slate-200 bg-slate-50 p-2">
                    <p className="mb-2 text-[11px] font-medium text-tb-text-muted">
                      Card thumbnail
                    </p>
                    <div className="relative aspect-[16/10] rounded-md border border-slate-200 bg-white p-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={coverImageUrl}
                        alt={coverImageAlt || "Project cover preview"}
                        className={`h-full w-full rounded-sm ${
                          coverImageFit === "cover" ? "object-cover" : "object-contain"
                        }`}
                        style={{ objectPosition: coverImagePosition }}
                      />
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-md border border-slate-200 bg-slate-50 p-2">
                    <p className="mb-2 text-[11px] font-medium text-tb-text-muted">
                      Detail cover
                    </p>
                    <div className="relative aspect-[16/10] rounded-md border border-slate-200 bg-white p-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={coverImageUrl}
                        alt={coverImageAlt || "Project cover preview"}
                        className={`h-full w-full rounded-sm ${
                          coverImageFit === "cover" ? "object-cover" : "object-contain"
                        }`}
                        style={{ objectPosition: coverImagePosition }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-tb-text-muted">
                No cover image added yet. Project cards will use the default text-based
                layout.
              </p>
            )}
          </AdminCollapsibleFormSection>
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
