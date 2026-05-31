"use client";

import { useActionState } from "react";
import {
  AdminField,
  AdminFormError,
  adminInputClassName,
} from "@/components/admin/admin-auth-panel";
import { AdminFormSection } from "@/components/admin/admin-form-section";
import { AdminHelpBox } from "@/components/admin/admin-help-box";
import { RelationSelect } from "@/components/admin/admin-list-shared";
import { PublishingSidebar } from "@/components/admin/publishing-sidebar";
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

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-6">
          <AdminFormSection
            title="Basic info"
            description="Timeline milestone for future About and Home pages."
          >
            <AdminField id="title" label="Title" error={errors.title}>
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
              hint='Optional short label, e.g. "Regional finals".'
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
              <AdminField id="category" label="Category" error={errors.category}>
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

              <AdminField id="eventDate" label="Event date" error={errors.eventDate}>
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
            />

            <RelationSelect
              id="relatedProofId"
              name="relatedProofId"
              label="Related proof"
              options={proofOptions}
              defaultValue={values.relatedProofId}
            />

            <RelationSelect
              id="relatedVideoId"
              name="relatedVideoId"
              label="Related video"
              options={videoOptions}
              defaultValue={values.relatedVideoId}
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

          <AdminHelpBox title="Where this appears later">
            <ul className="list-disc space-y-1 pl-4">
              <li>About Parth timeline</li>
              <li>Home featured milestones</li>
              <li>Project detail milestone sections</li>
            </ul>
          </AdminHelpBox>
        </aside>
      </div>
    </form>
  );
}
