// components/Results.tsx
// Verified results — animated gradient stat strip (CountUp) on top of the
// Toptal-style case study cards. Server component; CountUp is a client child
// that animates the numbers as they scroll into view.
 
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import CountUp from "@/components/CountUp";
 
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
 
// Headline numbers — all straight from Google Search Console.
const stats = [
  { to: 476, prefix: "+", suffix: "%", label: "Organic clicks recovered" },
  { to: 75, prefix: "+", suffix: "%", label: "US revenue growth" },
  { to: 285, prefix: "+", suffix: "%", label: "Product pages indexed" },
];
 
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
 
        {/* Animated gradient stat strip — counts up on scroll */}
        <div className="mb-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="bg-gradient-to-r from-[#534AB7] to-[#3eb489] bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl">
                <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm font-semibold text-[#64748b]">{s.label}</div>
            </div>
          ))}
        </div>
 
        {/* Minimal Toptal-style cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {results.map((r) => (
            <Link key={r.href} href={r.href}
              className="group flex flex-col rounded-xl border border-[#e5e7eb] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
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
 