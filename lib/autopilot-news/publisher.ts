// lib/autopilot-news/publisher.ts
//
// Writes a generated news article to the site. Unguarded on purpose, like
// settings.ts: the cron authenticates with CRON_SECRET, and the admin UI goes
// through the requireAdmin-guarded action in
// app/content-admin/news-autopilot/actions.ts.

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import type { GeneratedNewsArticle } from "./generator";
import { checkArticleQuality, type QualityCheck } from "./quality";
import { sanitizeSlug } from "./config";

const SITE = "https://www.searchprex.com";

export interface SaveNewsOptions {
  publishLive: boolean;
  /**
   * The slug this editing session already saved. It is the only existing row
   * this save may overwrite; any other slug collision gets a fresh suffix.
   */
  replaceSlug?: string | null;
  /** Ids of overridable quality checks an editor has verified by hand. */
  overrides?: string[];
}

export interface SaveNewsResult {
  success: boolean;
  url: string;
  slug: string;
  published: boolean;
  /** Set when the requested slug was taken and a suffixed one was used. */
  requestedSlug?: string;
  error?: string;
  blocking?: QualityCheck[];
}

/**
 * `MarketingBlog.slug` is unique across the whole blog, not just SEO News, and
 * the generator is told to write evergreen slugs — so a collision with an
 * unrelated post is expected, not hypothetical. The save used to upsert by slug,
 * which silently replaced that post's content and moved it into SEO News.
 */
async function findFreeSlug(base: string): Promise<string> {
  for (let n = 1; n <= 50; n++) {
    const suffix = n === 1 ? "" : `-${n}`;
    const candidate = `${base.slice(0, 80 - suffix.length).replace(/-+$/, "")}${suffix}`;
    const taken = await db.marketingBlog.findUnique({ where: { slug: candidate }, select: { id: true } });
    if (!taken) return candidate;
  }
  throw new Error(`No free slug near "${base}"; choose a different slug.`);
}

export async function saveNewsArticle(
  article: GeneratedNewsArticle,
  opts: SaveNewsOptions
): Promise<SaveNewsResult> {
  const requested = sanitizeSlug(article.slug || "");
  const fail = (error: string, blocking?: QualityCheck[]): SaveNewsResult => ({
    success: false,
    url: "",
    slug: requested,
    published: false,
    error,
    blocking,
  });

  if (!requested) return fail("The slug is empty.");
  if (!article.content?.trim()) return fail("The article body is empty.");

  // The gate is enforced here, not just in the UI, so neither a stale client
  // nor the cron can publish around it.
  if (opts.publishLive) {
    const report = checkArticleQuality({ ...article, slug: requested }, { overrides: opts.overrides });
    if (!report.canPublish) {
      return fail(
        `Quality gate failed: ${report.blocking.map((c) => c.label).join(", ")}. Save as a draft or fix these first.`,
        report.blocking
      );
    }
  }

  try {
    const ownRow = opts.replaceSlug
      ? await db.marketingBlog.findUnique({ where: { slug: sanitizeSlug(opts.replaceSlug) } })
      : null;
    const slug = ownRow && ownRow.slug === requested ? requested : await findFreeSlug(requested);
    const liveUrl = `${SITE}/resources/news/${slug}`;

    // Re-publishing an edit keeps the original date; only the first publish sets it.
    const publishedAt = opts.publishLive ? ownRow?.publishedAt ?? new Date() : ownRow?.publishedAt ?? null;

    const fields = {
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
      published: opts.publishLive,
      publishedAt,
    };

    // ownRow may have been saved under a different slug earlier in this editing
    // session; updating it in place (rather than creating a second row) is what
    // keeps a renamed article from existing twice.
    if (ownRow) {
      await db.marketingBlog.update({ where: { id: ownRow.id }, data: fields });
    } else {
      await db.marketingBlog.create({ data: fields });
    }

    // The short feed item. newsDate is when the story broke, not when we wrote it up.
    const newsDate = article.sourcePublishedAt ? new Date(article.sourcePublishedAt) : new Date();
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
          newsDate,
          published: opts.publishLive,
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
          newsDate,
          published: opts.publishLive,
        },
      });
    }

    if (opts.publishLive) {
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
        console.warn("[news-publisher] IndexingQueue insert notice:", idxErr);
      }
    }

    revalidatePath("/resources/news");
    revalidatePath(`/resources/news/${slug}`);
    if (ownRow && ownRow.slug !== slug) revalidatePath(`/resources/news/${ownRow.slug}`);
    revalidatePath("/content-admin/news");
    revalidatePath("/content-admin/blogs");
    revalidatePath("/news-sitemap.xml");

    return {
      success: true,
      url: liveUrl,
      slug,
      published: opts.publishLive,
      requestedSlug: slug !== requested ? requested : undefined,
    };
  } catch (err: any) {
    console.error("[news-publisher] Save failed:", err);
    return fail(err?.message || "Unknown error");
  }
}
