"use client";
 
/**
 * LawFirmStack (Homepage Section)
 * 
 * Positions the SearchPrex × Codeloci partnership as a complete
 * end-to-end growth stack for modern law firms.
 * 
 * Design: Semrush enterprise-style — muted olive theme, split-panel
 * layout, quiet confidence, no marketing fluff.
 * 
 * Placement: After Services / Results / before Trustpilot in homepage flow.
 */
 
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, TrendingUp, Code2, CheckCircle2, Sparkles } from "lucide-react";
 
const CODELOCI_URL = "https://codeloci.com";
 
export default function LawFirmStack() {
  return (
    <section className="relative border-y border-[#e5e7eb] bg-[#fafafa]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
 
        {/* ─── SECTION HEADER ─── */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7b61ff]/20 bg-[#7b61ff]/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#7b61ff]">
            <Sparkles className="h-3 w-3" />
            Official Partnership
          </div>
          <h2 className="mb-5 text-3xl font-bold leading-[1.1] tracking-tight text-[#0a0f2e] sm:text-4xl lg:text-5xl">
            The complete stack for<br />
            <span className="text-[#7b61ff]">modern law firms.</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#5a6270] sm:text-lg">
            SEO brings the clients. Software helps you serve them at scale.
            SearchPrex and Codeloci together deliver end-to-end growth — from ranking on Google to running your entire practice.
          </p>
        </div>
 
        {/* ─── PARTNERSHIP GRID (2 columns) ─── */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
 
          {/* ─── SEARCHPREX CARD ─── */}
          <div className="group relative overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white p-8 transition-all hover:border-[#7b61ff]/30 hover:shadow-lg lg:p-10">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7b61ff]/10">
                <TrendingUp className="h-6 w-6 text-[#7b61ff]" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-[#5a6270]">Growth Engine</div>
                <div className="text-xl font-bold text-[#0a0f2e]">SearchPrex</div>
              </div>
            </div>
 
            <h3 className="mb-3 text-lg font-semibold text-[#0a0f2e]">
              Rank on Google. Get cited by AI.
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-[#5a6270]">
              Founder-led SEO built for law firms — Map Pack rankings, AI Overview citations,
              practice-area content, and E-E-A-T compliance for YMYL legal search.
            </p>
 
            <ul className="space-y-2.5">
              {[
                "Google Maps top 3 rankings",
                "AI Overview & ChatGPT citations",
                "Practice-area SEO content",
                "Legal E-E-A-T & schema markup",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[#0a0f2e]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#7b61ff]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
 
            <div className="mt-8 border-t border-[#e5e7eb] pt-6">
              <Link
                href="/services/law-firm-seo"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#7b61ff] hover:text-[#5a4bd6]"
              >
                Explore Law Firm SEO
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
 
          {/* ─── CODELOCI CARD ─── */}
          <div className="group relative overflow-hidden rounded-2xl border border-[#e5e7eb] bg-[#0a0f2e] p-8 text-white transition-all hover:shadow-2xl lg:p-10">
            {/* Subtle gradient accent */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#7b61ff]/10 blur-3xl" />
 
            <div className="relative">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                  <Code2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-white/60">Software Partner</div>
                  <div className="flex items-center gap-3">
                    <div className="text-xl font-bold">Codeloci</div>
                    {/* Logo (comment out if not available yet) */}
                    <div className="relative h-6 w-24 opacity-80">
                      <Image
                        src="/codeloci-logo.png"
                        alt="Codeloci"
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                  </div>
                </div>
              </div>
 
              <h3 className="mb-3 text-lg font-semibold">
                Run your entire law practice.
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-white/70">
                Purpose-built software solutions for law firms — case management,
                client portals, intake automation, document workflows, and billing
                systems that actually work for legal practices.
              </p>
 
              <ul className="space-y-2.5">
                {[
                  "Case & matter management",
                  "Client portal & intake automation",
                  "Document workflows & e-signing",
                  "Billing, trust accounting & reporting",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#a78bff]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
 
              <div className="mt-8 border-t border-white/10 pt-6">
                <a
                  href={CODELOCI_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#a78bff] hover:text-white"
                >
                  Visit Codeloci
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
 
        </div>
 
        {/* ─── UNIFIED CTA STRIP ─── */}
        <div className="mt-10 rounded-2xl border border-[#e5e7eb] bg-white p-6 sm:flex sm:items-center sm:justify-between sm:p-8">
          <div className="mb-4 sm:mb-0 sm:mr-6">
            <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#5a6270]">
              Better together
            </div>
            <div className="text-lg font-semibold text-[#0a0f2e]">
              Book a joint consultation — SEO + Software strategy for your firm.
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/free-audit"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#0a0f2e] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-px"
            >
              Book joint consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
 
      </div>
    </section>
  );
}
 