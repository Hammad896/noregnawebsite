import { Button } from "@/components/ui/Button";
import { InvoicePreview } from "@/components/product/InvoicePreview";
import { PhoneCarousel } from "@/components/product/PhoneCarousel";
import { PlatformModules } from "@/components/product/PlatformModules";
import { APP_SHOTS } from "@/content/app-shots";
import { Display } from "@/components/ui/Display";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { EXTERNAL, type Dict, type Locale } from "@/content/site";
import { hrefFor } from "@/lib/routing";

/**
 * THE THREE PRODUCTS, SEPARATED.
 *
 * Noregna sells three things and the live site never says so in one place: the
 * platform the firm works in, the portal the firm's clients carry, and Invoice,
 * which is free and deliberately not part of the platform at all. A visitor
 * currently has to read the FAQ to learn that last part, which is the single
 * most unusual thing on offer.
 *
 * Each row states, in order: which product, what it is, where it lives, and
 * what it costs to get into. Nothing is implied by colour alone.
 *
 * On separation without inconsistency
 * -----------------------------------
 * Three products used to mean three palettes, which is how a product family
 * ends up looking like three acquisitions. Here every row sits on the same
 * brand hue and is separated by *depth* instead: the platform on the page
 * ground, the portal on the deep field, Invoice on the soft tint. One family,
 * three positions, and the actual separation carried by the label and the copy
 * where a reader will believe it.
 *
 * On not looking borrowed
 * -----------------------
 * The full-height statement row with a product surface arriving on scroll is a
 * pattern that works, and competitors use it. The tells that make it read as a
 * copy are theirs, not the pattern's: everything centred, and one word of the
 * headline set in italic. Both are dropped. Rows alternate side, and the
 * editorial device is a numbered index against a hairline rule, which is the
 * register Norwegian financial institutions already use.
 */

type Row = {
  index: string;
  name: string;
  title: string;
  body: string;
  where: string;
  price: string;
  cta: string;
  href: string;
  external: boolean;
  ariaLabel?: string;
  /** Which ground the row sits on. Same hue throughout, three depths. */
  ground: "page" | "field" | "tint";
  art: React.ReactNode;
  /**
   * Whether the art may run past the container on its side (the "window onto
   * the product" treatment). A bordered card must not: its edge would be cut
   * at the viewport, so it stays inside the column and fills it instead.
   */
  bleed?: boolean;
};

export function ProductTrio({
  t,
  locale,
}: {
  t: Dict;
  locale: Locale;
}) {
  const p = t.home.products;

  const rows: Row[] = [
    {
      index: "01",
      name: t.meta.siteName,
      title: t.home.intent.title,
      body: t.home.intent.body,
      where: p.platformWhere,
      price: p.includedLabel,
      cta: t.home.ctaPrimary,
      href: EXTERNAL.app,
      external: true,
      ground: "page",
      bleed: false,
      // Not the dashboard again (the hero has it): the platform as its seven
      // modules, which is the information this row is actually adding.
      art: <PlatformModules t={t} locale={locale} />,
    },
    {
      index: "02",
      name: t.appPage.eyebrow,
      title: t.home.portal.title,
      body: t.home.portal.lead,
      where: p.portalWhere,
      price: p.separateLabel,
      cta: t.home.portal.cta,
      href: hrefFor(locale, "app"),
      external: false,
      ground: "field",
      art: (
        // One CSS-drawn phone whose screen cycles through every Kundeportal
        // screen. The arrows sit outside the bezel from md up; the row clips
        // horizontally, so they never widen the page.
        <div className="flex justify-center py-2 md:px-16">
          <PhoneCarousel
            slides={APP_SHOTS.map((s) => ({ ...s, alt: t.appPage.screens[s.key] }))}
            prevLabel={t.appPage.carouselPrev}
            nextLabel={t.appPage.carouselNext}
            className="w-[13rem] sm:w-[15rem] lg:w-[16rem] xl:w-[17rem]"
          />
        </div>
      ),
    },
    {
      index: "03",
      name: t.home.invoice.name,
      title: t.home.invoice.title,
      body: t.home.invoice.lead,
      where: p.invoiceWhere,
      price: p.freeLabel,
      cta: t.home.invoice.cta,
      href: EXTERNAL.invoice,
      external: true,
      ariaLabel: t.home.invoice.ctaAria,
      ground: "tint",
      art: (
        <div className="overflow-hidden rounded-[18px] border border-line bg-surface shadow-[0_30px_70px_-40px_oklch(0.252_0.0592_151.76_/_0.5)]">
          <InvoicePreview className="[--s:0.3]! sm:[--s:0.44]! lg:[--s:0.5]! xl:[--s:0.58]!" />
        </div>
      ),
    },
  ];

  return (
    <section aria-labelledby="produkter">
      {/* The section states its own premise before the rows argue it. */}
      <Section size="sm" className="pb-0!">
        <div className="container-page">
          <Reveal className="max-w-3xl" id="produkter">
            <Display level={2} as="h2">
              {p.title}
            </Display>
            <p className="mt-5 max-w-[62ch] text-[1rem] leading-[1.65] text-ink-muted md:text-[1.0625rem]">
              {p.lead}
            </p>
          </Reveal>
        </div>
      </Section>

      {rows.map((row, i) => (
        <ProductRow key={row.index} row={row} flip={i % 2 === 1} whereLabel={p.whereLabel} />
      ))}
    </section>
  );
}

function ProductRow({
  row,
  flip,
  whereLabel,
}: {
  row: Row;
  flip: boolean;
  whereLabel: string;
}) {
  const onField = row.ground === "field";

  // Each ground has to stay distinct from the page in BOTH themes. In dark the
  // page is already a deep green-black, so the field lifts instead of sinking
  // (field-deep is only 0.015 L away from --bg there, which reads as no edge at
  // all) and the tint recesses instead of glowing.
  const ground =
    row.ground === "field"
      ? "bg-field-deep dark:bg-field"
      : row.ground === "tint"
        ? "bg-accent-soft dark:bg-bg-sunken"
        : "bg-bg";

  // One set of roles, resolved once, so nothing below has to know the ground.
  const c = onField
    ? {
        rule: "bg-on-field-line",
        index: "text-on-field-accent",
        name: "text-on-field-accent",
        title: "text-on-field",
        body: "text-on-field-muted",
        meta: "text-on-field-muted",
        metaStrong: "text-on-field",
        chip: "border-on-field-line text-on-field",
      }
    : {
        rule: "bg-line-strong",
        index: "text-accent",
        name: "text-accent",
        title: "text-ink",
        body: "text-ink-muted",
        meta: "text-ink-subtle",
        metaStrong: "text-ink",
        chip: "border-line-strong text-ink-muted",
      };

  return (
    <div className={`overflow-x-clip ${ground}`}>
      <div className="container-page py-16 md:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal
            className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}
          >
            {/* The editorial device: number, rule, name. Not italic. */}
            <div className="flex items-center gap-4">
              <span
                className={`font-mono text-[0.8125rem] tabular-nums tracking-[0.08em] ${c.index}`}
              >
                {row.index}
              </span>
              <span aria-hidden className={`h-px w-10 ${c.rule}`} />
              <span
                className={`text-[0.75rem] font-semibold uppercase tracking-[0.16em] ${c.name}`}
              >
                {row.name}
              </span>
            </div>

            <Display level={3} as="h3" className={`mt-6 ${c.title}`}>
              {row.title}
            </Display>

            <p className={`mt-5 max-w-[46ch] text-[0.9375rem] leading-[1.68] ${c.body}`}>
              {row.body}
            </p>

            {/* Where it lives and how you get in, stated rather than implied. */}
            <div className="mt-7 flex flex-wrap items-end gap-x-6 gap-y-3">
              <div className={`text-[0.875rem] ${c.meta}`}>
                <p className="text-[0.6875rem] uppercase tracking-[0.13em]">{whereLabel}</p>
                <p className={`mt-1 font-medium ${c.metaStrong}`}>{row.where}</p>
              </div>
              <span
                className={`inline-flex h-7 items-center rounded-full border px-3 text-[0.75rem] font-medium ${c.chip}`}
              >
                {row.price}
              </span>
            </div>

            <div className="mt-8">
              <Button
                href={row.href}
                external={row.external}
                arrow={row.external ? "external" : "right"}
                ariaLabel={row.ariaLabel}
                className={
                  onField
                    ? "border-2! border-on-field-line! bg-transparent! text-on-field! hover:border-on-field-accent! hover:bg-on-field-accent! hover:text-field-deep!"
                    : undefined
                }
              >
                {row.cta}
              </Button>
            </div>
          </Reveal>

          {/* The surface runs past the container on its own side, so the row
              reads as a window onto the product rather than a framed picture. */}
          <Reveal
            y={24}
            delay={0.08}
            className={`lg:col-span-7 ${flip ? "lg:order-1" : row.bleed === false ? "" : "lg:-mr-[8vw]"}`}
          >
            <div className={flip ? "lg:flex lg:justify-center" : "lg:flex lg:justify-end"}>
              {row.art}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
