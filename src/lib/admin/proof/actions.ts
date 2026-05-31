"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/admin/page-guard";
import {
  createProofRecord,
  isProofSlugTaken,
  updateProofFlags,
  updateProofRecord,
} from "./queries";
import type { ProofFormState } from "./types";
import {
  formDataToProofValues,
  proofValuesToDbPayload,
  validateProofForm,
} from "./validation";

const BASE = "/admin/proof";

async function saveProof(formData: FormData, id?: string): Promise<ProofFormState> {
  await requireAdminSession();
  const values = formDataToProofValues(formData);
  const errors = validateProofForm(values);
  if (Object.keys(errors).length > 0) return { errors, values };

  const payload = proofValuesToDbPayload(values);
  if (await isProofSlugTaken(payload.slug, id)) {
    return { errors: { slug: "This slug is already in use." }, values };
  }

  let redirectUrl: string;

  try {
    if (id) {
      const updated = await updateProofRecord(id, payload);
      if (!updated) return { errors: { form: "Proof item not found." }, values };
      revalidatePath(BASE);
      redirectUrl = `${BASE}/${id}?saved=1`;
    } else {
      const created = await createProofRecord(payload);
      revalidatePath(BASE);
      redirectUrl = `${BASE}/${created.id}?saved=1`;
    }
  } catch {
    return { errors: { form: "Could not save proof item. Try again." }, values };
  }

  redirect(redirectUrl);
}

export async function createProofAction(_prev: ProofFormState, formData: FormData) {
  return saveProof(formData);
}

export async function updateProofAction(_prev: ProofFormState, formData: FormData) {
  const id = String(formData.get("recordId") ?? "");
  if (!id) return { errors: { form: "Missing record ID." }, values: formDataToProofValues(formData) };
  return saveProof(formData, id);
}

export async function toggleProofPublishedAction(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await updateProofFlags(id, { published: formData.get("published") === "true" });
  revalidatePath(BASE);
}

export async function toggleProofHiddenAction(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await updateProofFlags(id, { hidden: formData.get("hidden") === "true" });
  revalidatePath(BASE);
}
