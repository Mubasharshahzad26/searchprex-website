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
  // /autopilot only. It renders a client selector and run history — real client
  // names — so it is the one route here with a genuine reason to be private.
  //
  // /ai-search and /content-generator were briefly gated and are not any more.
  // Both are public marketing tools: /ai-search is titled "Free AI SEO Audit
  // Tool" and already ranks, and a sign-up wall in front of a free tool costs
  // more traffic than the accounts it earns.
  "/autopilot",
] as const;

/** True when `pathname` is a gated tool or sits underneath one. */
export function isGatedRoute(pathname: string): boolean {
  return GATED_TOOLS.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}
