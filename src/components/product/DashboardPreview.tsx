import {
  Bell,
  Buildings,
  CalendarBlank,
  CaretDown,
  CaretRight,
  ChatCircleDots,
  ChatsCircle,
  Envelope,
  FolderOpen,
  Gauge,
  GridFour,
  Question,
  Receipt,
  Scales,
  SealCheck,
  SquaresFour,
  Sliders,
  UserCircleMinus,
  Users,
  Wallet,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

/**
 * A faithful reproduction of the Noregna dashboard as it ships today.
 *
 * Why this is built rather than dropped in as a PNG:
 *
 *  1. Privacy. The real dashboard is full of live client names and personal
 *     email addresses. None of that can go on a public marketing page. Every
 *     name here is dummy data (Alpha, Beta, Gamma, Delta, Epsilon), matching
 *     the placeholder set Noregna already uses in its own product imagery.
 *  2. Fidelity. A 1920px screenshot scaled into a hero column renders around
 *     44%, which turns the deadline table into grey mush. This stays sharp at
 *     any size and on any display.
 *
 * Layout, labels, colours, icon placement and proportions all follow the
 * shipped product. Only the data is substituted.
 */

const GREEN = "#1a9d52";
const AMBER = "#f5a623";
const RED = "#e04256";

/* Drawn at a fixed design size, then scaled to fit its column. Keeps the
   sidebar-to-content proportions identical to the real 1440px app. */
const W = 1180;
const H = 782;

type Nav = { label: string; icon: React.ReactNode; caret?: boolean; badge?: string; active?: boolean };

const IC = { size: 13, weight: "regular" as const };

const FREMDRIFT: Nav[] = [
  { label: "Dashboard", icon: <Gauge {...IC} />, active: true },
  { label: "Clients", icon: <Users {...IC} /> },
  { label: "Overview Accounting", icon: <SquaresFour {...IC} />, caret: true },
  { label: "Overview Salary", icon: <Wallet {...IC} />, caret: true },
  { label: "Overview Invoicing", icon: <Receipt {...IC} /> },
  { label: "Annual Accounts Overview", icon: <FolderOpen {...IC} />, caret: true },
  { label: "Risk & money laundering", icon: <Scales {...IC} />, caret: true },
  { label: "Quality Control", icon: <SealCheck {...IC} />, caret: true },
  { label: "Email", icon: <Envelope {...IC} /> },
];

const RAPPORTERING: Nav[] = [
  { label: "Dashboard", icon: <Gauge {...IC} /> },
  { label: "Documents", icon: <FolderOpen {...IC} />, badge: "100" },
  { label: "Client Assets", icon: <FolderOpen {...IC} /> },
];

const CHATNET: Nav[] = [{ label: "Chat", icon: <ChatCircleDots {...IC} /> }];

const COMPANY: Nav[] = [
  { label: "Accounting Company", icon: <Buildings {...IC} />, caret: true },
  { label: "Internal Control", icon: <GridFour {...IC} /> },
  { label: "Settings", icon: <Sliders {...IC} />, caret: true },
  { label: "Terminated Clients", icon: <UserCircleMinus {...IC} /> },
];

/* Dummy engagements. Dates are internally consistent with the overdue counts. */
const TASKS = [
  { client: "Alpha Solutions AS - Avd. Oslo", action: "VAT. submitted", date: "12.06.2026", days: 74 },
  { client: "Beta Consulting AS - Avd. Bergen", action: "Invoicing done", date: "20.06.2026", days: 66 },
  { client: "Gamma Enterprises AS - Avd. Oslo", action: "A-Message sent", date: "05.07.2026", days: 51 },
  { client: "Delta Systems AS - Avd. Trondheim", action: "Invoicing done", date: "15.07.2026", days: 41 },
  { client: "Epsilon Ventures AS - Avd. Oslo", action: "VAT. submitted", date: "01.08.2026", days: 24 },
];

const CLIENTS = [
  { name: "Alpha Solutions AS", email: "contact@alphasolutions.no", manager: "Company Admin", date: "18 Aug 2026" },
  { name: "Beta Consulting AS", email: "support@betaconsulting.no", manager: "Company Admin", date: "15 Aug 2026" },
  { name: "Gamma Enterprises AS", email: "info@gammaenterprises.no", manager: "Company Admin", date: "14 Aug 2026" },
  { name: "Delta Systems AS", email: "admin@deltasystems.no", manager: "Company Admin", date: "12 Aug 2026" },
];

/* Deadline Overview: Completed 55, Pending 83, Overdue 68 (the product's own
   demo figures). Arcs run clockwise from twelve o'clock. */
const SEGMENTS = [
  { label: "Pending", value: 83, color: AMBER },
  { label: "Overdue", value: 68, color: RED },
  { label: "Completed", value: 55, color: GREEN },
];
const TOTAL = SEGMENTS.reduce((n, s) => n + s.value, 0);

const DONUT_R = 62;
const DONUT_C = 2 * Math.PI * DONUT_R;

/* Arc lengths and start offsets resolved up front, so nothing mutates during
   render. Segments run clockwise from twelve o'clock. */
const ARCS = SEGMENTS.reduce<{ label: string; color: string; len: number; offset: number }[]>(
  (acc, seg) => {
    const len = (seg.value / TOTAL) * DONUT_C;
    const offset = acc.length ? acc[acc.length - 1].offset + acc[acc.length - 1].len : 0;
    return [...acc, { label: seg.label, color: seg.color, len, offset }];
  },
  [],
);

function Donut() {
  return (
    <svg viewBox="0 0 170 170" className="h-[170px] w-[170px]" role="img" aria-label="Deadline overview">
      <g transform="rotate(-90 85 85)">
        {ARCS.map((a) => (
          <circle
            key={a.label}
            cx="85"
            cy="85"
            r={DONUT_R}
            fill="none"
            stroke={a.color}
            strokeWidth="30"
            strokeDasharray={`${a.len} ${DONUT_C - a.len}`}
            strokeDashoffset={-a.offset}
          />
        ))}
      </g>
    </svg>
  );
}

function SideItem({ item }: { item: Nav }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-[6px] px-2 py-[6px] ${
        item.active ? "bg-[#e9f7ee]" : ""
      }`}
    >
      <span
        className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] ${
          item.active ? "bg-[#1a9d52] text-white" : "text-[#6b7280]"
        }`}
      >
        {item.icon}
      </span>
      <span
        className={`flex-1 truncate text-[11.5px] ${
          item.active ? "font-semibold text-[#15803d]" : "text-[#4b5563]"
        }`}
      >
        {item.label}
      </span>
      {item.badge ? (
        <span className="rounded-full bg-[#ef4444] px-[5px] py-[1px] text-[8.5px] font-bold text-white">
          {item.badge}
        </span>
      ) : null}
      {item.caret ? <CaretRight size={10} className="shrink-0 text-[#9ca3af]" /> : null}
    </div>
  );
}

function SideGroup({ title, items }: { title: string; items: Nav[] }) {
  return (
    <div className="mt-3">
      <p className="px-2 pb-1 text-[8.5px] font-semibold uppercase tracking-[0.09em] text-[#9ca3af]">
        {title}
      </p>
      <div className="grid gap-[2px]">
        {items.map((i) => (
          <SideItem key={`${title}-${i.label}`} item={i} />
        ))}
      </div>
    </div>
  );
}

function Stat({ value, label, tone }: { value: string; label: string; tone: "red" | "plain" | "green" }) {
  const colors = { red: "#dc2626", plain: "#111827", green: "#16a34a" } as const;
  return (
    <div className="flex-1 rounded-[7px] border border-[#e9ecef] bg-white py-[9px] text-center">
      <p className="text-[17px] font-bold leading-none" style={{ color: colors[tone] }}>
        {value}
      </p>
      <p className="mt-[3px] text-[9px] text-[#6b7280]">{label}</p>
    </div>
  );
}

function Select({ label, wide }: { label: string; wide?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-[6px] border border-[#e2e5e9] bg-white px-2 py-[5px] text-[10px] text-[#374151] ${
        wide ? "min-w-[132px]" : "min-w-[64px]"
      }`}
    >
      <span>{label}</span>
      <CaretDown size={9} className="text-[#9ca3af]" />
    </div>
  );
}

export function DashboardPreview({
  className = "",
  crop,
}: {
  className?: string;
  /**
   * Visible height in design pixels. Clips the panel so it runs past the fold.
   *
   * Both callers frame the panel in a closed, bordered card, so the cut has to
   * land on a boundary the eye accepts as finished. Measured landmarks inside
   * the 782px design:
   *
   *   467  last overdue row ends
   *   480  Task Reminder card ends
   *   492  Recent Clients card begins
   *   531  its table begins   -> 560 is the bottom of the COLUMN HEADER row
   *   688  its table ends
   *   701  Recent Clients card ends
   *
   * 560 was the previous hero value, which showed the column headings and not
   * one client under them. An empty table reads as a rendering fault, not as a
   * crop. Cut at 480 or 701, never between 531 and 655.
   */
  crop?: number;
}) {
  const visible = crop ?? H;
  return (
    <div
      aria-hidden
      className={`[--s:0.56] sm:[--s:0.50] md:[--s:0.59] lg:[--s:0.81] xl:[--s:0.98] 2xl:[--s:0.98] ${className}`}
      style={{ width: `calc(${W}px * var(--s))`, height: `calc(${visible}px * var(--s))` }}
    >
      <div
        className={`overflow-hidden border border-[#e4e7eb] bg-white shadow-[0_28px_60px_-24px_rgba(9,63,39,0.28)] ${
          crop ? "rounded-t-[18px] border-b-0" : "rounded-[18px]"
        }`}
        style={{
          width: W,
          height: H,
          transform: "scale(var(--s))",
          transformOrigin: "top left",
        }}
      >
        <div className="flex h-full">
          {/* Sidebar */}
          <aside className="flex h-full w-[196px] shrink-0 flex-col border-r border-[#eceff2] bg-white px-2 py-3">
            <div className="flex items-center justify-between px-1">
              <Image
                src="/brand/noregna-wordmark.png"
                alt=""
                width={858}
                height={146}
                className="h-[15px] w-auto"
              />
              <span className="text-[#9ca3af]">
                <CaretRight size={11} />
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2 rounded-[7px] border border-[#eceff2] px-2 py-[7px]">
              <span className="flex h-[22px] w-[22px] items-center justify-center rounded-[5px] bg-[#e9f7ee] text-[9px] font-bold text-[#15803d]">
                CA
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[11px] font-semibold text-[#111827]">
                  Company Admin
                </span>
                <span className="block text-[9px] text-[#9ca3af]">Admin</span>
              </span>
            </div>

            <div className="mt-1 overflow-hidden">
              <SideGroup title="Fremdrift" items={FREMDRIFT} />
              <SideGroup title="Rapportering" items={RAPPORTERING} />
              <SideGroup title="Chatnet" items={CHATNET} />
              <SideGroup title="Accounting Company" items={COMPANY} />
            </div>
          </aside>

          {/* Main */}
          <div className="flex min-w-0 flex-1 flex-col bg-[#f7f8fa]">
            {/* Top bar */}
            <div className="flex items-center justify-between gap-3 border-b border-[#eceff2] bg-white px-4 py-[9px]">
              <div className="flex min-w-[168px] items-center gap-2 rounded-[7px] border border-[#e2e5e9] px-2 py-[5px]">
                <span className="flex h-[19px] w-[19px] items-center justify-center rounded-[5px] bg-[#1a9d52] text-white">
                  <Buildings size={11} />
                </span>
                <span className="flex-1 text-[11px] font-medium text-[#111827]">Test Company</span>
                <CaretDown size={9} className="text-[#9ca3af]" />
              </div>

              <div className="flex items-center gap-[6px]">
                <span className="flex items-center gap-[6px] rounded-[7px] bg-[#1a9d52] px-[10px] py-[6px] text-[10.5px] font-semibold text-white">
                  New Files Available
                  <span className="rounded-[4px] bg-white/25 px-[5px] py-[1px] text-[9px]">190</span>
                </span>
                <span className="flex items-center gap-[6px] rounded-[7px] bg-[#e0455f] px-[10px] py-[6px] text-[10.5px] font-semibold text-white">
                  Overdue tasks
                  <span className="rounded-[4px] bg-white/25 px-[5px] py-[1px] text-[9px]">1016</span>
                </span>
                {[
                  <GridFour key="a" size={12} />,
                  <Bell key="b" size={12} />,
                  <ChatsCircle key="c" size={12} />,
                  <ChatCircleDots key="d" size={12} />,
                  <Question key="e" size={12} />,
                ].map((ic, i) => (
                  <span
                    key={i}
                    className="flex h-[26px] w-[26px] items-center justify-center rounded-[6px] bg-[#eef7f1] text-[#15803d]"
                  >
                    {ic}
                  </span>
                ))}
                <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#1a9d52] text-[8.5px] font-bold text-white">
                  CA
                </span>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-hidden px-4 py-3">
              <p className="text-[13px] font-semibold text-[#111827]">Dashboard</p>

              <div className="mt-2 flex gap-3">
                {/* Deadline Overview */}
                <div className="flex w-[300px] shrink-0 flex-col rounded-[9px] border border-[#eceff2] bg-white p-3">
                  <p className="text-[12px] font-semibold text-[#111827]">Deadline Overview</p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <Select label="Accounting Deadline" wide />
                    <Select label="2026" />
                  </div>
                  <div className="mt-1 flex flex-1 items-center justify-center">
                    <Donut />
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    {[
                      { l: "Completed - 55", c: GREEN },
                      { l: "Pending - 83", c: AMBER },
                      { l: "Overdue - 68", c: RED },
                    ].map((x) => (
                      <span key={x.l} className="flex items-center gap-1 text-[8.5px] text-[#4b5563]">
                        <span className="h-[6px] w-[6px] rounded-full" style={{ background: x.c }} />
                        {x.l}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Task Reminder */}
                <div className="flex min-w-0 flex-1 flex-col rounded-[9px] border border-[#eceff2] bg-white p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="flex items-center gap-[5px] text-[12px] font-semibold text-[#111827]">
                        <Bell size={12} className="text-[#f5a623]" />
                        Task Reminder
                      </p>
                      <p className="mt-[2px] text-[9px] text-[#2f7fd8]">View All &gt;</p>
                    </div>
                    <Select label="All years" />
                  </div>

                  <div className="mt-2 flex gap-2">
                    <Stat value="1016" label="Overdue" tone="red" />
                    <Stat value="0" label="Due Today" tone="plain" />
                    <Stat value="0" label="Within 3 days" tone="plain" />
                    <Stat value="225" label="Upcoming" tone="green" />
                  </div>

                  <div className="mt-2 grid gap-[6px]">
                    {TASKS.map((t) => (
                      <div
                        key={t.client}
                        className="flex items-center justify-between gap-3 rounded-[6px] border border-[#eceff2] border-l-[3px] border-l-[#1a9d52] bg-white px-[9px] py-[7px]"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-[10.5px] text-[#111827]">
                            <span className="font-semibold">{t.client}</span>
                            <span className="text-[#9ca3af]"> · {t.action}</span>
                          </p>
                          <p className="mt-[2px] flex items-center gap-[4px] text-[9px] text-[#9ca3af]">
                            <CalendarBlank size={9} />
                            {t.date}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-[4px] bg-[#e0455f] px-[6px] py-[3px] text-[8.5px] font-semibold text-white">
                          {t.days} days overdue
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Clients */}
              <div className="mt-3 rounded-[9px] border border-[#eceff2] bg-white p-3">
                <p className="text-[12px] font-semibold text-[#111827]">Recent Clients</p>
                <div className="mt-2 overflow-hidden rounded-[6px] border border-[#eceff2]">
                  <div className="grid grid-cols-[1.3fr_1.6fr_1fr_0.8fr] bg-[#f4f6f8] px-3 py-[7px] text-[9.5px] font-semibold text-[#4b5563]">
                    <span>Client Name</span>
                    <span>Email</span>
                    <span>Manager</span>
                    <span>Join Date</span>
                  </div>
                  {CLIENTS.map((c, i) => (
                    <div
                      key={c.name}
                      className={`grid grid-cols-[1.3fr_1.6fr_1fr_0.8fr] px-3 py-[8px] text-[10px] text-[#374151] ${
                        i > 0 ? "border-t border-[#f1f3f5]" : ""
                      }`}
                    >
                      <span className="truncate font-medium text-[#111827]">{c.name}</span>
                      <span className="truncate">{c.email}</span>
                      <span className="truncate">{c.manager}</span>
                      <span>{c.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
