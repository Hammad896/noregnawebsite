import { Display } from "@/components/ui/Display";
import { IconBadge } from "@/components/ui/IconBadge";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { Dict } from "@/content/site";

/**
 * "Hva byrået får ut av Noregna".
 *
 * Every word here is Noregna's own, taken from FAQ answer 3. It is the most
 * persuasive copy on the site — benefit-led, specific, and about the firm
 * rather than the feature list — and until now it was sitting inside a
 * collapsed accordion near the bottom of the page, where a visitor deciding
 * whether to book a demo would never see it.
 *
 * Nothing is invented and nothing is rewritten. It is promoted.
 *
 * Placed after "Full oversikt" because that is where the argument turns from
 * what the system does to what the firm gets.
 */
export function Outcomes({ t }: { t: Dict }) {
  const o = t.home.outcomes;

  return (
    <Section>
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <Display level={2}>{o.title}</Display>
          <p className="mt-5 text-[1rem] leading-[1.65] text-ink-muted md:text-[1.0625rem]">
            {o.lead}
          </p>
        </Reveal>

        {/* Six items, six cells. Two rows of three at desktop, no empty tile at
            any breakpoint, and every card carries the same amount of copy. */}
        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {o.items.map((item) => (
            <RevealItem
              as="article"
              key={item.title}
              className="hover-lift flex flex-col rounded-2xl border border-line bg-surface p-6 md:p-7"
            >
              <IconBadge name={item.icon} tone="solid" />
              <h3 className="card-title mt-5">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[0.9375rem] leading-[1.6] text-ink-muted">{item.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
