import { asc } from "drizzle-orm";
import { getDb } from "@/db";
import { media } from "@/db/schema/media";
import { milestones } from "@/db/schema/milestones";
import { projects } from "@/db/schema/projects";
import { proofItems } from "@/db/schema/proof-items";
import { videos } from "@/db/schema/videos";

export type RelationOption = { id: string; label: string };

export async function getProjectOptions(): Promise<RelationOption[]> {
  const db = getDb();
  const rows = await db
    .select({ id: projects.id, title: projects.title })
    .from(projects)
    .orderBy(asc(projects.title));
  return rows.map((r) => ({ id: r.id, label: r.title }));
}

export async function getProofOptions(): Promise<RelationOption[]> {
  const db = getDb();
  const rows = await db
    .select({ id: proofItems.id, title: proofItems.title })
    .from(proofItems)
    .orderBy(asc(proofItems.title));
  return rows.map((r) => ({ id: r.id, label: r.title }));
}

export async function getVideoOptions(): Promise<RelationOption[]> {
  const db = getDb();
  const rows = await db
    .select({ id: videos.id, title: videos.title })
    .from(videos)
    .orderBy(asc(videos.title));
  return rows.map((r) => ({ id: r.id, label: r.title }));
}

export async function getMilestoneOptions(): Promise<RelationOption[]> {
  const db = getDb();
  const rows = await db
    .select({ id: milestones.id, title: milestones.title })
    .from(milestones)
    .orderBy(asc(milestones.title));
  return rows.map((r) => ({ id: r.id, label: r.title }));
}

export async function getMediaOptions(): Promise<RelationOption[]> {
  const db = getDb();
  const rows = await db
    .select({ id: media.id, fileName: media.fileName, fileUrl: media.fileUrl })
    .from(media)
    .orderBy(asc(media.fileName));
  return rows.map((r) => ({
    id: r.id,
    label: r.fileName || r.fileUrl,
  }));
}

export function optionLabel(
  options: RelationOption[],
  id: string | null | undefined,
): string {
  if (!id) return "—";
  return options.find((o) => o.id === id)?.label ?? "—";
}
