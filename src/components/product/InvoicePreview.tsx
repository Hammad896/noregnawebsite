import {
  CaretDown,
  CaretRight,
  Cube,
  FileText,
  Gauge,
  Gear,
  PaperPlaneTilt,
  Repeat,
  ChartBar,
  UsersThree,
  UserGear,
} from "@phosphor-icons/react/dist/ssr";

/**
 * Noregna Invoice, reproduced in markup.
 *
 * Same reasoning as DashboardPreview: the real screenshot carries a live client
 * name and real invoice totals, none of which belongs on a
 * public page. Every name here is dummy data and the figures are illustrative.
 *
 * Invoice is a separate product, but it is separated by what the page says
 * about it, not by an off-brand hue. It sits one step deeper on the same brand
 * ramp as the platform (brand-700 against the platform's brand-600), so the two
 * surfaces read as one family seen at two depths rather than two unrelated
 * tools. Raw hex here rather than tokens because this is a reproduction of a
 * product UI, which does not follow the site's light/dark theme.
 */

/** brand-700, oklch(0.474 0.1243 151.76). */
const BRAND = "#0f7a44";
const BLUE = "#2f6fd8";
const GREEN = "#22a45d";
const AMBER = "#f5a623";
const SKY = "#6cb8e4";

const W = 1180;
const H = 700;

const IC = { size: 12, weight: "regular" as const };

const NAV = [
  { group: "Hovedmeny", items: [
    { label: "Dashbord", icon: <Gauge {...IC} />, active: true },
    { label: "Utsendelse", icon: <PaperPlaneTilt {...IC} /> },
  ]},
  { group: "Salg", items: [
    { label: "Fakturaer", icon: <FileText {...IC} /> },
    { label: "Kunder", icon: <UsersThree {...IC} /> },
    { label: "Produkter", icon: <Cube {...IC} /> },
    { label: "Repeterende faktura", icon: <Repeat {...IC} /> },
  ]},
  { group: "Rapporter", items: [{ label: "Rapporter", icon: <ChartBar {...IC} /> }] },
  { group: "Innstillinger", items: [
    { label: "Bedriftsinnstillinger", icon: <Gear {...IC} /> },
    { label: "Brukeradministrasjon", icon: <UserGear {...IC} /> },
  ]},
];

const SENT = [
  { no: "1024", client: "Alpha Solutions AS" },
  { no: "1023", client: "Beta Consulting AS" },
  { no: "1022", client: "Gamma Enterprises AS" },
  { no: "1021", client: "Delta Systems AS" },
  { no: "1020", client: "Epsilon Ventures AS" },
];

/* Twelve months of invoiced value; the curve peaks mid-spring and settles. */
const SERIES = [0, 4500, 5813, 30469, 0, 0, 0, 0, 0, 0, 0, 0];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"];
const PEAK = 40000;

const CHART_W = 820;
const CHART_H = 190;

function point(i: number, v: number) {
  const x = (i / (SERIES.length - 1)) * CHART_W;
  const y = CHART_H - (v / PEAK) * CHART_H;
  return [x, y] as const;
}

/** A smooth path through the series, so the curve reads as a real chart. */
function curve() {
  const pts = SERIES.map((v, i) => point(i, v));
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    const mx = (x0 + x1) / 2;
    d += ` C ${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`;
  }
  return d;
}

const DONUT = [
  { label: "Fakturert", pct: 86.4, color: BRAND },
  { label: "Betalt", pct: 4.5, color: AMBER },
  { label: "Kreditert", pct: 9.1, color: SKY },
];

const R = 54;
const C = 2 * Math.PI * R;
const ARCS = DONUT.reduce<{ label: string; color: string; len: number; offset: number }[]>(
  (acc, s) => {
    const len = (s.pct / 100) * C;
    const offset = acc.length ? acc[acc.length - 1].offset + acc[acc.length - 1].len : 0;
    return [...acc, { label: s.label, color: s.color, len, offset }];
  },
  [],
);

export function InvoicePreview({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`[--s:0.5] ${className}`}
      style={{ width: `calc(${W}px * var(--s))`, height: `calc(${H}px * var(--s))` }}
    >
      <div
        className="overflow-hidden rounded-[16px] border border-[#e4e7eb] bg-white shadow-[0_24px_52px_-22px_rgba(9,63,39,0.3)]"
        style={{ width: W, height: H, transform: "scale(var(--s))", transformOrigin: "top left" }}
      >
        <div className="flex h-full">
          {/* Sidebar */}
          <aside className="flex h-full w-[192px] shrink-0 flex-col border-r border-[#eceff2] bg-white px-2 py-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-[12px] font-bold leading-tight" style={{ color: BRAND }}>
                NOREGNA
                <span className="block text-[8.5px] font-semibold tracking-[0.08em]">INVOICE</span>
              </span>
              <CaretRight size={11} className="text-[#9ca3af]" />
            </div>

            <div className="mt-4 grid gap-3 overflow-hidden">
              {NAV.map((g) => (
                <div key={g.group}>
                  <p className="px-2 pb-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-[#9ca3af]">
                    {g.group}
                  </p>
                  <div className="grid gap-[2px]">
                    {g.items.map((i) => (
                      <div
                        key={i.label}
                        className={`flex items-center gap-2 rounded-[6px] px-2 py-[6px] ${
                          i.active ? "bg-[#fdeaea]" : ""
                        }`}
                      >
                        <span style={{ color: i.active ? BRAND : "#6b7280" }}>{i.icon}</span>
                        <span
                          className="truncate text-[11px]"
                          style={{ color: i.active ? BRAND : "#4b5563", fontWeight: i.active ? 600 : 400 }}
                        >
                          {i.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Main */}
          <div className="flex min-w-0 flex-1 flex-col bg-[#f7f8fa]">
            <div className="flex items-center justify-between border-b border-[#eceff2] bg-white px-4 py-[9px]">
              <div className="flex min-w-[168px] items-center justify-between rounded-[7px] border border-[#e2e5e9] px-2.5 py-[6px]">
                <span className="text-[11px] font-medium text-[#111827]">NOREGNA AS</span>
                <CaretDown size={9} className="text-[#9ca3af]" />
              </div>
              <div className="flex items-center gap-[6px]">
                <span
                  className="flex h-[26px] w-[26px] items-center justify-center rounded-[6px] text-[15px] text-white"
                  style={{ background: BRAND }}
                >
                  +
                </span>
                {["EN"].map((l) => (
                  <span
                    key={l}
                    className="flex h-[26px] items-center rounded-[6px] border border-[#e2e5e9] px-2 text-[9.5px] font-semibold text-[#4b5563]"
                  >
                    {l}
                  </span>
                ))}
                <span className="h-[26px] w-[26px] rounded-full bg-[#eef2f5]" />
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-hidden px-4 py-3">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold text-[#111827]">Finansielt Dashbord</p>
                <span className="flex items-center gap-1.5 rounded-[6px] border border-[#e2e5e9] bg-white px-2 py-[4px] text-[10px] text-[#374151]">
                  År: 2026 <CaretDown size={8} className="text-[#9ca3af]" />
                </span>
              </div>

              {/* Invoiced vs paid */}
              <div className="mt-2 rounded-[9px] border border-[#eceff2] bg-white p-3">
                <div className="flex items-baseline justify-between">
                  <p className="text-[11.5px] font-semibold text-[#111827]">
                    Inntekter vs. Innbetalinger (2026)
                  </p>
                  <p className="text-[9.5px] text-[#6b7280]">
                    Fakturert: <span className="font-bold text-[#111827]">NOK 40 781</span>
                    <span className="ml-3">
                      Betalt: <span className="font-bold" style={{ color: GREEN }}>NOK 938</span>
                    </span>
                  </p>
                </div>

                <svg
                  viewBox={`0 0 ${CHART_W} ${CHART_H + 18}`}
                  className="mt-2 w-full"
                  preserveAspectRatio="none"
                  style={{ height: 150 }}
                >
                  <defs>
                    <linearGradient id="invFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={BLUE} stopOpacity="0.35" />
                      <stop offset="100%" stopColor={BLUE} stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  {[0, 0.25, 0.5, 0.75, 1].map((f) => (
                    <line
                      key={f}
                      x1="0"
                      x2={CHART_W}
                      y1={CHART_H * f}
                      y2={CHART_H * f}
                      stroke="#eceff2"
                      strokeWidth="1"
                    />
                  ))}
                  <path d={`${curve()} L ${CHART_W} ${CHART_H} L 0 ${CHART_H} Z`} fill="url(#invFill)" />
                  <path d={curve()} fill="none" stroke={BLUE} strokeWidth="2.5" />
                  <line
                    x1="0"
                    x2={CHART_W}
                    y1={CHART_H - 5}
                    y2={CHART_H - 5}
                    stroke={GREEN}
                    strokeWidth="2.5"
                  />
                </svg>

                <div className="flex justify-between px-1 text-[8.5px] text-[#9ca3af]">
                  {MONTHS.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </div>

              {/* Recently sent + status split */}
              <div className="mt-3 flex gap-3">
                <div className="min-w-0 flex-1 rounded-[9px] border border-[#eceff2] bg-white p-3">
                  <p className="text-[11.5px] font-semibold text-[#111827]">Nylig sendt e-post</p>
                  <div className="mt-2 overflow-hidden rounded-[6px] border border-[#eceff2]">
                    <div className="grid grid-cols-[0.6fr_1.4fr_0.6fr] bg-[#f4f6f8] px-3 py-[6px] text-[9px] font-semibold text-[#4b5563]">
                      <span>Fakturanr</span>
                      <span>Kunde</span>
                      <span>Status</span>
                    </div>
                    {SENT.map((r, i) => (
                      <div
                        key={r.no}
                        className={`grid grid-cols-[0.6fr_1.4fr_0.6fr] items-center px-3 py-[7px] text-[9.5px] ${
                          i > 0 ? "border-t border-[#f1f3f5]" : ""
                        }`}
                      >
                        <span style={{ color: BRAND }}>{r.no}</span>
                        <span className="truncate text-[#374151]">{r.client}</span>
                        <span>
                          <span className="rounded-[4px] bg-[#e8f6ef] px-[5px] py-[2px] text-[8px] font-bold text-[#15803d]">
                            SENDT
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-[290px] shrink-0 rounded-[9px] border border-[#eceff2] bg-white p-3">
                  <p className="text-[11.5px] font-semibold text-[#111827]">
                    Distribusjon av fakturastatus
                  </p>
                  <div className="mt-1 flex items-center justify-center">
                    <svg viewBox="0 0 150 150" className="h-[124px] w-[124px]">
                      <g transform="rotate(-90 75 75)">
                        {ARCS.map((a) => (
                          <circle
                            key={a.label}
                            cx="75"
                            cy="75"
                            r={R}
                            fill="none"
                            stroke={a.color}
                            strokeWidth="26"
                            strokeDasharray={`${a.len} ${C - a.len}`}
                            strokeDashoffset={-a.offset}
                          />
                        ))}
                      </g>
                      <text
                        x="75"
                        y="72"
                        textAnchor="middle"
                        className="fill-[#6b7280]"
                        style={{ fontSize: 9 }}
                      >
                        Total
                      </text>
                      <text
                        x="75"
                        y="90"
                        textAnchor="middle"
                        className="fill-[#111827]"
                        style={{ fontSize: 19, fontWeight: 700 }}
                      >
                        22
                      </text>
                    </svg>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    {DONUT.map((d) => (
                      <span key={d.label} className="flex items-center gap-1 text-[8px] text-[#4b5563]">
                        <span
                          className="h-[6px] w-[6px] rounded-full"
                          style={{ background: d.color }}
                        />
                        {d.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
