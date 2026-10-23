import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { staticNewsSpokes } from "@/lib/static-news-spokes";

export const dynamic = "force-dynamic";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const DB_QUERY_TIMEOUT_MS = 1500;

async function queryNewsSitemapWithFallback<T>(query: Promise<T>, label: string): Promise<T | null> {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  try {
    const result = await Promise.race([
      query,
      new Promise<null>((resolve) => {
        timeout = setTimeout(() => resolve(null), DB_QUERY_TIMEOUT_MS);
      }),
    ]);
    if (result === null) console.warn(`[news-sitemap] ${label} timed out; using static articles.`);
    return result;
  } catch (error) {
    console.error(`[news-sitemap] ${label} unavailable; using static articles:`, error);
    return null;
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

export async function GET(request: Request) {
  const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.searchprex.com";

  const { searchParams } = new URL(request.url);
  const categoryParam = searchParams.get("category");
  const filterCat = categoryParam ? categoryParam : "News";

  // Google News Sitemaps prioritize articles published or updated in the last 48 hours.
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  type NewsSitemapPost = { slug: string; title: string; publishedAt: Date | null; updatedAt: Date; coverImage: string | null };
  const recentPosts = await queryNewsSitemapWithFallback(
    db.marketingBlog.findMany({
    where: {
      published: true,
      category: { contains: filterCat, mode: "insensitive" },
      OR: [
        { publishedAt: { gte: twoDaysAgo } },
        { updatedAt: { gte: twoDaysAgo } },
      ],
    },
    orderBy: { publishedAt: "desc" },
    select: {
      slug: true,
      title: true,
      publishedAt: true,
      updatedAt: true,
      coverImage: true,
    },
    }),
    "Recent article query",
  );
  let posts: NewsSitemapPost[] = recentPosts || [];

  // Ensure the sitemap always lists the latest active news spokes (up to 10)
  // so Google Search Console never encounters an empty <urlset>.
  if (posts.length < 5 && recentPosts !== null) {
    const publishedPosts = await queryNewsSitemapWithFallback(
      db.marketingBlog.findMany({
      where: {
        published: true,
        category: { contains: filterCat, mode: "insensitive" },
      },
      orderBy: { publishedAt: "desc" },
      take: 10,
      select: {
        slug: true,
        title: true,
        publishedAt: true,
        updatedAt: true,
        coverImage: true,
      },
      }),
      "Published article query",
    );
    if (publishedPosts) posts = publishedPosts;
  }

  // Always merge recent static stories; this keeps the News sitemap current even
  // when the CMS is healthy but does not yet contain a newly published article.
  const staticPosts: NewsSitemapPost[] = staticNewsSpokes
    .filter((spoke) => {
      const isRecent = new Date(`${spoke.date}T00:00:00.000Z`) >= twoDaysAgo;
      const matchesCategory = !categoryParam || spoke.category.toLowerCase().includes(categoryParam.toLowerCase());
      return isRecent && matchesCategory;
    })
    .map((spoke) => ({
      slug: spoke.slug,
      title: spoke.title,
      publishedAt: new Date(`${spoke.date}T00:00:00.000Z`),
      updatedAt: new Date(spoke.dateModified || `${spoke.date}T00:00:00.000Z`),
      coverImage: spoke.heroImage,
    }));
  const postBySlug = new Map<string, NewsSitemapPost>();
  for (const post of [...staticPosts, ...posts]) {
    if (!postBySlug.has(post.slug)) postBySlug.set(post.slug, post);
  }
  posts = [...postBySlug.values()]
    .sort((a, b) => new Date(b.publishedAt || b.updatedAt).getTime() - new Date(a.publishedAt || a.updatedAt).getTime())
    .slice(0, 10);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${posts
  .map((post) => {
    const pubDate = (post.publishedAt || post.updatedAt || new Date()).toISOString();
    const lastMod = (post.updatedAt || post.publishedAt || new Date()).toISOString();
    const imgUrl = post.coverImage
      ? post.coverImage.startsWith("/")
        ? `${SITE}${post.coverImage}`
        : post.coverImage
      : null;
    return `  <url>
    <loc>${SITE}/resources/news/${escapeXml(post.slug)}</loc>
    <lastmod>${lastMod}</lastmod>
    <news:news>
      <news:publication>
        <news:name>SearchPrex SEO News</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${escapeXml(post.title)}</news:title>
    </news:news>${
      imgUrl
        ? `\n    <image:image>\n      <image:loc>${escapeXml(imgUrl)}</image:loc>\n      <image:title>${escapeXml(post.title)}</image:title>\n    </image:image>`
        : ""
    }
  </url>`;
  })
  .join("\n")}
</urlset>`;

  return new NextResponse(xml.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=600",
    },
  });
}
