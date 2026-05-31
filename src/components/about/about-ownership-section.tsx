import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import {
  ABOUT_OWNERSHIP_LEFT,
  ABOUT_OWNERSHIP_RIGHT,
} from "@/lib/about-page-content";

function OwnershipCard({
  title,
  items,
  accent,
}: {
  title: string;
  items: readonly string[];
  accent: "blue" | "amber";
}) {
  const accentClass =
    accent === "blue"
      ? "border-tb-blue/30 bg-blue-50/50"
      : "border-amber-200/80 bg-amber-50/40";

  return (
    <article className={`rounded-2xl border p-6 sm:p-8 ${accentClass}`}>
      <h3 className="text-lg font-semibold text-tb-text">{title}</h3>
      <ul className="mt-5 space-y-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2 text-sm leading-relaxed text-tb-text-muted sm:text-base"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-tb-blue" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function AboutOwnershipSection() {
  return (
    <Section tone="light">
      <SectionHeader
        eyebrow="Full-Project Ownership, With Review"
        title="Technical building capability with delivery structure."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <OwnershipCard
          title="What Parth can own"
          items={ABOUT_OWNERSHIP_LEFT}
          accent="blue"
        />
        <OwnershipCard
          title="Where serious delivery needs structure"
          items={ABOUT_OWNERSHIP_RIGHT}
          accent="amber"
        />
      </div>
      <p className="mt-8 rounded-2xl border border-slate-200 bg-tb-surface-muted px-6 py-5 text-sm leading-relaxed text-tb-text-muted sm:text-base">
        Parth brings technical building capability. Think Big provides business
        direction, review discipline, client communication, documentation, and
        delivery support.
      </p>
    </Section>
  );
}
