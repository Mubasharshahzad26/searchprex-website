"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Users, Scale, MapPin, Building, ShieldCheck, ExternalLink } from "lucide-react";

export default function AlbuquerqueDemographyMap() {
  const [activeZone, setActiveZone] = useState<number>(0);

  const demographicStats = [
    { label: "City & Metro Population", value: "915,000+", sub: "Bernalillo, Sandoval, & Valencia Counties" },
    { label: "Active Legal Practices", value: "2,100+", sub: "Second Judicial District Court jurisdiction" },
    { label: "Bilingual Community", value: "49.8%", sub: "Untapped Spanish legal search demand" },
    { label: "Major Highway Corridors", value: "I-25 & I-40", sub: "High-volume catastrophic vehicle crashes" },
  ];

  const legalZones = [
    {
      name: "Downtown & Lomas Blvd Legal District",
      courts: "Second Judicial District Court · Bernalillo County Metropolitan Court",
      desc: "The primary judicial epicenter of New Mexico. Dense clusters of litigation firms, criminal defense practitioners, and government agencies.",
      center: "35.0844,-106.6504",
    },
    {
      name: "Westside & Coors Blvd Corridor",
      courts: "Westside Municipal Sub-Station · Rio Grande Crossings",
      desc: "Fast-growing residential zone with dense commuter traffic over the river bridges, driving high accident injury and family-law consultation volume.",
      center: "35.1400,-106.7150",
    },
    {
      name: "Northeast Heights & Uptown",
      courts: "Uptown Commercial District · East Central Corridor",
      desc: "Affluent residential neighborhood and commercial shopping hubs generating estate planning, high-asset divorce, and commercial dispute retainers.",
      center: "35.1100,-106.5700",
    },
    {
      name: "Nob Hill & University (UNM)",
      courts: "University of New Mexico School of Law Corridor",
      desc: "Historic cultural corridor anchored by UNM Law. High mobile search density for civil rights, criminal defense, and young professional legal needs.",
      center: "35.0800,-106.6050",
    },
  ];

  const currentZone = legalZones[activeZone];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#534AB7]/10 text-[#534AB7] text-xs font-bold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Albuquerque Demographics &amp; Geographic Authority</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight mb-4">
            Albuquerque Legal Market Demographics &amp; Interactive Court Map
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Google’s local algorithms evaluate physical proximity, municipal boundaries, and community demographic signals. Here is the real geographic landscape our Albuquerque SEO programs optimize for.
          </p>
        </div>

        {/* 4 Demography Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {demographicStats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-[#534AB7]/40 transition-all"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-[#534AB7] mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#0a0f2e] mb-0.5">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-500">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Local Verified Photos Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Photo 1: Legal District */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white group">
            <div className="relative h-64 sm:h-72 w-full">
              <Image
                src="/images/locations/albuquerque-legal-district.webp"
                alt="Bernalillo County Metropolitan Courthouse with Sandia Mountains in Albuquerque"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f2e]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#534AB7] px-2.5 py-1 rounded-md mb-1.5 inline-block">
                  Metropolitan Court Plaza
                </span>
                <h3 className="text-lg font-bold">
                  Bernalillo County Metropolitan Courthouse &amp; Lomas Blvd
                </h3>
                <p className="text-xs text-slate-200 mt-1">
                  Handles New Mexico&apos;s highest daily volume of DWI, misdemeanor, and initial arraignment dockets.
                </p>
              </div>
            </div>
          </div>

          {/* Photo 2: Strategy Review */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white group">
            <div className="relative h-64 sm:h-72 w-full">
              <Image
                src="/images/locations/albuquerque-law-consultation.webp"
                alt="Law firm attorney and SEO strategist analyzing Albuquerque market performance overlooking Sandia Mountains"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f2e]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#1a7d59] px-2.5 py-1 rounded-md mb-1.5 inline-block">
                  Executive Consultation
                </span>
                <h3 className="text-lg font-bold">
                  Strategic Case Acquisition Overlooking the Sandia Crest
                </h3>
                <p className="text-xs text-slate-200 mt-1">
                  Founder Mubashar Sharif conducts quarterly strategy reviews analyzing qualified retainers by ZIP code.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Zone Switcher & Embedded Google Map */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 pb-4 mb-6">
            <div>
              <span className="text-xs font-bold text-[#534AB7] uppercase tracking-wider">
                Geographic Proximity Focus
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0a0f2e]">
                Explore Albuquerque Legal Jurisdictions
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {legalZones.map((zone, idx) => (
                <button
                  key={zone.name}
                  onClick={() => setActiveZone(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeZone === idx
                      ? "bg-[#534AB7] text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {zone.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Zone Information */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-bold text-[#534AB7] uppercase tracking-wider mb-1">
                  <Building className="w-4 h-4 text-[#534AB7]" />
                  <span>Selected Sub-District</span>
                </div>
                <h4 className="text-base font-extrabold text-[#0a0f2e]">
                  {currentZone.name}
                </h4>
                <div className="text-xs text-slate-500 font-semibold mt-1">
                  {currentZone.courts}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                  {currentZone.desc}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#1a7d59]" />
                <span>Geotagged Google Business Profile Coordinates Configured</span>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="lg:col-span-7 h-72 sm:h-80 rounded-xl overflow-hidden border border-slate-200 shadow-inner relative">
              <iframe
                title="Albuquerque Legal District and Courts Map"
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d104443.9168923055!2d-106.72149594584282!3d35.10188737672101!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87220addd30f7be1%3A0x82ea60b21a868464!2sAlbuquerque%2C%20NM!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[20%] contrast-[1.05]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
