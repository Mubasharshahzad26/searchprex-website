"use client";
 
import { useState, useEffect, useCallback, useRef } from "react";
import { Play, Youtube, CheckCircle, TrendingUp, Users, Award, X, Linkedin, ArrowRight } from "lucide-react";
 
/* Toptal green accent */
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
const MUBASHAR_LINKEDIN = "https://www.linkedin.com/in/mubashar-shahzad-seo/";
 
interface Video {
  id: string | null;
  title: string;
  description: string;
  category: string;
  duration: string;
  stats: { label: string; value: string }[];
}
 
const videos: Video[] = [
  {
    id: "Y5PxSECNGP0",
    title: "Michigan Outdoor Sports — Real SEO Performance Walkthrough",
    description: "Live GSC screen recording showing the real organic performance growth we delivered for Michigan Outdoor Sports — clicks, impressions, and indexed pages, unfiltered.",
    category: "Client Results",
    duration: "0:14",
    stats: [
      { label: "Organic Clicks", value: "+476%" },
      { label: "Pages Indexed", value: "12K+" },
    ],
  },
  {
    id: "cI3BwxqaJbw",
    title: "Michigan Outdoor Sports — 0 to 285% Indexing Rate",
    description: "Full GSC case study — crawl budget fix, sitemap submission, and mass URL resubmission strategy that took Michigan Outdoor Sports from near-zero to a 285% indexing rate.",
    category: "Case Study",
    duration: "12:10",
    stats: [
      { label: "Indexing Rate", value: "+285%" },
      { label: "Organic Traffic", value: "+180%" },
    ],
  },
  {
    id: "g_1TfDU4YeA",
    title: "Local Services — Top Rank + AI Overview Domination",
    description: "Live walkthrough showing how we pushed a local service business to top map-pack rankings and captured Google's AI Overview placements for high-intent local searches.",
    category: "Local SEO",
    duration: "10:30",
    stats: [
      { label: "Local Ranking", value: "Top 3" },
      { label: "AI Overview", value: "Featured" },
    ],
  },
  {
    id: "gFod-dTY-bg",
    title: "SMK Store — Revenue Boosted by 75% (United States)",
    description: "Full case study on how organic SEO restructuring and product-page optimization boosted SMK Store's US revenue by 75% — real GSC and sales data, unfiltered.",
    category: "Case Study",
    duration: "9:15",
    stats: [
      { label: "Revenue Growth", value: "+75%" },
      { label: "Market", value: "USA" },
    ],
  },
];
 
const categoryColors: Record<string, string> = {
  "Case Study": "bg-[#EEEDFE] text-[#534AB7]",
  "Client Results": "bg-emerald-50 text-emerald-700",
  "Our Process": "bg-blue-50 text-blue-700",
  "Local SEO": "bg-amber-50 text-amber-700",
};
 
/* ── VIDEO CARD ── */
function VideoCard({ video, onPlay }: { video: Video; onPlay: (id: string) => void }) {
  const isLive = !!video.id;
  const thumb = video.id ? `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg` : null;
 
  const [hovering, setHovering] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const ctaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
 
  const handleEnter = () => {
    if (!isLive) return;
    setHovering(true);
    // 5 sec baad CTA dikhe
    ctaTimer.current = setTimeout(() => setShowCta(true), 5000);
  };
  const handleLeave = () => {
    setHovering(false);
    setShowCta(false);
    if (ctaTimer.current) clearTimeout(ctaTimer.current);
  };
 
  useEffect(() => () => { if (ctaTimer.current) clearTimeout(ctaTimer.current); }, []);
 
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Thumbnail / hover preview */}
      <div
        className="group relative aspect-video cursor-pointer bg-[#0a0f2e]"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={() => isLive && onPlay(video.id!)}
      >
        {/* Hover muted autoplay preview (live videos only) */}
        {isLive && hovering ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.id}&modestbranding=1&rel=0`}
            allow="autoplay; encrypted-media"
            title={`${video.title} preview`}
          />
        ) : (
          <>
            {/* YouTube thumbnail */}
            {thumb && (
              <img
                src={thumb}
                alt={video.title}
                className="absolute inset-0 h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                }}
              />
            )}
 
            <div
              className={`absolute inset-0 flex items-center justify-center ${
                thumb
                  ? "bg-gradient-to-t from-[#0a0f2e]/85 via-[#0a0f2e]/30 to-transparent"
                  : "bg-gradient-to-br from-[#0a0f2e] via-[#1a3c8f] to-[#534AB7]"
              }`}
            >
              {!thumb && (
                <div
                  className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "30px 30px" }}
                />
              )}
              {!isLive && (
                <div className="relative z-10 text-center">
                  <div className="mb-4 flex gap-6">
                    {video.stats.map((s) => (
                      <div key={s.label} className="text-center">
                        <p className="text-2xl font-black text-white">{s.value}</p>
                        <p className="text-xs font-medium text-blue-200">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-white/60">Screen recording coming soon</p>
                </div>
              )}
            </div>
 
            {/* Play button (GREEN now) */}
            {isLive ? (
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/40 shadow-lg transition-all group-hover:scale-110"
                  style={{ background: GREEN }}
                >
                  <Play className="ml-1 h-7 w-7 fill-white text-white" />
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm">
                  <Play className="ml-1 h-7 w-7 fill-white/50 text-white/50" />
                </div>
              </div>
            )}
          </>
        )}
 
        {/* duration badge */}
        <div className="absolute bottom-3 right-3 z-30 rounded bg-black/70 px-2 py-1 text-xs font-bold text-white">
          {video.duration}
        </div>
 
        {/* YouTube badge (GREEN now) */}
        <div
          className="absolute left-3 top-3 z-30 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold text-white"
          style={{ background: GREEN }}
        >
          <Youtube className="h-3 w-3" /> YouTube
        </div>
 
        {/* 5-sec hover CTA overlay */}
        {isLive && showCta && (
          <div className="absolute inset-x-0 bottom-0 z-40 flex items-center justify-between gap-2 bg-gradient-to-t from-[#0a0f2e] to-transparent px-4 pb-4 pt-10">
            <span className="text-xs font-semibold text-white/90">Like what you see?</span>
            <button
              onClick={(e) => { e.stopPropagation(); onPlay(video.id!); }}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-white transition-colors"
              style={{ background: GREEN }}
            >
              Watch full video <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
 
      {/* content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${categoryColors[video.category]}`}>
            {video.category}
          </span>
        </div>
        <h3 className="mb-2 flex-1 text-lg font-black leading-snug text-[#0a0f2e]">{video.title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-[#64748b]">{video.description}</p>
 
        {/* Author row + LinkedIn */}
        <div className="flex items-center justify-between border-t border-[#e5e7eb] pt-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#EEEDFE]">
              <span className="text-xs font-black text-[#534AB7]">M</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#0a0f2e]">Mubashar Shahzad</p>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-[#534AB7]" />
                <span className="text-[10px] font-semibold text-[#534AB7]">Verified SEO Expert</span>
              </div>
            </div>
          </div>
          <a
            href={MUBASHAR_LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#64748b] transition-colors hover:border-[#0a66c2] hover:bg-[#0a66c2] hover:text-white"
            aria-label="Mubashar Shahzad LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
 
/* ── MAIN SECTION ── */
export default function VideoSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const close = useCallback(() => setActiveId(null), []);
 
  useEffect(() => {
    if (!activeId) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeId, close]);
 
  return (
    <section className="border-t border-[#e5e7eb] bg-[#f8f9fc] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            {/* WATCH US WORK badge (GREEN now) */}
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2"
              style={{ background: "rgba(62,180,137,0.12)", border: "1px solid rgba(62,180,137,0.35)" }}
            >
              <Youtube className="h-4 w-4" style={{ color: GREEN_DARK }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: GREEN_DARK }}>Watch Us Work</span>
            </div>
            <h2 className="mb-3 text-4xl font-black leading-tight text-[#0a0f2e]">
              Real Results. <span style={{ color: GREEN }}>On Screen.</span>
            </h2>
            <p className="max-w-xl text-lg text-[#64748b]">
              No stock photos. No made-up stats. Watch actual GSC screen recordings, Ahrefs walkthroughs, and real client results — unfiltered.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:flex-col lg:items-end">
            <div className="flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-4 py-2">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <span className="text-xs font-semibold text-[#374151]">Real GSC Data</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-4 py-2">
              <Users className="h-4 w-4 text-[#534AB7]" />
              <span className="text-xs font-semibold text-[#374151]">Real Clients</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-4 py-2">
              <Award className="h-4 w-4 text-amber-500" />
              <span className="text-xs font-semibold text-[#374151]">Verified Results</span>
            </div>
          </div>
        </div>
 
        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {videos.map((video, i) => (
            <VideoCard key={i} video={video} onPlay={setActiveId} />
          ))}
        </div>
      </div>
 
      {/* ── VIDEO MODAL POPUP ── */}
      {activeId && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={close}
              className="absolute -top-12 right-0 flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors hover:text-white"
              aria-label="Close video"
            >
              Close <X className="h-5 w-5" />
            </button>
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${activeId}?autoplay=1&rel=0&modestbranding=1`}
                title="SearchPrex case study video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
 




























