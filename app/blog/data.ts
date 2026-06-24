// app/blog/data.ts
// Single source of truth for blog listing data — imported by BOTH page.tsx
// (for schema) and BlogClient.tsx (for UI). Lives here (server-safe), never
// inside a "use client" file.
 
export const categories = [
  { label: "Technical SEO", slug: "technical-seo", desc: "Crawl budget, Core Web Vitals, indexation fixes, site architecture, and everything under the hood." },
  { label: "On-Page SEO", slug: "on-page-seo", desc: "Title tags, meta descriptions, schema markup, E-E-A-T signals, and content optimization at scale." },
  { label: "Local SEO", slug: "local-seo", desc: "Google Business Profile, local citations, NAP consistency, and map pack domination strategies." },
  { label: "E-commerce SEO", slug: "ecommerce-seo", desc: "Product page optimization, faceted navigation, category SEO, and duplicate content fixes." },
  { label: "Link Building", slug: "link-building", desc: "Digital PR, guest posts, broken link building, and white-hat authority building tactics." },
  { label: "Content Strategy", slug: "content-strategy", desc: "Topical authority maps, content clusters, search intent mapping, and AI-ready content formats." },
];
 
export interface Post {
  slug: string;
  category: string;
  subcategory: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string; // ISO (YYYY-MM-DD) — used for display + Article schema datePublished
  author: { name: string; role: string };
  authorBio: string;
  featured: boolean;
}
 
export const posts: Post[] = [
  { slug: "crawl-budget-optimization-guide", category: "Technical SEO", subcategory: "Crawl Optimization", title: "Crawl Budget Optimization: The Complete 2026 Guide for Large E-commerce Sites", excerpt: "If Google isn't crawling your most important pages, they won't rank. Here's exactly how to audit and fix crawl budget issues at scale.", readTime: "12-minute read", date: "2026-06-18", author: { name: "Mubashar Shahzad", role: "Verified SEO Expert" }, authorBio: "Mubashar is an SEO analyst with 5+ years specializing in large-scale e-commerce SEO. He has managed 40,000+ page sites and solved mass non-indexing issues for multiple brands.", featured: true },
  { slug: "google-indexing-api-python", category: "Technical SEO", subcategory: "Indexing", title: "Google Indexing API: How to Submit 1,000 URLs/Day with Python", excerpt: "The standard GSC submission is slow. This step-by-step guide shows you how to build a 5-account rotator system for mass URL submission.", readTime: "18-minute read", date: "2026-06-09", author: { name: "Mubashar Shahzad", role: "Verified SEO Expert" }, authorBio: "Mubashar is an SEO analyst with 5+ years specializing in large-scale e-commerce SEO.", featured: false },
  { slug: "ecommerce-product-page-seo", category: "E-commerce SEO", subcategory: "Product Pages", title: "Product Page SEO at Scale: How to Write Unique Content for 10,000+ SKUs", excerpt: "Duplicate boilerplate content is the #1 reason e-commerce product pages fail to index. Here's the brand-by-brand rewriting strategy that works.", readTime: "15-minute read", date: "2026-05-28", author: { name: "Mubashar Shahzad", role: "Verified SEO Expert" }, authorBio: "Mubashar is an SEO analyst with 5+ years specializing in large-scale e-commerce SEO.", featured: false },
  { slug: "core-web-vitals-ecommerce", category: "Technical SEO", subcategory: "Core Web Vitals", title: "Core Web Vitals for E-commerce: Fix LCP, INP & CLS in 2026", excerpt: "Google's page experience signals directly impact rankings. Learn how to diagnose and fix all three Core Web Vitals on Shopify, WooCommerce, and custom platforms.", readTime: "20-minute read", date: "2026-05-14", author: { name: "Mubashar Shahzad", role: "Verified SEO Expert" }, authorBio: "Mubashar is an SEO analyst with 5+ years specializing in large-scale e-commerce SEO.", featured: false },
  { slug: "local-seo-law-firms", category: "Local SEO", subcategory: "Law Firms", title: "Local SEO for Law Firms: How to Rank in the Map Pack in 2026", excerpt: "Law firm SEO is hyper-competitive. This guide covers GBP optimization, local citations, review strategy, and the content that actually moves the needle.", readTime: "14-minute read", date: "2026-04-30", author: { name: "Mubashar Shahzad", role: "Verified SEO Expert" }, authorBio: "Mubashar is an SEO analyst with 5+ years specializing in large-scale e-commerce SEO.", featured: false },
  { slug: "topical-authority-content-clusters", category: "Content Strategy", subcategory: "Topical Authority", title: "How to Build Topical Authority with Content Clusters (Step-by-Step)", excerpt: "Google rewards sites that prove deep expertise on a subject. Here's how to map, build, and interlink content clusters that establish true topical authority.", readTime: "16-minute read", date: "2026-04-16", author: { name: "Mubashar Shahzad", role: "Verified SEO Expert" }, authorBio: "Mubashar is an SEO analyst with 5+ years specializing in large-scale e-commerce SEO.", featured: false },
];
 
export const mostRead = [
  { slug: "non-indexing-fix-ecommerce", category: "Technical SEO", subcategory: "Indexing", title: "Why 80% of Your E-commerce Pages Aren't Indexed (And How to Fix It)", readTime: "10-minute read", date: "2026-06-12", rank: 1 },
  { slug: "schema-markup-ecommerce", category: "On-Page SEO", subcategory: "Schema", title: "Product Schema Markup: The Complete JSON-LD Guide for E-commerce", readTime: "8-minute read", date: "2026-05-21", rank: 2 },
  { slug: "google-ai-overviews-seo", category: "Content Strategy", subcategory: "AIO", title: "How to Appear in Google AI Overviews: GEO Strategy for 2026", readTime: "11-minute read", date: "2026-06-02", rank: 3 },
];
 