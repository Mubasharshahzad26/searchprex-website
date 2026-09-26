"use client";

// app/home-page-test/AudienceTabs.tsx
//
// "Who it's for" — three audiences in one section instead of three stacked
// ones. Every panel is rendered into the HTML and only the inactive ones are
// hidden with CSS, so all of their links (service hubs, industry pages, case
// studies) stay crawlable. The data comes from the server page as props, so
// this client component does not ship the industry files' copy.

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, Info } from "lucide-react";

export interface AudienceTab {
  id: string;
  label: string;
  title: string;
  problem: string;
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
      <div role="tablist" aria-label="Who SearchPrex works with" className="mx-auto mb-8 flex w-fit flex-wrap justify-center gap-1 rounded-full bg-[#f1f0fb] p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setActive(t.id)}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
              active === t.id ? "bg-white text-[#0a0f2e] shadow-sm" : "text-[#5b6472] hover:text-[#0a0f2e]"
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
          <div className="rounded-3xl border border-[#e7e8f0] bg-white p-7 sm:p-9">
            <h3 className="text-2xl font-black tracking-tight text-[#0a0f2e]">{t.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-[#5b6472]">{t.problem}</p>
            <ul className="mt-6 space-y-3">
              {t.work.map((w) => (
                <li key={w} className="flex items-start gap-3 text-sm leading-relaxed text-[#374151]">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#effaf5]">
                    <Check className="h-3 w-3 text-[#1a7d59]" aria-hidden />
                  </span>
                  {w}
                </li>
              ))}
            </ul>
            <Link
              href={t.hub.href}
              className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-[#0a0f2e] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#534AB7]"
            >
              {t.hub.label} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="flex flex-col gap-6">
            <div className={`rounded-3xl p-7 ${t.proof.honest ? "border border-[#d9d5f5] bg-[#f6f5ff]" : "bg-[#effaf5]"}`}>
              <p className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest ${t.proof.honest ? "text-[#534AB7]" : "text-[#1a7d59]"}`}>
                {t.proof.honest ? <Info className="h-3.5 w-3.5" aria-hidden /> : null}
                {t.proof.honest ? "Where the evidence stands" : "Result"}
              </p>
              <p className="mt-2 text-base font-semibold leading-snug text-[#0a0f2e]">{t.proof.text}</p>
              {t.proof.href ? (
                <Link href={t.proof.href} className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#534AB7]">
                  {t.proof.honest ? "See the approach" : "Read the case study"} <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              ) : null}
            </div>

            <div className="rounded-3xl border border-[#e7e8f0] bg-white p-7">
              <p className="text-xs font-bold uppercase tracking-widest text-[#5b6472]">By industry</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {t.pages.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    className="rounded-full border border-[#e7e8f0] px-3.5 py-1.5 text-sm font-semibold text-[#0a0f2e] transition-colors hover:border-[#534AB7] hover:text-[#534AB7]"
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
