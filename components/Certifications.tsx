
"use client";
 
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, BadgeCheck, BarChart3, Search, MapPin, FileText, PenLine } from "lucide-react";
 
/* ─── THEME ─── */
const PURPLE = "#534AB7";
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
 
/*
  ⚠️ EDIT CERT NAMES (specialty) ⚠️
  Har Semrush PDF khol ke uska EXACT naam daalo. Links 100% real.
  Last card = real published article (Experience proof).
*/
const credentials = [
  {
    specialty: "SEO Fundamentals",        // ← verify with PDF
    icon: Search,
    credType: "Certified By",
    source: "Semrush",
    href: "https://static.semrush.com/academy/certificates/e45cf0b323/mubashar-shahzad_25.pdf",
  },
  {
    specialty: "On-Page & Technical SEO",  // ← verify with PDF
    icon: BarChart3,
    credType: "Certified By",
    source: "Semrush",
    href: "https://static.semrush.com/academy/certificates/0053423184/mubashar-shahzad_2.pdf",
  },
  {
    specialty: "Content Strategist · SEO",
    icon: PenLine,
    credType: "Published On",
    source: "HVAC Services Team",
    href: "https://www.hvacservicesteam.com/blog/best-time-to-install-a-new-ac-near-me-california-2026",
  },
  {
    specialty: "Keyword Research",         // ← verify with PDF
    icon: FileText,
    credType: "Certified By",
    source: "Semrush",
    href: "https://static.semrush.com/academy/certificates/7ec9b0d154/mubashar-shahzad_2.pdf",
  },
  {
    specialty: "Local SEO",                // ← verify with PDF
    icon: MapPin,
    credType: "Certified By",
    source: "Semrush",
    href: "https://static.semrush.com/academy/certificates/e2cb11d7cb/mubashar-shahzad_26.pdf",
  },
];
 
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
    <section className="border-t border-[#d4d8e3] bg-[#e9ebf0] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
 
        {/* Header */}
        <div className="mb-7 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: GREEN_DARK }}>
              Verified Credentials
            </p>
            <h2 className="text-xl font-black tracking-tight text-[#1c1c24] sm:text-2xl">
              Credentials &amp; Published Work
            </h2>
          </div>
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
 
        {/* Slider viewport */}
        <div className="overflow-hidden">
          <div
            className="flex gap-3 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(calc(-${index} * (100% / 4 + 0.75rem)))` }}
          >
            {credentials.map((c, i) => {
              const Icon = c.icon;
              const featured = i === index;
              const isArticle = c.credType === "Published On";
              return (
                <a
                  key={c.href}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${c.specialty} — ${c.source}`}
                  className={`group flex shrink-0 basis-[calc(100%-0.75rem)] overflow-hidden rounded-xl bg-white transition-all hover:-translate-y-0.5 sm:basis-[calc(50%-0.375rem)] lg:basis-[calc(25%-0.5625rem)] ${
                    featured
                      ? "border-2 shadow-[0_4px_20px_rgba(83,74,183,0.16)]"
                      : "border border-[#e2e8f0] hover:shadow-md"
                  }`}
                  style={featured ? { borderColor: PURPLE } : undefined}
                >
                  {/* Photo (left) */}
                  <div className="relative w-[78px] shrink-0 bg-gradient-to-b from-[#dfe3ec] to-[#cfd5e3]">
                    <Image
                      src="/images/mubashar-shahzad.jpg"
                      alt="Mubashar Shahzad"
                      fill
                      className="object-cover object-top"
                    />
                    {featured && <span className="absolute left-0 top-0 h-full w-[3px]" style={{ background: PURPLE }} />}
                  </div>
 
                  {/* Info (right) */}
                  <div className="flex flex-1 flex-col justify-center gap-1 p-3">
                    <p className="text-[11px] font-black leading-tight text-[#1c1c24]">Mubashar Shahzad</p>
                    <div className="flex items-center gap-1.5">
                      <Icon className="h-3 w-3 shrink-0" style={{ color: PURPLE }} />
                      <span className="text-[10px] font-medium leading-tight" style={{ color: PURPLE }}>{c.specialty}</span>
                    </div>
                    <p className="mt-1.5 text-[7.5px] font-bold uppercase tracking-widest text-[#94a3b8]">{c.credType}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-[13px] font-black leading-tight text-[#1c1c24]">{c.source}</span>
                      {isArticle
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
        <div className="mt-6 flex justify-center gap-2">
          {credentials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to credential ${i + 1}`}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === index ? "18px" : "6px",
                background: i === index ? PURPLE : "rgba(83,74,183,0.2)",
              }}
            />
          ))}
        </div>
 
        <p className="mt-5 text-center text-xs text-[#94a3b8]">
          Click any card to verify · Certifications by Semrush &amp; live published work by <span className="font-semibold text-[#475569]">Mubashar Shahzad</span>, Founder
        </p>
 
      </div>
    </section>
  );
}
