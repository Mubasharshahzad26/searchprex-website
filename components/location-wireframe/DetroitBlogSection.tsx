"use client";

// components/location-wireframe/DetroitBlogSection.tsx
//
// Matches user request:
// "idr wo article ae show hn gy jo is location and is k relevant ho gy jo ham blog category main add krain gy not generic"
//
// Dynamically pulls real, published articles from @/app/blog/data filtered by
// category / subcategory ("Law Firms", "Local SEO", "Google Business Profile", etc.).
// When a new article is added to the blog in those categories, it automatically surfaces here.

import React from "react";
import Link from "next/link";
import { BookOpen, ArrowRight, Clock, Calendar, ShieldCheck, User } from "lucide-react";
import type { CityPage } from "@/lib/city-pages";
import { posts as allPublishedPosts, Post } from "@/app/blog/data";

export default function DetroitBlogSection({ page }: { page: CityPage }) {
  // Dynamically filter published blog posts for Law Firms, Local SEO, and AI Overview relevance
  const relevantPosts: Post[] = allPublishedPosts
    .filter((p) => {
      const sub = (p.subcategory || "").toLowerCase();
      const cat = (p.category || "").toLowerCase();
      const title = (p.title || "").toLowerCase();
      const excerpt = (p.excerpt || "").toLowerCase();
      const city = page.city.toLowerCase();

      return (
        sub.includes("law") ||
        cat.includes("local") ||
        sub.includes("google business profile") ||
        sub.includes("generative engine") ||
        title.includes("law") ||
        title.includes("local") ||
        title.includes("map") ||
        title.includes(city) ||
        excerpt.includes("law firm") ||
        excerpt.includes("local")
      );
    })
    .slice(0, 4);

  // Fallback to top published posts if filter is less than 3
  const displayPosts =
    relevantPosts.length >= 2
      ? relevantPosts
      : allPublishedPosts.slice(0, 4);

  return (
    <section className="py-16 bg-[#f8fafc] border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#534AB7] block">
              LEGAL SEO INSIGHTS &amp; BLUEPRINTS
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#0a0f2e]">
              Law Firm SEO and AI Search Insights for Detroit Attorneys
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
              Practical guides on AI Overviews, Google Business Profile and law firm SEO in 2026.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#534AB7] hover:text-[#3C3489] transition-colors shrink-0 group"
          >
            <span>View all legal SEO articles</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Dynamic Articles Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 flex flex-col justify-between shadow-2xs hover:border-[#534AB7] hover:shadow-sm transition-all group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] mb-3">
                  <span className="font-bold uppercase tracking-wider text-[#534AB7] bg-[#EEEDFE] px-2.5 py-0.5 rounded-full">
                    {post.subcategory || post.category}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1 font-medium">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0a0f2e] group-hover:text-[#534AB7] transition-colors leading-snug line-clamp-3">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#534AB7]">
                <span className="text-slate-500 font-normal text-[11px] flex items-center gap-1">
                  <User className="h-3 w-3 text-slate-400" />
                  <span>{post.author.name}</span>
                </span>
                <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Read</span>
                  <span>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
