// lib/location-indexing.ts
//
// Location pages kept live for visitors but out of Google's index.
//
// Each one had 0–1 impressions in Search Console over the 28 days to
// 29 Sep 2026, against ~400 across the location set. A city page with no
// search demand and no client in that city adds nothing a searcher needs and
// is exactly the doorway pattern Google's spam policies describe: many city
// pages funnelling to one destination. Noindex keeps the URLs working (links
// from hubs and practice pages still resolve) while the index only carries the
// cities that earn impressions.
//
// Reversible: remove a path here once real demand or a client in that city
// appears. The sitemap reads the same set, so the two never disagree.

export const NOINDEX_LOCATION_PATHS: ReadonlySet<string> = new Set([
  "/locations/pennsylvania/philadelphia",
  "/locations/new-mexico/albuquerque",
  "/locations/louisiana/baton-rouge",
  "/locations/california/san-jose",
  "/locations/texas/plano",
  "/locations/kansas/overland-park",
  "/locations/kansas/lawrence",
  "/locations/kansas/topeka",
]);

export function isLocationIndexable(path: string): boolean {
  return !NOINDEX_LOCATION_PATHS.has(path);
}
