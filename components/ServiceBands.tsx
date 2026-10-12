// components/ServiceBands.tsx
//
// The building blocks of the four service pages' topical layout:
// full-width bands that alternate crisp white and light grey (#f8fafc), with
// solid black headings (#0a0a0a) and dark charcoal (#171717) buttons/accents.
//
// Every piece is presentational. The pages own their copy and their figures,
// and every figure must be readable in a screenshot the page shows or links to.

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, ShieldCheck } from "lucide-react";

import { Breadcrumb } from "@/components/layout";
import { formatRange, type RetainerPlan } from "@/lib/pricing";
import { LOCATION_STATES } from "@/lib/locations";
import { isLocationIndexable } from "@/lib/location-indexing";

export const INK = "#0a0a0a";
export const BODY = "#475569";
export const PURPLE = "#171717";
export const LAVENDER = "#525252";
export const GREEN = "#171717";
export const DARK_BG = "#f8fafc";
export const CONTAINER = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";
const RULE_DARK = "#cbd5e1";
const RULE_LIGHT = "#e2e8f0";

/* ── Bands and type ────────────────────────────────────────────────────── */

export function Band({
  dark = false,
  muted = false,
  id,
  children,
  className = "",
}: {
  dark?: boolean;
  muted?: boolean;
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const isGrey = dark || muted;
  return (
    <section
      id={id}
      className={`py-16 sm:py-24 font-sans ${isGrey ? "bg-slate-50 border-y border-slate-200 text-neutral-950" : "bg-white text-neutral-950"}`}
    >
      <div className={`${CONTAINER} ${className}`}>{children}</div>
    </section>
  );
}

export function Eyebrow({ dark: _dark, children }: { dark?: boolean; children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-900">
      {children}
    </p>
  );
}

export function H2({ dark: _dark, center, children }: { dark?: boolean; center?: boolean; children: React.ReactNode }) {
  return (
    <h2
      className={`mt-3 text-3xl font-black leading-tight tracking-tight text-neutral-950 sm:text-4xl ${center ? "mx-auto max-w-3xl text-center" : ""}`}
    >
      {children}
    </h2>
  );
}

export function Lead({ dark: _dark, center, children }: { dark?: boolean; center?: boolean; children: React.ReactNode }) {
  return (
    <p
      className={`mt-4 text-base leading-relaxed text-slate-600 sm:text-lg ${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}
    >
      {children}
    </p>
  );
}

/** Eyebrow + heading + optional lead, centred — the opener most bands use. */
export function BandIntro({
  dark,
  center = true,
  eyebrow,
  title,
  lead,
}: {
  dark?: boolean;
  center?: boolean;
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
}) {
  return (
    <div className={center ? "text-center" : undefined}>
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <H2 dark={dark} center={center}>{title}</H2>
      {lead ? <Lead dark={dark} center={center}>{lead}</Lead> : null}
    </div>
  );
}

export function TextLink({ href, dark: _dark, children }: { href: string; dark?: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-neutral-950 hover:text-neutral-700 hover:underline"
    >
      {children} <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  );
}

export function CheckList({ items, dark: _dark }: { items: React.ReactNode[]; dark?: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700 sm:text-base">
          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-neutral-900" aria-hidden />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/** Light panel holding a "What I check" list beside a band's text. */
export function CheckPanel({ title = "What I check", items }: { title?: string; items: React.ReactNode[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 sm:p-8">
      <p className="text-sm font-black uppercase tracking-wider text-neutral-950">{title}</p>
      <div className="mt-5">
        <CheckList items={items} />
      </div>
    </div>
  );
}

/** Text-only grid item with a thin rule above it. */
export function RuleItem({
  title,
  body,
  dark,
  href,
  icon,
}: {
  title: React.ReactNode;
  body: React.ReactNode;
  dark?: boolean;
  href?: string;
  icon?: React.ReactNode;
}) {
  const inner = (
    <>
      <p className="flex items-center gap-2 text-lg font-black text-neutral-950">
        {icon}
        {title}
      </p>
      <div className="mt-2 text-sm leading-relaxed text-slate-600">
        {body}
      </div>
    </>
  );
  const cls = "block border-t-2 pt-5";
  const style = { borderColor: dark ? RULE_DARK : RULE_LIGHT };
  return href ? (
    <Link href={href} className={`${cls} group`} style={style}>
      {inner}
      <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-neutral-950 group-hover:underline">
        More <ArrowRight className="h-3 w-3" aria-hidden />
      </span>
    </Link>
  ) : (
    <div className={cls} style={style}>
      {inner}
    </div>
  );
}

export function RuleGrid({ columns = 3, children }: { columns?: 2 | 3 | 4; children: React.ReactNode }) {
  const cols = { 2: "md:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  return <div className={`mt-12 grid gap-x-10 gap-y-10 ${cols}`}>{children}</div>;
}

/** Numbered steps on a light-grey band, with an optional button under them. */
export function Steps({
  steps,
  cta,
}: {
  steps: Array<{ when?: string; title: string; body: string }>;
  cta?: { href: string; label: string };
}) {
  return (
    <>
      <div className={`mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 ${steps.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
        {steps.map((p, i) => (
          <div key={p.title} className="border-t-2 border-slate-300 pt-5">
            <p className="text-3xl font-black text-neutral-900">{String(i + 1).padStart(2, "0")}</p>
            {p.when ? (
              <p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-500">{p.when}</p>
            ) : null}
            <p className="mt-1 text-lg font-black text-neutral-950">{p.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.body}</p>
          </div>
        ))}
      </div>
      {cta ? (
        <div className="mt-14 text-center">
          <WhiteButton href={cta.href}>{cta.label}</WhiteButton>
        </div>
      ) : null}
    </>
  );
}

export function WhiteButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-neutral-800"
    >
      {children} <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  );
}

/* ── Hero ──────────────────────────────────────────────────────────────── */

export function ServiceHero({
  crumb,
  parent,
  above,
  eyebrow,
  title,
  accent,
  subtitle,
  primary,
  secondary,
  trustPoints,
  aside,
}: {
  crumb: string;
  parent?: { label: string; href: string };
  above?: React.ReactNode;
  eyebrow: string;
  title: string;
  accent: string;
  subtitle: React.ReactNode;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  trustPoints: string[];
  aside: React.ReactNode;
}) {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          ...(parent ? [parent] : []),
          { label: crumb },
        ]}
      />
      {above}
      <section className="mt-4 py-14 sm:py-20 bg-slate-50 border-y border-slate-200 text-neutral-950 font-sans">
        <div className={CONTAINER}>
          <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr]">
            <div>
              <span className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-[0.16em] text-neutral-900">
                {eyebrow}
              </span>
              <h1
                className={`mt-4 font-black leading-[1.08] tracking-tight text-neutral-950 ${
                  title.length + accent.length > 60 ? "text-3xl sm:text-4xl lg:text-5xl" : "text-4xl sm:text-5xl lg:text-6xl"
                }`}
              >
                {title} <span className="text-neutral-700">{accent}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                {subtitle}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href={primary.href}
                  className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-neutral-800"
                >
                  {primary.label} <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                {secondary ? (
                  <Link href={secondary.href} className="text-sm font-bold text-neutral-900 hover:underline">
                    {secondary.label}
                  </Link>
                ) : null}
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-700 font-medium">
                {trustPoints.map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-neutral-900" aria-hidden /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:pl-4">{aside}</div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Problem banner (the owner's AI images) ─────────────────────────────── */

export function RealityBanner({
  src,
  alt,
  tag,
  quote,
  body,
}: {
  src: string;
  alt: string;
  tag: string;
  quote: string;
  body: string;
}) {
  return (
    <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-2xs">
      <div className="grid items-center md:grid-cols-[1.1fr_1fr]">
        <div className="relative aspect-[16/10] min-h-[260px] w-full overflow-hidden md:aspect-auto md:h-full">
          <Image src={src} alt={alt} fill priority sizes="(max-width: 768px) 100vw, 600px" className="object-cover" />
        </div>
        <div className="p-6 text-neutral-950 sm:p-8">
          <span className="mb-3 inline-block rounded-full bg-neutral-900 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-2xs">
            {tag}
          </span>
          <h3 className="text-xl font-black leading-snug tracking-tight text-neutral-950 sm:text-2xl">{quote}</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{body}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Price and guarantee ───────────────────────────────────────────────── */

export function PriceCard({ plan, label, note }: { plan: RetainerPlan; label: string; note: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7">
      <p className="text-sm font-black uppercase tracking-wider text-neutral-950">{label}</p>
      <p className="mt-2 text-4xl font-black text-neutral-950">
        {formatRange(plan)} <span className="text-base font-bold text-slate-600">/ month</span>
      </p>
      <p className="mt-3 text-sm leading-relaxed text-slate-700">{plan.best}: {plan.includes.join(" · ")}</p>
      <p className="mt-3 text-xs leading-relaxed text-slate-600">{note}</p>
      <Link href="/pricing" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-neutral-950 hover:underline">
        Full pricing <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}

/** Wording confirmed by the owner — change it only with them. */
export function GuaranteeCard() {
  return (
    <div className="rounded-2xl border border-slate-300 bg-slate-50 p-7">
      <p className="flex items-center gap-2 text-base font-black text-neutral-950">
        <ShieldCheck className="h-5 w-5 flex-shrink-0 text-neutral-900" aria-hidden />
        90-day money-back guarantee
      </p>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">
        If you don&apos;t see measurable progress within 90 days, I either keep working at no extra cost until you do, or refund what you paid for those 90 days.
      </p>
    </div>
  );
}

/** White panel for ProofImages on a light-grey band. */
export function ProofPanel({ children }: { children: React.ReactNode }) {
  return <div className="grid min-w-0 grid-cols-1 gap-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 [&>*]:min-w-0">{children}</div>;
}

/** Centred FAQ band on white. */
export function FaqBand({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white py-16 sm:py-24 font-sans">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <BandIntro eyebrow="FAQ" title={title} />
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

/* ── Markets ───────────────────────────────────────────────────────────── */

export function MarketsBand({ eyebrow = "Markets", title, lead }: { eyebrow?: string; title: string; lead: string }) {
  const markets = LOCATION_STATES.map((s) => ({
    ...s,
    cities: s.cities.filter((c) => isLocationIndexable(c.href)),
  })).filter((s) => s.cities.length);
  if (!markets.length) return null;

  return (
    <Band dark>
      <BandIntro dark eyebrow={eyebrow} title={title} lead={lead} />
      <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {markets.map((s) => (
          <div key={s.slug} className="border-t-2 border-slate-300 pt-4">
            {s.hubHref ? (
              <Link href={s.hubHref} className="text-base font-black text-neutral-950 hover:underline">{s.name}</Link>
            ) : (
              <p className="text-base font-black text-neutral-950">{s.name}</p>
            )}
            <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm">
              {s.cities.map((c) => (
                <Link key={c.href} href={c.href} className="text-slate-600 hover:text-neutral-950 hover:underline font-medium">
                  {c.name}
                </Link>
              ))}
            </p>
          </div>
        ))}
      </div>
    </Band>
  );
}
