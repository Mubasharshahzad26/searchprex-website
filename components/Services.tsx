// components/Services.tsx
// Premium Semrush-style services section. Transparent background so the
// AuroraBackground wrapper's gradient shows through; separate rounded-2xl cards
// with hover lift + gradient accent bar; gradient "not sure?" card.
// Server component (no hooks). Entrance handled by <Reveal> in app/page.tsx.
 
import Link from "next/link";
import { Scale, ShoppingCart, MapPin, Wrench, Sparkles, ArrowRight, Newspaper } from "lucide-react";
 
const services = [
  {
    icon: Scale,
    title: "Law Firm SEO",
    desc: "Family Law SEO and Personal Injury SEO for firms that need qualified cases without burning their whole growth budget on PPC.",
    href: "/services/law-firm-seo",
  },
  {
    icon: ShoppingCart,
    title: "Ecommerce & Shopify SEO",
    desc: "Shopify and WooCommerce SEO for 2,000 to 40,000+ product catalogues: fix thin content, crawl waste and indexation issues.",
    href: "/services/ecommerce-seo",
  },
  {
    icon: MapPin,
    title: "Local SEO",
    desc: "Google Map Pack visibility for small and mid-sized local businesses, from Google Business Profile fixes to service-area SEO.",
    href: "/services/local-seo",
  },
  {
    icon: Wrench,
    title: "Technical SEO",
    desc: "I fix crawl budget leaks, Core Web Vitals, and indexation bottlenecks — taking one client from ~3,000 to 11,549 indexed pages.",
    href: "/services/technical-seo",
  },
  {
    icon: Sparkles,
    title: "AI Overviews & AEO",
    desc: "I structure content and entity schema to win direct citations in Google AI Overviews, Perplexity, and ChatGPT search.",
    href: "/services",
  },
];

// The cards above already link each service page, so these go one level
// deeper — practice areas, technical SEO, the city pages — rather than
// repeating the same three links.
const problems = [
  {
    title: "Family Law & Personal Injury SEO",
    desc: "Create practice-area and city pages that attract people looking for legal help now, while building an organic channel that reduces reliance on high-cost PPC.",
    links: [
      { href: "/services/law-firm-seo/family-law", label: "Family Law SEO" },
      { href: "/services/law-firm-seo/personal-injury", label: "Personal Injury SEO" },
    ],
  },
  {
    title: "Thin Content & Technical SEO",
    desc: "Fix thin product and category pages, duplicate canonicals, crawl-budget waste and indexation bottlenecks across Shopify and WooCommerce stores.",
    links: [
      { href: "/services/ecommerce-seo", label: "Fix ecommerce SEO issues" },
      { href: "/services/technical-seo", label: "Technical SEO" },
    ],
  },
  {
    title: "Local SEO & Google Map Pack",
    desc: "Strengthen Google Business Profile, citations and service-area relevance so local customers can find and contact your business in the markets you serve.",
    links: [
      { href: "/services/local-seo", label: "Explore Local SEO" },
      { href: "/locations", label: "Law firm SEO by city" },
    ],
  },
];
 
export default function Services() {
  return (
    <section className="relative py-20 sm:py-28" id="services">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
 
        {/* heading */}
        <div className="mb-12 text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#534AB7]/15 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#534AB7] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3eb489]" /> My Expertise
          </p>
          <h2 className="text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl lg:text-5xl">
            SEO Built for Cases, Catalogues &amp; Local Leads
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#475569]">
            Founder-led SEO for US law firms, Shopify and WooCommerce stores, and local businesses. Every service is tied to a result you can inspect.
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
                <p className="mt-2 text-sm leading-relaxed text-[#566070]">{s.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#196b4d] transition-all group-hover:gap-2">
                  Explore <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
 
          {/* gradient "not sure?" card */}
          <Link
            href="/free-audit"
            className="group relative flex flex-col justify-center overflow-hidden rounded-2xl p-7 text-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            style={{ background: "linear-gradient(135deg, #534AB7 0%, #3C3489 50%, #196b4d 100%)" }}
          >
            <h3 className="mb-2 text-base font-black">Not sure which you need?</h3>
            <p className="text-sm leading-relaxed text-white/85">
              Get a free, founder-reviewed audit — the 90-day roadmap tells you exactly which
              service will move the needle.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold">
              Get my free SEO audit <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
 
        <div className="mt-16 rounded-2xl border border-[#e9ecf5] bg-white/85 p-7 shadow-sm sm:p-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#534AB7]">What we solve</p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-[#0a0f2e] sm:text-3xl">
              Search problems with a clear commercial outcome
            </h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {problems.map((problem) => (
              <article key={problem.title}>
                <h3 className="text-lg font-black text-[#0a0f2e]">{problem.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#566070]">{problem.desc}</p>
                <div className="mt-4 flex flex-col gap-2">
                  {problem.links.map((l) => (
                    <Link key={l.href} href={l.href} className="inline-flex items-center gap-1 text-sm font-bold text-[#196b4d] hover:gap-2">
                      {l.label} <ArrowRight className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <Link
            // The local spoke, not a ?category= filter: there is no "Local SEO"
            // category, so that URL listed nothing.
            href="/resources/news/local-seo-updates"
            className="mt-8 flex items-start gap-3 rounded-xl bg-[#f4f3ff] p-4 transition-colors hover:bg-[#eceaff]"
          >
            <Newspaper className="mt-0.5 h-5 w-5 shrink-0 text-[#534AB7]" aria-hidden="true" />
            <span>
              <span className="block text-sm font-black text-[#0a0f2e]">Latest Local SEO &amp; Google Map Pack updates</span>
              <span className="mt-1 block text-sm text-[#566070]">Read current local-search news, Google Business Profile changes and practical ranking updates.</span>
            </span>
            <ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-[#534AB7]" aria-hidden="true" />
          </Link>
        </div>

        {/* divider link */}
        <div className="mt-12 text-center">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[#566070]">
            See the proof behind every service
          </p>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#534AB7] transition-colors hover:opacity-80"
          >
            Browse verified case studies <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
 
      </div>
    </section>
  );
}
 
