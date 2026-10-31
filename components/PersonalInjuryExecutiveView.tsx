"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Scale,
  MapPin,
  ArrowRight,
  Gavel,
  Lock,
  PhoneCall,
  Clock,
  ExternalLink,
  ChevronRight,
  FileText,
  Search,
  Sparkles,
  Bot,
  BrainCircuit,
  MessageSquare,
  Shield,
  HelpCircle,
  Truck,
  Hospital,
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
  {
    id: "kansas",
    state: "Kansas",
    stateAbbr: "KS",
    badge: "Kansas City, Wichita & I-70 Spine",
    headline: "Kansas Personal Injury SEO: Agricultural Logistics & 49% Fault Rule",
    summary:
      "Kansas tort law strictly bars claimants if they are 50% or more at fault under K.S.A. § 60-258a. We structure search funnels targeting cross-country grain and cattle freight on I-70 and I-35, and Level-1 trauma catchment at KU Medical Center.",
    stateHubHref: "/locations/kansas",
    statute: {
      rule: "49% Modified Comparative Fault Standard",
      code: "K.S.A. § 60-258a",
      explanation:
        "Under Kansas law, an injured party can only recover if their causal negligence was less than the defendant's (49% or lower). If equal (50/50), recovery is barred. Content must clarify this distinction so clients understand liability.",
      barEthicsNote:
        "Kansas Rules of Professional Conduct Rule 7.1: Strict prohibition on creating unjustified expectations or deceptive comparisons.",
    },
    corridors: [
      {
        name: "I-70 Transcontinental Freight Highway",
        detail: "Major east-west logistics artery carrying heavy cross-country commercial semi-trucks through Wyandotte and Shawnee counties.",
      },
      {
        name: "I-35 Logistics Spine (Wichita to Kansas City)",
        detail: "High-density commercial corridor connecting agricultural, manufacturing, and aviation supply chains.",
      },
      {
        name: "US-69 & I-435 Interchange (Overland Park)",
        detail: "Rapidly expanding suburban commuter and delivery corridor in Johnson County with severe rush-hour collisions.",
      },
    ],
    hospitals: [
      { name: "University of Kansas Hospital (KU Med)", type: "Level-1 Adult Comprehensive Trauma", city: "Kansas City" },
      { name: "Wesley Medical Center", type: "Level-1 Pediatric & Adult Trauma", city: "Wichita" },
      { name: "Stormont Vail Health", type: "Level-2 Regional Trauma Center", city: "Topeka" },
    ],
    keywordSilos: [
      "kansas city ks commercial truck accident lawyer",
      "wichita catastrophic personal injury attorney",
      "overland park highway collision lawyer",
      "kansas 49 percent comparative negligence attorney",
    ],
    cities: [
      { name: "Kansas City", county: "Wyandotte County", href: "/locations/kansas/kansas-city" },
      { name: "Wichita", county: "Sedgwick County", href: "/locations/kansas/wichita" },
      { name: "Overland Park", county: "Johnson County", href: "/locations/kansas/overland-park" },
      { name: "Olathe", county: "Johnson County", href: "/locations/kansas/olathe" },
      { name: "Topeka", county: "Shawnee County", href: "/locations/kansas/topeka" },
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
    <div className="bg-white font-sans text-slate-900 selection:bg-slate-200 selection:text-slate-950">
      {/* ── 1. HERO SECTION: Clean Monochromatic B2B Authority ── */}
      <section className="relative border-b border-slate-200 bg-white pt-12 pb-16 sm:pt-16 sm:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Institutional Pill */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-900">
              <Scale className="h-3.5 w-3.5 text-slate-900" />
              <span>Personal Injury Law Firm SEO · USA Hub (9 Major States)</span>
            </div>
            <div className="hidden items-center gap-1.5 text-xs text-slate-500 sm:flex">
              <Link href="/services/law-firm-seo" className="hover:text-slate-950 underline underline-offset-2">
                Law Firm SEO
              </Link>
              <span>/</span>
              <span className="font-semibold text-slate-950">Personal Injury Hub</span>
            </div>
          </div>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            {/* Left Column: Direct Managing Partner Pitch */}
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                The Dedicated SEO Partner You Wish You’d Hired First
              </p>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl sm:leading-[1.12]">
                Personal Injury Lawyer SEO Agency for High-Value Leads & Signed Catastrophic Cases.
              </h1>

              <p className="mt-6 text-base leading-relaxed text-slate-700 sm:text-lg">
                Most legal marketing agencies deliver low-value fender benders that exhaust your intake team.
                SearchPrex builds authoritative search architecture targeting commercial freight liability,
                interstate trucking corridors, and Level-1 trauma radius catchment across all 9 major U.S. states where we serve.
              </p>

              {/* 3 Trust Metrics - Pure Monochromatic Numbers */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Exclusivity</p>
                  <p className="mt-1 text-lg font-black text-slate-950">1 Firm Per City</p>
                  <p className="mt-1 text-xs text-slate-600">Zero internal conflict of interest</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Ethics</p>
                  <p className="mt-1 text-lg font-black text-slate-950">State Bar Immune</p>
                  <p className="mt-1 text-xs text-slate-600">ABA Model Rule 7.1 compliant</p>
                </div>
                <div className="col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:col-span-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">First Step</p>
                  <p className="mt-1 text-lg font-black text-slate-950">7-Day Free Trial</p>
                  <p className="mt-1 text-xs text-slate-600">Reviewable diagnostic sprint</p>
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
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-900 shadow-xs transition hover:border-slate-500 hover:bg-slate-50"
                >
                  Request Market Audit
                </a>
              </div>
            </div>

            {/* Right Column: Founder-Reviewed Intake Sidebar Form */}
            <div id="hero-form" className="relative scroll-mt-24 rounded-2xl border border-slate-300 bg-white p-6 sm:p-8 shadow-sm">
              <div className="absolute -top-3.5 right-6 rounded-full border border-slate-300 bg-slate-100 px-3 py-0.5 text-[11px] font-black uppercase tracking-wider text-slate-900">
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
                <span className="flex items-center gap-1.5 font-medium text-slate-800">
                  <Lock className="h-3.5 w-3.5 text-slate-800" /> Confidential & Private
                </span>
                <span>Founder replies in &lt; 24h</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. EMOTIONAL CLIENT DEDICATION: "WE KNOW THE PAIN YOU CARRY" ── */}
      <section className="border-b border-slate-200 bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-300 bg-white p-8 sm:p-12 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
              Dedicated Client Care & Real Partnership
            </p>
            <h2 className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">
              We Know Exactly the Burden and Frustration You Carry Every Day.
            </h2>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base">
              <p>
                You became a personal injury attorney to fight for injured human beings whose lives were derailed by catastrophic semi-truck collisions, chemical plant explosions, and corporate recklessness. You carry the financial weight of running a high-stakes contingency practice where every case requires substantial upfront capital.
              </p>
              <p>
                Yet every month, you watch high-spend billboard firms dominate vanity search results, while generic SEO agencies charge you \$5,000 to \$10,000 every single month only to hand you over to junior interns who have never read a state tort statute in their lives. Worse, your intake coordinators spend exhausting hours filtering calls from unviable property damage claims and minor scratches that cost more to answer than they will ever yield.
              </p>
              <p className="font-semibold text-slate-900">
                SearchPrex is not another transactional SEO vendor. We are revenue-obsessed, dedicated legal search architects who treat your firm’s reputation, time, and courtroom advocacy with the deepest respect.
              </p>
            </div>

            <div className="mt-8 grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-3">
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-slate-500">01. Protecting Your Time</p>
                <p className="mt-1 text-xs text-slate-700">Pre-qualifying claimants on statutory fault thresholds before they ever call your receptionist.</p>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-slate-500">02. Defending Your Reputation</p>
                <p className="mt-1 text-xs text-slate-700">100% adherence to ABA Model Rule 7.1 and state bar advertising guidelines with zero deceptive outcome claims.</p>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-slate-500">03. Driving Signed Retainers</p>
                <p className="mt-1 text-xs text-slate-700">Positioning your trial partners directly along high-limit commercial freight corridors and Level-1 trauma centers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. WHY WE CHOSE THE USA MARKET & LAW FIRM SEO (SEMANTIC TOPICAL AUTHORITY) ── */}
      <section className="border-b border-slate-200 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                Strategic Market Focus
              </p>
              <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
                Why We Specialize Exclusively in U.S. Personal Injury Law Firm SEO
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-700">
                The United States personal injury tort system is the most complex, jurisdictionally fragmented, and high-stakes legal market in the world. In the U.S., personal injury claims operate under distinct state statutes — from Texas proportionate responsibility to Michigan no-fault PIP tiers and Pennsylvania limited tort elections.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                In consumer e-commerce, an agency chases sheer search volume. But in U.S. personal injury litigation, a single commercial 18-wheeler wreck or catastrophic spinal injury case carries a settlement value of \$500,000 to over \$5,000,000. Winning in this space requires engineering semantic keyword clusters, entities, and topical maps that match the exact statutory language victims and referring attorneys research during life-altering crises.
              </p>

              <div className="mt-6 space-y-2 text-xs font-medium text-slate-800">
                <p>• Commercial Motor Carrier Safety Administration (FMCSA) statutory violations</p>
                <p>• Level-1 adult and pediatric trauma center bedside mobile search catchment</p>
                <p>• State-specific comparative fault thresholds and wrongful death beneficiaries</p>
                <p>• Clean contextual link architecture between <Link href="/services/law-firm-seo" className="font-bold underline">Law Firm SEO</Link>, practice hubs, and municipal courts</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <h3 className="text-base font-black uppercase tracking-wider text-slate-950">
                Core Semantic Keyword Clusters We Dominate:
              </h3>
              <div className="mt-4 space-y-3 text-xs leading-relaxed text-slate-700">
                <div className="border-l-2 border-slate-900 pl-3">
                  <p className="font-bold text-slate-950">High-Stakes Commercial Trucking Silos</p>
                  <p className="text-slate-600">“18 wheeler jackknife attorney”, “commercial freight carrier liability lawyer”, “interstate tanker crash law firm”.</p>
                </div>
                <div className="border-l-2 border-slate-900 pl-3">
                  <p className="font-bold text-slate-950">Statutory Liability & Fault Threshold Queries</p>
                  <p className="text-slate-600">“51 percent modified comparative fault recovery”, “Michigan pip medical choice caps”, “limited tort exception lawyer”.</p>
                </div>
                <div className="border-l-2 border-slate-900 pl-3">
                  <p className="font-bold text-slate-950">Catastrophic & Wrongful Death Life-Event Search</p>
                  <p className="text-slate-600">“Traumatic brain injury lawyer Level 1 trauma”, “paraplegia spinal cord collision attorney”, “wrongful death highway suit”.</p>
                </div>
                <div className="border-l-2 border-slate-900 pl-3">
                  <p className="font-bold text-slate-950">Attorney Co-Counsel & High-Value Referrals</p>
                  <p className="text-slate-600">“Referring 18 wheeler case Texas co counsel”, “complex litigation referral personal injury PA”.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. BEYOND TRADITIONAL SEO: AEO, GEO & LLMS OPTIMIZATION ── */}
      <section className="border-b border-slate-200 bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
              The 2026+ Legal Search Reality
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
              We Don’t Just Do Traditional SEO. We Engineer AEO | GEO | LLMs Optimization.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
              Google algorithms, AI Overviews, and conversational engines (ChatGPT, Google Gemini, Perplexity) have transformed how injured clients find legal representation. Your firm must be the authoritative answer across all AI surfaces:
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <p className="text-xs font-black uppercase tracking-wider text-slate-400">Pillar 01</p>
              <h3 className="mt-2 text-lg font-black text-slate-950">Local Map Pack & GMB Dominance</h3>
              <p className="mt-3 text-xs leading-relaxed text-slate-600">
                We optimize Google Business Profiles with accurate proximity signals, verified primary legal categories, geotagged jurisdictional photos, and structured review management that locks your firm into the top 3-Pack.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <p className="text-xs font-black uppercase tracking-wider text-slate-400">Pillar 02</p>
              <h3 className="mt-2 text-lg font-black text-slate-950">Answer Engine Optimization (AEO)</h3>
              <p className="mt-3 text-xs leading-relaxed text-slate-600">
                Google AI Overviews lift concise, statutory-backed answers directly from authoritative pages. We structure your content with Schema.org JSON-LD and direct answer capsules so Google features your attorneys as the cited expert.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <p className="text-xs font-black uppercase tracking-wider text-slate-400">Pillar 03</p>
              <h3 className="mt-2 text-lg font-black text-slate-950">LLMs & GEO Optimization (ChatGPT / Gemini)</h3>
              <p className="mt-3 text-xs leading-relaxed text-slate-600">
                When prospective clients ask ChatGPT or Gemini &quot;Who is the top truck accident attorney in Houston?&quot;, LLMs rely on entity authority, unstructured citations, and state bar listings. We build your firm&apos;s digital entity profile across legal databases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. JURISDICTIONAL COMMAND CENTER: 9 U.S. STATES IN CLEAN MONOCHROME ── */}
      <section id="jurisdictions" className="scroll-mt-16 border-b border-slate-200 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
              State-by-State Jurisprudential Intelligence
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
              Personal Injury Search Architecture Across 9 U.S. States
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
              Every state operates under distinct comparative fault thresholds, freight corridors, and local State Bar advertising rules. Select any of our 9 active states below to inspect the localized SEO model:
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
                      ? "border border-slate-950 bg-slate-950 text-white shadow-xs"
                      : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400 hover:bg-white"
                  }`}
                >
                  <span className={`rounded px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${active ? "bg-white/20 text-white" : "bg-slate-200 text-slate-800"}`}>
                    {item.stateAbbr}
                  </span>
                  <span>{item.state}</span>
                </button>
              );
            })}
          </div>

          {/* Active Jurisdiction Detail Card */}
          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-10 shadow-xs">
            {/* Header of Active Tab */}
            <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-bold text-slate-900">
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
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-900 transition hover:border-slate-500"
                >
                  <span>View {activeJurisdiction.state} Master Hub</span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-600" />
                </Link>
              )}
            </div>

            {/* 3-Column Jurisdictional Breakdown */}
            <div className="mt-8 grid gap-8 lg:grid-cols-3">
              {/* Column 1: Tort Statute & Ethics */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500">
                  <Gavel className="h-4 w-4 text-slate-900" />
                  <span>Statutory Tort Authority</span>
                </div>
                <h4 className="mt-3 text-base font-black text-slate-950">
                  {activeJurisdiction.statute.rule}
                </h4>
                <div className="mt-2 inline-block rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-900 border border-slate-200">
                  {activeJurisdiction.statute.code}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-700">
                  {activeJurisdiction.statute.explanation}
                </p>

                <div className="mt-6 border-t border-slate-200 pt-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-900">
                    State Bar Advertising Ethics:
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    {activeJurisdiction.statute.barEthicsNote}
                  </p>
                </div>
              </div>

              {/* Column 2: Freight Crash Corridors */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500">
                  <Truck className="h-4 w-4 text-slate-900" />
                  <span>High-Risk Freight Corridors</span>
                </div>
                <p className="mt-1 text-xs text-slate-600">
                  Geotargeted content clusters capturing high-value commercial collisions:
                </p>
                <div className="mt-4 space-y-4">
                  {activeJurisdiction.corridors.map((corridor) => (
                    <div key={corridor.name} className="border-l-2 border-slate-900 pl-3">
                      <p className="text-xs font-bold text-slate-950">{corridor.name}</p>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-slate-600">
                        {corridor.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Level-1 Trauma Hospital Radius */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500">
                  <Hospital className="h-4 w-4 text-slate-900" />
                  <span>Level-1 Trauma & Emergency Radius</span>
                </div>
                <p className="mt-1 text-xs text-slate-600">
                  Mobile search visibility within immediate hospital catchment zones:
                </p>
                <div className="mt-4 space-y-3">
                  {activeJurisdiction.hospitals.map((hosp) => (
                    <div key={hosp.name} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <p className="text-xs font-bold text-slate-950">{hosp.name}</p>
                      <div className="mt-1 flex items-center justify-between text-[11px] text-slate-600">
                        <span className="font-semibold text-slate-900">{hosp.type}</span>
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
                    className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-900"
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
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-900 transition hover:border-slate-500"
                  >
                    <MapPin className="h-3.5 w-3.5 text-slate-700" />
                    <span>{city.name}</span>
                    <span className="text-slate-500 font-normal">({city.county})</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. INTERACTIVE GOOGLE MAP EMBED (POINTING STATES AND CITIES) ── */}
      <section className="border-b border-slate-200 bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
              National Footprint
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
              Geographic Coverage Across 9 Active States & Metropolitan Markets
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
              Explore our active personal injury search territories. We serve one premier firm per city across Texas, Michigan, Pennsylvania, California, Arizona, Louisiana, Ohio, New Mexico, and Kansas:
            </p>
          </div>

          {/* Map Container */}
          <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="aspect-video w-full overflow-hidden rounded-2xl border border-slate-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13000000!2d-98.5795!3d39.8283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sus!4v1714000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SearchPrex USA Personal Injury Law Firm SEO Coverage Map"
                className="h-full w-full"
              />
            </div>

            {/* Quick State Navigation Pills */}
            <div className="mt-6 border-t border-slate-200 pt-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Direct State & City Landing Pages:
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link href="/locations/texas" className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-800 hover:border-slate-500">Texas Hub</Link>
                <Link href="/locations/texas/houston" className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-800 hover:border-slate-500">Sugar Land & Katy (Houston)</Link>
                <Link href="/locations/michigan" className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-800 hover:border-slate-500">Michigan Hub</Link>
                <Link href="/locations/michigan/detroit" className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-800 hover:border-slate-500">Detroit, MI</Link>
                <Link href="/locations/pennsylvania/philadelphia" className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-800 hover:border-slate-500">Philadelphia, PA</Link>
                <Link href="/locations/california/san-jose" className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-800 hover:border-slate-500">San Jose (Silicon Valley)</Link>
                <Link href="/locations/arizona" className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-800 hover:border-slate-500">Arizona Hub</Link>
                <Link href="/locations/arizona/scottsdale" className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-800 hover:border-slate-500">Scottsdale & Tempe</Link>
                <Link href="/locations/louisiana" className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-800 hover:border-slate-500">Louisiana Hub</Link>
                <Link href="/locations/louisiana/baton-rouge" className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-800 hover:border-slate-500">Baton Rouge & Shreveport</Link>
                <Link href="/locations/ohio/cleveland" className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-800 hover:border-slate-500">Cleveland, OH</Link>
                <Link href="/locations/new-mexico/albuquerque" className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-800 hover:border-slate-500">Albuquerque, NM</Link>
                <Link href="/locations/kansas" className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-800 hover:border-slate-500">Kansas Hub</Link>
                <Link href="/locations/kansas/kansas-city" className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-800 hover:border-slate-500">Kansas City & Wichita</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. THE PSYCHOLOGICAL FRAMEWORK OF MUBASHAR SHARIF ── */}
      <section className="border-b border-slate-200 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
              The Cognitive Architecture
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
              The Brain & Psychological Concept Behind SearchPrex Personal Law SEO
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">
              Architected by Mubashar Sharif: How we decode the psychological state of accident victims and distressed families to engineer high-converting search journeys.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <p className="text-xs font-black uppercase tracking-wider text-slate-500">01. Stage One: Acute Crisis & Mobile Trauma Searches (Hospital Bedside)</p>
              <h3 className="mt-2 text-lg font-black text-slate-950">Panic, Confusion, and Immediate Needs</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-700 sm:text-sm">
                In the first 48 hours after a severe crash, queries occur almost exclusively on mobile devices from emergency waiting rooms (Memorial Hermann, Detroit Receiving, Penn Presbyterian). The victim or spouse is terrified about medical bills and insurance intimidation. SearchPrex builds frictionless, calming pages with immediate click-to-call bars, HIPAA-conscious intake, and answers to &quot;Who pays for surgery after an 18-wheeler wreck?&quot;
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <p className="text-xs font-black uppercase tracking-wider text-slate-500">02. Stage Two: Statutory Reality & Fault Assessment</p>
              <h3 className="mt-2 text-lg font-black text-slate-950">Self-Screening Liability and Protecting Legal Rights</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-700 sm:text-sm">
                Demographics across regional corridors think differently: a petrochemical truck driver in Houston evaluates Texas proportionate responsibility; an auto worker in Detroit researches Michigan no-fault PIP choice caps; a commuter on Philadelphia’s Roosevelt Boulevard checks limited tort exceptions. SearchPrex provides precise, plain-language statutory explainers that reassure clients while establishing your firm as the unquestioned courtroom authority.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <p className="text-xs font-black uppercase tracking-wider text-slate-500">03. Stage Three: The Decision to Retain Counsel</p>
              <h3 className="mt-2 text-lg font-black text-slate-950">Verification, Trial Reputation, and Trust Confirmation</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-700 sm:text-sm">
                Before dialing, the client checks verified reviews, trial experience, and local office legitimacy. Because SearchPrex optimizes local citations, state bar credentials, and Generative Engine references (ChatGPT and Gemini recommendations), the prospective client feels total confidence and signs the retainer on the initial intake call.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. COMPLETE SOLUTION PACK: 7-DAY TRIAL, 1-HR CONSULTATION, INTAKE TOOL ── */}
      <section className="border-b border-slate-200 bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
            First Experience the Difference, Then Assign the Project to Us
          </p>
          <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
            We Come With a Complete, Risk-Free Client Onboarding Solution
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">
            We never ask a personal injury law firm to take a leap of faith. We prove our technical competence and jurisdictional grasp before you ever commit a dollar:
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-left">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <p className="text-xs font-black uppercase tracking-wider text-slate-400">Step 01</p>
              <h3 className="mt-2 text-base font-black text-slate-950">1-Hour Free Strategic Consultation</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Direct one-on-one session with Founder Mubashar Sharif to audit your firm&apos;s current search visibility, freight corridors, and competitor gaps.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <p className="text-xs font-black uppercase tracking-wider text-slate-400">Step 02</p>
              <h3 className="mt-2 text-base font-black text-slate-950">7-Day Free Working Trial Sprint</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                A reviewable diagnostic and search mapping blueprint delivered within seven days. Inspect our exact tactical plan before committing.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <p className="text-xs font-black uppercase tracking-wider text-slate-400">Step 03</p>
              <h3 className="mt-2 text-base font-black text-slate-950">14-Day Free Intake Efficiency Tool</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Test our 24/7 AI intake assistant that captures and pre-qualifies after-hours crash facts and commercial accident inquiries seamlessly.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <p className="text-xs font-black uppercase tracking-wider text-slate-400">Step 04</p>
              <h3 className="mt-2 text-base font-black text-slate-950">Written 90-Day Money-Back Guarantee</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Month-to-month agreement with plain English terms: if deliverables are not executed as promised, you receive a 100% refund.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. FOUNDER PICTURE & DIRECT COMMITMENT: MUBASHAR SHARIF ── */}
      <section className="border-b border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-900">
            Founder Accountability & Commitment
          </div>

          <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-4xl">
            &quot;We Don&apos;t Kid When We Say We Are ROI-Obsessed.&quot;
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
            “The legal industry is the most dog-eat-dog place on Google. We take our clients’ success personally. Personal injury firms cannot afford rookie errors: a vague settlement headline can trigger a State Bar grievance, and an unoptimized corridor page loses you million-dollar cases. I personally research your freight corridors, map your trauma center radius, and direct your jurisdictional blueprints. If you are not getting results, I personally make it my mission to see you win.”
          </p>

          {/* Founder Picture Added Here */}
          <div className="mt-8 flex flex-col items-center justify-center">
            <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-slate-300 shadow-sm">
              <Image
                src="/images/mubashar-sharif.jpg"
                alt="Mubashar Sharif - Founder and Senior SEO Analyst at SearchPrex"
                fill
                sizes="112px"
                className="object-cover"
                priority
              />
            </div>
            <p className="mt-4 text-lg font-black text-slate-950">Mubashar Sharif</p>
            <p className="text-xs font-medium text-slate-600">Founder & Senior SEO Analyst · SearchPrex</p>
          </div>

          {/* External Verification Links */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href="https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-4 py-2 text-xs font-bold text-slate-900 transition hover:bg-slate-50"
            >
              Mubashar on LinkedIn <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://clutch.co/profile/searchprex"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-4 py-2 text-xs font-bold text-slate-900 transition hover:bg-slate-50"
            >
              Clutch Company Profile <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://www.trustpilot.com/review/searchprex.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-4 py-2 text-xs font-bold text-slate-900 transition hover:bg-slate-50"
            >
              Trustpilot Reviews <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </section>

      {/* ── 10. RELEVANT LEGAL ARTICLES & SEARCH RESOURCES (CONTEXTUAL INTERNAL LINKS) ── */}
      <section className="border-b border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
              Authority & Knowledge Graph Architecture
            </p>
            <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
              Related Legal SEO Practices, Checklists & Case Resources
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/services/law-firm-seo" className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-400">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">Core Service</span>
              <p className="mt-1 text-sm font-black text-slate-950">Law Firm SEO Master Hub</p>
              <p className="mt-2 text-xs text-slate-600">Overview of our entire multi-practice legal search architecture across U.S. markets.</p>
            </Link>

            <Link href="/services/law-firm-seo/mass-torts" className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-400">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">Related Practice</span>
              <p className="mt-1 text-sm font-black text-slate-950">Mass Torts SEO</p>
              <p className="mt-2 text-xs text-slate-600">MDL docket readiness, bellwether trial research, and nationwide intake funnels.</p>
            </Link>

            <Link href="/services/law-firm-seo/criminal-defense" className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-400">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">Related Practice</span>
              <p className="mt-1 text-sm font-black text-slate-950">Criminal Defense SEO</p>
              <p className="mt-2 text-xs text-slate-600">24/7 emergency arrest search architecture for DWI and felony trial attorneys.</p>
            </Link>

            <Link href="/tools/keyword-research" className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-400">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">Free Law Tool</span>
              <p className="mt-1 text-sm font-black text-slate-950">Law Firm Keyword Research Tool</p>
              <p className="mt-2 text-xs text-slate-600">Inspect commercial intent and volume benchmarks for personal injury queries.</p>
            </Link>

            <Link href="/services/law-firm-seo/family-law" className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-400">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">Related Practice</span>
              <p className="mt-1 text-sm font-black text-slate-950">Family Law SEO</p>
              <p className="mt-2 text-xs text-slate-600">High-net-worth divorce, custody jurisdiction, and private written audit paths.</p>
            </Link>

            <Link href="/services/law-firm-seo/estate-planning" className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-400">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">Related Practice</span>
              <p className="mt-1 text-sm font-black text-slate-950">Estate Planning SEO</p>
              <p className="mt-2 text-xs text-slate-600">Probate court search paths, trust administration, and wealth preservation.</p>
            </Link>

            <Link href="/blog" className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-400">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">Legal Blog</span>
              <p className="mt-1 text-sm font-black text-slate-950">Law Firm SEO Insights & Guides</p>
              <p className="mt-2 text-xs text-slate-600">Deep dives into Google Core Updates, legal schema, and conversion optimization.</p>
            </Link>

            <Link href="/news" className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-400">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">Legal News</span>
              <p className="mt-1 text-sm font-black text-slate-950">SearchPrex Legal Industry News</p>
              <p className="mt-2 text-xs text-slate-600">Latest analysis on AI Overviews, Local Service Ads (LSAs), and Map Pack algorithms.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 11. MANAGING PARTNER FAQ: NATURAL, INTERACTIVE & COMPREHENSIVE ── */}
      <section className="border-b border-slate-200 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
              Direct & Plain Language Answers
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
              Frequently Asked Questions by Personal Injury Managing Partners
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {[
              {
                q: "How does SearchPrex enforce the One Law Firm Per City exclusivity guarantee?",
                a: "We accept strictly one personal injury law firm per metropolitan area. If we manage personal injury SEO for a firm in Houston, Detroit, or Philadelphia, we decline representation for any other injury firm in that municipality. Your keyword strategy, link targets, and corridor data are completely proprietary.",
              },
              {
                q: "How do you protect our firm against State Bar advertising grievances?",
                a: "Every piece of copy adheres strictly to ABA Model Rule 7.1 and individual state bar disciplinary codes (e.g. Texas Rule 7.01–7.07, Michigan Rule 7.1). We never make guarantees, never use misleading superlatives ('best lawyer in Texas'), and frame past settlement results with factual context and required jurisdictional disclaimers.",
              },
              {
                q: "Can our law firm rank in nearby suburbs and freight corridors without opening physical offices there?",
                a: "Yes for organic landing pages, corridor hubs, and Level-1 trauma center silos. However, Google Business Profile (GMB) Map Pack rankings require a legitimate physical address in that city. We build localized geographic silos that dominate organic rankings across entire counties while tying map proximity signals to your primary licensed office.",
              },
              {
                q: "How does SearchPrex compete with massive directories like Avvo, FindLaw, and Justia?",
                a: "Directories rank for generic, non-converting keywords like 'car accident lawyer'. But when an injured victim searches specific statutory questions ('Michigan mini tort property damage cap 2026', 'Texas 51 percent proportionate fault bar', 'I-10 commercial 18 wheeler accident lawyer'), Google prioritizes authoritative, localized law firm content over generic directory lists.",
              },
              {
                q: "What makes personal injury SEO different from other legal practice areas?",
                a: "Personal injury is contingency-based with high case values ($100k to $5M+), governed by strict comparative fault thresholds, and driven by urgent mobile searches from crash scenes and hospital emergency rooms. Our architecture accounts for emergency medical catchment, insurance carrier limits, and rapid mobile intake.",
              },
              {
                q: "What is included in the 7-Day Free Trial Sprint?",
                a: "The 7-day trial is a zero-obligation diagnostic sprint. Within 7 days, Founder Mubashar Sharif audits your site, maps your freight highway and trauma center coverage, identifies competitor keyword vulnerabilities, and presents a written execution blueprint before you commit to any retainer.",
              },
            ].map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-base font-black text-slate-950">{faq.q}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-700 sm:text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. FINAL CONVERSION FORM: LIMITED CAPACITY & TERRITORIAL LOCK ── */}
      <section id="get-started" className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
            Limited Monthly Capacity
          </p>
          <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
            In order to deliver consistent results, we only partner with ONE firm per city.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Once a metro market is claimed, it is closed to all competing firms. Submit your website and work email below for a confidential 24-hour jurisdictional search audit with Founder Mubashar Sharif.
          </p>

          <div className="mt-8 mx-auto max-w-xl text-left rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <ArticleLeadMagnet
              variant="bottom"
              source={source}
              sourcePage={sourcePage}
              practiceArea={page.slug}
              buttonText="Check Territory Availability"
              copy={{
                eyebrow: "Confidential Market Review",
                headline: "Reserve Your City Before a Competitor Locks It",
                sub: "Replies directly from founder Mubashar Sharif within 24 hours.",
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
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-3 text-xs font-bold text-slate-900"
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
