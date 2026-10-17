import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(request: Request) {
  const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.searchprex.com";

  const { searchParams } = new URL(request.url);
  const categoryParam = searchParams.get("category");
  const filterCat = categoryParam ? categoryParam : "News";

  // Google News Sitemaps prioritize articles published or updated in the last 48 hours.
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  let posts = await db.marketingBlog.findMany({
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
  });

  // Ensure the sitemap always lists the latest active news spokes (up to 10)
  // so Google Search Console never encounters an empty <urlset>.
  if (posts.length < 5) {
    posts = await db.marketingBlog.findMany({
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
    });
  }

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
