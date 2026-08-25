import Link from "next/link";
import { Display } from "@/components/ui/Display";
import { IconBadge } from "@/components/ui/IconBadge";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import type { Dict, Locale } from "@/content/site";
import { Icon } from "@/lib/icons";
import { hrefFor } from "@/lib/routing";

/**
 * "Utforsk Noregna". The live homepage shows exactly three of the modules here
 * (Fremdrift, Rapportering, Kundeportal), with the full set of eight living on
 * Vaare systemer, so that is what this renders.
 *
 * Three cards of identical width is the most templated arrangement there is, so
 * the first card takes the wider column and carries the larger badge. It leads
 * on size, not on colour: all three are platform modules, so tinting one would
 * imply a difference that is not there.
 */
export function SystemsRail({
  t,
  locale,
}: {
  t: Dict;
  locale: Locale;
}) {
  const s = t.home.systems;
  const servicesHref = hrefFor(locale, "services");
  const [lead, ...rest] = s.items;

  return (
    <Section tone="sunken">
      <div className="container-page">
        <Reveal>
          <Display level={2}>{s.title}</Display>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-4 lg:grid-cols-12">
          <RevealItem as="article" className="lg:col-span-5">
            <Link
              href={`${servicesHref}#${lead.slug}`}
              className="hover-lift flex h-full flex-col rounded-2xl border border-line bg-surface p-7 md:p-8"
            >
              <IconBadge name={lead.icon} size="lg" tone="solid" />
              <Display level={4} as="h3" className="mt-6">
                {lead.name}
              </Display>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-[1.65] text-ink-muted">
                {lead.body}
              </p>
              <Arrow />
            </Link>
          </RevealItem>

          <div className="grid gap-4 lg:col-span-7">
            {rest.map((m) => (
              <RevealItem as="article" key={m.slug}>
                <Link
                  href={`${servicesHref}#${m.slug}`}
                  className="hover-lift flex h-full gap-5 rounded-2xl border border-line bg-surface p-7 md:p-8"
                >
                  <IconBadge name={m.icon} tone="solid" />
                  <span className="min-w-0 flex-1">
                    <Display level={4} as="h3">
                      {m.name}
                    </Display>
                    <span className="mt-3 block text-[0.9375rem] leading-[1.65] text-ink-muted">
                      {m.body}
                    </span>
                    <Arrow />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </div>
        </RevealGroup>
      </div>
    </Section>
  );
}

function Arrow() {
  return (
    <span
      aria-hidden
      className="mt-6 inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-ink transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1 motion-reduce:transition-none"
    >
      <Icon name="arrowRight" size={16} />
    </span>
  );
}
