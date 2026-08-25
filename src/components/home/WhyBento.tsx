import { Display, Kicker } from "@/components/ui/Display";
import { IconBadge } from "@/components/ui/IconBadge";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CheckDot } from "@/components/ui/Section";
import type { Dict } from "@/content/site";

/**
 * "Forenkle arbeidsflyten din" — the two lists the live page keeps behind green
 * accordion bars: seven reasons, then five advantages.
 *
 * This replaces a seven-card bento that had two problems.
 *
 * First, two cells were tinted green and five were not, and the reason was
 * "variety". Decoration posing as meaning. Nothing here is tinted now; the
 * green lives in the badges, where it is consistent.
 *
 * Second, only three of the seven reasons have a description in the language
 * file, so four cards were an icon and a title floating in an empty box. Rows
 * absorb uneven content the way a grid of equal cards never can: a reason with
 * a description is simply a taller row.
 *
 * The head and the advantages share the left column, which also closes the dead
 * space that opened up when the head sat alone above a full-width grid.
 */
export function WhyBento({ t }: { t: Dict }) {
  const { intent, why, advantage } = t.home;

  return (
    <Section>
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-5">
            <Reveal>
              <Display level={2}>{intent.title}</Display>
              <p className="mt-5 max-w-[52ch] text-[1rem] leading-[1.65] text-ink-muted">
                {intent.body}
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-10">
              <div className="rounded-2xl border border-line bg-bg-sunken p-6 md:p-7">
                <Kicker>{advantage.title}</Kicker>
                <ul className="mt-5 grid gap-3.5">
                  {advantage.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[0.9375rem] leading-[1.5] text-ink"
                    >
                      <CheckDot />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <Reveal>
              <Kicker>{why.title}</Kicker>
            </Reveal>

            <RevealGroup
              as="ul"
              className="mt-5 overflow-hidden rounded-2xl border border-line bg-surface"
            >
              {why.items.map((item, i) => (
                <RevealItem
                  as="li"
                  key={item.title}
                  className={`flex gap-4 p-5 md:gap-5 md:p-6 ${
                    i > 0 ? "border-t border-line" : ""
                  }`}
                >
                  <IconBadge name={item.icon} size="sm" tone="solid" className="mt-0.5" />
                  <div className="min-w-0">
                    <h3 className="card-title">
                      {item.title}
                    </h3>
                    {/* Only three of the seven carry a description. A row simply
                        grows; it never leaves a hole. */}
                    {item.body ? (
                      <p className="mt-1.5 text-[0.9375rem] leading-[1.6] text-ink-muted">
                        {item.body}
                      </p>
                    ) : null}
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </Section>
  );
}
