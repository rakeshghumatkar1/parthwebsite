"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/admin/page-guard";
import {
  createProjectRecord,
  getProjectById,
  isSlugTaken,
  updateProjectFlags,
  updateProjectRecord,
} from "./queries";
import type { ProjectFormState } from "./types";
import {
  formDataToValues,
  validateProjectForm,
  valuesToDbPayload,
} from "./validation";

async function saveProjectFromForm(
  formData: FormData,
  projectId?: string,
): Promise<ProjectFormState> {
  await requireAdminSession();

  const values = formDataToValues(formData);
  const errors = validateProjectForm(values);

  if (Object.keys(errors).length > 0) {
    return { errors, values };
  }

  const payload = valuesToDbPayload(values);
  const slugTaken = await isSlugTaken(payload.slug, projectId);

  if (slugTaken) {
    return {
      errors: { slug: "This slug is already in use. Choose another." },
      values,
    };
  }

  try {
    if (projectId) {
      const updated = await updateProjectRecord(projectId, payload);
      if (!updated) {
        return {
          errors: { form: "Project not found. It may have been removed." },
          values,
        };
      }
      revalidatePath("/admin/projects");
      revalidatePath(`/admin/projects/${projectId}`);
      redirect(`/admin/projects/${projectId}?saved=1`);
    }

    const created = await createProjectRecord(payload);
    revalidatePath("/admin/projects");
    redirect(`/admin/projects/${created.id}?saved=1`);
  } catch {
    return {
      errors: {
        form: "Could not save the project. Check your entries and try again.",
      },
      values,
    };
  }
}

export async function createProjectAction(
  _prevState: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  return saveProjectFromForm(formData);
}

export async function updateProjectAction(
  _prevState: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  const projectId = String(formData.get("projectId") ?? "");
  if (!projectId) {
    return {
      errors: { form: "Missing project ID." },
      values: formDataToValues(formData),
    };
  }
  return saveProjectFromForm(formData, projectId);
}

export async function toggleProjectPublishedAction(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  const published = formData.get("published") === "true";
  if (!id) return;
  await updateProjectFlags(id, { published });
  revalidatePath("/admin/projects");
}

export async function toggleProjectHiddenAction(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  const hidden = formData.get("hidden") === "true";
  if (!id) return;
  await updateProjectFlags(id, { hidden });
  revalidatePath("/admin/projects");
}

export async function toggleProjectArchivedAction(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  const archived = formData.get("archived") === "true";
  if (!id) return;
  await updateProjectFlags(id, { archived });
  revalidatePath("/admin/projects");
}

export async function toggleProjectFeaturedHomeAction(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  const featuredOnHome = formData.get("featuredOnHome") === "true";
  if (!id) return;
  await updateProjectFlags(id, { featuredOnHome });
  revalidatePath("/admin/projects");
}

export async function toggleProjectFeaturedAboutAction(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  const featuredOnAbout = formData.get("featuredOnAbout") === "true";
  if (!id) return;
  await updateProjectFlags(id, { featuredOnAbout });
  revalidatePath("/admin/projects");
}

export async function getProjectForEdit(id: string) {
  await requireAdminSession();
  return getProjectById(id);
}
