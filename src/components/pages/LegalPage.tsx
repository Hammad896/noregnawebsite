import { Display } from "@/components/ui/Display";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { getDict, type Locale } from "@/content/site";
import { hrefFor, legalHref } from "@/lib/routing";

/**
 * Personvern, informasjonskapsler and kjoeps- og leveringsbetingelser.
 *
 * The markup is Noregna's own, lifted verbatim out of resources/views/legal/.
 * Only two changes were made: Blade's route() helpers became tokens that get
 * swapped for the right locale path here, and the paragraphs that were wrapped
 * in `@if (config('services.analytics.src'))` were dropped, because this build
 * ships no analytics tool and a privacy notice must not claim one.
 *
 * Nothing is rewritten. Legal text is quoted, not edited.
 */

export type LegalDoc = "privacy" | "cookies" | "terms";


export function LegalPage({
  locale,
  doc,
  html,
  notice,
}: {
  locale: Locale;
  doc: LegalDoc;
  html: string;
  /** Shown above the body, e.g. the Norwegian-is-binding note on the terms. */
  notice?: string;
}) {
  const t = getDict(locale);

  const body = html
    .replaceAll("__PRIVACY__", legalHref(locale, "privacy"))
    .replaceAll("__COOKIES__", legalHref(locale, "cookies"))
    .replaceAll("__TERMS__", legalHref(locale, "kjopsbetingelser"))
    .replaceAll("__SERVICES__", hrefFor(locale, "services"));

  const title =
    doc === "privacy" ? t.footer.privacy : doc === "cookies" ? t.footer.cookies : t.footer.terms;

  return (
    <Section size="sm">
      <div className="container-page">
        <Reveal eager className="max-w-[70ch]">
          <Display level={1} as="h1">
            {title}
          </Display>

          {notice ? (
            <p className="mt-8 rounded-2xl border border-accent-soft-line bg-accent-soft px-5 py-4 text-[0.9375rem] leading-[1.65] text-ink">
              {notice}
            </p>
          ) : null}

          {/* Static, first-party markup. No user input reaches this. */}
          <div className="legal-prose mt-10" dangerouslySetInnerHTML={{ __html: body }} />
        </Reveal>
      </div>
    </Section>
  );
}
