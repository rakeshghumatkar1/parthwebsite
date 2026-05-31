import Image from "next/image";
import Link from "next/link";
import type { PublicProofItem } from "@/lib/public/proof";
import { formatPublicDate } from "@/lib/public/format";
import { proofPrimaryLink, proofTypeLabel } from "@/lib/public/proof";
import type { PublicMedia } from "@/lib/public/media";

type ProofCardProps = {
  item: PublicProofItem;
  media?: PublicMedia | null;
};

export function ProofCard({ item, media }: ProofCardProps) {
  const link = proofPrimaryLink(item);
  const eventDate = formatPublicDate(item.eventDate);

  return (
    <article className="flex min-h-[200px] flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-colors hover:border-tb-blue/30 sm:p-8">
      <div
        className="mb-5 h-1 w-12 rounded-full bg-gradient-to-r from-tb-blue to-tb-cyan"
        aria-hidden
      />
      {media?.fileUrl ? (
        <Image
          src={media.fileUrl}
          alt={media.altText ?? item.title}
          width={640}
          height={144}
          unoptimized
          className="mb-5 h-36 w-full rounded-lg border border-slate-200 object-cover"
        />
      ) : null}
      <span className="w-fit rounded-full bg-tb-surface-muted px-2.5 py-0.5 text-xs font-medium text-tb-text-muted">
        {proofTypeLabel(item.proofType)}
      </span>
      <h3 className="mt-4 text-xl font-semibold leading-snug text-tb-text">
        {item.title}
      </h3>
      {item.shortDescription ? (
        <p className="mt-3 flex-1 text-sm leading-relaxed text-tb-text-muted sm:text-base">
          {item.shortDescription}
        </p>
      ) : null}
      {item.whatThisProves ? (
        <p className="mt-3 text-sm leading-relaxed text-tb-text-muted">
          <span className="font-medium text-tb-text">What this proves: </span>
          {item.whatThisProves}
        </p>
      ) : null}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-tb-text-muted">
        {item.relatedProjectTitle && item.relatedProjectSlug ? (
          <Link
            href={`/projects/${item.relatedProjectSlug}`}
            className="font-medium text-tb-blue hover:underline"
          >
            {item.relatedProjectTitle}
          </Link>
        ) : null}
        {eventDate ? <span>{eventDate}</span> : null}
      </div>
      {link ? (
        <div className="mt-6">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-tb-blue hover:underline"
          >
            View proof
          </a>
        </div>
      ) : null}
    </article>
  );
}
