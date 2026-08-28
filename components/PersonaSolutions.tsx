"use client";

// components/PersonaSolutions.tsx
//
// The four services, presented the way an SEO tool presents data rather than
// the way an agency presents a pitch.
//
// WHAT THIS REPLACES. Four separate <PersonaProblemHeader> blocks, each
// pt-24/pb-12, each followed by its proof section — roughly 1,300px of centred
// interstitial before a visitor reached anything. The pattern was right
// (problem -> proof) but it was spent on scroll rather than on comparison: you
// could not see the four problems next to each other, and nothing connected a
// problem to the evidence that answered it beyond page order.
//
// This is one panel with a tab rail. Same four problems, same four proofs, now
// switchable in place and explicitly linked to the section that evidences them.
//
// DESIGN REFERENCE. The Semrush app shell and the NicheSEO Pro dashboard supply
// the LAYOUT: a light ground, white cards with hairline borders, and metric
// strips built from a small uppercase tracked label above a large figure,
// divided by thin vertical rules. It frames each claim as a reading off an
// instrument rather than a marketing assertion.
//
// The TYPE, however, is SearchPrex's existing scale — h2 at
// text-3xl/4xl/5xl font-black tracking-tight (48px/900), eyebrows at text-xs
// font-bold uppercase tracking-widest, body at text-lg. Semrush sets headings
// at weight 600; using that here made this section look like it had been
// pasted in from another site.
//
// NUMBERS DO NOT ANIMATE. components/ProofStrip.tsx sets the rule and explains
// it: a figure that counts up reads as decoration, and a fast scroller sees a
// half-finished number. The panel transitions; the evidence sits still.
//
// EVERY FIGURE HERE ALREADY EXISTS ON THIS PAGE. Nothing is introduced that is
// not evidenced further down, and each tab links to the section that shows the
// underlying capture. The law-firm tab has no figures because there is no
// law-firm client yet — see components/LawFirmProof.tsx.

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Store, MapPin, Scale, AlertTriangle, ArrowDown } from "lucide-react";

type Metric = { label: string; value: string; detail: string };

type Solution = {
  id: string;
  tab: string;
  icon: typeof Store;
  accent: string;
  client: string;
  problem: string;
  fix: string;
  metrics: Metric[];
  /** Shown instead of metrics when there is no client evidence yet. */
  absence?: string;
  proofHref: string;
  proofLabel: string;
};

const solutions: Solution[] = [
  {
    id: "ecommerce",
    tab: "Ecommerce SEO",
    icon: Store,
    accent: "#1a7d59",
    client: "SMK Store · WooCommerce",
    problem: "Your catalog dropped out of Google and PPC is covering the gap.",
    fix:
      "When a large catalog falls out of the index, paid traffic buys back your own products at a margin you never agreed to. I clear the faceted-navigation traps, rebuild canonical architecture, and force re-indexing on the URLs that actually carry revenue.",
    metrics: [
      { label: "Monthly store revenue", value: "+227%", detail: "$5,832.02 → $19,100.71" },
      { label: "Measured over", value: "2 mo", detail: "April → June 2026" },
      { label: "Evidence", value: "2", detail: "WooCommerce dashboard captures" },
    ],
    proofHref: "#revenue-proof",
    proofLabel: "See both dashboard captures",
  },
  {
    id: "technical",
    tab: "Technical SEO",
    icon: AlertTriangle,
    accent: "#a16207",
    client: "Michigan Outdoor Sports · 35,000 URLs",
    problem: "Your site is indexed one week and gone the next.",
    fix:
      "Mass de-indexing is a crawl-budget and architecture failure, not a content one. I publish the entire recovery curve for this account — including the months it went backwards — because a recovery you can only see the good half of is not evidence.",
    metrics: [
      { label: "Pages indexed", value: "+285%", detail: "≈3,000 → 11,549" },
      { label: "US organic clicks", value: "+83%", detail: "84 → 154, like-for-like" },
      { label: "US click-through rate", value: "3.5→5.2%", detail: "Same queries, same filter" },
    ],
    proofHref: "#recovery",
    proofLabel: "See the full recovery curve",
  },
  {
    id: "local",
    tab: "Local SEO",
    icon: MapPin,
    accent: "#5b52c4",
    client: "HVAC Services Team · D.O.L.L.S. · Mammoth Roofs",
    problem: "Directories outrank you for the work you actually do.",
    fix:
      "If Yelp and Angi sit above you, Google does not yet understand your business as the local entity that answers the query. I rebuild the profile, the citations and the service-area pages so the answer names you — including inside AI Overviews.",
    metrics: [
      { label: "AI Overviews citing client", value: "2", detail: "Named, two different states" },
      { label: "States with page-one results", value: "3", detail: "Michigan · California · Texas" },
      { label: "Top spots, one query", value: "#1 & #2", detail: "Both organic positions held" },
    ],
    proofHref: "#local-seo-proof",
    proofLabel: "See the SERP captures",
  },
  {
    id: "law-firm",
    tab: "Law Firm SEO",
    icon: Scale,
    accent: "#185FA5",
    client: "No published client yet",
    problem: "You are renting every lead at $150 a click.",
    fix:
      "Ranking organically for 'Family Law Attorney' or 'Personal Injury Lawyer' is the only way to own that traffic rather than rent it. But I have not run a law firm I can publish yet, so I am not going to show you a number from another industry and let this layout imply it was an attorney.",
    metrics: [],
    absence:
      "Every other tab here is backed by a screenshot further down this page. This one is not, because the client does not exist yet. Start with the free 30-day AI Intake Assistant instead and make me earn the retainer.",
    proofHref: "#law-firm-proof",
    proofLabel: "See what I can evidence, and the free trial",
  },
];

export default function PersonaSolutions() {
  const [active, setActive] = useState(0);
  const current = solutions[active];
  const Icon = current.icon;
  return (
    <section
      id="solutions"
      className="border-y border-[#e6e8f0] bg-[#f8f9fc] py-20 sm:py-24"
      aria-labelledby="solutions-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ── Section header, Semrush "SOLUTIONS ( n )" treatment ── */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-[#566070]">
            Solutions ( {solutions.length} )
          </p>
          <h2
            id="solutions-heading"
            className="mt-3 max-w-3xl text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl lg:text-5xl"
          >
            Four ways US businesses lose search revenue — and the proof I fixed each one.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#566070]">
            Pick the one that sounds like your month. Every figure below is evidenced further
            down this page, with the original capture.
          </p>
        </div>

        <div className="space-y-4">
          {/* ── Tab rail ── */}
          <div
            role="tablist"
            aria-label="SearchPrex services"
            className="flex gap-2 overflow-x-auto pb-1"
          >
            {solutions.map((s, i) => {
              const TabIcon = s.icon;
              const isActive = i === active;
              return (
                <button
                  key={s.id}
                  role="tab"
                  id={`solution-tab-${s.id}`}
                  aria-selected={isActive}
                  aria-controls={`solution-panel-${s.id}`}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                      e.preventDefault();
                      setActive((active + 1) % solutions.length);
                    }
                    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                      e.preventDefault();
                      setActive((active - 1 + solutions.length) % solutions.length);
                    }
                  }}
                  className={`relative flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#534AB7] focus-visible:ring-offset-2 ${
                    isActive
                      ? "border-transparent bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                      : "border-[#e6e8f0] bg-transparent hover:bg-white/60"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="solution-active-bar"
                      className="absolute bottom-0 left-3 right-3 h-[3px] rounded-full"
                      style={{ background: s.accent }}
                    />
                  )}
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: `${s.accent}14` }}
                  >
                    <TabIcon className="h-[18px] w-[18px]" style={{ color: s.accent }} />
                  </span>
                  <span
                    className={`whitespace-nowrap text-base tracking-[-0.01em] ${
                      isActive ? "font-semibold text-[#0a0f2e]" : "font-medium text-[#566070]"
                    }`}
                  >
                    {s.tab}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Active panel ── */}
          <div className="overflow-hidden rounded-xl border border-[#e6e8f0] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
            {/* Deliberately NOT AnimatePresence mode="wait". That variant keeps
                the outgoing panel mounted until its exit animation finishes, so
                if animation frames stall — a backgrounded tab, a throttled
                device — the panel freezes on the previous service's content
                while the tab rail says otherwise. Keying a plain motion.div
                remounts immediately and animates in; the content is always
                correct even if the animation never runs. */}
            <div>
              <motion.div
                key={current.id}
                role="tabpanel"
                id={`solution-panel-${current.id}`}
                aria-labelledby={`solution-tab-${current.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <div>
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4" style={{ color: current.accent }} />
                      <span
                        className="text-xs font-bold uppercase tracking-widest"
                        style={{ color: current.accent }}
                      >
                        {current.client}
                      </span>
                    </div>
                    <h3 className="mt-3 text-2xl font-black tracking-tight text-[#0a0f2e] sm:text-3xl">
                      {current.problem}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-[#566070]">
                      {current.fix}
                    </p>

                    {/* Metric strip — NicheSEO Pro treatment */}
                    {current.metrics.length > 0 ? (
                      <div className="mt-7 grid grid-cols-3 divide-x divide-[#eef0f6] border-t border-[#eef0f6] pt-6">
                        {current.metrics.map((m) => (
                          <div key={m.label} className="px-3 first:pl-0 last:pr-0">
                            <p className="text-xs font-bold uppercase tracking-widest text-[#5f6a78]">
                              {m.label}
                            </p>
                            <p className="mt-2 text-3xl font-black tracking-tight text-[#0a0f2e]">
                              {m.value}
                            </p>
                            <p className="mt-1.5 text-xs text-[#566070]">
                              {m.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div
                        className="mt-7 rounded-xl border p-5"
                        style={{ borderColor: `${current.accent}30`, background: `${current.accent}0a` }}
                      >
                        <p
                          className="text-xs font-bold uppercase tracking-widest"
                          style={{ color: current.accent }}
                        >
                          No data to show — deliberately
                        </p>
                        <p className="mt-2.5 text-sm leading-relaxed text-[#0a0f2e]">
                          {current.absence}
                        </p>
                      </div>
                    )}

                    <Link
                      href={current.proofHref}
                      className="group mt-7 inline-flex items-center gap-2 text-sm font-bold"
                      style={{ color: current.accent }}
                    >
                      {current.proofLabel}
                      <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                    </Link>
                  </div>

                </div>

              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
