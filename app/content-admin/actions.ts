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
export async function getMarketingBlogs() {
  await requireAdmin();
  return await db.marketingBlog.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createMarketingBlog(data: any) {
  await requireAdmin();
  if (data.published && !data.publishedAt) data.publishedAt = new Date();
  const blog = await db.marketingBlog.create({ data });
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
  return blog;
}

export async function updateMarketingBlog(id: string, data: any) {
  await requireAdmin();
  const existing = await db.marketingBlog.findUnique({ where: { id } });
  const newlyPublished = Boolean(data.published && !existing?.published);
  if (data.published && !data.publishedAt && !existing?.publishedAt) {
    data.publishedAt = new Date();
  }
  const blog = await db.marketingBlog.update({ where: { id }, data });
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
    if (existing && existing.slug !== blog.slug) urls.push(marketingPostUrl(existing));
    await submitToIndexNow(urls);
  }
  revalidatePath("/content-admin/blogs");
  revalidatePath("/blog");
  revalidatePath(`/blog/${blog.slug}`);
  return blog;
}

export async function deleteMarketingBlog(id: string) {
  await requireAdmin();
  await db.marketingBlog.delete({ where: { id } });
  revalidatePath("/content-admin/blogs");
  revalidatePath("/blog");
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
    where: { category: { contains: "SEO News", mode: "insensitive" } },
    orderBy: { updatedAt: "desc" },
  });
}

function normalizeNewsArticleData(data: any) {
  const slug = String(data.slug || "").trim();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error("Enter a valid URL slug using lowercase letters, numbers, and hyphens.");
  }
  if (staticNewsSpokes.some((spoke) => spoke.slug === slug)) {
    throw new Error("This URL slug is already used by a live SEO News page. Choose a different slug.");
  }
  const requestedCategory = String(data.category || "").trim();
  const category = requestedCategory.toLowerCase().includes("seo news")
    ? requestedCategory
    : `SEO News${requestedCategory ? ` — ${requestedCategory}` : ""}`;
  return { ...data, slug, category, schemaType: "NewsArticle" };
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
export async function getMarketingNews() {
  await requireAdmin();
  return await db.marketingNews.findMany({ orderBy: { newsDate: "desc" } });
}

export async function createMarketingNews(data: any) {
  await requireAdmin();
  const news = await db.marketingNews.create({ data });
  revalidatePath("/content-admin/news");
  revalidatePath("/resources/news");
  return news;
}

export async function updateMarketingNews(id: string, data: any) {
  await requireAdmin();
  const news = await db.marketingNews.update({ where: { id }, data });
  revalidatePath("/content-admin/news");
  revalidatePath("/resources/news");
  return news;
}

export async function deleteMarketingNews(id: string) {
  await requireAdmin();
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

