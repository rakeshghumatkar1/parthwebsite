import { normalizeSlug, validateSlugField } from "@/lib/admin/shared/slug";
import {
  checkboxValue,
  emptyToNull,
  emptyUuidToNull,
  parseDisplayOrder,
  validateDisplayOrder,
  validateOptionalDate,
  validateOptionalUrl,
} from "@/lib/admin/shared/validation";
import { PROOF_TYPE_VALUES } from "./constants";
import type { ProofFormErrors, ProofFormValues } from "./types";

export function formDataToProofValues(formData: FormData): ProofFormValues {
  return {
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    proofType: String(formData.get("proofType") ?? ""),
    shortDescription: String(formData.get("shortDescription") ?? ""),
    whatThisProves: String(formData.get("whatThisProves") ?? ""),
    fileUrl: String(formData.get("fileUrl") ?? ""),
    externalUrl: String(formData.get("externalUrl") ?? ""),
    eventDate: String(formData.get("eventDate") ?? ""),
    relatedProjectId: String(formData.get("relatedProjectId") ?? ""),
    relatedMilestoneId: String(formData.get("relatedMilestoneId") ?? ""),
    mediaId: String(formData.get("mediaId") ?? ""),
    displayOrder: String(formData.get("displayOrder") ?? "100"),
    featuredOnHome: checkboxValue(formData, "featuredOnHome"),
    featuredOnAbout: checkboxValue(formData, "featuredOnAbout"),
    published: checkboxValue(formData, "published"),
    hidden: checkboxValue(formData, "hidden"),
  };
}

export function proofToFormValues(item: {
  title: string;
  slug: string;
  proofType: string;
  shortDescription: string | null;
  whatThisProves: string | null;
  fileUrl: string | null;
  externalUrl: string | null;
  eventDate: string | null;
  relatedProjectId: string | null;
  relatedMilestoneId: string | null;
  mediaId: string | null;
  displayOrder: number;
  featuredOnHome: boolean;
  featuredOnAbout: boolean;
  published: boolean;
  hidden: boolean;
}): ProofFormValues {
  return {
    title: item.title,
    slug: item.slug,
    proofType: item.proofType,
    shortDescription: item.shortDescription ?? "",
    whatThisProves: item.whatThisProves ?? "",
    fileUrl: item.fileUrl ?? "",
    externalUrl: item.externalUrl ?? "",
    eventDate: item.eventDate ?? "",
    relatedProjectId: item.relatedProjectId ?? "",
    relatedMilestoneId: item.relatedMilestoneId ?? "",
    mediaId: item.mediaId ?? "",
    displayOrder: String(item.displayOrder),
    featuredOnHome: item.featuredOnHome,
    featuredOnAbout: item.featuredOnAbout,
    published: item.published,
    hidden: item.hidden,
  };
}

export function validateProofForm(values: ProofFormValues): ProofFormErrors {
  const errors: ProofFormErrors = {};
  if (!values.title.trim()) errors.title = "Title is required.";
  const slugError = validateSlugField(normalizeSlug(values.slug));
  if (slugError) errors.slug = slugError;
  if (!values.proofType) errors.proofType = "Proof type is required.";
  else if (!PROOF_TYPE_VALUES.includes(values.proofType as never)) {
    errors.proofType = "Select a valid proof type.";
  }
  const displayOrderError = validateDisplayOrder(values.displayOrder);
  if (displayOrderError) errors.displayOrder = displayOrderError;
  const eventDateError = validateOptionalDate(values.eventDate);
  if (eventDateError) errors.eventDate = eventDateError;
  for (const [field, label] of [
    ["fileUrl", "File URL"],
    ["externalUrl", "External URL"],
  ] as const) {
    const msg = validateOptionalUrl(values[field], label);
    if (msg) errors[field] = msg;
  }
  return errors;
}

export function proofValuesToDbPayload(values: ProofFormValues) {
  return {
    title: values.title.trim(),
    slug: normalizeSlug(values.slug),
    proofType: values.proofType as (typeof PROOF_TYPE_VALUES)[number],
    shortDescription: emptyToNull(values.shortDescription),
    whatThisProves: emptyToNull(values.whatThisProves),
    fileUrl: emptyToNull(values.fileUrl),
    externalUrl: emptyToNull(values.externalUrl),
    eventDate: emptyToNull(values.eventDate),
    relatedProjectId: emptyUuidToNull(values.relatedProjectId),
    relatedMilestoneId: emptyUuidToNull(values.relatedMilestoneId),
    mediaId: emptyUuidToNull(values.mediaId),
    displayOrder: parseDisplayOrder(values.displayOrder),
    featuredOnHome: values.featuredOnHome,
    featuredOnAbout: values.featuredOnAbout,
    published: values.published,
    hidden: values.hidden,
  };
}
