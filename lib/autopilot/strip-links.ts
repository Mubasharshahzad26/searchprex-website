// lib/autopilot/strip-links.ts
//
// Removes an outbound link while keeping the sentence it sits in.
//
// The autopilot used to be told to cite an authority site, and in this niche
// the nearest ones sell knives — so several thousand published product pages
// carry a link to a competitor. The link is the problem; the words around it
// are fine copy that a buyer reads. So the anchor is unwrapped, not deleted:
//
//   <a href="https://blog.knifecenter.com/...">Bohler M390 steel</a>
//   -> Bohler M390 steel
//
// Kept separate from the cleanup script so it can be unit-checked on its own
// and reused if another host has to be pulled later.

import { ALLOWED_EXTERNAL_HOSTS } from './scoring';

const SITE_HOST = 'michigansportsoutdoor.com';

function hostIsAllowed(href: string): boolean {
  if (href.includes(SITE_HOST)) return true;
  return ALLOWED_EXTERNAL_HOSTS.some((host) =>
    new RegExp(`//([^/"']*\\.)?${host.replace(/\./g, '\\.')}`, 'i').test(href)
  );
}

export interface StripResult {
  html: string;
  removed: string[];
  changed: boolean;
}

/**
 * Unwraps every anchor pointing somewhere that is neither this storefront nor
 * on the allowlist. Anchors are matched non-greedily and one at a time so a
 * paragraph holding two links does not get swallowed between them.
 */
export function stripDisallowedLinks(html: string): StripResult {
  const removed: string[] = [];

  const out = html.replace(
    /<a\b([^>]*)>([\s\S]*?)<\/a>/gi,
    (whole, attrs: string, inner: string) => {
      const href = attrs.match(/href\s*=\s*["']([^"']*)["']/i)?.[1] ?? '';

      // A relative or anchor-only href never leaves the site.
      if (!/^https?:/i.test(href)) return whole;
      if (hostIsAllowed(href)) return whole;

      removed.push(href);

      //  Return the inner text, not an empty string: "read the <a>Bladeforums
      //  thread</a> for more" has to stay a readable sentence.
      return inner;
    }
  );

  return { html: out, removed, changed: removed.length > 0 };
}
