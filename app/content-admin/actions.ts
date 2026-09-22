"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/require-admin";

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
  revalidatePath("/content-admin/blogs");
  revalidatePath("/blog");
  return blog;
}

export async function updateMarketingBlog(id: string, data: any) {
  await requireAdmin();
  if (data.published && !data.publishedAt) {
    const existing = await db.marketingBlog.findUnique({ where: { id } });
    if (!existing?.publishedAt) data.publishedAt = new Date();
  }
  const blog = await db.marketingBlog.update({ where: { id }, data });
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

