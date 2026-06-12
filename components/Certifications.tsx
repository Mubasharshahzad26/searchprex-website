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
 
/* Left block — fills the card edge-to-edge like Toptal's expert photo */
function Mark({ isArticle }: { isArticle: boolean }) {
  if (isArticle) {
    return (
      <span className="flex w-20 shrink-0 items-center justify-center self-stretch sm:w-24"
        style={{ background: "rgba(83,74,183,0.10)" }}>
        <PenLine className="h-7 w-7" style={{ color: PURPLE }} />
      </span>
    );
  }
  return (
    <span className="flex w-20 shrink-0 items-center justify-center self-stretch text-xl font-black text-white sm:w-24"
      style={{ background: SEMRUSH }} aria-label="Semrush">
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
    /* div (not section) — seamlessly continues the hero (no divider, Toptal style).
       No heading: cards start immediately so they sit right under the hero photo,
       with round side arrows exactly like Toptal's expert carousel. */
    <div className="bg-transparent pt-0 pb-8">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
 
        {/* Slider with Toptal-style side arrows */}
        <div className="relative">
          <button onClick={prev} aria-label="Previous"
            className="absolute -left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#cbd0db] bg-white text-[#64748b] shadow-md transition-all hover:border-[#534AB7] hover:text-[#534AB7] sm:-left-4">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={next} aria-label="Next"
            className="absolute -right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#cbd0db] bg-white text-[#64748b] shadow-md transition-all hover:border-[#534AB7] hover:text-[#534AB7] sm:-right-4">
            <ChevronRight className="h-4 w-4" />
          </button>
 
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
                    className={`group flex shrink-0 basis-[calc(100%-0.75rem)] items-stretch overflow-hidden rounded-md bg-white transition-all hover:-translate-y-0.5 hover:shadow-md sm:basis-[calc(50%-0.375rem)] lg:basis-[calc(25%-0.5625rem)] ${
                      featured ? "border-2" : "border border-[#e5e7eb]"
                    }`}
                    style={featured ? { borderColor: PURPLE } : undefined}
                  >
                    {/* Left "photo" block — Toptal expert-photo slot */}
                    <Mark isArticle={c.isArticle} />
 
                    {/* Right content — Name / role / PREVIOUSLY-AT pattern */}
                    <div className="min-w-0 flex-1 px-3.5 py-3">
                      <p className="truncate text-sm font-bold leading-tight text-[#1c1c24]">{c.specialty}</p>
                      <div className="mt-1 flex items-center gap-1">
                        {c.isArticle
                          ? <PenLine className="h-3 w-3 shrink-0" style={{ color: PURPLE }} />
                          : <BadgeCheck className="h-3 w-3 shrink-0" style={{ color: GREEN }} />}
                        <span className="truncate text-[11px] text-[#5b6472]">
                          {c.isArticle ? "Published article" : "Verified credential"}
                        </span>
                      </div>
                      <p className="mt-2.5 text-[9px] font-semibold uppercase tracking-widest text-[#94a3b8]">
                        {c.credType}
                      </p>
                      <p className="truncate text-[13px] font-black tracking-tight text-[#1c1c24]">
                        {c.source}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
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
 