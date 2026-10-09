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
      q: `How long does law firm SEO take in ${page.city}?`,
      a: `Local Map Pack gains typically appear within 60 to 90 days as citations and Google Business Profile signals sync. Competitive organic keywords for high-value practice areas (e.g. "Detroit car accident lawyer") generally achieve dominant page-one placement within 4 to 6 months of statutory silo deployment.`,
    },
    {
      q: `Do you work with firms outside ${page.city}?`,
      a: `Yes, but we strictly enforce our One Firm Per Practice Niche exclusivity policy. If we represent a personal injury firm in Detroit, we will never represent a competing personal injury firm in Wayne County.`,
    },
    {
      q: "Is your content compliant with Michigan legal advertising rules?",
      a: "Yes. All statutory copy, practice silos, and case result descriptions adhere strictly to Michigan Rules of Professional Conduct (MRPC 7.1 through 7.3), including required disclaimers regarding past verdicts and no-guarantee disclosures.",
    },
    {
      q: "How does Michigan no-fault insurance law impact law firm SEO?",
      a: `Michigan's unique no-fault system (MCL § 500.3101) means prospective clients search for both first-party PIP benefits and third-party threshold tort claims. Standard generic out-of-state SEO templates fail because they ignore this statutory distinction. We build dedicated silos that answer both questions directly.`,
    },
    {
      q: "What makes your AI visibility (AEO/GEO) different from traditional SEO?",
      a: "In 2026, prospective legal clients query conversational LLMs like Google Gemini and ChatGPT for lawyer recommendations. We structure your attorney credentials, bar admissions, and case results in verified JSON-LD entity schema so AI models cite your firm as the verified primary recommendation.",
    },
    {
      q: `Do you require a long-term lock-in contract?`,
      a: `No. We operate on month-to-month performance retainers after the initial 90-day technical foundation sprint. Our work earns retainers every month through transparent CallRail call attribution and signed case telemetry.`,
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
              Wayne County Legal Jurisdiction &amp; Practice Coverage
            </h2>
            <p className="mt-2 text-xs sm:text-base text-slate-600 leading-relaxed">
              We engineer dominant Google 3-Pack and AI Overview presence for law firms throughout Metro Detroit—without charging firms for expensive Downtown office leases. You partner directly with a senior legal SEO strategist.
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
