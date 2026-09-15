import { COMPANY, EXTERNAL, getDict, type Locale } from "@/content/site";

/**
 * Structured data for search engines: who the organisation is and what this
 * site is. Every value is Noregna's own published detail (legal name, org
 * number, address, e-mail, social profiles); nothing is claimed here that the
 * footer does not already state.
 */
export function JsonLd({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const base = "https://noregna.no";
  const home = locale === "no" ? base : `${base}/en`;

  const organization = {
    "@type": "Organization",
    "@id": `${base}/#organization`,
    name: COMPANY.legalName,
    url: base,
    logo: `${base}/brand/noregna-wordmark.png`,
    email: COMPANY.email,
    identifier: COMPANY.orgNr.replace(/\s/g, ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Østre Aker vei 17",
      postalCode: "0581",
      addressLocality: "Oslo",
      addressCountry: "NO",
    },
    sameAs: [EXTERNAL.facebook, EXTERNAL.instagram],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${home}/#website`,
    url: home,
    name: t.meta.siteName,
    description: t.meta.descHome,
    inLanguage: locale === "no" ? "nb-NO" : "en",
    publisher: { "@id": `${base}/#organization` },
  };

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": [organization, website] })
    // Keep a literal "<" from ever closing the script element.
    .replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
