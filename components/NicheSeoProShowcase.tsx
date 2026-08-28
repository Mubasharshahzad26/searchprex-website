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

import { useEffect, useRef } from "react";
import { ArrowUpRight, Check, X } from "lucide-react";

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

export default function NicheSeoProShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Same playback contract as the rest of the page: no autoplay attribute,
  // preload="none" so the 5MB file is only fetched once this section is
  // reached, playback started on intersection, and skipped entirely when the
  // visitor has asked for reduced motion.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.preload = "auto";
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
            className="relative border-b border-[#eef0f6] bg-[#f2f4f9] p-3 sm:p-4"
            style={{ boxShadow: "inset 0 4px 15px rgba(0,0,0,0.05)" }}
          >
            <video
              ref={videoRef}
              className="aspect-video w-full rounded-[6px] object-cover shadow-sm"
              poster="/images/video-posters/nicheseo-pro.png"
              muted
              loop
              playsInline
              preload="none"
              aria-label="The NicheSEO Pro dashboard running an autopilot cycle: content generated, published live, submitted to Google, and verified."
            >
              <source src="/video/nicheseo-pro.mp4" type="video/mp4" />
            </video>
            <span
              className="pointer-events-none absolute bottom-6 left-6 rounded-md px-2 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm sm:bottom-7 sm:left-7"
              style={{ background: `${BRAND}e6` }}
            >
              Live autopilot run
            </span>
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
