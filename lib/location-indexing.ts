// lib/location-indexing.ts
//
// Controls whether a location page is marked index,follow and listed in the
// XML sitemap and internal service-page location hubs.
//
// All custom-architected location pages are now fully enabled for indexing and
// crawling (index, follow).

export const NOINDEX_LOCATION_PATHS: ReadonlySet<string> = new Set([]);

export function isLocationIndexable(path: string): boolean {
  return !NOINDEX_LOCATION_PATHS.has(path);
}
