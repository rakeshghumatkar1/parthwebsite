import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/admin/auth";
import { createMediaRecord } from "@/lib/admin/media/queries";
import { MAX_UPLOAD_BYTES } from "@/lib/blob/constants";
import { prepareUpload } from "@/lib/blob/validate";

export const runtime = "nodejs";

const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN?.trim()) {
    return NextResponse.json(
      { error: "Upload is not configured on the server." },
      { status: 500 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Could not read upload request." },
      { status: 400 },
    );
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "Choose a file to upload." },
      { status: 400 },
    );
  }

  if (file.size <= 0) {
    return NextResponse.json(
      { error: "The selected file is empty." },
      { status: 400 },
    );
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json(
      {
        error: `File is too large. Maximum size is ${Math.floor(
          MAX_UPLOAD_BYTES / (1024 * 1024),
        )} MB.`,
      },
      { status: 400 },
    );
  }

  const mimeType = file.type.trim().toLowerCase();
  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    return NextResponse.json(
      { error: "Unsupported file type. Allowed: JPEG, PNG, WebP." },
      { status: 400 },
    );
  }

  const prepared = prepareUpload(file, "projects");
  const projectId = String(formData.get("projectId") ?? "").trim() || null;
  const altText = String(formData.get("altText") ?? "").trim() || null;

  try {
    const blob = await put(prepared.pathname, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      contentType: prepared.mimeType,
    });

    if (!blob.pathname.startsWith("parthwebsite/")) {
      return NextResponse.json(
        { error: "Upload path validation failed." },
        { status: 500 },
      );
    }

    await createMediaRecord({
      fileUrl: blob.url,
      fileName: prepared.fileName,
      fileType: prepared.fileType,
      mimeType: prepared.mimeType,
      fileSizeBytes: prepared.fileSizeBytes,
      altText,
      imageRole: "card_thumbnail",
      imageDisplayMode: "contain",
      relatedProjectId: projectId,
      uploadedBy: admin.email,
    });

    return NextResponse.json({
      ok: true,
      fileUrl: blob.url,
      mimeType,
      fileSizeBytes: prepared.fileSizeBytes,
    });
  } catch {
    return NextResponse.json(
      { error: "Upload failed. Try again." },
      { status: 500 },
    );
  }
}
