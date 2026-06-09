import type { PublicProject } from "@/lib/public/projects";
import { parseYouTubeUrl } from "@/lib/public/youtube";

const EARLY_YEAR_RE = /\b(201[6-8])\b/;
const EARLY_AGE_RE = /\b(?:at\s+around\s+)?age\s+(\d{1,2})\b/i;
const EARLY_AT_AGE_RE = /\bAt\s+(\d{1,2}),/;

export const EARLY_WORK_VISIBLE_TAG_LIMIT = 5;

export function getEarlyWorkYouTubeThumbnail(
  videoUrl: string | null | undefined,
): string | null {
  if (!videoUrl) return null;
  return parseYouTubeUrl(videoUrl)?.thumbnailUrl ?? null;
}

export function hasEarlyWorkVideoDemo(
  videoUrl: string | null | undefined,
): boolean {
  if (!videoUrl) return false;
  return parseYouTubeUrl(videoUrl) !== null;
}

export function extractEarlyWorkYear(project: PublicProject): string | null {
  const text = `${project.fullDescription ?? ""} ${project.shortDescription}`;
  return text.match(EARLY_YEAR_RE)?.[1] ?? null;
}

export function extractEarlyWorkAge(project: PublicProject): string | null {
  const text = `${project.fullDescription ?? ""} ${project.shortDescription}`;
  const ageMatch = text.match(EARLY_AGE_RE);
  if (ageMatch?.[1]) return ageMatch[1];
  const atMatch = text.match(EARLY_AT_AGE_RE);
  return atMatch?.[1] ?? null;
}

export function buildEarlyWorkCardMeta(project: PublicProject): string {
  const parts: string[] = [];
  const year = extractEarlyWorkYear(project);
  const age = extractEarlyWorkAge(project);

  if (year) parts.push(year);
  if (age) parts.push(`Age ${age}`);
  if (hasEarlyWorkVideoDemo(project.videoUrl)) parts.push("Video demo");

  return parts.join(" · ");
}

export function getEarlyWorkCardImageSources(project: PublicProject): string[] {
  const sources: string[] = [];
  const youtubeThumb = getEarlyWorkYouTubeThumbnail(project.videoUrl);
  if (youtubeThumb) sources.push(youtubeThumb);
  if (project.coverImageUrl) sources.push(project.coverImageUrl);
  return sources;
}
