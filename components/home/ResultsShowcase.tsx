"use client";

// components/home/ResultsShowcase.tsx
// The homepage results: one card per client in the same four lines — who,
// the problem, what was done, the result — with the screenshot that proves
// it. Tabs let a buyer jump to their own kind of business. There is no law
// firm result yet, so that tab says so instead of borrowing one.

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import ProofImage from "@/components/ProofImage";
import type { ProofShot } from "@/components/ServiceProofStrip";

export type ResultCard = {
  tab: "local" | "store" | "international";
  tag: string;
  client: string;
  problem: string;
  did: string;
  figure: string;
  figureLabel: string;
  shot: ProofShot;
  href: string;
};

const TABS = [
  { id: "all", label: "All" },
  { id: "local", label: "Local businesses" },
  { id: "store", label: "Online stores" },
  { id: "international", label: "International" },
  { id: "law", label: "Law firms" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function ResultsShowcase({ cards }: { cards: ResultCard[] }) {
  const [tab, setTab] = useState<TabId>("all");
  const shown = tab === "all" ? cards : cards.filter((c) => c.tab === tab);

  return (
    <div>
      <div role="tablist" aria-label="Filter results by business type" className="mb-8 flex flex-wrap justify-center gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
              tab === t.id
                ? "border-neutral-950 bg-neutral-950 text-white"
                : "border-slate-300 bg-white text-neutral-800 hover:border-neutral-900"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "law" ? (
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center">
          <h3 className="text-xl font-black text-neutral-950">No law firm result published yet</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            I won&apos;t borrow someone else&apos;s numbers. The first firm I work with in your city gets the founder on
            every page and city exclusivity while we build that case study together. Test me first with the free audit.
          </p>
          <Link
            href="/services/law-firm-seo"
            className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-neutral-900 hover:underline"
          >
            How law firm SEO works here <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {shown.map((c) => (
            <article key={c.client} className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-800">{c.tag}</p>
                <h3 className="mt-1 text-lg font-black text-neutral-950">{c.client}</h3>
                <p className="mt-4 text-4xl font-black tabular-nums tracking-tight text-neutral-950">{c.figure}</p>
                <p className="mt-1 text-sm font-semibold text-slate-600">{c.figureLabel}</p>
                <dl className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-sm">
                  <div className="flex gap-2">
                    <dt className="w-24 shrink-0 font-bold text-slate-500">Problem</dt>
                    <dd className="text-slate-700">{c.problem}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-24 shrink-0 font-bold text-slate-500">What I did</dt>
                    <dd className="text-slate-700">{c.did}</dd>
                  </div>
                </dl>
              </div>
              <div className="border-t border-slate-100 bg-slate-50 p-4">
                <ProofImage {...c.shot} frameAspect="16 / 9" sizes="(max-width: 768px) 100vw, 540px" />
                <Link href={c.href} className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-neutral-900 hover:underline">
                  Read the {c.client} case study <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
