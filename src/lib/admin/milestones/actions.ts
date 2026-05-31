"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/admin/page-guard";
import { createMilestoneRecord, updateMilestoneFlags, updateMilestoneRecord } from "./queries";
import type { MilestoneFormState } from "./types";
import { formDataToMilestoneValues, milestoneValuesToDbPayload, validateMilestoneForm } from "./validation";

const BASE = "/admin/milestones";

async function saveMilestone(formData: FormData, id?: string): Promise<MilestoneFormState> {
  await requireAdminSession();
  const values = formDataToMilestoneValues(formData);
  const errors = validateMilestoneForm(values);
  if (Object.keys(errors).length > 0) return { errors, values };
  const payload = milestoneValuesToDbPayload(values);
  try {
    if (id) {
      const updated = await updateMilestoneRecord(id, payload);
      if (!updated) return { errors: { form: "Milestone not found." }, values };
      revalidatePath(BASE);
      redirect(`${BASE}/${id}?saved=1`);
    }
    const created = await createMilestoneRecord(payload);
    revalidatePath(BASE);
    redirect(`${BASE}/${created.id}?saved=1`);
  } catch {
    return { errors: { form: "Could not save milestone. Try again." }, values };
  }
}

export async function createMilestoneAction(_prev: MilestoneFormState, formData: FormData) {
  return saveMilestone(formData);
}

export async function updateMilestoneAction(_prev: MilestoneFormState, formData: FormData) {
  const id = String(formData.get("recordId") ?? "");
  if (!id) return { errors: { form: "Missing record ID." }, values: formDataToMilestoneValues(formData) };
  return saveMilestone(formData, id);
}

export async function toggleMilestonePublishedAction(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await updateMilestoneFlags(id, { published: formData.get("published") === "true" });
  revalidatePath(BASE);
}

export async function toggleMilestoneHiddenAction(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await updateMilestoneFlags(id, { hidden: formData.get("hidden") === "true" });
  revalidatePath(BASE);
}
