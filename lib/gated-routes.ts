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

/**
 * Currently empty — nothing on the public site requires sign-in.
 *
 * /autopilot was the last entry and is now open by request: the dashboard is
 * being demoed and its functionality is heading into a SaaS product, so it
 * needs to be reachable without an account. Note it still renders a client
 * selector and run history, so it is deliberately kept out of the index
 * (robots noindex in app/autopilot/page.tsx, and absent from the sitemap) —
 * anyone with the link can open it, but Google will not surface client names.
 *
 * The plumbing stays because the SaaS work will need it: add a path here and
 * both middleware.ts and app/sitemap.ts pick it up, which is the pairing that
 * previously drifted. Adding a path here is not enough on its own — the
 * middleware `matcher` at the bottom of middleware.ts must list it too, or the
 * middleware never runs for that route.
 */
export const GATED_TOOLS: readonly string[] = [];

/** True when `pathname` is a gated tool or sits underneath one. */
export function isGatedRoute(pathname: string): boolean {
  return GATED_TOOLS.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}
