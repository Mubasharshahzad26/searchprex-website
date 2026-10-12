"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Users, DollarSign, Landmark, Compass, CheckCircle2 } from "lucide-react";

export default function KatyDemographyMap() {
  const stats = [
    {
      label: "Greater Katy Population",
      value: "380,000+",
      subtext: "Rapidly expanding tri-county metro area",
      icon: Users,
    },
    {
      label: "Median Household Income",
      value: "$112,400",
      subtext: "High-asset divorce & estate planning demand",
      icon: DollarSign,
    },
    {
      label: "Converging County Courts",
      value: "3 Counties",
      subtext: "Harris, Fort Bend & Waller jurisdictions",
      icon: Landmark,
    },
    {
      label: "Major Freight & Transit Arteries",
      value: "I-10 & SH 99",
      subtext: "High-volume commuter & truck crash litigation",
      icon: Compass,
    },
  ];

  return (
    <section id="map" className="py-20 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-neutral-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Geographic &amp; Demographic Landscape</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight mb-4">
            Katy Service Area, Demographics &amp; Court Corridor Map
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Greater Katy represents one of the fastest-growing and most affluent legal markets in Texas. Spanning across Harris, Fort Bend, and Waller counties, its residents require sophisticated local counsel who understand suburban geography, high-net-worth property division, and multi-county court venues.
          </p>
        </div>

        {/* 4 Demographics Stat Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-2 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {s.label}
                  </span>
                  <Icon className="w-4 h-4 text-neutral-900" />
                </div>
                <div className="text-3xl font-extrabold text-neutral-950">
                  {s.value}
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  {s.subtext}
                </div>
              </div>
            );
          })}
        </div>

        {/* Photography & Interactive Map Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-8">
          {/* Left: Verified Local Katy Images */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative h-64 sm:h-72 rounded-3xl overflow-hidden border border-slate-200 shadow-md group">
              <Image
                src="/images/locations/katy-legal-district.webp"
                alt="Katy Texas commercial legal district and courthouse corridor"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <div className="text-white font-extrabold text-base">
                    Katy Commercial Corridor &amp; Grand Parkway Hub
                  </div>
                  <div className="text-slate-300 text-xs font-medium">
                    Serving Harris, Fort Bend, and Waller County Clients
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-64 sm:h-72 rounded-3xl overflow-hidden border border-slate-200 shadow-md group">
              <Image
                src="/images/locations/katy-law-consultation.webp"
                alt="Attorney meeting with client for consultation in Katy Texas"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <div className="text-white font-extrabold text-base">
                    Local Client Intake &amp; Case Strategy
                  </div>
                  <div className="text-slate-300 text-xs font-medium">
                    Personalized Representation for Master-Planned Communities
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Embedded Google Map */}
          <div className="lg:col-span-7 h-[535px] rounded-3xl overflow-hidden border border-slate-200 shadow-md relative bg-slate-100">
            <iframe
              title="Katy Texas Legal Service Area Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110756.2625299615!2d-95.89436400305842!3d29.78578652243687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8641215b31b39a41%3A0x6b805c86c1d00c3b!2sKaty%2C%20TX!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
