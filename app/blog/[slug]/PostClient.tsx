"use client";

// app/blog/[slug]/PostClient.tsx
// Presentation only. The post is resolved server-side in page.tsx, which also
// owns metadata and JSON-LD.

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar, Clock, ChevronRight, ArrowRight,
  CheckCircle, Share2, Copy, Linkedin, TrendingUp, Mail, Loader2, ShieldCheck,
} from "lucide-react";
import { useState, useEffect } from "react";
import parse, { Element } from 'html-react-parser';
import { getRelated } from "./posts";
import { renderArticle, extractArticleToc } from "@/lib/render-article";
import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import ArticleExitOffer from "@/components/ArticleExitOffer";

/**
 * Which section of the site the post belongs to. This component is shared by
 * /blog and /resources/news; it used to hardcode "/blog" everywhere, so news
 * articles showed a "Blog" breadcrumb and their share and copy-link buttons
 * handed out /blog/<slug> URLs that 404.
 */
export type PostSection = { label: string; href: string };

/**
 * Splices a marker div into the article's markdown at its natural midpoint —
 * right before the middle top-level "## " heading — so ArticleLeadMagnet's
 * banner variant can be inserted there by the html-react-parser `replace`
 * callback below. markdown-it runs with `html: true` (lib/render-article.ts),
 * so this raw HTML passes through untouched rather than being escaped.
 *
 * Only articles with at least four top-level sections get a banner. A short
 * piece has no natural midpoint, and forcing a banner into it would read as
 * exactly the low-effort insertion this is trying to avoid — three sections or
 * fewer, and the sidebar + bottom form are enough.
 */
// Both formats exist in MarketingBlog and in ./posts: admin-authored bodies are
// markdown ("## Heading" at a line start — not "### ", which the lookahead's
// required space excludes), while the hardcoded blog posts are raw HTML with
// <h2> tags. Matching only markdown meant the HTML posts, which carry the most
// sections of anything on the site, never got a mid-article form at all.
const H2_BOUNDARY = /\n(?=## )|(?=<h2[\s>])/;

function injectMidContentSlot(markdown: string): string {
  const sections = markdown.split(H2_BOUNDARY);
  if (sections.length < 4) return markdown;

  const mid = Math.ceil(sections.length / 2);
  const slot = '<div id="__lead_magnet_slot__"></div>';
  // Blank lines on both sides are required, not cosmetic. In markdown-it an
  // HTML block that opens with <div> runs until the next blank line, so a slot
  // joined with a single newline swallowed the following "## Heading" into the
  // HTML block — it rendered as the literal text "## SearchPrex Action
  // Checklist" instead of an H2, and every line after it until the next gap
  // lost its markdown too.
  return `${sections.slice(0, mid).join("\n")}\n\n${slot}\n\n${sections.slice(mid).join("\n")}`;
}

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
  author: { name: string; role: string; bio?: string; linkedIn?: string };
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
  const toc =
    post.toc && post.toc.length > 0 ? post.toc : extractArticleToc(post.content);
  const displayDate = formatPostDate(post.date);
  const related: Array<Record<string, any>> =
    relatedOverride ?? getRelated(post.slug, post.category);
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Sidebar newsletter state
  const [subEmail, setSubEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [subError, setSubError] = useState<string | null>(null);

  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setReadingProgress(0);
      } else {
        setReadingProgress(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)));
      }
    };
    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const postUrl = `https://www.searchprex.com${section.href}/${post.slug}`;
  const leadSource = `article:${section.href}/${post.slug}`;
  //  Written per article in posts.ts, so the exit offer answers the piece the reader just
  //  finished. The offer behind it is identical everywhere; only this line changes.
  const exitCopy = (post as { exitOffer?: { headline: string; sub: string } }).exitOffer ?? {
    headline: "Want this run on your own site?",
    sub: "Doing it by hand takes an afternoon, and the answer is usually not where people look first. Send me the URL and I’ll run it myself and send back what I’d fix first. Free, within 24 hours.",
  };

  const copyLink = () => {
    navigator.clipboard.writeText(postUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleArticleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail.trim()) return;
    setSubmitting(true);
    setSubError(null);
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: subEmail.trim(),
          source: leadSource,
          categories: post.category ? [post.category] : [],
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setSubError(data.error || "Could not subscribe. Try again.");
      } else {
        setSubscribed(true);
        setSubEmail("");
      }
    } catch {
      setSubError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-white min-h-screen">
      {/* Toptal-style Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#534AB7] to-[#3eb489] transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>
 
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
            <a href="https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/" target="_blank" rel="noopener noreferrer"
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
          <article className="flex-1 min-w-0 max-w-full">
            {/* Excerpt pull-quote */}
            <p className="mb-8 text-xl text-[#374151] leading-relaxed font-medium border-l-4 border-[#534AB7] pl-6 py-1">
              {post.excerpt}
            </p>

            {/* Mobile Table of Contents (collapsible, shown on screens < lg where sidebar is hidden) */}
            {toc.length > 0 && (
              <details className="lg:hidden mb-8 rounded-2xl border border-[#e5e7eb] bg-[#f8f9fc] p-4 group">
                <summary className="flex cursor-pointer items-center justify-between font-bold text-[#0a0f2e] text-sm select-none">
                  <span className="flex items-center gap-2">
                    <span className="text-[#534AB7] text-xs uppercase tracking-wider font-extrabold">Table of Contents</span>
                    <span className="text-xs text-[#64748b] font-normal">({toc.length} sections)</span>
                  </span>
                  <ChevronRight className="h-4 w-4 text-[#64748b] transition-transform group-open:rotate-90" />
                </summary>
                <nav className="mt-3.5 flex flex-col gap-2 pt-3 border-t border-[#e5e7eb]">
                  {toc.map((item, i) => (
                    <a
                      key={i}
                      href={`#section-${i}`}
                      className="flex items-start gap-2 text-xs text-[#64748b] hover:text-[#534AB7] py-1 transition-colors"
                    >
                      <span className="text-[#534AB7] font-bold text-[11px] w-4 flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-snug">{item}</span>
                    </a>
                  ))}
                </nav>
              </details>
            )}

            {/* Content with Image Optimization + the mid-article lead magnet slot */}
            <div className="max-w-full overflow-hidden" style={{ lineHeight: "1.85", color: "#1a1a2e" }}>
              {parse(renderArticle(injectMidContentSlot(post.content)), {
                replace: (domNode) => {
                  if (domNode instanceof Element && domNode.tagName === 'div' && domNode.attribs?.id === '__lead_magnet_slot__') {
                    return <ArticleLeadMagnet variant="banner" source={leadSource} />;
                  }
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
              <div className="h-14 w-14 rounded-full bg-[#EEEDFE] flex items-center justify-center flex-shrink-0 ring-2 ring-[#534AB7]/20 overflow-hidden relative">
                <span className="text-[#534AB7] font-black text-xl">M</span>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <p className="font-black text-[#0a0f2e] text-base">{post.author.name}</p>
                  {(post.author.linkedIn || post.author.name.toLowerCase().includes("mubashar")) && (
                    <a
                      href={post.author.linkedIn || "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#0a66c2]/10 px-2.5 py-1 text-xs font-bold text-[#0a66c2] hover:bg-[#0a66c2]/20 transition-colors"
                    >
                      <Linkedin className="h-3.5 w-3.5" /> LinkedIn Profile
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-1.5 mb-3">
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
   
            {/* Lead magnet — was a link-only "Talk to Mubashar" card that sent
                an already-engaged reader to a second page to retype their URL
                and email. This submits in place. */}
            <ArticleLeadMagnet variant="sidebar" source={leadSource} />

            {/* Blog Newsletter Alert Box */}
            <div className="rounded-2xl border border-[#dce1eb] bg-gradient-to-br from-[#0a0f2e] to-[#1e1b4b] p-5 text-white shadow-sm">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#3eb489] mb-2">
                <Mail className="h-3.5 w-3.5" /> New Guide Alerts
              </div>
              <p className="text-sm font-extrabold text-white leading-snug mb-1.5">
                Get notified when our next SEO guide drops.
              </p>
              <p className="text-xs text-slate-300 leading-relaxed mb-3.5">
                Practitioner-grade technical SEO playbooks delivered straight to your inbox.
              </p>
              {subscribed ? (
                <div className="flex items-start gap-2 rounded-lg bg-emerald-500/20 border border-emerald-400/30 p-3 text-xs text-emerald-200 font-semibold">
                  <CheckCircle className="h-4 w-4 text-[#3eb489] flex-shrink-0 mt-0.5" />
                  <span>Subscribed! You&apos;ll receive an email when the next guide is published.</span>
                </div>
              ) : (
                <form onSubmit={handleArticleSubscribe} className="flex flex-col gap-2">
                  <input
                    type="email"
                    required
                    value={subEmail}
                    onChange={(e) => {
                      setSubEmail(e.target.value);
                      if (subError) setSubError(null);
                    }}
                    placeholder="Your email address..."
                    className="w-full rounded-lg bg-white px-3.5 py-2.5 text-xs font-medium text-[#0a0f2e] placeholder-[#94a3b8] outline-none"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-lg bg-[#3eb489] hover:bg-[#34a078] disabled:opacity-60 py-2.5 text-xs font-extrabold text-[#0a0f2e] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Subscribing...
                      </>
                    ) : (
                      <>
                        Subscribe to Blog <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                  {subError && <p className="text-[11px] text-red-300 font-medium">{subError}</p>}
                </form>
              )}
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
 
      {/* ══ BOTTOM CTA — was link-only ("Book Free Strategy Call" / "Get Free
          SEO Audit"), both hand-offs to a second page. Now submits here. ══ */}
      <ArticleLeadMagnet variant="bottom" source={leadSource} />

      {/* ══ EXIT OFFER — the only interruption on the page, and the only one that can
          reach a reader who finished the article and is leaving without scrolling to
          any of the three blocks above. Shows once per reader per 30 days, never to
          someone who has already submitted, never on arrival, and never as a
          full-screen cover on a phone. ══ */}
      <ArticleExitOffer
        source={`${leadSource}:exit`}
        headline={exitCopy?.headline}
        sub={exitCopy?.sub}
      />
 
    </main>
  );
}
 