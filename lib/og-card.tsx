import { ImageResponse } from "next/og";

/**
 * lib/og-card.tsx — the one Open Graph card design, shared by every route.
 *
 * Background: the site referenced eight OG images that have never existed.
 * public/og/ is not a directory in this repo, so /og/law-firm-seo.jpg,
 * /og/local-seo.jpg, /og/technical-seo.jpg, /og/growth-plan.jpg,
 * /og/intake-assistant.jpg, /og/law-firm-scorecard.jpg and /og/ai-search.jpg all
 * 404 — and so did the sitewide default /og-image.jpg named in app/layout.tsx.
 * Every share and link preview of every page rendered a blank card.
 *
 * Generating them removes the failure mode rather than patching it: there is no
 * binary asset to add, to keep in sync with the copy, or to lose in a future
 * move. A route gets a card by dropping in an opengraph-image.tsx that calls
 * renderOgCard() — see app/opengraph-image.tsx for the sitewide default.
 *
 * Which routes get a card, verified against the dev server rather than assumed:
 *
 *   - A route with its own opengraph-image.tsx always uses it, whether or not
 *     the page also exports an `openGraph` metadata object.
 *   - A route WITHOUT one inherits app/opengraph-image.tsx only if it exports no
 *     `openGraph` object at all. Declaring one — even with no `images` key —
 *     suppresses the inherited card and the page ends up with no og:image.
 *
 * That second rule is why ~26 routes (/pricing, /faq, /why-us, /services, the
 * /tools pages, the legal pages…) currently ship no social card: they each
 * declare `openGraph`, so the root card never reaches them. Giving one of them
 * a card means adding an opengraph-image.tsx to its own segment. Do NOT try to
 * fix it centrally by injecting `images` in getPageSEO — that would override
 * the per-segment cards on the eleven routes that already have their own.
 *
 * Satori (what ImageResponse renders with) supports flexbox only: no grid, no
 * float, no `gap` shorthand quirks, and ANY element with more than one child
 * needs an explicit `display: "flex"`. Text nodes count as children. Editing
 * this without that in mind produces a silently blank card, so keep every
 * wrapper below explicitly flexed.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

// Brand purple, matching the PURPLE const the marketing components share.
// --primary in app/globals.css is still the older blue, so it is deliberately
// not the source here: the cards should look like the site people actually see.
const PURPLE = "#534AB7";
const INK = "#0a0f2e";
const MUTED = "#64748b";
const CANVAS = "#f7f8fc";

export type OgCard = {
  /** Pill text, top left. Keep it to a couple of words. */
  eyebrow: string;
  /** Quiet label beside the pill. Optional. */
  kicker?: string;
  /** The headline. Two short lines at most — this renders at 76px. */
  title: string;
  /** One supporting sentence. */
  subtitle: string;
  /**
   * Footer items, joined with dot separators. "searchprex.com" is appended
   * automatically and should not be passed in.
   */
  footer?: string[];
};

export function renderOgCard({ eyebrow, kicker, title, subtitle, footer = [] }: OgCard) {
  const footerItems = [...footer, "searchprex.com"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: CANVAS,
          padding: "80px",
          // A flat wash, not a gradient: Satori renders gradients inconsistently
          // across the sizes Slack, X, and LinkedIn each request.
          borderTop: `16px solid ${PURPLE}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "36px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: PURPLE,
              color: "#ffffff",
              fontSize: "26px",
              fontWeight: 700,
              padding: "10px 22px",
              borderRadius: "999px",
            }}
          >
            {eyebrow}
          </div>
          {kicker ? (
            <div style={{ display: "flex", fontSize: "26px", color: MUTED }}>{kicker}</div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "76px",
            fontWeight: 800,
            color: INK,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "34px",
            color: MUTED,
            marginTop: "28px",
            lineHeight: 1.35,
          }}
        >
          {subtitle}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginTop: "auto",
            fontSize: "26px",
            color: INK,
            fontWeight: 600,
          }}
        >
          {footerItems.map((item, i) => (
            // The separator is its own node rather than a ::before, which
            // Satori does not support. Last item is the domain, tinted purple.
            <div key={item} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              {i > 0 ? <div style={{ display: "flex", color: MUTED }}>·</div> : null}
              <div
                style={{
                  display: "flex",
                  color: i === footerItems.length - 1 ? PURPLE : INK,
                }}
              >
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    OG_SIZE
  );
}
