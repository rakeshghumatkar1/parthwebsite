type AdminFormSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function AdminFormSection({
  title,
  description,
  children,
}: AdminFormSectionProps) {
  return (
    <section className="space-y-4 rounded-lg border border-tb-navy-border bg-tb-surface p-5">
      <div>
        <h2 className="text-base font-semibold">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm text-tb-text-muted">{description}</p>
        ) : null}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function AdminFieldHint({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-tb-text-muted">{children}</p>;
}
