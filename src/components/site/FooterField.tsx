import Image from "next/image";
import Link from "next/link";
import { FacebookLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { COMPANY, EXTERNAL, type Dict, type Locale } from "@/content/site";
import { Icon } from "@/lib/icons";
import { shortName } from "@/lib/modules";
import { hrefFor, legalHref, PAGE_KEYS, type PageKey } from "@/lib/routing";

const NAV_LABEL: Record<PageKey, keyof Dict["nav"]> = {
  home: "home",
  services: "services",
  app: "app",
  contact: "contact",
};

/**
 * FOOTER C — GREEN FIELD
 *
 * The brand colour owns the bottom of the page the way the hero owns the top on
 * the card variant. Conta and DNB both close on a dark brand field, and it does
 * two useful things: it gives a long page a definite ending, and it lets the
 * green appear twice without ever being sprinkled in between.
 *
 * This is a brand colour block, not a dark theme. Every value inside derives
 * from the same hue as the rest of the site, so the secondary text is a lighter
 * green rather than a washed-out grey sitting on colour.
 */
export function FooterField({
  t,
  locale,
}: {
  t: Dict;
  locale: Locale;
}) {
  const year = 2026;
  const modules = t.services.modules;
  const half = Math.ceil(modules.length / 2);

  return (
    <footer className="bg-field text-on-field">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-x-8 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image
              src="/brand/noregna-wordmark.png"
              alt="Noregna"
              width={858}
              height={146}
              sizes="160px"
              className="h-[27px] w-auto brightness-0 invert"
            />
            <p className="mt-5 max-w-[44ch] text-[0.9375rem] leading-[1.65] text-on-field-muted">
              {t.footer.about}
            </p>
            <a
              href={EXTERNAL.app}
              target="_blank"
              rel="noopener noreferrer"
              className="press mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-on-field-accent px-5 text-[0.9375rem] font-semibold text-field-deep transition-colors duration-200 hover:bg-on-field"
            >
              {t.nav.tryFree}
              <Icon name="arrowUpRight" size={15} />
            </a>
          </div>

          <nav aria-label={t.footer.shortcuts} className="lg:col-span-2">
            <FieldHeading>{t.footer.shortcuts}</FieldHeading>
            <ul className="mt-4 grid gap-2.5">
              {PAGE_KEYS.map((key) => (
                <li key={key}>
                  <FieldLink href={hrefFor(locale, key)}>{t.nav[NAV_LABEL[key]]}</FieldLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.footer.systems} className="lg:col-span-3">
            <FieldHeading>{t.footer.systems}</FieldHeading>
            <div className="mt-4 grid grid-cols-2 gap-x-6">
              {[modules.slice(0, half), modules.slice(half)].map((group, gi) => (
                <ul key={gi} className="grid content-start gap-2.5">
                  {group.map((m) => (
                    <li key={m.slug}>
                      <FieldLink href={`${hrefFor(locale, "services")}#${m.slug}`}>
                        {shortName(m.name)}
                      </FieldLink>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </nav>

          <div className="lg:col-span-3">
            <FieldHeading>{t.footer.contact}</FieldHeading>
            <address className="mt-4 grid gap-3.5 text-[0.9375rem] not-italic leading-[1.55] text-on-field-muted">
              <span className="font-semibold text-on-field">{COMPANY.legalName}</span>
              <span className="tnum whitespace-nowrap">
                {t.footer.orgNr} {COMPANY.orgNr}
              </span>
              <a
                href={EXTERNAL.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[1.1rem_1fr] items-start gap-x-2.5 transition-colors duration-200 hover:text-on-field"
              >
                <span className="mt-[0.15rem] text-on-field-accent">
                  <Icon name="mapPin" size={16} />
                </span>
                <span>
                  {COMPANY.addressFull}
                  <span className="mt-0.5 block text-[0.8125rem] text-on-field-accent">
                    {t.footer.viewMap}
                  </span>
                </span>
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="grid grid-cols-[1.1rem_1fr] items-start gap-x-2.5 transition-colors duration-200 hover:text-on-field"
              >
                <span className="mt-[0.15rem] text-on-field-accent">
                  <Icon name="mail" size={16} />
                </span>
                <span className="break-words">{COMPANY.email}</span>
              </a>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-on-field-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="order-3 text-[0.8125rem] text-on-field-muted sm:order-1">
            &copy; {year} {COMPANY.legalName}. {t.footer.rights}
          </p>

          <ul className="order-1 flex flex-wrap items-center gap-x-6 gap-y-2 sm:order-2">
            <li>
              <FieldLink href={legalHref(locale, "privacy")} small>
                {t.footer.privacy}
              </FieldLink>
            </li>
            <li>
              <FieldLink href={legalHref(locale, "cookies")} small>
                {t.footer.cookies}
              </FieldLink>
            </li>
            <li>
              <FieldLink href={legalHref(locale, "kjopsbetingelser")} small>
                {t.footer.terms}
              </FieldLink>
            </li>
          </ul>

          <div className="order-2 flex items-center gap-2 sm:order-3">
            <FieldSocial href={EXTERNAL.facebook} label={t.footer.facebook}>
              <FacebookLogo size={16} weight="fill" />
            </FieldSocial>
            <FieldSocial href={EXTERNAL.instagram} label={t.footer.instagram}>
              <InstagramLogo size={16} />
            </FieldSocial>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FieldHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-on-field-accent">
      {children}
    </h2>
  );
}

function FieldLink({
  href,
  children,
  small,
}: {
  href: string;
  children: React.ReactNode;
  small?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`${
        small ? "text-[0.8125rem]" : "text-[0.9375rem]"
      } text-on-field-muted transition-colors duration-200 hover:text-on-field`}
    >
      {children}
    </Link>
  );
}

function FieldSocial({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="press inline-flex h-9 w-9 items-center justify-center rounded-full border border-on-field-line text-on-field-muted transition-colors duration-200 hover:border-on-field-accent hover:text-on-field-accent"
    >
      <span className="sr-only">{label}</span>
      {children}
    </a>
  );
}
