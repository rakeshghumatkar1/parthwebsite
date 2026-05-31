type AdminWhatAppearsWhereProps = {
  title?: string;
  items: string[];
};

export function AdminWhatAppearsWhere({
  title = "Where this appears later",
  items,
}: AdminWhatAppearsWhereProps) {
  return (
    <aside className="rounded-lg border border-tb-navy-border bg-tb-surface-muted/50 px-4 py-3 text-sm">
      <p className="font-medium text-tb-text">{title}</p>
      <ul className="mt-2 list-disc space-y-1 pl-4 text-tb-text-muted">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
