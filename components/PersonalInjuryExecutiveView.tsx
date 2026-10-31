"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Scale,
  ShieldCheck,
  MapPin,
  Hospital,
  Truck,
  ArrowRight,
  Gavel,
  CheckCircle2,
  Lock,
  PhoneCall,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Award,
  Zap,
  Check,
  TrendingUp,
  FileText,
  UserCheck,
} from "lucide-react";

import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import type { CityPage } from "@/lib/city-pages";
import type { IndustryPage } from "@/lib/industry-pages";
import { CALL_HREF } from "@/lib/offer";

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
    headline: "Texas Personal Injury SEO: High-Density Energy & Commercial Freight Corridors",
    summary:
      "Texas tort law operates under Proportionate Responsibility, while continuous commercial logistics across Houston and DFW make freight highways catastrophic collision hotspots. We optimize your firm for multi-million dollar commercial coverage rather than low-value fender benders.",
    stateHubHref: "/locations/texas",
    statute: {
      rule: "51% Proportionate Responsibility Fault Bar",
      code: "Tex. Civ. Prac. & Rem. Code § 33.001",
      explanation:
        "Claimants are barred from recovery if found more than 50% responsible. Our content educates injured victims on comparative liability so they understand why partial fault does not extinguish a commercial truck claim.",
      barEthicsNote:
        "Compliant with Texas Disciplinary Rules 7.01–7.07: Past verdicts and settlements are framed with underlying case facts and required disclaimers, avoiding unjustified expectations.",
    },
    corridors: [
      {
        name: "I-10 Energy Corridor & Katy Freeway",
        detail: "Commercial 18-wheeler, petrochemical tanker, and commuter multi-vehicle pileups across Harris and Fort Bend counties.",
      },
      {
        name: "I-35 & I-45 Freight Arteries",
        detail: "Continuous interstate logistics linking Houston, Dallas-Fort Worth, and Austin metro distribution centers.",
      },
      {
        name: "Grand Parkway (TX-99) & Beltway 8",
        detail: "Rapidly expanding high-speed tollway arteries connecting Sugar Land, Katy, and The Woodlands suburbs.",
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
    badge: "Detroit & Grand Rapids Hubs",
    headline: "Michigan Personal Injury SEO: Mastering Post-2019 No-Fault PIP Reform",
    summary:
      "Michigan auto injury litigation is governed by the 2019 No-Fault insurance overhaul. While competitor websites still post outdated pre-reform copy, we engineer structured guides explaining PIP choice tiers and third-party threshold injury requirements.",
    stateHubHref: "/locations/michigan",
    statute: {
      rule: "Post-2019 PIP Choice & Serious Impairment Threshold",
      code: "MCL § 500.3107c & MCL § 500.3135",
      explanation:
        "Third-party pain and suffering claims require showing 'death, serious impairment of body function, or permanent serious disfigurement'. We capture clients searching their specific medical diagnoses and PIP policy caps.",
      barEthicsNote:
        "Compliant with State Bar of Michigan Rule 7.1: Strict factual accuracy without deceptive outcome promises or unverified superlative marketing.",
    },
    corridors: [
      {
        name: "I-94 Industrial Corridor & Detroit Metro",
        detail: "Heavy automotive parts haulers and international freight connecting Detroit, Wayne County logistics hubs, and Chicago.",
      },
      {
        name: "I-96 & US-131 Interchange (Grand Rapids)",
        detail: "West Michigan manufacturing transport corridor experiencing frequent winter weather multi-vehicle pileups.",
      },
      {
        name: "I-75 Logistics Spine",
        detail: "Cross-state commercial trucking artery carrying border trade from Ambassador Bridge north through Wayne and Oakland counties.",
      },
    ],
    hospitals: [
      { name: "Detroit Receiving Hospital", type: "Level-1 Adult Emergency Trauma", city: "Detroit" },
      { name: "Corewell Health Butterworth Hospital", type: "Level-1 Trauma Center", city: "Grand Rapids" },
      { name: "Henry Ford Hospital", type: "Level-1 Emergency & Surgical Trauma", city: "Detroit" },
    ],
    keywordSilos: [
      "detroit no fault auto injury lawyer",
      "grand rapids commercial vehicle accident attorney",
      "michigan pip medical cap lawyer",
      "wayne county serious impairment injury attorney",
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
    badge: "Philadelphia Catastrophic Focus",
    headline: "Pennsylvania Personal Injury SEO: High-Verdict Philadelphia Complex Torts",
    summary:
      "Philadelphia courts are historically recognized as high-verdict venues. We position your firm for complex catastrophic injury cases, Full vs. Limited Tort exceptions, and dangerous urban highway multi-vehicle litigation.",
    stateHubHref: "/locations/pennsylvania",
    statute: {
      rule: "Comparative Negligence & Limited Tort Exceptions",
      code: "42 Pa.C.S. § 7102 & 75 Pa.C.S. § 1705",
      explanation:
        "Recovery is permitted as long as plaintiff fault is not greater than the defendant's (51% bar). Limited Tort selection does not bar non-economic damages if 'serious injury' threshold is proven.",
      barEthicsNote:
        "Pennsylvania Rules of Professional Conduct Rule 7.1 compliant: Clear disclaimers that every case turns on its own factual and legal merits.",
    },
    corridors: [
      {
        name: "Roosevelt Boulevard (US-1)",
        detail: "Consistently ranked among the nation's most hazardous urban multi-lane crash corridors with heavy pedestrian and vehicle collisions.",
      },
      {
        name: "I-95 Delaware Expressway",
        detail: "Major East Coast industrial corridor carrying intense intercity freight through Center City and South Philadelphia.",
      },
      {
        name: "I-76 Schuylkill Expressway",
        detail: "Narrow, high-volume commuter and freight artery with severe congestion and high rollover collision frequency.",
      },
    ],
    hospitals: [
      { name: "Penn Presbyterian Medical Center", type: "Level-1 Adult Trauma Center", city: "Philadelphia" },
      { name: "Temple University Hospital", type: "Level-1 Trauma & Burn Center", city: "Philadelphia" },
      { name: "Jefferson Einstein Hospital", type: "Level-1 Regional Trauma Facility", city: "Philadelphia" },
    ],
    keywordSilos: [
      "philadelphia catastrophic injury lawyer",
      "roosevelt boulevard crash attorney",
      "limited tort exception lawyer pa",
      "center city commercial vehicle collision attorney",
    ],
    cities: [
      { name: "Philadelphia", county: "Philadelphia County", href: "/locations/pennsylvania/philadelphia" },
    ],
  },
  {
    id: "california",
    state: "California",
    stateAbbr: "CA",
    badge: "San Jose & Silicon Valley",
    headline: "California Personal Injury SEO: High-Earning Tech Corridors & Micro-Mobility Torts",
    summary:
      "Silicon Valley combines high-income wage loss claims with heavy commercial and micro-mobility transport accidents. We build authoritative topical clusters targeting corporate vehicle liability, motorcycle crashes, and autonomous vehicle claims.",
    stateHubHref: "/locations/california",
    statute: {
      rule: "Pure Comparative Fault & Prop 213 Constraints",
      code: "Li v. Yellow Cab Co. & Cal. Civ. Code § 3333.4",
      explanation:
        "Claimants can recover even if 99% at fault, proportionate to their responsibility. Prop 213 restricts non-economic recovery for uninsured motorists—critical statutory knowledge clients search immediately.",
      barEthicsNote:
        "California State Bar Rule 1-400 / 7.1 compliant: Professional legal communication avoiding deceptive dramatization or guarantees.",
    },
    corridors: [
      {
        name: "US-101 Bayshore Freeway",
        detail: "Dense tech commuter and delivery fleet spine traversing Silicon Valley from San Jose north through Palo Alto.",
      },
      {
        name: "I-280 & I-880 East Bay Arteries",
        detail: "Heavy freight transit linking the Port of Oakland with Silicon Valley logistics depots.",
      },
      {
        name: "CA-85 & CA-87 Transit Corridors",
        detail: "High-speed South Bay commuter interchanges with severe peak-hour multi-vehicle collision rates.",
      },
    ],
    hospitals: [
      { name: "Santa Clara Valley Medical Center", type: "Level-1 Adult & Pediatric Trauma / Burn", city: "San Jose" },
      { name: "Regional Medical Center of San Jose", type: "Comprehensive Emergency Receiving", city: "San Jose" },
      { name: "Stanford Health Care", type: "Level-1 Trauma Center", city: "Palo Alto / South Bay" },
    ],
    keywordSilos: [
      "san jose commercial delivery truck lawyer",
      "silicon valley catastrophic injury attorney",
      "santa clara county motorcycle crash lawyer",
      "bayshore freeway accident attorney",
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
    headline: "Arizona Personal Injury SEO: High-Velocity Valley Freeway Litigation",
    summary:
      "Maricopa County's rapid growth has turned Valley freeways into severe multi-car collision grounds. We capture searches for high-damage collisions, ride-share accidents, and wrongful death across Scottsdale and the East Valley.",
    stateHubHref: "/locations/arizona",
    statute: {
      rule: "Pure Comparative Negligence Standard",
      code: "A.R.S. § 12-2505 & § 12-542",
      explanation:
        "Arizona allows injured parties to recover damages minus their percentage of fault. Two-year statute of limitations makes immediate legal consultation urgent for claimants.",
      barEthicsNote:
        "State Bar of Arizona Rule 7.1 compliant: Transparent, objective educational content without misleading superlatives.",
    },
    corridors: [
      {
        name: "Loop 101 Pima Freeway",
        detail: "High-speed perimeter freeway serving Scottsdale, North Phoenix, and East Valley business parks.",
      },
      {
        name: "US-60 Superstition Freeway & Loop 202",
        detail: "Heavy commuter volume through Tempe and Mesa with frequent high-speed rear-end and interchange collisions.",
      },
      {
        name: "I-10 Maricopa Freeway",
        detail: "Interstate truck traffic linking Phoenix metro distribution hubs to Tucson and Southern California.",
      },
    ],
    hospitals: [
      { name: "HonorHealth Scottsdale Osborn Medical Center", type: "Level-1 Trauma Facility", city: "Scottsdale" },
      { name: "Valleywise Health Medical Center", type: "Level-1 Trauma & Arizona Burn Center", city: "Phoenix" },
      { name: "Banner - University Medical Center Phoenix", type: "Level-1 Comprehensive Trauma", city: "Phoenix" },
    ],
    keywordSilos: [
      "scottsdale luxury vehicle accident attorney",
      "tempe rideshare injury lawyer",
      "loop 101 freeway crash lawyer",
      "maricopa county wrongful death attorney",
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
    badge: "Baton Rouge & Shreveport Hubs",
    headline: "Louisiana Personal Injury SEO: Direct Action & River Corridor Maritime Torts",
    summary:
      "Louisiana's civil law system features strict one-year delictual prescription and direct action against insurers. We target commercial logistics, industrial plant incidents, and Mississippi River maritime and trucking collisions.",
    stateHubHref: "/locations/louisiana",
    statute: {
      rule: "Comparative Fault & Strict 1-Year Prescription",
      code: "La. Civ. Code Art. 2323 & Art. 3492",
      explanation:
        "Louisiana has a short one-year prescriptive period to file tort claims. Search queries reflect urgency; content highlighting this deadline generates immediate consultation requests.",
      barEthicsNote:
        "Louisiana State Bar Rules of Professional Conduct Rule 7.1–7.10: Proper disclaimers and verified jurisdictional compliance.",
    },
    corridors: [
      {
        name: "I-10 Mississippi River Bridge (Baton Rouge)",
        detail: "One of the most severe bottlenecks in the southeastern U.S. with hazardous petrochemical freight traffic.",
      },
      {
        name: "I-20 Cross-State Artery (Shreveport)",
        detail: "High-volume interstate freight route connecting Texas energy distribution with northern Louisiana hubs.",
      },
      {
        name: "Airline Highway (US-61)",
        detail: "Industrial transit corridor linking Baton Rouge refinery complexes with New Orleans manufacturing plants.",
      },
    ],
    hospitals: [
      { name: "Our Lady of the Lake Regional Medical Center", type: "Level-1 Trauma Center", city: "Baton Rouge" },
      { name: "Ochsner LSU Health Shreveport", type: "Level-1 Regional Trauma Facility", city: "Shreveport" },
      { name: "Baton Rouge General Medical Center", type: "Comprehensive Emergency Services", city: "Baton Rouge" },
    ],
    keywordSilos: [
      "baton rouge 18 wheeler accident lawyer",
      "shreveport commercial truck crash attorney",
      "louisiana 1 year prescription injury lawyer",
      "chemical plant burn injury lawyer baton rouge",
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
    badge: "Cleveland & Cuyahoga County",
    headline: "Ohio Personal Injury SEO: Heavy Manufacturing & Interstate Freight Collisions",
    summary:
      "Cuyahoga County is a critical Midwestern freight junction. We structure SEO campaigns targeting commercial transport liability, tort damages caps exceptions, and severe winter roadway pileups across Greater Cleveland.",
    stateHubHref: "/locations/ohio",
    statute: {
      rule: "51% Modified Comparative Fault & Damages Caps",
      code: "Ohio Rev. Code § 2315.33 & § 2315.18",
      explanation:
        "Plaintiffs barred if more than 50% at fault. Non-economic damages caps have exceptions for catastrophic physical deformities and permanent functional loss—key triggers for high-dollar retained cases.",
      barEthicsNote:
        "Ohio Rules of Professional Conduct Rule 7.1: Clear, objective, evidence-based descriptions of legal processes.",
    },
    corridors: [
      {
        name: "I-90 & Dead Man’s Curve (Cleveland)",
        detail: "Notorious sharp interstate bend with high commercial rollover rates near downtown Cleveland.",
      },
      {
        name: "I-77 & I-480 Logistics Junction",
        detail: "Major freight interchange serving industrial manufacturing distribution across Cuyahoga and Summit counties.",
      },
      {
        name: "I-80 Ohio Turnpike",
        detail: "High-speed cross-country freight tollway with heavy winter multi-semi-truck collisions.",
      },
    ],
    hospitals: [
      { name: "MetroHealth Main Campus", type: "Level-1 Adult & Pediatric Trauma / Burn", city: "Cleveland" },
      { name: "University Hospitals Cleveland Medical Center", type: "Level-1 Comprehensive Trauma", city: "Cleveland" },
      { name: "Cleveland Clinic Main Campus", type: "Level-1 Tertiary Care & Surgical", city: "Cleveland" },
    ],
    keywordSilos: [
      "cleveland commercial truck accident lawyer",
      "cuyahoga county catastrophic injury attorney",
      "dead mans curve crash lawyer cleveland",
      "ohio 51 percent comparative fault attorney",
    ],
    cities: [
      { name: "Cleveland", county: "Cuyahoga County", href: "/locations/ohio/cleveland" },
    ],
  },
  {
    id: "new-mexico",
    state: "New Mexico",
    stateAbbr: "NM",
    badge: "Albuquerque I-25 / I-40 Corridor",
    headline: "New Mexico Personal Injury SEO: The Crossroads of America Freight Corridors",
    summary:
      "Albuquerque sits at the intersection of I-40 and I-25 (The Big I). We engineer SEO architecture for cross-country commercial trucking collisions, pure comparative fault claims, and catastrophic highway wrongful deaths.",
    stateHubHref: "/locations/new-mexico",
    statute: {
      rule: "Pure Comparative Fault Doctrine",
      code: "NMSA 1978 § 41-3A-1",
      explanation:
        "New Mexico recognizes pure comparative fault, holding defendants liable only for their percentage of fault, with several joint liability exceptions for commercial vehicle operators.",
      barEthicsNote:
        "New Mexico Rules of Professional Conduct Rule 16-701: Accurate, informative legal representation with strict factual grounds.",
    },
    corridors: [
      {
        name: "The Big I Interchange (I-40 & I-25)",
        detail: "The busiest interstate interchange in New Mexico handling cross-continental shipping and heavy regional commuting.",
      },
      {
        name: "I-40 East-West Transcontinental Freight Highway",
        detail: "High-speed interstate freight corridor experiencing frequent severe commercial semi-truck collisions.",
      },
      {
        name: "Coors Boulevard (NM-45)",
        detail: "High-density Westside arterial with heavy commercial traffic and frequent intersection crashes.",
      },
    ],
    hospitals: [
      { name: "UNM Hospital (University of New Mexico)", type: "Level-1 Only Trauma Center in New Mexico", city: "Albuquerque" },
      { name: "Presbyterian Hospital", type: "Comprehensive Emergency & Surgical Services", city: "Albuquerque" },
    ],
    keywordSilos: [
      "albuquerque 18 wheeler accident lawyer",
      "the big i truck crash attorney nm",
      "bernalillo county catastrophic injury lawyer",
      "new mexico wrongful death highway attorney",
    ],
    cities: [
      { name: "Albuquerque", county: "Bernalillo County", href: "/locations/new-mexico/albuquerque" },
    ],
  },
];

export default function PersonalInjuryExecutiveView({
  page,
  cities,
}: {
  page: IndustryPage;
  cities: CityPage[];
}) {
  const [activeStateId, setActiveStateId] = useState("texas");
  const activeJurisdiction = JURISDICTIONS.find((j) => j.id === activeStateId) ?? JURISDICTIONS[0];

  const source = `service:law-firm-seo/${page.slug}`;
  const sourcePage = `/services/law-firm-seo/${page.slug}`;

  return (
    <div className="bg-white font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* ── 1. HERO SECTION: Clean Light Enterprise Theme with Hennessey Hook ── */}
      <section className="relative border-b border-slate-200 bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-12 pb-16 sm:pt-16 sm:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Institutional Pill */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-emerald-800">
              <Scale className="h-3.5 w-3.5 text-emerald-600" />
              <span>Personal Injury Law Firm SEO · USA & Multi-State Jurisdictions</span>
            </div>
            <div className="hidden items-center gap-1.5 text-xs text-slate-500 sm:flex">
              <Link href="/services/law-firm-seo" className="hover:text-slate-900 transition">
                Law Firm SEO
              </Link>
              <span>/</span>
              <span className="font-semibold text-slate-800">Personal Injury</span>
            </div>
          </div>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            {/* Left Column: Direct Managing Partner Pitch */}
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">
                The SEO Partner You Wish You’d Hired First
              </p>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl sm:leading-[1.12]">
                Your Law Firm SEO Partner for Higher-Value Leads & More Signed Catastrophic Cases.
              </h1>

              <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
                Most legal marketing agencies deliver low-value fender benders that exhaust your intake team.
                SearchPrex builds authoritative search architecture targeting commercial freight liability,
                interstate trucking corridors, and Level-1 trauma radius catchment across 8 major U.S. states.
              </p>

              {/* 3 Trust Metric Cards */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs font-black text-slate-950">
                    <Lock className="h-3.5 w-3.5 text-emerald-600" /> 1 Firm Per City
                  </div>
                  <p className="mt-1 text-xs text-slate-500">Strict territorial exclusivity enforced</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs font-black text-slate-950">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> State Bar Ethics
                  </div>
                  <p className="mt-1 text-xs text-slate-500">ABA Rule 7.1 & TX/MI/PA compliant</p>
                </div>
                <div className="col-span-2 rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs sm:col-span-1">
                  <div className="flex items-center gap-1.5 text-xs font-black text-slate-950">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> 7-Day Free Trial
                  </div>
                  <p className="mt-1 text-xs text-slate-500">Founder-led reviewable diagnostic sprint</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#jurisdictions"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Explore State Corridors & Statutes <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#hero-form"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 shadow-xs transition hover:border-slate-500 hover:bg-slate-50"
                >
                  Request Market Audit
                </a>
              </div>
            </div>

            {/* Right Column: Founder-Reviewed Intake Sidebar Form */}
            <div id="hero-form" className="relative scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg">
              <div className="absolute -top-3.5 right-6 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-0.5 text-[11px] font-black uppercase tracking-wider text-emerald-800">
                Direct Founder Review
              </div>
              <h2 className="text-xl font-black text-slate-950">
                Request a Personal Injury Practice-Area Search Map
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Send your law firm website and email. Founder Mubashar Sharif will inspect your freight corridors,
                Level-1 trauma radius, and competitor link gaps, replying with your 7-day trial sprint within 24 hours.
              </p>

              <div className="mt-5">
                <ArticleLeadMagnet
                  variant="sidebar"
                  source={source}
                  sourcePage={sourcePage}
                  practiceArea={page.slug}
                  buttonText="Request 7-Day Trial Audit"
                  copy={{
                    eyebrow: "Managing Partner Audit",
                    headline: "Inspect Your Metro Territory",
                    sub: "No junior account managers. You work directly with the founder.",
                    success: "I’ll analyze your local freight corridors and email your practice area search map within 24 hours.",
                  }}
                />
              </div>

              <div className="mt-4 border-t border-slate-200 pt-4 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Confidential & Private
                </span>
                <span>Founder replies in &lt; 24h</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. HENNESSEY APPROACH: "YOU'RE IN THE RIGHT PLACE IF" ── */}
      <section className="border-b border-slate-200 bg-slate-50 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">
              Clear Alignment for Serious Trial Lawyers
            </p>
            <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
              You’re in the Right Place if:
            </h2>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="inline-flex rounded-lg bg-emerald-100 p-2 text-emerald-800">
                <Check className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-black text-slate-950">You’re tired of empty vanity metrics.</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Rankings for generic terms that only attract minor property damage or disputed low-limit claims
                waste your intake team’s valuable time. You want signed catastrophic cases.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="inline-flex rounded-lg bg-emerald-100 p-2 text-emerald-800">
                <Check className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-black text-slate-950">You crave direct, intelligent communication.</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                You don’t want to talk to an entry-level account manager who doesn’t know the difference between
                Texas Proportionate Responsibility and Michigan No-Fault PIP reform.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="inline-flex rounded-lg bg-emerald-100 p-2 text-emerald-800">
                <Check className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-black text-slate-950">You insist on true market exclusivity.</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Traditional agencies pitch 5 competitors in the same city. We strictly enforce ONE law firm per
                metropolitan market, guaranteeing zero internal conflicts of interest.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. HENNESSEY THESIS: "SEO FOR LAW FIRMS IS A DIFFERENT BEAST" ── */}
      <section className="border-b border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">
                Courtroom Excellence vs. Search Dominance
              </p>
              <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
                SEO for Personal Injury Law Firms is a Different Beast.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-700">
                We won’t sugar-coat it: ranking on page one of Google for high-value personal injury cases
                is the most cutthroat, dog-eat-dog competitive space in search marketing.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Top-tier attorneys understand courtroom persuasion and trial strategy, but translating that
                into high-converting organic dominance requires reverse-engineering local search intent,
                state-specific tort thresholds, and commercial freight liability.
              </p>
              <div className="mt-6 rounded-xl border-l-4 border-emerald-600 bg-slate-50 p-4">
                <p className="text-xs font-bold text-slate-900">
                  {page.answerCapsule}
                </p>
              </div>
            </div>

            {/* Comparison Highlights */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <h3 className="text-lg font-black text-slate-950">Why Standard Agency SEO Fails</h3>
              <ul className="mt-4 space-y-3 text-xs leading-relaxed text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="rounded bg-rose-100 p-1 text-rose-700 font-bold">✕</span>
                  <span><strong>Generic AI Blog Posts:</strong> Low-effort articles like &quot;What to Do After a Car Accident&quot; that attract zero qualified callers.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="rounded bg-rose-100 p-1 text-rose-700 font-bold">✕</span>
                  <span><strong>Ignorance of Tort Statutes:</strong> Treating Michigan the same as Texas, ignoring PIP medical caps and proportionate fault bars.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="rounded bg-rose-100 p-1 text-rose-700 font-bold">✕</span>
                  <span><strong>No Freight Corridor Targeting:</strong> Overlooking high-limit interstate freight routes (I-10, I-94, I-95) where commercial coverage exists.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="rounded bg-emerald-100 p-1 text-emerald-700 font-bold">✓</span>
                  <span><strong>The SearchPrex Difference:</strong> Exact statutory liability silos, Level-1 trauma catchment mapping, and 1-firm-per-city exclusivity.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. JURISDICTIONAL COMMAND CENTER: State-by-State Superpower (Light Theme) ── */}
      <section id="jurisdictions" className="scroll-mt-16 border-b border-slate-200 bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">
              Interactive State-by-State Jurisdictional Intelligence
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
              Personal Injury Search Architecture Across 8 U.S. States
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
              Personal injury law is strictly jurisdictional. Every state operates under distinct comparative fault thresholds,
              unique freight transit bottlenecks, and local State Bar advertising rules. Select your state below to inspect the localized SEO model:
            </p>
          </div>

          {/* State Selector Tabs */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {JURISDICTIONS.map((item) => {
              const active = item.id === activeStateId;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveStateId(item.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all sm:text-sm ${
                    active
                      ? "border border-emerald-600 bg-emerald-600 text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  <span className={`rounded px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"}`}>
                    {item.stateAbbr}
                  </span>
                  <span>{item.state}</span>
                </button>
              );
            })}
          </div>

          {/* Active Jurisdiction Detail Card (Light Theme) */}
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
            {/* Header of Active Tab */}
            <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
                  <Award className="h-3.5 w-3.5 text-emerald-600" />
                  {activeJurisdiction.badge}
                </span>
                <h3 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
                  {activeJurisdiction.headline}
                </h3>
                <p className="mt-2 max-w-4xl text-sm leading-relaxed text-slate-600">
                  {activeJurisdiction.summary}
                </p>
              </div>

              {activeJurisdiction.stateHubHref && (
                <Link
                  href={activeJurisdiction.stateHubHref}
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-800 transition hover:border-slate-400 hover:bg-slate-100"
                >
                  <span>View {activeJurisdiction.state} Master Hub</span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
                </Link>
              )}
            </div>

            {/* 3-Column Jurisdictional Breakdown */}
            <div className="mt-8 grid gap-8 lg:grid-cols-3">
              {/* Column 1: Tort Statute & Ethics */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-6">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-800">
                  <Gavel className="h-4 w-4 text-amber-700" />
                  <span>Statutory Tort Authority</span>
                </div>
                <h4 className="mt-3 text-base font-black text-slate-950">
                  {activeJurisdiction.statute.rule}
                </h4>
                <div className="mt-2 inline-block rounded-md bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-900 border border-amber-200">
                  {activeJurisdiction.statute.code}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-700">
                  {activeJurisdiction.statute.explanation}
                </p>

                <div className="mt-6 border-t border-amber-200/80 pt-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-amber-900">
                    State Bar Advertising Ethics:
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    {activeJurisdiction.statute.barEthicsNote}
                  </p>
                </div>
              </div>

              {/* Column 2: Freight Crash Corridors */}
              <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-6">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-800">
                  <Truck className="h-4 w-4 text-blue-700" />
                  <span>High-Risk Freight Corridors</span>
                </div>
                <p className="mt-1 text-xs text-slate-600">
                  Geotargeted content clusters capturing high-value commercial collisions:
                </p>
                <div className="mt-4 space-y-4">
                  {activeJurisdiction.corridors.map((corridor) => (
                    <div key={corridor.name} className="border-l-2 border-blue-500 pl-3">
                      <p className="text-xs font-bold text-slate-900">{corridor.name}</p>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-slate-600">
                        {corridor.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Level-1 Trauma Hospital Radius */}
              <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-6">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-800">
                  <Hospital className="h-4 w-4 text-rose-700" />
                  <span>Level-1 Trauma & Emergency Radius</span>
                </div>
                <p className="mt-1 text-xs text-slate-600">
                  Mobile search visibility within immediate hospital catchment zones:
                </p>
                <div className="mt-4 space-y-3">
                  {activeJurisdiction.hospitals.map((hosp) => (
                    <div key={hosp.name} className="rounded-lg border border-slate-200 bg-white p-3 shadow-2xs">
                      <p className="text-xs font-bold text-slate-950">{hosp.name}</p>
                      <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
                        <span className="text-rose-700 font-semibold">{hosp.type}</span>
                        <span>{hosp.city}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Keyword Silos Sample */}
            <div className="mt-8 border-t border-slate-200 pt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Sample High-Value Intent Keywords in {activeJurisdiction.state}:
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeJurisdiction.keywordSilos.map((kw) => (
                  <span
                    key={kw}
                    className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-800"
                  >
                    “{kw}”
                  </span>
                ))}
              </div>
            </div>

            {/* Active City Landing Pages Bar */}
            <div className="mt-8 border-t border-slate-200 pt-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h4 className="text-sm font-black uppercase tracking-wider text-slate-950">
                    SearchPrex Active Metro Landing Pages in {activeJurisdiction.state}
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-500">
                    One Law Firm Per City exclusivity enforced in each metropolitan market:
                  </p>
                </div>
                <a
                  href="#hero-form"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-950 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-800"
                >
                  Reserve Your {activeJurisdiction.state} Metro Exclusivity <ArrowRight className="h-3 w-3" />
                </a>
              </div>

              <div className="mt-4 flex flex-wrap gap-2.5">
                {activeJurisdiction.cities.map((city) => (
                  <Link
                    key={city.href}
                    href={city.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-slate-800 transition hover:border-slate-500 hover:bg-white"
                  >
                    <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                    <span>{city.name}</span>
                    <span className="text-slate-500 font-normal">({city.county})</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. THE 4 PILLARS OF HIGH-INTENT PERSONAL INJURY ACQUISITION ── */}
      <section className="border-b border-slate-200 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">
              The Architecture of a Retained $100k+ Claim
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
              How We Turn Urgent Mobile Searches into Signed Retainer Agreements
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
              A serious injury search is completely unlike an e-commerce transaction. It happens in distress, on a smartphone,
              often inside an emergency waiting room. Here is how our architecture wins high-stakes cases:
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-xs transition hover:border-slate-400 hover:bg-white">
              <span className="rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-black text-emerald-800">01</span>
              <h3 className="mt-4 text-base font-black text-slate-950">Statutory Pre-Qualification</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                We write comprehensive explainers for 51% modified comparative fault, PIP limits, and non-economic caps.
                Claimants self-screen their liability before dialing, saving your intake team countless hours.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-xs transition hover:border-slate-400 hover:bg-white">
              <span className="rounded-lg bg-blue-100 px-2.5 py-1 text-xs font-black text-blue-800">02</span>
              <h3 className="mt-4 text-lg font-black text-slate-950">Freight Corridor Silos</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Instead of competing for generic &quot;car accident lawyer&quot;, we map regional trucking arteries (I-10, I-94, I-95).
                Commercial trucking carriers carry \$750K to \$5M policy limits that represent your firm&apos;s largest verdicts.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-xs transition hover:border-slate-400 hover:bg-white">
              <span className="rounded-lg bg-rose-100 px-2.5 py-1 text-xs font-black text-rose-800">03</span>
              <h3 className="mt-4 text-lg font-black text-slate-950">Bedside Mobile Intake</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Over 84% of emergency accident searches occur on smartphones. We deploy sub-second loading speeds,
                sticky click-to-call bars, and HIPAA-conscious intake mechanisms for immediate retainer signing.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-xs transition hover:border-slate-400 hover:bg-white">
              <span className="rounded-lg bg-amber-100 px-2.5 py-1 text-xs font-black text-amber-800">04</span>
              <h3 className="mt-4 text-lg font-black text-slate-950">State Bar Ethics Immunity</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                We strictly obey ABA Model Rule 7.1 and state advertising rules. No false outcome guarantees, no misleading
                settlement figures without contextual facts. Your practice remains protected against bar grievances.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ── 6. HENNESSEY COMPARISON: COMPETE, WIN & DOMINATE IN CUTTHROAT SPACES ── */}
      <section className="border-b border-slate-200 bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">
              The Trade-Off Made Transparent
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
              SearchPrex vs. Traditional High-Volume Legal Marketing Agencies
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">
              We operate as a specialized boutique partner with strict territorial exclusivity, not an agency running identical cookie-cutter playbooks for 10 competing firms in the same city.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-[1fr_1fr_1.2fr] border-b border-slate-200 bg-slate-100 px-5 py-4 text-xs font-black uppercase tracking-wider text-slate-700">
              <span>Decision Factor</span>
              <span>Traditional Legal Agencies</span>
              <span className="text-emerald-800">SearchPrex Law Firm SEO</span>
            </div>

            <div className="divide-y divide-slate-200 text-xs sm:text-sm">
              <div className="grid grid-cols-[1fr_1fr_1.2fr] items-center px-5 py-4">
                <span className="font-bold text-slate-950">Market Exclusivity</span>
                <span className="text-slate-500">Signs multiple competing firms in the same metro</span>
                <span className="font-semibold text-emerald-700">Strict One Firm Per City Policy</span>
              </div>
              <div className="grid grid-cols-[1fr_1fr_1.2fr] items-center px-5 py-4">
                <span className="font-bold text-slate-950">Content Strategy</span>
                <span className="text-slate-500">Generic AI spin (&apos;Top Car Accident Lawyer&apos;)</span>
                <span className="font-semibold text-emerald-700">Jurisdictional statutes, freight corridors & trauma hubs</span>
              </div>
              <div className="grid grid-cols-[1fr_1fr_1.2fr] items-center px-5 py-4">
                <span className="font-bold text-slate-950">Intake Lead Quality</span>
                <span className="text-slate-500">Low-value property-damage & minor fender calls</span>
                <span className="font-semibold text-emerald-700">Statutory pre-qualified commercial & catastrophic claims</span>
              </div>
              <div className="grid grid-cols-[1fr_1fr_1.2fr] items-center px-5 py-4">
                <span className="font-bold text-slate-950">Account Management</span>
                <span className="text-slate-500">Junior account manager with high client churn</span>
                <span className="font-semibold text-emerald-700">Direct founder strategy with Mubashar Sharif</span>
              </div>
              <div className="grid grid-cols-[1fr_1fr_1.2fr] items-center px-5 py-4">
                <span className="font-bold text-slate-950">Pricing Model</span>
                <span className="text-slate-500">$5,000–$10,000/mo + 12-month lock-in contract</span>
                <span className="font-semibold text-emerald-700">$1,500–$2,500/mo flat retainer · Month-to-month</span>
              </div>
              <div className="grid grid-cols-[1fr_1fr_1.2fr] items-center px-5 py-4">
                <span className="font-bold text-slate-950">Client Protection</span>
                <span className="text-slate-500">No guarantee, no refund terms</span>
                <span className="font-semibold text-emerald-700">7-Day Free Trial + 90-Day Money-Back Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. TRANSPARENT PRICING & 90-DAY PROTECTION ── */}
      <section id="pricing" className="border-b border-slate-200 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">
                Predictable Economics
              </p>
              <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
                Personal Injury SEO Retainer: ${page.priceRange.min.toLocaleString()}–${page.priceRange.max.toLocaleString()} / month
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                A single retained commercial truck or traumatic brain injury claim can settle for hundreds of thousands of dollars.
                We charge a predictable, flat monthly retainer with zero percentage fees or case brokering commissions.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">First Step</p>
                  <p className="mt-1 text-xl font-black text-slate-950">7 Days Free</p>
                  <p className="mt-1 text-xs text-slate-600">Reviewable search diagnostic sprint</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Contract</p>
                  <p className="mt-1 text-xl font-black text-slate-950">Month-to-Month</p>
                  <p className="mt-1 text-xs text-slate-600">No 12-month lock-in obligations</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Protection</p>
                  <p className="mt-1 text-xl font-black text-emerald-700">90-Day Terms</p>
                  <p className="mt-1 text-xs text-slate-600">Full money-back safety guarantee</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-emerald-500/50 bg-emerald-50/60 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-emerald-600 shrink-0" />
                <div>
                  <h3 className="text-lg font-black text-slate-950">Written 90-Day Money-Back Guarantee</h3>
                  <p className="text-xs text-slate-600">In Plain English in our engagement agreement</p>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-slate-700">
                If SearchPrex fails to execute agreed jurisdictional blueprints, technical fixes, and content deliverables within 90 days,
                we refund your retainer fees in full. We shoulder the initial risk so you can evaluate performance with total peace of mind.
              </p>
              <div className="mt-6">
                <a
                  href="#hero-form"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-slate-800"
                >
                  Start Your 7-Day Free Trial Sprint <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. ALL 15 ACTIVE CITIES IN JURISDICTIONS (Light Theme) ── */}
      <section className="border-b border-slate-200 bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">
              Active Metro Footprint
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
              15 Metropolitan Hubs Where SearchPrex Operates
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">
              We enforce strict exclusivity: once a personal injury law firm partners with SearchPrex in any city listed below,
              that metro territory is locked and closed to all competing firms.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {cities.map((city) => (
              <Link
                key={city.citySlug}
                href={`/locations/${city.stateSlug}/${city.citySlug}`}
                className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-400 hover:shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-800 group-hover:bg-emerald-50">
                    {city.stateAbbr}
                  </span>
                  <span className="text-[11px] font-medium text-emerald-700">1 Firm Exclusivity</span>
                </div>
                <h3 className="mt-3 text-base font-bold text-slate-950 group-hover:text-emerald-700">
                  {city.city}
                </h3>
                <p className="text-xs text-slate-500">{city.county}</p>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-slate-700 group-hover:text-slate-950">
                  <span>View City Strategy</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. FOUNDER-LED STRATEGIC COUNSEL: Mubashar Sharif (Hennessey-Style Pledge) ── */}
      <section className="border-b border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-700">
            Founder Accountability & Commitment
          </div>
          <h2 className="mt-3 text-3xl font-black text-slate-950">
            &quot;We Don&apos;t Kid When We Say We Are ROI-Obsessed.&quot;
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            “The legal industry is the most dog-eat-dog place on Google. We take our clients’ success personally.
            Personal injury firms cannot afford rookie errors: a vague settlement headline can trigger a State Bar
            grievance, and an unoptimized corridor page loses you million-dollar cases. I personally research your
            freight corridors, map your trauma center radius, and direct your jurisdictional blueprints.
            If you are not getting results, I personally make it my mission to see you win.”
          </p>

          <div className="mt-6">
            <p className="text-base font-black text-slate-950">Mubashar Sharif</p>
            <p className="text-xs text-slate-500">Founder & Senior SEO Analyst · SearchPrex</p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-4 py-2 text-xs font-bold text-slate-800 transition hover:bg-slate-50"
            >
              Mubashar on LinkedIn <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://clutch.co/profile/searchprex"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-4 py-2 text-xs font-bold text-slate-800 transition hover:bg-slate-50"
            >
              Clutch Company Profile <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://www.trustpilot.com/review/searchprex.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-4 py-2 text-xs font-bold text-slate-800 transition hover:bg-slate-50"
            >
              Trustpilot Reviews <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </section>

      {/* ── 10. EXECUTIVE PARTNER FAQ ── */}
      <section className="border-b border-slate-200 bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">
              Managing Partner Questions
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
              Frequently Asked Questions by Personal Injury Attorneys
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {[
              {
                q: "How does SearchPrex enforce the One Firm Per City exclusivity guarantee?",
                a: "We accept exactly one personal injury firm per metropolitan market. If we represent a personal injury firm in Houston or Detroit, we strictly decline representation of any competing injury firm in that exact territory. Your strategic playbook is never shared with or used against you by a competitor.",
              },
              {
                q: "How do you ensure compliance with State Bar advertising ethics rules?",
                a: "All content engineered by SearchPrex adheres to ABA Model Rule 7.1 and state-specific advertising codes (such as Texas Disciplinary Rules 7.01–7.07 and Michigan Rule 7.1). We never make unverifiable outcome claims, never guarantee settlement amounts, and ensure every case result is accompanied by factual context and required disclaimers.",
              },
              {
                q: "How do you compete against directory behemoths like Justia, Avvo, and FindLaw?",
                a: "Directories rank for broad, non-converting vanity terms like 'car accident lawyer'. However, when a victim searches specific statutory questions ('Michigan no fault mini tort threshold', 'Texas 51 percent proportionate fault bar', 'I-10 18 wheeler accident lawyer'), Google prioritizes deeply authoritative, locally focused law firm pages that answer the exact legal issue.",
              },
              {
                q: "What does the 7-Day Free Trial involve?",
                a: "The 7-day trial is a zero-obligation diagnostic sprint. Within 7 days, we inspect your firm's current search path, map your freight highway and trauma center coverage, identify competitor keyword gaps, and deliver a clear written execution plan before any billing commences.",
              },
            ].map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <h3 className="text-base font-black text-slate-950">{faq.q}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. FINAL HENNESSEY-STYLE CONVERSION CTA ── */}
      <section id="get-started" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">
            Limited Monthly Capacity
          </p>
          <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
            In order to deliver consistent results, we only partner with ONE firm per city.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Once a metro market is claimed, it is closed to all competing firms. Submit your website and work email below for a confidential 24-hour jurisdictional search audit.
          </p>

          <div className="mt-8 mx-auto max-w-xl text-left rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <ArticleLeadMagnet
              variant="bottom"
              source={source}
              sourcePage={sourcePage}
              practiceArea={page.slug}
              buttonText="Check Territory Availability"
              copy={{
                eyebrow: "Confidential Market Review",
                headline: "Reserve Your City Before a Competitor Locks It",
                sub: "Replies directly from the founder within 24 hours.",
                success: "I’ll analyze your local freight corridors and email your practice area search map within 24 hours.",
              }}
            />
          </div>
        </div>
      </section>

      {/* Mobile Sticky Bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur md:hidden">
        <a
          href={CALL_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-3 text-xs font-bold text-slate-800"
        >
          Book Partner Call
        </a>
        <a
          href="#hero-form"
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-slate-950 px-3 text-center text-xs font-bold text-white"
        >
          Request Audit
        </a>
      </div>
    </div>
  );
}
