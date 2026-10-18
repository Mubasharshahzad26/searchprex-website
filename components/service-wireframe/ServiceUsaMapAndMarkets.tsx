"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface UsaMarketPin {
  id: string;
  city: string;
  state: string;
  stateAbbr: string;
  county: string;
  badge: string;
  href: string;
  stateHubHref?: string;
  mapQuery: string;
  demographics: string;
  courtsAndCorridors: string;
  searchIntentFocus: string;
  submarkets: Array<{ name: string; href?: string }>;
}

export const USA_SERVED_MARKETS: UsaMarketPin[] = [
  {
    id: "usa-overview",
    city: "United States (National & Regional Hubs)",
    state: "United States",
    stateAbbr: "USA",
    county: "9 Core States · 22+ Active Metro & Suburb Hubs",
    badge: "USA National & Regional Coverage",
    href: "/locations",
    mapQuery: "United+States",
    demographics:
      "Serving Law Firms, Ecommerce Catalogs, and Local Service Operators across OH, TX, MI, PA, AZ, CA, LA, NM & KS",
    courtsAndCorridors:
      "Cuyahoga County (OH), Fort Bend & Montgomery/Harris (TX), Wayne & Kent (MI), Philadelphia (PA), Maricopa (AZ), Santa Clara (CA), East Baton Rouge & Caddo (LA), Bernalillo (NM), Sedgwick & Johnson (KS)",
    searchIntentFocus:
      "High-intent commercial, local Map Pack Top 3, and AI Overview / ChatGPT citation dominance tailored to state statutes and suburban search behavior.",
    submarkets: [
      { name: "Cleveland, OH (#1 Ranked in Ohio)", href: "/locations/ohio/cleveland" },
      { name: "Sugar Land, TX", href: "/locations/texas/sugar-land" },
      { name: "The Woodlands, TX", href: "/locations/texas/the-woodlands" },
      { name: "Katy, TX", href: "/locations/texas/katy" },
      { name: "Plano, TX", href: "/locations/texas/plano" },
      { name: "Denton, TX", href: "/locations/texas/denton" },
      { name: "Detroit, MI", href: "/locations/michigan/detroit" },
      { name: "Grand Rapids, MI", href: "/locations/michigan/grand-rapids" },
      { name: "Philadelphia, PA", href: "/locations/pennsylvania/philadelphia" },
      { name: "Tempe, AZ", href: "/locations/arizona/tempe" },
      { name: "Scottsdale, AZ", href: "/locations/arizona/scottsdale" },
      { name: "San Jose, CA", href: "/locations/california/san-jose" },
      { name: "Baton Rouge, LA", href: "/locations/louisiana/baton-rouge" },
      { name: "Shreveport, LA", href: "/locations/louisiana/shreveport" },
      { name: "Albuquerque, NM", href: "/locations/new-mexico/albuquerque" },
      { name: "Wichita & Overland Park, KS", href: "/locations/kansas" },
    ],
  },
  {
    id: "cleveland-oh",
    city: "Cleveland",
    state: "Ohio",
    stateAbbr: "OH",
    county: "Cuyahoga County",
    badge: "Ranked #1 on Google in Ohio",
    href: "/locations/ohio/cleveland",
    mapQuery: "Cuyahoga+County+Justice+Center+Cleveland+OH",
    demographics: "1.23M+ Cuyahoga County residents · High industrial, medical & suburban search density",
    courtsAndCorridors:
      "Cuyahoga County Court of Common Pleas, Cleveland Municipal Court, Ohio BWC & Industrial Commission, I-90 / I-77 / I-480",
    searchIntentFocus:
      "Ohio BWC state-fund workers' compensation, personal injury, OVI & criminal defense, and family law across Lakewood, Parma, Beachwood, and Westlake.",
    submarkets: [
      { name: "Downtown Cleveland" },
      { name: "Lakewood, OH" },
      { name: "Parma, OH" },
      { name: "Beachwood, OH" },
      { name: "Westlake, OH" },
      { name: "Shaker Heights, OH" },
    ],
  },
  {
    id: "sugar-land-tx",
    city: "Sugar Land",
    state: "Texas",
    stateAbbr: "TX",
    county: "Fort Bend County",
    badge: "Fort Bend High-Asset Hub",
    href: "/locations/texas/sugar-land",
    stateHubHref: "/locations/texas",
    mapQuery: "Sugar+Land+Town+Square+Sugar+Land+TX",
    demographics: "Affluent Fort Bend County households · Top US ethnic diversity & executive income profile",
    courtsAndCorridors:
      "Fort Bend County District Courts (Richmond, TX), Sugar Land Municipal Court, US-59 / I-69 & SH 99 Grand Parkway",
    searchIntentFocus:
      "Escaping Houston's expensive PPC auction with Fort Bend-specific High-Asset Family Law, Probate & Estate Planning, Business Law, and Personal Injury silos.",
    submarkets: [
      { name: "First Colony & Town Square" },
      { name: "Telfair & Riverstone" },
      { name: "Missouri City, TX" },
      { name: "Richmond & Rosenberg, TX" },
      { name: "Katy, TX", href: "/locations/texas/katy" },
    ],
  },
  {
    id: "the-woodlands-tx",
    city: "The Woodlands",
    state: "Texas",
    stateAbbr: "TX",
    county: "Montgomery & Harris Counties",
    badge: "Executive Township & Conroe Venue Hub",
    href: "/locations/texas/the-woodlands",
    stateHubHref: "/locations/texas",
    mapQuery: "The+Woodlands+Town+Center+The+Woodlands+TX",
    demographics:
      "$145,000+ median household income · Corporate energy executives, business owners & affluent families",
    courtsAndCorridors:
      "Montgomery County District Courts (Conroe, TX) + Harris County Courts (for Creekside Park) · I-45 North & Grand Parkway",
    searchIntentFocus:
      "Unincorporated Township venue clarity (Montgomery vs. Harris County), Estate Planning & Trusts, High-Asset Divorce (RSUs/Oil & Gas), and village-specific pages.",
    submarkets: [
      { name: "Alden Bridge & Sterling Ridge" },
      { name: "Creekside Park (Harris County)" },
      { name: "Cochran's Crossing & Panther Creek" },
      { name: "Spring & Conroe, TX" },
      { name: "Sugar Land, TX", href: "/locations/texas/sugar-land" },
    ],
  },
  {
    id: "katy-plano-denton-tx",
    city: "Katy, Plano & Denton",
    state: "Texas",
    stateAbbr: "TX",
    county: "Harris/Fort Bend/Waller, Collin & Denton Counties",
    badge: "Texas Growth Corridors",
    href: "/locations/texas",
    stateHubHref: "/locations/texas",
    mapQuery: "Plano+TX+Legacy+West",
    demographics: "Fastest-growing Texas suburban metros across West Houston and North Dallas-Fort Worth (DFW)",
    courtsAndCorridors:
      "Collin County Courts (McKinney), Denton County Courts, Tri-County Katy venues (Houston, Richmond, Hempstead), I-10 & I-35E/W",
    searchIntentFocus:
      "Executive RSU divorce & corporate immigration in Plano, tri-county family/injury silos in Katy (Cinco Ranch/Fulshear), and UNT/TWU student & DWI defense in Denton.",
    submarkets: [
      { name: "Katy, TX", href: "/locations/texas/katy" },
      { name: "Plano, TX", href: "/locations/texas/plano" },
      { name: "Denton, TX", href: "/locations/texas/denton" },
      { name: "Sugar Land, TX", href: "/locations/texas/sugar-land" },
      { name: "The Woodlands, TX", href: "/locations/texas/the-woodlands" },
    ],
  },
  {
    id: "michigan-hub",
    city: "Detroit & Grand Rapids",
    state: "Michigan",
    stateAbbr: "MI",
    county: "Wayne, Oakland, Macomb & Kent Counties",
    badge: "Michigan No-Fault & West MI Hubs",
    href: "/locations/michigan",
    stateHubHref: "/locations/michigan",
    mapQuery: "Detroit+MI+Coleman+A+Young+Municipal+Center",
    demographics: "Metro Detroit tri-county industrial hub & West Michigan manufacturing/family-business corridor",
    courtsAndCorridors:
      "Third Circuit Court (Wayne County), 36th District Court, Kent County 17th Circuit Court, I-75 / I-94 / I-96 / US-131",
    searchIntentFocus:
      "Michigan No-Fault PIP reform (MCL § 500.3135) auto & truck accidents, criminal defense, high-asset family law, and local home/commercial services.",
    submarkets: [
      { name: "Detroit, MI", href: "/locations/michigan/detroit" },
      { name: "Grand Rapids, MI", href: "/locations/michigan/grand-rapids" },
      { name: "Dearborn, Livonia & Warren" },
      { name: "Wyoming, Kentwood & Walker" },
    ],
  },
  {
    id: "philadelphia-pa",
    city: "Philadelphia",
    state: "Pennsylvania",
    stateAbbr: "PA",
    county: "Philadelphia County",
    badge: "Neighborhood & Mass Tort Venue Hub",
    href: "/locations/pennsylvania/philadelphia",
    mapQuery: "Philadelphia+City+Hall+Court+of+Common+Pleas",
    demographics: "1.55M+ city residents · Dense neighborhood search patterns & Complex Litigation Center venue",
    courtsAndCorridors:
      "Philadelphia Court of Common Pleas, Complex Litigation Center, Municipal Court, Delaware/Montgomery/Bucks County borders",
    searchIntentFocus:
      "Out-localizing national mass-tort bidders via Center City, Northeast Philly, South Philly & Fishtown neighborhood silos and PA Limited vs. Full Tort clarity.",
    submarkets: [
      { name: "Center City & University City" },
      { name: "Northeast & South Philadelphia" },
      { name: "Fishtown & Manayunk" },
    ],
  },
  {
    id: "arizona-hub",
    city: "Tempe & Scottsdale",
    state: "Arizona",
    stateAbbr: "AZ",
    county: "Maricopa County",
    badge: "East Valley & High-Net-Worth AZ Hubs",
    href: "/locations/arizona",
    stateHubHref: "/locations/arizona",
    mapQuery: "Old+Town+Scottsdale+AZ",
    demographics: "Affluent North Scottsdale/Paradise Valley estates & 75,000+ ASU East Valley corridor in Tempe",
    courtsAndCorridors:
      "Maricopa County Superior Court, Scottsdale City Court, Tempe Municipal Court, Loop 101 & Loop 202",
    searchIntentFocus:
      "Arizona Extreme DUI defense (A.R.S. § 28-1382), Arizona community property high-asset divorce (A.R.S. § 25-211), estate protection, and personal injury.",
    submarkets: [
      { name: "Tempe, AZ", href: "/locations/arizona/tempe" },
      { name: "Scottsdale, AZ", href: "/locations/arizona/scottsdale" },
      { name: "Mesa, Chandler, Gilbert & Paradise Valley" },
    ],
  },
  {
    id: "san-jose-ca",
    city: "San Jose",
    state: "California",
    stateAbbr: "CA",
    county: "Santa Clara County",
    badge: "Silicon Valley Executive Hub",
    href: "/locations/california/san-jose",
    mapQuery: "Santa+Clara+County+Superior+Court+San+Jose+CA",
    demographics: "Silicon Valley tech executives, founders & engineers across Santa Clara County",
    courtsAndCorridors:
      "Santa Clara County Superior Court, US District Court Northern District of CA, US-101 / I-280 / I-880",
    searchIntentFocus:
      "Unvested RSU/ISO divorce division (Huggins/Nelson formulas), California Bus. & Prof. Code § 16600 employment/non-compete disputes, IP & injury.",
    submarkets: [
      { name: "San Jose, CA", href: "/locations/california/san-jose" },
      { name: "Sunnyvale, Cupertino, Mountain View & Palo Alto" },
    ],
  },
  {
    id: "louisiana-nm-ks",
    city: "Baton Rouge, Shreveport, Albuquerque & Kansas",
    state: "LA · NM · KS",
    stateAbbr: "LA/NM/KS",
    county: "East Baton Rouge, Caddo, Bernalillo & Johnson/Sedgwick Counties",
    badge: "Civil Code, Bilingual & Midwest Hubs",
    href: "/locations",
    mapQuery: "19th+Judicial+District+Court+Baton+Rouge+LA",
    demographics: "Louisiana Civil Code parishes, bilingual New Mexico metros, and 8 Kansas commercial hubs",
    courtsAndCorridors:
      "19th JDC (Baton Rouge), 1st JDC (Shreveport), 2nd Judicial District (Albuquerque), Wichita & Overland Park District Courts",
    searchIntentFocus:
      "Louisiana 2-year prescription (art. 3493.1) & 51% fault bar (art. 2323), Ark-La-Tex cross-border injury, bilingual NM DWI/community property, and Kansas metro SEO.",
    submarkets: [
      { name: "Baton Rouge, LA", href: "/locations/louisiana/baton-rouge" },
      { name: "Shreveport, LA", href: "/locations/louisiana/shreveport" },
      { name: "Albuquerque, NM", href: "/locations/new-mexico/albuquerque" },
      { name: "Wichita, KS", href: "/locations/kansas/wichita" },
      { name: "Overland Park, KS", href: "/locations/kansas/overland-park" },
      { name: "Kansas City, KS", href: "/locations/kansas/kansas-city" },
    ],
  },
];

interface ServiceUsaMapAndMarketsProps {
  serviceName: string;
  answerCapsule: string;
}

export default function ServiceUsaMapAndMarkets({
  serviceName,
  answerCapsule,
}: ServiceUsaMapAndMarketsProps) {
  const [activePin, setActivePin] = useState<UsaMarketPin>(USA_SERVED_MARKETS[0]);

  return (
    <section
      id="usa-service-map"
      className="scroll-mt-20 border-b border-slate-200 bg-white py-16 sm:py-24 font-sans"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Clean Black Bold H2 + 45-60 Word AI Overview Answer Capsule */}
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 leading-tight">
            USA States and Cities Where We Deliver {serviceName}
          </h2>

          <p className="mt-4 rounded-xl border-l-4 border-l-neutral-950 border border-slate-200 bg-slate-50 p-4 text-sm sm:text-base font-semibold text-neutral-900 leading-relaxed">
            {answerCapsule}
          </p>
        </div>

        {/* Visual Showcase Cards: 3 Featured USA Law Firm SEO Markets (Compressed WebP, Clean Monochrome Badges) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              num: "01",
              pinId: "cleveland-oh",
              city: "Cleveland, Ohio",
              badge: "Ranked #1 on Google in Ohio",
              courts: "Cuyahoga County Court of Common Pleas & Ohio BWC",
              focus:
                "Personal Injury, Ohio BWC Workers' Comp, OVI & Family Law across Lakewood, Parma & Beachwood.",
              imgSrc: "/images/services/law-firm/city-cleveland-ohio-law-firm-seo.webp",
              imgAlt: "Cleveland Ohio downtown skyline and Cuyahoga County courthouse architecture for Law Firm SEO",
              href: "/locations/ohio/cleveland",
            },
            {
              num: "02",
              pinId: "sugar-land-tx",
              city: "Sugar Land, Texas",
              badge: "Fort Bend High-Asset Hub",
              courts: "Fort Bend County District Courts (Richmond) & US-59",
              focus:
                "High-Asset Divorce, Probate & Estate Planning, and Personal Injury across First Colony, Telfair & Riverstone.",
              imgSrc: "/images/services/law-firm/city-sugar-land-texas-law-firm-seo.webp",
              imgAlt: "Sugar Land Texas Town Square and Fort Bend County civic architecture for Law Firm SEO",
              href: "/locations/texas/sugar-land",
            },
            {
              num: "03",
              pinId: "the-woodlands-tx",
              city: "The Woodlands, Texas",
              badge: "Executive Township Hub",
              courts: "Montgomery County (Conroe) & Harris County Courts",
              focus:
                "Executive RSU/Energy Divorce, Trusts & Estates, and I-45 North Injury across Alden Bridge & Creekside Park.",
              imgSrc: "/images/services/law-firm/city-the-woodlands-texas-law-firm-seo.webp",
              imgAlt: "The Woodlands Texas executive glass towers and waterway architecture for Law Firm SEO",
              href: "/locations/texas/the-woodlands",
            },
          ].map((card) => {
            const isCardActive = activePin.id === card.pinId;
            return (
              <div
                key={card.pinId}
                className={`group overflow-hidden rounded-2xl border bg-white shadow-2xs transition-all ${
                  isCardActive
                    ? "border-neutral-950 ring-1 ring-neutral-950"
                    : "border-slate-200 hover:border-slate-400"
                }`}
              >
                <div className="relative h-44 w-full overflow-hidden bg-neutral-900">
                  <Image
                    src={card.imgSrc}
                    alt={card.imgAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/25 to-transparent" />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-white/95 backdrop-blur-md border border-slate-200 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-neutral-950">
                    <span>{card.num}</span>
                    <span>&middot;</span>
                    <span>{card.badge}</span>
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-lg font-black leading-tight">{card.city}</h3>
                    <p className="text-[11px] text-slate-200 font-medium">{card.courts}</p>
                  </div>
                </div>
                <div className="p-4 flex flex-col justify-between gap-3">
                  <p className="text-xs text-slate-600 leading-relaxed">{card.focus}</p>
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        const found = USA_SERVED_MARKETS.find((m) => m.id === card.pinId);
                        if (found) setActivePin(found);
                      }}
                      className="text-xs font-bold text-slate-700 hover:text-neutral-950 cursor-pointer"
                    >
                      Pinpoint on Map
                    </button>
                    <Link
                      href={card.href}
                      className="inline-flex items-center gap-1 text-xs font-black text-neutral-950 underline hover:text-neutral-700"
                    >
                      <span>View {card.city.split(",")[0]} Hub</span>
                      <ArrowRight className="h-3 w-3 text-neutral-950" aria-hidden />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Pinpoint Selector Pills — Clean Black Bullet Dots */}
        <div className="mt-8">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
            Select Any Pinpointed USA Law Firm SEO Market Below to Inspect Live Map Coordinates &amp; Local Strategy:
          </p>
          <div className="flex flex-wrap gap-2">
            {USA_SERVED_MARKETS.map((pin) => {
              const isSelected = activePin.id === pin.id;
              return (
                <button
                  type="button"
                  key={pin.id}
                  onClick={() => setActivePin(pin)}
                  className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                    isSelected
                      ? "bg-neutral-950 text-white shadow-2xs"
                      : "border border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                      isSelected ? "bg-white" : "bg-neutral-950"
                    }`}
                  />
                  <span>
                    {pin.city} ({pin.stateAbbr})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Map Embed + Single Clean Market Intelligence Card (Duplicate Links Box Removed) */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Embedded Google Map + Active Pinpoint Bar */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-neutral-950">
                  {activePin.city}, {activePin.stateAbbr} — Pinpointed Service Territory
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{activePin.county}</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-md bg-white border border-slate-200 px-3 py-1 text-[11px] font-bold text-neutral-950">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-950" />
                <span>{activePin.badge}</span>
              </span>
            </div>

            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              <iframe
                title={`SearchPrex USA Service Map - ${activePin.city}, ${activePin.state}`}
                src={`https://maps.google.com/maps?q=${activePin.mapQuery}&t=&z=${
                  activePin.id === "usa-overview" ? "4" : "12"
                }&ie=UTF8&iwloc=&output=embed`}
                className="h-full w-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 text-xs">
              <span className="font-semibold text-slate-600">
                One-client-per-niche exclusivity in every pinpointed US city
              </span>
              <Link
                href={activePin.href}
                className="inline-flex items-center gap-1 font-black text-neutral-950 underline hover:text-neutral-700"
              >
                <span>Explore {activePin.city} SEO Page</span>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-950" aria-hidden />
              </Link>
            </div>
          </div>

          {/* Right: Active US Market Demographic, Psychology & Single Clean Location Links List */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-4 shadow-2xs">
              <div className="inline-flex items-center gap-2 rounded-md bg-white border border-slate-200 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-950">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-950" />
                <span>Market Psychology &amp; Local Signals</span>
              </div>

              <h4 className="text-xl font-black text-neutral-950">
                How We Win in {activePin.city}
              </h4>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="rounded-xl bg-white border border-slate-200 p-3.5">
                  <strong className="text-neutral-950 block mb-0.5">
                    01. Target Audience &amp; Demographics:
                  </strong>
                  <span>{activePin.demographics}</span>
                </div>

                <div className="rounded-xl bg-white border border-slate-200 p-3.5">
                  <strong className="text-neutral-950 block mb-0.5">
                    02. Courts, Venues &amp; Commercial Corridors:
                  </strong>
                  <span>{activePin.courtsAndCorridors}</span>
                </div>

                <div className="rounded-xl bg-white border border-slate-200 p-3.5">
                  <strong className="text-neutral-950 block mb-0.5">
                    03. Search Intent &amp; Low-Hanging Opportunity:
                  </strong>
                  <span>{activePin.searchIntentFocus}</span>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Active Markets &amp; Submarkets in This Region:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {activePin.submarkets.map((sub, i) =>
                    sub.href ? (
                      <Link
                        key={i}
                        href={sub.href}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-bold text-neutral-950 hover:bg-neutral-950 hover:text-white transition"
                      >
                        <span>{sub.name}</span>
                        <ArrowRight className="h-3 w-3" aria-hidden />
                      </Link>
                    ) : (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700"
                      >
                        <span className="h-1 w-1 rounded-full bg-neutral-950" />
                        <span>{sub.name}</span>
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
