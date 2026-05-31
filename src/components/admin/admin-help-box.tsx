type AdminHelpBoxProps = {
  title?: string;
  children: React.ReactNode;
  compact?: boolean;
};

export function AdminHelpBox({
  title = "Help",
  children,
  compact = false,
}: AdminHelpBoxProps) {
  return (
    <aside
      className={`rounded-lg border border-blue-100 bg-blue-50/60 text-sm leading-relaxed text-tb-text ${
        compact ? "px-3 py-2.5" : "px-3 py-3"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-tb-blue">
        {title}
      </p>
      <div className="mt-1.5 text-xs leading-relaxed text-tb-text-muted [&_li]:text-xs">
        {children}
      </div>
    </aside>
  );
}
