import { IconBadge } from "@/components/ui/IconBadge";
import { Display } from "@/components/ui/Display";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { getDict, type Locale } from "@/content/site";
import { Icon } from "@/lib/icons";
import { ServicesIndex } from "./ServicesIndex";

export function ServicesPage({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const { modules } = t.services;

  return (
    <>
      <Section size="sm" className="border-b border-line">
        <div className="container-page">
          <Reveal eager className="max-w-3xl">
            <Display level={1} as="h1">
              {t.services.title}
            </Display>
            <p className="mt-5 max-w-[60ch] text-[1rem] leading-[1.65] text-ink-muted md:text-[1.0625rem]">
              {t.services.lead}
            </p>
          </Reveal>
        </div>
      </Section>

      <Section size="md">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Index column. Replaces the original tab strip: same job, but it
                stays with you as you read and marks the card being read. */}
            <ServicesIndex
              label={t.services.pick}
              modules={modules.map(({ slug, name, tagline, icon, external }) => ({
                slug,
                name,
                tagline,
                icon,
                external,
              }))}
            />

            <div className="grid min-w-0 gap-4 lg:col-span-9">
              {modules.map((m) => (
                <Reveal
                    key={m.slug}
                    as="article"
                    id={m.slug}
                    delay={0.02}
                    className={`scroll-mt-28 rounded-2xl border p-7 md:p-9 ${
                      // Tint carries one meaning here and only one: this module
                      // is not part of the Noregna platform. Invoice is the
                      // standalone, free product, so Invoice is the tinted card.
                      // Nothing is tinted for variety.
                      m.external
                        ? "border-accent-soft-line bg-accent-soft"
                        : "border-line bg-surface"
                    }`}
                  >
                    <div className="grid gap-8 md:grid-cols-12 md:gap-10">
                      <div className="md:col-span-5">
                        <IconBadge
                          name={m.icon}
                          tone={m.external ? "onTint" : "solid"}
                        />
                        <Display level={4} as="h2" className="mt-5">
                          {m.name}
                        </Display>
                        <p className="mt-4 text-[0.9375rem] leading-[1.65] text-ink-muted">
                          {m.intro}
                        </p>
                        {m.external ? (
                          <div className="mt-6">
                            <Button href={m.external} external variant="secondary" arrow="external">
                              {t.home.invoice.cta}
                            </Button>
                          </div>
                        ) : null}
                      </div>

                      <div className="md:col-span-7">
                        <h3 className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-ink-subtle">
                          {m.benefitsTitle}
                        </h3>
                        <ul className="mt-4 grid gap-3">
                          {m.benefits.map((b) => (
                            <li
                              key={b}
                              className="flex items-start gap-2.5 text-[0.9375rem] leading-[1.6] text-ink"
                            >
                              <span className="mt-0.5 shrink-0 text-accent">
                                <Icon name="check" size={16} weight="bold" />
                              </span>
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
