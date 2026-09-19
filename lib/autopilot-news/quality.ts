// lib/autopilot-news/quality.ts
//
// The pre-publish gate for autopilot news articles. It runs in the admin client
// (live, as the editor changes the draft) and again on the server in
// saveNewsArticle, which is the one that actually enforces it — so it must stay
// free of server-only imports.
//
// A "fail" blocks publishing live; drafts can always be saved. A check marked
// `overridable` can be signed off by an editor who has verified it by hand
// (e.g. a figure that is in the full source article but not in the RSS excerpt
// the model saw). The cron never passes overrides, so an unverified figure or a
// stale story always lands as a draft there.

import type { GeneratedNewsArticle } from "./generator";
import { MAX_NEWS_AGE_HOURS, MAX_SLUG_LENGTH, hoursSince } from "./config";

export type QualityStatus = "pass" | "warn" | "fail";

export interface QualityCheck {
  id: string;
  label: string;
  status: QualityStatus;
  detail?: string;
  overridable?: boolean;
  overridden?: boolean;
}

export interface QualityReport {
  checks: QualityCheck[];
  /** Failing checks that still block a live publish after overrides. */
  blocking: QualityCheck[];
  canPublish: boolean;
}

export type QualityInput = Pick<
  GeneratedNewsArticle,
  | "content"
  | "slug"
  | "metaTitle"
  | "metaDescription"
  | "sourceUrl"
  | "sourceExcerpt"
  | "sourcePublishedAt"
>;

const REQUIRED_SECTIONS: Array<{ label: string; pattern: RegExp }> = [
  { label: "Key Takeaways", pattern: /^##\s+Key Takeaways\b/im },
  { label: "What Happened", pattern: /^##\s+What Happened\b/im },
  { label: "Industry Impact", pattern: /^##\s+Industry Impact\b/im },
  { label: "SearchPrex Action Checklist", pattern: /^##\s+SearchPrex Action Checklist\b/im },
  { label: "Quick answers", pattern: /^##\s+Quick answers\b/im },
];

const MIN_WORDS_FAIL = 300;
const MIN_WORDS_WARN = 500;
// Widest value {month} can expand to on the live page, e.g. "September 2026".
const MONTH_TOKEN_WIDTH = "September 2026".length;

/** The body the model wrote, minus the boilerplate author box that follows it. */
function articleBody(content: string): string {
  return content.split(/^#{2,3}\s+About the Author\b/im)[0];
}

function plainText(markdown: string): string {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/[#>*_`|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wordCount(markdown: string): number {
  const text = plainText(markdown);
  return text ? text.split(" ").length : 0;
}

const FIGURE_PATTERN = /\d{1,3}(?:,\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?/g;

/**
 * The factual figures in a piece of text: percentages, decimals, and any
 * number of two or more digits. Single digits are left out on purpose — "3
 * steps" and "2 to 3 questions" are phrasing, not claims.
 */
function extractFigures(text: string): Map<string, string> {
  const figures = new Map<string, string>();
  const cleaned = text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/^\s*\d+[.)]\s+/gm, " "); // ordered-list markers
  for (const match of cleaned.matchAll(FIGURE_PATTERN)) {
    const raw = match[0];
    const after = cleaned.slice((match.index ?? 0) + raw.length, (match.index ?? 0) + raw.length + 2);
    const isPercent = /^\s?%/.test(after);
    const normalized = raw.replace(/,/g, "");
    if (!isPercent && !normalized.includes(".") && normalized.length < 2) continue;
    figures.set(normalized, isPercent ? `${raw}%` : raw);
  }
  return figures;
}

function linkTargets(markdown: string): string[] {
  return [...markdown.matchAll(/(?<!!)\[[^\]]*\]\(([^)\s]+)[^)]*\)/g)].map((m) => m[1]);
}

export function checkArticleQuality(
  article: QualityInput,
  opts: { overrides?: string[]; now?: Date } = {}
): QualityReport {
  const overrides = new Set(opts.overrides ?? []);
  const content = article.content || "";
  const body = articleBody(content);
  const checks: QualityCheck[] = [];

  // Structure
  const words = wordCount(body);
  checks.push({
    id: "word-count",
    label: "Article length",
    status: words < MIN_WORDS_FAIL ? "fail" : words < MIN_WORDS_WARN ? "warn" : "pass",
    detail: `${words} words (minimum ${MIN_WORDS_FAIL}, target ${MIN_WORDS_WARN}+)`,
  });

  const h1 = /^#\s+\S/m.test(content);
  checks.push({
    id: "no-h1",
    label: "No H1 in body",
    status: h1 ? "fail" : "pass",
    detail: h1 ? "The page title is the only H1; demote body headings to ##." : undefined,
  });

  const missing = REQUIRED_SECTIONS.filter((s) => !s.pattern.test(content)).map((s) => s.label);
  checks.push({
    id: "sections",
    label: "Required sections",
    status: missing.length ? "fail" : "pass",
    detail: missing.length ? `Missing: ${missing.join(", ")}` : undefined,
  });

  const faqSection = content.split(/^##\s+Quick answers\b/im)[1]?.split(/^##\s/m)[0] ?? "";
  const faqCount = (faqSection.match(/^###\s+\S/gm) || []).length;
  checks.push({
    id: "faq",
    label: "FAQ questions",
    status: faqCount >= 2 ? "pass" : "warn",
    detail: `${faqCount} question${faqCount === 1 ? "" : "s"} under Quick answers (2+ needed for FAQPage schema)`,
  });

  // Attribution
  const sourceLinked = Boolean(article.sourceUrl) && linkTargets(content).includes(article.sourceUrl);
  checks.push({
    id: "source-link",
    label: "Source is linked",
    status: sourceLinked ? "pass" : "fail",
    detail: sourceLinked ? undefined : "The article must link the reporting source it was written from.",
  });

  const internal = new Set(
    linkTargets(body).filter((href) => /^https?:\/\/(www\.)?searchprex\.com(\/|$)/i.test(href) || href.startsWith("/"))
  );
  checks.push({
    id: "internal-links",
    label: "Internal links",
    status: internal.size >= 2 ? "pass" : "warn",
    detail: `${internal.size} distinct internal link${internal.size === 1 ? "" : "s"} (target 2–3)`,
  });

  // Meta
  const slugOk =
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug || "") && article.slug.length <= MAX_SLUG_LENGTH;
  checks.push({
    id: "slug",
    label: "Slug",
    status: slugOk ? "pass" : "fail",
    detail: slugOk ? undefined : "Lowercase letters, digits and single hyphens only, 80 characters max.",
  });

  const metaTitle = (article.metaTitle || "").trim();
  const metaTitleLength = metaTitle.replace(/\{month\}/g, "x".repeat(MONTH_TOKEN_WIDTH)).length;
  checks.push({
    id: "meta-title",
    label: "Meta title",
    status: !metaTitle ? "fail" : metaTitleLength > 60 ? "warn" : "pass",
    detail: metaTitle ? `${metaTitleLength} characters with {month} expanded (max 60)` : "Empty",
  });

  const metaDescription = (article.metaDescription || "").trim();
  const mdLength = metaDescription.length;
  checks.push({
    id: "meta-description",
    label: "Meta description",
    status: !metaDescription ? "fail" : mdLength < 120 || mdLength > 160 ? "warn" : "pass",
    detail: metaDescription ? `${mdLength} characters (target 120–160)` : "Empty",
  });

  // Facts
  const age = hoursSince(article.sourcePublishedAt, opts.now);
  checks.push({
    id: "freshness",
    label: "Story freshness",
    status: age === null || age > MAX_NEWS_AGE_HOURS ? "fail" : "pass",
    overridable: true,
    detail:
      age === null
        ? "The source gave no publish date, so we cannot tell whether this is still news."
        : age > MAX_NEWS_AGE_HOURS
          ? `Source is ${Math.round(age / 24)} days old (limit ${MAX_NEWS_AGE_HOURS}h). Confirm it is still current before publishing.`
          : `Source published ${Math.max(0, Math.round(age))}h ago`,
  });

  const sourceFigures = extractFigures(article.sourceExcerpt || "");
  if (article.sourcePublishedAt) {
    // A story's own date is fair to state even when the excerpt doesn't repeat it.
    const d = new Date(article.sourcePublishedAt);
    sourceFigures.set(String(d.getUTCFullYear()), "");
    sourceFigures.set(String(d.getUTCDate()), "");
  }
  const unsupported = [...extractFigures(body).entries()]
    .filter(([normalized]) => !sourceFigures.has(normalized))
    .map(([, display]) => display);
  checks.push({
    id: "figures",
    label: "Figures traceable to source",
    status: unsupported.length ? "fail" : "pass",
    overridable: true,
    detail: unsupported.length
      ? `Not in the source excerpt: ${unsupported.slice(0, 12).join(", ")}${unsupported.length > 12 ? "…" : ""}. Verify against the full source or remove.`
      : "Every number in the article appears in the source",
  });

  for (const check of checks) {
    if (check.status === "fail" && check.overridable && overrides.has(check.id)) check.overridden = true;
  }
  const blocking = checks.filter((c) => c.status === "fail" && !c.overridden);
  return { checks, blocking, canPublish: blocking.length === 0 };
}
