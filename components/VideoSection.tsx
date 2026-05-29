
"use client";
 
import { useState, useEffect, useCallback } from "react";
import { Play, Youtube, CheckCircle, TrendingUp, Users, Award, X } from "lucide-react";
 
interface Video {
  id: string | null;            // YouTube video ID — null means "coming soon"
  title: string;
  description: string;
  category: string;
  duration: string;
  stats: { label: string; value: string }[];
}
 
const videos: Video[] = [
  {
    id: "Y5PxSECNGP0",          // ✅ live video
    title: "How We Grew SMK Store from 0 to 285% More Indexed Pages",
    description: "Full GSC screen recording — crawl budget fix, sitemap submission, and mass URL resubmission strategy that got 10,000+ product pages indexed.",
    category: "Case Study",
    duration: "0:14",
    stats: [
      { label: "Pages Indexed", value: "+285%" },
      { label: "Organic Traffic", value: "+180%" },
    ],
  },
  {
    id: null,                    // coming soon — add ID later
    title: "Local SEO for Law Firms — Real Client Results Walkthrough",
    description: "Live Ahrefs + GSC screen recording showing how we took a Chicago law firm from page 5 to top 3 in 90 days.",
    category: "Client Results",
    duration: "12:10",
    stats: [
      { label: "Ranking Improved", value: "Pg 5 → Top 3" },
      { label: "Leads Increased", value: "+320%" },
    ],
  },
  {
    id: null,                    // coming soon — add ID later
    title: "Founder's SEO Strategy — How SearchPrex Works",
    description: "Mubashar walks through the exact SEO framework used for every client — no fluff, just the process that delivers results.",
    category: "Our Process",
    duration: "5:45",
    stats: [
      { label: "Clients Served", value: "20+" },
      { label: "Avg. Result Time", value: "90 days" },
    ],
  },
];
 
const categoryColors: Record<string, string> = {
  "Case Study": "bg-[#EEEDFE] text-[#534AB7]",
  "Client Results": "bg-emerald-50 text-emerald-700",
  "Our Process": "bg-blue-50 text-blue-700",
};
 
/* ── VIDEO CARD ── */
function VideoCard({ video, onPlay }: { video: Video; onPlay: (id: string) => void }) {
  const isLive = !!video.id;
  // YouTube auto-thumbnail for live videos
  const thumb = video.id ? `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg` : null;
 
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Thumbnail / placeholder */}
      <div className="group relative aspect-video bg-[#0a0f2e]">
        {/* Real YT thumbnail (live videos) */}
        {thumb && (
          <img
            src={thumb}
            alt={video.title}
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => {
              // fallback to hqdefault if maxres missing
              (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
            }}
          />
        )}
 
        {/* Gradient overlay (always — keeps text readable + used as full bg for coming-soon) */}
        <div
          className={`absolute inset-0 flex items-center justify-center ${
            thumb
              ? "bg-gradient-to-t from-[#0a0f2e]/85 via-[#0a0f2e]/30 to-transparent"
              : "bg-gradient-to-br from-[#0a0f2e] via-[#1a3c8f] to-[#534AB7]"
          }`}
        >
          {/* dot grid only for coming-soon */}
          {!thumb && (
            <div
              className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "30px 30px" }}
            />
          )}
 
          {/* Stats / coming-soon text — only on coming-soon cards */}
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
 
        {/* duration badge */}
        <div className="absolute bottom-3 right-3 z-20 rounded bg-black/70 px-2 py-1 text-xs font-bold text-white">
          {video.duration}
        </div>
 
        {/* YouTube badge */}
        <div className="absolute left-3 top-3 z-20 flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-1 text-xs font-bold text-white">
          <Youtube className="h-3 w-3" /> YouTube
        </div>
 
        {/* Play button — only clickable on live videos */}
        {isLive ? (
          <button
            onClick={() => onPlay(video.id!)}
            className="group/play absolute inset-0 z-20 flex items-center justify-center"
            aria-label={`Play ${video.title}`}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/40 bg-red-600/90 shadow-lg transition-all group-hover/play:scale-110 group-hover/play:bg-red-600">
              <Play className="ml-1 h-7 w-7 fill-white text-white" />
            </div>
          </button>
        ) : (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm">
              <Play className="ml-1 h-7 w-7 fill-white/50 text-white/50" />
            </div>
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
        <div className="flex items-center gap-3 border-t border-[#e5e7eb] pt-4">
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
      </div>
    </div>
  );
}
 
/* ── MAIN SECTION ── */
export default function VideoSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
 
  const close = useCallback(() => setActiveId(null), []);
 
  // close on Escape + lock scroll while modal open
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
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2">
              <Youtube className="h-4 w-4 text-red-600" />
              <span className="text-xs font-bold uppercase tracking-widest text-red-600">Watch Us Work</span>
            </div>
            <h2 className="mb-3 text-4xl font-black leading-tight text-[#0a0f2e]">
              Real Results. <span className="text-[#534AB7]">On Screen.</span>
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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, i) => (
            <VideoCard key={i} video={video} onPlay={setActiveId} />
          ))}
        </div>
 
        {/* Subscribe banner */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl bg-[#0a0f2e] px-8 py-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-600">
              <Youtube className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">More videos coming weekly</p>
              <p className="text-xs text-blue-300">Subscribe to our YouTube channel for new SEO walkthroughs every week</p>
            </div>
          </div>
          <a
            href="https://www.youtube.com/@SearchPrex"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-red-700"
          >
            <Youtube className="h-4 w-4" /> Subscribe on YouTube
          </a>
        </div>
      </div>
 
      {/* ── VIDEO MODAL POPUP ── */}
      {activeId && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* close */}
            <button
              onClick={close}
              className="absolute -top-12 right-0 flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors hover:text-white"
              aria-label="Close video"
            >
              Close <X className="h-5 w-5" />
            </button>
 
            {/* responsive 16:9 iframe */}
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