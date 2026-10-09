"use client";

// components/location-wireframe/DetroitOtherAreasServed.tsx
//
// Matches user's exact final layout:
// - H2: Other Areas We Serve Across Metro Detroit & Michigan
// - Highly Relevant Image (/images/locations/detroit-legal-district.webp)
// - Google Map highlighting all spots where we serve (Wayne, Oakland, Macomb)
// - Tabbed coverage for Wayne County hubs (8), Oakland County corridors (6), Macomb County corridors (6), Michigan sister markets (5)
// - Deep contextual legal SEO silo interlinking

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Scale,
  Landmark,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Building2,
  Navigation,
} from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

export default function DetroitOtherAreasServed({ page }: { page: CityPage }) {
  const [activeTab, setActiveTab] = useState<"wayne" | "oakland" | "macomb" | "michigan">("wayne");

  const mapQuery = encodeURIComponent("Metro Detroit Wayne County Circuit Court Southfield Troy Warren MI");
  const embedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=m&z=10&output=embed`;

  const wayneAreas = [
    { name: "Downtown Detroit", note: "36th District Court & Coleman A. Young Municipal Center corridor" },
    { name: "Midtown & New Center", note: "Wayne State legal corridor & Henry Ford healthcare network" },
    { name: "Corktown & Riverfront", note: "Emerging commercial and civil litigation corridor" },
    { name: "Dearborn", note: "19th District Court, Ford Motor HQ & Arab American community hub" },
    { name: "Livonia", note: "16th District Court & I-96 high-traffic commercial accident corridor" },
    { name: "Grosse Pointe", note: "Municipal court venues & high-net-worth estate/family matters" },
    { name: "Canton & Plymouth", note: "35th District Court corridor & growing suburban litigation" },
    { name: "Downriver (Taylor/Wyandotte)", note: "23rd District Court & industrial manufacturing claims" },
  ];

  const oaklandAreas = [
    { name: "Southfield", note: "The primary Oakland County legal hub with dozens of prominent firms" },
    { name: "Troy", note: "Big Oakland County corporate, defense, and business law practices" },
    { name: "Birmingham & Bloomfield", note: "High-value catastrophic injury and private client representation" },
    { name: "Royal Oak & Ferndale", note: "44th District Court & Woodward Avenue commercial corridor" },
    { name: "Farmington Hills & Novi", note: "47th & 52-1 District Courts along I-275 / I-696 interchange" },
    { name: "Rochester Hills", note: "52-3 District Court & northern Oakland County suburban corridor" },
  ];

  const macombAreas = [
    { name: "Warren", note: "37th District Court, GM Tech Center & manufacturing injury corridor" },
    { name: "Sterling Heights", note: "41A District Court & Hall Road / M-59 commercial litigation hub" },
    { name: "Mount Clemens", note: "16th Judicial Circuit Court of Macomb County seat" },
    { name: "Clinton Township", note: "41B District Court & Macomb County's most populous township" },
    { name: "St. Clair Shores", note: "40th District Court & Nautical Mile maritime / traffic corridor" },
    { name: "Shelby Township", note: "High-growth residential and commercial corridor along M-53" },
  ];

  const michiganMarkets = [
    {
      name: "Grand Rapids, MI",
      href: "/locations/michigan/grand-rapids",
      desc: "Kent County 17th Circuit Court & U.S. District Court for Western Michigan.",
      badge: "Active Market",
    },
    {
      name: "All Michigan Locations Hub",
      href: "/locations/michigan",
      desc: "Comprehensive Michigan legal directory and state statutory coverage.",
      badge: "State Hub",
    },
    {
      name: "Ann Arbor (Washtenaw Co.)",
      href: "/locations/michigan",
      desc: "14A/14B District Courts & University of Michigan medical corridor.",
      badge: "Coverage Area",
    },
    {
      name: "Lansing (Capital District)",
      href: "/locations/michigan",
      desc: "30th Circuit Court, State Capitol, & Michigan Court of Appeals seat.",
      badge: "Coverage Area",
    },
    {
      name: "All US Practice Locations",
      href: "/locations",
      desc: "Coast-to-coast law firm SEO coverage in 60+ competitive jurisdictions.",
      badge: "National Index",
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#534AB7] block">
              REGIONAL COVERAGE &amp; STATUTORY HUBS
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#0a0f2e]">
              Other Areas We Serve Across Metro Detroit &amp; Michigan
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
              Google ranks legal firms based on verified geographic proximity and judicial jurisdiction relevance. We build authoritative location silos across all three Metro Detroit counties and major Michigan hubs.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-[#196b4d] bg-[#EEEDFE]/60 px-4 py-2 rounded-xl border border-[#534AB7]/20 shrink-0">
            <ShieldCheck className="h-4 w-4 text-[#534AB7]" />
            <span>Strict 1-Firm Per Practice Exclusivity</span>
          </div>
        </div>

        {/* ── Highly Relevant Image + Google Map Highlighting All Spots We Serve ── */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Highly Relevant Image */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-slate-200 shadow-md min-h-[340px]">
            <Image
              src="/images/locations/detroit-legal-district.webp"
              alt="Downtown Detroit Legal District and Wayne County Courthouse Corridor"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f2e]/90 via-[#0a0f2e]/30 to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-[#534AB7] text-white mb-2 shadow-xs">
                Metro Detroit Court Venues We Target
              </span>
              <h4 className="text-base font-bold text-white leading-snug">
                Wayne, Oakland &amp; Macomb Legal Jurisdictions
              </h4>
              <p className="text-xs text-slate-200 mt-1">
                Dominating client searches from Downtown Detroit to Southfield, Troy, and Macomb County circuit courts.
              </p>
            </div>
          </div>

          {/* Right Column: Google Map Highlighting All Spots We Serve */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs min-h-[340px] relative">
            <iframe
              src={embedUrl}
              title="Metro Detroit Regional Service Corridor Map"
              className="w-full h-full min-h-[340px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="pointer-events-none absolute bottom-3 left-3 right-3 sm:right-auto rounded-xl bg-slate-950/90 px-3.5 py-2 text-[11px] font-medium text-slate-200 backdrop-blur border border-white/10 shadow flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#534AB7] shrink-0" />
              <span>Highlighting all practice coverage spots across Metro Detroit</span>
            </div>
          </div>
        </div>

        {/* County / Market Selector Tabs */}
        <div className="flex flex-wrap gap-2.5 pb-2 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab("wayne")}
            className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "wayne"
                ? "bg-[#534AB7] text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Wayne County Hubs (8)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("oakland")}
            className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "oakland"
                ? "bg-[#534AB7] text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Oakland County Corridors (6)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("macomb")}
            className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "macomb"
                ? "bg-[#534AB7] text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Macomb County Corridors (6)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("michigan")}
            className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "michigan"
                ? "bg-[#0a0f2e] text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Michigan &amp; Sister Markets (5)
          </button>
        </div>

        {/* Tab Content Panels */}
        {activeTab === "wayne" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-200">
            {wayneAreas.map((area, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-[#f8fafc] p-4 flex flex-col justify-between hover:border-[#534AB7]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-[#0a0f2e] mb-1">
                    <MapPin className="h-4 w-4 text-[#534AB7] shrink-0" />
                    <span>{area.name}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {area.note}
                  </p>
                </div>
                <span className="text-[10px] font-semibold text-[#534AB7] mt-3 block pt-2 border-t border-slate-200/60">
                  Wayne County Jurisdiction
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "oakland" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in duration-200">
            {oaklandAreas.map((area, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-[#f8fafc] p-4 flex flex-col justify-between hover:border-[#534AB7]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-[#0a0f2e] mb-1">
                    <MapPin className="h-4 w-4 text-[#534AB7] shrink-0" />
                    <span>{area.name}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {area.note}
                  </p>
                </div>
                <span className="text-[10px] font-semibold text-[#534AB7] mt-3 block pt-2 border-t border-slate-200/60">
                  Oakland County 6th Circuit Court Venue
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "macomb" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in duration-200">
            {macombAreas.map((area, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-[#f8fafc] p-4 flex flex-col justify-between hover:border-[#534AB7]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-[#0a0f2e] mb-1">
                    <MapPin className="h-4 w-4 text-[#534AB7] shrink-0" />
                    <span>{area.name}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {area.note}
                  </p>
                </div>
                <span className="text-[10px] font-semibold text-[#534AB7] mt-3 block pt-2 border-t border-slate-200/60">
                  Macomb County 16th Circuit Court Venue
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "michigan" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in duration-200">
            {michiganMarkets.map((market, idx) => (
              <Link
                key={idx}
                href={market.href}
                className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between shadow-2xs hover:border-[#534AB7] hover:shadow-sm transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7] bg-[#EEEDFE] px-2.5 py-0.5 rounded-full">
                      {market.badge}
                    </span>
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#534AB7] group-hover:translate-x-1 transition-all" />
                  </div>
                  <h4 className="text-base font-bold text-[#0a0f2e] group-hover:text-[#534AB7] transition-colors">
                    {market.name}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                    {market.desc}
                  </p>
                </div>
                <span className="text-xs font-bold text-[#534AB7] mt-4 flex items-center gap-1">
                  <span>View location intelligence</span>
                  <span>→</span>
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* Deep Contextual Legal SEO Silo Interlinking Strip */}
        <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Building2 className="h-4 w-4 text-[#534AB7]" />
            <span>SearchPrex Core Legal SEO Silos &amp; Research</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <Link
              href="/services/law-firm-seo"
              className="p-3 rounded-xl bg-white border border-slate-200 hover:border-[#534AB7] transition-colors group"
            >
              <strong className="block text-slate-900 group-hover:text-[#534AB7]">Law Firm SEO Architecture</strong>
              <span className="text-slate-500 text-[11px]">How we structure high-intent practice silos</span>
            </Link>

            <Link
              href="/case-studies"
              className="p-3 rounded-xl bg-white border border-slate-200 hover:border-[#534AB7] transition-colors group"
            >
              <strong className="block text-slate-900 group-hover:text-[#534AB7]">Verified Case Studies</strong>
              <span className="text-slate-500 text-[11px]">GSC screenshots &amp; +227% organic revenue proof</span>
            </Link>

            <Link
              href="/why-us"
              className="p-3 rounded-xl bg-white border border-slate-200 hover:border-[#534AB7] transition-colors group"
            >
              <strong className="block text-slate-900 group-hover:text-[#534AB7]">Founder-Led Execution</strong>
              <span className="text-slate-500 text-[11px]">Zero junior account managers or fluff</span>
            </Link>

            <Link
              href="/free-audit"
              className="p-3 rounded-xl bg-white border border-slate-200 hover:border-[#534AB7] transition-colors group"
            >
              <strong className="block text-slate-900 group-hover:text-[#534AB7]">Free 24h Diagnostic Audit</strong>
              <span className="text-slate-500 text-[11px]">Wayne County competitor gap teardown</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
