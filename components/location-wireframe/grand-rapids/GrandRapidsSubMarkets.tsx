"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Landmark, MapPin, Scale, Search, CheckCircle2 } from "lucide-react";

interface SubMarketData {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  searches: string[];
  venues: string[];
}

const SUB_MARKETS: SubMarketData[] = [
  {
    id: "downtown",
    name: "Downtown Grand Rapids",
    subtitle: "Courthouse Corridor & Central Legal District",
    description:
      "Courthouse-adjacent, urgent searches for criminal defense, high-conflict family law, and serious personal injury. Searchers expect attorneys who walk into the 17th Circuit Court daily.",
    searches: [
      '"divorce lawyer downtown Grand Rapids"',
      '"criminal defense attorney Grand Rapids MI"',
      '"DUI attorney near me"',
      '"car accident lawyer downtown Grand Rapids"',
    ],
    venues: [
      "Kent County Circuit Court (17th Circuit Court - 180 Ottawa Ave NW)",
      "61st District Court (City of Grand Rapids matters)",
      "U.S. District Court, Western District of Michigan",
      "Grand Rapids Bar Association (Monroe Center NW)",
    ],
  },
  {
    id: "east-gr",
    name: "East Grand Rapids",
    subtitle: "Affluent Residential & High-Asset Division",
    description:
      "High-net-worth divorce, complex marital asset division, closely held business valuation, and generational estate planning around Reeds Lake and Wealthy Street corridors.",
    searches: [
      '"high asset divorce attorney East Grand Rapids"',
      '"estate planning lawyer East Grand Rapids MI"',
      '"trust administration attorney Reeds Lake"',
      '"family law mediation East Grand Rapids"',
    ],
    venues: [
      "Kent County Probate Court (estate and trust disputes)",
      "17th Circuit Court Family Division",
      "Private family mediation centers across Breton / Wealthy corridor",
      "Local wealth management & accounting advisory practices",
    ],
  },
  {
    id: "wyoming",
    name: "Wyoming",
    subtitle: "Dense Commercial & Industrial Corridor",
    description:
      "Manufacturing hub with heavy personal injury demand along US-131, industrial workplace liability, and local municipal criminal defense cases.",
    searches: [
      '"car accident lawyer Wyoming MI"',
      '"workers comp attorney Wyoming Michigan"',
      '"traffic ticket lawyer Wyoming"',
      '"personal injury attorney near 28th Street"',
    ],
    venues: [
      "62A District Court (City of Wyoming)",
      "US-131 / 28th Street collision litigation corridor",
      "Kent County Workers Compensation Bureau",
      "Wyoming Department of Public Safety jurisdiction",
    ],
  },
  {
    id: "kentwood",
    name: "Kentwood",
    subtitle: "Diverse Residential & Suburban Transit Hub",
    description:
      "High-density traffic around M-6 and Broadmoor corridors driving auto accident claims, commercial contract disputes, and family law inquiries.",
    searches: [
      '"auto accident lawyer Kentwood MI"',
      '"child custody attorney Kentwood"',
      '"probate lawyer Kentwood MI"',
      '"bankruptcy attorney near Broadmoor"',
    ],
    venues: [
      "62B District Court (City of Kentwood)",
      "M-6 / Kalamazoo Avenue arterial accident zones",
      "Gerald R. Ford International Airport transit legal corridor",
      "Kentwood municipal legal administration",
    ],
  },
  {
    id: "walker-grandville",
    name: "Walker and Grandville",
    subtitle: "West Suburbs & River Corridor",
    description:
      "Stand Lake and Wilson Ave commercial corridors generating business contracts, commercial vehicle collisions, and residential estate administration.",
    searches: [
      '"personal injury attorney Grandville MI"',
      '"business litigation lawyer Walker MI"',
      '"estate planning attorney Grandville"',
      '"DUI lawyer Wilson Ave"',
    ],
    venues: [
      "59th District Court (Grandville & Walker branches)",
      "I-196 / Wilson Avenue commercial transportation hub",
      "Walker industrial park business litigation",
      "Grandville City Hall jurisdiction",
    ],
  },
];

export default function GrandRapidsSubMarkets() {
  const [activeTab, setActiveTab] = useState<string>("downtown");

  const currentMarket = SUB_MARKETS.find((m) => m.id === activeTab) || SUB_MARKETS[0];

  return (
    <section className="bg-slate-50/70 py-16 sm:py-24 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold text-[#534AB7] uppercase tracking-wider bg-[#EEEDFE] px-3 py-1 rounded-full border border-[#534AB7]/20">
            WEST MICHIGAN, NOT DETROIT
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0f2e] mt-4 tracking-tight">
            A smaller market you can actually win
          </h2>
          <p className="text-[#566070] text-sm sm:text-base mt-2">
            Kent County is a completely different game from Wayne County. Fewer firms have invested in content, which means directories still clog page one. Tap an area to see the exact searches we build for:
          </p>
        </div>

        {/* Sub-market Tabs */}
        <div className="flex flex-wrap gap-2 pb-6 border-b border-slate-200">
          {SUB_MARKETS.map((market) => (
            <button
              key={market.id}
              type="button"
              onClick={() => setActiveTab(market.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === market.id
                  ? "bg-[#534AB7] text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {market.name}
            </button>
          ))}
        </div>

        {/* Active Tab Detail Display */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Info Box */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-7 sm:p-9 border border-slate-200 shadow-sm space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a7d59] uppercase tracking-wider mb-2">
                <MapPin className="w-4 h-4" />
                {currentMarket.subtitle}
              </div>
              <h3 className="text-2xl font-bold text-[#0a0f2e]">
                {currentMarket.name}
              </h3>
              <p className="text-sm text-[#566070] mt-3 leading-relaxed">
                {currentMarket.description}
              </p>
            </div>

            {/* Searches We Target */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0a0f2e] mb-3">
                <Search className="w-4 h-4 text-[#534AB7]" />
                High-Intent Searches We Build For:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentMarket.searches.map((query, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-800 font-mono"
                  >
                    {query}
                  </div>
                ))}
              </div>
            </div>

            {/* Local Anchors */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0a0f2e] mb-3">
                <Landmark className="w-4 h-4 text-[#1a7d59]" />
                Local Anchors In Your Content:
              </div>
              <ul className="space-y-2">
                {currentMarket.venues.map((venue, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#566070]">
                    <CheckCircle2 className="w-4 h-4 text-[#1a7d59] flex-shrink-0 mt-0.5" />
                    <span>{venue}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Visual Box: Photo & Market Reality */}
          <div className="lg:col-span-5 space-y-5">
            <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <Image
                src="/images/locations/grand-rapids-legal-district.webp"
                alt={`${currentMarket.name} courthouse corridor and legal district in Kent County`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f2e]/80 via-[#0a0f2e]/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Kent County Reality
                </p>
                <p className="text-sm font-bold mt-0.5">
                  17th Circuit & Local District Venues
                </p>
              </div>
            </div>

            {/* Competitive Advantage Note */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 text-xs text-[#566070] space-y-2">
              <div className="font-bold text-[#0a0f2e] text-sm">
                Why Suburb Spokes Win In Kent County:
              </div>
              <p>
                Most Grand Rapids law firms only optimize their homepage for &quot;Grand Rapids&quot;. When someone in Wyoming or Kentwood searches for counsel, Google favors localized relevance over generic city-wide pages.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
