"use client";
 
import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, BadgeCheck, PenLine } from "lucide-react";
 
/* ─── THEME ─── */
const PURPLE = "#534AB7";
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
const SEMRUSH = "#ff642d";
 
/*
  ⚠️ EDIT CERT NAMES (specialty) ⚠️
  Har Semrush PDF khol ke uska EXACT naam daalo. Links 100% real.
*/
const credentials = [
  { specialty: "SEO Fundamentals",       credType: "Certified by", source: "Semrush",            isArticle: false, href: "https://static.semrush.com/academy/certificates/e45cf0b323/mubashar-shahzad_25.pdf" },
  { specialty: "On-Page & Technical SEO", credType: "Certified by", source: "Semrush",            isArticle: false, href: "https://static.semrush.com/academy/certificates/0053423184/mubashar-shahzad_2.pdf" },
  { specialty: "Content Strategy · SEO",  credType: "Published on", source: "HVAC Services Team", isArticle: true,  href: "https://www.hvacservicesteam.com/blog/best-time-to-install-a-new-ac-near-me-california-2026" },
  { specialty: "Keyword Research",        credType: "Certified by", source: "Semrush",            isArticle: false, href: "https://static.semrush.com/academy/certificates/7ec9b0d154/mubashar-shahzad_2.pdf" },
  { specialty: "Local SEO",               credType: "Certified by", source: "Semrush",            isArticle: false, href: "https://static.semrush.com/academy/certificates/e2cb11d7cb/mubashar-shahzad_26.pdf" },
];
 
/* Brand mark — Semrush "Sr" or article doc */
function Mark({ isArticle }: { isArticle: boolean }) {
  if (isArticle) {
    return (
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ background: "rgba(83,74,183,0.12)" }}>
        <PenLine className="h-5 w-5" style={{ color: PURPLE }} />
      </span>
    );
  }
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-black text-white" style={{ background: SEMRUSH }} aria-label="Semrush">
      Sr
    </span>
  );
}
 
export default function Certifications() {
  const [index, setIndex] = useState(0);
  const total = credentials.length;
 
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);
 
  useEffect(() => {
    const t = setInterval(next, 3500);
    return () => clearInterval(t);
  }, [next]);
 
  return (
    /* div (not section) — seamlessly continues the hero (no divider, Toptal style) */
    <div className="bg-[#e9ebf0] pt-2 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
 
        {/* Top row: tiny label + arrows (no big heading) */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">
            Verified Credentials &amp; Published Work
          </p>
          <div className="flex items-center gap-2">
            <button onClick={prev} aria-label="Previous"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#cbd0db] bg-white text-[#64748b] transition-all hover:border-[#534AB7] hover:text-[#534AB7]">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={next} aria-label="Next"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#cbd0db] bg-white text-[#64748b] transition-all hover:border-[#534AB7] hover:text-[#534AB7]">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
 
        {/* Slider */}
        <div className="overflow-hidden">
          <div
            className="flex gap-3 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(calc(-${index} * (100% / 4 + 0.75rem)))` }}
          >
            {credentials.map((c, i) => {
              const featured = i === index;
              return (
                <a
                  key={c.href}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${c.specialty} — ${c.source}`}
                  className={`group flex shrink-0 basis-[calc(100%-0.75rem)] items-center gap-3 rounded-xl bg-white p-4 transition-all hover:-translate-y-0.5 sm:basis-[calc(50%-0.375rem)] lg:basis-[calc(25%-0.5625rem)] ${
                    featured ? "border-2 shadow-[0_4px_20px_rgba(83,74,183,0.16)]" : "border border-[#e2e8f0] hover:shadow-md"
                  }`}
                  style={featured ? { borderColor: PURPLE } : undefined}
                >
                  <Mark isArticle={c.isArticle} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black leading-tight text-[#1c1c24]">{c.specialty}</p>
                    <div className="mt-1 flex items-center gap-1">
                      <span className="text-[10px] text-[#94a3b8]">{c.credType}</span>
                      <span className="text-[11px] font-bold text-[#1c1c24]">{c.source}</span>
                      {c.isArticle
                        ? <PenLine className="h-3 w-3" style={{ color: PURPLE }} />
                        : <BadgeCheck className="h-3 w-3" style={{ color: GREEN }} />}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
 
        {/* Dots */}
        <div className="mt-5 flex justify-center gap-2">
          {credentials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to credential ${i + 1}`}
              className="h-1.5 rounded-full transition-all"
              style={{ width: i === index ? "18px" : "6px", background: i === index ? PURPLE : "rgba(83,74,183,0.2)" }}
            />
          ))}
        </div>
 
      </div>
    </div>
  );
}
 