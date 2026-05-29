import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { founderCredibilityPoints } from "@/lib/home-data";

export function TechnicalFounderSection() {
  return (
    <Section id="technical-founder" tone="light">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-start lg:gap-12 xl:grid-cols-[minmax(0,26rem)_1fr] xl:gap-16">
        <div className="max-w-xl lg:max-w-none">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tb-blue">
            Technical Founder Layer
          </p>
          <h2 className="mt-3 max-w-md text-balance text-2xl font-semibold leading-snug tracking-tight text-tb-text sm:text-[1.75rem] lg:text-3xl">
            Self-built credibility shaped through years of building, testing, and
            improving.
          </h2>

          <div className="mt-6 max-w-prose space-y-4 text-base leading-relaxed text-tb-text-muted">
            <p>
              Parth’s technical path did not begin with a formal job title or a
              college brand. It began with curiosity, electronics, YouTube learning,
              robotics, Arduino, C++, IoT, drones, Python, Raspberry Pi, sensors,
              automation, and public project demos.
            </p>
            <p>
              Over time, that early technical exposure moved into software systems,
              AI-assisted workflows, data platforms, internal tools, and
              business-facing applications.
            </p>
            <p className="font-medium text-tb-text">
              The important point is not only that he started young. The stronger
              point is that he kept building.
            </p>
          </div>

          <div className="mt-8 lg:mt-10">
            <Button href="#technical-founder" variant="ghost">
              Read About Parth
            </Button>
          </div>
        </div>

        <ul className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:gap-5">
          {founderCredibilityPoints.map((point, index) => (
            <li
              key={point.title}
              className={`flex ${
                index === founderCredibilityPoints.length - 1 &&
                founderCredibilityPoints.length % 2 !== 0
                  ? "sm:col-span-2"
                  : ""
              }`}
            >
              <article className="flex h-full w-full flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-100/80 sm:p-7">
                <h3 className="text-base font-semibold leading-snug text-tb-text sm:text-lg">
                  {point.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-tb-text-muted sm:text-[15px]">
                  {point.description}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
