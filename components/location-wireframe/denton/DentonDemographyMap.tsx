"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Users, Scale, MapPin, Building, ShieldCheck } from "lucide-react";

export default function DentonDemographyMap() {
  const [activeZone, setActiveZone] = useState<number>(0);

  const demographicStats = [
    { label: "Denton County Population", value: "950,000+", sub: "Fastest growing North Texas county" },
    { label: "University Student Body", value: "60,000+", sub: "UNT & Texas Woman's University (TWU)" },
    { label: "Active Legal Practitioners", value: "1,200+", sub: "Denton County Bar Association footprint" },
    { label: "Major Highway Arteries", value: "I-35E & I-35W", sub: "I-35 merge corridor high-impact crashes" },
  ];

  const legalZones = [
    {
      name: "Historic Courthouse Square",
      courts: "Denton County Courthouse-on-the-Square · 110 W Hickory St",
      desc: "The historic legal and cultural heart of Denton. Concentration of established criminal defense trial attorneys, family law practices, and title firms.",
    },
    {
      name: "UNT & TWU Campus Corridor",
      courts: "University Student Conduct Boards · Municipal Courts",
      desc: "Dense student corridor along Elm and Locust Streets. Generates high-volume alcohol, possession, and young driver collision legal searches.",
    },
    {
      name: "Rayzor Ranch & Loop 288 Hub",
      courts: "Commercial Trial Venues · Regional Business Centers",
      desc: "Booming northern retail and medical corridor generating commercial real estate, corporate litigation, and complex injury claims.",
    },
    {
      name: "I-35E South Corridor & Corinth",
      courts: "Southern Denton County District Courts",
      desc: "Heavy commuter corridor connecting Denton with Lewisville and Dallas. High incidence of catastrophic commercial vehicle collisions.",
    },
  ];

  const currentZone = legalZones[activeZone];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-neutral-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Denton County Demographics &amp; Geographic Authority</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mb-4">
            Denton Legal Market Demographics &amp; Interactive Court Map
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Google evaluates hyper-local proximity and county municipal jurisdictions. Here is the demographic reality our Denton legal SEO campaigns optimize for.
          </p>
        </div>

        {/* 4 Demography Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {demographicStats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-neutral-950 mb-0.5">
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
          {/* Photo 1: Historic Denton Square */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white group">
            <div className="relative h-64 sm:h-72 w-full">
              <Image
                src="/images/locations/denton-legal-district.webp"
                alt="Historic Denton County Courthouse on the Square in Denton, Texas"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-neutral-900 px-2.5 py-1 rounded-md mb-1.5 inline-block">
                  Courthouse on the Square
                </span>
                <h3 className="text-lg font-bold">
                  Historic Denton County Courthouse-on-the-Square
                </h3>
                <p className="text-xs text-slate-200 mt-1">
                  1896 limestone landmark anchoring Denton County legal identity and judicial heritage.
                </p>
              </div>
            </div>
          </div>

          {/* Photo 2: Executive Consultation */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white group">
            <div className="relative h-64 sm:h-72 w-full">
              <Image
                src="/images/locations/denton-law-consultation.webp"
                alt="Law firm trial attorney reviewing Denton County criminal defense and injury cases overlooking the courthouse dome"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-neutral-900 px-2.5 py-1 rounded-md mb-1.5 inline-block">
                  Executive Legal Consultation
                </span>
                <h3 className="text-lg font-bold">
                  Strategic Case Review Overlooking Denton Square
                </h3>
                <p className="text-xs text-slate-200 mt-1">
                  Founder Mubashar Sharif conducts quarterly strategy reviews analyzing qualified retainers by campus and ZIP code.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Zone Switcher & Embedded Google Map */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 pb-4 mb-6">
            <div>
              <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Geographic Proximity Focus
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-950">
                Explore Denton Legal Corridors
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {legalZones.map((zone, idx) => (
                <button
                  key={zone.name}
                  onClick={() => setActiveZone(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeZone === idx
                      ? "bg-neutral-900 text-white shadow-xs"
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
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1">
                  <Building className="w-4 h-4 text-neutral-900" />
                  <span>Selected Sub-District</span>
                </div>
                <h4 className="text-base font-extrabold text-neutral-950">
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
                <ShieldCheck className="w-4 h-4 text-neutral-800" />
                <span>Geotagged Google Business Profile Coordinates Configured</span>
              </div>
            </div>

            {/* Embedded Google Map of Denton Square */}
            <div className="lg:col-span-7 h-72 sm:h-80 rounded-xl overflow-hidden border border-slate-200 shadow-inner relative">
              <iframe
                title="Denton County Courthouse and Legal District Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106682.3556113886!2d-97.18956974587895!3d33.21484124317135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864dca889ff02773%3A0x869b2d2f2325c345!2sDenton%2C%20TX!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
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
