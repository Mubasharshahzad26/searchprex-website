// components/CoverageSection.tsx
//
// "Where I work" — every state hub and city page, linked from one block.
//
// Built first on /home-page-test and moved here so the live homepage and the
// test page render the same thing. It exists because the homepage body linked
// to none of the city pages; only the footer and one Services card did. The
// homepage is the strongest URL on the domain, and that is the mechanism
// behind every city page except Wichita sitting at zero impressions — the
// pages were written, they were just not linked from anywhere that counted.
//
// The counts are read from lib/locations, not typed, so the claim on the page
// can never get ahead of the pages that back it. "All major US states" was the
// wording asked for; nine is the number that exists, and the dashed card is the
// honest way to invite the rest.
//
// A server component on purpose: these are the links that matter most for
// crawling, and they should be in the HTML, not added after hydration.

import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import { LOCATION_CITY_COUNT, LOCATION_STATES } from "@/lib/locations";
import { OFFER_HREF } from "@/lib/offer";

const INK = "#0a0f2e";
const BODY = "#5b6472";
const GREEN_DARK = "#196b4d";
const PURPLE = "#534AB7";
const LINE = "#cdd2dd";

export default function CoverageSection() {
  const states = LOCATION_STATES.length;

  return (
    <section
      id="locations"
      aria-labelledby="coverage-heading"
      className="border-y bg-white py-16 sm:py-20"
      style={{ borderColor: "#e5e7eb" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: PURPLE }}>
            Where I work
          </p>
          <h2
            id="coverage-heading"
            className="text-2xl font-black tracking-tight sm:text-3xl lg:text-[2.1rem]"
            style={{ color: INK }}
          >
            Law firm and local SEO in {states} US states, {LOCATION_CITY_COUNT} cities
          </h2>
          <p className="mt-3 text-sm leading-relaxed sm:text-base" style={{ color: BODY }}>
            One client per city. Each page below covers that market&apos;s courts, practice-area demand
            and competition — pick yours.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LOCATION_STATES.map((state) => (
            <div key={state.slug} className="rounded-2xl border bg-[#f8f9fc] p-5" style={{ borderColor: LINE }}>
              <div className="mb-3 flex items-center justify-between gap-2">
                {state.hubHref ? (
                  <Link
                    href={state.hubHref}
                    className="inline-flex items-center gap-1.5 text-base font-black tracking-tight transition-opacity hover:opacity-70"
                    style={{ color: INK }}
                  >
                    <MapPin className="h-4 w-4 flex-shrink-0" style={{ color: PURPLE }} aria-hidden="true" />
                    {state.name}
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-base font-black tracking-tight" style={{ color: INK }}>
                    <MapPin className="h-4 w-4 flex-shrink-0" style={{ color: PURPLE }} aria-hidden="true" />
                    {state.name}
                  </span>
                )}
                <span
                  className="rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                  style={{ borderColor: LINE, color: BODY }}
                >
                  {state.cities.length} {state.cities.length === 1 ? "city" : "cities"}
                </span>
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {state.cities.map((city) => (
                  <li key={city.href}>
                    <Link
                      href={city.href}
                      className="inline-block rounded-full border bg-white px-2.5 py-1 text-xs transition-all hover:border-[#1a7d59] hover:text-[#196b4d]"
                      style={{ borderColor: LINE, color: BODY }}
                    >
                      {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div
            className="flex flex-col justify-center rounded-2xl border-2 border-dashed bg-white p-5"
            style={{ borderColor: LINE }}
          >
            <p className="text-base font-black tracking-tight" style={{ color: INK }}>
              Your city is not listed?
            </p>
            <p className="mt-1.5 text-xs leading-relaxed" style={{ color: BODY }}>
              These are the states with pages built, not the limit of where I work. Send your URL and I
              will tell you what the search landscape looks like in your market.
            </p>
            <Link
              href={OFFER_HREF}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold transition-all hover:gap-2.5"
              style={{ color: GREEN_DARK }}
            >
              Ask about your city <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <p className="mt-6 text-sm">
          <Link href="/locations" className="font-bold underline decoration-2 underline-offset-2" style={{ color: PURPLE }}>
            All locations
          </Link>
        </p>
      </div>
    </section>
  );
}
