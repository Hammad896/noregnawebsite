"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CompanySearch } from "./CompanySearch";
import { EXTERNAL, type Dict } from "@/content/site";
import { Icon } from "@/lib/icons";

type Field = "firstName" | "lastName" | "email" | "phone" | "org" | "message";
type Errors = Partial<Record<Field, string>>;

const REQUIRED: Field[] = ["firstName", "lastName", "email", "message"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const EMPTY: Record<Field, string> = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  org: "",
  message: "",
};

export function ContactForm({ t }: { t: Dict }) {
  const uid = useId();
  const [values, setValues] = useState<Record<Field, string>>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  // Bots fill hidden inputs; people do not. Cheaper and less hostile than a
  // captcha, and it needs no third-party script on the page.
  const [trap, setTrap] = useState("");
  const [orgNr, setOrgNr] = useState("");

  const c = t.contact;

  function set(field: Field, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate(): Errors {
    const next: Errors = {};
    for (const f of REQUIRED) {
      if (!values[f].trim()) next[f] = c.errorRequired;
    }
    if (values.email.trim() && !EMAIL_RE.test(values.email.trim())) {
      next.email = c.errorEmail;
    }
    return next;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate();
    setErrors(found);

    if (Object.keys(found).length > 0) {
      const first = REQUIRED.find((f) => found[f]) ?? "email";
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, orgNr, company: trap, locale: t.meta.locale }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setValues(EMPTY);
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-accent-soft-line bg-accent-soft p-8 md:p-10">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-ink">
          <Icon name="check" size={22} weight="bold" />
        </span>
        <h2 className="mt-5 text-[1.0625rem] font-medium leading-[1.35] tracking-[-0.011em] text-ink sm:text-[1.1875rem]">
          {c.successTitle}
        </h2>
        <p className="mt-3 max-w-[52ch] text-[0.9375rem] leading-[1.65] text-ink-muted">
          {c.successBody}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button href={EXTERNAL.app} external arrow="external">
            {c.trialCta}
          </Button>
          <Button variant="secondary" onClick={() => setStatus("idle")}>
            {c.reset}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="rounded-2xl border border-line bg-surface p-7 md:p-9"
    >
      <h2 className="text-[1.0625rem] font-medium leading-[1.35] tracking-[-0.011em] text-ink sm:text-[1.1875rem]">{c.formTitle}</h2>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <TextField
          uid={uid}
          name="firstName"
          label={c.fields.firstName}
          value={values.firstName}
          error={errors.firstName}
          onChange={set}
          required
          autoComplete="given-name"
        />
        <TextField
          uid={uid}
          name="lastName"
          label={c.fields.lastName}
          value={values.lastName}
          error={errors.lastName}
          onChange={set}
          required
          autoComplete="family-name"
        />
        <TextField
          uid={uid}
          name="email"
          type="email"
          label={c.fields.email}
          value={values.email}
          error={errors.email}
          onChange={set}
          required
          autoComplete="email"
        />
        <TextField
          uid={uid}
          name="phone"
          type="tel"
          label={c.fields.phone}
          value={values.phone}
          error={errors.phone}
          onChange={set}
          autoComplete="tel"
        />
        <CompanySearch
          t={t}
          onPick={(name, nr) => {
            setValues((v) => ({ ...v, org: name }));
            setOrgNr(nr);
          }}
        />

        <div className="sm:col-span-2">
          <TextField
            uid={uid}
            name="org"
            label={c.fields.manualLabel}
            help={c.fields.orgHelp}
            value={values.org}
            error={errors.org}
            onChange={set}
            autoComplete="organization"
          />
        </div>
        <div className="sm:col-span-2">
          <TextField
            uid={uid}
            name="message"
            label={c.fields.message}
            value={values.message}
            error={errors.message}
            onChange={set}
            required
            multiline
            placeholder={c.fields.messagePlaceholder}
          />
        </div>
      </div>

      {/* Honeypot. Off-screen rather than display:none, so browsers still skip
          it in the tab order while bots that read the DOM still see it. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-company`}>Company</label>
        <input
          id={`${uid}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={trap}
          onChange={(e) => setTrap(e.target.value)}
        />
      </div>

      {status === "failed" ? (
        <p
          role="alert"
          className="mt-6 rounded-[10px] border border-line bg-bg-sunken px-4 py-3 text-[0.9375rem] text-ink"
        >
          {c.errorGeneric}
        </p>
      ) : null}

      <div className="mt-8">
        <Button type="submit" size="lg" disabled={status === "sending"} arrow="right">
          {status === "sending" ? c.submitting : c.submit}
        </Button>
      </div>
    </form>
  );
}

function TextField({
  uid,
  name,
  label,
  help,
  value,
  error,
  onChange,
  required,
  multiline,
  type = "text",
  placeholder,
  autoComplete,
}: {
  uid: string;
  name: Field;
  label: string;
  help?: string;
  value: string;
  error?: string;
  onChange: (f: Field, v: string) => void;
  required?: boolean;
  multiline?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  const id = `${uid}-${name}`;
  const helpId = help ? `${id}-help` : undefined;
  const errId = error ? `${id}-error` : undefined;

  // Label above, help under the label, error under the control. Never a
  // placeholder standing in for a label.
  const base =
    "w-full rounded-[10px] border bg-surface-raised px-3.5 py-2.5 text-[0.9375rem] text-ink " +
    "placeholder:text-ink-subtle transition-[border-color,box-shadow] duration-200 " +
    "focus:outline-none focus-visible:border-accent";

  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-[0.875rem] font-medium text-ink">
        {label}
        {required ? (
          <span className="ml-1 text-accent" aria-hidden>
            *
          </span>
        ) : null}
      </label>

      {help ? (
        <p id={helpId} className="text-[0.8125rem] text-ink-subtle">
          {help}
        </p>
      ) : null}

      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={5}
          value={value}
          placeholder={placeholder}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={[helpId, errId].filter(Boolean).join(" ") || undefined}
          onChange={(e) => onChange(name, e.target.value)}
          className={`${base} resize-y ${error ? "border-[#b3261e] dark:border-[#f2b8b5]" : "border-line-strong"}`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={[helpId, errId].filter(Boolean).join(" ") || undefined}
          onChange={(e) => onChange(name, e.target.value)}
          className={`${base} ${error ? "border-[#b3261e] dark:border-[#f2b8b5]" : "border-line-strong"}`}
        />
      )}

      {error ? (
        <p id={errId} className="text-[0.8125rem] text-[#b3261e] dark:text-[#f2b8b5]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
