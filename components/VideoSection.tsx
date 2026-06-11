"use client";
 
// components/VideoSection.tsx
// Toptal "Why Organizations Choose Toptal" pattern — a clean grid of video
// cards with a dark gradient and a quiet "Watch the video" label bottom-left.
// Uses the 4 real case-study GSC screen recordings. Click opens a modal.
 
import { useState } from "react";
import { Play, X } from "lucide-react";
 
const GREEN = "#3eb489";
 
const videos = [
  { id: "gFod-dTY-bg", client: "SMK Store", note: "Ecommerce · +75% US revenue" },
  { id: "Y5PxSECNGP0", client: "Michigan Outdoor Sports", note: "Technical · +476% clicks" },
  { id: "g_1TfDU4YeA", client: "Local HVAC Services", note: "Local · Top 3 map pack" },
  { id: "zRcTc2HqDwU", client: "Glendora Kitchens", note: "Local · Top 10 rankings" },
];
 
export default function VideoSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
 
  return (
    <section className="bg-white py-20" id="video-proof">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
 
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
            Why Businesses Choose SearchPrex
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#64748b]">
            Don&apos;t take our word for it — watch the live Google Search Console screen
            recordings behind each result.
          </p>
        </div>
 
        {/* Toptal-style video grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((v) => (
            <button key={v.id} onClick={() => setActiveVideo(v.id)}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-[#0a0f2e] text-left">
              <img
                src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                alt={`${v.client} — live GSC screen recording`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f2e]/90 via-[#0a0f2e]/30 to-transparent" />
 
              {/* Center play (appears on hover, desktop) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg"
                  style={{ background: GREEN }}>
                  <Play className="ml-0.5 h-5 w-5 fill-white text-white" />
                </span>
              </div>
 
              {/* Quiet bottom-left label — exact Toptal pattern */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <Play className="h-3 w-3 fill-white" /> Watch the video
                </p>
                <p className="mt-0.5 text-[11px] text-white/70">{v.client} · {v.note}</p>
              </div>
            </button>
          ))}
        </div>
 
      </div>
 
      {/* Video modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}>
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActiveVideo(null)}
              className="absolute -top-12 right-0 flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors hover:text-white"
              aria-label="Close video">
              Close <X className="h-5 w-5" />
            </button>
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
              <iframe className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1`}
                title="SearchPrex case study video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
 