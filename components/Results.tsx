// components/Results.tsx
// Toptal "Collaborations With Leading Brands" pattern (minimal white cards,
// small label, bold title, quiet footer) — applied to verified results.
// Server component, zero JS. Cards link to the case study detail pages.
 
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
 
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
 
const results = [
  {
    label: "Ecommerce SEO · United States",
    title: "+75% US revenue in 2 months by fixing mass non-indexing across a 35,000-product catalog.",
    metric: "+75% revenue",
    href: "/case-studies/ecommerce/smk-store",
  },
  {
    label: "Technical SEO · Michigan, USA",
    title: "+476% organic clicks and +285% indexing rate — recovered from near-zero GSC visibility.",
    metric: "+476% clicks",
    href: "/case-studies/ecommerce/michigan-outdoor-sports",
  },
  {
    label: "Local SEO · United States",
    title: "Top 3 map pack and a Google AI Overview placement — from zero local visibility in 60 days.",
    metric: "Top 3 maps",
    href: "/case-studies/hvac/local-hvac-services",
  },
];
 
export default function Results() {
  return (
    <section className="bg-[#f8f9fc] py-20" id="results">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
 
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
            Results With Real Businesses
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#64748b]">
            Every number below comes straight from Google Search Console — most are backed
            by live screen recordings, not edited screenshots.
          </p>
        </div>
 
        {/* Minimal Toptal-style cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {results.map((r) => (
            <Link key={r.href} href={r.href}
              className="group flex flex-col rounded-xl border border-[#e5e7eb] bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-lg">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-widest" style={{ color: "#534AB7" }}>
                {r.label}
              </p>
              <h3 className="mb-6 text-lg font-black leading-snug text-[#0a0f2e]">{r.title}</h3>
              <div className="mt-auto flex items-center justify-between border-t border-[#f1f5f9] pt-4">
                <span className="inline-flex items-center gap-1.5 text-sm font-black" style={{ color: GREEN_DARK }}>
                  <ShieldCheck className="h-4 w-4" /> {r.metric}
                </span>
                <ArrowRight className="h-4 w-4 text-[#94a3b8] transition-all group-hover:translate-x-1 group-hover:text-[#0a0f2e]" />
              </div>
            </Link>
          ))}
        </div>
 
        {/* Toptal's quiet bottom CTA: "Ready to get started? [button]" */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <span className="text-sm font-semibold text-[#64748b]">Ready to be the next result?</span>
          <Link href="/free-audit"
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
            style={{ background: GREEN }}>
            Get Free SEO Audit <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
 
      </div>
    </section>
  );
}