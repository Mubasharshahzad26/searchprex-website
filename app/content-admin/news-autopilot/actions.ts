// app/content-admin/news-autopilot/actions.ts
"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { harvestLatestNews, EnrichedNewsItem } from "@/lib/autopilot-news/harvester";
import { generateSEOArticle, GeneratedNewsArticle } from "@/lib/autopilot-news/generator";
import { getPoolStatus } from "@/lib/gemini-pool";

export interface AutopilotSettings {
  enabled: boolean;
  autoPublish: boolean;
  dailyLimit: number;
}

const CONFIG_KEY = "news_autopilot_config";

export async function getNewsFeedItems(): Promise<{
  items: EnrichedNewsItem[];
  poolStatus: any;
  settings: AutopilotSettings;
  publishedToday: number;
}> {
  const [items, poolStatus, settings, publishedToday] = await Promise.all([
    harvestLatestNews(),
    getPoolStatus().catch(() => null),
    getAutopilotSettings(),
    getPublishedTodayCount(),
  ]);

  return { items, poolStatus, settings, publishedToday };
}

export async function generateNewsArticleAction(item: EnrichedNewsItem): Promise<GeneratedNewsArticle> {
  return await generateSEOArticle(item);
}

export async function saveNewsArticleAction(
  article: GeneratedNewsArticle,
  publishLive: boolean
): Promise<{ success: boolean; url: string; slug: string; error?: string }> {
  try {
    const slug = article.slug.trim().toLowerCase();
    const liveUrl = `https://www.searchprex.com/resources/news/${slug}`;

    // 1. Create or update in MarketingBlog (the full in-depth news article)
    await db.marketingBlog.upsert({
      where: { slug },
      create: {
        slug,
        title: article.title,
        metaTitle: article.metaTitle,
        metaDescription: article.metaDescription,
        excerpt: article.excerpt,
        category: article.category,
        author: article.author || "Mubashar Sharif",
        coverImage: article.coverImage,
        content: article.content,
        readTime: article.readTime,
        canonicalUrl: liveUrl,
        schemaType: "NewsArticle",
        published: publishLive,
        publishedAt: publishLive ? new Date() : null,
      },
      update: {
        title: article.title,
        metaTitle: article.metaTitle,
        metaDescription: article.metaDescription,
        excerpt: article.excerpt,
        category: article.category,
        author: article.author || "Mubashar Sharif",
        coverImage: article.coverImage,
        content: article.content,
        readTime: article.readTime,
        published: publishLive,
        publishedAt: publishLive ? new Date() : undefined,
      },
    });

    // 2. Also record in MarketingNews (the short summary feed item)
    const tag = article.category.split("—").pop()?.trim() || "SEO News";
    const existingNews = await db.marketingNews.findFirst({
      where: { sourceHref: article.sourceUrl },
    });

    if (existingNews) {
      await db.marketingNews.update({
        where: { id: existingNews.id },
        data: {
          title: article.title,
          summary: article.excerpt,
          tag,
          published: publishLive,
        },
      });
    } else {
      await db.marketingNews.create({
        data: {
          title: article.title,
          summary: article.excerpt,
          tag,
          sourceLabel: article.sourceName,
          sourceHref: article.sourceUrl,
          newsDate: new Date(),
          published: publishLive,
        },
      });
    }

    // 3. If published live, queue for Google Indexing API submission
    if (publishLive) {
      try {
        await db.indexingQueue.upsert({
          where: { url: liveUrl },
          create: {
            url: liveUrl,
            clientId: "system-news",
            priority: 1, // High priority for breaking news
            status: "queued",
          },
          update: {
            status: "queued",
            priority: 1,
          },
        });
      } catch (idxErr) {
        console.warn("[news-actions] IndexingQueue insert notice:", idxErr);
      }
    }

    revalidatePath("/resources/news");
    revalidatePath(`/resources/news/${slug}`);
    revalidatePath("/content-admin/news");
    revalidatePath("/content-admin/blogs");
    revalidatePath("/news-sitemap.xml");

    return { success: true, url: liveUrl, slug };
  } catch (err: any) {
    console.error("[news-actions] Save failed:", err);
    return { success: false, url: "", slug: article.slug, error: err.message };
  }
}

export async function getAutopilotSettings(): Promise<AutopilotSettings> {
  try {
    const rows = await db.$queryRaw<Array<{ value: string }>>`
      SELECT value FROM mso_cloud_config WHERE key = ${CONFIG_KEY}
    `;
    if (rows?.[0]?.value) {
      return JSON.parse(rows[0].value);
    }
  } catch {
    // fallback defaults
  }
  return {
    enabled: false,
    autoPublish: false,
    dailyLimit: 3,
  };
}

export async function updateAutopilotSettings(settings: AutopilotSettings): Promise<boolean> {
  try {
    const value = JSON.stringify(settings);
    await db.$executeRaw`
      INSERT INTO mso_cloud_config (key, value, updated_at)
      VALUES (${CONFIG_KEY}, ${value}, NOW())
      ON CONFLICT (key) DO UPDATE
      SET value = ${value}, updated_at = NOW()
    `;
    return true;
  } catch (err) {
    console.error("[news-actions] Update config failed:", err);
    return false;
  }
}

async function getPublishedTodayCount(): Promise<number> {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const count = await db.marketingBlog.count({
      where: {
        category: { contains: "SEO News", mode: "insensitive" },
        published: true,
        publishedAt: { gte: today },
      },
    });
    return count;
  } catch {
    return 0;
  }
}
