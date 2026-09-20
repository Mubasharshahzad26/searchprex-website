import crypto from 'crypto';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export interface WebhookResult {
  ok: boolean;
  statusCode: number;
  message?: string;
  action?: 'test' | 'created' | 'updated' | 'duplicate';
  id?: string;
  slug?: string;
  error?: string;
  details?: any;
}

/**
 * Validates HMAC-SHA256 signature against the raw request body.
 * If secret is empty or undefined, signature verification is skipped.
 * Supports both raw hex and 'sha256=<hex>' formats.
 */
export function verifyAutopilotRankSignature(
  rawBody: string,
  signatureHeader: string | null | undefined,
  secret: string | undefined
): boolean {
  if (!secret) {
    // Secret not configured: allow request
    return true;
  }

  if (!signatureHeader) {
    return false;
  }

  const cleanSignature = signatureHeader.startsWith('sha256=')
    ? signatureHeader.slice(7).trim()
    : signatureHeader.trim();

  // Validate hex format
  if (!/^[0-9a-fA-F]{64}$/.test(cleanSignature)) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(rawBody, 'utf8')
    .digest('hex');

  const providedBuffer = Buffer.from(cleanSignature, 'hex');
  const expectedBuffer = Buffer.from(expectedSignature, 'hex');

  if (providedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(providedBuffer, expectedBuffer);
}

// Zod schemas for payload validation
export const ArticleImageSchema = z.object({
  position: z.number().optional(),
  url: z.string(),
});

export const ArticleSchema = z.object({
  id: z.string().min(1, 'article.id is required'),
  title: z.string().optional(),
  content: z.string().optional(),
  content_html: z.string().optional(),
  slug: z.string().optional(),
  meta_description: z.string().optional(),
  primary_keyword: z.string().optional(),
  word_count: z.number().optional(),
  seo_score: z.number().optional(),
  images: z.array(ArticleImageSchema).optional(),
});

export const ChangesSchema = z.record(z.any());

export const OpportunitySchema = z
  .object({
    id: z.string().optional(),
    type: z.string().optional(),
    query: z.string().optional(),
    page_url: z.string().optional(),
    metrics: z.record(z.any()).optional(),
  })
  .optional();

export const AutopilotRankPayloadSchema = z.object({
  event: z.enum(['article.published', 'article.updated']),
  test: z.boolean().optional().default(false),
  timestamp: z.string().optional(),
  article: ArticleSchema,
  changes: ChangesSchema.optional(),
  opportunity: OpportunitySchema,
  campaign: z
    .object({
      id: z.string().optional(),
      name: z.string().optional(),
    })
    .nullable()
    .optional(),
  project: z
    .object({
      id: z.string().optional(),
      name: z.string().optional(),
      domain: z.string().optional(),
    })
    .nullable()
    .optional(),
});

export type AutopilotRankPayload = z.infer<typeof AutopilotRankPayloadSchema>;

/**
 * Extracts a URL slug from a URL or pathname.
 * e.g. "https://www.searchprex.com/blog/my-slug" -> "my-slug"
 */
export function extractSlugFromUrl(pageUrl: string): string {
  try {
    const urlObj = pageUrl.startsWith('http')
      ? new URL(pageUrl)
      : new URL(pageUrl, 'https://www.searchprex.com');
    const segments = urlObj.pathname.split('/').filter(Boolean);
    return segments[segments.length - 1] || '';
  } catch {
    const clean = pageUrl.split('?')[0].replace(/\/$/, '');
    const parts = clean.split('/');
    return parts[parts.length - 1] || '';
  }
}

/**
 * Converts text into a clean URL-friendly slug.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Safely trigger cache revalidation without throwing if outside request context
 */
function safeRevalidate(paths: string[]) {
  for (const path of paths) {
    try {
      revalidatePath(path);
    } catch {
      // Ignore during test execution or if revalidatePath is unavailable
    }
  }
}

/**
 * Main handler for AutopilotRank webhooks.
 */
export async function handleAutopilotRankWebhook(
  payload: AutopilotRankPayload
): Promise<WebhookResult> {
  const { event, test, timestamp, article, changes, opportunity, campaign } = payload;
  const isoTimestamp = timestamp || new Date().toISOString();

  // 1. Connection check bypass
  if (test === true) {
    console.log('[autopilotrank-webhook] Connection check received, skipping processing.');
    return {
      ok: true,
      statusCode: 200,
      action: 'test',
      message: 'Connection check successful',
    };
  }

  // 2. Idempotency Check via AutopilotRankDelivery
  const deliveryKey = `${event}:${article.id}:${isoTimestamp}`;
  try {
    const existingDelivery = await db.autopilotRankDelivery.findUnique({
      where: { deliveryKey },
    });

    if (existingDelivery && existingDelivery.status === 'processed') {
      console.log(`[autopilotrank-webhook] Idempotent hit: ${deliveryKey} already processed.`);
      return {
        ok: true,
        statusCode: 200,
        action: 'duplicate',
        message: 'Payload already processed (idempotent)',
        slug: existingDelivery.slug || undefined,
      };
    }
  } catch (err: any) {
    // Delivery table lookup failure shouldn't completely block CMS writes, but log it
    console.warn('[autopilotrank-webhook] Delivery table check warning:', err.message);
  }

  // 3. Routing: article.published
  if (event === 'article.published') {
    if (!article.title) {
      return {
        ok: false,
        statusCode: 400,
        error: 'article.title is required for article.published',
      };
    }

    const rawSlug = article.slug || slugify(article.title);
    let finalSlug = slugify(rawSlug);

    if (!finalSlug) {
      finalSlug = `post-${Date.now()}`;
    }

    const contentBody = article.content || article.content_html || '';
    if (!contentBody) {
      return {
        ok: false,
        statusCode: 400,
        error: 'article.content or article.content_html is required for article.published',
      };
    }

    const excerpt = article.meta_description || '';
    const wordCount = article.word_count || Math.max(1, contentBody.split(/\s+/).length);
    const readTimeMinutes = Math.max(1, Math.round(wordCount / 200));
    const coverImage = article.images?.[0]?.url || null;
    const category = campaign?.name || 'SEO';
    const canonicalUrl = `https://www.searchprex.com/blog/${finalSlug}`;
    const publishedAt = new Date(isoTimestamp);

    // Check if post already exists with this externalId
    const existingByExternalId = await (db as any).marketingBlog.findFirst({
      where: { externalId: article.id },
    });

    let blogPost: any;

    if (existingByExternalId) {
      // Update in place to avoid duplicate post
      blogPost = await (db as any).marketingBlog.update({
        where: { id: existingByExternalId.id },
        data: {
          title: article.title,
          metaTitle: article.title,
          metaDescription: excerpt,
          excerpt,
          content: contentBody,
          coverImage: coverImage || existingByExternalId.coverImage,
          category: existingByExternalId.category || category,
          readTime: `${readTimeMinutes}-minute read`,
          canonicalUrl,
          updatedAt: new Date(),
        },
      });
      console.log(`[autopilotrank-webhook] Existing post updated by externalId (${blogPost.id})`);
    } else {
      // Ensure slug uniqueness if collision with another slug
      const existingBySlug = await (db as any).marketingBlog.findUnique({
        where: { slug: finalSlug },
      });

      if (existingBySlug) {
        // Append short random suffix
        finalSlug = `${finalSlug}-${Math.random().toString(36).substring(2, 6)}`;
      }

      blogPost = await (db as any).marketingBlog.create({
        data: {
          slug: finalSlug,
          title: article.title,
          metaTitle: article.title,
          metaDescription: excerpt,
          excerpt,
          content: contentBody,
          coverImage,
          author: 'SearchPrex Team',
          category,
          readTime: `${readTimeMinutes}-minute read`,
          canonicalUrl: `https://www.searchprex.com/blog/${finalSlug}`,
          published: true,
          publishedAt,
          externalId: article.id,
        },
      });
      console.log(`[autopilotrank-webhook] New post created (${blogPost.id}, slug: ${blogPost.slug})`);
    }

    // Record delivery
    try {
      await (db as any).autopilotRankDelivery.upsert({
        where: { deliveryKey },
        create: {
          id: `del_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
          deliveryKey,
          event,
          articleId: article.id,
          slug: blogPost.slug,
          status: 'processed',
          metadata: {
            blogId: blogPost.id,
            action: existingByExternalId ? 'updated_existing' : 'created',
          },
        },
        update: {
          status: 'processed',
          slug: blogPost.slug,
        },
      });
    } catch (e: any) {
      console.warn('[autopilotrank-webhook] Could not save delivery log:', e.message);
    }

    safeRevalidate([
      '/blog',
      `/blog/${blogPost.slug}`,
      '/feed.xml',
      '/sitemap.xml',
      '/content-admin/blogs',
    ]);

    return {
      ok: true,
      statusCode: 200,
      action: existingByExternalId ? 'updated' : 'created',
      id: blogPost.id,
      slug: blogPost.slug,
      message: 'Article successfully published to CMS',
    };
  }

  // 4. Routing: article.updated
  if (event === 'article.updated') {
    if (!changes || Object.keys(changes).length === 0) {
      return {
        ok: false,
        statusCode: 400,
        error: "article.updated requires non-empty 'changes' object",
      };
    }

    // Locate existing page
    let targetPost: any = null;

    // 4.1 Match by stored externalId
    targetPost = await (db as any).marketingBlog.findFirst({
      where: { externalId: article.id },
    });

    // 4.2 Match by opportunity.page_url
    if (!targetPost && opportunity?.page_url) {
      const extractedSlug = extractSlugFromUrl(opportunity.page_url);
      targetPost = await (db as any).marketingBlog.findFirst({
        where: {
          OR: [
            { canonicalUrl: opportunity.page_url },
            ...(extractedSlug ? [{ slug: extractedSlug }] : []),
          ],
        },
      });
    }

    // 4.3 Match by article.slug
    if (!targetPost && article.slug) {
      targetPost = await (db as any).marketingBlog.findUnique({
        where: { slug: slugify(article.slug) },
      });
    }

    // 4.4 Match by article.id directly if it's a CMS ID
    if (!targetPost && article.id) {
      targetPost = await (db as any).marketingBlog.findUnique({
        where: { id: article.id },
      });
    }

    if (!targetPost) {
      console.warn(
        `[autopilotrank-webhook] Page not found for update. article.id: ${article.id}, page_url: ${opportunity?.page_url}`
      );
      return {
        ok: false,
        statusCode: 404,
        error: 'Target page not found in CMS for in-place update',
        details: {
          articleId: article.id,
          pageUrl: opportunity?.page_url,
          slug: article.slug,
        },
      };
    }

    // Apply ONLY fields present in 'changes'
    const updateData: Record<string, any> = {
      updatedAt: new Date(isoTimestamp),
    };

    if (changes.title !== undefined && typeof changes.title === 'string') {
      updateData.title = changes.title;
      updateData.metaTitle = changes.title;
    }

    if (changes.meta_description !== undefined && typeof changes.meta_description === 'string') {
      updateData.metaDescription = changes.meta_description;
      updateData.excerpt = changes.meta_description;
    } else if (changes.metaDescription !== undefined && typeof changes.metaDescription === 'string') {
      updateData.metaDescription = changes.metaDescription;
      updateData.excerpt = changes.metaDescription;
    }

    if (changes.content !== undefined && typeof changes.content === 'string') {
      updateData.content = changes.content;
      const words = updateData.content.split(/\s+/).length;
      updateData.readTime = `${Math.max(1, Math.round(words / 200))}-minute read`;
    } else if (changes.content_html !== undefined && typeof changes.content_html === 'string') {
      updateData.content = changes.content_html;
      const words = updateData.content.split(/\s+/).length;
      updateData.readTime = `${Math.max(1, Math.round(words / 200))}-minute read`;
    }

    if (changes.slug !== undefined && typeof changes.slug === 'string') {
      const cleanSlug = slugify(changes.slug);
      if (cleanSlug && cleanSlug !== targetPost.slug) {
        // Check collision
        const collision = await (db as any).marketingBlog.findUnique({
          where: { slug: cleanSlug },
        });
        if (!collision) {
          updateData.slug = cleanSlug;
          updateData.canonicalUrl = `https://www.searchprex.com/blog/${cleanSlug}`;
        }
      }
    }

    if (changes.cover_image !== undefined && typeof changes.cover_image === 'string') {
      updateData.coverImage = changes.cover_image;
    } else if (changes.coverImage !== undefined && typeof changes.coverImage === 'string') {
      updateData.coverImage = changes.coverImage;
    }

    if (changes.category !== undefined && typeof changes.category === 'string') {
      updateData.category = changes.category;
    }

    if (changes.author !== undefined && typeof changes.author === 'string') {
      updateData.author = changes.author;
    }

    // Also link externalId if targetPost didn't have one yet
    if (!targetPost.externalId && article.id) {
      updateData.externalId = article.id;
    }

    const updatedBlog = await (db as any).marketingBlog.update({
      where: { id: targetPost.id },
      data: updateData,
    });

    console.log(
      `[autopilotrank-webhook] In-place update applied to post ${updatedBlog.id} (${updatedBlog.slug})`
    );

    // Record delivery
    try {
      await (db as any).autopilotRankDelivery.upsert({
        where: { deliveryKey },
        create: {
          id: `del_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
          deliveryKey,
          event,
          articleId: article.id,
          slug: updatedBlog.slug,
          status: 'processed',
          metadata: {
            blogId: updatedBlog.id,
            changedFields: Object.keys(changes),
          },
        },
        update: {
          status: 'processed',
          slug: updatedBlog.slug,
        },
      });
    } catch (e: any) {
      console.warn('[autopilotrank-webhook] Could not save delivery log:', e.message);
    }

    safeRevalidate([
      '/blog',
      `/blog/${updatedBlog.slug}`,
      ...(targetPost.slug !== updatedBlog.slug ? [`/blog/${targetPost.slug}`] : []),
      '/feed.xml',
      '/sitemap.xml',
      '/content-admin/blogs',
    ]);

    return {
      ok: true,
      statusCode: 200,
      action: 'updated',
      id: updatedBlog.id,
      slug: updatedBlog.slug,
      message: 'Article successfully updated in place',
    };
  }

  return {
    ok: false,
    statusCode: 400,
    error: `Unsupported event type: ${(payload as any).event}`,
  };
}
