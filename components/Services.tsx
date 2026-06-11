// components/Services.tsx
// Homepage services section — Toptal "Leverage World-class Talent" style:
// centered heading, thin-bordered 3x2 grid of cells (icon + title + short
// description), a gray filler cell (CRO: routes unsure visitors to the audit),
// and a small divider link below — exactly the Toptal pattern.
// Pure server-safe component: no hooks, no client JS.
 
import Link from "next/link";
import {
  Scale, ShoppingCart, MapPin, Wrench, Sparkles, ArrowRight,
} from "lucide-react";
 
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
 
const services = [
  {
    icon: Scale,
    title: "Law Firm SEO",
    desc: "Practice-area pages, local pack domination, and E-E-A-T content that turns legal searches into signed cases.",
    href: "/services/law-firm-seo",
  },
  {
    icon: ShoppingCart,
    title: "Ecommerce & Shopify SEO",
    desc: "Mass non-indexing recovery, product content at scale, schema and Core Web Vitals — verified +75% revenue growth.",
    href: "/services/ecommerce-seo",
  },
  {
    icon: MapPin,
    title: "Local SEO",
    desc: "Google Business Profile, citations, reviews and service-area pages — top-3 map pack results in 60 days.",
    href: "/services/local-seo",
  },
  {
    icon: Wrench,
    title: "Technical SEO",
    desc: "Crawl, indexation and Core Web Vitals fixes that recovered +476% organic clicks from near-zero visibility.",
    href: "/services/technical-seo",
  },
  {
    icon: Sparkles,
    title: "AI Overviews & AEO",
    desc: "Built into every service: content structured to get cited by Google AI Overviews and LLMs — not just ranked.",
    href: "/services",
  },
];
 
export default function Services() {
  return (
    <section className="bg-white py-20" id="services">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
 
        {/* Centered heading — Toptal style */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
            Four Core Services. <span style={{ color: GREEN }}>Zero Fluff.</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#64748b]">
            No bloated menus or vanity packages — every service is tied to a verified,
            Google Search Console-backed result you can inspect.
          </p>
        </div>
 
        {/* Bordered grid — thin borders, Toptal "talent" pattern */}
        <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-[#e5e7eb] sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Link key={s.title} href={s.href}
                className={`group flex flex-col bg-white p-8 transition-colors hover:bg-[#f8f9fc]
                  border-[#e5e7eb]
                  ${i % 3 !== 2 ? "lg:border-r" : ""}
                  ${i % 2 === 0 ? "sm:border-r lg:border-r" : "sm:border-r-0"}
                  ${i % 3 === 2 ? "lg:border-r-0" : ""}
                  border-b lg:[&:nth-child(n+4)]:border-b-0 sm:[&:nth-child(n+5)]:border-b-0
                `}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#e5e7eb] transition-colors group-hover:border-[#3eb489]">
                    <Icon className="h-5 w-5 text-[#64748b] transition-colors group-hover:text-[#2f9670]" />
                  </span>
                  <h3 className="text-base font-black text-[#0a0f2e]">{s.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-[#64748b]">{s.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ color: GREEN_DARK }}>
                  Explore <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
 
          {/* Gray filler cell — Toptal's "Plus Thousands More Skills" pattern, CRO version */}
          <Link href="/free-audit"
            className="group flex flex-col justify-center bg-[#f8f9fc] p-8 transition-colors hover:bg-[#f1f5f9] border-[#e5e7eb] border-b sm:border-b-0">
            <h3 className="mb-2 text-base font-black text-[#0a0f2e]">Not sure which one you need?</h3>
            <p className="text-sm leading-relaxed text-[#64748b]">
              Get a free, founder-reviewed audit — the 90-day roadmap tells you exactly
              which service (if any) will move the needle.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold"
              style={{ color: GREEN_DARK }}>
              Get Free Audit <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
 
        {/* Divider link — Toptal "GET EVEN MORE" pattern */}
        <div className="mt-12 text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#e5e7eb]" /></div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-[11px] font-bold uppercase tracking-widest text-[#94a3b8]">
                See the proof behind every service
              </span>
            </div>
          </div>
          <Link href="/all-case-studies"
            className="inline-flex items-center gap-1.5 text-sm font-bold transition-colors hover:opacity-80"
            style={{ color: "#534AB7" }}>
            Browse verified case studies <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
 
      </div>
    </section>
  );
}
 