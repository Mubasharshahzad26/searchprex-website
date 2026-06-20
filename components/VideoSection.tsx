"use client";
 
// components/VideoSection.tsx
// Premium proof grid — Semrush-style: eyebrow pill, gradient headline, polished
// rounded-2xl video cards with hover lift + accent glow and a gradient play
// button. Uses the 4 real case-study GSC screen recordings. Click opens a modal.
 
import { useState } from "react";
import { Play, X } from "lucide-react";
 
const videos = [
  { id: "gFod-dTY-bg", client: "SMK Store", note: "Ecommerce · +75% US revenue" },
  { id: "Y5PxSECNGP0", client: "Michigan Outdoor Sports", note: "Technical · +476% clicks" },
  { id: "g_1TfDU4YeA", client: "Local HVAC Services", note: "Local · Top 3 map pack" },
  { id: "zRcTc2HqDwU", client: "Glendora Kitchens", note: "Local · Top 10 rankings" },
];
 
export default function VideoSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
 
  return (
    <section className="relative overflow-hidden bg-[#f7f8fc] py-20 sm:py-28" id="video-proof">
      {/* soft gradient accent at top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[#edeffb] to-transparent" />
 
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
 
        <div className="mb-12 text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#534AB7]/15 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#534AB7] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3eb489]" /> Proof · Live GSC recordings
          </p>
          <h2 className="text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl lg:text-5xl">
            Why Businesses Choose{" "}
            <span className="bg-gradient-to-r from-[#534AB7] to-[#3eb489] bg-clip-text text-transparent">
              SearchPrex
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#64748b]">
            Don&apos;t take our word for it — watch the live Google Search Console screen
            recordings behind each result.
          </p>
        </div>
 
        {/* premium video grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((v) => (
            <button
              key={v.id}
              onClick={() => setActiveVideo(v.id)}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#0a0f2e] text-left shadow-md ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
            >
              <img
                src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                alt={`${v.client} — live GSC screen recording`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f2e]/95 via-[#0a0f2e]/35 to-transparent" />
 
              {/* accent glow ring on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-2 ring-inset ring-[#3eb489]/70 transition-opacity duration-300 group-hover:opacity-100" />
 
              {/* center gradient play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#534AB7] to-[#3eb489] shadow-xl transition-transform duration-300 group-hover:scale-110">
                  <Play className="ml-0.5 h-6 w-6 fill-white text-white" />
                </span>
              </div>
 
              {/* bottom label */}
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-sm font-bold text-white">{v.client}</p>
                <p className="mt-0.5 text-[11px] text-white/70">{v.note}</p>
              </div>
            </button>
          ))}
        </div>
 
      </div>
 
      {/* video modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-12 right-0 flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors hover:text-white"
              aria-label="Close video"
            >
              Close <X className="h-5 w-5" />
            </button>
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1`}
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
 