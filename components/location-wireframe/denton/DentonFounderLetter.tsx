"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { UserCheck, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

export default function DentonFounderLetter() {
  const credentials = [
    "Semrush Certified SEO Analyst",
    "HubSpot Inbound Certified",
    "5+ Years Law Firm & Local SEO",
    "Google AI Overview & Entity Specialist",
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left: Founder Photo */}
            <div className="lg:col-span-4 text-center">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto rounded-full overflow-hidden border-4 border-slate-300 shadow-xl mb-4 group">
                <Image
                  src="/images/mubashar-sharif.jpg"
                  alt="Mubashar Sharif, CEO and Principal Legal SEO Analyst at SearchPrex"
                  fill
                  sizes="(max-width: 768px) 176px, 208px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-neutral-800 text-xs font-bold uppercase tracking-wider mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Certified SEO Analyst</span>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Founder-Led Architecture · 5+ Years
              </div>
            </div>

            {/* Right: Personal Letter Card */}
            <div className="lg:col-span-8">
              <div className="p-7 sm:p-8 rounded-2xl bg-slate-100 border-2 border-slate-300 relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-neutral-900 text-xs font-bold uppercase tracking-wider mb-4">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>A Direct Note from Mubashar Sharif</span>
                </div>

                <div className="text-base sm:text-lg text-slate-800 leading-relaxed space-y-4 font-serif">
                  <p>
                    <strong>Hi, I&apos;m Mubashar.</strong>
                  </p>
                  <p>
                    I know exactly how it feels when a four-figure Google Ads invoice hits your firm&apos;s bank account on the first of the month, yet the phone stays quiet and consultation slots remain unfilled. You watch generic Dallas–Fort Worth mega-firms take page-one positions for Denton searches without having set foot in the historic Denton County Courthouse-on-the-Square.
                  </p>
                  <p>
                    When you work with SearchPrex, you deal directly with me. I audit your website at the crawl level, build your local practice silos, and track every phone call. If we are not the right fit, you will know within 90 days — and our written milestone guarantee means your fees are fully protected.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="font-extrabold text-lg text-neutral-950">
                      Mubashar Sharif
                    </div>
                    <div className="text-xs text-slate-600 font-medium">
                      Founder, CEO &amp; Principal Legal SEO Analyst
                    </div>
                  </div>

                  {/* Stylized SVG signature */}
                  <svg viewBox="0 0 160 30" width="140" height="28" aria-hidden="true" className="opacity-80">
                    <path
                      d="M4 20 C30 4 50 28 76 14 S120 6 156 18"
                      fill="none"
                      stroke="#171717"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2.5 mt-6">
                {credentials.map((c, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900" />
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
