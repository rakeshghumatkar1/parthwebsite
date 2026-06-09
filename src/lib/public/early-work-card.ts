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

const FALLBACK_LABEL_RULES = [
  { label: "Arduino Build", pattern: /\barduino\b/i },
  {
    label: "Sensor Project",
    pattern: /\b(sensor|dht|ultrasonic|mq2|\bir\b|hall)\b/i,
  },
  { label: "Python Project", pattern: /\bpython\b/i },
  { label: "Web Experiment", pattern: /\b(html|web)\b/i },
  { label: "Robotics Build", pattern: /\b(robotics|lego|robot)\b/i },
  { label: "Drone Project", pattern: /\bdrone\b/i },
  { label: "Bluetooth Build", pattern: /\bbluetooth\b/i },
  { label: "Voice Automation", pattern: /\balexa\b/i },
  {
    label: "Automation Prototype",
    pattern: /\b(home automation|automation)\b/i,
  },
  { label: "Game Project", pattern: /\bgame\b/i },
] as const;

function getEarlyWorkFallbackSearchText(project: PublicProject): string {
  return [
    project.title,
    project.shortDescription,
    project.projectType,
    ...project.techStack,
  ].join(" ");
}

/** Category label for designed fallback thumbnails when no video/cover image exists. */
export function getEarlyWorkFallbackThumbnailLabel(project: PublicProject): string {
  const haystack = getEarlyWorkFallbackSearchText(project);
  for (const rule of FALLBACK_LABEL_RULES) {
    if (rule.pattern.test(haystack)) return rule.label;
  }
  return "Early Build";
}
