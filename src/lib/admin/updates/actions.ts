"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/admin/page-guard";
import { createUpdateRecord, isUpdateSlugTaken, updateUpdateFlags, updateUpdateRecord } from "./queries";
import type { UpdateFormState } from "./types";
import { formDataToUpdateValues, updateValuesToDbPayload, validateUpdateForm } from "./validation";

const BASE = "/admin/updates";

async function saveUpdate(formData: FormData, id?: string): Promise<UpdateFormState> {
  await requireAdminSession();
  const values = formDataToUpdateValues(formData);
  const errors = validateUpdateForm(values);
  if (Object.keys(errors).length > 0) return { errors, values };
  const payload = updateValuesToDbPayload(values);
  if (await isUpdateSlugTaken(payload.slug, id)) return { errors: { slug: "This slug is already in use." }, values };
  let redirectUrl: string;

  try {
    if (id) {
      const updated = await updateUpdateRecord(id, payload);
      if (!updated) return { errors: { form: "Update not found." }, values };
      revalidatePath(BASE);
      redirectUrl = `${BASE}/${id}?saved=1`;
    } else {
      const created = await createUpdateRecord(payload);
      revalidatePath(BASE);
      redirectUrl = `${BASE}/${created.id}?saved=1`;
    }
  } catch {
    return { errors: { form: "Could not save update. Try again." }, values };
  }

  redirect(redirectUrl);
}

export async function createUpdateAction(_prev: UpdateFormState, formData: FormData) {
  return saveUpdate(formData);
}

export async function updateUpdateAction(_prev: UpdateFormState, formData: FormData) {
  const id = String(formData.get("recordId") ?? "");
  if (!id) return { errors: { form: "Missing record ID." }, values: formDataToUpdateValues(formData) };
  return saveUpdate(formData, id);
}

export async function toggleUpdatePublishedAction(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await updateUpdateFlags(id, { published: formData.get("published") === "true" });
  revalidatePath(BASE);
}

export async function toggleUpdateHiddenAction(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await updateUpdateFlags(id, { hidden: formData.get("hidden") === "true" });
  revalidatePath(BASE);
}
