"use client";

// app/blog/[slug]/PostClient.tsx
// Presentation only. The post is resolved server-side in page.tsx, which also
// owns metadata and JSON-LD.

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar, Clock, ChevronRight, ArrowRight,
  CheckCircle, Share2, Copy, Linkedin, TrendingUp,
} from "lucide-react";
import { useState } from "react";
import parse, { Element } from 'html-react-parser';
import { getRelated } from "./posts";
import { renderArticle } from "@/lib/render-article";

/**
 * Which section of the site the post belongs to. This component is shared by
 * /blog and /resources/news; it used to hardcode "/blog" everywhere, so news
 * articles showed a "Blog" breadcrumb and their share and copy-link buttons
 * handed out /blog/<slug> URLs that 404.
 */
export type PostSection = { label: string; href: string };

const BLOG_SECTION: PostSection = { label: "Blog", href: "/blog" };

/**
 * Blog posts store a display date ("May 15, 2026"); news spokes store an ISO
 * date, because page.tsx feeds the same field to schema.org's datePublished.
 * Rendering the raw value showed "2026-08-27" on every news article.
 *
 * Only ISO values are reformatted. Passing an already-formatted date through
 * `new Date()` interprets it as local midnight, which then renders a day early
 * once the output is pinned to UTC -- "May 15, 2026" became "May 14, 2026".
 * Pinning is still required for the ISO branch: an unpinned toLocaleDateString
 * disagrees between server and browser and throws a hydration error.
 */
function formatPostDate(value: string): string {
  const iso = /^\d{4}-\d{2}-\d{2}$/.test(value.trim());
  if (!iso) return value;

  const parsed = new Date(`${value.trim()}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return value;

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * What this component actually needs, declared structurally.
 *
 * It previously typed the prop as `Post` -- the shape inferred from the three
 * hardcoded posts in ./posts. Neither route passes one of those: both build an
 * object from the database, so both call sites were type errors. The optional
 * fields are the ones only file-based blog posts carry; news spokes have no
 * table of contents, tags or headline stat.
 */
export type ArticlePost = {
  slug: string;
  title: string;
  category: string;
  subcategory?: string;
  excerpt: string;
  content: string;
  readTime: string;
  date: string;
  heroImage: string;
  author: { name: string; role: string; bio?: string };
  tags?: string[];
  toc?: string[];
  stat?: { value: string; label: string } | null;
};

export default function PostClient({
  post,
  section = BLOG_SECTION,
  related: relatedOverride,
}: {
  post: ArticlePost;
  section?: PostSection;
  /** Server-supplied siblings. Falls back to the file-based blog posts. */
  related?: Array<Record<string, any>>;
}) {
  const tags = post.tags ?? [];
  const toc = post.toc ?? [];
  const displayDate = formatPostDate(post.date);
  const related: Array<Record<string, any>> =
    relatedOverride ?? getRelated(post.slug, post.category);
  const [copied, setCopied] = useState(false);

  const postUrl = `https://www.searchprex.com${section.href}/${post.slug}`;

  const copyLink = () => {
    navigator.clipboard.writeText(postUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="bg-white min-h-screen">
 
      {/* ══ HERO IMAGE SECTION ══ */}
      <section className="relative h-[460px] overflow-hidden">
        {/* Full-bleed Unsplash image */}
        <Image
          src={post.heroImage}
          alt={post.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          unoptimized
        />
        {/* Deep gradient so text is always readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f2e] via-[#0a0f2e]/70 to-[#0a0f2e]/20" />
 
        {/* Content over image */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="mx-auto w-full max-w-4xl px-4 pb-12 sm:px-6 lg:px-8">
 
            {/* Breadcrumb */}
            <div className="mb-5 flex items-center gap-2 text-white/60">
              <Link href={section.href} className="text-sm hover:text-white transition-colors">{section.label}</Link>
              {/* A news spoke in the plain "SEO News" category would otherwise
                  render "SEO News > SEO News". */}
              {post.category !== section.label && (
                <>
                  <ChevronRight className="h-3.5 w-3.5" />
                  <span className="text-sm text-[#3eb489] font-semibold">{post.category}</span>
                </>
              )}
            </div>
 
            {/* Stat badge */}
            {post.stat && (
              <div className="mb-5 inline-flex items-center gap-2.5 rounded-xl bg-white/10 px-4 py-2 backdrop-blur-sm border border-white/20">
                <TrendingUp className="h-4 w-4 text-[#3eb489]" />
                <span className="text-xl font-black text-[#3eb489]">{post.stat.value}</span>
                <span className="text-xs font-semibold text-white/70">{post.stat.label}</span>
              </div>
            )}
 
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl"
            >
              {post.title}
            </motion.h1>
 
            {/* Meta */}
            <div className="mt-5 flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-1.5 text-white/60 text-sm">
                <Clock className="h-4 w-4" /> {post.readTime}
              </div>
              <div className="flex items-center gap-1.5 text-white/60 text-sm">
                <Calendar className="h-4 w-4" /> {displayDate}
              </div>
              <button onClick={copyLink}
                className="flex items-center gap-1.5 text-white/60 text-sm hover:text-white transition-colors">
                {copied
                  ? <CheckCircle className="h-4 w-4 text-[#3eb489]" />
                  : <Share2 className="h-4 w-4" />}
                {copied ? "Copied!" : "Share"}
              </button>
            </div>
          </div>
        </div>
      </section>
 
      {/* ══ AUTHOR BAR ══ */}
      <div className="border-b border-[#e5e7eb] bg-white shadow-sm">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-[#EEEDFE] flex items-center justify-center flex-shrink-0 ring-2 ring-[#534AB7]/20">
                <span className="text-[#534AB7] font-black">M</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-bold text-[#0a0f2e] text-sm">{post.author.name}</span>
                  <span className="inline-flex items-center gap-1 bg-[#EEEDFE] px-2 py-0.5 rounded-full">
                    <CheckCircle className="h-3 w-3 text-[#534AB7]" />
                    <span className="text-[9px] font-bold text-[#534AB7]">Verified SEO Expert</span>
                  </span>
                </div>
                <p className="text-xs text-[#64748b]">{post.author.role} · {displayDate}</p>
              </div>
            </div>
            <a href="https://www.linkedin.com/in/mubashar-shahzad-seo/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-[#e5e7eb] px-4 py-2 text-sm font-semibold text-[#0a66c2] hover:border-[#0a66c2] transition-colors">
              <Linkedin className="h-4 w-4" /> Follow on LinkedIn
            </a>
          </div>
        </div>
      </div>
 
      {/* ══ BODY — 2 col ══ */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex gap-12 items-start">
 
          {/* Article */}
          <article className="flex-1 min-w-0">
            {/* Excerpt pull-quote */}
            <p className="mb-10 text-xl text-[#374151] leading-relaxed font-medium border-l-4 border-[#534AB7] pl-6 py-1">
              {post.excerpt}
            </p>
 
            {/* Content with Image Optimization */}
            <div style={{ lineHeight: "1.85", color: "#1a1a2e" }}>
              {parse(renderArticle(post.content), {
                replace: (domNode) => {
                  if (domNode instanceof Element && domNode.tagName === 'img') {
                    const { src, alt, width, height } = domNode.attribs;
                    return (
                      <div className="my-8 relative w-full h-auto overflow-hidden rounded-xl border border-[#e5e7eb] flex justify-center bg-[#f8f9fc]">
                        <Image
                          src={src || ''}
                          alt={alt || "Blog image"}
                          width={width ? parseInt(width, 10) : 800}
                          height={height ? parseInt(height, 10) : 450}
                          className="w-full h-auto object-cover"
                          unoptimized={src?.startsWith('http')}
                        />
                      </div>
                    );
                  }
                }
              })}
            </div>
 
            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-2 border-t border-[#e5e7eb] pt-8">
                {tags.map((t) => (
                  <span key={t} className="text-xs font-semibold bg-[#f8f9fc] border border-[#e5e7eb] text-[#64748b] px-3 py-1.5 rounded-full">
                    #{t}
                  </span>
                ))}
              </div>
            )}
 
            {/* Author bio */}
            <div className="mt-10 flex gap-5 items-start rounded-2xl border border-[#e5e7eb] bg-[#f8f9fc] p-7">
              <div className="h-14 w-14 rounded-full bg-[#EEEDFE] flex items-center justify-center flex-shrink-0 ring-2 ring-[#534AB7]/20">
                <span className="text-[#534AB7] font-black text-xl">M</span>
              </div>
              <div>
                <p className="font-black text-[#0a0f2e] mb-1">{post.author.name}</p>
                <div className="flex items-center gap-1 mb-3">
                  <CheckCircle className="h-3.5 w-3.5 text-[#534AB7]" />
                  <span className="text-xs font-bold text-[#534AB7]">{post.author.role}</span>
                </div>
                {post.author.bio && (
                  <p className="text-sm text-[#64748b] leading-relaxed">{post.author.bio}</p>
                )}
              </div>
            </div>
 
            {/* Share */}
            <div className="mt-8 flex items-center gap-3 flex-wrap">
              <span className="text-sm font-semibold text-[#0a0f2e]">Share:</span>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#0a66c2] text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-[#084e96] transition-colors">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <button onClick={copyLink}
                className="flex items-center gap-2 border border-[#e5e7eb] text-[#374151] text-sm font-bold px-4 py-2.5 rounded-xl hover:border-[#534AB7] hover:text-[#534AB7] transition-colors">
                <Copy className="h-4 w-4" />
                {copied ? "Copied!" : "Copy link"}
              </button>
            </div>
          </article>
 
          {/* Sidebar */}
          <aside className="w-72 flex-shrink-0 hidden lg:flex flex-col gap-5 sticky top-24">
 
            {/* TOC — omitted entirely when empty, otherwise news spokes (which
                carry no TOC) render an empty titled box. */}
            {toc.length > 0 && (
            <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-[#94a3b8] mb-4">
                Table of Contents
              </p>
              <nav className="flex flex-col gap-2">
                {toc.map((item, i) => (
                  <a key={i} href={`#section-${i}`}
                    className="group flex items-start gap-2 text-sm text-[#64748b] hover:text-[#534AB7] transition-colors">
                    <span className="text-[#534AB7] font-bold text-xs mt-0.5 flex-shrink-0 w-5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="group-hover:underline leading-snug">{item}</span>
                  </a>
                ))}
              </nav>
              </div>
            )}

              {/* Automated Internal Linking (Related Services) */}
              <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-[#94a3b8] mb-4">
                  Explore Services
                </p>
                <div className="flex flex-col gap-4">
                  <Link href="/services/law-firm-seo" className="group block">
                    <p className="text-sm font-bold text-[#0a0f2e] group-hover:text-[#534AB7] transition-colors mb-0.5">Law Firm SEO</p>
                    <p className="text-xs text-[#64748b] leading-relaxed">Dominate the local pack and AI Overviews for your practice areas.</p>
                  </Link>
                  <Link href="/services/ecommerce-seo" className="group block border-t border-[#e5e7eb] pt-4">
                    <p className="text-sm font-bold text-[#0a0f2e] group-hover:text-[#534AB7] transition-colors mb-0.5">Ecommerce SEO</p>
                    <p className="text-xs text-[#64748b] leading-relaxed">Scale product-page content and indexing across thousands of SKUs.</p>
                  </Link>
                  <Link href="/services/local-seo" className="group block border-t border-[#e5e7eb] pt-4">
                    <p className="text-sm font-bold text-[#0a0f2e] group-hover:text-[#534AB7] transition-colors mb-0.5">Local SEO Services</p>
                    <p className="text-xs text-[#64748b] leading-relaxed">Rank in the Google Maps top 3 and capture 'near me' search intent.</p>
                  </Link>
                </div>
              </div>
   
              {/* CTA card */}
            <div className="rounded-2xl bg-[#0a0f2e] p-6 text-center overflow-hidden relative">
              <div className="pointer-events-none absolute inset-0 opacity-10"
                style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #534AB7 1px, transparent 0)", backgroundSize: "12px 12px" }} />
              <div className="relative">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-[#EEEDFE] flex items-center justify-center">
                  <span className="text-[#534AB7] font-black">M</span>
                </div>
                <p className="text-white font-black text-sm mb-1">Talk to Mubashar</p>
                <p className="text-[#9aa0c4] text-xs mb-5 leading-relaxed">
                  Free 30-min SEO strategy call — no commitment
                </p>
                <a href="https://calendly.com/contact-searchprex/30min"
                  target="_blank" rel="noopener noreferrer"
                  className="block w-full bg-[#3eb489] hover:bg-[#2f9670] text-white text-sm font-bold py-3 rounded-xl transition-colors mb-2">
                  Book Free Call →
                </a>
                <Link href="/free-audit"
                  className="block w-full border border-white/15 text-white/60 text-xs font-semibold py-2.5 rounded-xl hover:border-white/40 transition-colors">
                  Get Free SEO Audit
                </Link>
              </div>
            </div>
 
            {/* Stat card */}
            {post.stat && (
              <div className="rounded-2xl border border-[#e5e7eb] bg-gradient-to-br from-[#EEEDFE] to-white p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#94a3b8] mb-3">Verified Result</p>
                <p className="text-3xl font-black text-[#534AB7]">{post.stat.value}</p>
                <p className="text-sm text-[#64748b] mt-1">{post.stat.label}</p>
                <Link href="/case-studies"
                  className="mt-3 flex items-center gap-1 text-xs font-bold text-[#534AB7] hover:gap-2 transition-all">
                  View case studies <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            )}
 
            {/* Tags */}
            {tags.length > 0 && (
              <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#94a3b8] mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <span key={t} className="text-xs bg-[#f8f9fc] border border-[#e5e7eb] text-[#64748b] px-2.5 py-1 rounded-full">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
 
      {/* ══ RELATED ══ */}
      {related.length > 0 && (
        <section className="border-t border-[#e5e7eb] bg-[#f8f9fc] py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black text-[#0a0f2e] mb-8">Related articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.slug} href={`${section.href}/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white hover:border-[#534AB7] hover:shadow-lg transition-all">
                  <div className="relative h-44 overflow-hidden bg-[#0a0f2e]">
                    {(p as any).heroImage && (
                      <Image src={(p as any).heroImage} alt={p.title} fill
                        className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                        sizes="350px" unoptimized />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f2e]/80 to-transparent" />
                    {(p as any).stat && (
                      <div className="absolute bottom-3 left-3 rounded-lg bg-[#0a0f2e]/70 px-3 py-1.5">
                        <span className="text-sm font-black text-[#3eb489]">{(p as any).stat.value}</span>
                        <span className="ml-1.5 text-[10px] text-white/60">{(p as any).stat.label}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">
                      {p.category}
                      {p.subcategory && (
                        <>
                          <ChevronRight className="h-2.5 w-2.5" /> {p.subcategory}
                        </>
                      )}
                    </div>
                    <h3 className="flex-1 text-sm font-black leading-snug text-[#0a0f2e] group-hover:text-[#534AB7] transition-colors line-clamp-2">
                      {p.title}
                    </h3>
                    <div className="mt-4 flex items-center justify-between border-t border-[#e5e7eb] pt-3">
                      <span className="flex items-center gap-1 text-xs text-[#94a3b8]">
                        <Clock className="h-3 w-3" /> {p.readTime}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold text-[#534AB7] group-hover:gap-2 transition-all">
                        Read <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
 
      {/* ══ BOTTOM CTA ══ */}
      <section className="bg-[#0a0f2e] py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-white mb-4 sm:text-4xl">
            Ready to rank on Page 1?
          </h2>
          <p className="text-[#9aa0c4] text-lg mb-10 max-w-xl mx-auto">
            Get a free 30-min strategy call with Mubashar — no sales reps, no junior staff.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://calendly.com/contact-searchprex/30min" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#3eb489] hover:bg-[#2f9670] text-white font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5">
              Book Free Strategy Call
            </a>
            <Link href="/free-audit"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-white text-white font-bold px-8 py-4 rounded-xl transition-colors">
              Get Free SEO Audit →
            </Link>
          </div>
        </div>
      </section>
 
    </main>
  );
}
 