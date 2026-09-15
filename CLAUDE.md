@AGENTS.md

# Project notes

`README.md` explains how the site is built. `design-system/noregna/MASTER.md`
holds every visual value and must be read before changing one. These notes are
the conventions and traps that are easy to break.

## Kundeportal screenshots

- `src/content/app-shots.ts` is the single list of the 13 screens, in the order
  the app is used, with file, width and height. Labels and alt text live in
  `site.ts` under `appPage.screens`, keyed the same way, in both languages.
- `PhoneFrame.tsx` draws an iPhone 15 Pro in CSS (titanium band, thin bezel,
  concentric corners, Dynamic Island, side buttons), sized in container-width
  units so it keeps real proportions at any width. `PhoneCarousel.tsx` cycles one phone
  through every screen on the home page: auto-advances, pauses on hover and
  focus, swipes, and stops under reduced motion.
- The `/app` hero is a fan of frames: one under `sm`, three from `sm`, five from
  `xl`, where the column is wide enough not to cut one in half.
- Files are `public/app-shots/*.webp`, the sanitised set built in the Laravel
  repository (`NoregnaWeb/resources/img-src/app-shots` and
  `scripts/build-app-shots.php`). To replace a screen, put a new PNG there, run
  that script, copy the WebP here and update its size in `app-shots.ts`.
- Only demo data: Demo Handel AS, Anna, Kari Nordmann, Demo Regnskap AS. Raw
  captures in `app images/` hold real client names and are gitignored.

## Motion and touch

- Scroll reveals (`Reveal.tsx`) ship visible. Only a block that mounts below the
  fold is hidden and then revealed on entry; `eager` opts a block out entirely.
  Never branch the markup on `prefers-reduced-motion`: the server cannot know
  it, and a mismatch once blanked the page for those visitors.
- The homepage hero entrance and drifting lights are CSS (`hero-in`,
  `hero-card-in`, `hero-rule`, `hero-field` in `globals.css`), so they start at
  first paint. All of it is off under reduced motion.
- `press` is the pressed state for buttons and icon controls; list rows use
  `active:bg-accent-soft`. `anim-in` is the entry for states that appear in
  place: success panel, error lines, search results.
- The phone menu is an `AnimatePresence` sheet. Escape, the close button, or
  dragging its grab handle upwards dismisses it. Drag starts only from the
  handle, so scrolling a long menu is never read as a swipe.
- `viewport-fit=cover` is set in both root layouts; `.container-page` keeps the
  side gutter at least the safe-area inset.

## Navigation

- `Våre systemer` in the header is a link; the caret beside it opens the panel.
  On phones the menu's expanded systems list starts with a "see all systems"
  link, because the summary row itself only expands.
- The header logo links home; on the homepage it scrolls back to the top
  instead, since a link to the current page does not move you. The footer
  logo links home too.
- The language switch keeps you on the same page in the other language by
  swapping the `/en` prefix (`swapLocale` in `routing.ts`). Every route,
  legal pages included, exists in both trees, so never resolve it through
  `PAGE_KEYS`: that sent the legal pages to the homepage.
- Both root layouts carry `data-scroll-behavior="smooth"`. Next.js 16 no longer
  cancels the site's smooth scrolling on page changes without it, which made
  every navigation smooth-scroll.
- Anything that looks like a tile or card and names a module is a link to that
  module's card on the systems page.
- Module lists show the product word via `shortName()` in `src/lib/modules.ts`,
  so a link reading "Fremdrift" lands on "Fremdrift", not on its tagline.
- `ServicesIndex.tsx` highlights the module in the URL hash on arrival and
  follows the card being read while scrolling.
- Unknown URLs are caught by `[...notFound]` in each language tree, so the 404
  renders in the right language with the site's own chrome.

## SEO and launch

- `src/app/sitemap.ts` and `robots.ts` generate `/sitemap.xml` and
  `/robots.txt`. Add every new page to the `PAGES` list in the sitemap.
- Every page sets its own title, description, canonical and `languages`
  alternates. `JsonLd.tsx`, rendered in `SiteShell`, emits Organization and
  WebSite structured data from the site's own constants.
- The link preview card is generated at build time from the hero copy by
  `src/lib/og.tsx`, wired up by `opengraph-image.tsx` in each language tree.
- Search Console: set `GOOGLE_SITE_VERIFICATION` in the host environment and
  the meta tag appears; empty means no tag.
- Security headers and the image size rungs live in `next.config.ts`.

## Known debt

- No Content-Security-Policy yet, because reCAPTCHA needs a per-request nonce.
- The contact form writes nothing to a database; the e-mail to post@noregna.no
  is the only record. The Laravel site also kept a `user_lists` table.
- The product's own sidebar has the typo "Klientdokumenatsjon"; the dashboard
  mock spells it correctly.
