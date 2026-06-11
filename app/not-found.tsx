// app/not-found.tsx
// Custom 404 — brand-aligned. Gives lost visitors clear next steps instead of
// a dead end: home, case studies, free audit, or phone. Good for UX + keeps
// crawl/user signals healthy.
 
import Link from "next/link";
import { ArrowRight, Home, FolderSearch, BarChart3, Phone } from "lucide-react";
 
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
 
export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center bg-[#eaecf3]">
      <div className="mx-auto w-full max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
 
        <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: GREEN_DARK }}>
          404 — Page not found
        </p>
        <h1 className="mb-4 text-5xl font-black tracking-tight text-[#0a0f2e] sm:text-6xl">
          This page got <span style={{ color: GREEN }}>de-indexed.</span>
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-[#475569]">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
          Don&apos;t worry — unlike Google, we&apos;ll get you back on track instantly.
        </p>
 
        {/* Primary actions */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          <Link href="/"
            className="group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
            style={{ background: GREEN }}>
            <Home className="h-4 w-4" /> Go to Homepage
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/case-studies"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[#0a0f2e] px-7 py-3.5 text-sm font-bold text-[#0a0f2e] transition-all hover:-translate-y-0.5">
            <FolderSearch className="h-4 w-4" /> View Case Studies
          </Link>
        </div>
 
        {/* Helpful links */}
        <div className="mx-auto grid max-w-xl gap-3 sm:grid-cols-2">
          <Link href="/free-audit"
            className="group flex items-center justify-between rounded-2xl border border-[#d4d8e3] bg-white p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-lg">
            <div>
              <p className="flex items-center gap-2 font-bold text-[#0a0f2e]">
                <BarChart3 className="h-4 w-4" style={{ color: GREEN }} /> Free SEO Audit
              </p>
              <p className="mt-1 text-xs text-[#64748b]">Founder-reviewed, within 24 hours</p>
            </div>
            <ArrowRight className="h-4 w-4 text-[#64748b] transition-transform group-hover:translate-x-1" />
          </Link>
          <a href="tel:+923106526316"
            className="group flex items-center justify-between rounded-2xl border border-[#d4d8e3] bg-white p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-lg">
            <div>
              <p className="flex items-center gap-2 font-bold text-[#0a0f2e]">
                <Phone className="h-4 w-4" style={{ color: GREEN }} /> Talk to Us
              </p>
              <p className="mt-1 text-xs text-[#64748b]">+92 310 652 6316</p>
            </div>
            <ArrowRight className="h-4 w-4 text-[#64748b] transition-transform group-hover:translate-x-1" />
          </a>
        </div>
 
      </div>
    </main>
  );
}