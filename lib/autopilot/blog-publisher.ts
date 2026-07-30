type BlogPublishInput = {
  siteUrl: string;
  title: string;
  content: string;         // HTML with FAQ schema injected
  metaTitle: string;
  metaDescription: string;
  categoryId: number;      // WP category ID (e.g. 3278 for "blog")
  authorId: number;        // WP user ID (e.g. 4 for Mubashar Shahzad)
  tags?: string[];         // Tag names (WP will create if missing)
  slug?: string;           // Optional custom slug
  username: string;
  appPassword: string;
};

export type BlogPublishResult = {
  wpPostId: number;
  liveUrl: string;
  publishedAt: Date;
};

/**
 * Publishes a blog post to WordPress via /wp-json/wp/v2/posts.
 * Also updates Rank Math meta title + description via post_meta.
 */
export async function publishBlogToWordPress(
  input: BlogPublishInput
): Promise<BlogPublishResult> {
  const baseUrl = input.siteUrl.replace(/\/$/, '');
  const authHeader = 'Basic ' + Buffer.from(
    `${input.username}:${input.appPassword}`
  ).toString('base64');

  // 1. Resolve tags to tag IDs (create if missing)
  const tagIds = input.tags && input.tags.length > 0
    ? await resolveTagIds(baseUrl, input.tags, authHeader)
    : [];

  // 2. Create the post
  const postPayload = {
    title: input.title,
    content: input.content,
    status: 'publish',
    author: input.authorId,
    categories: [input.categoryId],
    tags: tagIds,
    slug: input.slug,
    meta: {
      rank_math_title: input.metaTitle,
      rank_math_description: input.metaDescription,
    },
  };

  const createRes = await fetch(`${baseUrl}/wp-json/wp/v2/posts`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postPayload),
  });

  if (!createRes.ok) {
    const errBody = await createRes.text();
    throw new Error(
      `WP post create failed (${createRes.status}): ${errBody.slice(0, 500)}`
    );
  }

  const post = await createRes.json() as {
    id: number;
    link: string;
    date_gmt: string;
    meta?: Record<string, string>;
  };

  // 3. Verify Rank Math meta was set — if not, patch via separate call
  const metaSet = post.meta?.rank_math_title === input.metaTitle;
  if (!metaSet) {
    await patchRankMathMeta(baseUrl, post.id, input.metaTitle, input.metaDescription, authHeader);
  }

  return {
    wpPostId: post.id,
    liveUrl: post.link,
    publishedAt: new Date(post.date_gmt + 'Z'),
  };
}

/**
 * Resolves tag names to tag IDs. Creates missing tags on the fly.
 */
async function resolveTagIds(
  baseUrl: string,
  tagNames: string[],
  authHeader: string
): Promise<number[]> {
  const ids: number[] = [];

  for (const name of tagNames) {
    // Try to find existing tag
    const searchRes = await fetch(
      `${baseUrl}/wp-json/wp/v2/tags?search=${encodeURIComponent(name)}&per_page=5`,
      { headers: { 'Authorization': authHeader } }
    );

    if (searchRes.ok) {
      const found = await searchRes.json() as Array<{ id: number; name: string }>;
      const match = found.find(t => t.name.toLowerCase() === name.toLowerCase());
      if (match) {
        ids.push(match.id);
        continue;
      }
    }

    // Not found — create it
    const createRes = await fetch(`${baseUrl}/wp-json/wp/v2/tags`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (createRes.ok) {
      const created = await createRes.json() as { id: number };
      ids.push(created.id);
    }
    // Silently skip if tag creation fails — non-critical
  }

  return ids;
}

/**
 * Fallback: sets Rank Math meta via POST update if inline meta didn't stick.
 */
async function patchRankMathMeta(
  baseUrl: string,
  postId: number,
  metaTitle: string,
  metaDescription: string,
  authHeader: string
): Promise<void> {
  await fetch(`${baseUrl}/wp-json/wp/v2/posts/${postId}`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      meta: {
        rank_math_title: metaTitle,
        rank_math_description: metaDescription,
      },
    }),
  });
}