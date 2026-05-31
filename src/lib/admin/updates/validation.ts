import { normalizeSlug, validateSlugField } from "@/lib/admin/shared/slug";
import { checkboxValue, emptyToNull, emptyUuidToNull, parseDisplayOrder, validateDisplayOrder, validateOptionalDate } from "@/lib/admin/shared/validation";
import { UPDATE_TYPE_VALUES } from "./constants";
import type { UpdateFormErrors, UpdateFormValues } from "./types";

export function formDataToUpdateValues(formData: FormData): UpdateFormValues {
  return {
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    updateType: String(formData.get("updateType") ?? ""),
    shortSummary: String(formData.get("shortSummary") ?? ""),
    body: String(formData.get("body") ?? ""),
    relatedProjectId: String(formData.get("relatedProjectId") ?? ""),
    relatedVideoId: String(formData.get("relatedVideoId") ?? ""),
    relatedProofId: String(formData.get("relatedProofId") ?? ""),
    eventDate: String(formData.get("eventDate") ?? ""),
    displayOrder: String(formData.get("displayOrder") ?? "100"),
    featuredOnHome: checkboxValue(formData, "featuredOnHome"),
    published: checkboxValue(formData, "published"),
    hidden: checkboxValue(formData, "hidden"),
  };
}

export function updateToFormValues(u: {
  title: string; slug: string; updateType: string; shortSummary: string | null; body: string | null;
  relatedProjectId: string | null; relatedVideoId: string | null; relatedProofId: string | null;
  eventDate: string | null; displayOrder: number; featuredOnHome: boolean; published: boolean; hidden: boolean;
}): UpdateFormValues {
  return {
    title: u.title, slug: u.slug, updateType: u.updateType,
    shortSummary: u.shortSummary ?? "", body: u.body ?? "",
    relatedProjectId: u.relatedProjectId ?? "", relatedVideoId: u.relatedVideoId ?? "",
    relatedProofId: u.relatedProofId ?? "", eventDate: u.eventDate ?? "",
    displayOrder: String(u.displayOrder), featuredOnHome: u.featuredOnHome,
    published: u.published, hidden: u.hidden,
  };
}

export function validateUpdateForm(values: UpdateFormValues): UpdateFormErrors {
  const errors: UpdateFormErrors = {};
  if (!values.title.trim()) errors.title = "Title is required.";
  const slugError = validateSlugField(normalizeSlug(values.slug));
  if (slugError) errors.slug = slugError;
  if (!values.updateType) errors.updateType = "Update type is required.";
  else if (!UPDATE_TYPE_VALUES.includes(values.updateType as never)) {
    errors.updateType = "Select a valid update type.";
  }
  const displayOrderError = validateDisplayOrder(values.displayOrder);
  if (displayOrderError) errors.displayOrder = displayOrderError;
  const eventDateError = validateOptionalDate(values.eventDate);
  if (eventDateError) errors.eventDate = eventDateError;
  return errors;
}

export function updateValuesToDbPayload(values: UpdateFormValues) {
  return {
    title: values.title.trim(),
    slug: normalizeSlug(values.slug),
    updateType: values.updateType as (typeof UPDATE_TYPE_VALUES)[number],
    shortSummary: emptyToNull(values.shortSummary),
    body: emptyToNull(values.body),
    relatedProjectId: emptyUuidToNull(values.relatedProjectId),
    relatedVideoId: emptyUuidToNull(values.relatedVideoId),
    relatedProofId: emptyUuidToNull(values.relatedProofId),
    eventDate: emptyToNull(values.eventDate),
    displayOrder: parseDisplayOrder(values.displayOrder),
    featuredOnHome: values.featuredOnHome,
    published: values.published,
    hidden: values.hidden,
  };
}
