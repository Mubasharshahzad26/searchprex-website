import { GoogleGenerativeAI } from '@google/generative-ai';
import { db } from '@/lib/db';

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const MODEL = 'gemini-flash-lite-latest';

export type BlogTopicCategory = 'comparison' | 'buying-guide' | 'educational' | 'roundup';

export type BlogTopic = {
  topic: string;
  category: BlogTopicCategory;
  keywords: string[];
  contextProducts: string[];
};

export const WEEKLY_SCHEDULE: Record<number, BlogTopicCategory> = {
  1: 'comparison',
  3: 'buying-guide',
  5: 'educational',
};

const CATEGORY_PROMPT_HINTS: Record<BlogTopicCategory, string> = {
  comparison: `A comparison-style blog topic pitting 2-3 specific products or brands against each other.
Example format: "Benchmade Bugout vs Spyderco Para 3: Which EDC Folder Wins in 2026?"
Focus on real product tradeoffs (steel, price, weight, use case). Buyer intent: commercial.`,

  'buying-guide': `A buying guide for a specific product category or use case.
Example format: "Best Hunting Knives Under $200 for 2026: 7 Top Picks"
Focus on 5-8 real products from MSO catalog. Buyer intent: commercial informational.`,

  educational: `An educational deep-dive on a knife-related topic (steel types, edge geometry, sharpening, care).
Example format: "Understanding S30V vs Bohler M390 Blade Steel: A Practical Guide"
Focus on genuine expertise + product examples. Buyer intent: informational (top of funnel).`,

  roundup: `A roundup of new releases, seasonal picks, or curated collections.
Example format: "New Arrivals from Reate Knives: 2026 Winter Collection First Look"
Focus on 4-6 recent additions to catalog. Buyer intent: browsing.`,
};

/**
 * Fetches RANDOM 20 products from the client's IndexingQueue for grounding.
 * Random selection ensures topic variety across runs.
 */
async function fetchProductContext(clientId: string): Promise<string[]> {
  const products = await db.$queryRaw<Array<{ url: string }>>`
    SELECT url FROM "IndexingQueue"
    WHERE "clientId" = ${clientId}
      AND url LIKE '%/product/%'
      AND status IN ('submitted', 'queued', 'published_not_submitted')
    ORDER BY RANDOM()
    LIMIT 20
  `;
  return products.map(p => p.url);
}

/**
 * Fetches topics from the last 30 days to exclude from new generation.
 * Prevents duplicate topics like "Mag Lite comparison" being generated repeatedly.
 */
async function getRecentTopics(clientId: string): Promise<string[]> {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const recent = await db.blogPost.findMany({
    where: {
      clientId,
      createdAt: { gte: thirtyDaysAgo },
      status: { in: ['published', 'dry_run', 'generating'] },
    },
    select: { topic: true },
    orderBy: { createdAt: 'desc' },
    take: 30,
  });
  return recent
    .map(r => r.topic)
    .filter(t => t && t !== '(generating...)');
}

function urlToProductName(url: string): string {
  const match = url.match(/\/product\/([^/]+)\/?$/);
  if (!match) return '';
  return match[1].replace(/-/g, ' ');
}

function buildTopicPrompt(
  category: BlogTopicCategory,
  productUrls: string[],
  recentTopics: string[]
): string {
  const productList = productUrls
    .slice(0, 15)
    .map(url => `- ${urlToProductName(url)} (${url})`)
    .join('\n');

  const hint = CATEGORY_PROMPT_HINTS[category];

  const exclusionSection = recentTopics.length > 0
    ? `\nRECENT TOPICS TO AVOID (do NOT generate anything similar to these — user has seen these already):
${recentTopics.map((t, i) => `${i + 1}. ${t}`).join('\n')}

CRITICAL: Your new topic must cover DIFFERENT products, DIFFERENT product categories, or a DIFFERENT angle than every topic listed above.
`
    : '';

  return `You are a senior SEO strategist for Michigan Sports Outdoor (michigansportsoutdoor.com), a knife and outdoor gear retailer based in Michigan.

CATEGORY OF BLOG POST TO GENERATE: ${category}

CATEGORY GUIDANCE:
${hint}

REAL PRODUCTS AVAILABLE ON THE SITE (use for grounding — do not invent products):
${productList}
${exclusionSection}
TASK: Generate ONE specific, SEO-optimized blog topic that:
1. Fits the ${category} category exactly
2. References 2-5 REAL products from the list above (use product URLs verbatim)
3. Uses products from AT LEAST 2 DIFFERENT product categories or brands (avoid picking multiple items from same product line — e.g. don't pick 3 Mag Lite variants)
4. Targets realistic search intent for knife/outdoor buyers
5. Is DIFFERENT from all recent topics listed above (if any)
6. Avoids marketing fluff (no "ultimate", "premium", "best-in-class" phrasing)
7. Has a clear buyer question or need at its core

OUTPUT — RETURN VALID JSON ONLY (no code fences, no preamble):
{
  "topic": "Full blog post title (60-70 characters, includes primary keyword)",
  "keywords": ["primary keyword", "3-5 LSI/secondary keywords"],
  "contextProducts": ["exact URL 1", "exact URL 2", "exact URL 3"]
}

- topic: Real user-focused title, not clickbait
- keywords: SEO-relevant, no branded/marketing fluff
- contextProducts: Real URLs copied EXACTLY from the list above (2-5 URLs, from DIFFERENT brands/categories where possible)`;
}

export async function generateBlogTopic(
  clientId: string,
  category: BlogTopicCategory
): Promise<BlogTopic> {
  const [productUrls, recentTopics] = await Promise.all([
    fetchProductContext(clientId),
    getRecentTopics(clientId),
  ]);

  if (productUrls.length === 0) {
    throw new Error(`No products in IndexingQueue for client ${clientId} — cannot generate topic`);
  }

  const model = gemini.getGenerativeModel({
    model: MODEL,
    generationConfig: {
      responseMimeType: 'application/json',
      maxOutputTokens: 500,
      temperature: 0.9, // Higher creativity for topic diversity
    },
  });

  const prompt = buildTopicPrompt(category, productUrls, recentTopics);
  const result = await model.generateContent(prompt);
  const raw = result.response.text();

  const cleaned = raw
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();

  const parsed = JSON.parse(cleaned);

  if (
    !parsed.topic ||
    !Array.isArray(parsed.keywords) ||
    !Array.isArray(parsed.contextProducts) ||
    parsed.contextProducts.length < 2
  ) {
    throw new Error(`Invalid topic output: ${JSON.stringify(Object.keys(parsed))}`);
  }

  return {
    topic: String(parsed.topic).trim(),
    category,
    keywords: parsed.keywords.map((k: any) => String(k).trim()),
    contextProducts: parsed.contextProducts
      .filter((url: any) => typeof url === 'string' && url.startsWith('http'))
      .slice(0, 5),
  };
}