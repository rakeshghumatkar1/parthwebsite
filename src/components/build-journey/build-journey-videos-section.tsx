import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconPlay } from "@/components/ui/icons";
import { formatPublicDate } from "@/lib/public/format";
import type { PublicMedia } from "@/lib/public/media";
import {
  videoCategoryLabel,
  type PublicVideo,
} from "@/lib/public/videos";

type BuildJourneyVideoCardProps = {
  video: PublicVideo;
  thumbnail?: PublicMedia | null;
};

function BuildJourneyVideoCard({ video, thumbnail }: BuildJourneyVideoCardProps) {
  const eventDate = formatPublicDate(video.eventDate);
  const category = videoCategoryLabel(video.category);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-tb-navy-border/90 bg-tb-navy-elevated/90 shadow-lg ring-1 ring-white/5">
      <div className="relative aspect-video w-full bg-tb-navy">
        {thumbnail?.fileUrl ? (
          <Image
            src={thumbnail.fileUrl}
            alt={thumbnail.altText ?? video.title}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-tb-cyan/40">
            <IconPlay className="h-12 w-12" />
          </div>
        )}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-tb-navy/60 to-transparent"
          aria-hidden
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {category ? (
          <span className="w-fit rounded-full border border-tb-navy-border bg-tb-navy/60 px-2.5 py-0.5 text-xs font-medium text-tb-text-on-dark-muted">
            {category}
          </span>
        ) : null}
        <h3 className="mt-3 text-lg font-semibold leading-snug text-white">
          {video.title}
        </h3>
        {video.shortDescription ? (
          <p className="mt-2 flex-1 text-sm leading-relaxed text-tb-text-on-dark-muted">
            {video.shortDescription}
          </p>
        ) : null}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-tb-text-on-dark-muted">
          {video.relatedProjectTitle && video.relatedProjectSlug ? (
            <Link
              href={`/projects/${video.relatedProjectSlug}`}
              className="font-medium text-tb-cyan hover:underline"
            >
              {video.relatedProjectTitle}
            </Link>
          ) : null}
          {eventDate ? <span>{eventDate}</span> : null}
        </div>
        {video.youtubeUrl ? (
          <div className="mt-5">
            <a
              href={video.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-tb-cyan hover:underline"
            >
              Watch Video
              <span aria-hidden>→</span>
            </a>
          </div>
        ) : null}
      </div>
    </article>
  );
}

type BuildJourneyVideosSectionProps = {
  videos: PublicVideo[];
  mediaMap: Map<string, PublicMedia>;
};

export function BuildJourneyVideosSection({
  videos,
  mediaMap,
}: BuildJourneyVideosSectionProps) {
  if (videos.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-tb-navy-deep via-tb-navy to-tb-navy text-tb-text-on-dark">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:py-28">
        <header className="mb-12 sm:mb-14">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-tb-cyan">
            Selected Early Project Videos
          </p>
          <h2 className="text-balance text-2xl font-semibold leading-[1.15] tracking-tight text-white sm:text-3xl lg:text-[2.5rem]">
            Early builds. Real demos. Visible proof.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-tb-text-on-dark-muted sm:text-lg">
            A few selected videos from early projects that started the journey.
          </p>
        </header>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <li key={video.id}>
              <BuildJourneyVideoCard
                video={video}
                thumbnail={
                  video.thumbnailMediaId
                    ? mediaMap.get(video.thumbnailMediaId) ?? null
                    : null
                }
              />
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Button href="/videos" variant="secondary" dark size="lg">
            View All Videos
          </Button>
        </div>
      </div>
    </section>
  );
}
