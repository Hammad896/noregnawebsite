import { IconBadge } from "@/components/ui/IconBadge";
import { Display } from "@/components/ui/Display";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Eyebrow, Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PhoneFrame } from "@/components/product/PhoneFrame";
import { StoreBadges } from "@/components/product/StoreBadges";
import { shot } from "@/content/app-shots";
import { EXTERNAL, getDict, type Locale } from "@/content/site";

/* The hero fan, five phones: home in front, overview and missing receipts
   beside it, login and upload at the edges. */
const HERO = {
  outerLeft: shot("login"),
  left: shot("overview"),
  main: shot("home"),
  right: shot("missing"),
  outerRight: shot("uploads"),
};

/* One frame in the fan. Sizes step down at lg because the hero becomes a
   two-column grid there and the phones share the row with the text. */
function FanPhone({
  shotKey,
  alt,
  ring,
  side,
  priority,
}: {
  shotKey: keyof typeof HERO;
  alt: string;
  ring: "main" | "inner" | "outer";
  side?: "left" | "right";
  priority?: boolean;
}) {
  const s = HERO[shotKey];
  const size =
    ring === "main"
      ? "relative z-30 w-[200px] shrink-0 sm:w-[220px] lg:w-[180px] xl:w-[220px]"
      : ring === "inner"
        ? `relative z-20 mt-[52px] hidden w-[150px] shrink-0 sm:block md:mt-[60px] md:w-[170px] lg:w-[140px] xl:w-[170px] ${
            side === "left" ? "-mr-7 -rotate-6" : "-ml-7 rotate-6"
          }`
        : // The outer pair only appears where the column is wide enough to hold
          // five phones without cutting one in half: xl and up.
          `relative z-10 mt-[104px] hidden w-[130px] shrink-0 xl:block ${
            side === "left" ? "-mr-6 -rotate-12" : "-ml-6 rotate-12"
          }`;
  const sizes = ring === "main" ? "220px" : ring === "inner" ? "170px" : "130px";

  return (
    <PhoneFrame className={size}>
      <Image
        src={s.src}
        alt={alt}
        width={s.width}
        height={s.height}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className="block h-auto w-full"
      />
    </PhoneFrame>
  );
}

export function AppPage({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const a = t.appPage;

  return (
    <>
      <Section size="sm" className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(70rem 34rem at 82% -20%, var(--accent-soft) 0%, transparent 62%)",
          }}
        />
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <Reveal eager>
                <Eyebrow>{a.eyebrow}</Eyebrow>
                <Display level={1} as="h1" className="mt-5">
                  {a.title}
                </Display>
                <p className="mt-5 max-w-[58ch] text-[1rem] leading-[1.65] text-ink-muted">
                  {a.lead}
                </p>
                <div className="mt-8">
                  <Button href={EXTERNAL.app} external size="lg" arrow="right">
                    {t.nav.tryFree}
                  </Button>
                </div>

                <StoreBadges
                  className="mt-7"
                  appStore={EXTERNAL.appStore}
                  playStore={EXTERNAL.playStore}
                  appleLabel={a.badgeApple}
                  googleLabel={a.badgeGoogle}
                />
              </Reveal>
            </div>

            <Reveal eager className="lg:col-span-7">
              {/* Five CSS-drawn phones fanned out: home in front, two tilted
                  behind it, two more at the edges. One phone under sm, three
                  from sm, all five from md. */}
              <div className="flex items-start justify-center">
                <FanPhone shotKey="outerLeft" alt={a.screens.login} ring="outer" side="left" />
                <FanPhone shotKey="left" alt={a.screens.overview} ring="inner" side="left" />
                <FanPhone shotKey="main" alt={a.screens.home} ring="main" priority />
                <FanPhone shotKey="right" alt={a.screens.missing} ring="inner" side="right" />
                <FanPhone shotKey="outerRight" alt={a.screens.uploads} ring="outer" side="right" />
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container-page">
          <Reveal>
            <Display level={2} as="h2">
              {a.getsTitle}
            </Display>
          </Reveal>

          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {a.gets.map((g) => (
              <RevealItem
                as="article"
                key={g.title}
                className="hover-lift flex flex-col rounded-2xl border border-line bg-surface p-6 md:p-7"
              >
                <IconBadge name={g.icon} tone="solid" />
                <h3 className="card-title mt-5">
                  {g.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-[1.6] text-ink-muted">{g.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <Section>
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <Display level={2} as="h2">
                  {a.worthTitle}
                </Display>
              </Reveal>
            </div>

            <div className="lg:col-span-8">
              <RevealGroup as="ul" className="rounded-2xl border border-line bg-surface">
                {a.worth.map((w, i) => (
                  <RevealItem
                    as="li"
                    key={w.title}
                    className={`p-6 md:p-8 ${i > 0 ? "border-t border-line" : ""}`}
                  >
                    <h3 className="card-title">
                      {w.title}
                    </h3>
                    <p className="mt-2 max-w-[70ch] text-[0.9375rem] leading-[1.65] text-ink-muted">
                      {w.body}
                    </p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
