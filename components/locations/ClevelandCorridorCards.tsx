import React from "react";
import Image from "next/image";
import { Car, Building2, Activity, MapPin } from "lucide-react";

interface CorridorCard {
  title: string;
  badge: string;
  photoUrl: string;
  altText: string;
  caption: string;
  stats: string;
  icon: React.ReactNode;
}

const CORRIDOR_CARDS: CorridorCard[] = [
  {
    title: "Highway & Freight Corridors",
    badge: "I-90 & I-480 Corridors",
    photoUrl: "/images/services/law-firm/cleveland-i90-i480-freight-corridor.webp",
    altText: "Commercial truck and commuter traffic on I-480 Valley View Bridge in Cleveland Ohio",
    caption: "High-volume commercial & auto corridors: I-90 Dead Man's Curve, I-480 Valley View Bridge, I-71 & I-77.",
    stats: "180,000+ daily vehicles · #1 Ohio truck freight volume",
    icon: <Car className="w-4 h-4 text-neutral-900" />,
  },
  {
    title: "Civil Court Anchor",
    badge: "1200 Ontario Street",
    photoUrl: "/images/services/law-firm/cleveland-cuyahoga-common-pleas-court.webp",
    altText: "Cuyahoga County Court of Common Pleas Justice Center at 1200 Ontario St Cleveland OH",
    caption: "Cuyahoga County Court of Common Pleas (1200 Ontario St) civil tort jurisdiction.",
    stats: "Jury trials >$25k · Cuyahoga General Division venue",
    icon: <Building2 className="w-4 h-4 text-neutral-900" />,
  },
  {
    title: "Level 1 Trauma & Hospital Hubs",
    badge: "Trauma Intake Search",
    photoUrl: "/images/services/law-firm/cleveland-metrohealth-trauma-center.webp",
    altText: "Cleveland Ohio trauma center and medical district near MetroHealth and University Hospitals",
    caption: "Local trauma centers: MetroHealth Main Campus, UH Cleveland Medical Center & Fairview Hospital.",
    stats: "64% of injury victims search on mobile from care facilities",
    icon: <Activity className="w-4 h-4 text-neutral-900" />,
  },
];

export default function ClevelandCorridorCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {CORRIDOR_CARDS.map((card, idx) => (
        <div
          key={idx}
          className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
              <Image
                src={card.photoUrl}
                alt={card.altText}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-bold text-neutral-950 border border-slate-200 shadow-2xs flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-neutral-900" />
                <span>{card.badge}</span>
              </div>
              <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                <span className="text-[11px] font-medium text-white/90 block mb-0.5 drop-shadow-xs">
                  {card.stats}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white leading-tight drop-shadow-xs">
                  {card.title}
                </h4>
              </div>
            </div>

            <div className="p-4 bg-white">
              <p className="text-xs text-slate-700 leading-relaxed">
                {card.caption}
              </p>
            </div>
          </div>

          <div className="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-600 bg-white">
            <span className="flex items-center gap-1.5">
              {card.icon}
              <span>Cuyahoga Location Signal</span>
            </span>
            <span className="text-[10px] font-mono text-neutral-900 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
              Verified Hub
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
