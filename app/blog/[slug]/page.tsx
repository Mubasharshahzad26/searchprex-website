"use client";
 
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import {
  Calendar, Clock, ChevronRight, ArrowRight,
  CheckCircle, Share2, Copy, Linkedin, TrendingUp,
} from "lucide-react";
import { useState } from "react";
 
/* ── posts data ── */
const posts = [
  {
    slug:        "crawl-budget-optimization-guide",
    category:    "Technical SEO",
    subcategory: "Crawl Optimization",
    title:       "Crawl Budget Optimization: The Complete 2026 Guide for Large E-commerce Sites",
    excerpt:     "If Google isn't crawling your most important pages, they won't rank. Here's exactly how to audit and fix crawl budget issues at scale.",
    readTime:    "12-minute read",
    date:        "May 15, 2026",
    tags:        ["crawl budget", "indexing", "technical seo", "e-commerce"],
    stat:        { value: "+285%", label: "Indexing Rate" },
    /* Unsplash — server room / tech */
    heroImage:   "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=85&auto=format&fit=crop",
    toc: [
      "What is crawl budget?",
      "Why it matters for e-commerce",
      "How to audit your crawl budget",
      "Fix #1 — Remove low-value URLs",
      "Fix #2 — Improve page speed",
      "Fix #3 — Fix internal linking",
      "GSC resubmission strategy",
      "Conclusion",
    ],
    content: `
      <h2>What is crawl budget?</h2>
      <p>Crawl budget is the number of pages Googlebot will crawl on your site within a given timeframe. For large e-commerce sites with 10,000+ pages, this becomes a critical ranking factor — if Google can't crawl your pages, they simply won't rank.</p>
      <p>There are two components: <strong>crawl rate limit</strong> (how fast Googlebot crawls to avoid overloading your server) and <strong>crawl demand</strong> (how much Google wants to crawl based on popularity and freshness).</p>
      <div class="callout"><strong>Pro tip:</strong> Use Google Search Console's Crawl Stats report to see exactly how many pages Googlebot crawls per day on your site. If it's less than 10% of your total pages, you have a crawl budget problem.</div>
      <h2>Why it matters for e-commerce</h2>
      <p>E-commerce sites generate enormous amounts of duplicate or near-duplicate URLs through faceted navigation, session IDs, sorting parameters, and product variants. A 50,000-product site can easily generate 500,000+ URLs — most of which are worthless to Google.</p>
      <p>When Google wastes crawl budget on these low-value URLs, your important product pages and category pages get crawled less frequently — or not at all.</p>
      <h2>How to audit your crawl budget</h2>
      <p>Start with a Screaming Frog crawl to identify all URLs being generated. Then compare this against your GSC coverage report to see which pages are indexed vs crawled vs discovered.</p>
      <p>Look for these red flags: faceted navigation URLs without canonical tags, paginated pages beyond page 3, internal search result pages, and thin content pages with fewer than 200 words.</p>
      <div class="callout"><strong>Tool stack:</strong> Screaming Frog + GSC Crawl Stats + Log file analysis = complete picture of your crawl budget situation.</div>
      <h2>Fix #1 — Remove low-value URLs</h2>
      <p>Add <code>noindex</code> to thin pages, consolidate faceted navigation with canonical tags, and block internal search result pages via robots.txt. This alone can reduce crawlable URLs by 60-80% on most e-commerce sites.</p>
      <h2>Fix #2 — Improve page speed</h2>
      <p>Googlebot crawls faster when your server responds faster. Aim for TTFB under 200ms on product pages. Use a CDN, optimize images, and enable server-side caching.</p>
      <h2>Fix #3 — Fix internal linking</h2>
      <p>Orphan pages — pages with no internal links pointing to them — rarely get crawled. Run a crawl to find all orphan pages and add them to relevant category pages or your XML sitemap.</p>
      <h2>GSC resubmission strategy</h2>
      <p>After fixing crawl budget issues, don't just wait. Submit your sitemap in GSC and use the URL Inspection tool to request indexing on your most important pages first. Batch submissions of 200-300 URLs per day gives the best results.</p>
      <h2>Conclusion</h2>
      <p>Crawl budget optimization is not a one-time fix — it's an ongoing process. Set up monthly crawl stats monitoring in GSC and re-audit every time you add a major new product category or site section.</p>
    `,
    author: {
      name: "Mubashar Shahzad",
      role: "Founder & SEO Expert",
      bio: "Mubashar is an SEO analyst with 5+ years specializing in large-scale e-commerce SEO. He has managed 40,000+ page sites and solved mass non-indexing issues for brands including smkstore.com and michigansportsoutdoor.com.",
    },
  },
  {
    slug:        "google-indexing-api-python",
    category:    "Technical SEO",
    subcategory: "Indexing",
    title:       "Google Indexing API: How to Submit 1,000 URLs/Day with Python",
    excerpt:     "The standard GSC submission is slow. This step-by-step guide shows you how to build a 5-account rotator system for mass URL submission.",
    readTime:    "18-minute read",
    date:        "May 10, 2026",
    stat:        { value: "1,000/day", label: "URL Submissions" },
    heroImage:   "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=85&auto=format&fit=crop",
    tags:        ["indexing api", "python", "google search console", "automation"],
    toc:         ["Why the standard GSC is too slow","Google Indexing API setup","Python script walkthrough","5-account rotator system","Rate limits & best practices","Results to expect"],
    content:     `<h2>Why the standard GSC is too slow</h2><p>Google Search Console's URL inspection tool limits you to a handful of submissions per day. For large e-commerce sites trying to get thousands of product pages indexed, this is completely impractical.</p><h2>Google Indexing API setup</h2><p>The Indexing API allows up to 200 URL submissions per day per service account — and you can use multiple accounts to scale this significantly.</p>`,
    author: { name: "Mubashar Shahzad", role: "Founder & SEO Expert", bio: "Mubashar is an SEO analyst with 5+ years specializing in large-scale e-commerce SEO." },
  },
  {
    slug:        "ecommerce-product-page-seo",
    category:    "E-commerce SEO",
    subcategory: "Product Pages",
    title:       "Product Page SEO at Scale: How to Write Unique Content for 10,000+ SKUs",
    excerpt:     "Duplicate boilerplate content is the #1 reason e-commerce product pages fail to index.",
    readTime:    "15-minute read",
    date:        "May 5, 2026",
    stat:        { value: "+75%", label: "Revenue" },
    heroImage:   "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=85&auto=format&fit=crop",
    tags:        ["product pages", "e-commerce", "content", "indexing"],
    toc:         ["The duplicate content problem","Brand-by-brand strategy","Content template","Scaling with AI","Results"],
    content:     `<h2>The duplicate content problem</h2><p>Most e-commerce product pages are nearly identical — same boilerplate description, same spec table, same FAQ. Google sees these as duplicate content and refuses to index them.</p>`,
    author: { name: "Mubashar Shahzad", role: "Founder & SEO Expert", bio: "Mubashar is an SEO analyst with 5+ years specializing in large-scale e-commerce SEO." },
  },
];
 
function getRelated(currentSlug: string, category: string) {
  return posts.filter((p) => p.slug !== currentSlug && p.category === category).slice(0, 3);
}
 
const styledContent = (html: string) =>
  html
    .replace(/<h2>/g, `<h2 style="font-size:1.5rem;font-weight:900;color:#0a0f2e;margin:2.5rem 0 1rem;padding-bottom:0.5rem;border-bottom:2px solid #e5e7eb">`)
    .replace(/<p>/g, `<p style="font-size:1.0625rem;color:#374151;margin-bottom:1.25rem;line-height:1.85">`)
    .replace(/<div class="callout">/g, `<div style="background:#EEEDFE;border-left:4px solid #534AB7;border-radius:8px;padding:1rem 1.25rem;margin:1.5rem 0;font-size:0.9375rem;color:#3C3489">`)
    .replace(/<code>/g, `<code style="background:#f1f5f9;border-radius:4px;padding:2px 6px;font-size:0.875rem;color:#0a0f2e">`);
 
export default function BlogPostPage() {
  const params  = useParams();
  const slug    = params?.slug as string;
  const post    = posts.find((p) => p.slug === slug) ?? posts[0];
  const related = getRelated(post.slug, post.category);
  const [copied, setCopied] = useState(false);
 
  const copyLink = () => {
    navigator.clipboard.writeText(`https://www.searchprex.com/blog/${post.slug}`);
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
              <Link href="/blog" className="text-sm hover:text-white transition-colors">Blog</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-sm text-[#3eb489] font-semibold">{post.category}</span>
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
                <Calendar className="h-4 w-4" /> {post.date}
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
                <p className="text-xs text-[#64748b]">{post.author.role} · {post.date}</p>
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
 
            {/* Content */}
            <div
              dangerouslySetInnerHTML={{ __html: styledContent(post.content) }}
              style={{ lineHeight: "1.85", color: "#1a1a2e" }}
            />
 
            {/* Tags */}
            <div className="mt-12 flex flex-wrap gap-2 border-t border-[#e5e7eb] pt-8">
              {post.tags.map((t) => (
                <span key={t} className="text-xs font-semibold bg-[#f8f9fc] border border-[#e5e7eb] text-[#64748b] px-3 py-1.5 rounded-full">
                  #{t}
                </span>
              ))}
            </div>
 
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
                <p className="text-sm text-[#64748b] leading-relaxed">{post.author.bio}</p>
              </div>
            </div>
 
            {/* Share */}
            <div className="mt-8 flex items-center gap-3 flex-wrap">
              <span className="text-sm font-semibold text-[#0a0f2e]">Share:</span>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=https://www.searchprex.com/blog/${post.slug}`}
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
 
            {/* TOC */}
            <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-[#94a3b8] mb-4">
                Table of Contents
              </p>
              <nav className="flex flex-col gap-2">
                {post.toc.map((item, i) => (
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
            <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-[#94a3b8] mb-3">Tags</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span key={t} className="text-xs bg-[#f8f9fc] border border-[#e5e7eb] text-[#64748b] px-2.5 py-1 rounded-full">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
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
                <Link key={p.slug} href={`/blog/${p.slug}`}
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
                      {p.category} <ChevronRight className="h-2.5 w-2.5" /> {p.subcategory}
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
 