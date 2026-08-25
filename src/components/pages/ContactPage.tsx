import { Display } from "@/components/ui/Display";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { COMPANY, EXTERNAL, getDict, type Locale } from "@/content/site";
import { Icon } from "@/lib/icons";

export function ContactPage({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const c = t.contact;

  return (
    <Section size="sm">
      <div className="container-page">
        <Reveal className="max-w-3xl">
          <Display level={1} as="h1">
            {c.title}
          </Display>
          <p className="mt-5 max-w-[58ch] text-[1rem] leading-[1.65] text-ink-muted">
            {c.lead}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <ContactForm t={t} />
          </Reveal>

          <div className="grid content-start gap-6 lg:col-span-5">
            <Reveal delay={0.06}>
              <div className="rounded-2xl border border-line bg-surface p-7 md:p-8">
                <h2 className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-ink-subtle">
                  {c.detailsTitle}
                </h2>

                <dl className="mt-6 grid gap-6">
                  <div className="flex gap-4">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-accent-soft text-accent">
                      <Icon name="building" size={18} />
                    </span>
                    <div>
                      <dt className="text-[0.8125rem] text-ink-subtle">{c.orgLabel}</dt>
                      <dd className="mt-1 text-[0.9375rem] text-ink">
                        <span className="block font-medium">{COMPANY.legalName}</span>
                        <span className="tnum text-ink-muted">{COMPANY.orgNr}</span>
                      </dd>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-accent-soft text-accent">
                      <Icon name="mapPin" size={18} />
                    </span>
                    <div>
                      <dt className="text-[0.8125rem] text-ink-subtle">{c.addressLabel}</dt>
                      <dd className="mt-1 text-[0.9375rem] text-ink">
                        <span className="block">{COMPANY.address}</span>
                        <a
                          href={EXTERNAL.maps}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1.5 inline-flex w-fit items-center gap-1 text-[0.875rem] text-accent transition-opacity duration-200 hover:opacity-80"
                        >
                          {t.footer.viewMap}
                          <Icon name="arrowUpRight" size={13} />
                        </a>
                      </dd>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-accent-soft text-accent">
                      <Icon name="mail" size={18} />
                    </span>
                    <div>
                      <dt className="text-[0.8125rem] text-ink-subtle">{c.emailLabel}</dt>
                      <dd className="mt-1 text-[0.9375rem]">
                        <a
                          href={`mailto:${COMPANY.email}`}
                          className="text-ink transition-colors duration-200 hover:text-accent"
                        >
                          {COMPANY.email}
                        </a>
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-accent-soft-line bg-accent-soft p-7 md:p-8">
                <Display level={4} as="h2">
                  {c.directTitle}
                </Display>
                <p className="mt-2.5 text-[0.9375rem] leading-[1.65] text-ink-muted">
                  {c.directBody}
                </p>
                <div className="mt-6">
                  <Button href={EXTERNAL.app} external arrow="external">
                    {c.trialCta}
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
