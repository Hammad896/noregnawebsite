import { Display } from "@/components/ui/Display";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { Dict } from "@/content/site";
import { Icon } from "@/lib/icons";

/**
 * Five answers, each running to six or eight points. Printed flat that is a
 * two-thousand-pixel wall, so it is progressive disclosure instead, built on
 * native <details> so it needs no JavaScript, stays keyboard operable, and is
 * still crawlable. The first answer is open, because it is the one everybody
 * reads.
 *
 * The heading column is sticky on desktop, which is what keeps this from
 * reading like the accordion on every other SaaS page.
 */
export function Faq({ t }: { t: Dict }) {
  const f = t.home.faq;

  return (
    <Section tone="sunken">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <Display level={2} as="h2">
                  {f.title}
                </Display>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.06}>
              <div className="overflow-hidden rounded-2xl border border-line bg-surface">
                {f.items.map((item, i) => (
                  <details
                    key={item.q}
                    open={i === 0}
                    className="group border-line [&:not(:first-child)]:border-t"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-6 text-left transition-colors duration-200 hover:bg-accent-soft/60 md:p-7 [&::-webkit-details-marker]:hidden">
                      <h3 className="card-title flex items-baseline gap-4">
                        {/* Green numerals, as on noregna.no */}
                        <span aria-hidden className="tnum text-[0.875rem] font-semibold text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{item.q}</span>
                      </h3>
                      <span
                        aria-hidden
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-ink-muted rotate-45 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-open:rotate-0 motion-reduce:transition-none"
                      >
                        <Icon name="close" size={15} />
                      </span>
                    </summary>

                    <div className="px-6 pb-7 md:px-7 md:pl-[3.9rem]">
                      <p className="max-w-[68ch] text-[0.9375rem] leading-[1.7] text-ink-muted">
                        {item.a}
                      </p>

                      {item.points ? (
                        <ul className="mt-5 grid gap-3">
                          {item.points.map((point) => {
                            // The source copy writes these as "Label: detail".
                            // Splitting on the first colon lets the label carry
                            // the weight without inventing new text.
                            const idx = point.indexOf(":");
                            const label = idx > 0 ? point.slice(0, idx) : null;
                            const rest = idx > 0 ? point.slice(idx + 1).trim() : point;

                            return (
                              <li
                                key={point}
                                className="flex gap-3 text-[0.9375rem] leading-[1.65] text-ink-muted"
                              >
                                <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                <span>
                                  {label ? (
                                    <span className="font-medium text-ink">{label}. </span>
                                  ) : null}
                                  {rest}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      ) : null}

                      {item.close ? (
                        <p className="mt-5 max-w-[68ch] border-l-2 border-accent-soft-line pl-4 text-[0.9375rem] leading-[1.7] text-ink-muted">
                          {item.close}
                        </p>
                      ) : null}
                    </div>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
