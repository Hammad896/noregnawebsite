import { Button } from "@/components/ui/Button";
import { DashboardPreview } from "@/components/product/DashboardPreview";
import { Reveal } from "@/components/ui/Reveal";
import { EXTERNAL, type Dict, type Locale } from "@/content/site";
import { Icon } from "@/lib/icons";
import { hrefFor } from "@/lib/routing";

/**
 * HERO E — GRADIENT FIELD
 *
 * Built on the pattern PowerOffice Go uses, which is worth borrowing because it
 * is a direct competitor and the structure genuinely works:
 *
 *   full-bleed colour field -> centred headline with one accent word ->
 *   short subhead -> one CTA -> the product as a wide card floating across the
 *   seam into the white below -> proof underneath
 *
 * The card straddling the boundary is the move. It ties the two bands together
 * and gives the product real width without a hero that runs to three screens.
 *
 * Three deliberate departures from the reference, which are what keep this from
 * reading as a copy of it:
 *
 *  - The field is a single-hue depth gradient down Noregna's own ramp, from
 *    brand-800 to brand-600, rather than PowerOffice's purple-to-orange. One
 *    hue getting deeper is a different idea from two hues meeting.
 *  - No italic accent word. Setting one word of the headline in italic is
 *    PowerOffice's signature move, and our headline happens to land on the same
 *    word they use, so keeping it would have been unmistakable. The emphasis is
 *    carried instead by tone: the second clause sits in the lighter accent,
 *    which separates the claim from the promise without borrowing a device.
 *  - A numbered index against a hairline rule runs through this variant, in the
 *    hero eyebrow and again on every product row. It is the register Norwegian
 *    financial institutions use, and it is ours rather than theirs.
 *
 * The proof row is Noregna's own factual claims. No customer counts or ratings,
 * because there are none to quote.
 */

const PROOF = [
  { key: "quality", label: "GRFS" },
  { key: "kyc", label: "KYC / PEP" },
  { key: "chat", label: "GDPR" },
  { key: "flag", label: "Norge" },
] as const;

export function HeroPower({
  t,
  locale,
}: {
  t: Dict;
  locale: Locale;
}) {
  const h = t.home;


  return (
    <section className="relative overflow-x-clip">
      {/* Colour field */}
      <div
        className="relative pb-48 pt-20 md:pb-56 md:pt-24 lg:pb-64"
        style={{
          background:
            "linear-gradient(168deg, oklch(0.404 0.1036 151.76) 0%, oklch(0.474 0.1243 151.76) 46%, oklch(0.556 0.1421 158) 100%)",
        }}
      >
        <div className="container-page relative text-center">
          <Reveal>
            <span className="inline-flex items-center gap-3.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-on-field-accent">
              <span aria-hidden className="font-mono tabular-nums tracking-[0.08em] opacity-70">
                00
              </span>
              <span aria-hidden className="h-px w-9 bg-on-field-line" />
              {h.heroEyebrow}
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mx-auto mt-7 max-w-[20ch] text-balance text-[1.875rem] font-light leading-[1.08] tracking-[-0.028em] text-on-field sm:text-[2.25rem] lg:text-[2.75rem]">
              {h.heroTitle}{" "}
              <span className="text-on-field-accent">{h.heroTitleAccent}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-7 max-w-[54ch] text-[1rem] leading-[1.62] text-on-field-muted md:text-[1.0625rem]">
              {h.heroLead}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button
                href={EXTERNAL.app}
                external
                size="lg"
                arrow="right"
                className="border-2! border-on-field-line! bg-transparent! text-on-field! hover:border-on-field-accent! hover:bg-on-field-accent! hover:text-field-deep!"
              >
                {h.ctaPrimary}
              </Button>
              <Button
                href={hrefFor(locale, "contact")}
                size="lg"
                variant="secondary"
                className="border-transparent! bg-transparent! text-on-field-muted! hover:text-on-field!"
              >
                {h.ctaSecondary}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* The card straddles the seam: half on the field, half on the page. */}
      <div className="relative -mt-40 md:-mt-44 lg:-mt-52">
        <div className="container-page">
          <Reveal y={20}>
            <div className="mx-auto w-fit overflow-hidden rounded-[20px] border border-line bg-surface shadow-[0_40px_90px_-40px_oklch(0.252_0.0592_151.76_/_0.55)]">
              <DashboardPreview
                crop={701}
                className="[--s:0.29]! sm:[--s:0.49]! md:[--s:0.58]! lg:[--s:0.79]! xl:[--s:0.96]!"
              />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Proof. Factual claims Noregna already publishes, nothing invented. */}
      <div className="border-b border-line bg-bg">
        <div className="container-page py-10 md:py-12">
          <Reveal delay={0.1}>
            <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
              {PROOF.map((p, i) => (
                <li key={p.key} className="flex items-center gap-2.5">
                  <span className="text-accent">
                    <Icon name={p.key} size={19} />
                  </span>
                  <span className="text-[0.9375rem] font-medium text-ink">{p.label}</span>
                  <span className="max-w-[22ch] text-[0.875rem] text-ink-subtle">
                    {h.heroTrustHints?.[i]}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
