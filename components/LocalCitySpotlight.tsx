// components/LocalCitySpotlight.tsx
//
// City-specific visual spotlight components that represent local demographics,
// culture, and surroundings. Contrasts the local legal practice problem with
// SearchPrex's solution-oriented execution, with natural contextual keyword links
// to law firm practice area services.

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Scale, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

/**
 * City-specific Problem & Demographics Card.
 * Uses real urban streetscape and legal district surroundings.
 */
export function LocalProblemSpotlight({ page }: { page: CityPage }) {
  if (page.citySlug === "detroit") {
    return (
      <div className="my-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="grid lg:grid-cols-12 lg:items-stretch">
          {/* Image Column */}
          <div className="relative min-h-[300px] lg:min-h-full lg:col-span-6 bg-slate-900 overflow-hidden">
            <Image
              src="/images/locations/detroit-legal-district.jpg"
              alt="Attorneys and legal professionals walking past Wayne County Court and Woodward Avenue in downtown Detroit"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover transition-transform duration-500 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent lg:hidden" />
            <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-slate-950/80 p-3 backdrop-blur-md border border-white/10 text-white text-xs lg:hidden">
              <span className="font-bold text-amber-300">Downtown Detroit Legal District:</span> Woodward Ave & Wayne County Court corridor.
            </div>
          </div>

          {/* Content Column */}
          <div className="p-6 sm:p-8 lg:p-10 lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-700">
                  Local Market Reality · Wayne County
                </span>
              </div>

              <h3 className="mt-3 text-2xl font-black tracking-tight text-[#0a0f2e] sm:text-3xl leading-tight">
                Why Detroit Law Firms Struggle with Qualified Client Leads
              </h3>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#5b6472]">
                We understand the daily frustration facing Detroit attorneys: four massive firms with multi-million dollar television budgets dominate the broadcast airwaves, while national lead-generation directories hog generic keywords. Meanwhile, Detroiters actively searching near Woodward Avenue, Campus Martius, or along I-94 end up routed to out-of-town referral brokers or non-viable price-shoppers.
              </p>

              <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-200/80 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Where Your Competitors Are Burning Cash vs Low-Hanging Opportunities:
                </h4>
                <ul className="mt-3 space-y-2 text-xs sm:text-sm text-[#0a0f2e]">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold shrink-0">✕</span>
                    <span>
                      <strong>$150–$300+ Google Ads PPC click burn:</strong> Paid campaigns for broad terms that stop generating inquiries the second ad spend is paused.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>
                      <strong>Untapped low-hanging practice searches:</strong> Dedicated localized landing pages for{" "}
                      <Link href="/services/law-firm-seo/car-accident" className="font-semibold text-[#534AB7] underline hover:text-[#3d368e]">
                        Detroit car accident lawyer SEO
                      </Link>{" "}
                      and{" "}
                      <Link href="/services/law-firm-seo/personal-injury" className="font-semibold text-[#534AB7] underline hover:text-[#3d368e]">
                        personal injury law firm SEO
                      </Link>
                      .
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>
                      High-converting localized silos for{" "}
                      <Link href="/services/law-firm-seo/criminal-defense" className="font-semibold text-[#534AB7] underline hover:text-[#3d368e]">
                        criminal defense attorney SEO
                      </Link>{" "}
                      and{" "}
                      <Link href="/services/law-firm-seo/family-law" className="font-semibold text-[#534AB7] underline hover:text-[#3d368e]">
                        family law & divorce SEO
                      </Link>{" "}
                      tailored to 36th District & Wayne County Circuit Court procedures.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="h-3.5 w-3.5 text-[#534AB7]" /> Woodward Ave Legal Corridor, Detroit, MI
              </span>
              <span className="font-semibold text-slate-700">Wayne County Jurisdiction</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default fallback for other cities
  return null;
}

/**
 * City-specific Solution & Consultation Card.
 * Highlights SearchPrex's strategic partnership, high-value consultations,
 * and tangible organic case intake.
 */
export function LocalSolutionSpotlight({ page }: { page: CityPage }) {
  if (page.citySlug === "detroit") {
    return (
      <div className="my-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="grid lg:grid-cols-12 lg:items-stretch">
          {/* Content Column */}
          <div className="p-6 sm:p-8 lg:p-10 lg:col-span-6 flex flex-col justify-between order-2 lg:order-1">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-emerald-700" />
                  SearchPrex Solution · Detroit Growth Partner
                </span>
              </div>

              <h3 className="mt-3 text-2xl font-black tracking-tight text-[#0a0f2e] sm:text-3xl leading-tight">
                Engineering High-Intent Retained Inquiries for Detroit Law Firms
              </h3>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#5b6472]">
                We don&apos;t sell generic SEO packages or vanity traffic reports. SearchPrex solves the client acquisition bottleneck by positioning your firm directly where 70%+ of mobile legal inquiries happen: the **Google Map 3-Pack** and authoritative practice-area silos.
              </p>

              <div className="mt-6 space-y-3.5">
                {[
                  {
                    title: "Michigan No-Fault & PIP Statute Authority",
                    detail: "We create legally sound, highly specific content explaining Michigan no-fault insurance changes, capturing serious accident victims before they call TV advertisers.",
                  },
                  {
                    title: "Hyper-Local Wayne County Geofencing & Neighborhoods",
                    detail: "Syncing Google Business Profile service areas across Corktown, Midtown, Downtown, Dearborn, and Livonia so your firm ranks across all search radiuses.",
                  },
                  {
                    title: "Exclusive Representation in Detroit",
                    detail: "We accept only ONE firm per practice area in Detroit. We will never optimize a competitor ranking against your firm.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#0a0f2e] block font-bold">{item.title}</strong>
                      <span className="text-[#5b6472]">{item.detail}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/free-audit"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0a0f2e] px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#1a2366] transition-colors"
                >
                  <span>Request Free 24h Detroit Market Audit</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/services/law-firm-seo"
                  className="text-xs sm:text-sm font-bold text-[#534AB7] hover:underline"
                >
                  Explore Law Firm SEO Services →
                </Link>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium text-emerald-700">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> 90-Day Milestone Guarantee
              </span>
              <span className="font-semibold text-slate-700">Founder-Led Strategy</span>
            </div>
          </div>

          {/* Image Column */}
          <div className="relative min-h-[300px] lg:min-h-full lg:col-span-6 bg-slate-900 overflow-hidden order-1 lg:order-2">
            <Image
              src="/images/locations/detroit-law-consultation.jpg"
              alt="Detroit law firm managing partner and SearchPrex SEO growth strategist reviewing case intake analytics overlooking the Detroit riverfront"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent lg:hidden" />
            <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-slate-950/80 p-3 backdrop-blur-md border border-white/10 text-white text-xs lg:hidden">
              <span className="font-bold text-emerald-300">Executive Strategy Review:</span> Overlooking Detroit riverfront & skyline.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default fallback for other cities
  return null;
}
