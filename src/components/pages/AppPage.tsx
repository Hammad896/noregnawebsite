import { IconBadge } from "@/components/ui/IconBadge";
import { Display } from "@/components/ui/Display";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Eyebrow, Section } from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { StoreBadges, VideoPlayer } from "@/components/product/VideoPlayer";
import { EXTERNAL, getDict, type Locale } from "@/content/site";

const SCREENS = [1, 2, 3, 4, 5, 6];

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
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <Reveal>
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

            <Reveal delay={0.1} className="lg:col-span-6" y={16}>
              <div className="relative flex items-end justify-center gap-3 sm:gap-5">
                {/* Chatnet on the left, home in the middle, folders on the right:
                    three genuinely different screens rather than two near
                    identical folder lists flanking the centre. */}
                <Image
                  src="/app-screens/screen-6.png"
                  alt=""
                  aria-hidden
                  width={375}
                  height={666}
                  className="mb-10 hidden w-[30%] max-w-[11rem] drop-shadow-[0_18px_36px_rgba(9,63,39,0.15)] sm:block"
                />
                <Image
                  src="/app-screens/screen-2.png"
                  alt={a.screenAlt}
                  width={375}
                  height={666}
                  priority
                  className="w-[46%] max-w-[15rem] drop-shadow-[0_24px_44px_rgba(9,63,39,0.2)]"
                />
                <Image
                  src="/app-screens/screen-4.png"
                  alt=""
                  aria-hidden
                  width={375}
                  height={666}
                  className="mb-10 w-[36%] max-w-[12rem] drop-shadow-[0_18px_36px_rgba(9,63,39,0.15)] sm:w-[30%] sm:max-w-[11rem]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="sunken" size="sm">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-4xl">
              <VideoPlayer
                src="/brand/noregna-app.mp4"
                poster="/brand/app-video-poster.jpg"
                label={a.videoAlt}
                playLabel={a.playLabel}
              />
            </div>
          </Reveal>
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

      {/* Every screen the app actually ships, at a size you can read. */}
      <Section tone="sunken" className="overflow-hidden">
        <div className="container-page">
          <Reveal>
            <Display level={2} as="h2">
              {a.galleryTitle}
            </Display>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="mt-10">
          <ul className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:px-8 xl:px-10">
            <li aria-hidden className="w-0 shrink-0 xl:w-[max(0px,calc((100vw-1240px)/2-2.5rem))]" />
            {SCREENS.map((n) => (
              <li key={n} className="shrink-0 snap-start">
                <Image
                  src={`/app-screens/screen-${n}.png`}
                  alt={`${a.screenAlt} ${n}`}
                  width={375}
                  height={666}
                  className="h-auto w-[13rem] drop-shadow-[0_16px_32px_rgba(9,63,39,0.14)] sm:w-[15rem]"
                />
              </li>
            ))}
            <li aria-hidden className="w-1 shrink-0" />
          </ul>
        </Reveal>
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
