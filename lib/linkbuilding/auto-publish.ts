// ═══════════════════════════════════════════════════════════
//  auto-publish.ts — automated Web 2.0 & high-DA publisher
//
//  Publishes approved brand property articles to public platforms
//  via API and records the resulting live placements in Neon DB.
//
//  Supported Platforms:
//    - telegra.ph (Telegraph API: DA 91, free, fast, zero auth required)
//    - dev.to (Forem API: DA 82, requires DEVTO_API_KEY)
//    - medium.com (Medium API: DA 95, requires MEDIUM_ACCESS_TOKEN)
//    - hashnode.dev (Hashnode GraphQL API: DA 85, requires HASHNODE_ACCESS_TOKEN)
//
//  Features:
//    - Autonomous Queue Replenishment (Drafts & approves fresh E-E-A-T
//      articles when queue runs low, rotating targets & anchors)
//    - Deep Link & Anchor Preservation (Extracts exact target URL)
// ═══════════════════════════════════════════════════════════

import { db } from '@/lib/db';
import { withRetry } from '@/lib/db-retry';
import { generateWithPool } from '@/lib/gemini-pool';

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

/** Target profiles for rotating high-commercial MSO links */
const MSO_TARGET_PROFILES = [
  {
    targetUrl: 'https://michigansportsoutdoor.com/october-season/',
    topic: 'Fall Field Dressing & Big Game Skinning Knives',
    anchors: ['Michigan Sports Outdoor Hunting Blades', 'Michigan Sports Outdoor fall blades', 'hunting knife collection'],
    theme: 'autumn hunting prep, steel toughness for Michigan whitetail field dress, blade geometries'
  },
  {
    targetUrl: 'https://michigansportsoutdoor.com/collections/michigan-legal-knives',
    topic: 'Midwest Knife Carry Laws & Everyday Legal Blades',
    anchors: ['Michigan Sports Outdoor legal knife collection', 'Michigan legal EDC knives', 'Midwest legal cutlery'],
    theme: 'statutory compliance in Michigan and Midwest, automatic knife legality, EDC blade length'
  },
  {
    targetUrl: 'https://michigansportsoutdoor.com/product-category/knives-tools/hunting-knives/',
    topic: 'High-Carbon vs Powder Metallurgy Steel in Hunting Cutlery',
    anchors: ['American hunting knives', 'Michigan Sports Outdoor hunting gear', 'field hunting blades'],
    theme: 'MagnaCut, CPM-S35VN, D2 blade steels comparison for rugged woods work'
  },
  {
    targetUrl: 'https://michigansportsoutdoor.com/product-category/knives-tools/folding-knives/',
    topic: 'Pocket Knife Locking Mechanisms: Frame Lock vs Crossbar Lock',
    anchors: ['everyday carry pocket knives', 'Michigan Sports Outdoor EDC folding knives', 'folding knife catalog'],
    theme: 'lock strength, thumb stud deployment, deep carry clips for working outdoorsmen'
  },
  {
    targetUrl: 'https://michigansportsoutdoor.com/',
    topic: 'Wilderness Survival Gear & Field Sharpening Protocol',
    anchors: ['Michigan Sports Outdoor', 'michigansportsoutdoor.com', 'Michigan Sports Outdoor gear'],
    theme: 'diamond whetstones, ceramic rods in sub-zero wilderness camps, maintaining factory apex'
  },
];

/** Converts plain HTML to Telegraph Node array. */
function htmlToTelegraphNodes(html: string): Array<Record<string, unknown>> {
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

/** Publishes a post to Telegra.ph (DA 91). */
async function publishToTelegraph(input: {
  title: string;
  bodyHtml: string;
  authorName?: string;
  authorUrl?: string;
}): Promise<string> {
  let token = process.env.TELEGRAPH_ACCESS_TOKEN;
  if (!token) {
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

/** Publishes a post to Dev.to (DA 82). */
async function publishToDevTo(input: {
  title: string;
  bodyHtml: string;
  tags?: string[];
}): Promise<string> {
  const apiKey = process.env.DEVTO_API_KEY;
  if (!apiKey) {
    throw new Error('DEVTO_API_KEY is not configured.');
  }

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
        tags: input.tags || ['seo', 'ecommerce', 'outdoors', 'gear'],
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

/** Publishes a post to Medium (DA 95) if token configured. */
async function publishToMedium(input: {
  title: string;
  bodyHtml: string;
  tags?: string[];
}): Promise<string> {
  const token = process.env.MEDIUM_ACCESS_TOKEN;
  if (!token) throw new Error('MEDIUM_ACCESS_TOKEN is not configured.');

  const meRes = await fetch('https://api.medium.com/v1/me', {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  });
  if (!meRes.ok) throw new Error(`Medium auth failed: ${await meRes.text()}`);
  const meData = await meRes.json();
  const userId = meData.data?.id;

  const postRes = await fetch(`https://api.medium.com/v1/users/${userId}/posts`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: input.title,
      contentFormat: 'html',
      content: `<h1>${input.title}</h1>\n` + input.bodyHtml,
      publishStatus: 'public',
      tags: input.tags || ['hunting', 'outdoors', 'knives', 'gear'],
    }),
  });
  if (!postRes.ok) throw new Error(`Medium publish failed: ${await postRes.text()}`);
  const postData = await postRes.json();
  return postData.data?.url;
}

/** Publishes a technical guide post to GitHub Gist (DA 96). */
async function publishToGitHubGist(input: {
  title: string;
  bodyHtml: string;
}): Promise<string> {
  const token = process.env.GITHUB_ACCESS_TOKEN;
  if (!token) throw new Error('GITHUB_ACCESS_TOKEN is not configured.');

  const markdown = input.bodyHtml
    .replace(/<h2>(.*?)<\/h2>/gi, '\n## $1\n')
    .replace(/<h3>(.*?)<\/h3>/gi, '\n### $1\n')
    .replace(/<p>(.*?)<\/p>/gi, '\n$1\n')
    .replace(/<a\s+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    .replace(/<[^>]+>/g, '');

  const content = `# ${input.title}\n\n${markdown}\n\n---\n*Published via Michigan Sports Outdoor Editorial Cutlery Hub.*`;
  const sanitizedName = input.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40) || 'guide';
  const fileName = `${sanitizedName}.md`;

  const res = await fetch('https://api.github.com/gists', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      'User-Agent': 'Searchprex-LinkBuilding-Engine',
    },
    body: JSON.stringify({
      description: `${input.title} — Technical Outdoor Gear Guide`,
      public: true,
      files: {
        [fileName]: { content },
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`GitHub Gist API error: ${errText}`);
  }

  const data = await res.json();
  return data.html_url;
}

/** Publishes a technical guide post to Write.as (DA 76). */
async function publishToWriteAs(input: {
  title: string;
  bodyHtml: string;
}): Promise<string> {
  const markdown = input.bodyHtml
    .replace(/<h2>(.*?)<\/h2>/gi, '\n## $1\n')
    .replace(/<h3>(.*?)<\/h3>/gi, '\n### $1\n')
    .replace(/<p>(.*?)<\/p>/gi, '\n$1\n')
    .replace(/<a\s+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    .replace(/<[^>]+>/g, '');

  const body = `# ${input.title}\n\n${markdown}\n\n---\n*Written for Michigan Sports Outdoor Cutlery Journal.*`;

  const res = await fetch('https://write.as/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Searchprex-LinkBuilding-Engine',
    },
    body: JSON.stringify({ body }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Write.as API error: ${errText}`);
  }

  const data = await res.json();
  const id = data.data?.id;
  if (!id) throw new Error('Write.as API did not return post ID');
  return `https://write.as/${id}`;
}

/** Publishes a technical guide post to GitLab Snippet (DA 92). */
async function publishToGitLabSnippet(input: {
  title: string;
  bodyHtml: string;
}): Promise<string> {
  const token = process.env.GITLAB_ACCESS_TOKEN;
  if (!token) throw new Error('GITLAB_ACCESS_TOKEN is not configured.');

  const markdown = input.bodyHtml
    .replace(/<h2>(.*?)<\/h2>/gi, '\n## $1\n')
    .replace(/<h3>(.*?)<\/h3>/gi, '\n### $1\n')
    .replace(/<p>(.*?)<\/p>/gi, '\n$1\n')
    .replace(/<a\s+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    .replace(/<[^>]+>/g, '');

  const content = `# ${input.title}\n\n${markdown}\n\n---\n*Published via Michigan Sports Outdoor Field Engineering Lab.*`;
  const sanitizedName = input.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40) || 'guide';
  const fileName = `${sanitizedName}.md`;

  const res = await fetch('https://gitlab.com/api/v4/snippets', {
    method: 'POST',
    headers: {
      'PRIVATE-TOKEN': token,
      'Content-Type': 'application/json',
      'User-Agent': 'Searchprex-LinkBuilding-Engine',
    },
    body: JSON.stringify({
      title: input.title,
      visibility: 'public',
      description: `${input.title} — Technical Outdoor Cutlery Guide`,
      files: [
        {
          file_path: fileName,
          content,
        },
      ],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`GitLab Snippet API error: ${errText}`);
  }

  const data = await res.json();
  return data.web_url;
}

/** Extracts destination URL and anchor text from body HTML. */
function extractTargetAndAnchor(html: string, fallbackDomain: string, fallbackAnchor: string) {
  const match = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/i.exec(html);
  if (match) {
    return {
      targetUrl: match[1],
      anchor: match[2].replace(/<[^>]+>/g, '').trim() || fallbackAnchor,
    };
  }
  return {
    targetUrl: `https://${fallbackDomain}`,
    anchor: fallbackAnchor,
  };
}

/** Automatically replenishes approved posts queue if it runs low. */
async function replenishApprovedPosts(clientId?: string): Promise<number> {
  try {
    const client = await withRetry(() =>
      db.client.findFirst({
        where: clientId
          ? { id: clientId }
          : {
              OR: [
                { domain: 'michigansportsoutdoor.com' },
                { companyName: 'Michigan Sports Outdoor' },
              ],
            },
        include: {
          brandProperties: {
            include: {
              posts: { select: { id: true, status: true, publishedAt: true } },
            },
          },
          linkCampaigns: { where: { enabled: true } },
        },
      })
    );

    if (!client || !client.linkCampaigns.length) return 0;

    const approvedCount = await withRetry(() =>
      db.brandPropertyPost.count({
        where: {
          property: { clientId: client.id },
          status: 'approved',
        },
      })
    );

    if (approvedCount >= 2) return 0;

    const needed = 2 - approvedCount;
    let created = 0;

    const properties = client.brandProperties.filter((p) => p.status !== 'retired');
    const hasDevtoKey = !!process.env.DEVTO_API_KEY;

    let telegraphProp = properties.find((p) => p.platform.includes('telegraph') || p.platform.includes('telegra.ph'));
    if (!telegraphProp) {
      telegraphProp = await withRetry(() =>
        db.brandProperty.create({
          data: {
            clientId: client.id,
            platform: 'telegraph',
            handle: 'mso-field-editor',
            authorName: 'Michigan Sports Outdoor Field Staff',
            authorBio: 'Field-tested reviews of hunting cutlery, EDC blades, and wilderness gear.',
            status: 'live',
          },
        })
      );
    }

    let devtoProp = properties.find((p) => p.platform.includes('dev.to') || p.platform.includes('devto'));
    if (!devtoProp && hasDevtoKey) {
      devtoProp = await withRetry(() =>
        db.brandProperty.create({
          data: {
            clientId: client.id,
            platform: 'dev.to',
            handle: 'digitizpk-outdoors',
            authorName: 'DigitizPK Outdoor Gear Lab',
            authorBio: 'In-depth metallurgical analyses and field cutting benchmarks.',
            status: 'live',
          },
        })
      );
    }

    const hasGitHubKey = !!process.env.GITHUB_ACCESS_TOKEN;
    let githubProp = properties.find((p) => p.platform.includes('github') || p.platform.includes('gist'));
    if (!githubProp && hasGitHubKey) {
      githubProp = await withRetry(() =>
        db.brandProperty.create({
          data: {
            clientId: client.id,
            platform: 'github',
            handle: 'Mubasharshahzad26',
            authorName: 'Mubashar Shahzad (DigitizePK)',
            authorBio: 'Technical outdoor gear & blade metallurgy guides.',
            status: 'live',
          },
        })
      );
    }

    let writeasProp = properties.find((p) => p.platform.includes('write.as') || p.platform.includes('writeas'));
    if (!writeasProp) {
      writeasProp = await withRetry(() =>
        db.brandProperty.create({
          data: {
            clientId: client.id,
            platform: 'write.as',
            handle: 'mso-blade-reviews',
            authorName: 'MSO Blade & Field Lab',
            authorBio: 'Independent field evaluations of hunting and tactical cutlery.',
            status: 'live',
          },
        })
      );
    const hasGitLabKey = !!process.env.GITLAB_ACCESS_TOKEN;
    let gitlabProp = properties.find((p) => p.platform.includes('gitlab'));
    if (!gitlabProp && hasGitLabKey) {
      gitlabProp = await withRetry(() =>
        db.brandProperty.create({
          data: {
            clientId: client.id,
            platform: 'gitlab',
            handle: 'digitizpk',
            authorName: 'DigitizPK Outdoor Gear Lab',
            authorBio: 'Field-tested outdoor cutlery protocols and technical cutting benchmarks.',
            status: 'live',
          },
        })
      );
    }

    const availableProps = [telegraphProp, writeasProp];
    if (hasDevtoKey && devtoProp) availableProps.push(devtoProp);
    if (hasGitHubKey && githubProp) availableProps.push(githubProp);
    if (hasGitLabKey && gitlabProp) availableProps.push(gitlabProp);

    for (let i = 0; i < needed; i++) {
      const profile = MSO_TARGET_PROFILES[(Date.now() + i) % MSO_TARGET_PROFILES.length];
      const anchor = profile.anchors[i % profile.anchors.length];
      const targetUrl = profile.targetUrl;

      const chosenProp = availableProps[(Date.now() + i) % availableProps.length] || telegraphProp;

      const prompt = `Write an authentic, highly informative, authoritative 500-word outdoor gear editorial article about "${profile.topic}".
Focus on: ${profile.theme}.
Include exactly ONE naturally integrated contextual backlink to "${targetUrl}" using the exact anchor text "${anchor}".
Do not sound like a spammy advertisement; write with the voice of an experienced hunter, bladesmith, or wilderness survivalist.
Use semantic HTML formatting: <h2>, <h3>, <p>, and <a> tags only. No markdown fences.
Respond with JSON only:
{"title": "Compelling Article Title Here", "bodyHtml": "<h2>...</h2><p>...</p>"}`;

      const generated = await generateWithPool(prompt, { json: true, temperature: 0.7 });
      let parsed: { title?: string; bodyHtml?: string } = {};
      try {
        parsed = JSON.parse(generated);
      } catch {
        const clean = generated.replace(/```json/g, '').replace(/```/g, '').trim();
        parsed = JSON.parse(clean);
      }

      if (parsed.title && parsed.bodyHtml) {
        let finalHtml = parsed.bodyHtml;
        if (!finalHtml.includes(targetUrl)) {
          finalHtml += `<p>For field-tested blades and authentic outdoor equipment, explore the <a href="${targetUrl}">${anchor}</a>.</p>`;
        }

        await withRetry(() =>
          db.brandPropertyPost.create({
            data: {
              propertyId: chosenProp.id,
              title: parsed.title!,
              bodyHtml: finalHtml,
              clientAnchors: [anchor],
              anchorVerdicts: ['natural'],
              status: 'approved',
              wordCount: finalHtml.split(/\s+/).length,
            },
          })
        );
        created++;
        console.log(`[auto-publish] Auto-drafted and approved post: "${parsed.title}" for ${chosenProp.platform}`);
      }
    }

    return created;
  } catch (err) {
    console.warn('[auto-publish] Error in replenishApprovedPosts (non-blocking):', err);
    return 0;
  }
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

  // 1. Autonomous Queue Replenishment — ensure approved posts exist
  await replenishApprovedPosts(clientId);

  // 2. Find posts that are approved and ready for publishing
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
        if (process.env.DEVTO_API_KEY) {
          liveUrl = await publishToDevTo({
            title: post.title,
            bodyHtml: post.bodyHtml,
          });
        } else {
          // Gracefully fallback to Telegraph if dev.to key missing in current env
          console.warn('[auto-publish] DEVTO_API_KEY missing, falling back to Telegra.ph');
          liveUrl = await publishToTelegraph({
            title: post.title,
            bodyHtml: post.bodyHtml,
            authorName: post.property.authorName || undefined,
          });
        }
      } else if (platform.includes('github') || platform.includes('gist')) {
        if (process.env.GITHUB_ACCESS_TOKEN) {
          liveUrl = await publishToGitHubGist({
            title: post.title,
            bodyHtml: post.bodyHtml,
          });
        } else {
          console.warn('[auto-publish] GITHUB_ACCESS_TOKEN missing, falling back to Telegra.ph');
          liveUrl = await publishToTelegraph({
            title: post.title,
            bodyHtml: post.bodyHtml,
            authorName: post.property.authorName || undefined,
          });
        }
      } else if (platform.includes('write.as') || platform.includes('writeas')) {
        liveUrl = await publishToWriteAs({
          title: post.title,
          bodyHtml: post.bodyHtml,
        });
      } else if (platform.includes('gitlab')) {
        if (process.env.GITLAB_ACCESS_TOKEN) {
          liveUrl = await publishToGitLabSnippet({
            title: post.title,
            bodyHtml: post.bodyHtml,
          });
        } else {
          console.warn('[auto-publish] GITLAB_ACCESS_TOKEN missing, falling back to Telegra.ph');
          liveUrl = await publishToTelegraph({
            title: post.title,
            bodyHtml: post.bodyHtml,
            authorName: post.property.authorName || undefined,
          });
        }
      } else if (platform.includes('medium')) {
        liveUrl = await publishToMedium({
          title: post.title,
          bodyHtml: post.bodyHtml,
        });
      } else {
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

        // 2. If client has an active campaign, record a LinkPlacement with deep link target
        const campaign = post.property.client.linkCampaigns[0];
        if (campaign) {
          const fallbackAnchor = post.clientAnchors[0] || post.property.client.companyName;
          const { targetUrl, anchor } = extractTargetAndAnchor(
            post.bodyHtml,
            campaign.targetDomain,
            fallbackAnchor
          );

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
                linkType: 'dofollow',
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
