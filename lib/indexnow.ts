// ─────────────────────────────────────────────────────────────────────────────
//  IndexNow — tell Bing (and the other IndexNow engines) when a page changes
//
//  ChatGPT search and Copilot answer from Bing's index, so a post Bing has not
//  crawled cannot be cited there. The key file has been in /public since it
//  was added, but nothing ever submitted a URL. Every publish path now calls
//  submitToIndexNow: the content admin, the news publisher and the
//  AutopilotRank webhook.
//
//  The key is not a secret: IndexNow verifies ownership by fetching
//  https://www.searchprex.com/<key>.txt, which is public by design.
// ─────────────────────────────────────────────────────────────────────────────

const HOST = "www.searchprex.com";
const SITE = `https://${HOST}`;
const KEY = "96c267735d2d45de89cefa9f23201886";

/** The public URL of a MarketingBlog row: its canonical, else /resources/news or /blog. */
export function marketingPostUrl(row: { slug: string; category?: string | null; canonicalUrl?: string | null }): string {
  if (row.canonicalUrl && row.canonicalUrl.startsWith(SITE)) return row.canonicalUrl;
  const isNews = (row.category || "").toLowerCase().includes("seo news");
  return `${SITE}${isNews ? "/resources/news" : "/blog"}/${row.slug}`;
}

/**
 * Submit changed URLs. Best effort: never throws, never blocks a publish for
 * more than 8 seconds. Only this site's URLs are sent.
 */
export async function submitToIndexNow(urls: string[]): Promise<{ ok: boolean; status?: number; submitted: number }> {
  const urlList = [...new Set(urls)].filter((u) => typeof u === "string" && u.startsWith(`${SITE}/`)).slice(0, 10_000);
  if (!urlList.length) return { ok: true, submitted: 0 };
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
      signal: AbortSignal.timeout(8000),
    });
    //  200 = accepted, 202 = accepted and the key is still being verified.
    const ok = res.status === 200 || res.status === 202;
    if (!ok) console.warn("[indexnow] rejected:", res.status, urlList.length, "urls");
    return { ok, status: res.status, submitted: urlList.length };
  } catch (err) {
    console.warn("[indexnow] submit failed:", err);
    return { ok: false, submitted: urlList.length };
  }
}
