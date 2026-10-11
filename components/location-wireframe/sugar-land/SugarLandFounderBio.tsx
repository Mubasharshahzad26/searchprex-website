"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, UserCheck, CheckCircle2, ArrowRight } from "lucide-react";

export default function SugarLandFounderBio() {
  const credentials = [
    "Semrush Certified SEO Analyst",
    "HubSpot Inbound Certified",
    "5+ Years Law Firm SEO Specialization",
    "Google AI Overview & Entity Specialist",
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left: Founder Photo */}
            <div className="lg:col-span-4 text-center">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto rounded-full overflow-hidden border-4 border-[#534AB7]/20 shadow-xl mb-4 group">
                <Image
                  src="/images/mubashar-sharif.jpg"
                  alt="Mubashar Sharif, CEO and Principal Legal SEO Analyst at SearchPrex"
                  fill
                  sizes="(max-width: 768px) 176px, 208px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1a7d59]/10 text-[#1a7d59] text-xs font-bold uppercase tracking-wider mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Certified SEO Analyst</span>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Founder-Led Architecture · 5+ Years
              </div>
            </div>

            {/* Right: Personal Bio & Note */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#534AB7]/10 text-[#534AB7] text-xs font-bold uppercase tracking-wider">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Direct Founder Involvement</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight">
                Mubashar Sharif, CEO &amp; Principal Legal SEO Analyst
              </h2>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                <strong>Your Sugar Land search strategy is engineered, audited, and personally overseen by Mubashar Sharif.</strong> There are no entry-level account managers, no junior intermediaries, and no outsourced ticket queues. The person who evaluates your crawl data and analyzes your Fort Bend competitors is the person executing your rescue plan.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-serif italic border-l-2 border-[#534AB7] pl-4 py-1">
                &quot;I have watched countless law firms in Fort Bend County pour tens of thousands into Google Ads each month because national agencies failed to build proper organic topical authority. We replace that costly treadmill with enduring practice silos that make your firm the unmistakable authority in Sugar Land.&quot;
              </p>

              {/* Signature SVG */}
              <div className="pt-2 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="font-extrabold text-lg text-[#0a0f2e]">
                    Mubashar Sharif
                  </div>
                  <div className="text-xs text-slate-600 font-medium">
                    Founder, CEO &amp; Principal Legal SEO Analyst
                  </div>
                </div>

                <svg viewBox="0 0 160 30" width="140" height="28" aria-hidden="true" className="opacity-80">
                  <path
                    d="M4 20 C30 4 50 28 76 14 S120 6 156 18"
                    fill="none"
                    stroke="#534AB7"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Credentials Pills */}
              <div className="flex flex-wrap gap-2.5 pt-4">
                {credentials.map((c, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#534AB7]" />
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
