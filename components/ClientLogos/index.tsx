"use client";

// components/ClientLogos/index.tsx
//
// Two rows, moving in opposite directions.
//
// WHAT CHANGED, AND WHY
//
// The old marquee was fifteen names in different fonts: no logos, no links,
// nothing a visitor could check. A name that leads nowhere is decoration, and
// on a page whose whole argument is "every number has a screenshot" it is the
// weakest thing on the screen.
//
//   Row 1 — clients with a published case study. Real logo where one could be
//           taken from the client's own site, the headline metric from that
//           case study, and a link to it. The metric is read from
//           app/case-studies/data.ts rather than typed here, so the marquee can
//           never quote a number the case study does not.
//   Row 2 — the other clients, unchanged, as before. Kept because they are
//           real clients; they simply do not have a write-up to link to yet.
//
// Names are normalised to match the case studies. The marquee said "Dolls
// Cleaning" and "HVAC Services Team" while the studies say "Doll's Cleaning"
// and "Local HVAC Services" — three spellings, and no way to tell they were the
// same business.
//
// Logos: SMK Store and HVAC Services Team were taken from their own websites;
// Michigan Sports & Outdoor's was supplied directly (its site sits behind a
// Cloudflare challenge) and cropped to the mark for the square tile — the full
// wordmark is kept alongside as michigan-sports-outdoor-full.png.
//
// Motion is CSS only, pauses on hover and focus, and stops entirely under
// prefers-reduced-motion — where the rows wrap instead of scrolling. The
// second copy of each track exists only for the seamless loop, so it is hidden
// from assistive tech and its links are removed from the tab order.

import Image from "next/image";
import Link from "next/link";

import { caseStudies, detailUrl } from "@/app/case-studies/data";

type Featured = {
  name: string;
  /** The `client` value in app/case-studies/data.ts. */
  caseClient: string;
  logo?: { src: string; width: number; height: number };
};

const FEATURED: Featured[] = [
  { name: "SMK Store", caseClient: "SMK Store", logo: { src: "/images/clients/smk-store.png", width: 400, height: 211 } },
  {
    name: "Michigan Sports & Outdoor",
    caseClient: "Michigan Outdoor Sports",
    logo: { src: "/images/clients/michigan-sports-outdoor.png", width: 160, height: 160 },
  },
  {
    name: "HVAC Services Team",
    caseClient: "Local HVAC Services",
    logo: { src: "/images/clients/hvac-services-team.webp", width: 500, height: 500 },
  },
  { name: "Doll's Cleaning", caseClient: "Doll's Cleaning" },
  { name: "Mammoth Roofing", caseClient: "Mammoth Roofing" },
  { name: "Door Doctor", caseClient: "Door Doctor" },
  { name: "Remit Choice", caseClient: "Remit Choice" },
];

const OTHERS = [
  "FarmGhar",
  "AAA Mobile Tyres",
  "ASR",
  "ACAS",
  "Canturaus Academy",
  "Orlando WebPros",
  "Adscarry",
  "Garage Door Pros MI",
  "Tananace",
];

const featured = FEATURED.map((f) => {
  const cs = caseStudies.find((c) => c.client === f.caseClient);
  return {
    ...f,
    href: cs ? detailUrl(cs) : undefined,
    metric: cs?.metrics?.[0],
    industry: cs?.industry,
  };
});

function initials(name: string) {
  return name
    .replace(/[^A-Za-z& ]/g, "")
    .split(/\s+/)
    .filter((w) => w && w !== "&")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function FeaturedTrack({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-stretch gap-4 pr-4" aria-hidden={hidden || undefined}>
      {featured.map((c) => {
        const body = (
          <>
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#e5e7eb] bg-white">
              {c.logo ? (
                <Image
                  src={c.logo.src}
                  alt={hidden ? "" : `${c.name} logo`}
                  width={c.logo.width}
                  height={c.logo.height}
                  className="h-9 w-9 object-contain"
                />
              ) : (
                <span className="text-xs font-black tracking-tight text-[#534AB7]">{initials(c.name)}</span>
              )}
            </span>
            <span className="min-w-0">
              <span className="block whitespace-nowrap text-sm font-black text-[#0a0f2e]">{c.name}</span>
              {c.metric ? (
                <span className="block whitespace-nowrap text-xs">
                  <strong className="font-black text-[#196b4d]">{c.metric.v}</strong>{" "}
                  <span className="text-[#5b6472]">{c.metric.l.toLowerCase()}</span>
                </span>
              ) : null}
            </span>
          </>
        );
        return (
          <li key={c.name}>
            {c.href ? (
              <Link
                href={c.href}
                tabIndex={hidden ? -1 : undefined}
                className="flex items-center gap-3 rounded-xl border border-[#e5e7eb] bg-white px-4 py-2.5 shadow-sm transition-all hover:border-[#1a7d59] hover:shadow-md"
                title={`${c.name} case study`}
              >
                {body}
              </Link>
            ) : (
              <span className="flex items-center gap-3 rounded-xl border border-[#e5e7eb] bg-white px-4 py-2.5">{body}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function OthersTrack({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {OTHERS.map((name) => (
        <li key={name} className="whitespace-nowrap text-sm font-bold tracking-tight text-[#6b7280]">
          {name}
        </li>
      ))}
    </ul>
  );
}

export default function ClientLogos() {
  return (
    <section aria-labelledby="clients-heading" className="border-t border-[#e5e7eb] bg-[#f8f9fc] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
          <h2 id="clients-heading" className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#534AB7]">
            Businesses I&apos;ve grown
          </h2>
          <Link href="/case-studies" className="text-xs font-bold text-[#196b4d] hover:underline">
            Every case study, with the screenshots →
          </Link>
        </div>

        <div className="client-marquee relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-[#f8f9fc] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-[#f8f9fc] to-transparent" />

          <div className="client-row client-row-a flex w-max">
            <FeaturedTrack />
            <FeaturedTrack hidden />
          </div>
          <div className="client-row client-row-b mt-5 flex w-max">
            <OthersTrack />
            <OthersTrack hidden />
          </div>
        </div>
      </div>

      <style>{`
        .client-row-a { animation: client-left 45s linear infinite; }
        .client-row-b { animation: client-right 55s linear infinite; }
        .client-marquee:hover .client-row,
        .client-marquee:focus-within .client-row { animation-play-state: paused; }
        @keyframes client-left  { from { transform: translateX(0); }    to { transform: translateX(-50%); } }
        @keyframes client-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        @media (prefers-reduced-motion: reduce) {
          .client-row { animation: none; width: auto; flex-wrap: wrap; row-gap: 12px; }
          .client-row > ul[aria-hidden] { display: none; }
          .client-row > ul { flex-wrap: wrap; row-gap: 12px; }
        }
      `}</style>
    </section>
  );
}
