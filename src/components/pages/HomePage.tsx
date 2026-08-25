import { Faq } from "@/components/home/Faq";
import { HeroPower } from "@/components/home/heroes/HeroPower";
import { Outcomes } from "@/components/home/Outcomes";
import { Overview } from "@/components/home/Overview";
import { ProductTrio } from "@/components/home/ProductTrio";
import { SystemsRail } from "@/components/home/SystemsRail";
import { WhyBento } from "@/components/home/WhyBento";
import { getDict, type Locale } from "@/content/site";

/**
 * Every section here maps to something on noregna.no. Two structural changes,
 * both of which move Noregna's own copy rather than adding any:
 *
 *  - Outcomes is FAQ answer 3, promoted out of a collapsed accordion where
 *    nobody was reading the most persuasive paragraph on the site.
 *  - ProductTrio replaces the separate Kundeportal section and Invoice band.
 *    They were two unrelated blocks arguing the same thing badly: that Noregna
 *    is three products, one of which is free and deliberately not part of the
 *    platform. Stated once, in order, it lands.
 *
 * Pricing has no section of its own on noregna.no; it is answered inside FAQ
 * item 04, and that is where it stays here.
 *
 * Each section uses a different layout family, so nothing rhymes with the block
 * above it: colour field -> bento -> scroll rail -> statement rows -> image
 * split -> list split -> sticky index.
 */
export function HomePage({ locale }: { locale: Locale }) {
  const t = getDict(locale);

  return (
    <>
      <HeroPower t={t} locale={locale} />
      <WhyBento t={t} />
      <SystemsRail t={t} locale={locale} />
      <ProductTrio t={t} locale={locale} />
      <Overview t={t} />
      <Outcomes t={t} />
      <Faq t={t} />
    </>
  );
}
