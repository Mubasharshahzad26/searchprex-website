// app/blog/data.ts
// Single source of truth for blog listing data — imported by BOTH page.tsx
// (for schema) and BlogClient.tsx (for UI). Lives here (server-safe), never
// inside a "use client" file.

import { posts as publishedPosts } from "./[slug]/posts";
 
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
  heroImage?: string;
}
 
const ALL_POSTS: Post[] = [
  { slug: "local-search-confidence-loop-psychology", category: "Local SEO", subcategory: "Consumer Behavior", title: "The Local Search Confidence Loop: What Makes Someone Contact a Law Firm?", excerpt: "A research-led look at local search decisions through four observable stages—need, verification, comparison and contact—with evidence from U.S. consumer studies and a Cleveland Search Console snapshot. Freud is treated as a lens, not a ranking formula.", readTime: "10-minute read", date: "2026-10-27", author: { name: "Mubashar Sharif", role: "Founder & SEO Analyst" }, authorBio: "Mubashar Sharif is the founder of SearchPrex and an SEO analyst focused on local and technical SEO. His research notes combine real search data, published research and clearly stated limits.", featured: true },
  { slug: "mubashar-sharif-ecommerce-indexing-recovery", category: "E-commerce SEO", subcategory: "WooCommerce Indexing", title: "How I Rebuilt Ecommerce Indexing: A 90-Day Guide for WooCommerce Stores", excerpt: "A practical guide for U.S. WooCommerce owners facing mass product-page indexation issues: documented Search Console evidence, a recovery workflow, and a free indexing triage.", readTime: "12-minute read", date: "2026-10-27", author: { name: "Mubashar Sharif", role: "Founder & SEO Analyst" }, authorBio: "Mubashar Sharif is the founder of SearchPrex and an SEO analyst focused on technical and ecommerce search. He documents field work with Search Console evidence and clear measurement limits.", featured: true },
  { slug: "fix-faceted-navigation-ecommerce-seo", category: "Technical SEO", subcategory: "Crawl Architecture & Indexing", title: "How to Fix Faceted Navigation Crawl Traps on Shopify & WooCommerce (10,000+ Filter URLs)", excerpt: "Faceted navigation is the #1 cause of crawl budget exhaustion and 'Crawled - currently not indexed' bloat on Shopify and WooCommerce stores. Here is the engineering blueprint to control filter parameters without losing long-tail category traffic.", readTime: "15-minute read", date: "2026-10-12", author: { name: "Mubashar Sharif", role: "Verified SEO Expert" }, authorBio: "Mubashar is the founder and lead SEO strategist at SearchPrex with 5+ years specializing in technical e-commerce architecture, crawl budget recovery, and large-catalog indexing.", featured: true },
  { slug: "topical-authority-content-clusters", category: "Content Strategy", subcategory: "Topical Authority", title: "How to Build Topical Authority with Content Clusters (Step-by-Step)", excerpt: "Google rewards sites that demonstrate exhaustive, structured expertise over isolated keyword targeting. Here is the step-by-step engineering blueprint to map, build, and interlink content clusters that dominate search in 2026.", readTime: "16-minute read", date: "2026-10-09", author: { name: "Mubashar Sharif", role: "Verified SEO Expert" }, authorBio: "Mubashar is the founder and lead SEO strategist at SearchPrex with 5+ years specializing in technical search architecture, semantic content clustering, and algorithmic authority building.", featured: true },
  { slug: "track-signed-cases-from-seo", category: "Content Strategy", subcategory: "Law Firms", title: "How to Track Signed Cases from SEO: A Setup Guide for Law Firms", excerpt: "Seven steps to see which signed cases came from SEO, your Business Profile and ads — UTM tags, call tracking that keeps your profile safe, GA4 key events, intake source fields and a monthly report.", readTime: "9-minute read", date: "2026-10-15", author: { name: "Mubashar Sharif", role: "Founder, SearchPrex" }, authorBio: "Mubashar Sharif is the founder of SearchPrex. Semrush and HubSpot certified, he works on technical SEO, Google Business Profile and local search for US businesses.", featured: true },
  { slug: "lawyer-specialist-certification-rules-by-state", category: "Content Strategy", subcategory: "Law Firms", title: "Can Lawyers Call Themselves Specialists? Certification Rules by State", excerpt: "When a lawyer may say \"specialist\" or \"certified\" in nine states, who does the certifying, and what that means for your website, title tags and Google Business Profile — every row sourced.", readTime: "7-minute read", date: "2026-10-15", author: { name: "Mubashar Sharif", role: "Founder, SearchPrex" }, authorBio: "Mubashar Sharif is the founder of SearchPrex. Semrush and HubSpot certified, he works on technical SEO, Google Business Profile and local search for US businesses.", featured: true },
  { slug: "law-firm-seo-cost", category: "Content Strategy", subcategory: "Law Firms", title: "How Much Does Law Firm SEO Cost?", excerpt: "How law firm SEO is priced, what moves the price, what a $1,200 to $2,500 monthly plan includes, and how to tell whether it pays for itself in signed cases.", readTime: "8-minute read", date: "2026-10-14", author: { name: "Mubashar Sharif", role: "Founder, SearchPrex" }, authorBio: "Mubashar Sharif is the founder of SearchPrex. Semrush and HubSpot certified, he works on technical SEO, Google Business Profile and local search for US businesses.", featured: true },
  { slug: "choose-law-firm-seo-agency", category: "Content Strategy", subcategory: "Law Firms", title: "How to Choose a Law Firm SEO Agency: 12 Questions to Ask", excerpt: "Twelve questions to ask a law firm SEO agency, what a good answer sounds like, the red flags that should end the conversation, and how we answer them ourselves.", readTime: "8-minute read", date: "2026-10-14", author: { name: "Mubashar Sharif", role: "Founder, SearchPrex" }, authorBio: "Mubashar Sharif is the founder of SearchPrex. Semrush and HubSpot certified, he works on technical SEO, Google Business Profile and local search for US businesses.", featured: false },
  { slug: "law-firm-seo-vs-ppc", category: "Content Strategy", subcategory: "Law Firms", title: "Law Firm SEO vs PPC: Cost Per Signed Case", excerpt: "How to work out cost per signed case for Google Ads and for SEO with your own numbers, when each one makes sense, and why most firms should run both at first.", readTime: "8-minute read", date: "2026-10-14", author: { name: "Mubashar Sharif", role: "Founder, SearchPrex" }, authorBio: "Mubashar Sharif is the founder of SearchPrex. Semrush and HubSpot certified, he works on technical SEO, Google Business Profile and local search for US businesses.", featured: true },
  { slug: "slow-intake-cost", category: "Content Strategy", subcategory: "Law Firms", title: "How Much Is a Slow Intake Costing Your Law Firm?", excerpt: "Work out what slow responses and after-hours gaps cost your firm in signed cases — a simple formula, worked scenarios, and the fixes that close the leak.", readTime: "7-minute read", date: "2026-10-14", author: { name: "Mubashar Sharif", role: "Founder, SearchPrex" }, authorBio: "Mubashar Sharif is the founder of SearchPrex. Semrush and HubSpot certified, he works on technical SEO, Google Business Profile and local search for US businesses.", featured: false },
  { slug: "how-long-does-law-firm-seo-take", category: "Content Strategy", subcategory: "Law Firms", title: "How Long Does Law Firm SEO Take to Work?", excerpt: "Most law firms see the first measurable movement within 60 to 90 days; competitive terms take longer. A month-by-month timeline, what speeds it up, what slows it down, and what to measure.", readTime: "8-minute read", date: "2026-10-14", author: { name: "Mubashar Sharif", role: "Founder, SearchPrex" }, authorBio: "Mubashar Sharif is the founder of SearchPrex. Semrush and HubSpot certified, he works on technical SEO, Google Business Profile and local search for US businesses.", featured: true },
  { slug: "law-firm-seo-2026-guide", category: "Content Strategy", subcategory: "Law Firms", title: "Law Firm SEO: The Complete Guide for 2026", excerpt: "What law firm SEO covers, why legal search is held to a higher standard, how long it takes, what it costs and how to measure it in calls and signed cases — for solo and small firms.", readTime: "11-minute read", date: "2026-10-08", author: { name: "Mubashar Sharif", role: "Founder, SearchPrex" }, authorBio: "Mubashar Sharif is the founder of SearchPrex. Semrush and HubSpot certified, he works on technical SEO, Google Business Profile and local search for US businesses.", featured: true },
  { slug: "core-web-vitals-ecommerce", category: "Technical SEO", subcategory: "Core Web Vitals", title: "Core Web Vitals for E-commerce: Fix LCP, INP & CLS in 2026", excerpt: "Slow interaction response, bloated tracking scripts, and shifting product media cost e-commerce stores search visibility and conversions. Here is the step-by-step engineering blueprint to pass Core Web Vitals on Shopify and WooCommerce in 2026.", readTime: "18-minute read", date: "2026-10-08", author: { name: "Mubashar Sharif", role: "Verified SEO Expert" }, authorBio: "Mubashar is an SEO analyst with 5+ years specializing in technical e-commerce performance architecture.", featured: true },
  { slug: "google-ai-overviews-seo", category: "Content Strategy", subcategory: "Generative Engine Optimization", title: "How to Appear in Google AI Overviews: GEO Strategy for 2026", excerpt: "Google AI Overviews now answer multi-intent queries before users see blue links. Here is how Google's Gemini models select citations, extract facts, and how to optimize your content for generative engines in 2026.", readTime: "12-minute read", date: "2026-10-08", author: { name: "Mubashar Sharif", role: "Verified SEO Expert" }, authorBio: "Mubashar is an SEO analyst with 5+ years specializing in technical and generative search optimization.", featured: true },
  { slug: "schema-markup-ecommerce", category: "On-Page SEO", subcategory: "Schema Markup", title: "Product Schema Markup: The Complete JSON-LD Guide for E-commerce", excerpt: "Missing shipping details, return policies, or variant prices strip rich results from Google Search. Here is the complete JSON-LD implementation guide to secure merchant listings in 2026.", readTime: "12-minute read", date: "2026-10-06", author: { name: "Mubashar Sharif", role: "Verified SEO Expert" }, authorBio: "Mubashar is an SEO analyst with 5+ years specializing in technical and e-commerce SEO architecture.", featured: true },
  { slug: "ecommerce-organic-traffic-drop", category: "E-commerce SEO", subcategory: "Traffic Recovery", title: "Online Store Traffic Dropped? 7 Checks to Find Out Why", excerpt: "A sudden drop in Google traffic feels like a penalty, but most drops have an ordinary cause you can find in Search Console. Here are the checks to run, in the order that finds the answer fastest.", readTime: "11-minute read", date: "2026-10-03", author: { name: "Mubashar Sharif", role: "Verified SEO Expert" }, authorBio: "Mubashar is an SEO analyst with 5+ years of hands-on SEO, Semrush and HubSpot certified.", featured: false },
  { slug: "get-more-calls-from-google-business-profile", category: "Local SEO", subcategory: "Google Business Profile", title: "How to Get More Calls From Your Google Business Profile", excerpt: "For most local businesses the profile, not the website, is where the phone rings from. Here is how to measure calls properly and the changes that make more people tap the call button.", readTime: "10-minute read", date: "2026-10-02", author: { name: "Mubashar Sharif", role: "Verified SEO Expert" }, authorBio: "Mubashar is an SEO analyst with 5+ years of hands-on SEO, Semrush and HubSpot certified.", featured: false },
  { slug: "google-business-profile-suspended", category: "Local SEO", subcategory: "Google Business Profile", title: "Google Business Profile Suspended? How to Get It Reinstated", excerpt: "A suspended profile disappears from Search and Maps and locks you out of editing it. Here is how to find out why, what to fix before you appeal, the evidence Google asks for, and the mistakes that make it worse.", readTime: "10-minute read", date: "2026-10-02", author: { name: "Mubashar Sharif", role: "Verified SEO Expert" }, authorBio: "Mubashar is an SEO analyst with 5+ years of hands-on SEO, Semrush and HubSpot certified.", featured: false },
  { slug: "shopify-products-not-showing-on-google", category: "E-commerce SEO", subcategory: "Shopify", title: "Shopify Products Not Showing on Google? How to Find and Fix It", excerpt: "When a Shopify product won't show on Google, the cause is usually a setting, a status or a duplicate URL rather than a penalty. Here are the eight checks to run, in order.", readTime: "11-minute read", date: "2026-10-02", author: { name: "Mubashar Sharif", role: "Verified SEO Expert" }, authorBio: "Mubashar is an SEO analyst with 5+ years of hands-on SEO, Semrush and HubSpot certified.", featured: false },
  { slug: "google-maps-ranking-drop", category: "Local SEO", subcategory: "Google Business Profile", title: "Why Did My Google Maps Ranking Drop? How to Check and Fix It", excerpt: "Most Maps ranking drops trace back to the profile, not an algorithm. Here is the order to check things in, where to look, and what not to do while you fix it.", readTime: "11-minute read", date: "2026-10-02", author: { name: "Mubashar Sharif", role: "Verified SEO Expert" }, authorBio: "Mubashar is an SEO analyst with 5+ years of hands-on SEO, Semrush and HubSpot certified.", featured: false },
  { slug: "shopify-woocommerce-indexing-blueprint", category: "E-commerce SEO", subcategory: "Indexing", title: "Shopify & WooCommerce Indexing Blueprint: 8 Platform-Specific Fixes for 2026", excerpt: "Resolve Google indexing failures on Shopify & WooCommerce. Fix Liquid canonical traps, XML sitemap timeouts, category pagination loops, and slow server TTFB.", readTime: "14-minute read", date: "2026-10-02", author: { name: "Mubashar Sharif", role: "Verified SEO Expert" }, authorBio: "Mubashar is an SEO analyst with 5+ years specializing in large-scale e-commerce SEO.", featured: true },
  { slug: "fix-discovered-currently-not-indexed-ecommerce", category: "E-commerce SEO", subcategory: "Indexing", title: "How to Fix 'Discovered – Currently Not Indexed' on E-commerce Stores: 5 Proven Steps", excerpt: "Fix 'Discovered – currently not indexed' on Shopify & WooCommerce. Learn the 4 crawl budget bottlenecks and our 5-step framework to get SKUs indexed fast.", readTime: "12-minute read", date: "2026-09-30", author: { name: "Mubashar Sharif", role: "Verified SEO Expert" }, authorBio: "Mubashar is an SEO analyst with 5+ years specializing in large-scale e-commerce SEO.", featured: false },
  { slug: "fix-crawled-currently-not-indexed-ecommerce", category: "E-commerce SEO", subcategory: "Indexing", title: "How to Fix 'Crawled – Currently Not Indexed' on Product Pages: Ecommerce Recovery Guide", excerpt: "Struggling with product pages deindexed in Search Console? Learn the 5 technical culprits behind mass ecommerce deindexing and our step-by-step recovery framework.", readTime: "12-minute read", date: "2026-09-29", author: { name: "Mubashar Sharif", role: "Verified SEO Expert" }, authorBio: "Mubashar is an SEO analyst with 5+ years specializing in large-scale e-commerce SEO.", featured: true },
  { slug: "keyword-research-for-law-firms", category: "Content Strategy", subcategory: "Law Firms", title: "Keyword Research for Lawyers and Law Firms", excerpt: "Start with the matters you take and the places you serve. A step-by-step method using free data, and the words bar rules keep off your pages.", readTime: "10-minute read", date: "2026-09-28", author: { name: "Mubashar Sharif", role: "Verified SEO Expert" }, authorBio: "Mubashar is an SEO analyst with 5+ years of hands-on SEO, Semrush and HubSpot certified.", featured: false },
  { slug: "crawl-budget-optimization-guide", category: "Technical SEO", subcategory: "Crawl Optimization", title: "Crawl Budget Optimization: The 2026 Guide", excerpt: "If Google isn't crawling your most important pages, they won't rank. Here's exactly how to audit and fix crawl budget issues at scale.", readTime: "12-minute read", date: "2026-06-18", author: { name: "Mubashar Sharif", role: "Verified SEO Expert" }, authorBio: "Mubashar is an SEO analyst with 5+ years specializing in large-scale e-commerce SEO. He has managed 40,000+ page sites and solved mass non-indexing issues for multiple brands.", featured: true },
  { slug: "google-indexing-api-python", category: "Technical SEO", subcategory: "Indexing", title: "The Google Indexing API Is Not a Shortcut", excerpt: "The Google Indexing API only supports job postings and livestreams. Here is what actually gets thousands of product pages indexed instead.", readTime: "9-minute read", date: "2026-08-27", author: { name: "Mubashar Sharif", role: "Verified SEO Expert" }, authorBio: "Mubashar is an SEO analyst with 5+ years specializing in large-scale e-commerce SEO.", featured: false },
  { slug: "ecommerce-product-page-seo", category: "E-commerce SEO", subcategory: "Product Pages", title: "Product Page SEO at Scale: 10,000+ SKUs", excerpt: "Near-identical boilerplate is the most common reason large catalogues fail to index. Here is the brand-by-brand rewriting method we used on one 35,000-product store.", readTime: "11-minute read", date: "2026-08-27", author: { name: "Mubashar Sharif", role: "Verified SEO Expert" }, authorBio: "Mubashar is an SEO analyst with 5+ years specializing in large-scale e-commerce SEO.", featured: false },
  { slug: "local-seo-law-firms", category: "Local SEO", subcategory: "Law Firms", title: "Local SEO for Law Firms: How to Rank in the Map Pack in 2026", excerpt: "Law firm SEO is hyper-competitive. This guide covers GBP optimization, local citations, review strategy, and the content that actually moves the needle.", readTime: "14-minute read", date: "2026-04-30", author: { name: "Mubashar Sharif", role: "Verified SEO Expert" }, authorBio: "Mubashar is an SEO analyst with 5+ years specializing in large-scale e-commerce SEO.", featured: false },
];

const ALL_MOST_READ = [
  { slug: "topical-authority-content-clusters", category: "Content Strategy", subcategory: "Topical Authority", title: "How to Build Topical Authority with Content Clusters (Step-by-Step)", readTime: "16-minute read", date: "2026-10-09", rank: 1 },
  { slug: "law-firm-seo-2026-guide", category: "Content Strategy", subcategory: "Law Firms", title: "Law Firm SEO: The Complete Guide for 2026", readTime: "11-minute read", date: "2026-10-08", rank: 2 },
  { slug: "core-web-vitals-ecommerce", category: "Technical SEO", subcategory: "Core Web Vitals", title: "Core Web Vitals for E-commerce: Fix LCP, INP & CLS in 2026", readTime: "18-minute read", date: "2026-10-08", rank: 3 },
];
 
/**
 * Only posts that actually have a detail page are listed.
 *
 * app/blog/[slug]/posts.ts is the source of truth for what is publishable — it
 * holds the article bodies. This file carries listing metadata for more posts
 * than have been written, so /blog was rendering nine cards of which six led
 * nowhere. Before the [slug] route was made to call notFound(), those six
 * silently served the FIRST article instead, which was worse: six URLs of
 * duplicate content. "Most-read Articles" was the sharpest case — all three of
 * its links were dead.
 *
 * Filtering here means adding an article to posts.ts is the single action that
 * makes it appear on the blog. No second list to remember.
 */

const PUBLISHABLE = new Set(publishedPosts.map((p) => p.slug));
const heroImageBySlug = new Map(publishedPosts.map((p) => [p.slug, p.heroImage]));

const CATEGORY_COVERS: Record<string, string> = {
  "Technical SEO": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  "On-Page SEO": "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=900&q=80",
  "Local SEO": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
  "E-commerce SEO": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
  "Link Building": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
  "Content Strategy": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80",
};

export const posts: Post[] = ALL_POSTS
  .filter((p) => PUBLISHABLE.has(p.slug))
  .map((p) => ({
    ...p,
    heroImage:
      heroImageBySlug.get(p.slug) ||
      CATEGORY_COVERS[p.category] ||
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=900&q=80",
  }));

export const mostRead = ALL_MOST_READ
  .filter((p) => PUBLISHABLE.has(p.slug))
  .map((p) => ({
    ...p,
    heroImage:
      heroImageBySlug.get(p.slug) ||
      CATEGORY_COVERS[p.category] ||
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=900&q=80",
  }));

