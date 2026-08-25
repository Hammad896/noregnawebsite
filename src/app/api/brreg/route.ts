import { NextResponse } from "next/server";

/**
 * Company lookup against the Broennoeysund Register Centre.
 *
 * The original page calls data.brreg.no straight from the browser. Proxying it
 * keeps the request same-origin (no CORS surprises if brreg tightens headers),
 * lets the result be cached, and means the query never leaves our own domain in
 * the visitor's network log.
 *
 * The register is public data. Nothing personal is sent: only the company name
 * the visitor typed.
 */

export const runtime = "nodejs";
export const revalidate = 3600;

const ENDPOINT = "https://data.brreg.no/enhetsregisteret/api/enheter";

export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get("q")?.trim() ?? "";

  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const res = await fetch(
      `${ENDPOINT}?navn=${encodeURIComponent(q.slice(0, 120))}&size=8`,
      {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(6000),
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) throw new Error(`brreg ${res.status}`);

    const data = (await res.json()) as {
      _embedded?: { enheter?: { navn: string; organisasjonsnummer: string }[] };
    };

    const results = (data._embedded?.enheter ?? []).map((e) => ({
      name: e.navn,
      orgNr: e.organisasjonsnummer,
    }));

    return NextResponse.json({ results });
  } catch (err) {
    console.error("[brreg] lookup failed:", err instanceof Error ? err.message : "unknown");
    // A failed lookup must never block the form: the visitor types it manually.
    return NextResponse.json({ results: [], unavailable: true });
  }
}
