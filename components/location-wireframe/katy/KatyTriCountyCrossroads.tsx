"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Compass, Landmark, Scale, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";

export default function KatyTriCountyCrossroads() {
  const [selectedCounty, setSelectedCounty] = useState(0);

  const counties = [
    {
      name: "Harris County",
      short: "Harris",
      kicker: "County 1 of 3",
      title: "Harris County: Downtown Houston District Courts",
      courtLocation: "Downtown Houston (approx. 30 miles east via I-10)",
      body: "Cases tied to the eastern and northern portions of Katy are within Harris County jurisdiction and heard at the Harris County Civil and Family District Courts in downtown Houston. A top-converting page explains exactly where to file, court driving times along the Katy Freeway, and local filing guidelines.",
      searches: '"Harris County divorce lawyer Katy", "family law attorney Katy Harris County", "Harris County car crash lawyer Katy"',
      href: "/services/law-firm-seo/family-law",
      linkText: "Explore our Family Law SEO framework",
      color: "#171717",
      bgColor: "bg-slate-50/60",
      borderColor: "border-neutral-900",
      badgeColor: "bg-slate-100 text-neutral-900",
      svgFill: "#f1f5f9",
      svgFillActive: "#171717",
      svgPoints: "250,30 505,30 505,305 250,305 232,195 250,110",
      labelX: 360,
      labelY: 160,
    },
    {
      name: "Fort Bend County",
      short: "Fort Bend",
      kicker: "County 2 of 3",
      title: "Fort Bend County: Richmond Justice Center",
      courtLocation: "Richmond, TX (approx. 18 miles south via Grand Parkway / FM 359)",
      body: "Cases across the south side of Katy—including Cinco Ranch, Grand Lakes, and Seven Meadows—are under Fort Bend County jurisdiction, heard at the Fort Bend County Justice Center in Richmond. Neighboring Sugar Land firms target these same courts, making dedicated Cinco Ranch and Fort Bend practice silos vital to separate your firm.",
      searches: '"Fort Bend County divorce Cinco Ranch", "Richmond family court lawyer Katy", "child custody attorney Fort Bend"',
      href: "/locations/texas/sugar-land",
      linkText: "Compare with Law Firm SEO in Sugar Land, TX",
      color: "#334155",
      bgColor: "bg-slate-50/60",
      borderColor: "border-slate-300",
      badgeColor: "bg-slate-100 text-neutral-800",
      svgFill: "#E6F4EA",
      svgFillActive: "#334155",
      svgPoints: "30,175 232,195 250,305 30,305",
      labelX: 130,
      labelY: 250,
    },
    {
      name: "Waller County",
      short: "Waller",
      kicker: "County 3 of 3",
      title: "Waller County: Hempstead District Courthouse",
      courtLocation: "Hempstead, TX (approx. 25 miles northwest via US-290 / FM 362)",
      body: "Cases on the western side of Katy and adjacent Brookshire fall under Waller County jurisdiction, filed at the Waller County Courthouse in Hempstead. Almost no competitor page mentions Waller County courts, creating an uncontested organic void for lawyers ready to claim it.",
      searches: '"Waller County divorce Brookshire", "Hempstead district court lawyer Katy", "Waller County DWI attorney"',
      href: "/services/law-firm-seo/personal-injury",
      linkText: "See Personal Injury & Accident SEO strategy",
      color: "#262626",
      bgColor: "bg-slate-50",
      borderColor: "border-[#262626]",
      badgeColor: "bg-[#262626]/10 text-neutral-900",
      svgFill: "#E2E8F0",
      svgFillActive: "#262626",
      svgPoints: "30,30 250,30 250,110 232,195 30,175",
      labelX: 130,
      labelY: 100,
    },
  ];

  const current = counties[selectedCounty];

  return (
    <section id="county-crossroads" className="py-20 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-neutral-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>The Crossroads of Three Jurisdictions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight mb-4">
            Which Courthouse Handles a Katy Case? Harris, Fort Bend or Waller County
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            <strong>A Katy divorce is filed in the district court of the county where the filing spouse resides: Houston for Harris County, Richmond for Fort Bend County, and Hempstead for Waller County.</strong> Texas law requires six months of Texas residence and 90 days in the specific county before filing (Tex. Fam. Code § 6.301). Personal injury venue depends on where the incident occurred or where the defendant resides. Almost zero competitor websites explain this local nuance—making the firm that does the single authority Google AI Overviews cite.
          </p>
        </div>

        {/* County Switcher Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {counties.map((c, idx) => {
            const isSelected = selectedCounty === idx;
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelectedCounty(idx)}
                className={`px-5 py-3 rounded-xl font-bold text-sm transition-all border flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-neutral-900 text-white border-neutral-900 shadow-md"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <Landmark className="w-4 h-4" />
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Interactive Grid: SVG Map on Left, Detail Card on Right */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Tri-County Interactive SVG Diagram */}
          <div className="lg:col-span-5 bg-slate-50 rounded-3xl border border-slate-200 p-6 flex flex-col items-center justify-center relative shadow-sm">
            <div className="w-full text-center mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Katy Tri-County Boundary Map (Click a county)
              </span>
            </div>

            <svg
              viewBox="0 0 540 340"
              className="w-full h-auto max-w-md drop-shadow-sm"
              aria-label="Interactive Katy Tri-County Map Diagram"
            >
              {/* Render County Polygons */}
              {counties.map((c, idx) => {
                const isSelected = selectedCounty === idx;
                return (
                  <g
                    key={c.name}
                    onClick={() => setSelectedCounty(idx)}
                    className="cursor-pointer transition-all duration-300 group"
                  >
                    <polygon
                      points={c.svgPoints}
                      fill={isSelected ? c.color : c.svgFill}
                      stroke={isSelected ? "#0f172a" : "#94a3b8"}
                      strokeWidth={isSelected ? "3" : "1.5"}
                      className="transition-colors duration-300"
                    />
                    <text
                      x={c.labelX}
                      y={c.labelY}
                      textAnchor="middle"
                      fontSize="15"
                      fontWeight="800"
                      fill={isSelected ? "#ffffff" : "#1e293b"}
                      className="select-none pointer-events-none"
                    >
                      {c.short}
                    </text>
                  </g>
                );
              })}

              {/* Intersection Katy Marker Circle */}
              <circle
                cx="240"
                cy="190"
                r="16"
                fill="#ffffff"
                stroke="#0f172a"
                strokeWidth="3.5"
              />
              <circle cx="240" cy="190" r="7" fill="#10b981" />
              <text
                x="240"
                y="165"
                textAnchor="middle"
                fontSize="13"
                fontWeight="900"
                fill="#0f172a"
                className="select-none"
              >
                KATY, TX
              </text>
            </svg>

            <div className="mt-4 flex items-center justify-center gap-4 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-neutral-900" />
                Harris
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-neutral-900" />
                Fort Bend
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#262626]" />
                Waller
              </span>
            </div>
          </div>

          {/* Right Column: Active County Intelligence Card */}
          <div className="lg:col-span-7">
            <div
              className={`rounded-3xl border-2 ${current.borderColor} ${current.bgColor} p-8 sm:p-10 shadow-sm space-y-5 transition-all`}
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${current.badgeColor}`}
                >
                  {current.kicker}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {current.courtLocation}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                {current.title}
              </h3>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                {current.body}
              </p>

              <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-1.5">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  High-Converting Katy Searches This Page Targets:
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-900 font-mono">
                  {current.searches}
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={current.href}
                  className="inline-flex items-center gap-2 text-sm sm:text-base font-extrabold text-neutral-900 hover:text-neutral-950 hover:underline group"
                >
                  <span>{current.linkText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
