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

