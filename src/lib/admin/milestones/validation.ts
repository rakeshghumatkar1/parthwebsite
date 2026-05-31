import { checkboxValue, emptyToNull, emptyUuidToNull, parseDisplayOrder, validateDisplayOrder, validateOptionalDate } from "@/lib/admin/shared/validation";
import { MILESTONE_CATEGORY_VALUES } from "./constants";
import type { MilestoneFormErrors, MilestoneFormValues } from "./types";

export function formDataToMilestoneValues(formData: FormData): MilestoneFormValues {
  return {
    title: String(formData.get("title") ?? ""),
    eventLabel: String(formData.get("eventLabel") ?? ""),
    eventDate: String(formData.get("eventDate") ?? ""),
    shortDescription: String(formData.get("shortDescription") ?? ""),
    category: String(formData.get("category") ?? ""),
    relatedProjectId: String(formData.get("relatedProjectId") ?? ""),
    relatedProofId: String(formData.get("relatedProofId") ?? ""),
    relatedVideoId: String(formData.get("relatedVideoId") ?? ""),
    displayOrder: String(formData.get("displayOrder") ?? "100"),
    featuredOnAbout: checkboxValue(formData, "featuredOnAbout"),
    featuredOnHome: checkboxValue(formData, "featuredOnHome"),
    published: checkboxValue(formData, "published"),
    hidden: checkboxValue(formData, "hidden"),
  };
}

export function milestoneToFormValues(m: {
  title: string; eventLabel: string | null; eventDate: string | null; shortDescription: string | null;
  category: string | null; relatedProjectId: string | null; relatedProofId: string | null;
  relatedVideoId: string | null; displayOrder: number; featuredOnAbout: boolean; featuredOnHome: boolean;
  published: boolean; hidden: boolean;
}): MilestoneFormValues {
  return {
    title: m.title, eventLabel: m.eventLabel ?? "", eventDate: m.eventDate ?? "",
    shortDescription: m.shortDescription ?? "", category: m.category ?? "",
    relatedProjectId: m.relatedProjectId ?? "", relatedProofId: m.relatedProofId ?? "",
    relatedVideoId: m.relatedVideoId ?? "", displayOrder: String(m.displayOrder),
    featuredOnAbout: m.featuredOnAbout, featuredOnHome: m.featuredOnHome,
    published: m.published, hidden: m.hidden,
  };
}

export function validateMilestoneForm(values: MilestoneFormValues): MilestoneFormErrors {
  const errors: MilestoneFormErrors = {};
  if (!values.title.trim()) errors.title = "Title is required.";
  if (values.category && !MILESTONE_CATEGORY_VALUES.includes(values.category as never)) {
    errors.category = "Select a valid category.";
  }
  const displayOrderError = validateDisplayOrder(values.displayOrder);
  if (displayOrderError) errors.displayOrder = displayOrderError;
  const eventDateError = validateOptionalDate(values.eventDate);
  if (eventDateError) errors.eventDate = eventDateError;
  return errors;
}

export function milestoneValuesToDbPayload(values: MilestoneFormValues) {
  return {
    title: values.title.trim(),
    eventLabel: emptyToNull(values.eventLabel),
    eventDate: emptyToNull(values.eventDate),
    shortDescription: emptyToNull(values.shortDescription),
    category: emptyToNull(values.category) as (typeof MILESTONE_CATEGORY_VALUES)[number] | null,
    relatedProjectId: emptyUuidToNull(values.relatedProjectId),
    relatedProofId: emptyUuidToNull(values.relatedProofId),
    relatedVideoId: emptyUuidToNull(values.relatedVideoId),
    displayOrder: parseDisplayOrder(values.displayOrder),
    featuredOnAbout: values.featuredOnAbout,
    featuredOnHome: values.featuredOnHome,
    published: values.published,
    hidden: values.hidden,
  };
}
