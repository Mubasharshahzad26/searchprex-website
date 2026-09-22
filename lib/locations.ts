// lib/locations.ts
//
// One index over both city data sources, for the /locations hub, the state
// hubs, breadcrumbs, the nav, the footer and the sitemap.
//
// Two sources exist for historical reasons: Kansas was built first, as its own
// static route tree (lib/kansas-cities.ts, /locations/kansas/...), and every
// other state came later through lib/city-pages.ts and the dynamic
// /locations/[state]/[city] template. Nothing here changes those URLs.
//
// A state gets a hub page only when it has at least two cities. A hub that
// links to a single page is a thin page by definition; for those states the
// city page's breadcrumb goes straight from Locations to the city, and
// /locations/[state] redirects to that city.

import { CITY_PAGES } from "./city-pages";
import { kansasCities } from "./kansas-cities";
import { INDUSTRY_PAGES, type IndustryPage } from "./industry-pages";

/**
 * The practice-area page for a demand label like "Personal injury" or
 * "Criminal defence & DWI". The city data is written in British spelling
 * ("defence") and the pages in American ("Criminal Defense"), so a plain
 * substring match silently skipped criminal defense everywhere.
 */
export function findPracticePage(area: string): IndustryPage | undefined {
  const normalized = area.toLowerCase().replace(/defence/g, "defense");
  return INDUSTRY_PAGES.find((p) => normalized.includes(p.name.toLowerCase()));
}

/** "A", "A and B", "A, B and C". */
export function joinNames(names: string[]): string {
  if (names.length <= 2) return names.join(" and ");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

export interface LocationCity {
  name: string;
  href: string;
  county?: string;
  /** One line on what makes this market different, for hub cards. */
  blurb: string;
}

export interface LocationState {
  slug: string;
  name: string;
  abbr: string;
  /** Null when the state has one city and therefore no hub page. */
  hubHref: string | null;
  cities: LocationCity[];
}

export const MIN_CITIES_FOR_STATE_HUB = 2;

function firstSentence(text: string): string {
  const match = text.match(/^.+?[.!?](?=\s|$)/);
  return (match ? match[0] : text).trim();
}

function buildStates(): LocationState[] {
  const bySlug = new Map<string, LocationState>();

  for (const c of CITY_PAGES) {
    const state =
      bySlug.get(c.stateSlug) ??
      { slug: c.stateSlug, name: c.state, abbr: c.stateAbbr, hubHref: null, cities: [] };
    state.cities.push({
      name: c.city,
      href: `/locations/${c.stateSlug}/${c.citySlug}`,
      county: c.county,
      blurb: c.legalContext.heading,
    });
    bySlug.set(c.stateSlug, state);
  }

  bySlug.set("kansas", {
    slug: "kansas",
    name: "Kansas",
    abbr: "KS",
    // Kansas has had its own hand-built hub since before this index existed.
    hubHref: "/locations/kansas",
    cities: kansasCities.map((k) => ({
      name: k.name,
      href: `/locations/kansas/${k.slug}`,
      county: k.county,
      // The overview's first sentence describes the market. heroSub was the
      // other candidate, but it is a pitch ("Rank #1 for legal searches…"),
      // which reads as a promise on a hub listing twenty cities.
      blurb: firstSentence(k.overview),
    })),
  });

  for (const state of bySlug.values()) {
    if (state.slug !== "kansas" && state.cities.length >= MIN_CITIES_FOR_STATE_HUB) {
      state.hubHref = `/locations/${state.slug}`;
    }
  }

  return [...bySlug.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export const LOCATION_STATES: LocationState[] = buildStates();

export function getLocationState(slug: string): LocationState | undefined {
  return LOCATION_STATES.find((s) => s.slug === slug);
}

/** States served by the dynamic /locations/[state] hub (Kansas has its own). */
export function getDynamicStateHubSlugs(): string[] {
  return LOCATION_STATES.filter((s) => s.slug !== "kansas" && s.hubHref).map((s) => s.slug);
}

export const LOCATION_CITY_COUNT = LOCATION_STATES.reduce((n, s) => n + s.cities.length, 0);
