# Noregna — Design System (LOCKED)

Global source of truth. Anything not written here is not part of the system.
If a component needs a value that is not in this file, the value is wrong or
this file is incomplete — fix one of those, do not invent a local one.

Generated with `ui-ux-pro-max --design-system --variance 6 --motion 4 --density 3`,
then overridden where Noregna has a real brand commitment. Overrides are marked
and justified; nothing is overridden on taste alone.

---

## 1. Brand colour — LOCKED

Sampled from the wordmark, not chosen. The logo runs `#3eb863` -> `#017139`,
with the N plate bottoming at `#07582d`. Those sit at hue **149.8 / 152.6 /
152.9**, so the ramp is anchored at **151.76** and stepped by lightness, with
chroma peaking mid-ramp and easing at both ends.

| Token | OKLCH | Hex | Verified role |
|---|---|---|---|
| `--brand-50` | `0.972 0.0237 151.76` | `#ebfbee` | tint wash |
| `--brand-100` | `0.936 0.0444 151.76` | `#d5f3db` | |
| `--brand-200` | `0.876 0.0740 151.76` | `#b3e5be` | soft borders |
| `--brand-300` | `0.800 0.1036 151.76` | `#8ad19c` | **on-green accent — 8.66:1 on brand-950** |
| `--brand-400` | `0.716 0.1302 151.76` | `#5dba7a` | dark-theme action |
| `--brand-500` | `0.640 0.1480 151.76` | `#31a55d` | |
| `--brand-600` | `0.556 0.1421 151.76` | `#118a46` | success |
| `--brand-700` | `0.474 0.1243 151.76` | `#036f36` | **action — 6.30:1 on white** |
| `--brand-800` | `0.404 0.1036 151.76` | `#06582a` | action hover |
| `--brand-900` | `0.344 0.0829 151.76` | `#0b4522` | **the green field — white 11.0:1** |
| `--brand-950` | `0.252 0.0592 151.76` | `#062a13` | field depth |

**OVERRIDE.** The tool proposed trust-blue `#2563EB` + orange `#EA580C`. Rejected:
Noregna's green is an existing brand commitment, and `impeccable/colorize.md`
is explicit that confirmed brand colours are preserved, not replaced.

### Roles, not swatches
`--bg --bg-sunken --surface --surface-raised --line --line-strong --ink
--ink-muted --ink-subtle --accent --accent-hover --accent-ink --accent-soft
--accent-soft-line --focus --field --field-deep --on-field --on-field-muted
--on-field-accent --on-field-line --ok --warn --danger`

Neutrals carry a trace of 151.76 so greys and green share one world. Shadows are
tinted with the brand hue, never neutral black. On the green field, secondary
text derives from the same hue — never a washed-out grey on colour.

**The green owns one region outright** (the hero field) rather than being
scattered as small accents.

---

## 2. Typography — LOCKED

**Geist / Geist Mono**, self-hosted via `next/font`.

**OVERRIDE.** The tool's top match was IBM Plex Sans ("Financial Trust" —
banks, fintech, excellent for data), with Plus Jakarta Sans from the
design-system pass. Both are good. Geist stays because it is already
self-hosted and zero-network at build, it is a named pairing in the taste
skill's approved list (`Geist + Geist Mono`), and Geist Mono covers the
data-legibility need the IBM Plex note is really pointing at. Revisit only if
the brand adopts a different face.

### Scale — one component owns it (`ui/Display.tsx`)

| Level | Size | Weight | Leading | Tracking |
|---|---|---|---|---|
| 1 (page/hero h1) | `2.25 / 2.875 / 3.5rem` | **300** | 1.05 | -0.032em |
| 2 (section h2) | `1.875 / 2.25 / 2.75rem` | **300** | 1.08 | -0.028em |
| 3 (card h3) | `1.375 / 1.5rem` | 500 | 1.22 | -0.016em |
| Body | `1.0625rem` | 400 | 1.6-1.65 | — |
| Small / label | `0.8125-0.9375rem` | 400-600 | 1.6 | 0.12em if caps |

Light weight at display sizes is deliberate — the register Conta and Sticos use.
Emphasis comes from the accent clause, never from bolding the line.

Numbers that get compared use `.tnum` (tabular figures).

---

## 3. Spacing & rhythm — density 3 (spacious)

Section padding `py-14/20` (sm) · `py-20/28` (md) · `py-24/36` (lg).
Container `max-w-1240px`, padding `1.25 / 2 / 2.5rem`.
Grid over flex-percentage maths, always.

## 4. Shape — LOCKED

| Element | Radius |
|---|---|
| Cards / containers | 16px (`rounded-2xl`) |
| Large panels | 28-36px |
| Buttons | **full pill** |
| Inputs, badges, inner tiles | 10px |
| Icon badges | full circle |

Pills for buttons and circles for icon badges are Noregna's own live-site
language, not a generic choice.

## 5. Motion — motion 4

`--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` · `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`

| Interaction | Duration |
|---|---|
| Press feedback `scale(0.97)` | 160ms |
| Hover / colour | 200-300ms |
| Scroll reveal (enter, once) | 420ms, 55ms stagger |

**OVERRIDE.** The tool proposed `back.out(1.4)` stagger. Rejected: bounce reads
as playful, and this audience is regulated professionals. Emil's rule applies —
keep bounce out of professional UI.

Only `transform` and `opacity` animate. No scroll listeners anywhere
(IntersectionObserver via Motion's `whileInView`). Everything collapses under
`prefers-reduced-motion`. A `<noscript>` rule forces `[data-reveal]` visible so
the page is never blank without JS.

## 6. Theme

Light is the default and the shipped look. Dark is **opt-in only** via the nav
toggle, persisted in `localStorage`, applied pre-paint. The OS setting is
deliberately not consulted — noregna.no is a light site and that is the version
signed off. Matches the tool's own "avoid: dark mode by default".

## 7. Component states — required, not optional

Every interactive element ships: rest · hover (pointer-gated) · **focus-visible
(2px accent ring, 2px offset)** · active (`scale(0.97)`) · disabled.
Forms additionally ship: helper · error (inline, below field) · success · loading.

`button`, `summary` and `[role=button]` are given `cursor: pointer` explicitly,
because Tailwind v4's preflight sets `cursor: default` on buttons.

## 8. Icons

**Phosphor only**, one family, one weight. Never emoji. Never hand-rolled SVG paths.
Sizes 13 / 16 / 20 / 22 / 25.

---

## Pre-delivery checklist

- [x] No emoji as icons — Phosphor SVG throughout
- [x] `cursor-pointer` on every clickable element
- [x] Hover transitions 150-300ms
- [x] Light-mode text contrast >= 4.5:1 (verified numerically, not by eye)
- [x] Focus states visible on every control
- [x] `prefers-reduced-motion` respected
- [x] Responsive verified at 375 / 768 / 1024 / 1440 (no horizontal scroll on any page)

## Content rule

Every visible string comes from `resources/lang/{no,en}/messages.php` in the
Noregna Laravel source. No invented copy, statistics, customer names or claims.
Only editorial change: en/em dashes normalised to hyphens.

---

## 9. One site, one composition — LOCKED 2026-08-25

Three landing treatments were built for review (card / stage / colour field).
The colour-field treatment was chosen; the other two and their route trees were
deleted, along with `VariantSwitch`, `HeaderFloating`, `HeaderLeft`, `Footer`,
`FooterLarge`, `StageArt`, `ClientPortal` and `InvoiceBand`. There is one shell
(`Header` + `FooterField`) and one homepage composition. `routing.ts` carries no
notion of a site base any more.

### What was borrowed, and what deliberately was not

The reference is poweroffice.no — a direct competitor whose structure works:
full-bleed colour field, centred headline, one CTA, the product card straddling
the seam into the page below, then full-height statement sections each carrying
one idea and one product surface.

**Taken:** that structure. It is a pattern, not a property.

**Refused, because these are their signatures and keeping them would read as a
copy rather than a convention:**

| Theirs | Ours | Why |
| --- | --- | --- |
| One headline word set in *italic* | Second clause set in `on-field-accent` | Italic-for-emphasis is the single most recognisable thing on their page, and our headline lands on the same word (`enkelt`) they use. Unmistakable. |
| Purple → orange, two hues meeting | One hue getting deeper, brand-800 → brand-600 | Two hues meeting is a different idea from one hue with depth. |
| Everything centred, every section | Hero centred, statement rows alternate | Centre-everything is the fastest way to look like a copy of a centred site. |
| Helvetica Neue at 90px | Geist at 48px max | Theirs is consumer-facing. Ours sells to regulated professionals; 90px reads as a shout. |

**Our own recurring device:** a numbered index (`00`, `01`, `02`, `03`) against a
hairline rule, in the hero eyebrow and on every product row. It is the register
Norwegian financial institutions already use, and it is not borrowed.

## 10. Three products, separated — LOCKED 2026-08-25

Noregna sells three things and the live site never says so in one place:

| # | Product | Where | Ground |
| --- | --- | --- | --- |
| 01 | Noregna (platform) | app.noregna.no | page (`bg-bg`) |
| 02 | Noregna Kundeportal | App Store / Google Play | field (`bg-field-deep dark:bg-field`) |
| 03 | Noregna Invoice | invoice.noregna.no — **free, not part of the platform** | tint (`bg-accent-soft dark:bg-bg-sunken`) |

**Separation is carried by copy and depth, never by a second palette.** Invoice
previously reproduced its real teal (`#0d7d6e`); that is now `#0f7a44`
(brand-700). Three products with three palettes look like three acquisitions.
One hue at three depths looks like a family.

**Every ground must separate from the page in both themes.** In dark, `--bg` is
0.19 L and `--field-deep` is 0.205 L — 0.015 apart, which renders as no edge at
all. The field therefore *lifts* in dark (`dark:bg-field`, 0.268 L) and the tint
*recesses* (`dark:bg-bg-sunken`, 0.155 L). Check both themes before shipping any
new ground.

**Chart series are exempt.** `DashboardPreview` and `InvoicePreview` use green /
amber / red / blue for data series, because distinguishable series need
distinguishable hues. That is a chart doing its job, not a palette leak.

## 11. Content rule — one amendment

Section 10's row copy is entirely Noregna's own, reused from where it already
appears. The strings added for it, and nowhere else on the site, are:
`home.products.{title, lead, whereLabel, platformWhere, portalWhere,
invoiceWhere, includedLabel, separateLabel, freeLabel}` — a section label, a
lead assembled from Noregna's own statements about what is and is not part of
the platform, and lines that state an address rather than make a claim.

## 12. Type scale — RE-LOCKED 2026-08-25

An audit of every rendered heading on every page found the site had drifted back
into two parallel heading systems: `Display` produced 44/34/19 while ProductTrio
carried a hand-written 30px row title and the contact and legal pages carried
hand-written 22px sub-headings. `h3` therefore meant 30px in one place and 19px
in another. Five card components each declared their own title style, drifting a
pixel apart from one another.

Four levels, one card utility, nothing outside them:

| Level | lg | weight | Role |
| --- | --- | --- | --- |
| — | 44px | 300 | homepage hero only, written in HeroPower and nowhere else |
| 1 | 40px | 300 | page titles — matches noregna.no's measured h1 |
| 2 | 32px | 300 | section titles — matches noregna.no's measured h2 |
| 3 | 24px | 400 | product row titles |
| 4 | 19px | 500 | sub-headings, form legends, `.legal-prose h2` |
| `.card-title` | 17px | 500 | titles inside a bordered card |

Body copy 16px, matching noregna.no exactly.

**How to keep this true.** Do not eyeball it. Load each page and collect every
heading's computed size:

```js
[...document.querySelectorAll('h1,h2,h3,h4')]
  .map(el => parseFloat(getComputedStyle(el).fontSize))
```

Every value must be in the table above. Anything else is a regression. This has
now drifted twice, both times because a component wrote its own size rather than
adding a level.

## 13. Product surfaces — crop rule

`DashboardPreview`'s `crop` clips the 782px design so the panel runs past a
fold. It must land on a boundary the eye accepts as finished. Measured:

| y | landmark |
| --- | --- |
| 467 | last overdue row ends |
| 480 | Task Reminder card ends |
| 492 | Recent Clients card begins |
| 531 | its table begins — **560 is the bottom of the column-header row** |
| 688 | its table ends |
| 701 | Recent Clients card ends |

Cut at 480 or 701. Never between 531 and 655: a table showing its column
headings with no rows under them reads as a rendering fault, not as a crop. The
hero shipped at 560 and looked broken.

## 14. The header sells — LOCKED 2026-08-25

A four-word nav is an index, not an argument. Eight modules and three products
were invisible until a visitor committed to a page, so `Våre systemer` now opens
a panel carrying all of them, with Invoice's "free, separate" status stated in
the chrome itself.

**Hover-to-open is gated on `matchMedia("(hover: hover)")`, never on
`event.pointerType`.** The first implementation checked `pointerType !== "mouse"`
and the whole interaction silently did nothing, because that string is not
reliable across browsers and automation. Ask the device about its capabilities,
not the event about its provenance.

The trigger is a real `<button>`: click toggles, Escape closes and returns
focus, outside click closes, following a link closes. Nothing depends on hover.
