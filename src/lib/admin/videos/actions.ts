"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/admin/page-guard";
import { createVideoRecord, isVideoSlugTaken, updateVideoFlags, updateVideoRecord } from "./queries";
import type { VideoFormState } from "./types";
import { formDataToVideoValues, validateVideoForm, videoValuesToDbPayload } from "./validation";

const BASE = "/admin/videos";

async function saveVideo(formData: FormData, id?: string): Promise<VideoFormState> {
  await requireAdminSession();
  const values = formDataToVideoValues(formData);
  const errors = validateVideoForm(values);
  if (Object.keys(errors).length > 0) return { errors, values };
  const payload = videoValuesToDbPayload(values);
  if (await isVideoSlugTaken(payload.slug, id)) return { errors: { slug: "This slug is already in use." }, values };
  try {
    if (id) {
      const updated = await updateVideoRecord(id, payload);
      if (!updated) return { errors: { form: "Video not found." }, values };
      revalidatePath(BASE);
      redirect(`${BASE}/${id}?saved=1`);
    }
    const created = await createVideoRecord(payload);
    revalidatePath(BASE);
    redirect(`${BASE}/${created.id}?saved=1`);
  } catch {
    return { errors: { form: "Could not save video. Try again." }, values };
  }
}

export async function createVideoAction(_prev: VideoFormState, formData: FormData) {
  return saveVideo(formData);
}

export async function updateVideoAction(_prev: VideoFormState, formData: FormData) {
  const id = String(formData.get("recordId") ?? "");
  if (!id) return { errors: { form: "Missing record ID." }, values: formDataToVideoValues(formData) };
  return saveVideo(formData, id);
}

export async function toggleVideoPublishedAction(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await updateVideoFlags(id, { published: formData.get("published") === "true" });
  revalidatePath(BASE);
}

export async function toggleVideoHiddenAction(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await updateVideoFlags(id, { hidden: formData.get("hidden") === "true" });
  revalidatePath(BASE);
}
