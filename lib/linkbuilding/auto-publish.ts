// ═══════════════════════════════════════════════════════════
//  auto-publish.ts — automated Web 2.0 & property publisher
//
//  NOT PORTABLE. Prisma + Telegra.ph API + Dev.to API.
//
//  Publishes approved brand property articles to public platforms
//  via API and records the resulting live placements.
//
//  Platforms:
//    - telegra.ph (Telegraph API: free, fast, zero auth required)
//    - dev.to (Forem API: requires DEVTO_API_KEY)
// ═══════════════════════════════════════════════════════════

import { db } from '@/lib/db';
import { withRetry } from '@/lib/db-retry';

export interface AutoPublishOptions {
  clientId?: string;
  maxPosts?: number;
  signal?: AbortSignal;
}

export interface AutoPublishStats {
  considered: number;
  published: number;
  failed: number;
  placements: number;
  platforms: Record<string, number>;
  elapsedMs: number;
}

const DEFAULT_MAX_POSTS = 10;

/** Converts plain HTML to Telegraph Node array. */
function htmlToTelegraphNodes(html: string): Array<Record<string, unknown>> {
  // Simple clean conversion: split by paragraphs and headings
  const cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '');

  const nodes: Array<Record<string, unknown>> = [];
  const pRegex = /<(p|h2|h3|ul|li)>(.*?)<\/\1>/gi;
  let match;

  while ((match = pRegex.exec(cleaned)) !== null) {
    const tag = match[1].toLowerCase();
    const innerText = match[2].replace(/<[^>]+>/g, '').trim();

    if (!innerText) continue;

    // Check for <a> tags inside
    const linkMatch = /<a\s+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/i.exec(match[2]);
    if (linkMatch) {
      const href = linkMatch[1];
      const anchorText = linkMatch[2].replace(/<[^>]+>/g, '').trim();
      nodes.push({
        tag: tag === 'h2' || tag === 'h3' ? tag : 'p',
        children: [
          innerText.replace(anchorText, ''),
          { tag: 'a', attrs: { href }, children: [anchorText] },
        ],
      });
    } else {
      nodes.push({
        tag: tag === 'h2' || tag === 'h3' ? tag : 'p',
        children: [innerText],
      });
    }
  }

  if (nodes.length === 0) {
    nodes.push({ tag: 'p', children: [cleaned.replace(/<[^>]+>/g, '').slice(0, 4000)] });
  }

  return nodes;
}

/** Publishes a post to Telegra.ph. */
async function publishToTelegraph(input: {
  title: string;
  bodyHtml: string;
  authorName?: string;
  authorUrl?: string;
}): Promise<string> {
  // 1. Ensure access token
  let token = process.env.TELEGRAPH_ACCESS_TOKEN;
  if (!token) {
    // Create an anonymous account
    const accRes = await fetch('https://api.telegra.ph/createAccount', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        short_name: 'Outdoorsman',
        author_name: input.authorName || 'Outdoor Editor',
      }),
    });
    if (accRes.ok) {
      const accData = await accRes.json();
      token = accData.result?.access_token;
    }
  }

  if (!token) {
    throw new Error('Could not obtain Telegra.ph access token.');
  }

  // 2. Publish page
  const nodes = htmlToTelegraphNodes(input.bodyHtml);
  const pageRes = await fetch('https://api.telegra.ph/createPage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_token: token,
      title: input.title,
      author_name: input.authorName || 'Field Contributor',
      author_url: input.authorUrl || '',
      content: nodes,
      return_content: false,
    }),
  });

  const pageData = await pageRes.json();
  if (!pageData.ok || !pageData.result?.url) {
    throw new Error(`Telegraph API error: ${pageData.error || 'unknown'}`);
  }

  return pageData.result.url;
}

/** Publishes a post to Dev.to. */
async function publishToDevTo(input: {
  title: string;
  bodyHtml: string;
  tags?: string[];
}): Promise<string> {
  const apiKey = process.env.DEVTO_API_KEY;
  if (!apiKey) {
    throw new Error('DEVTO_API_KEY is not configured.');
  }

  // Convert HTML to simple markdown
  const markdown = input.bodyHtml
    .replace(/<h2>(.*?)<\/h2>/gi, '\n## $1\n')
    .replace(/<h3>(.*?)<\/h3>/gi, '\n### $1\n')
    .replace(/<p>(.*?)<\/p>/gi, '\n$1\n')
    .replace(/<a\s+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    .replace(/<[^>]+>/g, '');

  const res = await fetch('https://dev.to/api/articles', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      article: {
        title: input.title,
        published: true,
        body_markdown: markdown,
        tags: input.tags || ['seo', 'ecommerce', 'guide'],
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Dev.to API error: ${errText}`);
  }

  const data = await res.json();
  return data.url;
}

export async function runAutoPublish(
  options: AutoPublishOptions = {}
): Promise<AutoPublishStats> {
  const { clientId, maxPosts = DEFAULT_MAX_POSTS, signal } = options;

  const startedAt = Date.now();
  const stats: AutoPublishStats = {
    considered: 0,
    published: 0,
    failed: 0,
    placements: 0,
    platforms: {},
    elapsedMs: 0,
  };

  // Find posts that are approved and ready for publishing
  const posts = await withRetry(() =>
    db.brandPropertyPost.findMany({
      where: {
        status: 'approved',
        ...(clientId ? { property: { clientId } } : {}),
      },
      include: {
        property: {
          include: {
            client: {
              include: {
                linkCampaigns: {
                  where: { enabled: true },
                  take: 1,
                },
              },
            },
          },
        },
      },
      take: maxPosts,
    })
  );

  for (const post of posts) {
    if (signal?.aborted) break;
    stats.considered++;

    const platform = (post.property.platform || 'telegraph').toLowerCase();
    let liveUrl = '';

    try {
      if (platform.includes('telegraph') || platform.includes('telegra.ph')) {
        liveUrl = await publishToTelegraph({
          title: post.title,
          bodyHtml: post.bodyHtml,
          authorName: post.property.authorName || undefined,
        });
      } else if (platform.includes('dev.to') || platform.includes('devto')) {
        liveUrl = await publishToDevTo({
          title: post.title,
          bodyHtml: post.bodyHtml,
        });
      } else {
        // Platform requires custom credentials or manual publish, fallback to Telegraph
        liveUrl = await publishToTelegraph({
          title: post.title,
          bodyHtml: post.bodyHtml,
          authorName: post.property.authorName || undefined,
        });
      }

      if (liveUrl) {
        const now = new Date();

        // 1. Update post to published
        await withRetry(() =>
          db.brandPropertyPost.update({
            where: { id: post.id },
            data: {
              status: 'published',
              liveUrl,
              publishedAt: now,
            },
          })
        );

        // 2. If client has an active campaign, record a LinkPlacement
        const campaign = post.property.client.linkCampaigns[0];
        if (campaign) {
          const anchor = post.clientAnchors[0] || post.property.client.companyName;
          const targetUrl = `https://${campaign.targetDomain}`;

          await withRetry(() =>
            db.linkPlacement.upsert({
              where: {
                campaignId_sourceUrl_targetUrl: {
                  campaignId: campaign.id,
                  sourceUrl: liveUrl,
                  targetUrl,
                },
              },
              update: {
                status: 'live',
                lastLiveAt: now,
                lastCheckedAt: now,
                expectedAnchor: anchor,
              },
              create: {
                campaignId: campaign.id,
                sourceUrl: liveUrl,
                targetUrl,
                expectedAnchor: anchor,
                origin: 'property',
                status: 'live',
                firstSeenAt: now,
                lastLiveAt: now,
                lastCheckedAt: now,
              },
            })
          );
          stats.placements++;
        }

        stats.published++;
        stats.platforms[platform] = (stats.platforms[platform] ?? 0) + 1;
      }
    } catch (err) {
      console.error(`[auto-publish] Failed to publish post ${post.id} to ${platform}:`, err);
      stats.failed++;
    }
  }

  stats.elapsedMs = Date.now() - startedAt;
  return stats;
}
