// components/ServiceBands.tsx
//
// The building blocks of the four service pages' topical layout (Oct 2026):
// full-width bands that alternate dark navy and white, each with one heading, a
// short paragraph and a "what I check" list, instead of a page of bordered
// cards. Built first on /services/local-seo and moved here so local, law firm,
// ecommerce and technical SEO read as one product.
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

export const INK = "#0a0f2e";
export const BODY = "#5b6472";
export const PURPLE = "#534AB7";
export const LAVENDER = "#b9b3f5";
export const GREEN = "#1a7d59";
export const DARK_BG = "radial-gradient(ellipse at 50% 0%, #22208a 0%, #0a0f2e 70%)";
export const CONTAINER = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";
const RULE_DARK = "rgba(185,179,245,0.45)";
const RULE_LIGHT = "#d9d6f3";

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
  return (
    <section
      id={id}
      className={`py-16 sm:py-24 ${dark ? "text-white" : ""}`}
      style={{ background: dark ? DARK_BG : muted ? "#f4f5f8" : "#fff" }}
    >
      <div className={`${CONTAINER} ${className}`}>{children}</div>
    </section>
  );
}

export function Eyebrow({ dark, children }: { dark?: boolean; children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: dark ? LAVENDER : PURPLE }}>
      {children}
    </p>
  );
}

export function H2({ dark, center, children }: { dark?: boolean; center?: boolean; children: React.ReactNode }) {
  return (
    <h2
      className={`mt-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl ${center ? "mx-auto max-w-3xl text-center" : ""}`}
      style={{ color: dark ? "#fff" : INK }}
    >
      {children}
    </h2>
  );
}

export function Lead({ dark, center, children }: { dark?: boolean; center?: boolean; children: React.ReactNode }) {
  return (
    <p
      className={`mt-4 text-base leading-relaxed sm:text-lg ${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}
      style={{ color: dark ? "rgba(255,255,255,0.75)" : BODY }}
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

export function TextLink({ href, dark, children }: { href: string; dark?: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold hover:underline"
      style={{ color: dark ? LAVENDER : PURPLE }}
    >
      {children} <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  );
}

export function CheckList({ items, dark }: { items: React.ReactNode[]; dark?: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-3 text-sm leading-relaxed sm:text-base" style={{ color: dark ? "rgba(255,255,255,0.85)" : "#374151" }}>
          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0" style={{ color: dark ? "#6ee7b7" : GREEN }} aria-hidden />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/** Light panel holding a "What I check" list beside a band's text. */
export function CheckPanel({ title = "What I check", items }: { title?: string; items: React.ReactNode[] }) {
  return (
    <div className="rounded-2xl p-7 sm:p-8" style={{ background: "#f4f5f8" }}>
      <p className="text-sm font-black uppercase tracking-wider" style={{ color: INK }}>{title}</p>
      <div className="mt-5">
        <CheckList items={items} />
      </div>
    </div>
  );
}

/** Text-only grid item with a thin rule above it — no boxes, no borders. */
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
      <p className="flex items-center gap-2 text-lg font-black" style={{ color: dark ? "#fff" : INK }}>
        {icon}
        {title}
      </p>
      <div className="mt-2 text-sm leading-relaxed" style={{ color: dark ? "rgba(255,255,255,0.7)" : BODY }}>
        {body}
      </div>
    </>
  );
  const cls = "block border-t-2 pt-5";
  const style = { borderColor: dark ? RULE_DARK : RULE_LIGHT };
  return href ? (
    <Link href={href} className={`${cls} group`} style={style}>
      {inner}
      <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold group-hover:underline" style={{ color: dark ? LAVENDER : PURPLE }}>
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

/** Numbered steps on a dark band, with an optional button under them. */
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
          <div key={p.title} className="border-t-2 pt-5" style={{ borderColor: RULE_DARK }}>
            <p className="text-3xl font-black" style={{ color: LAVENDER }}>{String(i + 1).padStart(2, "0")}</p>
            {p.when ? (
              <p className="mt-3 text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.55)" }}>{p.when}</p>
            ) : null}
            <p className="mt-1 text-lg font-black text-white">{p.title}</p>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{p.body}</p>
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
      className="inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-sm font-bold transition hover:opacity-90"
      style={{ background: "#fff", color: INK }}
    >
      {children} <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  );
}

/* ── Hero ──────────────────────────────────────────────────────────────── */

/**
 * The site header is transparent with dark links at the top of a page, so the
 * breadcrumb sits on white under it and the dark band starts below.
 */
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
  /** A level between Services and this page, e.g. Local SEO on a trade page. */
  parent?: { label: string; href: string };
  /** Optional strip between the breadcrumb and the dark band, e.g. sub-page tabs. */
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
      <section className="mt-6 py-16 text-white sm:py-20" style={{ background: DARK_BG }}>
        <div className={CONTAINER}>
          <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr]">
            <div>
              <Eyebrow dark>{eyebrow}</Eyebrow>
              {/* A long keyword H1 steps down a size so it stays within four lines. */}
              <h1
                className={`mt-4 font-black leading-[1.08] tracking-tight ${
                  title.length + accent.length > 60 ? "text-3xl sm:text-4xl lg:text-5xl" : "text-4xl sm:text-5xl lg:text-6xl"
                }`}
                style={{ color: "#fff" }}
              >
                {title} <span style={{ color: LAVENDER }}>{accent}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.78)" }}>
                {subtitle}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href={primary.href}
                  className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-bold transition hover:opacity-90"
                  style={{ background: "#fff", color: INK }}
                >
                  {primary.label} <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                {secondary ? (
                  <Link href={secondary.href} className="text-sm font-bold hover:underline" style={{ color: LAVENDER }}>
                    {secondary.label}
                  </Link>
                ) : null}
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                {trustPoints.map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#6ee7b7]" aria-hidden /> {t}
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
    <div className="mt-10 overflow-hidden rounded-3xl border border-[#e5e7eb] bg-[#0a0f2e] shadow-sm">
      <div className="grid items-center md:grid-cols-[1.1fr_1fr]">
        <div className="relative aspect-[16/10] min-h-[260px] w-full overflow-hidden md:aspect-auto md:h-full">
          <Image src={src} alt={alt} fill priority sizes="(max-width: 768px) 100vw, 600px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f2e] via-[#0a0f2e]/20 to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0a0f2e]" />
        </div>
        <div className="p-6 text-white sm:p-8">
          <span className="mb-3 inline-block rounded-full bg-[#ef4444] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
            {tag}
          </span>
          <h3 className="text-xl font-black leading-snug tracking-tight text-white sm:text-2xl">{quote}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/75">{body}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Price and guarantee ───────────────────────────────────────────────── */

export function PriceCard({ plan, label, note }: { plan: RetainerPlan; label: string; note: string }) {
  return (
    <div className="rounded-2xl p-7" style={{ background: "#f4f5f8" }}>
      <p className="text-sm font-black uppercase tracking-wider" style={{ color: INK }}>{label}</p>
      <p className="mt-2 text-4xl font-black" style={{ color: PURPLE }}>
        {formatRange(plan)} <span className="text-base font-bold" style={{ color: BODY }}>/ month</span>
      </p>
      <p className="mt-3 text-sm leading-relaxed text-[#374151]">{plan.best}: {plan.includes.join(" · ")}</p>
      <p className="mt-3 text-xs leading-relaxed" style={{ color: BODY }}>{note}</p>
      <Link href="/pricing" className="mt-4 inline-flex items-center gap-1 text-sm font-bold hover:underline" style={{ color: PURPLE }}>
        Full pricing <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}

/** Wording confirmed by the owner — change it only with them. */
export function GuaranteeCard() {
  return (
    <div className="rounded-2xl border border-[#bfe3d3] bg-[#eefaf4] p-7">
      <p className="flex items-center gap-2 text-base font-black" style={{ color: INK }}>
        <ShieldCheck className="h-5 w-5 flex-shrink-0" style={{ color: GREEN }} aria-hidden />
        90-day money-back guarantee
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[#374151]">
        If you don&apos;t see measurable progress within 90 days, I either keep working at no extra cost until you do, or refund what you paid for those 90 days.
      </p>
    </div>
  );
}

/** White panel for ProofImages on a dark band — their captions are dark text. */
export function ProofPanel({ children }: { children: React.ReactNode }) {
  return <div className="grid min-w-0 grid-cols-1 gap-6 rounded-2xl bg-white p-5 sm:p-6 [&>*]:min-w-0">{children}</div>;
}

/** Centred FAQ band on white. */
export function FaqBand({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <BandIntro eyebrow="FAQ" title={title} />
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

/* ── Markets ───────────────────────────────────────────────────────────── */

/**
 * City pages grouped by state, on a dark band. Indexable pages only — a link to
 * a noindexed page spends a click and passes nothing. The pages under
 * /locations are law firm pages, so this belongs on law firm pages only.
 */
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
          <div key={s.slug} className="border-t-2 pt-4" style={{ borderColor: RULE_DARK }}>
            {s.hubHref ? (
              <Link href={s.hubHref} className="text-base font-black text-white hover:underline">{s.name}</Link>
            ) : (
              <p className="text-base font-black text-white">{s.name}</p>
            )}
            <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm">
              {s.cities.map((c) => (
                <Link key={c.href} href={c.href} className="hover:underline" style={{ color: LAVENDER }}>
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
