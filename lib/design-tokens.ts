// lib/design-tokens.ts
// Single source of truth for the SearchPrex visual language.
//
// Before this file existed, seven different accent colours were in play across
// the site (#534AB7, #2563eb, #3eb489, #ff642d, #ff5e2e, #7b61ff, #191a1f) —
// each page had picked its own. The palette below is derived from the pages
// that already look right and must not change: the home page, /all-case-studies,
// /experts, and /why-us.
//
// Import these instead of hardcoding hex values. Tailwind arbitrary values are
// fine for one-offs, but anything structural (buttons, headings, borders,
// section backgrounds) should come from here.

/* ── COLOUR ────────────────────────────────────────────────── */

export const color = {
  /** Buttons, links, active states, accents. */
  primary: "#534AB7",
  /** Hover / pressed state for primary. */
  primaryDark: "#3C3489",
  /** Tinted primary background — badges, soft callouts. */
  primarySoft: "#EEEDFE",

  /** Headings and high-contrast body text. Also the dark section background. */
  ink: "#0a0f2e",
  /** Secondary body text, labels, captions.
   *  Was #64748b: 4.76:1 on white but only 4.03:1 on the tinted section
   *  grounds (#eaecf3), so it failed AA everywhere except pure white.
   *  #566070 measures 6.36 / 6.04 / 5.39 across the three grounds. */
  muted: "#566070",
  /** Tertiary text — timestamps, fine print, captions.
   *  Was #94a3b8, which measures 2.5:1 on white. WCAG AA needs 4.5:1 for
   *  body text and it was used at 9-11px throughout, so it failed twice over.
   *  #5f6a78 measures 5.5:1 on white and 4.66:1 on the tinted ground. */
  subtle: "#5f6a78",

  /** #94a3b8 kept ONLY for non-text use — decorative icons, dividers,
   *  placeholder glyphs. Never put copy in this colour: it is 2.5:1. */
  subtleNonText: "#94a3b8",

  /** Verified metrics, checkmarks, positive deltas. */
  success: "#3eb489",
  /** Green for TEXT and for solid buttons carrying white text.
   *  Was #2f9670: 3.67:1 on white, 3.11:1 on tinted — failed as text.
   *  #196b4d measures 6.46 / 5.47. Use color.success (#3eb489) only for
   *  decorative fills and icons, never for copy. */
  successDark: "#196b4d",

  /** Solid green button background. White text on #3eb489 is 2.59:1 — the
   *  primary CTA failed AA. This measures 5.1:1. */
  successButton: "#1a7d59",
  /** Problems, "the challenge", negative deltas. */
  danger: "#ef4444",

  /** Card edges, dividers, input borders. */
  border: "#e5e7eb",
  /** Heavier border on tinted backgrounds. */
  borderStrong: "#d4d8e3",

  /** Page background. */
  white: "#ffffff",
  /** Alternating section background — very light. */
  surface: "#f8f9fc",
  /** Alternating section background — one step heavier. */
  surfaceAlt: "#eaecf3",
} as const;

/* ── TYPE SCALE ────────────────────────────────────────────── */
//
// One h1 per page, and headings descend without skipping levels. These strings
// are Tailwind classes so they compose with whatever else a component needs.

export const heading = {
  /** Page title. Exactly one per page. */
  h1: "text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl",
  /** Section title. */
  h2: "text-3xl font-bold leading-tight tracking-tight sm:text-4xl",
  /** Sub-section / card title. */
  h3: "text-xl font-semibold leading-snug sm:text-2xl",
  /** Small card title, list item heading. */
  h4: "text-lg font-semibold leading-snug",
  /** Uppercase kicker above an h1 or h2. Not a heading element — use a span. */
  eyebrow: "text-xs font-semibold uppercase tracking-[0.2em]",
} as const;

export const text = {
  /** Hero subhead / section intro. */
  lead: "text-base leading-relaxed sm:text-lg",
  /** Default paragraph. */
  body: "text-base leading-relaxed",
  /** Card copy, secondary paragraphs. */
  small: "text-sm leading-relaxed",
  /** Captions, meta strips, fine print. */
  caption: "text-xs leading-normal",
} as const;

/* ── LAYOUT ────────────────────────────────────────────────── */

export const layout = {
  /** Standard page container. */
  container: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
  /** Narrow container for long-form reading (case study bodies, legal pages). */
  containerNarrow: "mx-auto max-w-4xl px-4 sm:px-6 lg:px-8",
  /** Vertical rhythm between major sections. */
  section: "py-16 lg:py-24",
  /** Tighter section — used when two related bands sit next to each other. */
  sectionTight: "py-12 lg:py-16",
} as const;

/* ── RADIUS ────────────────────────────────────────────────── */
//
// Three steps only. Before this, the site mixed rounded-md, -lg, -xl, -2xl and
// -3xl with no rule, which is most of why pages read as different products.

export const radius = {
  /** Cards, panels, tables, media. */
  card: "rounded-2xl",
  /** Buttons, inputs, pills. */
  control: "rounded-xl",
  /** Badges, small chips, icon tiles. */
  chip: "rounded-lg",
} as const;

/* ── FOCUS ─────────────────────────────────────────────────── */
//
// Every interactive element needs a visible focus ring (WCAG 2.4.7). Apply to
// buttons, links-as-buttons, and accordion triggers.

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#534AB7] focus-visible:ring-offset-2";

/* ── SURFACES ──────────────────────────────────────────────── */

export const surface = {
  /** Default card. */
  card: "rounded-2xl border border-[#e5e7eb] bg-white",
  /** Card that lifts on hover — use on linked cards only. */
  cardHover:
    "rounded-2xl border border-[#e5e7eb] bg-white transition-all hover:-translate-y-1 hover:shadow-xl",
  /** Primary call to action. */
  ctaPrimary:
    "inline-flex items-center gap-2 rounded-xl bg-[#534AB7] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#3C3489]",
  /** Secondary call to action — outlined. */
  ctaSecondary:
    "inline-flex items-center gap-2 rounded-xl border border-[#0a0f2e]/20 px-7 py-3.5 text-sm font-semibold text-[#0a0f2e] transition-colors hover:bg-[#f8f9fc]",
} as const;
