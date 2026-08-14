import { GoogleGenerativeAI } from '@google/generative-ai';
import { db } from '@/lib/db';
import { scoreContent } from './scoring';
import { publishToWordPress } from './publisher';
import { submitUrl } from '@/lib/indexing';
import { fetchProductData, type ProductData } from './product-fetcher';
import { fetchProductDataFromCsv } from './product-fetcher';

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const MODEL = 'gemini-flash-lite-latest';

type WpCreds = {
  baseUrl: string;
  username: string;
  appPassword: string;
};

type GeneratedOutput = {
  metaTitle: string;
  metaDescription: string;
  contentHtml: string;
  faqs: { question: string; answer: string }[];
};

export async function runAutopilotBatch(clientId: string) {
  const client = await db.client.findUniqueOrThrow({
    where: { id: clientId },
    include: {
      autopilotConfig: true,
      cmsConnections: true,
    },
  });

  if (!client.autopilotConfig?.enabled) {
    return { skipped: 'autopilot_disabled', clientId };
  }

  const config = client.autopilotConfig;
  const batchSize = config.maxPagesPerRun;
  const isDryRun = config.dryRunMode;

  const wpConn = client.cmsConnections.find(c => c.cmsType === 'wordpress');
  if (!wpConn) {
    throw new Error(`No WordPress CMS connection for client ${clientId} — required even for dry run (product data fetch)`);
  }

  const wpCreds: WpCreds = {
    baseUrl: wpConn.baseUrl,
    ...(wpConn.credentials as { username: string; appPassword: string }),
  };

  const run = await db.autopilotRun.create({
    data: {
      clientId,
      configId: config.id,
      status: 'running',
      pagesTargeted: batchSize,
      dryRun: isDryRun,
    },
  });

  const stats = { published: 0, skipped: 0, errors: 0, dryRun: isDryRun };
  const MAX_ATTEMPTS = batchSize * 3;
  let attempts = 0;

  try {
    while (stats.published < batchSize && attempts < MAX_ATTEMPTS) {
      attempts++;

      const queued = await db.indexingQueue.findFirst({
  where: { 
    clientId, 
    status: 'queued',
    url: { contains: '/product/' }  // ← ONLY PRODUCTS
  },
  orderBy: [{ priority: 'asc' }, { createdAt: 'asc' }],
});

      if (!queued) break;

      await db.indexingQueue.update({
        where: { id: queued.id },
        data: { status: 'processing' },
      });

      const page = await db.autopilotPage.create({
        data: {
          runId: run.id,
          pageUrl: queued.url,
          gscImpressions: 0,
          gscClicks: 0,
          status: 'generating',
        },
      });

      try {
        const productData = await fetchProductDataFromCsv(queued.url, wpCreds);
        if (!productData) {
          throw new Error(`Product not found in WP: ${queued.url}`);
        }

        const model = gemini.getGenerativeModel({
          model: MODEL,
          generationConfig: {
            responseMimeType: 'application/json',
            maxOutputTokens: 1800,
            temperature: 0.7,
          },
        });

        const result = await generateWithRetry(
          model,
          buildPrompt({
            productData,
            siteDomain: client.domain,
          })
        );

        const raw = result.response.text();
        const generated = parseGeneratedOutput(raw);

        const quality = scoreContent(generated.contentHtml, {});

        if (!quality.passed) {
          await db.autopilotPage.update({
            where: { id: page.id },
            data: {
              status: 'skipped_quality',
              errorMessage: `score=${quality.score}: ${quality.reasons.join(',')}`,
              generatedContent: { generated, quality, productData } as any,
            },
          });
          await db.indexingQueue.update({
            where: { id: queued.id },
            data: { status: 'skipped' },
          });
          stats.skipped++;
          continue;
        }

        if (isDryRun) {
          await db.autopilotPage.update({
            where: { id: page.id },
            data: {
              status: 'dry_run_generated',
              generatedContent: { generated, quality, productData } as any,
            },
          });
          await db.indexingQueue.update({
            where: { id: queued.id },
            data: { status: 'dry_run' },
          });
          stats.published++;
          continue;
        }

        const published = await publishToWordPress({
          siteUrl: wpCreds.baseUrl,
          postId: productData.id,
          content: generated.contentHtml + buildFaqSchema(generated.faqs),
          metaTitle: generated.metaTitle,
          metaDescription: generated.metaDescription,
          username: wpCreds.username,
          appPassword: wpCreds.appPassword,
        });

        const submission = await submitUrl(published.liveUrl, 'new');

        if (!submission.success) {
          console.warn(
            `[autopilot] Indexing submit failed for ${published.liveUrl}: ${submission.message}`
          );
        }

        await db.autopilotPage.update({
          where: { id: page.id },
          data: {
            status: 'published',
            publishedAt: published.publishedAt,
            generatedContent: {
              generated,
              quality,
              productData,
              liveUrl: published.liveUrl,
              indexingSubmission: {
                success: submission.success,
                account: submission.account,
                message: submission.message ?? null,
              },
            } as any,
          },
        });

        await db.indexingQueue.update({
          where: { id: queued.id },
          data: {
            status: submission.success ? 'submitted' : 'published_not_submitted',
            submittedAt: submission.success ? new Date() : null,
          },
        });

        stats.published++;

      } catch (err) {
        const errMsg = (err as Error).message.slice(0, 500);
        await db.autopilotPage.update({
          where: { id: page.id },
          data: { status: 'error', errorMessage: errMsg },
        });
        await db.indexingQueue.update({
          where: { id: queued.id },
          data: { status: 'error' },
        });
        stats.errors++;
      }
    }

    await db.autopilotRun.update({
      where: { id: run.id },
      data: {
        status: 'completed',
        pagesGenerated: stats.published + stats.skipped,
        pagesPublished: stats.published,
        completedAt: new Date(),
        results: stats as any,
      },
    });

    const processed = stats.published + stats.skipped;
    if (processed > 0) {
      await db.costLog.create({
        data: {
          clientId,
          runId: run.id,
          service: 'gemini-flash-latest',
          pagesProcessed: processed,
          costPerPage: 0.0012,
          totalCost: processed * 0.0012,
        },
      });
    }

    return { runId: run.id, ...stats };

  } catch (err) {
    await db.autopilotRun.update({
      where: { id: run.id },
      data: {
        status: 'failed',
        errorMessage: (err as Error).message.slice(0, 500),
        completedAt: new Date(),
      },
    });
    throw err;
  }
}

// ---------- Helpers ----------

async function generateWithRetry(
  model: any,
  prompt: string,
  maxRetries = 3
): Promise<any> {
  let lastErr: any;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await model.generateContent(prompt);
    } catch (err: any) {
      lastErr = err;
      const msg = String(err?.message ?? err);
      const isRetryable =
        msg.includes('503') ||
        msg.includes('429') ||
        msg.includes('Service Unavailable') ||
        msg.includes('high demand') ||
        msg.includes('rate limit');

      if (!isRetryable || attempt === maxRetries) throw err;

      const delayMs = Math.min(5000 * Math.pow(3, attempt - 1), 45000);
      console.warn(
        `[gemini-retry] Attempt ${attempt}/${maxRetries} failed: ${msg.slice(0, 80)}. Waiting ${delayMs}ms...`
      );
      await new Promise(r => setTimeout(r, delayMs));
    }
  }
  throw lastErr;
}

function parseGeneratedOutput(raw: string): GeneratedOutput {
  const cleaned = raw
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();

  const parsed = JSON.parse(cleaned);

  if (
    !parsed.metaTitle ||
    !parsed.metaDescription ||
    !parsed.contentHtml ||
    !Array.isArray(parsed.faqs) ||
    parsed.faqs.length < 2
  ) {
    throw new Error(`Missing required fields in Gemini output: ${JSON.stringify(Object.keys(parsed))}`);
  }

  const fluffPhrases = [
    'premium', 'pinnacle', 'discerning', 'best-in-class',
    'cutting-edge', 'state-of-the-art', 'top-tier', 'unparalleled',
    'discover the ultimate', 'ultimate'
  ];
  const combinedMeta = `${parsed.metaTitle} ${parsed.metaDescription}`.toLowerCase();
  const foundFluff = fluffPhrases.filter(p => combinedMeta.includes(p));
  if (foundFluff.length > 0) {
    throw new Error(`Fluff detected in meta fields: ${foundFluff.join(', ')}`);
  }

  return {
    metaTitle: String(parsed.metaTitle).slice(0, 60),
    metaDescription: String(parsed.metaDescription).slice(0, 160),
    contentHtml: String(parsed.contentHtml),
    faqs: parsed.faqs
      .filter((f: any) => f?.question && f?.answer)
      .map((f: any) => ({
        question: String(f.question).trim(),
        answer: String(f.answer).trim(),
      })),
  };
}

type PromptProductData = ProductData & {
  attributes?: Record<string, string | number | boolean | null | undefined>;
  categorySlugs?: string[];
  brand?: string;
  existingContent?: string;
  shortDescription?: string;
  excerpt?: string;
  currentMetaTitle?: string;
  currentMetaDescription?: string;
};

function buildPrompt(p: {
  productData: ProductData;
  siteDomain: string;
}) {
  const pd = p.productData as PromptProductData;

  const attributes = pd.attributes ?? {};
  const attributesText = Object.keys(attributes).length > 0
    ? Object.entries(attributes).map(([k, v]) => `- ${k}: ${String(v ?? 'n/a')}`).join('\n')
    : '(none provided)';

  const categoryNames = Array.isArray((pd as any).categories)
    ? (pd as any).categories
        .map((item: any) => typeof item === 'string' ? item : (item?.name ?? item?.slug ?? ''))
        .filter(Boolean)
    : [];
  const categoryList = categoryNames.length > 0
    ? categoryNames.join(', ')
    : '(none)';

  const categorySlugs = Array.isArray(pd.categorySlugs)
    ? pd.categorySlugs
    : Array.isArray((pd as any).categories)
      ? (pd as any).categories
          .map((item: any) => typeof item === 'string'
            ? item
            : (item?.slug ?? String(item?.name ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')))
          .filter(Boolean)
      : [];

  const validInternalLinks = categorySlugs.length > 0
    ? categorySlugs.map((slug: string) => `https://${p.siteDomain}/product-category/${slug}/`).join('\n')
    : `https://${p.siteDomain}/shop/`;

  const brand = pd.brand ?? (pd as any).brandName ?? (pd as any).vendor ?? '';
  const existingContent = pd.existingContent ?? (pd as any).description ?? '';
  const shortDescription = pd.shortDescription ?? (pd as any).short_description ?? '';
  const excerpt = pd.excerpt ?? (pd as any).excerpt ?? '';
  const currentMetaTitle = pd.currentMetaTitle ?? (pd as any).meta_title ?? '';
  const currentMetaDescription = pd.currentMetaDescription ?? (pd as any).meta_description ?? '';

  const brandAuthoritySites = brand
    ? `- Wikipedia article on the material/technology (e.g. https://en.wikipedia.org/wiki/M390_steel)\n- Official brand website (search: "${brand} official")\n- Bladeforums.com (industry community reference)`
    : `- Wikipedia article on the material/technology\n- Industry authority sites (Bladeforums.com, KnifeCenter blog)`;

  return `You are writing SEO product page copy for ${p.siteDomain}, a Michigan-based outdoor and knife retailer serving hunters, anglers, and outdoor enthusiasts across the United States.

REAL PRODUCT DATA (ground truth — do not contradict or invent):

Product Title: ${pd.title}
${brand ? `Brand: ${brand}` : ''}
${pd.sku ? `SKU: ${pd.sku}` : ''}
Categories: ${categoryList}
${pd.price ? `Price: ${pd.price}` : ''}

Product Attributes:
${attributesText}

Existing Content:
${existingContent.slice(0, 1500) || '(none)'}

Short Description:
${shortDescription.slice(0, 500) || '(none)'}

Existing Excerpt:
${excerpt.slice(0, 300) || '(none)'}

Current Meta Title: ${currentMetaTitle || '(none)'}
Current Meta Description: ${currentMetaDescription || '(none)'}

STRICT RULES:
1. DO NOT invent specifications (dimensions, weight, steel type, blade length) not in the data above.
2. DO NOT include a "Specifications" table with fabricated numbers. Skip specs table if real numbers unavailable.
3. DO NOT use marketing fluff. BANNED PHRASES:
   - "premium quality", "pinnacle", "discerning", "meticulously", "unparalleled"
   - "best-in-class", "cutting-edge", "state-of-the-art", "top-tier"
   - "notable addition", "ongoing commitment", "distinguished piece"
   - "refined presence", "aesthetically pleasing", "hard-wearing character"
   - "commitment to crafting", "reliable and well-built", "sturdy yet refined"
   - "reflects current trends", "embodies a blend"
4. Write in plain, direct tone — like a knowledgeable retail associate.
5. Internal links must come ONLY from this list (use exactly, don't invent):
${validInternalLinks}
6. External authoritative links: Include 1-2 external links to authoritative reference sites where genuinely helpful:
${brandAuthoritySites}
   Only link to real, well-known reference sites. Do NOT invent URLs.
7. Word count: 400-550 words in contentHtml. Hit at least 400.
8. Include 3 FAQ questions a real buyer would ask (use case, care, comparison), NOT marketing-style.

FIRST PARAGRAPH RULE (CRITICAL for AI Overviews, featured snippets, and LLM citations):
- The first paragraph MUST directly answer "What is this product and who is it for?" in 2-3 clear sentences.
- Include: product name, primary use case, and 1-2 key characteristics from the real data.
- Start with a definitive statement (NOT with marketing hook or question).
- Example structure: "The [Product Name] is a [category] designed for [specific use case]. [Key feature or characteristic from real data]. It [what problem it solves or task it enables]."
- Do NOT use openings like: "Looking for...", "Are you...", "Discover the...", "Introducing..."

MICHIGAN OUTDOOR VOICE (regional grounding):
- Reference Michigan and US outdoor context naturally where relevant:
  - Great Lakes region, Upper Peninsula, deer season, ice fishing, whitetail hunting
  - Michigan DNR seasons, Northern Michigan wilderness, hunting camp use
  - US-based scenarios (backcountry hiking, tailgating, home defense, EDC carry)
- Use US measurement units: inches, pounds, ounces, feet — NOT metric.
- Reference real American use cases: hunting, fishing, camping, tactical/EDC, kitchen use.
- Do NOT force Michigan references into every product — only where genuinely relevant.
- Naturalness > forced regionality.

SEMANTIC ENRICHMENT (for topical authority):
- Include 2-3 semantically related terms from the product's domain (e.g. for knives: edge retention, tang construction, sheath material, blade geometry, grind type).
- Mention 1-2 comparable product categories or alternatives when contextually relevant.
- Use question-based structures in body copy (e.g. "What sets this apart is...", "Where this excels is...").
- Include entity references: steel types (D2, 1095, S30V), lock mechanisms (liner lock, frame lock), blade shapes (drop point, tanto, clip point) — ONLY if the product data supports it.

E-E-A-T GROUNDING (Experience, Expertise, Authority, Trust):
- Include ONE natural retailer perspective statement per product (not per paragraph). Examples:
  - "In our experience stocking [category], [specific insight]..."
  - "Customers looking at this typically also consider..."
  - "For Michigan hunters we speak with, this fits [use case] because..."
  - "What we've seen with this [product type] is..."
- Do NOT invent customer quotes or reviews.
- Do NOT claim experience the retailer doesn't have (e.g. "we've tested this in the field for 5 years").
- Ground authority in retailer expertise (product knowledge, customer patterns), NOT personal ownership claims.

META TITLE RULES:
- 50-60 characters max
- Include brand + product name + key differentiator (e.g. size, color, or feature)
- Format: "{Brand} {Product Name} | Michigan Sports Outdoor"
- Use proper capitalization — NOT ALL CAPS
- ALL CAPS only for brand acronyms (MSO, USB, LED, PVD)
- Do not use fluff words: "Premium", "Best", "Top", "Ultimate", "Discover"

META DESCRIPTION RULES:
- 140-160 characters
- Include primary keyword (product name)
- Mention 1-2 concrete product features (specific numbers/materials, not adjectives)
- End with a soft CTA ("Shop at Michigan Sports Outdoor", "In stock", "Order today")
- Do not use fluff words: "Premium", "Discover the ultimate", "Best in class"

OUTPUT FORMAT — RETURN VALID JSON ONLY:
{
  "metaTitle": "...",
  "metaDescription": "...",
  "contentHtml": "<p>...</p><h2>Frequently Asked Questions</h2><h3>Q1?</h3><p>A1</p>...",
  "faqs": [
    { "question": "Question 1 text (no Q: prefix)", "answer": "Plain text answer without HTML" },
    { "question": "Question 2 text", "answer": "Plain text answer" },
    { "question": "Question 3 text", "answer": "Plain text answer" }
  ]
}

- contentHtml: inner HTML fragment ONLY — no <!DOCTYPE>, <html>, <head>, <body>
- faqs: MUST match the FAQ questions in contentHtml (same questions, plain text answers, no HTML)
- No markdown code fences anywhere in the JSON`;
}

function buildFaqSchema(
  faqs: { question: string; answer: string }[]
): string {
  if (!faqs || faqs.length === 0) return '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return `\n<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
}