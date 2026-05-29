import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { founderCredibilityPoints } from "@/lib/home-data";

export function TechnicalFounderSection() {
  return (
    <Section id="technical-founder" tone="light">
      <SectionHeader
        eyebrow="Technical Founder Layer"
        title="Self-built credibility shaped through years of building, testing, and improving."
        description="Parth’s technical path did not begin with a formal job title or a college brand. It began with curiosity, electronics, YouTube learning, robotics, Arduino, C++, IoT, drones, Python, Raspberry Pi, sensors, automation, and public project demos."
      />

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4 text-base leading-relaxed text-tb-text-muted sm:text-lg">
          <p>
            Over time, that early technical exposure moved into software systems,
            AI-assisted workflows, data platforms, internal tools, and
            business-facing applications.
          </p>
          <p>
            The important point is not only that he started young. The stronger
            point is that he kept building.
          </p>
        </div>

        <ul className="grid gap-4">
          {founderCredibilityPoints.map((point) => (
            <li
              key={point.title}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-base font-semibold text-tb-text">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-tb-text-muted sm:text-base">
                {point.description}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <Button href="#technical-founder" variant="ghost">
          Read About Parth
        </Button>
      </div>
    </Section>
  );
}
