// Server component: nothing here is interactive, and the state list is read
// from lib/locations at render time.

import Link from "next/link";

import { LOCATION_STATES } from "@/lib/locations";

// The list used to be typed: California, Texas, Florida, New York, Illinois.
// Florida, New York and Illinois have no pages, and three sections further down
// the same homepage the Coverage block says nine states and names them. Two
// contradictory coverage claims on one page, one of them unbacked. It is now
// the states that actually have pages, most cities first, each linking to its
// hub (or its only city), with the remainder pointing at the full block.
const SHOWN = 5;
const ranked = [...LOCATION_STATES].sort((a, b) => b.cities.length - a.cities.length);
const states = ranked.slice(0, SHOWN).map((s) => ({
  name: s.name,
  href: s.hubHref ?? s.cities[0]?.href ?? "/locations",
}));
const more = Math.max(0, ranked.length - SHOWN);

export default function TrustBar() {
  return (
    <section className="border-y border-[#e5e7eb] bg-[#f8f9fc] py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Left Text */}
          <p className="text-xs font-bold uppercase tracking-widest text-[#566070]">
            Serving Law Firms & Stores in:
          </p>

          {/* States — static. This was a marquee that translated on a 20s
              loop; it moved for its own sake, cost a continuous animation,
              and was harder to read than the plain list it contained. */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {states.map((state) => (
              <Link
                key={state.name}
                href={state.href}
                className="flex items-center gap-2 whitespace-nowrap text-xs font-bold uppercase tracking-widest text-[#0a0f2e] hover:text-[#534AB7]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#534AB7]" aria-hidden="true" />
                {state.name}
              </Link>
            ))}
            {more > 0 ? (
              <a
                href="#locations"
                className="whitespace-nowrap text-xs font-bold uppercase tracking-widest text-[#534AB7] hover:underline"
              >
                +{more} more
              </a>
            ) : null}
          </div>

          {/* Availability.
              This used to read "2 Spots Remaining This Month" — a hardcoded
              string with a live-looking pulse animation that never changed. A
              returning visitor sees the same "2" forever, which teaches them
              that our urgency signals are theatre. Replaced with the exclusivity
              policy we already state in the FAQ: true without maintenance, and
              genuinely differentiating. Static dot, because nothing is live. */}
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#15803d]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#15803d]">
              One Client Per City, Per Practice Area
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
