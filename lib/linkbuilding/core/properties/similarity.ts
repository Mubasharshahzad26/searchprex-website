// ═══════════════════════════════════════════════════════════
//  core/properties/similarity.ts — is this the same article twice?
//
//  PORTABLE: pure. No I/O, no model call.
//
//  Branded properties fail for one reason above all others: the
//  content is the same article reworded. Spun text is trivially
//  detectable at scale, and a set of properties carrying it is a
//  network rather than a set of brand assets.
//
//  So near-duplicate detection is enforced in code rather than
//  asked of a prompt. w-shingling with Jaccard similarity is the
//  standard approach and it is cheap: split into overlapping word
//  n-grams, compare the sets. Reordering paragraphs or swapping
//  synonyms barely moves the score, which is exactly the evasion
//  a naive string comparison would miss.
// ═══════════════════════════════════════════════════════════

/**
 * Words per shingle.
 *
 * Five is the usual choice for prose. Lower and common phrasing produces false
 * matches between genuinely different articles; higher and a handful of
 * substituted words hides a copy.
 */
const SHINGLE_SIZE = 5;

/** Text reduced to comparable word tokens. */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    //  Markup and entities first, so tags do not become tokens and inflate
    //  similarity between two pages that merely share a template.
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;|&#\d+;/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

/** Overlapping word n-grams. */
export function shingles(text: string, size = SHINGLE_SIZE): Set<string> {
  const tokens = tokenize(text);
  const result = new Set<string>();

  //  Text shorter than one shingle still needs a comparable representation, or
  //  every short document would score 0 against everything including itself.
  if (tokens.length < size) {
    if (tokens.length > 0) result.add(tokens.join(' '));
    return result;
  }

  for (let i = 0; i <= tokens.length - size; i++) {
    result.add(tokens.slice(i, i + size).join(' '));
  }

  return result;
}

/** Jaccard similarity, 0..1. Two empty documents are treated as identical. */
export function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 1;
  if (a.size === 0 || b.size === 0) return 0;

  //  Iterate the smaller set — the intersection is the same either way and the
  //  cost is bounded by the smaller document.
  const [small, large] = a.size <= b.size ? [a, b] : [b, a];

  let intersection = 0;
  for (const item of small) {
    if (large.has(item)) intersection++;
  }

  return intersection / (a.size + b.size - intersection);
}

export function similarity(textA: string, textB: string): number {
  return jaccard(shingles(textA), shingles(textB));
}

/**
 * Above this, two documents are the same article. Below it they may still share
 * a subject, which is expected and fine for properties about one business.
 */
export const NEAR_DUPLICATE_THRESHOLD = 0.3;

export interface DuplicateMatch {
  /** Caller's identifier for the existing document. */
  id: string;
  score: number;
}

/**
 * Checks a draft against everything already published.
 *
 * Returns every match over the threshold rather than the first, because "this
 * resembles four of your six properties" is a different problem from "this
 * resembles one", and the fix differs too.
 */
export function findDuplicates(
  candidate: string,
  existing: Array<{ id: string; text: string }>,
  threshold = NEAR_DUPLICATE_THRESHOLD
): DuplicateMatch[] {
  const candidateShingles = shingles(candidate);

  return existing
    .map((doc) => ({ id: doc.id, score: jaccard(candidateShingles, shingles(doc.text)) }))
    .filter((match) => match.score >= threshold)
    .sort((a, b) => b.score - a.score);
}

/**
 * Highest similarity between any two documents in a set, and which pair.
 *
 * Used to audit a whole portfolio at once: the worst pair is the one that gives
 * the network away, so it is the number worth reporting.
 */
export function worstPair(
  documents: Array<{ id: string; text: string }>
): { a: string; b: string; score: number } | null {
  if (documents.length < 2) return null;

  //  Shingled once each rather than inside the loop — the comparison is
  //  quadratic and re-shingling would make it needlessly expensive.
  const prepared = documents.map((doc) => ({ id: doc.id, set: shingles(doc.text) }));

  let worst = { a: '', b: '', score: -1 };

  for (let i = 0; i < prepared.length; i++) {
    for (let j = i + 1; j < prepared.length; j++) {
      const score = jaccard(prepared[i].set, prepared[j].set);
      if (score > worst.score) {
        worst = { a: prepared[i].id, b: prepared[j].id, score };
      }
    }
  }

  return worst.score < 0 ? null : worst;
}
