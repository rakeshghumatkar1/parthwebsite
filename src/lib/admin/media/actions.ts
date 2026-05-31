"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/admin/page-guard";
import { createMediaRecord, updateMediaRecord } from "./queries";
import type { MediaFormState } from "./types";
import { formDataToMediaValues, mediaValuesToDbPayload, validateMediaForm } from "./validation";

const BASE = "/admin/media";

async function saveMedia(formData: FormData, id?: string): Promise<MediaFormState> {
  await requireAdminSession();
  const values = formDataToMediaValues(formData);
  const errors = validateMediaForm(values);
  if (Object.keys(errors).length > 0) return { errors, values };
  const payload = mediaValuesToDbPayload(values);
  let redirectUrl: string;

  try {
    if (id) {
      const updated = await updateMediaRecord(id, payload);
      if (!updated) return { errors: { form: "Media record not found." }, values };
      revalidatePath(BASE);
      redirectUrl = `${BASE}/${id}?saved=1`;
    } else {
      const created = await createMediaRecord(payload);
      revalidatePath(BASE);
      redirectUrl = `${BASE}/${created.id}?saved=1`;
    }
  } catch {
    return { errors: { form: "Could not save media record. Try again." }, values };
  }

  redirect(redirectUrl);
}

export async function createMediaAction(_prev: MediaFormState, formData: FormData) {
  return saveMedia(formData);
}

export async function updateMediaAction(_prev: MediaFormState, formData: FormData) {
  const id = String(formData.get("recordId") ?? "");
  if (!id) return { errors: { form: "Missing record ID." }, values: formDataToMediaValues(formData) };
  return saveMedia(formData, id);
}
