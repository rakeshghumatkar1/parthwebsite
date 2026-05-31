type AdminFilterPanelProps = {
  children: React.ReactNode;
  title?: string;
};

export function AdminFilterPanel({
  children,
  title = "Filters",
}: AdminFilterPanelProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-3 py-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-tb-text-muted">
          {title}
        </span>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}
