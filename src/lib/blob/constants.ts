/** Parth-only prefix in the shared thinkbigdigital-blob store. */
export const BLOB_PREFIX = "parthwebsite";

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export const UPLOAD_FOLDER_OPTIONS = [
  { value: "projects", label: "Projects", path: `${BLOB_PREFIX}/projects/` },
  { value: "proof", label: "Proof", path: `${BLOB_PREFIX}/proof/` },
  { value: "videos", label: "Videos", path: `${BLOB_PREFIX}/videos/` },
  { value: "downloads", label: "Downloads", path: `${BLOB_PREFIX}/downloads/` },
  { value: "profile", label: "Profile", path: `${BLOB_PREFIX}/profile/` },
  { value: "og", label: "OG / Social", path: `${BLOB_PREFIX}/og/` },
] as const;

export type UploadFolder = (typeof UPLOAD_FOLDER_OPTIONS)[number]["value"];

export const UPLOAD_FOLDER_VALUES = UPLOAD_FOLDER_OPTIONS.map((o) => o.value);

export const ALLOWED_UPLOAD_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
  "text/plain",
  "text/markdown",
]);

export const UPLOAD_MIME_LABELS: Record<string, string> = {
  "image/jpeg": "JPEG image",
  "image/png": "PNG image",
  "image/webp": "WebP image",
  "image/gif": "GIF image",
  "application/pdf": "PDF document",
  "text/plain": "Plain text",
  "text/markdown": "Markdown",
};

export function isUploadFolder(value: string): value is UploadFolder {
  return UPLOAD_FOLDER_VALUES.includes(value as UploadFolder);
}

export function uploadFolderPath(folder: UploadFolder): string {
  const option = UPLOAD_FOLDER_OPTIONS.find((o) => o.value === folder);
  if (!option) {
    throw new Error("Invalid upload folder.");
  }
  return option.path;
}

export function isBlobUploadConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}
