import { adminCardClass } from "@/lib/admin/admin-ui";

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
    <section className={`space-y-3 p-4 ${adminCardClass}`}>
      <div>
        <h2 className="text-sm font-semibold text-tb-text">{title}</h2>
        {description ? (
          <p className="mt-0.5 text-xs leading-relaxed text-tb-text-muted">
            {description}
          </p>
        ) : null}
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export function AdminFieldHint({ children }: { children: React.ReactNode }) {
  return <p className="text-xs leading-relaxed text-tb-text-muted">{children}</p>;
}
