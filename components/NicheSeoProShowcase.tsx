"use client";

// components/NicheSeoProShowcase.tsx
//
// NicheSEO Pro on the SearchPrex home page: the software behind the proof.
//
// WHY IT SITS HERE. The recovery sections above show what happened to Michigan
// Outdoor Sports. This is the tool that did it — the same client is NicheSEO
// Pro's own first case study. Placing it directly after the evidence turns the
// product from an unrelated upsell into the answer to the question the proof
// raises: "how did one person ship that much work?"
//
// COPY IS THE PRODUCT'S OWN. Every claim here is taken from the NicheSEO Pro
// codebase (../nicheseo-pro-ai: index.html meta, src/pages/Home.tsx feature
// copy) rather than written fresh for this page, so the two properties cannot
// drift into describing the same software differently.
//
// The comparison row is the product's actual positioning: audit tools report,
// this one publishes. It is the one claim that distinguishes it from the three
// tools a buyer is already paying for, so it leads.
//
// Brand colour #7952ff is NicheSEO Pro's own (its theme-color, and the
// dominant value in its stylesheet). It is deliberately NOT the SearchPrex
// purple — this is a different product, and it should read as one.

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, X, Zap, FileText, BarChart2 } from "lucide-react";

const BRAND = "#7952ff";

// Straight from the product's own comparison table. The first three are the
// things every audit tool does; the last four are the ones none of them do.
const capabilities = [
  { label: "Audits your site", auditTools: true },
  { label: "Shows Google Search Console data", auditTools: true },
  { label: "Generates an AI roadmap", auditTools: true },
  { label: "Rewrites thin content", auditTools: false },
  { label: "Publishes the fix to your store", auditTools: false },
  { label: "Submits the URLs to Google", auditTools: false },
  { label: "Verifies the page actually went live", auditTools: false },
];

const stats = [
  { value: "6,453", label: "Pages published", detail: "On the first client" },
  { value: "500/day", label: "Product pages written", detail: "Real copy, not AI slop" },
  { value: "1,000/day", label: "URLs pushed to Google", detail: "Submission engine" },
  { value: "<10 min", label: "Full site scan", detail: "Connected to your GSC" },
];

/* ─── Hero right-side mockup (From NicheSEO Pro Home) ─── */
function HeroMockup() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % 6);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const activeTab = Math.floor(step / 2); // 0, 0, 1, 1, 2, 2
  const nextTab = Math.floor((step + 1) / 2) % 3; // 0, 1, 1, 2, 2, 0

  const TABS = [
    { id: 0, label: "SEO Autopilot", icon: Zap },
    { id: 1, label: "Content Engine", icon: FileText },
    { id: 2, label: "Indexing Tracker", icon: BarChart2 },
  ];

  const getCursorPos = (tab: number) => {
    switch (tab) {
      case 0:
        return { top: "22%", left: "12%" };
      case 1:
        return { top: "35%", left: "12%" };
      case 2:
        return { top: "48%", left: "12%" };
      default:
        return { top: "22%", left: "12%" };
    }
  };

  return (
    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[340px] sm:min-h-[420px] bg-white rounded-lg overflow-hidden flex font-sans shadow-sm border border-gray-200/80">
      {/* Sidebar */}
      <div className="w-[32%] sm:w-[28%] bg-[#f9f9fb] border-r border-gray-200 flex flex-col p-3 sm:p-5 z-20">
        <div className="font-black text-base sm:text-xl tracking-tighter mb-4 sm:mb-8 text-black">
          NicheSEO
        </div>
        <div className="flex flex-col gap-1.5 sm:gap-2 relative">
          {TABS.map((tab, i) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStep(i * 2)}
              className={`flex items-center gap-2 sm:gap-2.5 p-2 sm:p-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors z-10 text-left ${
                activeTab === i
                  ? "bg-white shadow-sm border border-gray-100 text-[#7952ff]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <tab.icon
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${
                  activeTab === i ? "text-[#7952ff]" : "text-gray-400"
                }`}
              />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden text-[10px] leading-tight truncate">
                {tab.label.split(" ")[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#fcfcfd] p-3 sm:p-6 lg:p-8 relative overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex flex-col"
          >
            <div className="text-base sm:text-2xl font-bold text-black mb-3 sm:mb-6">
              {TABS[activeTab].label}
            </div>

            {activeTab === 0 && (
              <div className="grid grid-cols-2 gap-2 sm:gap-4 flex-1">
                <div className="bg-white p-3 sm:p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
                  <div className="text-[10px] sm:text-[11px] text-gray-500 font-semibold mb-1 sm:mb-2 uppercase tracking-wide">
                    Pages Published
                  </div>
                  <div className="text-xl sm:text-4xl font-bold text-black">
                    7,826
                  </div>
                </div>
                <div className="bg-white p-3 sm:p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center">
                  <div className="text-[10px] sm:text-[11px] text-gray-500 font-semibold mb-1 sm:mb-2 uppercase tracking-wide">
                    Success Rate
                  </div>
                  <div className="text-xl sm:text-4xl font-bold text-emerald-500">
                    92%
                  </div>
                </div>
                <div className="col-span-2 bg-white p-3 sm:p-5 rounded-xl border border-gray-100 shadow-sm h-[100px] sm:h-[140px] flex flex-col justify-end gap-1">
                  <div className="flex items-end gap-1 sm:gap-1.5 h-full w-full">
                    {[30, 50, 40, 70, 60, 90, 85, 100].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-emerald-400 rounded-t-sm"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 1 && (
              <div className="grid grid-cols-1 gap-2.5 sm:gap-4 flex-1">
                <div className="bg-white p-3 sm:p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-black mb-0.5 sm:mb-1">
                      AI Article Generation
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-gray-500">
                      High-intent keyword clusters
                    </div>
                  </div>
                  <div className="px-2 sm:px-3 py-0.5 sm:py-1 bg-emerald-100 text-emerald-700 text-[9px] sm:text-[10px] uppercase font-bold rounded-full">
                    Active
                  </div>
                </div>
                <div className="bg-white p-3 sm:p-5 rounded-xl border border-gray-100 shadow-sm flex-1 flex flex-col justify-center">
                  <div className="text-[10px] sm:text-[11px] text-gray-500 font-semibold mb-2 sm:mb-4 uppercase tracking-wide">
                    Recent Content
                  </div>
                  <div className="space-y-2 sm:space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-2.5 sm:gap-4 items-center">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gray-100 flex-shrink-0" />
                        <div className="flex-1 space-y-1 sm:space-y-2">
                          <div className="h-1.5 sm:h-2 bg-gray-200 rounded w-3/4" />
                          <div className="h-1.5 sm:h-2 bg-gray-100 rounded w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div className="grid grid-cols-2 gap-2 sm:gap-4 flex-1">
                <div className="col-span-2 bg-white p-3 sm:p-6 rounded-xl border border-gray-100 shadow-sm flex gap-6 sm:gap-12">
                  <div>
                    <div className="text-[10px] sm:text-[11px] text-gray-500 font-semibold mb-1 sm:mb-2 uppercase tracking-wide">
                      Indexed URLs
                    </div>
                    <div className="text-xl sm:text-4xl font-bold text-black">
                      3,492
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-[11px] text-gray-500 font-semibold mb-1 sm:mb-2 uppercase tracking-wide">
                      Pending
                    </div>
                    <div className="text-xl sm:text-4xl font-bold text-amber-500">
                      128
                    </div>
                  </div>
                </div>
                <div className="col-span-2 bg-white p-0 rounded-xl border border-gray-100 shadow-sm h-[90px] sm:h-[130px] overflow-hidden relative">
                  <svg
                    className="absolute bottom-0 w-full h-[120%]"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,80 L20,70 L40,85 L60,40 L80,50 L100,20 L100,100 L0,100 Z"
                      fill="#e8f0fe"
                    />
                    <path
                      d="M0,80 L20,70 L40,85 L60,40 L80,50 L100,20"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Animated Cursor */}
      <motion.div
        className="hidden sm:block absolute z-50 drop-shadow-lg pointer-events-none origin-top-left"
        animate={{
          ...getCursorPos(nextTab),
          scale: step % 2 === 0 ? [1, 0.85, 1] : 1,
        }}
        transition={{
          top: { duration: 0.7, ease: "backInOut" },
          left: { duration: 0.7, ease: "backInOut" },
          scale: { duration: 0.3 },
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.1037 25.1092L6.1511 4.50974L24.8197 15.6599L15.932 17.518L10.1037 25.1092Z"
            fill="white"
            stroke="black"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}

export default function NicheSeoProShowcase() {
  return (
    <section
      id="nicheseo-pro"
      className="border-y border-[#e6e8f0] bg-white py-20 sm:py-24"
      aria-labelledby="nicheseo-pro-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="max-w-3xl">
          <p
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: BRAND }}
          >
            The software behind the proof
          </p>
          <h2
            id="nicheseo-pro-heading"
            className="mt-3 text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl lg:text-5xl"
          >
            Semrush, Ahrefs and Moz report your problems. NicheSEO Pro publishes the fix.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#566070]">
            I built it because auditing was never the bottleneck — shipping was. It writes the
            fix, pushes it to your store, submits the URL to Google, and then checks the page
            actually went live. The Michigan Outdoor Sports recovery above is its first case
            study.
          </p>
        </div>

        {/* ── The dashboard, running ── */}
        <div className="mt-10 overflow-hidden rounded-xl border border-[#e6e8f0] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
          <div
            className="border-b border-[#eef0f6] bg-[#f2f4f9] p-2.5 sm:p-4 md:p-6"
            style={{ boxShadow: "inset 0 4px 15px rgba(0,0,0,0.05)" }}
          >
            <HeroMockup />
          </div>

          {/* ── Stat strip ── */}
          <div className="grid divide-y divide-[#eef0f6] sm:grid-cols-2 sm:divide-x lg:grid-cols-4 lg:divide-y-0">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`p-5 sm:p-6 ${i === 2 ? "sm:border-t sm:border-[#eef0f6] lg:border-t-0" : ""} ${
                  i === 3 ? "sm:border-t sm:border-[#eef0f6] lg:border-t-0" : ""
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-[#5f6a78]">
                  {s.label}
                </p>
                <p className="mt-2 text-3xl font-black tracking-tight text-[#0a0f2e]">
                  {s.value}
                </p>
                <p className="mt-1.5 text-xs text-[#566070]">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Report vs fix ── */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          <div className="overflow-hidden rounded-xl border border-[#e6e8f0]">
            <div className="grid grid-cols-[1fr_110px_110px] items-center gap-2 border-b border-[#eef0f6] bg-[#fafbfd] px-5 py-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#5f6a78]">
                Capability
              </span>
              <span className="text-center text-xs font-bold uppercase tracking-widest text-[#5f6a78]">
                Audit tools
              </span>
              <span
                className="text-center text-xs font-bold uppercase tracking-widest"
                style={{ color: BRAND }}
              >
                NicheSEO Pro
              </span>
            </div>
            {capabilities.map((c) => (
              <div
                key={c.label}
                className="grid grid-cols-[1fr_110px_110px] items-center gap-2 border-b border-[#f2f4f8] px-5 py-3 last:border-b-0"
              >
                <span className="text-sm text-[#0a0f2e]">{c.label}</span>
                <span className="flex justify-center">
                  {c.auditTools ? (
                    <Check className="h-4 w-4 text-[#94a3b8]" aria-label="Yes" />
                  ) : (
                    <X className="h-4 w-4 text-[#cbd5e1]" aria-label="No" />
                  )}
                </span>
                <span className="flex justify-center">
                  <Check className="h-4 w-4" style={{ color: BRAND }} aria-label="Yes" />
                </span>
              </div>
            ))}
          </div>

          {/* ── CTA ── */}
          <div
            className="rounded-xl border p-6 sm:p-7"
            style={{ borderColor: `${BRAND}30`, background: `${BRAND}0a` }}
          >
            <h3 className="text-xl font-bold text-[#0a0f2e]">
              Stop paying for reports.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#566070]">
              Connect your Google Search Console and NicheSEO Pro shows you every product
              Google ignores, every query you&apos;re losing, and every page with zero
              impressions — then fixes them. Full scan in under 10 minutes.
            </p>
            <a
              href="https://nicheseopro.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
              style={{ background: BRAND, boxShadow: `0 2px 12px ${BRAND}40` }}
            >
              Open NicheSEO Pro
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <p className="mt-3 text-center text-xs text-[#5f6a78]">
              No credit card required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
