export async function publishToWordPress(params: {
  siteUrl: string;
  postId: number;
  title?: string;
  content: string;
  metaDescription: string;
  metaTitle?: string;
  focusKeyword?: string;
  username: string;
  appPassword: string;
}) {
  const auth = Buffer
    .from(`${params.username}:${params.appPassword}`)
    .toString('base64');

  const endpoint = `${params.siteUrl}/wp-json/wp/v2/product/${params.postId}`;

  // Rank Math meta fields (NOT Yoast)
  const meta: Record<string, string> = {};
  if (params.metaDescription) {
    meta.rank_math_description = params.metaDescription;
  }
  if (params.metaTitle) {
    meta.rank_math_title = params.metaTitle;
  }
  if (params.focusKeyword) {
    meta.rank_math_focus_keyword = params.focusKeyword;
  }

  const body: Record<string, any> = {
    content: params.content,
    status: 'publish',
  };
  if (params.title) {
    body.title = params.title;
  }
  if (Object.keys(meta).length > 0) {
    body.meta = meta;
  }

  const res = await withRetry(() => fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${auth}`,
    },
    body: JSON.stringify(body),
  }));

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`WP publish failed ${res.status}: ${errBody.slice(0, 200)}`);
  }

  const data = await res.json();
  return {
    liveUrl: data.link as string,
    wpPostId: data.id as number,
    publishedAt: new Date(data.modified),
  };
}

async function withRetry<T>(
  fn: () => Promise<T>,
  opts: { retries?: number; delayMs?: number } = {}
): Promise<T> {
  const retries = opts.retries ?? 3;
  const delayMs = opts.delayMs ?? 1000;
  let lastErr: unknown;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (i < retries - 1) {
        await new Promise(r => setTimeout(r, delayMs * (i + 1)));
      }
    }
  }
  throw lastErr;
}