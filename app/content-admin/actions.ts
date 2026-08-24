"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// --- MARKETING PAGES ---
export async function getMarketingPages() {
  return await db.marketingPage.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createMarketingPage(data: any) {
  const page = await db.marketingPage.create({ data });
  revalidatePath("/content-admin/pages");
  return page;
}

export async function updateMarketingPage(id: string, data: any) {
  const page = await db.marketingPage.update({ where: { id }, data });
  revalidatePath("/content-admin/pages");
  return page;
}

export async function deleteMarketingPage(id: string) {
  await db.marketingPage.delete({ where: { id } });
  revalidatePath("/content-admin/pages");
}

// --- MARKETING BLOGS ---
export async function getMarketingBlogs() {
  return await db.marketingBlog.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createMarketingBlog(data: any) {
  if (data.published && !data.publishedAt) data.publishedAt = new Date();
  const blog = await db.marketingBlog.create({ data });
  revalidatePath("/content-admin/blogs");
  revalidatePath("/blog");
  return blog;
}

export async function updateMarketingBlog(id: string, data: any) {
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
  await db.marketingBlog.delete({ where: { id } });
  revalidatePath("/content-admin/blogs");
  revalidatePath("/blog");
}

// --- MARKETING CASE STUDIES ---
export async function getMarketingCaseStudies() {
  return await db.marketingCaseStudy.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createMarketingCaseStudy(data: any) {
  const { content, ...validData } = data;
  const caseStudy = await db.marketingCaseStudy.create({ data: validData });
  revalidatePath("/content-admin/case-studies");
  revalidatePath("/all-case-studies");
  return caseStudy;
}

export async function updateMarketingCaseStudy(id: string, data: any) {
  const { content, ...validData } = data;
  const caseStudy = await db.marketingCaseStudy.update({ where: { id }, data: validData });
  revalidatePath("/content-admin/case-studies");
  revalidatePath("/all-case-studies");
  return caseStudy;
}

export async function deleteMarketingCaseStudy(id: string) {
  await db.marketingCaseStudy.delete({ where: { id } });
  revalidatePath("/content-admin/case-studies");
}

// --- MARKETING NEWS ---
export async function getMarketingNews() {
  return await db.marketingNews.findMany({ orderBy: { newsDate: "desc" } });
}

export async function createMarketingNews(data: any) {
  const news = await db.marketingNews.create({ data });
  revalidatePath("/content-admin/news");
  revalidatePath("/resources/news");
  return news;
}

export async function updateMarketingNews(id: string, data: any) {
  const news = await db.marketingNews.update({ where: { id }, data });
  revalidatePath("/content-admin/news");
  revalidatePath("/resources/news");
  return news;
}

export async function deleteMarketingNews(id: string) {
  await db.marketingNews.delete({ where: { id } });
  revalidatePath("/content-admin/news");
  revalidatePath("/resources/news");
}

// --- MARKETING RESOURCES ---
export async function getMarketingResources() {
  return await db.marketingResource.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createMarketingResource(data: any) {
  const resource = await db.marketingResource.create({ data });
  revalidatePath("/content-admin/resources");
  revalidatePath("/resources");
  return resource;
}

export async function updateMarketingResource(id: string, data: any) {
  const resource = await db.marketingResource.update({ where: { id }, data });
  revalidatePath("/content-admin/resources");
  revalidatePath("/resources");
  return resource;
}

export async function deleteMarketingResource(id: string) {
  await db.marketingResource.delete({ where: { id } });
  revalidatePath("/content-admin/resources");
  revalidatePath("/resources");
}

