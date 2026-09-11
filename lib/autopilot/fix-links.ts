// lib/autopilot/fix-links.ts
//
// Repoints internal links that were built by guessing at the URL.
//
// The generator used to write `https://{domain}/product-category/{slug}/`, and
// on this store that path redirects to the home page. 19,294 published pages
// carry those links. The generator is fixed, but a fix to the generator only
// helps pages written after it — everything already published still sends the
// reader to the front page.
//
// The anchor text is kept in every case. It was written to describe the
// destination and still does; only the href was ever wrong.

import type { TermLink } from './term-links'

export interface LinkFixResult {
  html: string
  /** old href -> new href, for the log. */
  repointed: Array<[string, string]>
  /** hrefs whose term no longer exists; the anchor was unwrapped. */
  unwrapped: string[]
  changed: boolean
}

/**
 * Pulls the slug out of a guessed category URL.
 *
 * Matches the shape the generator produced and nothing else — a real
 * /collections/ or /brand/ link is left alone, and so is any link to a product,
 * a post, or another site.
 */
function guessedSlug(href: string): string | null {
  const m = href.match(/\/product-category\/([^/"?#]+)\/?/i)
  return m ? m[1] : null
}

/**
 * Rewrites every guessed category link in a page.
 *
 * A slug with no matching term has its anchor unwrapped rather than repointed
 * to a fallback. Sending a reader who asked for "folding knives" to the shop
 * index is a different kind of wrong, not a smaller one, and it would hide the
 * fact that the category is gone.
 */
export function fixInternalLinks(
  html: string,
  bySlug: Map<string, TermLink>
): LinkFixResult {
  const repointed: Array<[string, string]> = []
  const unwrapped: string[] = []

  const out = html.replace(
    /<a\b([^>]*?)href=(["'])([^"']*?)\2([^>]*)>([\s\S]*?)<\/a>/gi,
    (whole, pre: string, quote: string, href: string, post: string, inner: string) => {
      const slug = guessedSlug(href)
      if (!slug) return whole

      const term = bySlug.get(slug)
      if (!term) {
        unwrapped.push(href)
        return inner
      }

      repointed.push([href, term.link])
      return `<a${pre}href=${quote}${term.link}${quote}${post}>${inner}</a>`
    }
  )

  return {
    html: out,
    repointed,
    unwrapped,
    changed: repointed.length > 0 || unwrapped.length > 0,
  }
}

/** Does this page need touching at all? Cheap pre-check before any work. */
export function needsLinkFix(html: string): boolean {
  return /\/product-category\//i.test(html)
}
