# noregna.no

The Noregna marketing site, rebuilt in Next.js 16 (App Router) with Tailwind v4.
Norwegian and English, seven pages each. It replaces the Laravel site at
`NoregnaWeb`, which is what runs on noregna.no today.

The homepage argues three products in order: the platform the accounting firm
works in, the client portal its clients use, and Noregna Invoice, which is free
and deliberately not part of the platform.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build, must pass before shipping
npm start            # serve the production build
npx tsc --noEmit     # typecheck
npm run lint         # lint
```

## Environment

Copy `.env.example` to `.env.local` locally, and set the same variables in the
hosting environment. Nothing here is committed.

| Variable | Purpose |
| --- | --- |
| `MAIL_HOST`, `MAIL_PORT`, `MAIL_ENCRYPTION`, `MAIL_USERNAME`, `MAIL_PASSWORD` | SMTP for the contact form. Same names as the Laravel `.env`, so values copy straight across. |
| `MAIL_FROM_ADDRESS`, `MAIL_FROM_NAME` | Sender of both contact e-mails. |
| `CONTACT_TO` | Inbox that receives enquiries. Defaults to post@noregna.no. |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY` | Google reCAPTCHA v2 on the contact form. Leave both empty to run without it. |
| `CONTACT_WEBHOOK_URL` | Optional. Used only if SMTP is not configured. |
| `GOOGLE_SITE_VERIFICATION` | Search Console ownership token. Empty means no meta tag. |

## Routes

Norwegian sits at the root on the same slugs the live site already uses, so
existing links, bookmarks and rankings survive. English mirrors it under `/en`.

| Page | Norwegian | English |
| --- | --- | --- |
| Hjem | `/` | `/en` |
| Våre systemer | `/ourservices` | `/en/ourservices` |
| App | `/app` | `/en/app` |
| Kontakt oss | `/contact-us` | `/en/contact-us` |
| Personvern | `/privacy` | `/en/privacy` |
| Informasjonskapsler | `/cookies` | `/en/cookies` |
| Kjøps- og leveringsbetingelser | `/kjopsbetingelser` | `/en/kjopsbetingelser` |

Each language tree has its own root layout, so `<html lang>` is correct rather
than hardcoded. Any unknown address is caught by a `[...notFound]` route in its
tree and gets a 404 in the right language, inside the site's own header and
footer.

## Where things live

```
src/
  app/
    (no)/                  Norwegian routes, root layout, 404, link preview image
    (en)/en/               The English mirror
    api/contact/           Contact form endpoint
    api/brreg/             Brønnøysund company lookup proxy
    sitemap.ts, robots.ts  Generated /sitemap.xml and /robots.txt
    globals.css            Design tokens, utilities, hero and carousel motion
  content/
    site.ts                Every visible string, both languages
    app-shots.ts           The 13 app screens, in the order the app is used
    legal/                 Noregna's own legal HTML, verbatim
  components/
    site/                  Header, SystemsMenu, FooterField, SiteShell, JsonLd, ThemeToggle
    home/                  Homepage sections: HeroPower, WhyBento, SystemsRail,
                           ProductTrio, Overview, Outcomes, Faq
    pages/                 Page compositions, ServicesIndex, NotFoundPage, LegalPage
    contact/               ContactForm, CompanySearch, Recaptcha
    product/               DashboardPreview, InvoicePreview, PlatformModules,
                           PhoneFrame, PhoneCarousel, StoreBadges
    ui/                    Display, Button, Section, IconBadge, Reveal
  lib/
    contact-mail.ts        The two contact e-mails
    og.tsx                 Link preview card renderer
    routing.ts             Locale and page-to-href mapping
    modules.ts             Module short names
    icons.tsx              Phosphor icon set, referenced by key from content
design-system/noregna/MASTER.md   The locked design system. Read before changing visuals.
public/
  brand/                   Wordmark and its untouched original, store badges
  app-shots/               Sanitised Kundeportal screenshots (WebP)
```

## The pages

**Header.** `Våre systemer` is a link to the systems page. The caret beside it
opens a panel listing all eight modules and all three products, including that
Invoice is free and separate. Hover opens it on pointer devices only, tested
with `matchMedia("(hover: hover)")` rather than the event's pointer type, which
is unreliable. On phones the menu is a sheet that slides open and closes on
Escape, the close button, or a drag of its handle.

**Home.** A green hero with the product dashboard straddling the seam, then the
three product rows. Row 01 shows the seven platform modules rather than repeating
the hero dashboard. Row 02 is one phone cycling through the app screens, with
swipe and arrows. Row 03 is the Invoice preview.

**Våre systemer.** One card per module. The sidebar highlights the module named
in the address on arrival (for example `#fremdrift`) and follows the card being
read while scrolling. Every list on the site names modules by their product word,
so a link reading "Fremdrift" lands on "Fremdrift".

**App.** A fan of phones: one on small phones, three from tablet width, five on
wide screens where they fit without being cut.

## Contact form

`POST /api/contact` validates server-side, caps field lengths, rate-limits
per IP, and has a honeypot field. Delivery, in order of preference:

1. **SMTP configured:** an e-mail to the Noregna inbox with the visitor set as
   reply-to, and a confirmation to the visitor in their language. This matches
   what the Laravel site sent.
2. **Webhook configured:** the submission is posted as JSON.
3. **Neither, in development:** accepted and reported as success so the flow can
   be demonstrated. Nothing is delivered.
4. **Neither, in production:** returns 503, so the form shows its error and points
   the visitor at post@noregna.no instead of silently losing an enquiry.

With `RECAPTCHA_SECRET_KEY` set, a valid reCAPTCHA token is required; without
it the check is skipped. Nothing is written to disk or logged, and there is no
database: the e-mail is the only record.

The company search proxies the Brønnøysund open register so a visitor can pick
their company and send its organisation number. A failed lookup never blocks
the form; the manual field still submits.

## Search and sharing

- Generated `sitemap.xml` (all 14 pages, with language alternates) and `robots.txt`.
- A title, description, canonical URL and language alternates on every page.
- Organization and WebSite structured data from the site's own published details.
- A link preview card per language, generated at build time from the hero copy.
- A Search Console verification tag driven by `GOOGLE_SITE_VERIFICATION`.

## Security

`next.config.ts` sets `X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy` and `Permissions-Policy`, and removes the `X-Powered-By`
header. There is no Content-Security-Policy yet: reCAPTCHA needs a nonce per
request, which is a deliberate change rather than a checklist line.

## Motion and themes

- Scroll reveals ship visible. Only a block below the fold is hidden, and it
  reveals as it scrolls in. This keeps the first paint fast.
- The hero has a CSS entrance and two slow drifting lights, so it starts
  animating at first paint.
- Everything respects `prefers-reduced-motion`.
- Light is the default. Dark is opt-in from the header, remembered, and applied
  before first paint. The operating system setting is not consulted.

Design values, the type scale and the reasoning behind them are in
`design-system/noregna/MASTER.md`.

## Product imagery

**The hero dashboard** (`DashboardPreview.tsx`) is the real Noregna dashboard
rebuilt in markup, with every label in both languages. It is built rather than
screenshotted because the real one shows live client names and e-mail addresses,
and because a scaled screenshot turns to mush. Every name in it is dummy data.
Its `crop` prop must land on a card boundary; see MASTER.md §13.

**The app screenshots** are sanitised captures of the Kundeportal app. Every
screen shows only the demo identity: Demo Handel AS, Anna, Kari Nordmann and
Demo Regnskap AS. They were cleaned and converted in the Laravel repository
(`resources/img-src/app-shots` and `scripts/build-app-shots.php`). The raw
captures contain real client data, live in the gitignored `app images/` folder,
and must never be used.

## Legal pages

`src/content/legal/*.html` are Noregna's own texts, lifted verbatim from the
Laravel site and checked against the live pages. Two mechanical changes only:
Blade route helpers became `__PRIVACY__`-style tokens swapped per language, and
the paragraphs shown only when analytics is switched on were dropped, because
this site runs no analytics. There is no English translation of the purchase
terms in the source, so `/en/kjopsbetingelser` shows the Norwegian text under a
notice that the Norwegian version is binding.

## Content

Every string in `src/content/site.ts` is Noregna's own copy from the live site
in both languages. Nothing is invented: no statistics, client names,
certifications or capabilities. Editorial changes were limited to normalising
dashes, replacing lorem ipsum that shipped on the old contact page, and a small
set of structural labels for the products section, listed in MASTER.md §11.

`public/brand/noregna-wordmark.png` is the supplied logo with its background
made truly transparent; the untouched original is kept beside it so the change
can be redone.

## Verified

Measured on the production build on 2026-09-15, Lighthouse mobile profile.

| Page | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Home | 85 | 100 | 100 | 100 |
| Våre systemer | 91 | 100 | 100 | 100 |
| App | 86 | 100 | 100 | 100 |
| Kontakt oss | 91 | 100 | 100 | 100 |

A crawl of all 14 pages found one H1 per page, no skipped heading levels, alt
text on every image, no broken internal links and no dangling anchors. No page
scrolls sideways at 390, 768 or 1440 pixels, in light or dark.

## Still open

- Fill in the SMTP, reCAPTCHA and Search Console values in the host environment.
- Register the site in Google Search Console and submit the sitemap.
- Integration partner logos are not shown. The old integrations page labelled
  its logo files with different company names, so which partnerships are real
  needs confirming first.
- LinkedIn is not linked; the old footer pointed it at `#`.
