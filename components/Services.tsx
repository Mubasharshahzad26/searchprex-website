// components/Services.tsx
// Premium Semrush-style services section. Transparent background so the
// AuroraBackground wrapper's gradient shows through; separate rounded-2xl cards
// with hover lift + gradient accent bar; gradient "not sure?" card.
// Server component (no hooks). Entrance handled by <Reveal> in app/page.tsx.
 
import Link from "next/link";
import { Scale, ShoppingCart, MapPin, Wrench, Sparkles, ArrowRight } from "lucide-react";
 
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
    <section className="relative py-20 sm:py-28" id="services">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
 
        {/* heading */}
        <div className="mb-12 text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#534AB7]/15 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#534AB7] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3eb489]" /> What we do
          </p>
          <h2 className="text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl lg:text-5xl">
            Core services.{" "}
            <span className="bg-gradient-to-r from-[#534AB7] to-[#3eb489] bg-clip-text text-transparent">
              Zero fluff.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#475569]">
            No bloated menus or vanity packages — every service is tied to a verified,
            Google Search Console-backed result you can inspect.
          </p>
        </div>
 
        {/* premium cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.title}
                href={s.href}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#e9ecf5] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-xl"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#534AB7] to-[#3eb489] transition-transform duration-300 group-hover:scale-x-100" />
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#534AB7]/8 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#534AB7] group-hover:to-[#3eb489]">
                  <Icon className="h-6 w-6 text-[#534AB7] transition-colors duration-300 group-hover:text-white" />
                </span>
                <h3 className="text-base font-black text-[#0a0f2e]">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#64748b]">{s.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#2f9670] transition-all group-hover:gap-2">
                  Explore <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
 
          {/* gradient "not sure?" card */}
          <Link
            href="/free-audit"
            className="group relative flex flex-col justify-center overflow-hidden rounded-2xl p-7 text-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            style={{ background: "linear-gradient(135deg, #534AB7 0%, #3C3489 50%, #2f9670 100%)" }}
          >
            <h3 className="mb-2 text-base font-black">Not sure which you need?</h3>
            <p className="text-sm leading-relaxed text-white/85">
              Get a free, founder-reviewed audit — the 90-day roadmap tells you exactly which
              service will move the needle.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold">
              Get free audit <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
 
        {/* divider link */}
        <div className="mt-12 text-center">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[#94a3b8]">
            See the proof behind every service
          </p>
          <Link
            href="/all-case-studies"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#534AB7] transition-colors hover:opacity-80"
          >
            Browse verified case studies <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
 
      </div>
    </section>
  );
}
 