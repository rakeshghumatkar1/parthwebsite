import Image from "next/image";
import Link from "next/link";
import type { PublicVideo } from "@/lib/public/videos";
import { formatPublicDate } from "@/lib/public/format";
import { videoCategoryLabel } from "@/lib/public/videos";
import type { PublicMedia } from "@/lib/public/media";

type VideoCardProps = {
  video: PublicVideo;
  thumbnail?: PublicMedia | null;
};

export function VideoCard({ video, thumbnail }: VideoCardProps) {
  const eventDate = formatPublicDate(video.eventDate);
  const category = videoCategoryLabel(video.category);

  return (
    <article className="flex min-h-[200px] flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-colors hover:border-tb-blue/30 sm:p-8">
      <div
        className="mb-5 h-1 w-12 rounded-full bg-gradient-to-r from-tb-blue to-tb-cyan"
        aria-hidden
      />
      {thumbnail?.fileUrl ? (
        <Image
          src={thumbnail.fileUrl}
          alt={thumbnail.altText ?? video.title}
          width={640}
          height={144}
          unoptimized
          className="mb-5 h-36 w-full rounded-lg border border-slate-200 object-cover"
        />
      ) : null}
      {category ? (
        <span className="w-fit rounded-full bg-tb-surface-muted px-2.5 py-0.5 text-xs font-medium text-tb-text-muted">
          {category}
        </span>
      ) : null}
      <h3 className="mt-4 text-xl font-semibold leading-snug text-tb-text">
        {video.title}
      </h3>
      {video.shortDescription ? (
        <p className="mt-3 flex-1 text-sm leading-relaxed text-tb-text-muted sm:text-base">
          {video.shortDescription}
        </p>
      ) : null}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-tb-text-muted">
        {video.relatedProjectTitle && video.relatedProjectSlug ? (
          <Link
            href={`/projects/${video.relatedProjectSlug}`}
            className="font-medium text-tb-blue hover:underline"
          >
            {video.relatedProjectTitle}
          </Link>
        ) : null}
        {eventDate ? <span>{eventDate}</span> : null}
      </div>
      {video.youtubeUrl ? (
        <div className="mt-6">
          <a
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-tb-blue hover:underline"
          >
            Watch video
          </a>
        </div>
      ) : null}
    </article>
  );
}
