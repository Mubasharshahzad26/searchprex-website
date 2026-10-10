"use client";

// components/location-wireframe/DetroitOfficeAndFaq.tsx
//
// Matches Page 8 with user refinements:
// 1. "Metro Detroit Practice Coverage & Jurisdictional Radius" (Remote senior execution, zero office overhead waste)
// 2. Google Map embed centered on Wayne County legal & courthouse corridor
// 3. Simple FAQ Heading: "Frequently Asked Questions" (user requested: "last py faqs kr dain heading simple")
// 4. Smooth accordion animation with mobile responsive touch-friendly layout

import React, { useState } from "react";
import {
  MapPin,
  Scale,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Laptop,
} from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

export default function DetroitOfficeAndFaq({ page }: { page: CityPage }) {
  const mapQuery = encodeURIComponent(`${page.city}, ${page.state} Wayne County Circuit Court 36th District`);
  const embedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=m&z=13&output=embed`;

  const faqs = [
    {
      q: "How long does law firm SEO take in Detroit?",
      a: "Map Pack improvements often start within 60 to 90 days as Business Profile and citation signals update. Competitive organic terms like \"Detroit car accident lawyer\" usually take longer, commonly four to six months or more depending on the competition and your starting point. We agree on milestones up front, and results are never guaranteed.",
    },
    {
      q: "How much does law firm SEO cost in Detroit?",
      a: "It depends on your practice area, the competition and the scope. Most active Detroit campaigns range between $1,500 and $4,500/month depending on practice density across Wayne, Oakland, and Macomb counties. Plans are month-to-month, and we quote after reviewing your site and the firms you compete with.",
    },
    {
      q: "Do you work with firms outside Detroit?",
      a: "Yes. We also build location pages and campaigns for firms in Grand Rapids, Ann Arbor, Lansing, Warren, and other Midwest markets. Every territory receives the same one-firm-per-niche exclusivity.",
    },
    {
      q: "Is your content compliant with Michigan legal advertising rules?",
      a: "We write with Michigan Rule of Professional Conduct 7 (MRPC Rule 7) in mind, covering testimonials, past results and disclaimers, and your attorneys approve every page before it goes live. The firm remains responsible for its own advertising.",
    },
    {
      q: "How does Michigan no-fault insurance law affect law firm SEO?",
      a: "Injured drivers search with very specific questions about PIP benefits, claim deadlines and when they can sue under the serious impairment threshold (MCL § 500.3135). Michigan's 2019 no-fault reforms changed coverage choices and provider reimbursement, so outdated content loses trust fast. We build and refresh no-fault pages with attorney review.",
    },
    {
      q: "What makes AI visibility (AEO/GEO) different from traditional SEO?",
      a: "Traditional SEO targets rankings in blue links. AI visibility focuses on being cited in Google AI Overviews, ChatGPT and Perplexity answers, which depends on clear entity signals, answer-first content and trusted mentions. We track your AI citation rate alongside Map Pack rankings.",
    },
    {
      q: "Do you require a long-term contract?",
      a: "No. We work month-to-month and earn the renewal through calls and signed cases.",
    },
    {
      q: "Can you help my firm rank in the Google Map Pack for \"car accident lawyer Detroit\"?",
      a: "Map Pack rankings depend on proximity, relevance and prominence. We optimize the controllable parts (profile, reviews, citations, practice-area pages) and measure progress with geo-grid tracking. We do not guarantee a specific position.",
    },
    {
      q: "What does one firm per practice area mean?",
      a: "We take on a single firm per practice area in your Detroit territory, so we will never run your strategy against another client of ours.",
    },
    {
      q: "Do you guarantee rankings or signed cases?",
      a: "No. No honest agency can. We commit to a transparent process, monthly reporting and agreed milestones with a 90-day milestone review.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 bg-[#f8fafc] border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* ── 1. Metro Detroit Jurisdictional Coverage & Practice Radius ── */}
        <div>
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#534AB7] block">
              METRO DETROIT PRACTICE COVERAGE
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#0a0f2e]">
              Remote Law Firm SEO for Metro Detroit With Direct Founder Access
            </h2>
            <p className="mt-2 text-xs sm:text-base text-slate-600 leading-relaxed">
              SearchPrex works remotely with Detroit firms, which means no downtown office overhead built into your fee. You get bi-weekly video reviews, call recordings and a live dashboard, and you talk directly to the strategist doing the work.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Google Map Embed Centered on Judicial Corridor */}
            <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs min-h-[380px] relative">
              <iframe
                src={embedUrl}
                title={`${page.city} Wayne County Legal District Map`}
                className="w-full h-full min-h-[380px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="pointer-events-none absolute bottom-3 left-3 right-3 sm:right-auto rounded-xl bg-slate-950/90 px-3.5 py-2 text-[11px] font-medium text-slate-200 backdrop-blur border border-white/10 shadow flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#534AB7] shrink-0" />
                <span>Target Optimization Corridor: Wayne County 3rd Circuit Court &amp; 36th District Court</span>
              </div>
            </div>

            {/* Right: Remote Dedicated Legal Practice Partnership Card */}
            <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7]">
                    Dedicated Practice Partner
                  </span>
                  <span className="text-[10px] font-semibold text-[#196b4d] bg-[#3eb489]/15 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Laptop className="h-3 w-3 text-[#196b4d]" />
                    <span>Direct Strategist Access</span>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-[#0a0f2e] mt-3">
                  Serving Metro Detroit Law Firms
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Our remote model gives your partners direct access to senior legal SEO strategists, skipping the junior account managers and agency markups.
                </p>

                {/* Tactical Commitments Checklist */}
                <div className="mt-5 space-y-3 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#3eb489] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 font-bold">Tri-County Proximity Optimization</strong>
                      <span className="text-slate-600 text-xs">Dominating Wayne, Oakland (Southfield/Troy), and Macomb county searches.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#3eb489] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 font-bold">Strict Market Exclusivity</strong>
                      <span className="text-slate-600 text-xs">We accept only 1 law firm per practice area in the Metro Detroit territory.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#3eb489] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 font-bold">Live Attribution &amp; Standups</strong>
                      <span className="text-slate-600 text-xs">Bi-weekly video reviews, CallRail intake recordings, and 24/7 client dashboard.</span>
                    </div>
                  </div>
                </div>

                {/* Primary County Coverage Tags */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                    Active Coverage Corridors:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="rounded-lg bg-[#EEEDFE] px-2.5 py-1 text-xs font-semibold text-[#534AB7] border border-[#534AB7]/20">
                      Wayne County
                    </span>
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 border border-slate-200">
                      Oakland County
                    </span>
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 border border-slate-200">
                      Macomb County
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <a
                href="#growth-plan"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#534AB7] hover:bg-[#3C3489] py-3 px-4 text-xs sm:text-sm font-bold text-white shadow-xs transition-colors cursor-pointer group"
              >
                <span>Check Territory Exclusivity for Your Firm</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>


        {/* ── 2. Frequently Asked Questions (Simple heading as requested) ── */}
        <div className="space-y-6 max-w-4xl mx-auto pt-4">
          <div className="text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#534AB7] block">
              COMMON QUESTIONS
            </span>
            <h3 className="mt-1 text-2xl sm:text-3xl font-black tracking-tight text-[#0a0f2e]">
              Frequently Asked Questions
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              Clear answers regarding our Detroit legal SEO methodology, exclusivity, and case attribution.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs transition-all hover:border-[#534AB7]/40"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#0a0f2e] hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-[#534AB7] shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
