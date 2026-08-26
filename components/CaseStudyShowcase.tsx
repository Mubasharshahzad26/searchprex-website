"use client";

// components/CaseStudyShowcase.tsx
// A slider of US case studies, each linking to its full write-up.
//
// BUILT AS A SCROLL-SNAP TRACK, NOT A SWAP-ONE-SLIDE-AT-A-TIME CAROUSEL.
// That distinction matters: every card stays in the DOM and in the HTML the
// crawler sees, so the authority signal survives — a carousel that mounts one
// slide at a time hides the other eleven from Google as well as from anyone
// who never clicks. Visitors get the slider feel; the markup stays complete.
//
// Arrows scroll by one card. The track is natively swipeable on touch, tabbable
// by keyboard, and the arrows disable at each end rather than wrapping, so a
// keyboard user always knows where they are.
//
// Thumbnails: five of the twenty case studies have real screenshots. The rest
// get a generated panel built from their headline metric and a per-industry
// gradient — branded and legible, never a stock placeholder.

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, ShieldCheck } from "lucide-react";
import { caseStudies, detailUrl } from "@/app/all-case-studies/data";
import { color, radius } from "@/lib/design-tokens";

// Featured first, then the rest. Twelve is plenty for a homepage slider —
// /all-case-studies remains the destination for the full set.
const shown = [
  ...caseStudies.filter((c) => c.featured),
  ...caseStudies.filter((c) => !c.featured),
].slice(0, 12);

// Per-SEO-type gradients for cards without a screenshot, so the fallback reads
// as a designed thumbnail rather than a missing image.
const gradients: Record<string, string> = {
  "Ecommerce SEO": "linear-gradient(135deg, #534AB7 0%, #1a7d59 100%)",
  "Local SEO": "linear-gradient(135deg, #0e7490 0%, #534AB7 100%)",
  "Technical SEO": "linear-gradient(135deg, #3C3489 0%, #0e7490 100%)",
  "Law Firm SEO": "linear-gradient(135deg, #534AB7 0%, #8a5b08 100%)",
};

export default function CaseStudyShowcase() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    // Honour reduced motion, and fall back to a direct assignment where
    // smooth scrolling is unavailable (some embedded webviews ignore it), so
    // the arrows always move the track.
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof el.scrollBy !== "function") {
      el.scrollLeft += step * dir;
      return;
    }
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <section
      id="case-studies"
      className="border-y py-20 sm:py-24"
      style={{ background: color.white, borderColor: color.border }}
      aria-labelledby="case-studies-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 border-b pb-8 lg:grid-cols-[1fr_auto] lg:items-end"
             style={{ borderColor: color.border }}>
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest"
               style={{ color: color.primary }}>
              US case studies
            </p>
            <h2
              id="case-studies-heading"
              className="text-3xl font-black tracking-tight sm:text-4xl"
              style={{ color: color.ink }}
            >
              SEO Case Studies for US Law Firms, Ecommerce Stores &amp; Local Businesses
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: color.muted }}>
              Named American clients, real reporting periods, and a full write-up behind every
              card — including what went wrong before it went right.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={atStart}
              aria-label="Previous case studies"
              className="flex h-11 w-11 items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#534AB7] focus-visible:ring-offset-2"
              style={{ borderColor: color.borderStrong, color: color.ink }}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={atEnd}
              aria-label="More case studies"
              className="flex h-11 w-11 items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#534AB7] focus-visible:ring-offset-2"
              style={{ borderColor: color.borderStrong, color: color.ink }}
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <ul
          ref={trackRef}
          className="sp-cs-track mt-8 flex snap-x snap-mandatory list-none gap-6 overflow-x-auto p-0 pb-4"
          aria-label="Case studies"
        >
          {shown.map((cs) => {
            const primary = cs.metrics?.[0];
            return (
              <li key={cs.id} className="w-[300px] shrink-0 snap-start sm:w-[340px]">
                <Link
                  href={detailUrl(cs)}
                  className={`group flex h-full flex-col overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${radius.card}`}
                  style={{ background: color.white, borderColor: color.border }}
                >
                  {cs.image ? (
                    <div className="relative aspect-[16/10] overflow-hidden"
                         style={{ background: color.surface }}>
                      <Image
                        src={cs.image}
                        alt={`${cs.client} — ${cs.seoType} result`}
                        fill
                        sizes="340px"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div
                      className="flex aspect-[16/10] flex-col items-center justify-center px-6 text-center"
                      style={{ background: gradients[cs.seoType] ?? gradients["Technical SEO"] }}
                    >
                      <span className="text-4xl font-black tracking-tight tabular-nums text-white">
                        {primary?.v ?? cs.seoType}
                      </span>
                      {primary?.l && (
                        <span className="mt-1 text-[11px] font-bold uppercase tracking-widest text-white/85">
                          {primary.l}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[11px] font-bold uppercase tracking-widest"
                       style={{ color: color.primary }}>
                      {cs.seoType} · {cs.location}
                    </p>
                    <h3 className="mt-2 text-base font-black leading-snug" style={{ color: color.ink }}>
                      {cs.client}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed" style={{ color: color.muted }}>
                      {cs.headline}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-3 border-t pt-4"
                         style={{ borderColor: color.border }}>
                      {primary && (
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black"
                          style={{ background: `${color.success}1a`, color: color.successDark }}
                        >
                          <ShieldCheck className="h-3.5 w-3.5" /> {primary.v}
                        </span>
                      )}
                      <span className="text-xs font-bold underline-offset-4 group-hover:underline"
                            style={{ color: color.primary }}>
                        Read case study
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 text-center">
          <Link
            href="/all-case-studies"
            className="inline-flex items-center gap-1.5 text-sm font-bold"
            style={{ color: color.primary }}
          >
            All {caseStudies.length} case studies <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <style>{`
        .sp-cs-track { scrollbar-width: none; -ms-overflow-style: none; }
        .sp-cs-track::-webkit-scrollbar { display: none; }
        @media (prefers-reduced-motion: reduce) { .sp-cs-track { scroll-behavior: auto; } }
      `}</style>
    </section>
  );
}
