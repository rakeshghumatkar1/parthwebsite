type AdminCardProps = {
  title: string;
  description: string;
  status?: string;
};

export function AdminPlaceholderCard({
  title,
  description,
  status = "Coming next",
}: AdminCardProps) {
  return (
    <article className="rounded-lg border border-tb-navy-border bg-tb-surface p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold">{title}</h3>
        <span className="shrink-0 rounded-full bg-tb-surface-muted px-2.5 py-0.5 text-xs font-medium text-tb-text-muted">
          {status}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-tb-text-muted">
        {description}
      </p>
    </article>
  );
}
