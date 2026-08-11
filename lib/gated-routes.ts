// lib/gated-routes.ts
//
// The single list of routes that require a signed-in account.
//
// Two consumers have to agree on this and previously could not:
//
//   middleware.ts  turns anonymous visitors away
//   app/sitemap.ts must not advertise a URL a crawler gets redirected off
//
// Keeping the list in one place is not tidiness — the sitemap merges static
// routes WITH rows from the CMS, so deleting an entry from its static list is
// not enough to remove a page. Without a shared list, gating a route in
// middleware silently leaves it in the sitemap, which is exactly the
// contradictory signal that shows up as a Search Console error.

export const GATED_TOOLS = [
  "/autopilot",
  "/content-generator",
  // /ai-search is deliberately NOT here. It is titled "Free AI SEO Audit Tool",
  // ranks at position 20 for its own queries and sits at sitemap priority 0.9 —
  // gating the page would drop it from the index and end that traffic, which is
  // the opposite of what a lead magnet is for. The ACTION is gated instead, in
  // app/api/seo-search/route.ts via lib/require-auth. Page public, tool gated.
] as const;

/** True when `pathname` is a gated tool or sits underneath one. */
export function isGatedRoute(pathname: string): boolean {
  return GATED_TOOLS.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}
