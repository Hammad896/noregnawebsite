/**
 * The Kundeportal screens shown on the site, in the order the app is used:
 * splash, log in, home, overview, then the upload flow (pick a month, pick a
 * source, what is missing), daily settlement, documents, messages,
 * notifications, and finally the account screens.
 *
 * The files are the sanitised WebPs built for the Laravel site (NoregnaWeb,
 * resources/img-src/app-shots -> scripts/build-app-shots.php: PHP GD, quality
 * 82, max 960 px wide, never upscaled). Every screen carries demo data only:
 * Demo Handel AS, Anna, Kari Nordmann, Demo Regnskap AS, post@demohandel.no,
 * org.nr 123 456 789. The raw captures with real client data live in the
 * gitignored `app images/` folder and must never be used directly.
 *
 * Two capture sizes exist (1290x2796 and 738x1600); both are the same aspect
 * ratio, so slides in a carousel keep one height. Labels and alt text come
 * from the dictionary, keyed by `key`.
 */

export const APP_SHOTS = [
  { key: "splash", src: "/app-shots/kundeportal.webp", width: 738, height: 1600 },
  { key: "login", src: "/app-shots/innlogging.webp", width: 960, height: 2081 },
  { key: "home", src: "/app-shots/hjem.webp", width: 960, height: 2081 },
  { key: "overview", src: "/app-shots/oversikt.webp", width: 960, height: 2081 },
  { key: "uploads", src: "/app-shots/last-opp-bilag.webp", width: 738, height: 1600 },
  { key: "source", src: "/app-shots/velg-kilde.webp", width: 738, height: 1600 },
  { key: "missing", src: "/app-shots/manglende-bilag.webp", width: 960, height: 2081 },
  { key: "settlement", src: "/app-shots/dagsoppgjor.webp", width: 738, height: 1600 },
  { key: "documents", src: "/app-shots/mine-dokumenter.webp", width: 960, height: 2081 },
  { key: "chat", src: "/app-shots/meldinger.webp", width: 738, height: 1600 },
  { key: "notifications", src: "/app-shots/varsler.webp", width: 738, height: 1600 },
  { key: "profile", src: "/app-shots/profil.webp", width: 738, height: 1600 },
  { key: "switch", src: "/app-shots/bytt-firma.webp", width: 738, height: 1600 },
] as const;

export type AppShot = (typeof APP_SHOTS)[number];
export type AppShotKey = AppShot["key"];

export function shot(key: AppShotKey): AppShot {
  return APP_SHOTS.find((s) => s.key === key)!;
}
