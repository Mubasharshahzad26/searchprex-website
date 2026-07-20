import { GoogleGenerativeAI } from '@google/generative-ai';
import { db } from '@/lib/db';
import { scoreContent } from './scoring';
import { publishToWordPress } from './publisher';
import { submitUrl } from '@/lib/indexing';
import { fetchProductData, type ProductData } from './product-fetcher';

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const MODEL = 'gemini-2.0-flash';

type WpCreds = {
  baseUrl: string;
  username: string;
  appPassword: string;
};

type GeneratedOutput = {
  metaTitle: string;
  metaDescription: string;
  contentHtml: string;
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
        where: { clientId, status: 'queued' },
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
        const productData = await fetchProductData(queued.url, wpCreds);
        if (!productData) {
          throw new Error(`Product not found in WP: ${queued.url}`);
        }

        const model = gemini.getGenerativeModel({
          model: MODEL,
          generationConfig: {
            responseMimeType: 'application/json',
          },
        });

        // NEW: retry-wrapped Gemini call — handles 503/429 transient errors
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
          content: generated.contentHtml,
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
          service: 'gemini-2.5-flash',
          pagesProcessed: processed,
          costPerPage: 0.002,
          totalCost: processed * 0.002,
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

      // Exponential backoff: 5s, 15s (Hobby 60s limit — 3 attempts fit)
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
  // Strip markdown code fences if present
  const cleaned = raw
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();

  const parsed = JSON.parse(cleaned);

  if (!parsed.metaTitle || !parsed.metaDescription || !parsed.contentHtml) {
    throw new Error(`Missing required fields in Gemini output: ${JSON.stringify(Object.keys(parsed))}`);
  }

  // Fluff check on meta fields (Gemini sometimes ignores prompt rules for title/desc)
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
  };
}

function buildPrompt(p: {
  productData: ProductData;
  siteDomain: string;
}) {
  const pd = p.productData;

  const attributesText = Object.entries(pd.attributes).length > 0
    ? Object.entries(pd.attributes).map(([k, v]) => `- ${k}: ${v}`).join('\n')
    : '(none provided)';

  const categoryList = pd.categories.length > 0
    ? pd.categories.join(', ')
    : '(none)';

  const validInternalLinks = pd.categorySlugs.length > 0
    ? pd.categorySlugs.map(slug => `https://${p.siteDomain}/product-category/${slug}/`).join('\n')
    : `https://${p.siteDomain}/shop/`;

  const brandAuthoritySites = pd.brand
    ? `- Wikipedia article on the material/technology (e.g. https://en.wikipedia.org/wiki/M390_steel)\n- Official brand website (search: "${pd.brand} official")\n- Bladeforums.com (industry community reference)`
    : `- Wikipedia article on the material/technology\n- Industry authority sites (Bladeforums.com, KnifeCenter blog)`;

  return `You are writing SEO product page copy for ${p.siteDomain}, an outdoor/knife retailer.

REAL PRODUCT DATA (ground truth — do not contradict or invent):

Product Title: ${pd.title}
${pd.brand ? `Brand: ${pd.brand}` : ''}
${pd.sku ? `SKU: ${pd.sku}` : ''}
Categories: ${categoryList}
${pd.price ? `Price: ${pd.price}` : ''}

Product Attributes:
${attributesText}

Existing Content:
${pd.existingContent.slice(0, 1500) || '(none)'}

Short Description:
${pd.shortDescription.slice(0, 500) || '(none)'}

Existing Excerpt:
${pd.excerpt.slice(0, 300) || '(none)'}

Current Meta Title: ${pd.currentMetaTitle ?? '(none)'}
Current Meta Description: ${pd.currentMetaDescription ?? '(none)'}

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
7. Word count: 350-500 words in contentHtml. Hit at least 350.
8. Include 3 FAQ questions a real buyer would ask (use case, care, comparison), NOT marketing-style.

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
  "contentHtml": "<p>...</p><h2>Frequently Asked Questions</h2><h3>Q1?</h3><p>A1</p>..."
}

- contentHtml: inner HTML fragment ONLY — no <!DOCTYPE>, <html>, <head>, <body>
- No markdown code fences anywhere in the JSON`;
}