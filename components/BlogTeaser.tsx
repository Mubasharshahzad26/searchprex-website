// components/BlogTeaser.tsx
// TOPTAL STYLE: Real images, author avatars, better visual hierarchy
 
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";
 
// Enhanced blog posts with real images & author avatars
const fallbackPosts = [
  {
    slug: "law-firm-seo-guide",
    title: "The Complete Law Firm SEO Strategy Guide 2024",
    excerpt: "Learn how to rank higher for legal keywords and attract high-intent clients through proven SEO tactics.",
    category: "Technical SEO",
    subcategory: "Law Firms",
    featured: true,
    author: { 
      name: "Mubashar Shahzad",
      avatar: "https://media.licdn.com/dms/image/v2/D4D03AQEzUPWNlHQXZA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1695208707098?e=1728518400&v=beta&t=YOUR_AVATAR_URL" // Replace with real avatar
    },
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=800&q=80" // Law firm SEO banner
  },
  {
    slug: "ecommerce-seo-shopify",
    title: "Shopify SEO: Complete Technical Setup Guide",
    excerpt: "Fix technical issues, improve crawlability, and boost organic visibility for your Shopify store.",
    category: "E-commerce SEO",
    subcategory: "Shopify",
    featured: false,
    author: { 
      name: "Mubashar Shahzad",
      avatar: "https://media.licdn.com/dms/image/v2/D4D03AQEzUPWNlHQXZA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1695208707098?e=1728518400&v=beta&t=YOUR_AVATAR_URL"
    },
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&q=80" // Shopify ecommerce
  },
  {
    slug: "local-seo-rankings",
    title: "Local SEO Ranking Factors: Get Ahead of Competition",
    excerpt: "Master Google Business Profile optimization and local citation strategies to dominate local search.",
    category: "Local SEO",
    subcategory: "Local Business",
    featured: false,
    author: { 
      name: "Mubashar Shahzad",
      avatar: "https://media.licdn.com/dms/image/v2/D4D03AQEzUPWNlHQXZA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1695208707098?e=1728518400&v=beta&t=YOUR_AVATAR_URL"
    },
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1553531889-e6cf89d45394?w=800&q=80" // Local map
  },
  {
    slug: "technical-seo-core-web-vitals",
    title: "Core Web Vitals: The Technical SEO Checklist",
    excerpt: "Optimize page speed, layout stability, and interactivity to improve rankings and user experience.",
    category: "Technical SEO",
    subcategory: "Performance",
    featured: false,
    author: { 
      name: "Mubashar Shahzad",
      avatar: "https://media.licdn.com/dms/image/v2/D4D03AQEzUPWNlHQXZA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1695208707098?e=1728518400&v=beta&t=YOUR_AVATAR_URL"
    },
    readTime: "15 min read",
    image: "https://images.unsplash.com/photo-1555949519-51caa142c052?w=800&q=80" // Performance metrics
  },
  {
    slug: "link-building-strategy",
    title: "Link Building for SEO: Authority & Relevance Strategy",
    excerpt: "Build high-quality backlinks that actually move the needle for your rankings and domain authority.",
    category: "Link Building",
    subcategory: "Off-Page",
    featured: false,
    author: { 
      name: "Mubashar Shahzad",
      avatar: "https://media.licdn.com/dms/image/v2/D4D03AQEzUPWNlHQXZA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1695208707098?e=1728518400&v=beta&t=YOUR_AVATAR_URL"
    },
    readTime: "11 min read",
    image: "https://images.unsplash.com/photo-1527427337751-dacf14ef9033?w=800&q=80" // Link chains
  },
];
 
export default function BlogTeaser() {
  const posts = fallbackPosts;
 
  if (!posts || posts.length === 0) {
    return null;
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
 
          {/* Featured — Large Card (Left, spans 2 rows) */}
          <Link 
            href={`/blog/${featured.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl lg:row-span-2"
          >
            {/* Thumbnail Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#f0f0f0]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 300px"
              />
              {/* Category Badge — Overlay */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-md rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#534AB7]">
                {featured.category}
              </div>
            </div>
 
            {/* Content */}
            <div className="flex flex-1 flex-col p-7">
              <p className="mb-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">
                {featured.subcategory} <ChevronRight className="h-3 w-3" />
              </p>
 
              <h3 className="mb-4 text-xl font-black leading-snug text-[#0a0f2e] group-hover:text-[#1a3c8f] transition-colors">
                {featured.title}
              </h3>
 
              <p className="mb-6 text-sm leading-relaxed text-[#64748b]">
                {featured.excerpt}
              </p>
 
              {/* Author + Read Time */}
              <div className="mt-auto flex items-center justify-between border-t border-[#e5e7eb] pt-5">
                <div className="flex items-center gap-2">
                  <Image
                    src={featured.author.avatar}
                    alt={featured.author.name}
                    width={28}
                    height={28}
                    className="rounded-full object-cover w-7 h-7"
                  />
                  <span className="text-xs font-semibold text-[#0a0f2e]">
                    {featured.author.name}
                  </span>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-[#94a3b8]">
                  <Clock className="h-3.5 w-3.5" /> {featured.readTime}
                </span>
              </div>
            </div>
          </Link>
 
          {/* Compact Cards — 2x2 Grid (Right side) */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
            {compact.map((p: any) => (
              <Link 
                key={p.slug} 
                href={`/blog/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Thumbnail Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-[#f0f0f0]">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 250px"
                  />
                  {/* Category Badge — Overlay */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-[#534AB7]">
                    {p.category}
                  </div>
                </div>
 
                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-2 flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-[#94a3b8]">
                    {p.subcategory} <ChevronRight className="h-2.5 w-2.5" />
                  </p>
 
                  <h3 className="mb-4 text-sm font-black leading-snug text-[#0a0f2e] group-hover:text-[#1a3c8f] transition-colors">
                    {p.title}
                  </h3>
 
                  {/* Author */}
                  <div className="mt-auto flex items-center gap-2 border-t border-[#e5e7eb] pt-4">
                    <Image
                      src={p.author.avatar}
                      alt={p.author.name}
                      width={24}
                      height={24}
                      className="rounded-full object-cover w-6 h-6"
                    />
                    <span className="text-xs font-semibold text-[#0a0f2e]">
                      {p.author.name}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
 
        {/* CTA Button */}
        <div className="mt-12 text-center">
          <Link href="/blog"
            className="inline-flex items-center gap-2 rounded-lg border border-[#d4d8e3] bg-white px-6 py-3 text-sm font-bold text-[#0a0f2e] transition-all hover:border-[#0a0f2e] hover:bg-[#f0f0f0]">
            Read More SEO Guides
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
 
      </div>
    </section>
  );
}
 