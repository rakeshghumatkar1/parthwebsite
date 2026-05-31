import Link from "next/link";
import type { PublicUpdate } from "@/lib/public/updates";
import { formatPublicDate, excerptText } from "@/lib/public/format";
import { updateTypeLabel } from "@/lib/public/updates";

type UpdateListItemProps = {
  update: PublicUpdate;
};

export function UpdateListItem({ update }: UpdateListItemProps) {
  const eventDate = formatPublicDate(update.eventDate);
  const excerpt =
    update.shortSummary?.trim() || excerptText(update.body) || null;

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-tb-surface-muted px-2.5 py-0.5 text-xs font-medium text-tb-text-muted">
          {updateTypeLabel(update.updateType)}
        </span>
        {eventDate ? (
          <span className="text-xs text-tb-text-muted">{eventDate}</span>
        ) : null}
      </div>
      <h3 className="mt-4 text-xl font-semibold text-tb-text">{update.title}</h3>
      {excerpt ? (
        <p className="mt-3 text-sm leading-relaxed text-tb-text-muted sm:text-base">
          {excerpt}
        </p>
      ) : null}
      {update.relatedProjectTitle && update.relatedProjectSlug ? (
        <p className="mt-4 text-sm">
          <Link
            href={`/projects/${update.relatedProjectSlug}`}
            className="font-medium text-tb-blue hover:underline"
          >
            {update.relatedProjectTitle}
          </Link>
        </p>
      ) : null}
    </article>
  );
}
