"use client";
 
import { useState } from "react";
import { Play, Youtube, CheckCircle, TrendingUp, Users, Award } from "lucide-react";
 
const videos = [
  {
    id: "YOUR_VIDEO_ID_1",
    platform: "youtube",
    title: "How We Grew SMK Store from 0 to 285% More Indexed Pages",
    description: "Full GSC screen recording — crawl budget fix, sitemap submission, and mass URL resubmission strategy that got 10,000+ product pages indexed.",
    category: "Case Study",
    duration: "8:24",
    stats: [
      { label: "Pages Indexed", value: "+285%" },
      { label: "Organic Traffic", value: "+180%" },
    ],
    thumbnail: null, // Will use YouTube thumbnail once ID added
  },
  {
    id: "YOUR_VIDEO_ID_2",
    platform: "youtube",
    title: "Local SEO for Law Firms — Real Client Results Walkthrough",
    description: "Live Ahrefs + GSC screen recording showing how we took a Chicago law firm from page 5 to top 3 in 90 days.",
    category: "Client Results",
    duration: "12:10",
    stats: [
      { label: "Ranking Improved", value: "Pg 5 → Top 3" },
      { label: "Leads Increased", value: "+320%" },
    ],
    thumbnail: null,
  },
  {
    id: "YOUR_VIDEO_ID_3",
    platform: "youtube",
    title: "Founder's SEO Strategy — How SearchPrex Works",
    description: "Mubashar walks through the exact SEO framework used for every client — no fluff, just the process that delivers results.",
    category: "Our Process",
    duration: "5:45",
    stats: [
      { label: "Clients Served", value: "20+" },
      { label: "Avg. Result Time", value: "90 days" },
    ],
    thumbnail: null,
  },
];
 
function VideoCard({ video, index }: { video: typeof videos[0]; index: number }) {
  const [playing, setPlaying] = useState(false);
 
  const categoryColors: Record<string, string> = {
    "Case Study": "bg-[#EEEDFE] text-[#534AB7]",
    "Client Results": "bg-emerald-50 text-emerald-700",
    "Our Process": "bg-blue-50 text-blue-700",
  };
 
  return (
    <div className="flex flex-col rounded-2xl border border-[#e5e7eb] overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
 
      {/* Video embed / placeholder */}
      <div className="relative aspect-video bg-[#0a0f2e] group">
        {playing && video.id !== "YOUR_VIDEO_ID_1" && video.id !== "YOUR_VIDEO_ID_2" && video.id !== "YOUR_VIDEO_ID_3" ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            {/* Gradient placeholder thumbnail */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f2e] via-[#1a3c8f] to-[#534AB7] flex items-center justify-center">
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
                backgroundSize: "30px 30px",
              }} />
 
              {/* Stats overlay */}
              <div className="relative z-10 text-center">
                <div className="flex gap-6 mb-4">
                  {video.stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-2xl font-black text-white">{stat.value}</p>
                      <p className="text-blue-200 text-xs font-medium">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-white/60 text-xs">Screen recording coming soon</p>
              </div>
 
              {/* Duration badge */}
              <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
                {video.duration}
              </div>
 
              {/* YouTube badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                <Youtube className="h-3 w-3" />
                YouTube
              </div>
            </div>
 
            {/* Play button overlay */}
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex items-center justify-center group/play z-20"
            >
              <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center transition-all group-hover/play:scale-110 group-hover/play:bg-white/20">
                <Play className="h-7 w-7 text-white fill-white ml-1" />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover/play:bg-black/10 transition-colors rounded-none" />
            </button>
          </>
        )}
      </div>
 
      {/* Card content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${categoryColors[video.category]}`}>
            {video.category}
          </span>
        </div>
        <h3 className="text-[#0a0f2e] font-black text-lg leading-snug mb-2 flex-1">
          {video.title}
        </h3>
        <p className="text-[#64748b] text-sm leading-relaxed mb-4">
          {video.description}
        </p>
        <div className="flex items-center gap-3 pt-4 border-t border-[#e5e7eb]">
          <div className="h-8 w-8 rounded-full bg-[#EEEDFE] flex items-center justify-center flex-shrink-0">
            <span className="text-[#534AB7] font-black text-xs">M</span>
          </div>
          <div>
            <p className="text-xs font-bold text-[#0a0f2e]">Mubashar Shahzad</p>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-[#534AB7]" />
              <span className="text-[10px] text-[#534AB7] font-semibold">Verified SEO Expert</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default function VideoSection() {
  return (
    <section className="py-20 bg-[#f8f9fc] border-t border-[#e5e7eb]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
 
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-4 py-2 mb-4">
              <Youtube className="h-4 w-4 text-red-600" />
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest">Watch Us Work</span>
            </div>
            <h2 className="text-4xl font-black text-[#0a0f2e] leading-tight mb-3">
              Real Results. <span className="text-[#534AB7]">On Screen.</span>
            </h2>
            <p className="text-[#64748b] text-lg max-w-xl">
              No stock photos. No made-up stats. Watch actual GSC screen recordings, Ahrefs walkthroughs, and real client results — unfiltered.
            </p>
          </div>
 
          {/* Trust pills */}
          <div className="flex flex-wrap gap-3 lg:flex-col lg:items-end">
            <div className="flex items-center gap-2 bg-white border border-[#e5e7eb] rounded-full px-4 py-2">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <span className="text-xs font-semibold text-[#374151]">Real GSC Data</span>
            </div>
            <div className="flex items-center gap-2 bg-white border border-[#e5e7eb] rounded-full px-4 py-2">
              <Users className="h-4 w-4 text-[#534AB7]" />
              <span className="text-xs font-semibold text-[#374151]">Real Clients</span>
            </div>
            <div className="flex items-center gap-2 bg-white border border-[#e5e7eb] rounded-full px-4 py-2">
              <Award className="h-4 w-4 text-amber-500" />
              <span className="text-xs font-semibold text-[#374151]">Verified Results</span>
            </div>
          </div>
        </div>
 
        {/* Video grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, i) => (
            <VideoCard key={video.id + i} video={video} index={i} />
          ))}
        </div>
 
        {/* Coming soon banner */}
        <div className="mt-12 rounded-2xl bg-[#0a0f2e] px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
              <Youtube className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">More videos coming weekly</p>
              <p className="text-blue-300 text-xs">Subscribe to our YouTube channel for new SEO walkthroughs every week</p>
            </div>
          </div>
          <a
            href="https://www.youtube.com/@SearchPrex"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm whitespace-nowrap"
          >
            <Youtube className="h-4 w-4" />
            Subscribe on YouTube
          </a>
        </div>
 
      </div>
    </section>
  );
}
 













