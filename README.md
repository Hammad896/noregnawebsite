# noregna.no

A rebuild of the Noregna marketing site in React. Next.js 16 (App Router) with
Tailwind v4, Norwegian and English, seven pages each.

The homepage argues three products in order — the platform the firm works in,
the client portal, and Noregna Invoice, which is free and deliberately not part
of the platform. That last fact was previously reachable only through the FAQ.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm start    # production build
npx tsc --noEmit              # typecheck
npx eslint src                # lint
```

## Routes

Norwegian sits at the root on the **same slugs the live site already uses**, so
existing links, bookmarks and search rankings survive. English mirrors it under
`/en`.

| Page | Norwegian | English |
| --- | --- | --- |
| Hjem | `/` | `/en` |
| Våre systemer | `/ourservices` | `/en/ourservices` |
| App | `/app` | `/en/app` |
| Kontakt oss | `/contact-us` | `/en/contact-us` |
| Personvern | `/privacy` | `/en/privacy` |
| Informasjonskapsler | `/cookies` | `/en/cookies` |
| Kjøps- og leveringsbetingelser | `/kjopsbetingelser` | `/en/kjopsbetingelser` |

Each language tree has its own root layout (`src/app/(no)`, `src/app/(en)`) so
`<html lang>` is genuinely correct rather than hardcoded. `sitemap.xml` and
`robots.txt` are generated, and every page declares `hreflang` alternates.

## Where things live

```
src/
  app/(no)/            Norwegian routes + root layout + 404 + favicon
  app/(en)/en/         English routes + root layout + favicon
  app/api/contact/     Contact form endpoint
  app/globals.css      Design tokens: colour, type, radius, motion, utilities
  content/site.ts      Every visible string, both languages
  app/api/brreg/       Brønnøysund company lookup proxy
  content/legal/       Noregna's own legal HTML, verbatim
  components/
    site/              Header, SystemsMenu, FooterField, shell, theme toggle
    home/              The homepage sections
    pages/             Page compositions incl. LegalPage
    contact/           Contact form + company search
    product/           DashboardPreview, InvoicePreview, VideoPlayer
    ui/                Display, Button, Section, IconBadge, Reveal
  lib/
    icons.tsx          Phosphor icon set, referenced by key from content
    routing.ts         Locale and page-to-href mapping
design-system/
  noregna/MASTER.md    The locked design system. Read before changing visuals.
public/
  brand/               Wordmark, dashboard reference, app video + poster, badges
  app-screens/         The six client-portal screenshots
```

## The header

`Váre systemer` opens a panel rather than navigating. A four-word nav told a
first-time visitor nothing about the product; the eight modules and three
products were invisible until they committed to a page. The panel lists all
eight modules with their taglines and all three products with where each one
lives and what it costs to get into.

It is a real `<button>` that toggles on click, so keyboard and touch work
without hover. Hover-to-open is gated on `matchMedia("(hover: hover)")` rather
than on `event.pointerType`, which is inconsistent across browsers and silently
disabled the interaction entirely. Escape closes and returns focus to the
trigger. On phones the same eight modules expand inline in the sheet.

## Type scale

Four levels in `ui/Display.tsx`, plus the `.card-title` utility, and nothing
outside them:

| Level | lg size | Role |
| --- | --- | --- |
| — | 44px | the homepage hero, the one sanctioned exception |
| 1 | 40px | page titles (matches noregna.no's h1) |
| 2 | 32px | section titles (matches noregna.no's h2) |
| 3 | 24px | product row titles |
| 4 | 19px | sub-headings, form legends, legal section headings |
| `.card-title` | 17px | titles inside a bordered card |

Body copy is 16px, matching noregna.no exactly. An audit of every rendered
heading is the only way to keep this honest — the site had twice drifted into
two parallel systems, once at 44/34/19 against hand-written 30px and 22px
headings. Measure before changing a value.

## Content

All copy in `src/content/site.ts` is Noregna's own, taken from the live site in
both languages. Nothing is invented: no made-up statistics, client names,
certifications or capabilities. Two editorial changes were made:

Every string traces to `resources/lang/{no,en}/messages.php` in the Laravel
source. Two editorial changes only:

- En-dashes and em-dashes normalised to hyphens.
- The contact page's `contact_info_text` is Norwegian lorem ipsum in the source
  ("Det er et velkjent faktum at lesere blir distrahert av lesbart innhold."),
  and `form_title` is "Frigjør kraften i teknologi" / "Unleash the Power of
  Technology". Both were replaced with plain functional copy; shipping lorem
  ipsum on a live contact page is a bug, not content.

Pricing has no section of its own on the live site (it is answered inside FAQ
item 04), so it has none here either.

Two structural changes, both of which move Noregna's own copy rather than adding
any:

- **Outcomes** is FAQ answer 3, promoted out of a collapsed accordion where
  nobody was reading the most persuasive paragraph on the site.
- **ProductTrio** replaces the separate client-portal section and invoice band,
  which were two unrelated blocks arguing the same thing badly.

The strings written for the product section, and used nowhere else, are
`home.products.*`: a section label, a lead assembled from Noregna's own
statements about what is and is not part of the platform, and lines that state
an address rather than make a claim.

## Contact form

`POST /api/contact` validates server-side, caps field lengths, rate-limits per
IP, and uses a honeypot rather than a third-party captcha script.

**Delivery is not wired up.** Set the destination and it forwards there:

```bash
# .env.local
CONTACT_WEBHOOK_URL=https://your-endpoint.example/noregna-contact
```

Without that variable:

- **development** accepts the submission and reports success, so the flow is
  demonstrable. Nothing is delivered.
- **production** returns 503, so the form shows its error state and points the
  visitor at post@noregna.no rather than silently swallowing a real enquiry.

Nothing in the endpoint writes personal data to disk or to logs.

## The hero dashboard

`src/components/product/DashboardPreview.tsx` reproduces the shipped Noregna
dashboard in markup rather than embedding a screenshot. Layout, labels, colours,
icon placement and proportions follow the real product; only the data differs.

Two reasons it is built rather than pasted in:

1. **Privacy.** The real dashboard is full of live client names and personal
   email addresses. None of that belongs on a public page. Every name here is
   dummy data (Alpha, Beta, Gamma, Delta, Epsilon), matching the placeholder set
   Noregna already uses in its own product imagery.
2. **Legibility.** A 1920px screenshot scaled into a hero column renders at
   about 44% and the deadline table turns to mush. This stays sharp at any size.

**The `crop` prop must land on a card boundary.** Measured landmarks inside the
782px design: 480 ends the Task Reminder card, 492 begins Recent Clients, 531
begins its table (so 560 is the bottom of its *column header* row), 701 ends the
card. Cropping at 560 showed the column headings with not one client under them,
which reads as a rendering fault rather than a crop. Cut at 480 or 701.

It is drawn at a fixed 1180×782 design size and scaled with a `--s` custom
property per breakpoint, so the sidebar-to-content proportions never distort. At
`xl` it renders near 1:1. On phones it is scaled up and slid left so the deadline
ring and task rows stay readable while the sidebar moves off-canvas.

`public/brand/hero-wide.png` is kept as the reference screenshot the component
reproduces. It is not used on any page.

## Assets

`public/brand/noregna-wordmark.png` is the supplied logo with its background
made genuinely transparent. Despite its `-removebg` filename, the original was
fully opaque white, which rendered as a white box in dark mode. The untouched
original is kept at `noregna-wordmark-original.png` so the conversion can be
regenerated.

`faq-img.webp` from the live site was **not** carried over. It is a Dreamstime
stock image with the watermark still visible.

## Design system

Locked in `design-system/noregna/MASTER.md`. Read it before changing any visual
value. It records the OKLCH brand ramp sampled from the wordmark, the type
scale, shape and motion tokens, and — importantly — the three places where the
generated recommendation was deliberately overridden, with reasons.

## Legal pages

`src/content/legal/*.html` are Noregna's own fragments, lifted verbatim from
`resources/views/legal/`. Two changes only:

- Blade `route()` helpers became `__PRIVACY__` / `__COOKIES__` / `__TERMS__` /
  `__SERVICES__` tokens, swapped per locale in `LegalPage`.
- The paragraphs wrapped in `@if (config('services.analytics.src'))` were
  dropped. This build ships no analytics tool, and a privacy notice must not
  claim one.

There is no English translation of the purchase terms in the source, so `/en/kjopsbetingelser`
renders the Norwegian text under Noregna's own English notice that the Norwegian
version is the binding one.

## The app video

10.5 MB, at `public/brand/noregna-app.mp4`. The original markup autoplays it on
load, so every visitor paid that download before deciding they wanted it, on
mobile data included. Here it is a click-to-play facade: `preload="none"`, a
real poster image, and the file is only fetched when someone presses play.
It should move to a CDN or be re-encoded before launch.

## Company lookup

`/api/brreg` proxies the Brønnøysund open register so the contact form can find
a company by name and capture its organisation number. Proxied rather than
called from the browser so the request stays same-origin and can be cached. A
failed lookup never blocks the form: the manual organisation field still submits.

## Still open

- Contact form delivery endpoint (`CONTACT_WEBHOOK_URL`) and, if you want it
  back, the reCAPTCHA key.
- **Integration logos are NOT used.** `integrations.blade.php` has alt text that
  contradicts its own image files: `Timma-logo.png` is labelled "Savings Bank
  Logo", `DNB.png` is labelled "EIKA Group Logo", `Zettle-av-iizy.png` is
  labelled "Nordea Logo". Until someone confirms which partnerships are real,
  shipping them would be claiming relationships that may not exist.
- LinkedIn is `href="#"` in the source footer, so it is omitted rather than
  shipped as a dead link.
- No customer logo wall or headline figures: there are no verified numbers, and
  inventing them was not an option.
