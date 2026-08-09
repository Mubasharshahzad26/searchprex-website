// lib/law-firm-keywords.ts
//
// Practice area × US state keyword generation for the law firm keyword tool.
//
// Why templates instead of a blank keyword box: an attorney does not think in
// keywords. They think "I do personal injury in Michigan". The tool asks the
// question the way they'd answer it, then builds the keyword set itself — which
// also means every result maps to a page SearchPrex knows how to build.
//
// The generated set is capped (KEYWORDS_PER_QUERY) because DataForSEO bills per
// keyword. Fifteen well-chosen phrases cover a practice area in a state; a
// hundred variations mostly bill for near-duplicates.

export interface PracticeArea {
  id: string;
  label: string;
  /**
   * The practice-specific noun phrases. First entry is treated as the primary
   * term and gets the full modifier set; the rest get the core modifiers only.
   */
  terms: string[];
  /** Shown in the UI to explain who searches this. */
  blurb: string;
}

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: "personal-injury",
    label: "Personal Injury & Car Accident",
    terms: ["personal injury", "car accident", "truck accident", "slip and fall"],
    blurb:
      "The most expensive clicks in Google Ads — often $100–250 each. If you're not ranking organically here, you're renting every case.",
  },
  {
    id: "family-law",
    label: "Family Law & Divorce",
    terms: ["divorce", "family law", "child custody", "child support"],
    blurb:
      "High volume and emotionally urgent. Searchers compare several firms before calling, so comparison and trust content wins.",
  },
  {
    id: "criminal-defense",
    label: "Criminal Defense & DUI",
    terms: ["criminal defense", "dui", "drug crime", "assault"],
    blurb:
      "Urgent, high-intent, often searched at night on a phone. Speed of response matters as much as ranking.",
  },
  {
    id: "estate-planning",
    label: "Estate Planning & Probate",
    terms: ["estate planning", "probate", "will", "trust"],
    blurb:
      "Lower urgency, longer research cycle. Guides and FAQ content do the selling here.",
  },
  {
    id: "immigration",
    label: "Immigration",
    terms: ["immigration", "green card", "visa", "deportation defense"],
    blurb:
      "Often searched in more than one language, and frequently on behalf of a family member rather than the searcher.",
  },
  {
    id: "employment",
    label: "Employment & Workers' Comp",
    terms: ["employment", "wrongful termination", "workers compensation", "discrimination"],
    blurb:
      "Searchers are usually still employed and researching quietly. Confidentiality reassurance converts.",
  },
  {
    id: "bankruptcy",
    label: "Bankruptcy & Debt",
    terms: ["bankruptcy", "chapter 7", "chapter 13", "debt relief"],
    blurb:
      "Price-sensitive and often embarrassed to call. Transparent fee content removes the biggest barrier.",
  },
];

/** 50 states plus DC. `name` must match DataForSEO's location_name segment. */
export const US_STATES: string[] = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
  "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
  "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
];

/**
 * Cost control. Each keyword is billed, so this is a spend cap as much as a UI
 * decision.
 */
export const KEYWORDS_PER_QUERY = 15;

/**
 * Modifiers applied to the primary term.
 *
 * No "near me" variant: "personal injury lawyer near me michigan" is not a
 * phrase anyone types. "Near me" belongs to city-level searches, and the
 * geo-targeting sent to the data provider already covers proximity intent.
 * The cost and consultation variants earn their place instead — they are the
 * two questions every prospective client actually searches before calling.
 */
const PRIMARY_MODIFIERS = [
  (t: string, loc: string) => `${t} lawyer ${loc}`,
  (t: string, loc: string) => `${t} attorney ${loc}`,
  (t: string, loc: string) => `best ${t} lawyer ${loc}`,
  (t: string, loc: string) => `${t} law firm ${loc}`,
  (t: string, loc: string) => `affordable ${t} lawyer ${loc}`,
  (t: string, loc: string) => `how much does a ${t} lawyer cost in ${loc}`,
  (t: string, loc: string) => `free consultation ${t} lawyer ${loc}`,
];

/** Modifiers applied to secondary terms — the two shapes that actually convert. */
const SECONDARY_MODIFIERS = [
  (t: string, loc: string) => `${t} lawyer ${loc}`,
  (t: string, loc: string) => `${t} attorney ${loc}`,
];

/**
 * Builds the keyword set for a practice area in a location.
 *
 * `location` is the plain state or city name — "Michigan", "Detroit". It is
 * appended to the phrase because that is how people type it ("car accident
 * lawyer detroit"), independent of the geo-targeting sent to the data provider.
 */
export function buildKeywordSet(area: PracticeArea, location: string): string[] {
  const loc = location.trim().toLowerCase();
  const [primary, ...secondary] = area.terms;

  const out: string[] = [];

  for (const make of PRIMARY_MODIFIERS) out.push(make(primary, loc));
  for (const term of secondary) {
    for (const make of SECONDARY_MODIFIERS) out.push(make(term, loc));
  }

  // De-duplicate while preserving order, then cap.
  return [...new Set(out.map((k) => k.replace(/\s+/g, " ").trim()))].slice(
    0,
    KEYWORDS_PER_QUERY
  );
}

export function findPracticeArea(id: string): PracticeArea | undefined {
  return PRACTICE_AREAS.find((a) => a.id === id);
}

/* ── Result shape ── */

export type LawKeywordIntent = "informational" | "commercial" | "transactional" | "navigational";

export interface LawKeywordRow {
  keyword: string;
  /** Monthly searches in the selected location. null when the provider has no data. */
  volume: number | null;
  /** 0–100. null when unavailable. */
  difficulty: number | null;
  /** Google Ads cost per click, USD. */
  cpc: number | null;
  /** 0–1 paid competition. */
  competition: number | null;
  intent: LawKeywordIntent | null;
  /** Up to 12 monthly search-volume points, oldest first. */
  trend: number[];
  /** The page to build for this keyword — from the AI layer, not the data provider. */
  contentAngle?: string;
}

export interface LawKeywordResponse {
  practiceArea: string;
  practiceAreaLabel: string;
  location: string;
  /**
   * "dataforseo" when every figure is live. "unavailable" when credentials or
   * balance are missing — in that case every metric is null and the UI shows
   * placeholders. There is deliberately no "estimated" mode: inventing volume
   * and CPC is what the previous tool did.
   */
  source: "dataforseo" | "unavailable";
  /** Present when source is "unavailable" — explains why, for the UI banner. */
  reason?: string;
  rows: LawKeywordRow[];
  summary: {
    totalVolume: number | null;
    avgDifficulty: number | null;
    /** Highest CPC in the set — the number that makes the organic argument. */
    maxCpc: number | null;
  };
  checkedAt: string;
}
