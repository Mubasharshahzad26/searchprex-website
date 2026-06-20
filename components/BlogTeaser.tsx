// components/BlogTeaser.tsx
// FIXED: Handle missing blog data gracefully during build, added fallback content
 
import Link from "next/link";
import { ChevronRight, Clock, CheckCircle } from "lucide-react";
 
// Import safely with fallback
let posts: any[] = [];
try {
  const { posts: importedPosts } = require("@/app/blog/data");
  posts = importedPosts || [];
} catch (error) {
  console.warn("Blog data not found, using fallback:", error);
  // Fallback blog posts for build time
  posts = [
    {
      slug: "law-firm-seo-guide",
      title: "The Complete Law Firm SEO Strategy Guide 2024",
      excerpt: "Learn how to rank higher for legal keywords and attract high-intent clients through proven SEO tactics.",
      category: "Technical SEO",
      subcategory: "Law Firms",
      featured: true,
      author: { name: "Mubashar Shahzad" },
      readTime: "12 min read"
    },
    {
      slug: "ecommerce-seo-shopify",
      title: "Shopify SEO: Complete Technical Setup Guide",
      excerpt: "Fix technical issues, improve crawlability, and boost organic visibility for your Shopify store.",
      category: "E-commerce SEO",
      subcategory: "Shopify",
      featured: false,
      author: { name: "Mubashar Shahzad" },
      readTime: "8 min read"
    },
    {
      slug: "local-seo-rankings",
      title: "Local SEO Ranking Factors: Get Ahead of Competition",
      excerpt: "Master Google Business Profile optimization and local citation strategies to dominate local search.",
      category: "Local SEO",
      subcategory: "Local Business",
      featured: false,
      author: { name: "Mubashar Shahzad" },
      readTime: "10 min read"
    },
    {
      slug: "technical-seo-core-web-vitals",
      title: "Core Web Vitals: The Technical SEO Checklist",
      excerpt: "Optimize page speed, layout stability, and interactivity to improve rankings and user experience.",
      category: "Technical SEO",
      subcategory: "Performance",
      featured: false,
      author: { name: "Mubashar Shahzad" },
      readTime: "15 min read"
    },
    {
      slug: "link-building-strategy",
      title: "Link Building for SEO: Authority & Relevance Strategy",
      excerpt: "Build high-quality backlinks that actually move the needle for your rankings and domain authority.",
      category: "Link Building",
      subcategory: "Off-Page",
      featured: false,
      author: { name: "Mubashar Shahzad" },
      readTime: "11 min read"
    },
  ];
}
 
function GradientThumb({ category }: { category: string }) {
  const colors: Record<string, string> = {
    "Technical SEO": "from-[#0a0f2e] to-[#1a3c8f]",
    "E-commerce SEO": "from-[#0f2027] to-[#203a43]",
    "Local SEO": "from-[#1a1a2e] to-[#16213e]",
    "Content Strategy": "from-[#0d1b2a] to-[#1b263b]",
    "On-Page SEO": "from-[#1a0533] to-[#341070]",
    "Link Building": "from-[#0b3d2e] to-[#1a6b4e]",
  };
  return (
    <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${colors[category] || "from-[#0a0f2e] to-[#1a3c8f]"}`}>
      <span className="text-4xl opacity-30">📊</span>
    </div>
  );
}
 
export default function BlogTeaser() {
  // Ensure we have posts and handle empty array
  if (!posts || posts.length === 0) {
    return null; // Don't render if no posts
  }
 
  const featured = posts.find((p: any) => p.featured) ?? posts[0];
  const compact = posts.filter((p: any) => p.slug !== featured.slug).slice(0, 4);
 
  return (
    <section className="bg-[#f8f9fc] py-20" id="from-the-blog">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
 
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
            Explore Trending SEO Guides
          </h2>
        </div>
 
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
 
          {/* Featured — large card (Toptal left column) */}
          <Link href={`/blog/${featured.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-[#e5e7eb] bg-white transition-all hover:-translate-y-1 hover:shadow-lg lg:row-span-2">
            <div className="aspect-[16/10] overflow-hidden">
              <GradientThumb category={featured.category} />
            </div>
            <div className="flex flex-1 flex-col p-7">
              <p className="mb-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#534AB7]">
                {featured.category} <ChevronRight className="h-3 w-3 text-[#94a3b8]" /> {featured.subcategory}
              </p>
              <h3 className="mb-3 text-xl font-black leading-snug text-[#0a0f2e] group-hover:text-[#1a3c8f] transition-colors">
                {featured.title}
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-[#64748b]">{featured.excerpt}</p>
              <div className="mt-auto flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-[#0a0f2e]">
                  By {featured.author.name} <CheckCircle className="h-3.5 w-3.5 text-[#534AB7]" />
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#94a3b8]">
                  <Clock className="h-3.5 w-3.5" /> {featured.readTime}
                </span>
              </div>
            </div>
          </Link>
 
          {/* Compact cards — 2x2 (Toptal right side) */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
            {compact.map((p: any) => (
              <Link key={p.slug} href={`/blog/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-[#e5e7eb] bg-white transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="aspect-[16/7] overflow-hidden">
                  <GradientThumb category={p.category} />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#534AB7]">
                    {p.category} <ChevronRight className="h-3 w-3 text-[#94a3b8]" /> {p.subcategory}
                  </p>
                  <h3 className="mb-3 text-sm font-black leading-snug text-[#0a0f2e] group-hover:text-[#1a3c8f] transition-colors">
                    {p.title}
                  </h3>
                  <span className="mt-auto text-xs font-semibold text-[#64748b]">By {p.author.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
 
        {/* Outlined button — exact Toptal "Read More Thought Leadership" pattern */}
        <div className="mt-10 text-center">
          <Link href="/blog"
            className="inline-flex items-center gap-2 rounded-lg border border-[#d4d8e3] bg-white px-6 py-3 text-sm font-bold text-[#0a0f2e] transition-all hover:border-[#0a0f2e]">
            Read More SEO Guides
          </Link>
        </div>
 
      </div>
    </section>
  );
}
 