"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/require-admin";
import { notifySubscribersOfNewPost } from "@/lib/newsletter";
import { marketingPostUrl, submitToIndexNow } from "@/lib/indexnow";
import { staticNewsSpokes } from "@/lib/static-news-spokes";

/**
 * Every action below is admin-only, and the middleware is NOT enough on its own.
 * See lib/auth/require-admin.ts for why the guard lives at each action.
 *
 * The reads are guarded too, not just the writes: getMarketingBlogs and friends
 * return unpublished drafts, so leaving them open would leak content that has
 * deliberately not shipped.
 */

// --- MARKETING PAGES ---
export async function getMarketingPages() {
  await requireAdmin();
  return await db.marketingPage.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createMarketingPage(data: any) {
  await requireAdmin();
  const page = await db.marketingPage.create({ data });
  revalidatePath("/content-admin/pages");
  return page;
}

export async function updateMarketingPage(id: string, data: any) {
  await requireAdmin();
  const page = await db.marketingPage.update({ where: { id }, data });
  revalidatePath("/content-admin/pages");
  return page;
}

export async function deleteMarketingPage(id: string) {
  await requireAdmin();
  await db.marketingPage.delete({ where: { id } });
  revalidatePath("/content-admin/pages");
}

// --- MARKETING BLOGS ---
const SEO_NEWS_WHERE = {
  OR: [
    { category: { contains: "SEO News", mode: "insensitive" as const } },
    { schemaType: "NewsArticle" },
  ],
};

function cleanOptionalText(val: unknown): string | null {
  if (val === undefined || val === null) return null;
  const trimmed = String(val).trim();
  return trimmed.length > 0 ? trimmed : null;
}

function pickMarketingBlogFields(data: any) {
  return {
    slug: String(data.slug || "").trim(),
    title: String(data.title || "").trim(),
    metaTitle: cleanOptionalText(data.metaTitle),
    metaDescription: cleanOptionalText(data.metaDescription),
    canonicalUrl: cleanOptionalText(data.canonicalUrl),
    ogTitle: cleanOptionalText(data.ogTitle),
    ogDescription: cleanOptionalText(data.ogDescription),
    twitterTitle: cleanOptionalText(data.twitterTitle),
    twitterDescription: cleanOptionalText(data.twitterDescription),
    schemaType: cleanOptionalText(data.schemaType),
    coverImage: cleanOptionalText(data.coverImage),
    content: String(data.content || ""),
    author: cleanOptionalText(data.author) ?? "Mubashar Sharif",
    excerpt: cleanOptionalText(data.excerpt),
    category: cleanOptionalText(data.category),
    readTime: cleanOptionalText(data.readTime),
    published: Boolean(data.published),
    ...(data.publishedAt ? { publishedAt: new Date(data.publishedAt) } : {}),
  };
}

function normalizeBlogData(data: any) {
  const fields = pickMarketingBlogFields(data);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(fields.slug)) {
    throw new Error("Enter a valid URL slug using lowercase letters, numbers, and hyphens.");
  }
  if (!fields.title) {
    throw new Error("Title is required.");
  }
  const category = fields.category || "Technical SEO";
  if (category.toLowerCase().includes("seo news") || fields.schemaType === "NewsArticle") {
    throw new Error("SEO News articles belong in the SEO News tab, not Blog Posts. Choose a blog category such as Technical SEO, Local SEO, or AI & GEO.");
  }
  const schemaType = fields.schemaType === "Article" ? "Article" : "BlogPosting";
  return { ...fields, category, schemaType };
}

export async function getMarketingBlogs() {
  await requireAdmin();
  return await db.marketingBlog.findMany({
    where: { NOT: SEO_NEWS_WHERE },
    orderBy: { createdAt: "desc" },
  });
}

export async function createMarketingBlog(data: any) {
  await requireAdmin();
  const normalized = normalizeBlogData(data);
  if (normalized.published && !normalized.publishedAt) normalized.publishedAt = new Date();
  const blog = await db.marketingBlog.create({ data: normalized });
  if (blog.published) {
    await notifySubscribersOfNewPost({
      slug: blog.slug,
      title: blog.title,
      excerpt: blog.excerpt || blog.metaDescription,
      category: blog.category,
      readTime: blog.readTime,
      author: blog.author,
      coverImage: blog.coverImage,
      published: blog.published,
    });
  }
  if (blog.published) await submitToIndexNow([marketingPostUrl(blog)]);
  revalidatePath("/content-admin/blogs");
  revalidatePath("/blog");
  revalidatePath(`/blog/${blog.slug}`);
  revalidatePath("/sitemap.xml");
  return blog;
}

export async function updateMarketingBlog(id: string, data: any) {
  await requireAdmin();
  const existing = await db.marketingBlog.findUnique({ where: { id } });
  if (!existing) throw new Error("Blog post not found.");
  const normalized = normalizeBlogData(data);
  const newlyPublished = Boolean(normalized.published && !existing.published);
  if (normalized.published && !normalized.publishedAt && !existing.publishedAt) {
    normalized.publishedAt = new Date();
  }
  const blog = await db.marketingBlog.update({ where: { id }, data: normalized });
  if (newlyPublished && blog.published) {
    await notifySubscribersOfNewPost({
      slug: blog.slug,
      title: blog.title,
      excerpt: blog.excerpt || blog.metaDescription,
      category: blog.category,
      readTime: blog.readTime,
      author: blog.author,
      coverImage: blog.coverImage,
      published: blog.published,
    });
  }
  //  A changed slug leaves the old URL behind; Bing should recrawl both.
  if (blog.published) {
    const urls = [marketingPostUrl(blog)];
    if (existing.slug !== blog.slug) urls.push(marketingPostUrl(existing));
    await submitToIndexNow(urls);
  }
  revalidatePath("/content-admin/blogs");
  revalidatePath("/blog");
  if (existing.slug !== blog.slug) revalidatePath(`/blog/${existing.slug}`);
  revalidatePath(`/blog/${blog.slug}`);
  revalidatePath("/sitemap.xml");
  return blog;
}

export async function deleteMarketingBlog(id: string) {
  await requireAdmin();
  const blog = await db.marketingBlog.delete({ where: { id } });
  revalidatePath("/content-admin/blogs");
  revalidatePath("/blog");
  revalidatePath(`/blog/${blog.slug}`);
  revalidatePath("/sitemap.xml");
}

// --- MARKETING CASE STUDIES ---
export async function getMarketingCaseStudies() {
  await requireAdmin();
  return await db.marketingCaseStudy.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createMarketingCaseStudy(data: any) {
  await requireAdmin();
  const { content, ...validData } = data;
  const caseStudy = await db.marketingCaseStudy.create({ data: validData });
  revalidatePath("/content-admin/case-studies");
  revalidatePath("/case-studies");
  return caseStudy;
}

export async function updateMarketingCaseStudy(id: string, data: any) {
  await requireAdmin();
  const { content, ...validData } = data;
  const caseStudy = await db.marketingCaseStudy.update({ where: { id }, data: validData });
  revalidatePath("/content-admin/case-studies");
  revalidatePath("/case-studies");
  return caseStudy;
}

export async function deleteMarketingCaseStudy(id: string) {
  await requireAdmin();
  await db.marketingCaseStudy.delete({ where: { id } });
  revalidatePath("/content-admin/case-studies");
}

// --- FULL SEO NEWS ARTICLES (stored in MarketingBlog so existing public
// NewsArticle routes and their canonical/OG/Twitter/schema rendering are used) ---
export async function getMarketingNewsArticles() {
  await requireAdmin();
  return await db.marketingBlog.findMany({
    where: SEO_NEWS_WHERE,
    orderBy: { updatedAt: "desc" },
  });
}

function normalizeNewsArticleData(data: any) {
  const fields = pickMarketingBlogFields(data);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(fields.slug)) {
    throw new Error("Enter a valid URL slug using lowercase letters, numbers, and hyphens.");
  }
  if (!fields.title) {
    throw new Error("Title is required.");
  }
  if (staticNewsSpokes.some((spoke) => spoke.slug === fields.slug)) {
    throw new Error("This URL slug is already used by a live SEO News page. Choose a different slug.");
  }
  const requestedCategory = fields.category || "";
  const category = requestedCategory.toLowerCase().includes("seo news")
    ? requestedCategory
    : `SEO News${requestedCategory ? ` — ${requestedCategory}` : ""}`;
  return { ...fields, category, schemaType: "NewsArticle" };
}

export async function createMarketingNewsArticle(data: any) {
  await requireAdmin();
  const normalized = normalizeNewsArticleData(data);
  if (normalized.published && !normalized.publishedAt) normalized.publishedAt = new Date();
  const article = await db.marketingBlog.create({ data: normalized });
  if (article.published) {
    await submitToIndexNow([`https://www.searchprex.com/resources/news/${article.slug}`]);
  }
  revalidatePath("/content-admin/news");
  revalidatePath("/resources/news");
  revalidatePath(`/resources/news/${article.slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/news-sitemap.xml");
  return article;
}

export async function updateMarketingNewsArticle(id: string, data: any) {
  await requireAdmin();
  const existing = await db.marketingBlog.findUnique({ where: { id } });
  if (!existing) throw new Error("News article not found.");
  const normalized = normalizeNewsArticleData(data);
  if (normalized.published && !normalized.publishedAt && !existing.publishedAt) {
    normalized.publishedAt = new Date();
  }
  const article = await db.marketingBlog.update({ where: { id }, data: normalized });
  if (article.published) {
    const urls = [`https://www.searchprex.com/resources/news/${article.slug}`];
    if (existing.slug !== article.slug) urls.push(`https://www.searchprex.com/resources/news/${existing.slug}`);
    await submitToIndexNow(urls);
  }
  revalidatePath("/content-admin/news");
  revalidatePath("/resources/news");
  revalidatePath(`/resources/news/${existing.slug}`);
  revalidatePath(`/resources/news/${article.slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/news-sitemap.xml");
  return article;
}

export async function deleteMarketingNewsArticle(id: string) {
  await requireAdmin();
  const article = await db.marketingBlog.delete({ where: { id } });
  revalidatePath("/content-admin/news");
  revalidatePath("/resources/news");
  revalidatePath(`/resources/news/${article.slug}`);
  revalidatePath("/sitemap.xml");
  revalidatePath("/news-sitemap.xml");
}
// --- MARKETING NEWS ---
let marketingNewsTableReady = false;

async function ensureMarketingNewsTable() {
  if (marketingNewsTableReady) return;
  await db.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "MarketingNews" (
      "id" TEXT NOT NULL,
      "title" TEXT NOT NULL,
      "summary" TEXT NOT NULL,
      "tag" TEXT,
      "sourceLabel" TEXT,
      "sourceHref" TEXT,
      "newsDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "published" BOOLEAN NOT NULL DEFAULT false,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "MarketingNews_pkey" PRIMARY KEY ("id")
    )
  `);
  marketingNewsTableReady = true;
}

function normalizeNewsFeedData(data: any) {
  const title = String(data.title || "").trim();
  const summary = String(data.summary || "").trim();
  if (!title) throw new Error("Feed card title is required.");
  if (!summary) throw new Error("Feed card summary is required.");

  let newsDate: Date | undefined;
  if (data.newsDate) {
    const parsed = new Date(data.newsDate);
    if (!Number.isNaN(parsed.getTime())) {
      newsDate = parsed;
    }
  }

  return {
    title,
    summary,
    tag: cleanOptionalText(data.tag),
    sourceLabel: cleanOptionalText(data.sourceLabel),
    sourceHref: cleanOptionalText(data.sourceHref),
    ...(newsDate ? { newsDate } : {}),
    published: Boolean(data.published),
  };
}

export async function getMarketingNews() {
  await requireAdmin();
  await ensureMarketingNewsTable();
  return await db.marketingNews.findMany({ orderBy: { newsDate: "desc" } });
}

export async function createMarketingNews(data: any) {
  await requireAdmin();
  await ensureMarketingNewsTable();
  const normalized = normalizeNewsFeedData(data);
  const news = await db.marketingNews.create({ data: normalized });
  revalidatePath("/content-admin/news");
  revalidatePath("/resources/news");
  return news;
}

export async function updateMarketingNews(id: string, data: any) {
  await requireAdmin();
  await ensureMarketingNewsTable();
  const normalized = normalizeNewsFeedData(data);
  const news = await db.marketingNews.update({ where: { id }, data: normalized });
  revalidatePath("/content-admin/news");
  revalidatePath("/resources/news");
  return news;
}

export async function deleteMarketingNews(id: string) {
  await requireAdmin();
  await ensureMarketingNewsTable();
  await db.marketingNews.delete({ where: { id } });
  revalidatePath("/content-admin/news");
  revalidatePath("/resources/news");
}

// --- MARKETING RESOURCES ---
export async function getMarketingResources() {
  await requireAdmin();
  return await db.marketingResource.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createMarketingResource(data: any) {
  await requireAdmin();
  const resource = await db.marketingResource.create({ data });
  revalidatePath("/content-admin/resources");
  revalidatePath("/resources");
  return resource;
}

export async function updateMarketingResource(id: string, data: any) {
  await requireAdmin();
  const resource = await db.marketingResource.update({ where: { id }, data });
  revalidatePath("/content-admin/resources");
  revalidatePath("/resources");
  return resource;
}

export async function deleteMarketingResource(id: string) {
  await requireAdmin();
  await db.marketingResource.delete({ where: { id } });
  revalidatePath("/content-admin/resources");
  revalidatePath("/resources");
}

