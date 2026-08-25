import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * Delivery is intentionally NOT implemented against a hardcoded provider. Set
 * CONTACT_WEBHOOK_URL to the endpoint that should receive the submission (a
 * mail service, a CRM intake, or Noregna's own backend) and it forwards there.
 *
 * Without that variable:
 *   development -> accepts and reports success, so the flow is demonstrable,
 *                  and logs only that a submission happened, never its contents
 *   production  -> returns 503, so the form shows its error state and points
 *                  the visitor at post@noregna.no rather than silently
 *                  swallowing a real enquiry
 *
 * Nothing here writes personal data to disk or to logs.
 */

export const runtime = "nodejs";

const MAX = { name: 100, email: 254, phone: 40, org: 200, orgNr: 20, message: 4000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Per-instance throttle. Enough to blunt casual abuse; a shared store would be
// needed if this is ever deployed across several instances.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot. Accept and discard, so a bot cannot tell it was caught.
  if (clean(body.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const payload = {
    firstName: clean(body.firstName, MAX.name),
    lastName: clean(body.lastName, MAX.name),
    email: clean(body.email, MAX.email),
    phone: clean(body.phone, MAX.phone),
    org: clean(body.org, MAX.org),
    orgNr: clean(body.orgNr, MAX.orgNr),
    message: clean(body.message, MAX.message),
    locale: clean(body.locale, 5) === "en" ? "en" : "no",
  };

  const missing = (["firstName", "lastName", "email", "message"] as const).filter(
    (f) => !payload[f],
  );
  if (missing.length > 0 || !EMAIL_RE.test(payload.email)) {
    return NextResponse.json({ error: "validation_failed", fields: missing }, { status: 400 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (!webhook) {
    if (process.env.NODE_ENV === "production") {
      console.error("[contact] CONTACT_WEBHOOK_URL is not set; submission not delivered");
      return NextResponse.json({ error: "not_configured" }, { status: 503 });
    }
    console.info("[contact] accepted in development; delivery is not configured");
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, receivedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`upstream ${res.status}`);
  } catch (err) {
    console.error("[contact] delivery failed:", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
