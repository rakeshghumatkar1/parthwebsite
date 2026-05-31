import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/admin/auth";
import { createMediaRecord } from "@/lib/admin/media/queries";
import {
  MEDIA_DISPLAY_MODE_VALUES,
  MEDIA_ROLE_VALUES,
} from "@/lib/admin/media/constants";
import { emptyToNull, emptyUuidToNull } from "@/lib/admin/shared/validation";
import { isBlobUploadConfigured, isUploadFolder } from "@/lib/blob/constants";
import { prepareUpload, validateUploadFile } from "@/lib/blob/validate";

export const runtime = "nodejs";

const BASE = "/admin/media";

function safeRedirect(path: string, request: Request) {
  return NextResponse.redirect(new URL(path, request.url), { status: 303 });
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isBlobUploadConfigured()) {
    return safeRedirect(`${BASE}/new?mode=upload&error=Upload+is+not+configured.`, request);
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return safeRedirect(`${BASE}/new?mode=upload&error=Could+not+read+upload+request.`, request);
  }

  const folder = String(formData.get("uploadFolder") ?? "");
  if (!isUploadFolder(folder)) {
    return safeRedirect(`${BASE}/new?mode=upload&error=Select+a+valid+upload+folder.`, request);
  }

  const fileResult = validateUploadFile(formData.get("file"));
  if (!fileResult.ok) {
    return safeRedirect(
      `${BASE}/new?mode=upload&error=${encodeURIComponent(fileResult.error)}`,
      request,
    );
  }

  const prepared = prepareUpload(fileResult.file, folder);

  const imageRole = String(formData.get("imageRole") ?? "").trim();
  const imageDisplayMode = String(formData.get("imageDisplayMode") ?? "").trim();

  if (imageRole && !MEDIA_ROLE_VALUES.includes(imageRole as never)) {
    return safeRedirect(`${BASE}/new?mode=upload&error=Invalid+image+role.`, request);
  }
  if (
    imageDisplayMode &&
    !MEDIA_DISPLAY_MODE_VALUES.includes(imageDisplayMode as never)
  ) {
    return safeRedirect(`${BASE}/new?mode=upload&error=Invalid+display+mode.`, request);
  }

  try {
    const blob = await put(prepared.pathname, fileResult.file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      contentType: prepared.mimeType,
    });

    if (!blob.pathname.startsWith("parthwebsite/")) {
      return safeRedirect(
        `${BASE}/new?mode=upload&error=Upload+path+validation+failed.`,
        request,
      );
    }

    const created = await createMediaRecord({
      fileUrl: blob.url,
      fileName: prepared.fileName,
      fileType: prepared.fileType,
      mimeType: prepared.mimeType,
      fileSizeBytes: prepared.fileSizeBytes,
      altText: emptyToNull(String(formData.get("altText") ?? "")),
      caption: emptyToNull(String(formData.get("caption") ?? "")),
      imageRole: emptyToNull(imageRole) as (typeof MEDIA_ROLE_VALUES)[number] | null,
      imageDisplayMode: emptyToNull(imageDisplayMode) as
        | (typeof MEDIA_DISPLAY_MODE_VALUES)[number]
        | null,
      relatedProjectId: emptyUuidToNull(String(formData.get("relatedProjectId") ?? "")),
      relatedProofId: emptyUuidToNull(String(formData.get("relatedProofId") ?? "")),
      relatedVideoId: emptyUuidToNull(String(formData.get("relatedVideoId") ?? "")),
      uploadedBy: admin.email,
    });

    revalidatePath(BASE);
    return safeRedirect(`${BASE}/${created.id}?saved=1`, request);
  } catch {
    return safeRedirect(
      `${BASE}/new?mode=upload&error=Upload+failed.+Try+again+or+use+a+URL+instead.`,
      request,
    );
  }
}
