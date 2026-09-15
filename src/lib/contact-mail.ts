import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import type { Locale } from "@/content/site";

/**
 * Contact-form delivery over SMTP.
 *
 * Mirrors what the Laravel site did in UserController::store(): one message to
 * the Noregna inbox with the enquiry, and one short confirmation back to the
 * visitor. The environment variables use the same names as the Laravel .env
 * (MAIL_HOST, MAIL_PORT, MAIL_ENCRYPTION, MAIL_USERNAME, MAIL_PASSWORD,
 * MAIL_FROM_ADDRESS, MAIL_FROM_NAME) so the existing values can be copied
 * across without translation. Two additions:
 *
 *   CONTACT_TO        inbox that receives enquiries (default post@noregna.no)
 *
 * Nothing here is persisted. The Laravel site also wrote each submission to a
 * `user_lists` table; this site has no database, so the e-mail is the record.
 */

export type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  org: string;
  orgNr: string;
  message: string;
  locale: Locale;
};

const DEFAULT_TO = "post@noregna.no";
const DEFAULT_FROM_NAME = "Noregna";

const COMPANY_SIGNATURE = {
  name: "Noregna AS",
  address: "Østre Aker vei 17, 0581 Oslo",
  email: "post@noregna.no",
  site: "noregna.no",
};

/** True when enough is configured to attempt SMTP delivery. */
export function smtpConfigured(): boolean {
  return Boolean(process.env.MAIL_HOST && process.env.MAIL_FROM_ADDRESS);
}

function transport() {
  const port = Number(process.env.MAIL_PORT ?? 587);
  const encryption = (process.env.MAIL_ENCRYPTION ?? "tls").toLowerCase();
  const user = process.env.MAIL_USERNAME;

  // Laravel's vocabulary: "ssl" is implicit TLS (port 465), "tls" is STARTTLS
  // (port 587), anything else is plain. Map it onto nodemailer's flags.
  const implicitTls = encryption === "ssl" || port === 465;

  return nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port,
    secure: implicitTls,
    requireTLS: !implicitTls && encryption === "tls",
    auth: user ? { user, pass: process.env.MAIL_PASSWORD ?? "" } : undefined,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
}

function esc(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function nl2br(value: string): string {
  return esc(value).replaceAll("\n", "<br>");
}

const COPY = {
  no: {
    internalSubject: (p: ContactPayload) => `Ny henvendelse fra nettsiden: ${p.firstName} ${p.lastName}`,
    internalIntro: "En besøkende har sendt inn kontaktskjemaet på noregna.no.",
    labels: {
      name: "Navn",
      email: "E-post",
      phone: "Telefon",
      org: "Organisasjon",
      orgNr: "Org.nr.",
      message: "Melding",
      language: "Språk på siden",
      received: "Mottatt",
    },
    languageName: { no: "Norsk", en: "Engelsk" } as Record<Locale, string>,
    thanksSubject: "Takk for henvendelsen til Noregna",
    thanksGreeting: (p: ContactPayload) => `Hei ${p.firstName},`,
    thanksBody:
      "Takk for meldingen. Vi har mottatt henvendelsen din og tar kontakt snart. Du trenger ikke å foreta deg noe mer nå.",
    thanksQuestion: "Har du spørsmål i mellomtiden, kan du svare på denne e-posten.",
    thanksSignoff: "Vennlig hilsen",
    yourMessage: "Meldingen du sendte",
  },
  en: {
    internalSubject: (p: ContactPayload) => `New enquiry from the website: ${p.firstName} ${p.lastName}`,
    internalIntro: "A visitor has submitted the contact form on noregna.no.",
    labels: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      org: "Organisation",
      orgNr: "Org. no.",
      message: "Message",
      language: "Page language",
      received: "Received",
    },
    languageName: { no: "Norwegian", en: "English" } as Record<Locale, string>,
    thanksSubject: "Thank you for contacting Noregna",
    thanksGreeting: (p: ContactPayload) => `Hi ${p.firstName},`,
    thanksBody:
      "Thank you for your message. We have received your enquiry and will be in touch shortly. There is nothing more you need to do for now.",
    thanksQuestion: "If you have any questions in the meantime, you can reply to this email.",
    thanksSignoff: "Kind regards",
    yourMessage: "The message you sent",
  },
} as const;

function internalMessage(p: ContactPayload, receivedAt: Date) {
  // Staff read Norwegian; the visitor's language is noted as a field.
  const c = COPY.no;
  const rows: [string, string][] = [
    [c.labels.name, `${p.firstName} ${p.lastName}`],
    [c.labels.email, p.email],
    [c.labels.phone, p.phone || "-"],
    [c.labels.org, p.org || "-"],
    [c.labels.orgNr, p.orgNr || "-"],
    [c.labels.language, c.languageName[p.locale]],
    [c.labels.received, receivedAt.toISOString()],
  ];

  const text = [
    c.internalIntro,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    `${c.labels.message}:`,
    p.message,
  ].join("\n");

  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#111827;font-size:15px;line-height:1.55">
<p>${esc(c.internalIntro)}</p>
<table cellpadding="0" cellspacing="0" style="border-collapse:collapse">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="padding:4px 16px 4px 0;color:#6b7280;vertical-align:top">${esc(k)}</td><td style="padding:4px 0">${esc(v)}</td></tr>`,
  )
  .join("\n")}
</table>
<p style="margin-top:18px;color:#6b7280">${esc(c.labels.message)}:</p>
<div style="padding:12px 14px;border:1px solid #e5e7eb;border-radius:8px;background:#f9fafb">${nl2br(p.message)}</div>
</body></html>`;

  return { subject: c.internalSubject(p), text, html };
}

function thankYouMessage(p: ContactPayload) {
  const c = COPY[p.locale];
  const sig = `${COMPANY_SIGNATURE.name}\n${COMPANY_SIGNATURE.address}\n${COMPANY_SIGNATURE.email}`;

  const text = [
    c.thanksGreeting(p),
    "",
    c.thanksBody,
    c.thanksQuestion,
    "",
    `${c.yourMessage}:`,
    p.message,
    "",
    c.thanksSignoff,
    sig,
  ].join("\n");

  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#111827;font-size:15px;line-height:1.55">
<p>${esc(c.thanksGreeting(p))}</p>
<p>${esc(c.thanksBody)}<br>${esc(c.thanksQuestion)}</p>
<p style="margin-top:18px;color:#6b7280">${esc(c.yourMessage)}:</p>
<div style="padding:12px 14px;border:1px solid #e5e7eb;border-radius:8px;background:#f9fafb">${nl2br(p.message)}</div>
<p style="margin-top:22px">${esc(c.thanksSignoff)}<br><strong>${esc(COMPANY_SIGNATURE.name)}</strong><br>${esc(COMPANY_SIGNATURE.address)}<br><a href="mailto:${COMPANY_SIGNATURE.email}" style="color:#0f7a44">${COMPANY_SIGNATURE.email}</a></p>
</body></html>`;

  return { subject: c.thanksSubject, text, html };
}

type SentInfo = SMTPTransport.SentMessageInfo;

export type DeliveryResult = {
  /** The enquiry delivered to the Noregna inbox. */
  internal: SentInfo;
  /** The confirmation to the visitor, or null if that step failed. */
  thanks: SentInfo | null;
};

/**
 * Sends the enquiry to the inbox, then the confirmation to the visitor.
 *
 * The first send is the one that matters, so a failure there throws. A failure
 * on the confirmation (typo in the visitor's address, greylisting) is logged
 * and swallowed: the enquiry has already reached Noregna, and the visitor sees
 * the on-page success state either way.
 */
export async function sendContactEmails(p: ContactPayload): Promise<DeliveryResult> {
  const t = transport();
  const from = {
    name: process.env.MAIL_FROM_NAME || DEFAULT_FROM_NAME,
    address: process.env.MAIL_FROM_ADDRESS as string,
  };
  const to = process.env.CONTACT_TO || DEFAULT_TO;
  const receivedAt = new Date();

  const internal = await t.sendMail({
    from,
    to,
    replyTo: { name: `${p.firstName} ${p.lastName}`, address: p.email },
    ...internalMessage(p, receivedAt),
  });

  let thanks: SentInfo | null = null;
  try {
    thanks = await t.sendMail({
      from,
      to: p.email,
      replyTo: to,
      ...thankYouMessage(p),
    });
  } catch (err) {
    console.error(
      "[contact] confirmation to visitor failed:",
      err instanceof Error ? err.message : "unknown",
    );
  }

  return { internal, thanks };
}
