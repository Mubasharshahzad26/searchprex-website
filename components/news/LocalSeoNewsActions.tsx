import Link from "next/link";
import { ArrowRight, ClipboardCheck, MapPinned } from "lucide-react";

export default function LocalSeoNewsActions() {
  return (
    <section aria-labelledby="local-seo-resources" className="mb-10">
      <div className="mb-4">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">Practical next steps</p>
        <h2 id="local-seo-resources" className="mt-1 text-xl font-bold text-slate-950">Local SEO resources</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link href="/resources/google-business-profile-checklist" className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-emerald-800/40 hover:shadow-sm">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-800"><ClipboardCheck className="h-5 w-5" /></span>
          <span><span className="block font-semibold text-slate-950">Google Business Profile checklist</span><span className="mt-1 block text-sm leading-5 text-slate-600">Review profile details, customer trust signals and routine checks.</span><span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-emerald-900">Open checklist <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></span>
        </Link>
        <Link href="/services/local-seo" className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-emerald-800/40 hover:shadow-sm">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-800"><MapPinned className="h-5 w-5" /></span>
          <span><span className="block font-semibold text-slate-950">Local SEO strategy and support</span><span className="mt-1 block text-sm leading-5 text-slate-600">See how local visibility, location pages and conversion paths fit together.</span><span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-emerald-900">Explore the service <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></span>
        </Link>
      </div>
    </section>
  );
}
