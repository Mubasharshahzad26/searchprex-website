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

interface VideoEntry {
  thumbnailLoc: string;
  title: string;
  description: string;
  playerLoc?: string;
  contentLoc?: string;
  durationSeconds: number;
  publicationDate: string;
}

interface PageVideoGroup {
  loc: string;
  videos: VideoEntry[];
}

export async function GET() {
  const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.searchprex.com";

  const groups: PageVideoGroup[] = [
    {
      loc: `${SITE}/resources/news/tesla-flying-car-roadster-alef-ai-search-trend-seo-2026`,
      videos: [
        {
          thumbnailLoc: "https://i.ytimg.com/vi/wACc9vJflrc/hqdefault.jpg",
          title:
            "Tesla's 'FLYING CAR' Revealed! Musk's Roadster Flies, Drives Upside Down In Stunning Demo",
          description:
            "Live demonstration footage from SpaceX's McGregor, Texas facility showing the next-generation Tesla Roadster utilizing cold-gas thrusters and suction ramp propulsion.",
          playerLoc: "https://www.youtube.com/embed/wACc9vJflrc",
          durationSeconds: 255,
          publicationDate: "2026-10-16T12:00:00+00:00",
        },
        {
          thumbnailLoc: "https://i.ytimg.com/vi/GwffNnmuqfk/hqdefault.jpg",
          title: "Elon Musk Just Changed Cars Forever — Tesla Roadster FLIES!",
          description:
            "Industry breakdown of the October 2026 Tesla Roadster SpaceX package demonstration, synthetic AI video skepticism, and Alef Aeronautics' eVTOL flying car response.",
          playerLoc: "https://www.youtube.com/embed/GwffNnmuqfk",
          durationSeconds: 570,
          publicationDate: "2026-10-16T15:00:00+00:00",
        },
      ],
    },
    {
      loc: `${SITE}/free-audit`,
      videos: [
        {
          thumbnailLoc: `${SITE}/images/proof/poster-audit-walkthrough.png`,
          title: "SearchPrex Founder-Led Technical & Local SEO Audit Walkthrough",
          description:
            "Mubashar Sharif walks through a real Google Search Console, Google Business Profile, and technical SEO audit for US businesses and law firms.",
          contentLoc: `${SITE}/video/seo-audit-walkthrough.mp4`,
          durationSeconds: 95,
          publicationDate: "2026-09-01T12:00:00+00:00",
        },
      ],
    },
    {
      loc: `${SITE}/tools/keyword-research`,
      videos: [
        {
          thumbnailLoc: `${SITE}/images/video-posters/nicheseo-pro.png`,
          title: "NicheSEO Pro Keyword Research & Authority Analysis Demo",
          description:
            "Product demonstration of SearchPrex's keyword research, SERP analysis, and domain authority workflow.",
          contentLoc: `${SITE}/video/nicheseo-pro.mp4`,
          durationSeconds: 60,
          publicationDate: "2026-09-01T12:00:00+00:00",
        },
      ],
    },
  ];

  // Dynamically discover any other published news/blog articles with embedded YouTube videos
  try {
    const dbPosts = await db.marketingBlog.findMany({
      where: {
        published: true,
        slug: { not: "tesla-flying-car-roadster-alef-ai-search-trend-seo-2026" },
        content: { contains: "youtube.com/embed/" },
      },
      select: {
        slug: true,
        title: true,
        excerpt: true,
        metaDescription: true,
        category: true,
        content: true,
        publishedAt: true,
        createdAt: true,
      },
    });

    for (const post of dbPosts) {
      if (!post.content) continue;
      const matches = Array.from(
        post.content.matchAll(
          /<iframe[^>]*src=["']https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]{11})["'][^>]*>/gi
        )
      );
      if (matches.length === 0) continue;

      const isNews = post.category?.toLowerCase().includes("news");
      const pageUrl = isNews
        ? `${SITE}/resources/news/${post.slug}`
        : `${SITE}/blog/${post.slug}`;
      const pubDate = (post.publishedAt || post.createdAt || new Date()).toISOString();

      groups.push({
        loc: pageUrl,
        videos: matches.map((m, idx) => {
          const videoId = m[1];
          const titleMatch = m[0].match(/title=["']([^"']+)["']/i);
          return {
            thumbnailLoc: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
            title: titleMatch?.[1] || `${post.title} (Video ${idx + 1})`,
            description: post.metaDescription || post.excerpt || post.title,
            playerLoc: `https://www.youtube.com/embed/${videoId}`,
            durationSeconds: 300,
            publicationDate: pubDate,
          };
        }),
      });
    }
  } catch (err) {
    console.error("[video-sitemap] Failed to scan dynamic video posts:", err);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${groups
  .map(
    (g) => `  <url>
    <loc>${escapeXml(g.loc)}</loc>
${g.videos
  .map(
    (v) => `    <video:video>
      <video:thumbnail_loc>${escapeXml(v.thumbnailLoc)}</video:thumbnail_loc>
      <video:title>${escapeXml(v.title)}</video:title>
      <video:description>${escapeXml(v.description)}</video:description>${
        v.contentLoc
          ? `\n      <video:content_loc>${escapeXml(v.contentLoc)}</video:content_loc>`
          : ""
      }${
        v.playerLoc
          ? `\n      <video:player_loc>${escapeXml(v.playerLoc)}</video:player_loc>`
          : ""
      }
      <video:duration>${v.durationSeconds}</video:duration>
      <video:publication_date>${v.publicationDate}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:live>no</video:live>
    </video:video>`
  )
  .join("\n")}
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(xml.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=600",
    },
  });
}
