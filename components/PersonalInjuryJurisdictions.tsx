"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Scale,
  ShieldCheck,
  AlertTriangle,
  MapPin,
  Building2,
  Hospital,
  Truck,
  ArrowRight,
  Gavel,
  CheckCircle2,
} from "lucide-react";

interface JurisdictionData {
  id: string;
  state: string;
  stateAbbr: string;
  badge: string;
  headline: string;
  summary: string;
  stateHubHref?: string;
  statute: {
    rule: string;
    code: string;
    explanation: string;
    barEthicsNote: string;
  };
  corridors: Array<{ name: string; detail: string }>;
  hospitals: Array<{ name: string; type: string; city: string }>;
  keywordSilos: string[];
  cities: Array<{ name: string; county: string; href: string }>;
}

const JURISDICTIONS: JurisdictionData[] = [
  {
    id: "texas",
    state: "Texas",
    stateAbbr: "TX",
    badge: "5 Active Metro Hubs",
    headline: "Texas Personal Injury SEO: High-Density Energy & Freight Corridors",
    summary:
      "Texas tort law operates under Proportionate Responsibility, while rapid population expansion across Houston and DFW has turned suburban freight highways into catastrophic collision hotspots. We optimize your firm for case-type demand rather than broad vanity keywords.",
    stateHubHref: "/locations/texas",
    statute: {
      rule: "51% Modified Comparative Fault Bar",
      code: "Tex. Civ. Prac. & Rem. Code § 33.001",
      explanation:
        "Claimants barred from recovery if found greater than 50% responsible. Content must explain proportionate responsibility clearly so injured drivers understand why partial fault does not automatically extinguish a claim.",
      barEthicsNote:
        "Compliant with Texas Disciplinary Rules 7.01–7.07: Past settlement figures are framed with underlying case facts and required disclaimers, avoiding unwarranted expectations.",
    },
    corridors: [
      {
        name: "I-10 Energy Corridor & Katy Freeway",
        detail: "Commercial 18-wheeler, petrochemical hauler, and commuter multi-vehicle pileups across Harris and Fort Bend counties.",
      },
      {
        name: "I-35 & I-45 Freight Arteries",
        detail: "Continuous interstate cross-country logistics traffic linking Houston, Dallas-Fort Worth, and Austin metro hubs.",
      },
      {
        name: "Grand Parkway (TX-99) & Beltway 8",
        detail: "Rapidly expanding tollway and suburban commuter corridors around Sugar Land, Katy, and The Woodlands.",
      },
    ],
    hospitals: [
      { name: "Memorial Hermann - Texas Medical Center", type: "Level-1 Adult & Pediatric Trauma", city: "Houston" },
      { name: "Ben Taub Hospital (Harris Health)", type: "Level-1 Trauma Center", city: "Houston" },
      { name: "Medical City Plano", type: "Level-1 Trauma Facility", city: "Plano" },
      { name: "Memorial Hermann Katy Hospital", type: "Emergency Receiving & Surgical", city: "Katy" },
    ],
    keywordSilos: [
      "katy 18 wheeler accident lawyer",
      "sugar land commercial truck crash attorney",
      "plano catastrophic brain injury lawyer",
      "the woodlands wrongful death attorney",
      "denton highway accident law firm",
    ],
    cities: [
      { name: "Sugar Land", county: "Fort Bend County", href: "/locations/texas/sugar-land" },
      { name: "Katy", county: "Harris / Fort Bend County", href: "/locations/texas/katy" },
      { name: "Plano", county: "Collin County", href: "/locations/texas/plano" },
      { name: "The Woodlands", county: "Montgomery County", href: "/locations/texas/the-woodlands" },
      { name: "Denton", county: "Denton County", href: "/locations/texas/denton" },
    ],
  },
  {
    id: "michigan",
    state: "Michigan",
    stateAbbr: "MI",
    badge: "Detroit & Grand Rapids",
    headline: "Michigan Personal Injury SEO: Navigating Post-2019 No-Fault PIP Reform",
    summary:
      "Michigan auto injury search is governed by the 2019 No-Fault insurance overhaul. While competitors still run generic pre-reform copy, we build structured explainers answering what drivers' PIP tiers actually cover and when third-party tort claims apply.",
    stateHubHref: "/locations/michigan",
    statute: {
      rule: "No-Fault PIP Choice & 51% Noneconomic Fault Bar",
      code: "MCL 500.3107c & MCL 600.2959",
      explanation:
        "Drivers select PIP medical coverage tiers instead of automatic lifetime benefits. Searchers actively look up who pays hospital bills when PIP caps are hit and when serious impairment thresholds allow a tort lawsuit.",
      barEthicsNote:
        "Michigan Rules of Professional Conduct Rule 7.1 compliance: Clear distinction between first-party PIP claims and third-party pain and suffering suits, with zero misleading outcome claims.",
    },
    corridors: [
      {
        name: "I-94 & I-75 Industrial Expressways",
        detail: "Heavy auto manufacturing freight, winter weather black-ice collisions, and multi-vehicle commercial pileups.",
      },
      {
        name: "I-96 & Lodge Freeway (M-10)",
        detail: "High-speed commuter congestion connecting downtown Detroit with Wayne and Oakland County suburbs.",
      },
      {
        name: "US-131 & I-196 (West Michigan)",
        detail: "Primary West Michigan commercial trucking transit passing through Kent County and Grand Rapids.",
      },
    ],
    hospitals: [
      { name: "Detroit Receiving Hospital (DMC)", type: "Level-1 Adult Emergency Trauma", city: "Detroit" },
      { name: "Corewell Health William Beaumont", type: "Level-1 Trauma Center", city: "Royal Oak" },
      { name: "Corewell Health Butterworth Hospital", type: "Level-1 Trauma Center", city: "Grand Rapids" },
    ],
    keywordSilos: [
      "detroit no fault auto injury lawyer",
      "michigan pip medical benefits denied attorney",
      "grand rapids car accident lawyer seo",
      "wayne county commercial truck crash attorney",
    ],
    cities: [
      { name: "Detroit", county: "Wayne County", href: "/locations/michigan/detroit" },
      { name: "Grand Rapids", county: "Kent County", href: "/locations/michigan/grand-rapids" },
    ],
  },
  {
    id: "pennsylvania",
    state: "Pennsylvania",
    stateAbbr: "PA",
    badge: "Philadelphia Metro",
    headline: "Pennsylvania Personal Injury SEO: Complex Catastrophic Torts",
    summary:
      "Home to the Philadelphia Court of Common Pleas Complex Litigation Center—nationally renowned for substantial catastrophic injury verdicts—Pennsylvania requires deep local corridor and venue positioning.",
    statute: {
      rule: "Modified Comparative Negligence (51% Rule)",
      code: "42 Pa.C.S. § 7102 & Full vs. Limited Tort",
      explanation:
        "Plaintiffs can recover if plaintiff negligence is not greater than the defendants' combined negligence. Content also disambiguates Full Tort vs. Limited Tort auto policy election consequences.",
      barEthicsNote:
        "Pennsylvania Rules of Professional Conduct Rule 7.1–7.5: Verifiable factual case reporting without subjective superlatives like 'top' or 'best' trial lawyer.",
    },
    corridors: [
      {
        name: "Roosevelt Boulevard (US Route 1)",
        detail: "Documented as one of America's deadliest arterial corridors with frequent high-speed pedestrian and multi-car crashes.",
      },
      {
        name: "I-76 Schuylkill Expressway",
        detail: "Narrow, highly congested freight corridor with limited shoulders, resulting in severe bottleneck wrecks.",
      },
      {
        name: "I-95 Delaware Expressway",
        detail: "Heavy industrial commercial freight corridor traversing Philadelphia County and the Delaware River ports.",
      },
    ],
    hospitals: [
      { name: "Penn Presbyterian Medical Center", type: "Level-1 Regional Trauma Center", city: "Philadelphia" },
      { name: "Thomas Jefferson University Hospital", type: "Level-1 Regional Trauma", city: "Philadelphia" },
      { name: "Temple University Hospital", type: "Level-1 Urban Trauma Center", city: "North Philadelphia" },
    ],
    keywordSilos: [
      "philadelphia catastrophic injury lawyer",
      "schuylkill expressway car accident attorney",
      "roosevelt boulevard crash lawyer",
      "pennsylvania commercial vehicle injury law firm",
    ],
    cities: [
      { name: "Philadelphia", county: "Philadelphia County", href: "/locations/pennsylvania/philadelphia" },
    ],
  },
  {
    id: "california",
    state: "California",
    stateAbbr: "CA",
    badge: "Silicon Valley & Santa Clara",
    headline: "California Personal Injury SEO: Tech Corridors & Pure Comparative Fault",
    summary:
      "Silicon Valley’s intense commuter traffic and high-volume rideshare usage create unique injury search demands. We position firms to capture tech corridor commercial, motorcycle, and catastrophic claims.",
    statute: {
      rule: "Pure Comparative Negligence Standard",
      code: "Nga Li v. Yellow Cab Co. & Cal. Civ. Code § 3333.4 (Prop 213)",
      explanation:
        "A plaintiff can recover damages even if 90% at fault (reduced by their fault share). However, Prop 213 strictly limits uninsured drivers from recovering non-economic damages, a vital distinction searchers research.",
      barEthicsNote:
        "California State Bar Rule 1-400 / Rules 7.1–7.5: Mandatory disclaimers on dramatizations, past results, and clear identification of advertising.",
    },
    corridors: [
      {
        name: "US-101 (Bayshore Freeway)",
        detail: "Silicon Valley tech commuter corridor with heavy morning/evening multi-vehicle and rideshare crashes.",
      },
      {
        name: "I-280 (Junipero Serra Freeway)",
        detail: "High-speed arterial traversing the Peninsula and South Bay with severe rollover collisions.",
      },
      {
        name: "I-880 (Nimitz Freeway)",
        detail: "Heavy commercial logistics and port transport artery between San Jose and the East Bay.",
      },
    ],
    hospitals: [
      { name: "Santa Clara Valley Medical Center", type: "Level-1 Trauma & Burn Center", city: "San Jose" },
      { name: "Regional Medical Center of San Jose", type: "Level-2 Emergency Trauma Center", city: "San Jose" },
      { name: "Stanford Health Care", type: "Level-1 Adult & Pediatric Trauma", city: "Palo Alto" },
    ],
    keywordSilos: [
      "san jose commercial truck accident lawyer",
      "silicon valley rideshare crash attorney",
      "santa clara county catastrophic injury law firm",
      "us 101 auto accident attorney",
    ],
    cities: [
      { name: "San Jose", county: "Santa Clara County", href: "/locations/california/san-jose" },
    ],
  },
  {
    id: "arizona",
    state: "Arizona",
    stateAbbr: "AZ",
    badge: "Scottsdale & Tempe Hubs",
    headline: "Arizona Personal Injury SEO: East Valley Arterials & Pure Fault",
    summary:
      "Covering Maricopa County’s booming East Valley, where high-speed freeway loops and tourist transit create substantial motor vehicle and pedestrian claims.",
    stateHubHref: "/locations/arizona",
    statute: {
      rule: "Pure Comparative Fault",
      code: "A.R.S. § 12-2505 & 2-Year Limitation (A.R.S. § 12-542)",
      explanation:
        "Damages are reduced in direct proportion to fault. Arizona's strict 2-year statute of limitations requires urgency in content messaging for personal injury claims.",
      barEthicsNote:
        "State Bar of Arizona Rule 42, ER 7.1: Transparent fee structure disclosures and prohibition of unjustified expectations regarding case valuation.",
    },
    corridors: [
      {
        name: "Loop 101 (Pima Freeway)",
        detail: "High-speed suburban loop skirting Scottsdale and Tempe with frequent rush-hour rear-end and T-bone collisions.",
      },
      {
        name: "Loop 202 (Red Mountain / Santan)",
        detail: "Cross-valley east-west artery with heavy logistics and commercial fleet traffic.",
      },
      {
        name: "I-10 (Papago & Maricopa Freeways)",
        detail: "Primary interstate trucking artery experiencing severe commercial freight collisions.",
      },
    ],
    hospitals: [
      { name: "Banner - University Medical Center", type: "Level-1 Trauma Facility", city: "Phoenix" },
      { name: "HonorHealth Scottsdale Osborn Medical Center", type: "Level-1 Trauma Center", city: "Scottsdale" },
      { name: "Valleywise Health Medical Center", type: "Level-1 Trauma & Arizona Burn Center", city: "Phoenix" },
    ],
    keywordSilos: [
      "scottsdale car accident lawyer seo",
      "tempe commercial truck accident attorney",
      "loop 101 freeway crash injury lawyer",
      "maricopa county wrongful death law firm",
    ],
    cities: [
      { name: "Scottsdale", county: "Maricopa County", href: "/locations/arizona/scottsdale" },
      { name: "Tempe", county: "Maricopa County", href: "/locations/arizona/tempe" },
    ],
  },
  {
    id: "louisiana",
    state: "Louisiana",
    stateAbbr: "LA",
    badge: "Baton Rouge & Shreveport",
    headline: "Louisiana Personal Injury SEO: Napoleonic Civil Code & Strict Deadlines",
    summary:
      "Louisiana’s civil law system features direct action against insurance carriers and America’s shortest general personal injury prescriptive period (1 year).",
    stateHubHref: "/locations/louisiana",
    statute: {
      rule: "Pure Comparative Fault & 1-Year Prescription",
      code: "La. Civ. Code Art. 2315 & Art. 3492",
      explanation:
        "Victims have only 1 year from the date of the accident to file a lawsuit (prescription). Urgent, deadline-aware content converts searchers who are running out of time.",
      barEthicsNote:
        "Louisiana State Bar Association Rule 7.1–7.10: Strict filing and pre-approval rules for lawyer advertising; zero dramatizations without prominent disclaimers.",
    },
    corridors: [
      {
        name: "I-10 Mississippi River Bridge (Baton Rouge)",
        detail: "Notorious bottleneck with frequent hazardous materials, chemical carrier, and multi-vehicle commercial wrecks.",
      },
      {
        name: "I-12 Corridor",
        detail: "Primary southern transit bypass carrying continuous cross-country 18-wheeler haulers.",
      },
      {
        name: "I-20 North Louisiana Freightway",
        detail: "Main artery through Shreveport handling heavy freight between Texas and eastern distribution points.",
      },
    ],
    hospitals: [
      { name: "Our Lady of the Lake Regional Medical Center", type: "Level-1 Trauma Center", city: "Baton Rouge" },
      { name: "Ochsner LSU Health Shreveport", type: "Level-1 Academic Trauma Center", city: "Shreveport" },
    ],
    keywordSilos: [
      "baton rouge 18 wheeler accident lawyer",
      "shreveport car accident attorney",
      "louisiana 1 year personal injury prescription lawyer",
      "i-10 bridge crash attorney",
    ],
    cities: [
      { name: "Baton Rouge", county: "East Baton Rouge Parish", href: "/locations/louisiana/baton-rouge" },
      { name: "Shreveport", county: "Caddo Parish", href: "/locations/louisiana/shreveport" },
    ],
  },
  {
    id: "ohio",
    state: "Ohio",
    stateAbbr: "OH",
    badge: "Cleveland & Cuyahoga",
    headline: "Ohio Personal Injury SEO: Lake Erie Industrial Arteries & Tort Caps",
    summary:
      "Covering Cleveland and Northeast Ohio’s heavy industrial manufacturing transit, addressing Ohio's statutory noneconomic damages caps and modified comparative negligence.",
    statute: {
      rule: "51% Modified Comparative Fault & Damage Caps",
      code: "R.C. § 2315.33 & R.C. § 2315.18",
      explanation:
        "Recovery is barred if plaintiff is more than 50% at fault. Ohio also imposes statutory caps on noneconomic damages for non-catastrophic claims, making catastrophic proof vital.",
      barEthicsNote:
        "Ohio Rules of Professional Conduct Rule 7.1: Fact-based communication prohibiting guarantees of outcome or unsubstantiated past settlement averages.",
    },
    corridors: [
      {
        name: "I-90 Lake Erie Corridor & Dead Man's Curve",
        detail: "High-risk winter lake-effect snow squall pileups and sharp downtown Cleveland freeway transitions.",
      },
      {
        name: "I-77 & I-480 Commercial Bypass",
        detail: "Heavy industrial supply logistics intersecting Cuyahoga County manufacturing centers.",
      },
    ],
    hospitals: [
      { name: "MetroHealth System Main Campus", type: "Level-1 Adult Comprehensive Trauma", city: "Cleveland" },
      { name: "Cleveland Clinic Main Campus", type: "Specialized Emergency Receiving", city: "Cleveland" },
      { name: "University Hospitals Cleveland Medical Center", type: "Level-1 Adult & Pediatric Trauma", city: "Cleveland" },
    ],
    keywordSilos: [
      "cleveland commercial truck crash lawyer",
      "cuyahoga county catastrophic injury attorney",
      "i 90 accident lawyer ohio",
      "cleveland wrongful death law firm",
    ],
    cities: [
      { name: "Cleveland", county: "Cuyahoga County", href: "/locations/ohio/cleveland" },
    ],
  },
  {
    id: "new-mexico",
    state: "New Mexico",
    stateAbbr: "NM",
    badge: "Albuquerque Metro",
    headline: "New Mexico Personal Injury SEO: The 'Big I' Interchange & Desert Interstates",
    summary:
      "Albuquerque serves as the crossroads of I-40 and I-25. Long transit stretches through Bernalillo County produce severe high-speed catastrophic commercial trucking and rollover claims.",
    statute: {
      rule: "Pure Comparative Negligence & 3-Year Limitation",
      code: "Scott v. Rizzo & NMSA 1978 § 37-1-8",
      explanation:
        "New Mexico adopts pure comparative fault, allowing recovery regardless of plaintiff fault percentage. Victims have 3 years to file personal injury claims.",
      barEthicsNote:
        "New Mexico Rules of Professional Conduct Rule 16-701: Accurate factual advertising with verified jurisdictional practice certifications.",
    },
    corridors: [
      {
        name: "'The Big I' Interchange (I-40 & I-25)",
        detail: "The busiest multi-level freeway junction in New Mexico with constant commercial shipping through-traffic.",
      },
      {
        name: "Coors Boulevard & Paseo del Norte",
        detail: "High-density Westside Albuquerque commuter arterials with frequent high-impact intersection collisions.",
      },
    ],
    hospitals: [
      { name: "UNM Hospital (University of New Mexico)", type: "New Mexico's Only Level-1 Trauma Center", city: "Albuquerque" },
      { name: "Presbyterian Hospital", type: "Major Emergency & Intensive Care", city: "Albuquerque" },
    ],
    keywordSilos: [
      "albuquerque truck accident lawyer",
      "i 40 commercial crash attorney new mexico",
      "bernalillo county catastrophic injury law firm",
      "the big i freeway accident lawyer",
    ],
    cities: [
      { name: "Albuquerque", county: "Bernalillo County", href: "/locations/new-mexico/albuquerque" },
    ],
  },
];

export default function PersonalInjuryJurisdictions() {
  const [selectedStateId, setSelectedStateId] = useState<string>("texas");
  const activeData = JURISDICTIONS.find((j) => j.id === selectedStateId) || JURISDICTIONS[0];

  return (
    <section id="usa-jurisdictions" className="scroll-mt-20 border-b border-slate-200 bg-slate-50/70 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 border border-emerald-200/80">
            <Scale className="h-3.5 w-3.5" />
            U.S. Multi-State Practice Coverage
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            State-by-State Personal Injury SEO Architecture
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            A catastrophic 18-wheeler crash on Houston’s I-10 involves different fault statutes, hospital trauma systems, and bar advertising ethics than a no-fault auto claim on Detroit’s I-94 or Philadelphia’s Roosevelt Boulevard. Select your state to review how SearchPrex structures your market.
          </p>
        </div>

        {/* State Selection Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
          {JURISDICTIONS.map((j) => {
            const isSelected = j.id === selectedStateId;
            return (
              <button
                key={j.id}
                type="button"
                onClick={() => setSelectedStateId(j.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-slate-950 text-white shadow-md"
                    : "border border-slate-300/80 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-100/70"
                }`}
              >
                <span>{j.state}</span>
                <span className={`text-xs ${isSelected ? "text-emerald-400" : "text-slate-400"}`}>
                  ({j.stateAbbr})
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected State Detailed Card */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Top Banner of Selected State */}
          <div className="border-b border-slate-100 bg-slate-900 px-6 py-6 text-white sm:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-500/20 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/30">
                    {activeData.badge}
                  </span>
                  <span className="text-xs text-slate-400">Jurisdictional Silo</span>
                </div>
                <h3 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                  {activeData.headline}
                </h3>
              </div>
              {activeData.stateHubHref && (
                <Link
                  href={activeData.stateHubHref}
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/20"
                >
                  View {activeData.state} State Hub <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">
              {activeData.summary}
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* 1. Legal Statute Hook & Bar Ethics Guardrail */}
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <Gavel className="h-4 w-4 text-[#534AB7]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#534AB7]">
                  Statutory Hook & State Bar Rule
                </span>
              </div>
              <h4 className="mt-2 text-lg font-black text-slate-950">
                {activeData.statute.rule} · <span className="font-mono text-sm text-slate-600 font-semibold">{activeData.statute.code}</span>
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                {activeData.statute.explanation}
              </p>
              <div className="mt-3 border-t border-indigo-100 pt-3 text-xs text-slate-600 font-medium flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Advertising Ethics Guardrail:</strong> {activeData.statute.barEthicsNote}</span>
              </div>
            </div>

            {/* 2. Grid: Corridors vs Hospitals */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Freight Corridors */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Truck className="h-4 w-4 text-emerald-600" />
                  <span>High-Risk Freight & Crash Corridors</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Targeted highway corridors where severe multi-vehicle collisions frequently occur:
                </p>
                <div className="mt-4 space-y-3">
                  {activeData.corridors.map((c) => (
                    <div key={c.name} className="border-l-2 border-slate-300 pl-3">
                      <p className="text-sm font-black text-slate-900">{c.name}</p>
                      <p className="text-xs leading-relaxed text-slate-600">{c.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trauma Hospitals */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Hospital className="h-4 w-4 text-rose-600" />
                  <span>Emergency Trauma Hospital Receiving Citations</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Matches local entity signals when accident victims search from ER facilities:
                </p>
                <div className="mt-4 space-y-3">
                  {activeData.hospitals.map((h) => (
                    <div key={h.name} className="border-l-2 border-slate-300 pl-3">
                      <p className="text-sm font-black text-slate-900">{h.name}</p>
                      <p className="text-xs text-slate-600 font-medium">
                        {h.type} · <span className="text-slate-500">{h.city}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Keyword Silos */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-black uppercase tracking-wider text-slate-500">
                Representative High-Intent Search Silos in {activeData.state}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeData.keywordSilos.map((kw) => (
                  <span
                    key={kw}
                    className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-800"
                  >
                    “{kw}”
                  </span>
                ))}
              </div>
            </div>

            {/* 4. Active City Spokes */}
            <div className="border-t border-slate-200 pt-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-black uppercase tracking-wider text-slate-900">
                    Active SearchPrex Metro Landing Pages in {activeData.state}
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-500">
                    One law firm per city policy actively enforced in each market:
                  </p>
                </div>
                <a
                  href="#hero-form"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-950 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
                >
                  Lock In Your {activeData.state} Metro Exclusivity <ArrowRight className="h-3 w-3" />
                </a>
              </div>

              <div className="mt-4 flex flex-wrap gap-2.5">
                {activeData.cities.map((city) => (
                  <Link
                    key={city.href}
                    href={city.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-800 transition hover:border-slate-500 hover:bg-slate-50"
                  >
                    <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                    <span>{city.name}</span>
                    <span className="text-slate-400 font-normal">({city.county})</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Multi-State Guarantee Callout */}
        <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-8 w-8 text-emerald-600 shrink-0" />
            <div>
              <p className="text-sm font-black text-slate-950">
                Strict One Law Firm Per City Exclusivity Rule
              </p>
              <p className="text-xs leading-relaxed text-slate-600">
                We never optimize a competitor against your firm in the same metro market. Check whether your practice territory is available.
              </p>
            </div>
          </div>
          <a
            href="#hero-form"
            className="shrink-0 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-emerald-700"
          >
            Check City Territory Availability
          </a>
        </div>
      </div>
    </section>
  );
}
