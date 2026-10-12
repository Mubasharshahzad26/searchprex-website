"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Navigation, Landmark, Users, TrendingUp, ShieldCheck, ArrowRight } from "lucide-react";

const PHILLY_ZONES = [
  {
    name: "Center City & City Hall",
    sub: "First Judicial District · Court of Common Pleas",
    address: "Broad St & Market St, Philadelphia, PA 19107",
    coords: "39.9526,-75.1636",
    embedQuery: "Philadelphia+City+Hall+Philadelphia+PA",
    desc: "The epicentre of Pennsylvania civil litigation, housing the Philadelphia Court of Common Pleas, Municipal Court, and the federal James A. Byrne U.S. Courthouse.",
    keyCourts: ["Philadelphia Court of Common Pleas", "Philadelphia Municipal Court", "James A. Byrne U.S. Courthouse"],
  },
  {
    name: "South Philadelphia & Broad St",
    sub: "Passyunk, Point Breeze & Sports Complex",
    address: "Broad St & Snyder Ave, Philadelphia, PA 19148",
    coords: "39.9255,-75.1695",
    embedQuery: "Broad+St+and+Snyder+Ave+Philadelphia+PA",
    desc: "A densely populated residential district with high mobile search volume for vehicular crashes on I-95 and I-76, workplace injuries, and family estates.",
    keyCourts: ["South Philadelphia Municipal Outposts", "Traffic Division Court"],
  },
  {
    name: "Northeast & Roosevelt Blvd",
    sub: "Bustleton, Mayfair & Torresdale Corridors",
    address: "Roosevelt Blvd & Cottman Ave, Philadelphia, PA 19149",
    coords: "40.0384,-75.0560",
    embedQuery: "Roosevelt+Blvd+and+Cottman+Ave+Philadelphia+PA",
    desc: "Philadelphia's largest residential enclave, where high-speed traffic on Roosevelt Boulevard generates consistent personal injury and workers' compensation search volume.",
    keyCourts: ["Northeast Philadelphia District Court Offices"],
  },
  {
    name: "University City & Hospital Corridor",
    sub: "Penn Medicine, CHOP & Science Center",
    address: "3400 Civic Center Blvd, Philadelphia, PA 19104",
    coords: "39.9496,-75.1950",
    embedQuery: "Penn+Medicine+University+City+Philadelphia+PA",
    desc: "World-renowned academic and medical centers producing high-value medical malpractice inquiries, institutional employment disputes, and biotech litigation.",
    keyCourts: ["Complex Litigation Center Venues"],
  },
];

export default function PhiladelphiaDemographyMap() {
  const [activeZoneIdx, setActiveZoneIdx] = useState(0);
  const current = PHILLY_ZONES[activeZoneIdx];

  return (
    <section id="local-demography" className="border-b border-slate-200 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
            <Landmark className="h-4 w-4" />
            <span>Philadelphia Demography & Geo-Targeting</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-tight">
            Philadelphia Legal Geography: Proximity, Courthouses & Case Density
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Google calculates Map Pack rankings and local citation relevance based on hyper-local geo-signals. Explore the legal districts and courthouses that define client search behavior across Philadelphia County:
          </p>
        </div>

        {/* 4 Demographic Stats */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Users className="h-4 w-4 text-neutral-900" />
              <span>County Population</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-mono">
              1,570,000+
            </div>
            <p className="text-xs text-slate-500">6.2M+ in Greater Philadelphia Metro</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Landmark className="h-4 w-4 text-neutral-900" />
              <span>Legal Establishments</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-mono">
              3,400+
            </div>
            <p className="text-xs text-slate-500">Fierce competition for vanity search</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <TrendingUp className="h-4 w-4 text-neutral-800" />
              <span>Complex Litigation</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-mono">
              Top 5 US
            </div>
            <p className="text-xs text-slate-500">National mass tort magnet</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Navigation className="h-4 w-4 text-neutral-900" />
              <span>Map Proximity Radius</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-mono">
              1.8 Miles
            </div>
            <p className="text-xs text-slate-500">Requires dedicated neighborhood silos</p>
          </div>
        </div>

        {/* Interactive Zone Switcher & Embedded Google Map */}
        <div className="mt-12 rounded-3xl border-2 border-slate-200 bg-white overflow-hidden shadow-sm">
          {/* Zone Buttons */}
          <div className="flex flex-wrap border-b border-slate-200 bg-slate-50/80 p-3 gap-2">
            {PHILLY_ZONES.map((z, idx) => {
              const isSelected = activeZoneIdx === idx;
              return (
                <button
                  key={z.name}
                  onClick={() => setActiveZoneIdx(idx)}
                  className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-neutral-900 text-white shadow-xs"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {z.name}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            {/* Left Zone Info */}
            <div className="lg:col-span-5 p-6 sm:p-8 space-y-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200">
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    Selected Legal Jurisdiction
                  </span>
                  <h3 className="text-2xl font-extrabold text-neutral-950 mt-1">
                    {current.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {current.sub}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <MapPin className="h-4 w-4 text-neutral-900 shrink-0" />
                  <span className="font-semibold">{current.address}</span>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {current.desc}
                </p>

                <div>
                  <strong className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                    Key Judicial Centers & Anchor Venues:
                  </strong>
                  <div className="space-y-1.5">
                    {current.keyCourts.map((court, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50/40 px-3 py-1.5 rounded-lg border border-slate-100"
                      >
                        <Landmark className="h-3.5 w-3.5 text-neutral-900 shrink-0" />
                        <span>{court}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href="/services/local-seo"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 hover:underline"
                >
                  <span>Explore Local SEO Architecture</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Embedded Google Map */}
            <div className="lg:col-span-7 relative min-h-[360px] lg:min-h-[460px] bg-slate-100">
              <iframe
                title={`Google Map - ${current.name}`}
                width="100%"
                height="100%"
                className="w-full h-full min-h-[360px] border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(current.embedQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
              />
            </div>
          </div>
        </div>

        {/* Local Verified Photos Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="group relative overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-xs hover:border-slate-300 hover:shadow-xl transition-all">
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <Image
                src="/images/locations/philadelphia-legal-district.webp"
                alt="Philadelphia Center City Legal District and City Hall"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-200 block mb-1">
                  Judicial Hub
                </span>
                <h4 className="text-xl font-extrabold text-white">
                  Center City Legal Corridor & City Hall
                </h4>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-600 leading-relaxed">
                Home to the Philadelphia Court of Common Pleas, major regional plaintiff litigation firms, and the First Judicial District administration.
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-xs hover:border-slate-300 hover:shadow-xl transition-all">
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <Image
                src="/images/locations/philadelphia-law-consultation.webp"
                alt="Philadelphia Law Practice Client Consultation"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-200 block mb-1">
                  Client Intake
                </span>
                <h4 className="text-xl font-extrabold text-white">
                  High-Touch Inbound Retainer Conversion
                </h4>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-600 leading-relaxed">
                Converting urgent legal inquiries from Center City, South Philly, and the suburbs into signed cases through transparent attribution.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
