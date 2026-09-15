import type { ReactNode } from "react";
import { FooterField } from "./FooterField";
import { Header } from "./Header";
import { JsonLd } from "./JsonLd";
import { getDict, type Locale } from "@/content/site";

/**
 * Shared chrome for both language trees. Norwegian renders at the root, English
 * under /en, and each tree has its own root layout so the <html lang> attribute
 * is genuinely correct rather than hardcoded to one language.
 */
export function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = getDict(locale);

  return (
    <>
      {/* Scroll reveals ship their hidden state in the HTML, so without
          JavaScript every section below the fold would render blank. This
          forces them visible in that case: the animation is an enhancement,
          never the thing standing between a reader and the content. */}
      <noscript>
        <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
      </noscript>

      <JsonLd locale={locale} />
      <Header t={t} locale={locale} />
      <main id="main" className="min-h-[60vh]">
        {children}
      </main>
      <FooterField t={t} locale={locale} />
    </>
  );
}
