// lib/keyword-research-types.ts
//
// Shape of the AI keyword research tool.
//
// Deliberately absent: search volume, CPC, keyword difficulty, competition.
// A language model cannot know those — it would invent them, which is exactly
// the failure the SERP Checker had (Wikipedia ranking #10 for "law firm seo").
// Real metrics need a data provider like DataForSEO. Everything modelled here
// is something a model can genuinely reason about: what to target, why, and
// what to publish.

export type KeywordIntent =
  | "informational"
  | "commercial"
  | "transactional"
  | "navigational";

export const INTENT_META: Record<
  KeywordIntent,
  { label: string; hint: string; color: string; bg: string }
> = {
  informational: {
    label: "Informational",
    hint: "They're researching. Win these with guides — they build trust, not immediate leads.",
    color: "#1a5fb4",
    bg: "#e8f0fe",
  },
  commercial: {
    label: "Commercial",
    hint: "They're comparing options. Comparison pages and case studies convert here.",
    color: "#8a5300",
    bg: "#fff4e0",
  },
  transactional: {
    label: "Transactional",
    hint: "They're ready to act. These are the money pages — service and city pages.",
    color: "#2f9670",
    bg: "#eafaf3",
  },
  navigational: {
    label: "Navigational",
    hint: "They're looking for a specific brand. Low volume for you unless it's yours.",
    color: "#64748b",
    bg: "#f1f5f9",
  },
};

export interface KeywordIdea {
  keyword: string;
  intent: KeywordIntent;
  /** Why this keyword is worth targeting, in one line. */
  rationale: string;
  /** The page or angle to build for it. */
  contentAngle: string;
}

export interface KeywordCluster {
  /** Topic name, e.g. "Car accident claims". */
  name: string;
  /** What this cluster is about and who searches it. */
  summary: string;
  keywords: KeywordIdea[];
}

export interface KeywordResearchResponse {
  seed: string;
  location: string;
  /** Which model produced this — surfaced so the output is attributable. */
  provider: "gemini" | "anthropic";
  clusters: KeywordCluster[];
  generatedAt: string;
}

export const MAX_SEED_LENGTH = 80;

/** Keeps the request bounded and the response readable. */
export const CLUSTER_TARGET = 4;
export const KEYWORDS_PER_CLUSTER = 6;
