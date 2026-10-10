"use client";

// components/location-wireframe/DetroitGrowthPlanForm.tsx
//
// Matches user request:
// - H2: Why Our Strategy is Successful for Law Firms in Detroit, Michigan
// - H3: Book Your Free Consultation
// - 1-2 Explanatory paragraphs with contextual internal links to:
//   * /services/law-firm-seo (Specialized legal framework)
//   * /case-studies (Verified case results)
//   * /services/local-seo (Map pack & GBP geofencing)
//   * /services/technical-seo (Core Web Vitals & indexing speed)
// - Embedded directly below: 2 verified Local SEO case study proof screenshots
//   * local-dolls-gsc-comparison.jpg (192 -> 264 monthly clicks, 41K -> 106K impressions in Michigan)
//   * local-hvac-ai-overview.png (AI Overview & Local 3-Pack Rank #1)

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  ExternalLink,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

export default function DetroitGrowthPlanForm({ page }: { page: CityPage }) {
  const [practice, setPractice] = useState("Personal injury");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    phone: "",
    email: "",
  });

  const practices = [
    "Personal injury",
    "Criminal defense",
    "Family law",
    "Employment",
    "Other",
  ];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.website || !formData.email) return;
    setSubmitted(true);
  }

  return (
    <section id="growth-plan" className="py-16 sm:py-20 bg-[#0a0f2e] text-white border-b border-slate-800 relative overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute -top-24 right-1/4 h-80 w-80 rounded-full bg-[#534AB7]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-80 w-80 rounded-full bg-[#196b4d]/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* ── Section Header & Explanatory Contextual Paragraphs ── */}
        <div className="max-w-4xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#a594fd] block">
            MARKET EXCLUSIVITY &amp; STRATEGY
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            One Law Firm Per Practice Area: Exclusive Law Firm SEO in Wayne, Oakland and Macomb Counties
          </h2>
          <h3 className="text-xl sm:text-2xl font-bold text-[#3eb489]">
            Book Your Free Consultation
          </h3>
          
          {/* Explanatory Contextual Internal Linking Paragraphs */}
          <div className="space-y-3 pt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            <p>
              Most agencies serve several competing firms in the same courthouse district. We accept one firm per practice area in your Detroit territory, so the strategy we build for you is never run against you. You work directly with a senior strategist, and our terms are month-to-month because we would rather earn the renewal. When we partner with your firm, our complete{" "}
              <Link
                href="/services/law-firm-seo"
                className="font-bold text-[#a594fd] hover:text-white underline decoration-[#a594fd]/60 underline-offset-4 transition-colors"
              >
                dedicated law firm SEO framework
              </Link>{" "}
              is deployed exclusively on your behalf, locking out rival firms from our proprietary intake playbook.
            </p>
            <p>
              Our methodology combines deep{" "}
              <Link
                href="/services/local-seo"
                className="font-bold text-[#3eb489] hover:text-white underline decoration-[#3eb489]/60 underline-offset-4 transition-colors"
              >
                local Google Business Profile geofencing
              </Link>{" "}
              with sub-second{" "}
              <Link
                href="/services/technical-seo"
                className="font-bold text-[#a594fd] hover:text-white underline decoration-[#a594fd]/60 underline-offset-4 transition-colors"
              >
                technical SEO and indexing recovery
              </Link>
              , transforming dormant traffic into pre-qualified retainers. Review our{" "}
              <Link
                href="/case-studies"
                className="font-bold text-white hover:text-[#3eb489] underline decoration-white/60 underline-offset-4 transition-colors"
              >
                verified client case studies
              </Link>{" "}
              to inspect how our search architectures consistently outrank institutional competitors.
            </p>
          </div>
        </div>

        {/* ── Consultation Form Grid ── */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Exclusivity Safeguards & Venue Coverage */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-700 bg-slate-900/90 p-6 sm:p-7 text-slate-200 shadow-xl space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <ShieldCheck className="h-5 w-5 text-[#3eb489]" />
              <h4 className="text-base font-bold text-white">
                Wayne &amp; Tri-County Exclusivity Lock
              </h4>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#a594fd]" />
                Protected Jurisdictional Radius
              </span>
              <span className="text-[11px] text-[#3eb489] font-bold">Wayne, Oakland &amp; Macomb</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              We geofence law firm search visibility across Downtown Detroit, Midtown, Southfield, Troy, and Dearborn so your firm dominates searches wherever prospective clients suffer an injury.
            </p>

            {/* Explanatory Bullet Points */}
            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3eb489] shrink-0 mt-1.5" />
                <span className="leading-snug">
                  <strong>Strict one-firm-per-niche policy</strong> across personal injury, criminal defense, family and employment.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3eb489] shrink-0 mt-1.5" />
                <span className="leading-snug">
                  <strong>Direct strategist access</strong> with no junior hand-offs.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3eb489] shrink-0 mt-1.5" />
                <span className="leading-snug">
                  <strong>Month-to-month terms</strong> with no multi-year lock-in.
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Legal Advertising Ethics</span>
              <span className="text-[#a594fd] font-semibold">Written with MRPC Rule 7 in mind</span>
            </div>
          </div>

          {/* Right Column: Free Strategy Call Form */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-700 bg-white p-6 sm:p-8 text-slate-900 shadow-2xl">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h4 className="text-2xl font-black text-[#0a0f2e]">
                  Consultation Request Received
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Our senior legal SEO strategist will review your firm&apos;s current Wayne County map rankings and send your custom growth plan within 24 hours.
                </p>
                <div className="pt-4">
                  <span className="text-xs font-semibold text-[#534AB7] bg-[#EEEDFE] px-4 py-2 rounded-xl">
                    Territory Exclusivity Hold Initiated for {practice}
                  </span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7] block">
                    EXCLUSIVE DETROIT TERRITORY CHECK
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black text-[#0a0f2e] mt-1">
                    Check Territory Availability
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Tell us about your practice and we will confirm whether your Detroit territory is still open.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Primary Practice Area
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {practices.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPractice(p)}
                        className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                          practice === p
                            ? "bg-[#534AB7] text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      Attorney / Partner Name
                    </label>
                    <input
                      type="text"
                      placeholder="Jane Doe, Esq."
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#534AB7] focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      Law Firm Website URL *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="detroitinjurylaw.com"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#534AB7] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jdoe@firm.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#534AB7] focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-slate-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="(313) 555-0199"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#534AB7] focus:bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#1a7d59] hover:bg-[#196b4d] px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Check My Territory</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <p className="text-[11px] text-slate-400 text-center">
                  We keep every audit confidential and never share it with other firms.
                </p>
              </form>
            )}
          </div>
        </div>


        {/* ── EMBEDDED LOCAL SEO CASE STUDY LIVE RESULTS SCREENSHOTS (User Requested) ── */}
        <div className="pt-8 border-t border-slate-800 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#3eb489] block">
                VERIFIED LOCAL PERFORMANCE EVIDENCE
              </span>
              <h4 className="mt-1 text-2xl sm:text-3xl font-black text-white">
                Live Results Produced with Our Local Search Methodology
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                Real performance telemetry labeled by client type and date range, demonstrating how our search methodology wins local visibility and AI Overviews.
              </p>
            </div>

            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#a594fd] hover:text-white bg-white/5 border border-white/10 px-4 py-2 rounded-xl transition-all shrink-0"
            >
              <span>Explore All Case Studies</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Proof Card 1: Michigan Search Console Growth */}
            <div className="rounded-2xl border border-slate-700 bg-slate-900/90 overflow-hidden shadow-xl flex flex-col justify-between group">
              <div className="p-5 sm:p-6 pb-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#3eb489]/20 text-[#3eb489] border border-[#3eb489]/30">
                    Michigan Local Business
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 font-semibold">
                    60-Day Telemetry
                  </span>
                </div>
                <h5 className="text-lg font-bold text-white group-hover:text-[#a594fd] transition-colors">
                  192 → 264 Monthly Clicks (+37.5%) &amp; 41K → 106K Impressions (+158%)
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Real Google Search Console telemetry for a Michigan local service operation following local citation standardization and practice page expansion.
                </p>
              </div>

              {/* Embedded Screenshot 1 */}
              <div className="relative aspect-[16/8] w-full bg-slate-950 border-t border-slate-800 overflow-hidden">
                <Image
                  src="/images/proof/local-dolls-gsc-comparison.jpg"
                  alt="Google Search Console comparison showing Michigan local business clicks growing from 192 to 264 and impressions growing from 41K to 106K"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain object-center group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>

              <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400">
                <span className="text-[11px] font-mono text-slate-300">
                  Michigan Local Service Business, &ldquo;detroit local services&rdquo;, 60-Day Comparison, source: Google Search Console
                </span>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-1 font-bold text-[#3eb489] hover:underline shrink-0"
                >
                  <span>View Case Study</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Proof Card 2: AI Overview & Local Map Pack Dominance */}
            <div className="rounded-2xl border border-slate-700 bg-slate-900/90 overflow-hidden shadow-xl flex flex-col justify-between group">
              <div className="p-5 sm:p-6 pb-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#534AB7]/30 text-[#a594fd] border border-[#534AB7]/40">
                    Home Services &amp; HVAC
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 font-semibold">
                    Rank #1 in AI Overview
                  </span>
                </div>
                <h5 className="text-lg font-bold text-white group-hover:text-[#3eb489] transition-colors">
                  Named as Primary Recommended Provider in Google AI Overviews
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  High-intent emergency service query captured directly in Google&apos;s generative AI summary above traditional organic search listings.
                </p>
              </div>

              {/* Embedded Screenshot 2 */}
              <div className="relative aspect-[16/8] w-full bg-slate-950 border-t border-slate-800 overflow-hidden">
                <Image
                  src="/images/proof/local-hvac-ai-overview.png"
                  alt="Google AI Overview for high value search query naming our client as the primary trusted business"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain object-center group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>

              <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400">
                <span className="text-[11px] font-mono text-slate-300">
                  HVAC &amp; Home Services Client, &ldquo;emergency services near me&rdquo;, Live SERP Capture, source: Google Gemini / Search AI Overview
                </span>
                <Link
                  href="/services/law-firm-seo"
                  className="inline-flex items-center gap-1 font-bold text-[#a594fd] hover:underline shrink-0"
                >
                  <span>See Methodology</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
