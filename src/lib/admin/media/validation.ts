import { emptyToNull, emptyUuidToNull, validateOptionalPositiveInt, validateOptionalUrl, validateRequiredUrl } from "@/lib/admin/shared/validation";
import { MEDIA_DISPLAY_MODE_VALUES, MEDIA_ROLE_VALUES } from "./constants";
import type { MediaFormErrors, MediaFormValues } from "./types";

export function formDataToMediaValues(formData: FormData): MediaFormValues {
  return {
    fileUrl: String(formData.get("fileUrl") ?? ""),
    fileName: String(formData.get("fileName") ?? ""),
    fileType: String(formData.get("fileType") ?? ""),
    mimeType: String(formData.get("mimeType") ?? ""),
    fileSizeBytes: String(formData.get("fileSizeBytes") ?? ""),
    altText: String(formData.get("altText") ?? ""),
    caption: String(formData.get("caption") ?? ""),
    imageRole: String(formData.get("imageRole") ?? ""),
    imageFocalPoint: String(formData.get("imageFocalPoint") ?? ""),
    imageDisplayMode: String(formData.get("imageDisplayMode") ?? ""),
    mobileFileUrl: String(formData.get("mobileFileUrl") ?? ""),
    ogImageUrl: String(formData.get("ogImageUrl") ?? ""),
    relatedProjectId: String(formData.get("relatedProjectId") ?? ""),
    relatedProofId: String(formData.get("relatedProofId") ?? ""),
    relatedVideoId: String(formData.get("relatedVideoId") ?? ""),
    uploadedBy: String(formData.get("uploadedBy") ?? ""),
  };
}

export function mediaToFormValues(m: {
  fileUrl: string; fileName: string | null; fileType: string | null; mimeType: string | null;
  fileSizeBytes: number | null; altText: string | null; caption: string | null;
  imageRole: string | null; imageFocalPoint: string | null; imageDisplayMode: string | null;
  mobileFileUrl: string | null; ogImageUrl: string | null;
  relatedProjectId: string | null; relatedProofId: string | null; relatedVideoId: string | null;
  uploadedBy: string | null;
}): MediaFormValues {
  return {
    fileUrl: m.fileUrl, fileName: m.fileName ?? "", fileType: m.fileType ?? "",
    mimeType: m.mimeType ?? "", fileSizeBytes: m.fileSizeBytes != null ? String(m.fileSizeBytes) : "",
    altText: m.altText ?? "", caption: m.caption ?? "",
    imageRole: m.imageRole ?? "", imageFocalPoint: m.imageFocalPoint ?? "",
    imageDisplayMode: m.imageDisplayMode ?? "", mobileFileUrl: m.mobileFileUrl ?? "",
    ogImageUrl: m.ogImageUrl ?? "", relatedProjectId: m.relatedProjectId ?? "",
    relatedProofId: m.relatedProofId ?? "", relatedVideoId: m.relatedVideoId ?? "",
    uploadedBy: m.uploadedBy ?? "",
  };
}

export function validateMediaForm(values: MediaFormValues): MediaFormErrors {
  const errors: MediaFormErrors = {};
  const fileUrlError = validateRequiredUrl(values.fileUrl, "File URL");
  if (fileUrlError) errors.fileUrl = fileUrlError;
  for (const [field, label] of [["mobileFileUrl", "Mobile file URL"], ["ogImageUrl", "OG image URL"]] as const) {
    const msg = validateOptionalUrl(values[field], label);
    if (msg) errors[field] = msg;
  }
  const sizeError = validateOptionalPositiveInt(values.fileSizeBytes, "File size");
  if (sizeError) errors.fileSizeBytes = sizeError;
  if (values.imageRole && !MEDIA_ROLE_VALUES.includes(values.imageRole as never)) {
    errors.imageRole = "Select a valid image role.";
  }
  if (values.imageDisplayMode && !MEDIA_DISPLAY_MODE_VALUES.includes(values.imageDisplayMode as never)) {
    errors.imageDisplayMode = "Select a valid display mode.";
  }
  return errors;
}

export function mediaValuesToDbPayload(values: MediaFormValues) {
  const fileSize = values.fileSizeBytes.trim();
  return {
    fileUrl: values.fileUrl.trim(),
    fileName: emptyToNull(values.fileName),
    fileType: emptyToNull(values.fileType),
    mimeType: emptyToNull(values.mimeType),
    fileSizeBytes: fileSize ? Number(fileSize) : null,
    altText: emptyToNull(values.altText),
    caption: emptyToNull(values.caption),
    imageRole: emptyToNull(values.imageRole) as (typeof MEDIA_ROLE_VALUES)[number] | null,
    imageFocalPoint: emptyToNull(values.imageFocalPoint),
    imageDisplayMode: emptyToNull(values.imageDisplayMode) as (typeof MEDIA_DISPLAY_MODE_VALUES)[number] | null,
    mobileFileUrl: emptyToNull(values.mobileFileUrl),
    ogImageUrl: emptyToNull(values.ogImageUrl),
    relatedProjectId: emptyUuidToNull(values.relatedProjectId),
    relatedProofId: emptyUuidToNull(values.relatedProofId),
    relatedVideoId: emptyUuidToNull(values.relatedVideoId),
    uploadedBy: emptyToNull(values.uploadedBy),
  };
}
