import { inArray } from "drizzle-orm";
import { getDb, isDatabaseConfigured } from "@/db";
import { media } from "@/db/schema/media";

export type PublicMedia = {
  id: string;
  fileUrl: string;
  altText: string | null;
};

export async function getPublicMediaByIds(
  ids: string[],
): Promise<Map<string, PublicMedia>> {
  const uniqueIds = [...new Set(ids.filter(Boolean))];
  if (!isDatabaseConfigured() || uniqueIds.length === 0) {
    return new Map();
  }

  try {
    const db = getDb();
    const rows = await db
      .select({
        id: media.id,
        fileUrl: media.fileUrl,
        altText: media.altText,
      })
      .from(media)
      .where(inArray(media.id, uniqueIds));

    return new Map(
      rows
        .filter((row) => row.fileUrl?.trim())
        .map((row) => [
          row.id,
          {
            id: row.id,
            fileUrl: row.fileUrl,
            altText: row.altText,
          },
        ]),
    );
  } catch {
    return new Map();
  }
}

export async function getPublicMediaById(
  id: string | null | undefined,
): Promise<PublicMedia | null> {
  if (!id) {
    return null;
  }
  const map = await getPublicMediaByIds([id]);
  return map.get(id) ?? null;
}
