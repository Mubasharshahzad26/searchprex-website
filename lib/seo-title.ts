// lib/seo-title.ts
//
// Page titles carry no "| SearchPrex" suffix: the brand already shows as the
// site name in results (WebSite schema, og:site_name), and the 60 characters
// Google displays are better spent on the keyword and the offer. The root
// layout's title template is '%s'. Titles that come from the CMS or older data
// may still end with the brand; this strips it.

export function stripBrand(title: string): string {
  return title.replace(/\s*[|—–-]\s*SearchPrex\s*$/i, "").trim();
}

/**
 * Pages that already rank with their current "<title> | SearchPrex" title —
 * the location pages and the Local SEO News hub — keep it exactly, so the
 * template change doesn't alter a title Google is ranking.
 */
export function keepBrandedTitle(title: string): { absolute: string } {
  return { absolute: `${stripBrand(title)} | SearchPrex` };
}
