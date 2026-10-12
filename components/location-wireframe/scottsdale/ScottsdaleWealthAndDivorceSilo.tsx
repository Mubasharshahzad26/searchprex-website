"use client";

import React from "react";
import { Building2, FileSpreadsheet, Landmark } from "lucide-react";

const SILO_PILLARS = [
  {
    badge: "01 · Paradise Valley & North Scottsdale",
    title: "Complex Community Property & Business Valuation Silos",
    body: "Affluent prospective clients in 85253 and 85255 do not search generic phrases like 'cheap divorce lawyer'. They research ARS § 25-211 community property characterization, commingled separate property trusts, and business goodwill valuation before discreetly contacting one firm.",
    deliverable: "Dedicated statutory authority guides + Northeast Regional Court Center (40th St) venue alignment.",
  },
  {
    badge: "02 · Kierland & Scottsdale Airpark",
    title: "Corporate, Real Estate & Dynasty Trust Architecture",
    body: "With over 3,000 enterprises operating around the Scottsdale Airpark corridor, commercial principals vet counsel through Google AI Overviews and ChatGPT. We structure verifiable E-E-A-T credentials and Arizona Trust Code entities so AI engines cite your partners directly.",
    deliverable: "Entity-linked attorney bios + Schema.org LegalService & Author disambiguation.",
  },
  {
    badge: "03 · Old Town & Loop 101 Corridor",
    title: "High-Stakes Professional DUI & Catastrophic Tort Capture",
    body: "Licensed executives, physicians, and commercial travelers facing charges in Scottsdale City Court (3700 N 75th St) or severe collisions on Loop 101 demand immediate, credentialed trial representation.",
    deliverable: "Sub-2-second mobile Core Web Vitals + instant Whisper-attributed intake routing.",
  },
];

export default function ScottsdaleWealthAndDivorceSilo() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-10">
          <span className="inline-block px-3 py-1 rounded-md bg-white border border-slate-300 text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-3">
            Affluent Client Journey
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-950 tracking-tight">
            Scottsdale High-Net-Worth Silo Architecture
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
            High-retainer Scottsdale clients conduct private, multi-step research across Google and AI assistants before ever placing a call. Here is how we engineer your firm to win their trust at every stage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SILO_PILLARS.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-3">
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-neutral-700 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                  {item.badge}
                </span>
                <h3 className="text-lg font-bold text-neutral-950 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.body}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-200">
                <p className="text-xs font-semibold text-neutral-900">
                  Key Deliverable: <span className="font-normal text-slate-600">{item.deliverable}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
