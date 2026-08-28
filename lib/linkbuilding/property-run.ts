// ═══════════════════════════════════════════════════════════
//  property-run.ts — creating properties, drafting posts,
//  auditing the portfolio
//
//  NOT PORTABLE. Prisma-bound; every judgement lives in
//  ./core/properties.
//
//  Nothing here publishes to a platform. Free hosts have no
//  useful publishing API, automated posting breaches their terms,
//  and a scripted poster across eight properties builds the
//  footprint this phase exists to avoid. Drafts are produced and
//  approved; a person posts them, spaced out.
// ═══════════════════════════════════════════════════════════

import { GoogleGenerativeAI } from '@google/generative-ai';
import { db } from '@/lib/db';
import { withRetry } from '@/lib/db-retry';
import { canCreateProperty, checkPostPolicy, MAX_PROPERTIES_PER_CLIENT } from './core/properties/policy';
import { NEAR_DUPLICATE_THRESHOLD, findDuplicates } from './core/properties/similarity';
import { auditFootprint, type FootprintReport, type PropertySnapshot } from './core/properties/footprint';

const MODEL = 'gemini-flash-lite-latest';

export interface CreatePropertyInput {
  clientId: string;
  platform: string;
  handle?: string;
  authorName?: string;
  authorBio?: string;
}

/**
 * Registers a branded property, refusing past the hard cap.
 *
 * The cap is not a setting. Eight maintained brand assets are a presence; more
 * than that is a network nobody has time to keep real.
 */
export async function createProperty(input: CreatePropertyInput) {
  const existing = await withRetry(() =>
    db.brandProperty.count({ where: { clientId: input.clientId, status: { not: 'retired' } } })
  );

  const verdict = canCreateProperty(existing);
  if (!verdict.allowed) throw new Error(verdict.reason);

  //  Reusing an author name across the portfolio is the finding auditFootprint
  //  rates critical, so it is warned about at the point of creation too —
  //  before the property exists and the name is awkward to change.
  if (input.authorName) {
    const sameAuthor = await withRetry(() =>
      db.brandProperty.count({
        where: {
          clientId: input.clientId,
          authorName: input.authorName,
          status: { not: 'retired' },
        },
      })
    );
    if (sameAuthor > 0) {
      console.warn(
        `[properties] "${input.authorName}" already authors ${sameAuthor} propert${
          sameAuthor === 1 ? 'y' : 'ies'
        } for this client — a shared byline ties the portfolio together.`
      );
    }
  }

  return withRetry(() =>
    db.brandProperty.create({
      data: {
        clientId: input.clientId,
        platform: input.platform.toLowerCase(),
        handle: input.handle ?? null,
        authorName: input.authorName ?? null,
        authorBio: input.authorBio ?? null,
      },
    })
  );
}

export interface DraftPostInput {
  propertyId: string;
  topic: string;
  brandName: string;
  brandDomain: string;
  /** Terms the client wants to rank for. Anchors matching them are refused. */
  moneyTerms?: string[];
  signal?: AbortSignal;
}

export interface DraftPostResult {
  postId: string;
  status: 'draft' | 'rejected';
  problems: string[];
  warnings: string[];
  highestSimilarity: number;
  wordCount: number;
}

/**
 * Drafts one post for a property and runs it through policy.
 *
 * The similarity check compares against every existing post for the CLIENT, not
 * just this property. Duplication across properties is the failure mode that
 * matters, and a per-property check would miss it entirely.
 */
export async function draftPropertyPost(input: DraftPostInput): Promise<DraftPostResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set — posts cannot be drafted.');

  const property = await withRetry(() =>
    db.brandProperty.findUniqueOrThrow({
      where: { id: input.propertyId },
      include: { client: { select: { id: true } } },
    })
  );

  const siblings = await withRetry(() =>
    db.brandPropertyPost.findMany({
      where: {
        property: { clientId: property.client.id },
        status: { in: ['approved', 'published', 'draft'] },
      },
      select: { id: true, bodyHtml: true },
    })
  );

  const gemini = new GoogleGenerativeAI(apiKey);
  const model = gemini.getGenerativeModel({
    model: MODEL,
    generationConfig: { responseMimeType: 'application/json', maxOutputTokens: 2400, temperature: 0.85 },
  });

  const prompt = [
    `Write an article about "${input.topic}" for a blog run by ${property.authorName ?? 'the author'}.`,
    '',
    `The blog is a genuine publication, not a promotional channel. ${input.brandName} is`,
    'mentioned once, in passing, where it is actually relevant — the way any writer would',
    'reference a source. It is not the subject.',
    '',
    'Rules:',
    '- At least 600 words of real, specific content. No filler.',
    `- Link to https://${input.brandDomain} AT MOST once, using the brand name as the anchor.`,
    '- Never use a keyword phrase as the anchor text.',
    '- Write about the topic, not about the brand.',
    '- Vary structure. Do not open with a definition or a rhetorical question.',
    '- Plain HTML: <p>, <h2>, <ul>, <a>. No inline styles.',
    '',
    'Respond with JSON only: {"title": "...", "bodyHtml": "..."}',
  ].join('\n');

  let title = '';
  let bodyHtml = '';

  try {
    const response = await model.generateContent(prompt);
    const parsed = JSON.parse(response.response.text()) as { title?: unknown; bodyHtml?: unknown };
    if (typeof parsed.title === 'string') title = parsed.title.trim();
    if (typeof parsed.bodyHtml === 'string') bodyHtml = parsed.bodyHtml.trim();
  } catch (err) {
    throw new Error(`Draft generation failed: ${err instanceof Error ? err.message : String(err)}`);
  }

  if (!title || !bodyHtml) throw new Error('Model returned an unusable draft.');

  const duplicates = findDuplicates(
    bodyHtml,
    siblings.map((post) => ({ id: post.id, text: post.bodyHtml })),
    0
  );
  const highestSimilarity = duplicates[0]?.score ?? 0;

  const policy = checkPostPolicy({
    html: bodyHtml,
    brandName: input.brandName,
    brandDomain: input.brandDomain,
    moneyTerms: input.moneyTerms ?? [],
    highestSimilarity,
    similarityThreshold: NEAR_DUPLICATE_THRESHOLD,
  });

  //  Where the first client link sits, as a fraction through the post. Stored
  //  so auditFootprint can tell a template from an editorial decision.
  const domain = input.brandDomain.toLowerCase().replace(/^www\./, '');
  const linkIndex = bodyHtml.toLowerCase().indexOf(domain);
  const linkPosition = linkIndex === -1 ? null : linkIndex / bodyHtml.length;

  const post = await withRetry(() =>
    db.brandPropertyPost.create({
      data: {
        propertyId: property.id,
        title,
        bodyHtml,
        status: policy.allowed ? 'draft' : 'rejected',
        clientAnchors: policy.anchors.map((a) => a.text),
        anchorVerdicts: policy.anchors.map((a) => a.verdict),
        highestSimilarity,
        linkPosition,
        wordCount: policy.wordCount,
        policyProblems: policy.problems,
      },
    })
  );

  return {
    postId: post.id,
    status: policy.allowed ? 'draft' : 'rejected',
    problems: policy.problems,
    warnings: policy.warnings,
    highestSimilarity,
    wordCount: policy.wordCount,
  };
}

/** Audits a client's whole portfolio for network footprints. */
export async function auditClientPortfolio(clientId: string): Promise<FootprintReport & {
  propertyCount: number;
  capRemaining: number;
}> {
  const properties = await withRetry(() =>
    db.brandProperty.findMany({
      where: { clientId, status: { not: 'retired' } },
      include: {
        posts: {
          where: { status: { in: ['approved', 'published'] } },
          select: {
            id: true,
            bodyHtml: true,
            clientAnchors: true,
            publishedAt: true,
            linkPosition: true,
          },
        },
      },
    })
  );

  const snapshots: PropertySnapshot[] = properties.map((property) => ({
    id: property.id,
    platform: property.platform,
    authorName: property.authorName,
    authorBio: property.authorBio,
    posts: property.posts.map((post) => ({
      id: post.id,
      text: post.bodyHtml,
      anchors: post.clientAnchors,
      publishedAt: post.publishedAt,
      linkPosition: post.linkPosition,
    })),
  }));

  return {
    ...auditFootprint(snapshots),
    propertyCount: properties.length,
    capRemaining: Math.max(0, MAX_PROPERTIES_PER_CLIENT - properties.length),
  };
}
