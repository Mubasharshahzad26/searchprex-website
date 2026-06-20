// components/Results.tsx
// Premium verified-results section — Semrush-style: eyebrow pill, gradient
// headline, stat cards with gradient top accent (CountUp animates on scroll),
// and polished case cards with hover gradient bar + glow. Server component;
// CountUp is a client child.
 
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import CountUp from "@/components/CountUp";
 
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
    <section className="relative overflow-hidden bg-[#f8f9fc] py-20 sm:py-28" id="results">
      {/* soft gradient accent at top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[#edeffb] to-transparent" />
 
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
 
        <div className="mb-12 text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#534AB7]/15 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#534AB7] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3eb489]" /> Verified · From Google Search Console
          </p>
          <h2 className="text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl lg:text-5xl">
            Results With{" "}
            <span className="bg-gradient-to-r from-[#534AB7] to-[#3eb489] bg-clip-text text-transparent">
              Real Businesses
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#64748b]">
            Every number below comes straight from Google Search Console — most are backed
            by live screen recordings, not edited screenshots.
          </p>
        </div>
 
        {/* premium stat cards — count up on scroll */}
        <div className="mb-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="relative overflow-hidden rounded-2xl border border-[#e9ecf5] bg-white p-7 text-center shadow-sm"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#534AB7] to-[#3eb489]" />
              <div className="bg-gradient-to-r from-[#534AB7] to-[#3eb489] bg-clip-text text-5xl font-black tracking-tight text-transparent sm:text-6xl">
                <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm font-semibold text-[#64748b]">{s.label}</div>
            </div>
          ))}
        </div>
 
        {/* premium case cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {results.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#e9ecf5] bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-xl"
            >
              {/* gradient bar grows on hover */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#534AB7] to-[#3eb489] transition-transform duration-300 group-hover:scale-x-100" />
              <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[#534AB7]">
                {r.label}
              </p>
              <h3 className="mb-6 text-lg font-black leading-snug text-[#0a0f2e]">{r.title}</h3>
              <div className="mt-auto flex items-center justify-between border-t border-[#f1f5f9] pt-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3eb489]/10 px-3 py-1 text-sm font-black text-[#2f9670]">
                  <ShieldCheck className="h-4 w-4" /> {r.metric}
                </span>
                <ArrowRight className="h-4 w-4 text-[#94a3b8] transition-all group-hover:translate-x-1 group-hover:text-[#0a0f2e]" />
              </div>
            </Link>
          ))}
        </div>
 
        {/* bottom CTA */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <span className="text-sm font-semibold text-[#64748b]">Ready to be the next result?</span>
          <Link
            href="/free-audit"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#534AB7] to-[#3eb489] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            Get Free SEO Audit <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
 
      </div>
    </section>
  );
}
 