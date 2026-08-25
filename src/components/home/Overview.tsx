import { IconBadge } from "@/components/ui/IconBadge";
import { Display } from "@/components/ui/Display";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { Dict } from "@/content/site";

const POINT_ICONS = ["deadline", "kyc", "overview"];

export function Overview({ t }: { t: Dict }) {
  const o = t.home.overview;

  return (
    <Section tone="sunken">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Display level={2} as="h2">
                {o.title}
              </Display>
              <p className="mt-5 text-[1rem] leading-[1.65] text-ink-muted">{o.lead}</p>
              <p className="mt-6 border-l-2 border-accent-soft-line pl-5 text-[0.9375rem] leading-[1.7] text-ink-muted">
                {o.close}
              </p>
            </Reveal>
          </div>

          {/* The dashboard's three jobs, as three rows separated by a single
              hairline each. No boxes, no filled progress tracks. */}
          <div className="lg:col-span-7">
            <RevealGroup as="ul" className="rounded-2xl border border-line bg-surface">
              {o.points.map((point, i) => (
                <RevealItem
                  as="li"
                  key={point}
                  className={`flex gap-5 p-6 md:p-8 ${i > 0 ? "border-t border-line" : ""}`}
                >
                  <IconBadge name={POINT_ICONS[i] ?? "overview"} tone="solid" />
                  <p className="self-center text-[1rem] leading-[1.55] text-ink md:text-[1.0625rem]">
                    {point}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </Section>
  );
}
