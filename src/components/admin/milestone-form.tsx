"use client";

import { useActionState } from "react";
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
import {
  createMilestoneAction,
  updateMilestoneAction,
} from "@/lib/admin/milestones/actions";
import { MILESTONE_CATEGORY_OPTIONS } from "@/lib/admin/milestones/constants";
import type {
  MilestoneFormState,
  MilestoneFormValues,
} from "@/lib/admin/milestones/types";
import type { RelationOption } from "@/lib/admin/shared/relation-options";

const emptyValues: MilestoneFormValues = {
  title: "",
  eventLabel: "",
  eventDate: "",
  shortDescription: "",
  category: "",
  relatedProjectId: "",
  relatedProofId: "",
  relatedVideoId: "",
  displayOrder: "100",
  featuredOnAbout: false,
  featuredOnHome: false,
  published: false,
  hidden: false,
};

type MilestoneFormProps = {
  mode: "create" | "edit";
  recordId?: string;
  initialValues?: MilestoneFormValues;
  updatedAt?: string;
  projectOptions: RelationOption[];
  proofOptions: RelationOption[];
  videoOptions: RelationOption[];
};

export function MilestoneForm({
  mode,
  recordId,
  initialValues,
  updatedAt,
  projectOptions,
  proofOptions,
  videoOptions,
}: MilestoneFormProps) {
  const action =
    mode === "create" ? createMilestoneAction : updateMilestoneAction;
  const [state, formAction, pending] = useActionState(action, {
    values: initialValues ?? emptyValues,
  } as MilestoneFormState);

  const values = state.values ?? initialValues ?? emptyValues;
  const errors = state.errors ?? {};

  return (
    <form action={formAction} className="space-y-6">
      {mode === "edit" && recordId ? (
        <input type="hidden" name="recordId" value={recordId} />
      ) : null}

      <AdminFormError message={errors.form} />

      <AdminCmsNotice />
      <p className="text-sm text-tb-text-muted">{MODULE_GUIDANCE.milestones.formIntro}</p>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-6">
          <AdminFormSection
            title="Basic info"
            description="Timeline milestone for future About and Home pages."
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
                className={adminInputClassName(Boolean(errors.title))}
                required
              />
            </AdminField>

            <AdminField
              id="eventLabel"
              label="Event label"
              error={errors.eventLabel}
              hint={FIELD_HINTS.eventLabel}
            >
              <input
                id="eventLabel"
                name="eventLabel"
                defaultValue={values.eventLabel}
                className={adminInputClassName(Boolean(errors.eventLabel))}
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
              <AdminField
                id="category"
                label="Category"
                error={errors.category}
                hint={FIELD_HINTS.category}
              >
                <select
                  id="category"
                  name="category"
                  defaultValue={values.category}
                  className={adminInputClassName(Boolean(errors.category))}
                >
                  <option value="">None</option>
                  {MILESTONE_CATEGORY_OPTIONS.map((option) => (
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
            description="Optionally link this milestone to a project, proof item, or video."
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
              id="relatedProofId"
              name="relatedProofId"
              label="Related proof"
              options={proofOptions}
              defaultValue={values.relatedProofId}
              hint={FIELD_HINTS.relatedProofId}
            />

            <RelationSelect
              id="relatedVideoId"
              name="relatedVideoId"
              label="Related video"
              options={videoOptions}
              defaultValue={values.relatedVideoId}
              hint={FIELD_HINTS.relatedVideoId}
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
            submitLabel={
              mode === "create" ? "Create milestone" : "Save changes"
            }
            backHref="/admin/milestones"
          />

          <AdminWhatAppearsWhere items={MODULE_GUIDANCE.milestones.whereAppears} />
        </aside>
      </div>
    </form>
  );
}
