export type YouTubeEmbed = {
  videoId: string;
  embedUrl: string;
  thumbnailUrl: string;
  originalUrl: string;
};

const YOUTUBE_VIDEO_ID = /^[a-zA-Z0-9_-]{11}$/;

function parseYouTubeStartTime(value: string): number {
  if (/^\d+$/.test(value)) {
    return Number(value);
  }

  let total = 0;
  const hours = value.match(/(\d+)h/i);
  const minutes = value.match(/(\d+)m/i);
  const seconds = value.match(/(\d+)s/i);

  if (hours) total += Number(hours[1]) * 3600;
  if (minutes) total += Number(minutes[1]) * 60;
  if (seconds) total += Number(seconds[1]);

  return total;
}

function buildYouTubeEmbed(videoId: string, url: URL, originalUrl: string): YouTubeEmbed {
  const embedParams = new URLSearchParams();
  const startParam = url.searchParams.get("t") ?? url.searchParams.get("start");
  if (startParam) {
    const startSeconds = parseYouTubeStartTime(startParam);
    if (startSeconds > 0) {
      embedParams.set("start", String(startSeconds));
    }
  }

  const embedBase = `https://www.youtube-nocookie.com/embed/${videoId}`;
  const embedUrl = embedParams.size ? `${embedBase}?${embedParams.toString()}` : embedBase;

  return {
    videoId,
    embedUrl,
    thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    originalUrl,
  };
}

/** Parse supported YouTube watch, short, and embed URLs into a safe embed payload. */
export function parseYouTubeUrl(input: string): YouTubeEmbed | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./, "").replace(/^m\./, "");

    if (host !== "youtube.com" && host !== "youtu.be") {
      return null;
    }

    let videoId: string | null = null;

    if (host === "youtu.be") {
      videoId = url.pathname.split("/").filter(Boolean)[0] ?? null;
    } else if (url.pathname.startsWith("/embed/")) {
      videoId = url.pathname.split("/")[2] ?? null;
    } else if (url.pathname.startsWith("/shorts/")) {
      videoId = url.pathname.split("/")[2] ?? null;
    } else {
      videoId = url.searchParams.get("v");
    }

    if (!videoId || !YOUTUBE_VIDEO_ID.test(videoId)) {
      return null;
    }

    return buildYouTubeEmbed(videoId, url, trimmed);
  } catch {
    return null;
  }
}
