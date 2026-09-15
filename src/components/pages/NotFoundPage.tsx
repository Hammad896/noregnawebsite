import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getDict, type Locale } from "@/content/site";
import { hrefFor, PAGE_KEYS } from "@/lib/routing";

const LABEL = { home: "home", services: "services", app: "app", contact: "contact" } as const;

/**
 * The 404 page, in the language of the tree the visitor was in. Rendered by
 * each root layout's not-found.tsx; the catch-all routes under each tree are
 * what make an unknown URL reach them instead of Next's bare default.
 */
export function NotFoundPage({ locale }: { locale: Locale }) {
  const t = getDict(locale);

  return (
    <Section>
      <div className="container-page">
        <div className="max-w-xl">
          <p className="tnum font-mono text-[0.875rem] text-accent">404</p>
          <h1 className="mt-4 text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[2.5rem]">
            {t.notFound.title}
          </h1>
          <p className="mt-4 text-[1rem] leading-[1.65] text-ink-muted">{t.notFound.body}</p>

          <ul className="mt-8 grid gap-1">
            {PAGE_KEYS.map((key) => (
              <li key={key}>
                <Link
                  href={hrefFor(locale, key)}
                  className="inline-flex h-10 items-center rounded-[10px] px-3 text-[0.9375rem] text-ink-muted transition-colors duration-200 hover:bg-accent-soft hover:text-accent active:bg-accent-soft"
                >
                  {t.nav[LABEL[key]]}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button href={hrefFor(locale, "home")} arrow="right">
              {t.notFound.cta}
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
