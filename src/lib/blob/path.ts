import { randomBytes } from "node:crypto";
import type { UploadFolder } from "@/lib/blob/constants";
import { BLOB_PREFIX, uploadFolderPath } from "@/lib/blob/constants";

const UNSAFE_CHARS = /[^a-z0-9.-]+/g;

export function sanitizeUploadFilename(originalName: string): string {
  const trimmed = originalName.trim().toLowerCase();
  const lastDot = trimmed.lastIndexOf(".");
  const base = lastDot > 0 ? trimmed.slice(0, lastDot) : trimmed;
  const ext = lastDot > 0 ? trimmed.slice(lastDot + 1).replace(/[^a-z0-9]+/g, "") : "";

  const safeBase = base
    .replace(/\s+/g, "-")
    .replace(UNSAFE_CHARS, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);

  const safeExt = ext.slice(0, 10);
  const name = safeBase || "file";
  return safeExt ? `${name}.${safeExt}` : name;
}

export function buildBlobPathname(folder: UploadFolder, originalName: string): string {
  const folderPath = uploadFolderPath(folder);
  const safeName = sanitizeUploadFilename(originalName);
  const suffix = `${Date.now()}-${randomBytes(4).toString("hex")}`;
  const pathname = `${folderPath}${suffix}-${safeName}`;

  if (!pathname.startsWith(`${BLOB_PREFIX}/`)) {
    throw new Error("Upload path must stay under parthwebsite/ prefix.");
  }

  return pathname;
}

export function deriveFileTypeCategory(mimeType: string): string {
  if (mimeType.startsWith("image/")) {
    return "image";
  }
  if (mimeType === "application/pdf") {
    return "pdf";
  }
  if (mimeType.startsWith("text/")) {
    return "text";
  }
  return "file";
}

export function parseParthBlobFolder(fileUrl: string): string | null {
  try {
    const url = new URL(fileUrl);
    const match = url.pathname.match(/\/parthwebsite\/([^/]+)\//);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

export function isParthBlobUploadUrl(fileUrl: string): boolean {
  return parseParthBlobFolder(fileUrl) !== null;
}
