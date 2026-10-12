"use client";

// components/home/AudienceTabs.tsx
//
// "Who it's for" — three audiences in one section instead of three stacked
// ones. Every panel is rendered into the HTML and only the inactive ones are
// hidden with CSS, so all of their links (service hubs, industry pages, case
// studies) stay crawlable. The data comes from the server page as props, so
// this client component does not ship the industry files' copy.

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, Info } from "lucide-react";

export interface AudienceTab {
  id: string;
  label: string;
  title: string;
  problem: string;
  visual?: {
    src: string;
    alt: string;
    caption: string;
    badge: string;
  };
  work: string[];
  /** One sourced result, or an honest note where there is none. */
  proof: { text: string; href?: string; honest?: boolean };
  hub: { href: string; label: string };
  pages: Array<{ href: string; label: string }>;
}

export default function AudienceTabs({ tabs }: { tabs: AudienceTab[] }) {
  const [active, setActive] = useState(tabs[0]?.id);

  return (
    <div>
      <div role="tablist" aria-label="Who SearchPrex works with" className="mx-auto mb-8 flex w-fit flex-wrap justify-center gap-1 rounded-full border border-slate-200 bg-slate-100 p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setActive(t.id)}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
              active === t.id ? "bg-neutral-900 text-white shadow-2xs" : "text-slate-600 hover:text-neutral-950"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tabs.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`panel-${t.id}`}
          aria-labelledby={`tab-${t.id}`}
          className={active === t.id ? "grid gap-6 lg:grid-cols-[1.15fr_1fr]" : "hidden"}
        >
          <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9">
            <h3 className="text-2xl font-black tracking-tight text-neutral-950">{t.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{t.problem}</p>
            <ul className="mt-6 space-y-3">
              {t.work.map((w) => (
                <li key={w} className="flex items-start gap-3 text-sm leading-relaxed text-slate-700">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#effaf5]">
                    <Check className="h-3 w-3 text-[#1a7d59]" aria-hidden />
                  </span>
                  {w}
                </li>
              ))}
            </ul>
            <Link
              href={t.hub.href}
              className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-neutral-800"
            >
              {t.hub.label} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="flex flex-col gap-6">
            {t.visual ? (
              <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xs">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900">
                  <Image
                    src={t.visual.src}
                    alt={t.visual.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <span className="inline-block rounded-full bg-[#ef4444] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
                      {t.visual.badge}
                    </span>
                    <p className="mt-2 text-sm font-semibold leading-snug text-white/95 drop-shadow-sm sm:text-[15px]">
                      &ldquo;{t.visual.caption}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            <div className={`rounded-3xl p-7 ${t.proof.honest ? "border border-slate-200 bg-slate-50" : "bg-[#effaf5]"}`}>
              <p className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest ${t.proof.honest ? "text-neutral-700" : "text-[#1a7d59]"}`}>
                {t.proof.honest ? <Info className="h-3.5 w-3.5" aria-hidden /> : null}
                {t.proof.honest ? "Where the evidence stands" : "Result"}
              </p>
              <p className="mt-2 text-base font-semibold leading-snug text-neutral-950">{t.proof.text}</p>
              {t.proof.href ? (
                <Link href={t.proof.href} className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-neutral-900 hover:underline">
                  {t.proof.honest ? "See the approach" : "Read the case study"} <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              ) : null}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-600">By industry</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {t.pages.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    className="rounded-full border border-slate-200 px-3.5 py-1.5 text-sm font-semibold text-neutral-950 transition-colors hover:border-neutral-900 hover:bg-slate-50"
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
