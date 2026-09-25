// app/image-sitemap.xml/route.ts
//
// Image sitemap. Google discovers most images by crawling the page, but only
// after it crawls the page — an image sitemap tells it about them directly,
// which matters more now that Search Console reports web multimodal traffic
// (Lens, Circle to Search, "Search this image") as its own search type.
//
// Built per request from the same sources the pages render from, so a new news
// article's cover image appears here as soon as the article is published:
//
//   news + blog spokes   MarketingBlog.coverImage, plus every <img>/markdown
//                        image inside the body
//   case studies         app/case-studies/data.ts
//   file-based blog      app/blog/data.ts hero images
//   homepage proof       the unedited GSC/revenue screenshots the homepage
//                        renders and lib/site-schema marks up
//
// Only indexable pages are listed: an image on a noindexed page has nothing to
// rank against. Captions are omitted rather than invented — Google reads the
// alt text and the surrounding page anyway.

import { db } from "@/lib/db";
import { caseStudies, detailUrl } from "../case-studies/data";
import { posts as blogPosts } from "../blog/data";

export const dynamic = "force-dynamic";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.searchprex.com";

/**
 * The proof screenshots the homepage renders.
 *
 * Keep this in step with components/RecoveryStory.tsx and RevenueProof.tsx,
 * which is what actually puts them on the page. It drifted once already: this
 * list advertised mso-revenue-3-aug17.png after the third panel had been
 * replaced by mso-revenue-3-sep25.png, so the sitemap pointed Google at an
 * image that appears on no page while omitting the one that does. An image
 * sitemap entry for an image no page contains is a dead end for a crawler.
 */
const HOMEPAGE_PROOF = [
  "/images/proof/mso-gsc-indexing-full.png",
  "/images/proof/smk-revenue-before.png",
  "/images/proof/smk-revenue-after.png",
  "/images/proof/mso-revenue-1-jul20.png",
  "/images/proof/mso-revenue-2-aug06.png",
  "/images/proof/mso-revenue-3-sep25.png",
];

function absolute(url: string): string | null {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return `${SITE}${url}`;
  return null;
}

/** Image URLs inside a markdown or HTML body. */
function imagesInBody(body: string | null | undefined): string[] {
  if (!body) return [];
  const found = new Set<string>();
  for (const m of body.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g)) found.add(m[1]);
  for (const m of body.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)) found.add(m[1]);
  return [...found];
}

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  // pageUrl -> image URLs, de-duplicated, order preserved.
  const byPage = new Map<string, Set<string>>();

  const addImages = (pageUrl: string, images: Array<string | null | undefined>) => {
    for (const raw of images) {
      const url = absolute((raw || "").trim());
      if (!url) continue;
      const set = byPage.get(pageUrl) ?? new Set<string>();
      set.add(url);
      byPage.set(pageUrl, set);
    }
  };

  addImages(`${SITE}/`, HOMEPAGE_PROOF);

  for (const cs of caseStudies) addImages(`${SITE}${detailUrl(cs)}`, [cs.image]);
  for (const post of blogPosts) addImages(`${SITE}/blog/${post.slug}`, [(post as any).heroImage]);

  // Published CMS articles: news spokes under /resources/news, everything else
  // under /blog. Failing soft matters here — a database blip should serve a
  // smaller sitemap, not a 500 that teaches Google the file is broken.
  try {
    const articles = await db.marketingBlog.findMany({
      where: { published: true },
      select: { slug: true, category: true, coverImage: true, content: true, canonicalUrl: true },
    });
    for (const a of articles) {
      const isNews = a.category?.toLowerCase().includes("seo news");
      const pageUrl = a.canonicalUrl || `${SITE}${isNews ? "/resources/news" : "/blog"}/${a.slug}`;
      addImages(pageUrl, [a.coverImage, ...imagesInBody(a.content)]);
    }
  } catch (err) {
    console.error("[image-sitemap] CMS articles unavailable:", err);
  }

  const urls = [...byPage.entries()]
    .filter(([, images]) => images.size > 0)
    .map(([pageUrl, images]) => {
      const tags = [...images]
        .map((img) => `    <image:image><image:loc>${xmlEscape(img)}</image:loc></image:image>`)
        .join("\n");
      return `  <url>\n    <loc>${xmlEscape(pageUrl)}</loc>\n${tags}\n  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
