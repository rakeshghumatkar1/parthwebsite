import {
  ALLOWED_UPLOAD_MIME_TYPES,
  MAX_UPLOAD_BYTES,
  UPLOAD_MIME_LABELS,
  type UploadFolder,
} from "@/lib/blob/constants";
import { buildBlobPathname, deriveFileTypeCategory } from "@/lib/blob/path";

export type UploadValidationResult =
  | { ok: true; file: File }
  | { ok: false; error: string };

export function validateUploadFile(file: unknown): UploadValidationResult {
  if (!(file instanceof File)) {
    return { ok: false, error: "Choose a file to upload." };
  }

  if (file.size <= 0) {
    return { ok: false, error: "The selected file is empty." };
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return {
      ok: false,
      error: `File is too large. Maximum size is ${Math.floor(MAX_UPLOAD_BYTES / (1024 * 1024))} MB.`,
    };
  }

  const mimeType = file.type.trim().toLowerCase();
  if (!mimeType || !ALLOWED_UPLOAD_MIME_TYPES.has(mimeType)) {
    const allowed = Object.values(UPLOAD_MIME_LABELS).join(", ");
    return {
      ok: false,
      error: `Unsupported file type. Allowed: ${allowed}.`,
    };
  }

  return { ok: true, file };
}

export type PreparedUpload = {
  pathname: string;
  fileName: string;
  mimeType: string;
  fileType: string;
  fileSizeBytes: number;
};

export function prepareUpload(
  file: File,
  folder: UploadFolder,
): PreparedUpload {
  const mimeType = file.type.trim().toLowerCase();
  return {
    pathname: buildBlobPathname(folder, file.name || "upload"),
    fileName: file.name.trim() || "upload",
    mimeType,
    fileType: deriveFileTypeCategory(mimeType),
    fileSizeBytes: file.size,
  };
}
