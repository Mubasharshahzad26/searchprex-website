// components/ServiceBlogTeaser.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, ExternalLink } from "lucide-react";
import { posts as allPublishedPosts, type Post } from "@/app/blog/data";

export type ServiceBlogTopic = "ecommerce" | "local" | "law-firm" | "technical";

const TOPIC_CONFIG: Record<
  ServiceBlogTopic,
  {
    eyebrow: string;
    defaultTitle: string;
    defaultSubtitle: string;
    slugs: string[];
    filterFn: (p: Post) => boolean;
  }
> = {
  ecommerce: {
    eyebrow: "E-COMMERCE SEO GUIDES & PLAYBOOKS",
    defaultTitle: "Related E-Commerce SEO Guides",
    defaultSubtitle:
      "Deep-dive engineering blueprints on Shopify & WooCommerce indexing, product schema, and catalog scale.",
    slugs: [
      "ecommerce-product-page-seo",
      "shopify-woocommerce-indexing-blueprint",
      "fix-crawled-currently-not-indexed-ecommerce",
      "fix-discovered-currently-not-indexed-ecommerce",
      "shopify-products-not-showing-on-google",
      "ecommerce-organic-traffic-drop",
      "schema-markup-ecommerce",
    ],
    filterFn: (p) =>
      p.category === "E-commerce SEO" ||
      p.slug.includes("ecommerce") ||
      p.slug.includes("shopify"),
  },
  local: {
    eyebrow: "LOCAL SEO & GOOGLE BUSINESS PROFILE GUIDES",
    defaultTitle: "Related Local SEO & Map Pack Guides",
    defaultSubtitle:
      "Step-by-step playbooks on Google Business Profile calls, Map Pack ranking recovery, and reinstatement.",
    slugs: [
      "get-more-calls-from-google-business-profile",
      "google-business-profile-suspended",
      "google-maps-ranking-drop",
      "google-ai-overviews-seo",
    ],
    filterFn: (p) =>
      p.category === "Local SEO" ||
      p.subcategory === "Google Business Profile" ||
      p.slug.includes("google-business-profile") ||
      p.slug.includes("google-maps"),
  },
  "law-firm": {
    eyebrow: "LAW FIRM SEO & LEGAL SEARCH BLUEPRINTS",
    defaultTitle: "Related Law Firm SEO Guides",
    defaultSubtitle:
      "Practical blueprints on legal practice-area keyword research, YMYL authority, Map Pack calls, and AI Overviews.",
    slugs: [
      "law-firm-seo-2026-guide",
      "keyword-research-for-law-firms",
      "get-more-calls-from-google-business-profile",
      "google-maps-ranking-drop",
    ],
    filterFn: (p) =>
      p.subcategory === "Law Firms" ||
      p.slug.includes("law-firm") ||
      p.category === "Local SEO",
  },
  technical: {
    eyebrow: "TECHNICAL SEO & INDEXING ARCHITECTURE",
    defaultTitle: "Related Technical SEO Guides",
    defaultSubtitle:
      "Field-tested engineering guides on crawl budget optimization, faceted navigation, Core Web Vitals, and indexing recovery.",
    slugs: [
      "fix-faceted-navigation-ecommerce-seo",
      "crawl-budget-optimization-guide",
      "core-web-vitals-ecommerce",
      "google-indexing-api-python",
    ],
    filterFn: (p) =>
      p.category === "Technical SEO" ||
      p.slug.includes("crawl") ||
      p.slug.includes("indexing") ||
      p.slug.includes("core-web-vitals"),
  },
};

const AVATAR = "/images/mubashar-sharif.jpg";

export default function ServiceBlogTeaser({
  topic,
  title,
  subtitle,
  maxItems = 4,
}: {
  topic: ServiceBlogTopic;
  title?: string;
  subtitle?: string;
  maxItems?: number;
}) {
  const cfg = TOPIC_CONFIG[topic];
  const bySlug = new Map(allPublishedPosts.map((p) => [p.slug, p]));

  // Pick curated priority slugs first, then any additional matching posts in that category
  const curated: Post[] = [];
  for (const s of cfg.slugs) {
    const found = bySlug.get(s);
    if (found) curated.push(found);
  }
  for (const p of allPublishedPosts) {
    if (!curated.some((c) => c.slug === p.slug) && cfg.filterFn(p)) {
      curated.push(p);
    }
  }

  const displayPosts = curated.slice(0, maxItems);
  if (displayPosts.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-t border-b border-slate-200 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-900 block mb-2">
              {cfg.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-neutral-950">
              {title || cfg.defaultTitle}
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
              {subtitle || cfg.defaultSubtitle}
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-neutral-950 hover:bg-slate-100 transition-colors shrink-0"
          >
            <span>Explore All SEO Guides</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-neutral-900 hover:shadow-md"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <Image
                  src={
                    post.heroImage ||
                    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80"
                  }
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute top-3 left-3 rounded-full bg-white/95 backdrop-blur-xs px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-950 shadow-2xs">
                  {post.subcategory || post.category}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 mb-2">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-base font-bold text-neutral-950 leading-snug group-hover:text-neutral-700 transition-colors line-clamp-2 mb-2.5">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-3.5 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative block h-6 w-6 overflow-hidden rounded-full bg-slate-200">
                      <Image
                        src={AVATAR}
                        alt={post.author.name}
                        width={24}
                        height={24}
                        className="h-6 w-6 object-cover object-top"
                      />
                    </span>
                    <span className="text-xs font-semibold text-neutral-900">
                      {post.author.name}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-neutral-950 group-hover:translate-x-0.5 transition-transform">
                    Read →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* E-E-A-T Independent Entity & Trust Verification Bar */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-900 block">
              E-E-A-T Independent Entity Verification
            </span>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Verify SearchPrex and Founder Mubashar Sharif across independent directories:
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="https://clutch.co/profile/searchprex"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-neutral-950 hover:border-neutral-900 transition-colors"
            >
              <span className="flex h-4 w-4 items-center justify-center rounded bg-neutral-900 text-[9px] font-black text-white">
                C
              </span>
              <span>Clutch · Company Profile</span>
              <ExternalLink className="h-3 w-3 text-slate-400" />
            </a>
            <a
              href="https://www.trustpilot.com/review/searchprex.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-neutral-950 hover:border-neutral-900 transition-colors"
            >
              <span className="flex h-4 w-4 items-center justify-center rounded bg-neutral-900 text-[9px] font-black text-white">
                T
              </span>
              <span>Trustpilot · 1 Verified Review</span>
              <ExternalLink className="h-3 w-3 text-slate-400" />
            </a>
            <a
              href="https://www.linkedin.com/company/searchprex/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-neutral-950 hover:border-neutral-900 transition-colors"
            >
              <span className="flex h-4 w-4 items-center justify-center rounded bg-neutral-900 text-[9px] font-black text-white">
                in
              </span>
              <span>LinkedIn · Company Page</span>
              <ExternalLink className="h-3 w-3 text-slate-400" />
            </a>
            <a
              href="https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-neutral-950 hover:border-neutral-900 transition-colors"
            >
              <span className="flex h-4 w-4 items-center justify-center rounded bg-neutral-900 text-[9px] font-black text-white">
                in
              </span>
              <span>Founder LinkedIn</span>
              <ExternalLink className="h-3 w-3 text-slate-400" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
