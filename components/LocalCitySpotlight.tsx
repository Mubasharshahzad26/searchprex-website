// components/LocalCitySpotlight.tsx
//
// Universal city-specific visual spotlight standard for location pages.
// Seamlessly represents each city's exact surroundings, legal district landmarks,
// and demographics while contrasting local practice challenges with SearchPrex's
// solution-oriented growth architecture and practice-area service links.

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Scale, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

interface CityVisualAsset {
  problemImg: string;
  problemAlt: string;
  problemBadge: string;
  problemLocationLabel: string;
  solutionImg: string;
  solutionAlt: string;
  solutionBadge: string;
  solutionLocationLabel: string;
}

const CITY_VISUALS: Record<string, CityVisualAsset> = {
  detroit: {
    problemImg: "/images/locations/detroit-legal-district.jpg",
    problemAlt: "Attorneys and legal professionals walking past Wayne County Court and Woodward Avenue in downtown Detroit",
    problemBadge: "Downtown Detroit Legal District: Woodward Ave & Wayne County Court corridor",
    problemLocationLabel: "Woodward Ave Legal Corridor, Detroit, MI",
    solutionImg: "/images/locations/detroit-law-consultation.jpg",
    solutionAlt: "Detroit law firm managing partner and SearchPrex SEO growth strategist reviewing case intake analytics overlooking the Detroit riverfront",
    solutionBadge: "Executive Strategy Review: Overlooking Detroit riverfront & skyline",
    solutionLocationLabel: "Detroit Riverfront Executive Suite",
  },
  "grand-rapids": {
    problemImg: "/images/locations/grand-rapids-legal-district.jpg",
    problemAlt: "Attorneys and legal professionals walking outside the Kent County Courthouse on Ottawa Avenue in Grand Rapids",
    problemBadge: "Kent County Courthouse & Ottawa Ave Legal Corridor",
    problemLocationLabel: "Ottawa Ave Legal Corridor, Grand Rapids, MI",
    solutionImg: "/images/locations/grand-rapids-law-consultation.jpg",
    solutionAlt: "Grand Rapids law firm managing partner and SEO strategist reviewing case intake analytics overlooking the Grand River",
    solutionBadge: "Executive Strategy Review: Overlooking Grand River & downtown skyline",
    solutionLocationLabel: "Grand Rapids Riverfront Boardroom",
  },
  philadelphia: {
    problemImg: "/images/locations/philadelphia-legal-district.jpg",
    problemAlt: "Attorneys and legal counsel walking along South Broad Street outside the Court of Common Pleas of Philadelphia County near City Hall",
    problemBadge: "Center City Legal District: Court of Common Pleas & Broad St",
    problemLocationLabel: "South Broad St Legal Corridor, Philadelphia, PA",
    solutionImg: "/images/locations/philadelphia-law-consultation.jpg",
    solutionAlt: "Philadelphia law firm executive boardroom overlooking City Hall and Center City office towers reviewing SEO growth",
    solutionBadge: "Executive Strategy Review: Center City skyline & City Hall",
    solutionLocationLabel: "Center City Executive Boardroom",
  },
  cleveland: {
    problemImg: "/images/locations/cleveland-legal-district.jpg",
    problemAlt: "Attorneys walking near Cuyahoga County Justice Center and Court of Common Pleas on Lakeside Avenue in Cleveland",
    problemBadge: "Cuyahoga County Justice Center & Lakeside Ave",
    problemLocationLabel: "Lakeside Ave Justice Center, Cleveland, OH",
    solutionImg: "/images/locations/cleveland-law-consultation.jpg",
    solutionAlt: "Cleveland managing partner and SEO strategist reviewing local map pack rankings overlooking Lake Erie and downtown",
    solutionBadge: "Executive Strategy Review: Downtown Cleveland & Lake Erie",
    solutionLocationLabel: "Downtown Cleveland Executive Suite",
  },
  "sugar-land": {
    problemImg: "/images/locations/texas-legal-district.jpg",
    problemAlt: "Texas trial attorneys on the steps of modern county justice center with Lone Star state flag",
    problemBadge: "Fort Bend County Court & Legal Corporate Center",
    problemLocationLabel: "Fort Bend County Legal Center, Sugar Land, TX",
    solutionImg: "/images/locations/texas-law-consultation.jpg",
    solutionAlt: "Senior Texas trial attorney and SEO agency strategist reviewing PI lead conversion and case retainers in executive boardroom",
    solutionBadge: "Executive Strategy Review: Texas trial law boardroom & metro skyline",
    solutionLocationLabel: "Greater Houston Executive Boardroom",
  },
  plano: {
    problemImg: "/images/locations/texas-legal-district.jpg",
    problemAlt: "Texas trial attorneys outside modern Collin County justice center with Lone Star state flag",
    problemBadge: "Collin County & North Texas Legal Corporate Center",
    problemLocationLabel: "Collin County Legal Center, Plano, TX",
    solutionImg: "/images/locations/texas-law-consultation.jpg",
    solutionAlt: "Senior Texas trial attorney and SEO agency strategist reviewing PI lead conversion and case retainers in executive boardroom",
    solutionBadge: "Executive Strategy Review: Texas trial law boardroom & metro skyline",
    solutionLocationLabel: "North Texas Executive Boardroom",
  },
  denton: {
    problemImg: "/images/locations/texas-legal-district.jpg",
    problemAlt: "Texas trial attorneys outside modern Denton County justice center with Lone Star state flag",
    problemBadge: "Denton County Court & North Texas Legal Center",
    problemLocationLabel: "Denton County Courts Building, TX",
    solutionImg: "/images/locations/texas-law-consultation.jpg",
    solutionAlt: "Senior Texas trial attorney and SEO agency strategist reviewing PI lead conversion and case retainers in executive boardroom",
    solutionBadge: "Executive Strategy Review: Texas trial law boardroom & metro skyline",
    solutionLocationLabel: "Texas Trial Law Executive Boardroom",
  },
  katy: {
    problemImg: "/images/locations/texas-legal-district.jpg",
    problemAlt: "Texas trial attorneys outside modern legal and corporate justice center with Lone Star state flag",
    problemBadge: "Harris & Fort Bend County Legal Corridor",
    problemLocationLabel: "Greater Houston & Katy Legal Center, TX",
    solutionImg: "/images/locations/texas-law-consultation.jpg",
    solutionAlt: "Senior Texas trial attorney and SEO agency strategist reviewing PI lead conversion and case retainers in executive boardroom",
    solutionBadge: "Executive Strategy Review: Texas trial law boardroom & metro skyline",
    solutionLocationLabel: "Houston Metro Executive Boardroom",
  },
  "the-woodlands": {
    problemImg: "/images/locations/texas-legal-district.jpg",
    problemAlt: "Texas trial attorneys outside modern Montgomery County justice center with Lone Star state flag",
    problemBadge: "Montgomery County & The Woodlands Legal Center",
    problemLocationLabel: "Montgomery County Legal Corridor, TX",
    solutionImg: "/images/locations/texas-law-consultation.jpg",
    solutionAlt: "Senior Texas trial attorney and SEO agency strategist reviewing PI lead conversion and case retainers in executive boardroom",
    solutionBadge: "Executive Strategy Review: Texas trial law boardroom & metro skyline",
    solutionLocationLabel: "The Woodlands Executive Suite",
  },
};

function getCityVisuals(slug: string, state: string, city: string, county: string): CityVisualAsset {
  if (CITY_VISUALS[slug]) {
    return CITY_VISUALS[slug];
  }

  // Regional matching for other cities
  if (state.toLowerCase() === "texas" || state.toLowerCase() === "arizona" || state.toLowerCase() === "california" || state.toLowerCase() === "new mexico") {
    return {
      problemImg: "/images/locations/texas-legal-district.jpg",
      problemAlt: `Trial attorneys outside the ${county} justice center and civil courthouse in ${city}, ${state}`,
      problemBadge: `${county} Civil Courthouse & Municipal Legal Center`,
      problemLocationLabel: `${county} Legal Center, ${city}`,
      solutionImg: "/images/locations/texas-law-consultation.jpg",
      solutionAlt: `Managing partner and legal SEO strategist reviewing case intake and map pack rankings for ${city}`,
      solutionBadge: `Executive Strategy Review: ${city} Regional Legal Center`,
      solutionLocationLabel: `${city} Executive Boardroom`,
    };
  }

  // Midwest / Eastern US fallback
  return {
    problemImg: "/images/locations/cleveland-legal-district.jpg",
    problemAlt: `Attorneys walking outside the ${county} courthouse in ${city}, ${state}`,
    problemBadge: `${county} Courthouse & Legal Corridor`,
    problemLocationLabel: `${city}, ${state} Legal District`,
    solutionImg: "/images/locations/cleveland-law-consultation.jpg",
    solutionAlt: `Managing partner and SEO growth strategist reviewing ${city} legal client intake metrics`,
    solutionBadge: `Executive Strategy Review: ${city} Law Firm Growth`,
    solutionLocationLabel: `${city} Executive Boardroom`,
  };
}

/**
 * Universal Problem & Demographics Spotlight Card.
 * Uses real urban streetscape and legal district surroundings tailored to each city.
 */
export function LocalProblemSpotlight({ page }: { page: CityPage }) {
  const visuals = getCityVisuals(page.citySlug, page.state, page.city, page.county);
  const topPractice = page.practiceDemand[0]?.area ?? "Personal Injury";
  const secondPractice = page.practiceDemand[1]?.area ?? "Family Law";
  const primaryCourt = page.courts[0] ?? `${page.county} Court`;

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="grid lg:grid-cols-12 lg:items-stretch">
        {/* Image Column */}
        <div className="relative min-h-[320px] lg:min-h-full lg:col-span-6 bg-slate-900 overflow-hidden">
          <Image
            src={visuals.problemImg}
            alt={visuals.problemAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 600px"
            className="object-cover transition-transform duration-500 hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent lg:hidden" />
          <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-slate-950/80 p-3 backdrop-blur-md border border-white/10 text-white text-xs lg:hidden">
            <span className="font-bold text-amber-300">{page.city} Legal District:</span> {visuals.problemBadge}
          </div>
        </div>

        {/* Content Column */}
        <div className="p-6 sm:p-8 lg:p-10 lg:col-span-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-700">
                Local Market Reality · {page.county}
              </span>
            </div>

            <h3 className="mt-3 text-2xl font-black tracking-tight text-[#0a0f2e] sm:text-3xl leading-tight">
              Why {page.city} Law Firms Struggle with Qualified Client Leads
            </h3>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#5b6472]">
              We understand the daily frustration facing attorneys in {page.city}: regional mega-firms with massive monthly advertising budgets dominate broad search terms, while national directories like Avvo and FindLaw capture early clicks and resell the same lead to multiple competitors. Meanwhile, prospective clients actively searching near {page.neighborhoods.slice(0, 2).join(" and ") || page.city} for urgent legal representation end up routed to out-of-town referral brokers or non-viable price-shoppers.
            </p>

            <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-200/80 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Where Competitors Burn Cash vs Your High-Intent Opportunities in {page.city}:
              </h4>
              <ul className="mt-3 space-y-2 text-xs sm:text-sm text-[#0a0f2e]">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>
                    <strong>$150–$300+ Google Ads PPC click burn:</strong> Uncontested ad spend in {page.county} that vanishes the moment monthly budgets pause.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span>
                    <strong>Untapped high-intent practice demand:</strong> Dedicated localized landing pages targeting{" "}
                    <Link href="/services/law-firm-seo/car-accident" className="font-semibold text-[#534AB7] underline hover:text-[#3d368e]">
                      {page.city} car accident lawyer SEO
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
                    tailored specifically to {primaryCourt} procedures.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="h-3.5 w-3.5 text-[#534AB7]" /> {visuals.problemLocationLabel}
            </span>
            <span className="font-semibold text-slate-700">{page.county} Jurisdiction</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Universal Solution & Case Intake Consultation Spotlight Card.
 * Highlights SearchPrex's strategic partnership, high-value consultations,
 * and tangible organic case intake tailored to each city.
 */
export function LocalSolutionSpotlight({ page }: { page: CityPage }) {
  const visuals = getCityVisuals(page.citySlug, page.state, page.city, page.county);
  const primaryCourt = page.courts[0] ?? `${page.city} Courts`;

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="grid lg:grid-cols-12 lg:items-stretch">
        {/* Content Column */}
        <div className="p-6 sm:p-8 lg:p-10 lg:col-span-6 flex flex-col justify-between order-2 lg:order-1">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-emerald-700" />
                SearchPrex Solution · {page.city} Growth Partner
              </span>
            </div>

            <h3 className="mt-3 text-2xl font-black tracking-tight text-[#0a0f2e] sm:text-3xl leading-tight">
              Engineering High-Intent Retained Inquiries for {page.city} Law Firms
            </h3>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#5b6472]">
              We don&apos;t sell generic SEO packages or empty traffic reports. SearchPrex solves the client acquisition bottleneck by positioning your firm directly where 70%+ of mobile legal inquiries happen: the **Google Map 3-Pack** and authoritative localized practice-area silos.
            </p>

            <div className="mt-6 space-y-3.5">
              {[
                {
                  title: `${page.state} Jurisdictional Authority & Statute Depth`,
                  detail: `We create legally sound, highly specific content addressing ${page.legalContext.heading.toLowerCase()}, capturing serious clients before they resort to national directories.`,
                },
                {
                  title: `Hyper-Local ${page.county} Geofencing & Neighborhood Coverage`,
                  detail: `Syncing your Google Business Profile service areas across ${page.neighborhoods.slice(0, 4).join(", ") || page.city} so your firm ranks in local map results wherever clients search.`,
                },
                {
                  title: `Exclusive Representation in ${page.city}`,
                  detail: `We accept only ONE law firm per practice niche in ${page.city}. We will never represent a direct competitor ranking against your firm.`,
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
                <span>Request Free 24h {page.city} Market Audit</span>
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
        <div className="relative min-h-[320px] lg:min-h-full lg:col-span-6 bg-slate-900 overflow-hidden order-1 lg:order-2">
          <Image
            src={visuals.solutionImg}
            alt={visuals.solutionAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 600px"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent lg:hidden" />
          <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-slate-950/80 p-3 backdrop-blur-md border border-white/10 text-white text-xs lg:hidden">
            <span className="font-bold text-emerald-300">{page.city} Executive Strategy:</span> {visuals.solutionBadge}
          </div>
        </div>
      </div>
    </div>
  );
}
