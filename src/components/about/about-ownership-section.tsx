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
      ? "border-tb-blue/25 bg-blue-50/40"
      : "border-amber-200/70 bg-amber-50/35";

  return (
    <article className={`rounded-lg border p-3.5 sm:p-4 ${accentClass}`}>
      <h3 className="text-base font-semibold text-tb-text">{title}</h3>
      <ul className="mt-3 space-y-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2 text-sm leading-relaxed text-tb-text-muted"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tb-blue" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function AboutOwnershipSection() {
  return (
    <Section tone="muted" dense>
      <SectionHeader
        dense
        eyebrow="Full-Project Ownership, With Review"
        title="Technical building capability with delivery structure."
      />
      <div className="overflow-hidden rounded-lg border border-slate-200/90 bg-white shadow-sm">
        <div className="grid divide-y divide-slate-200/90 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
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
        <div className="border-t border-slate-200/90 border-l-[3px] border-l-tb-blue bg-slate-50/80 px-3.5 py-2.5 sm:px-4">
          <p className="text-sm leading-relaxed text-tb-text-muted">
            Parth brings technical building capability. Think Big provides business
            direction, review discipline, client communication, documentation, and
            delivery support.
          </p>
        </div>
      </div>
    </Section>
  );
}
