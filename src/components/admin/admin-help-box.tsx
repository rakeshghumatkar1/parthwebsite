type AdminHelpBoxProps = {
  title?: string;
  children: React.ReactNode;
};

export function AdminHelpBox({ title = "Help", children }: AdminHelpBoxProps) {
  return (
    <aside className="rounded-lg border border-tb-blue/20 bg-tb-blue/5 px-4 py-3 text-sm leading-relaxed text-tb-text">
      <p className="font-medium text-tb-text">{title}</p>
      <div className="mt-1 text-tb-text-muted">{children}</div>
    </aside>
  );
}
