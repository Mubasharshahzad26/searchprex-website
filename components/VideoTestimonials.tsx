"use client";

import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import { radius } from "@/lib/design-tokens";
import { SectionHeading } from "@/components/layout";

// Placeholder data for video testimonials.
// You should update these with real YouTube IDs or video URLs once you have them.
const testimonials = [
  {
    id: "testim-1",
    clientName: "David M.",
    firm: "Personal Injury Firm, TX",
    quote: "SearchPrex completely transformed our organic pipeline. We went from relying heavily on Google Ads to dominating the local map pack in under 4 months.",
    thumbnail: "/images/video-placeholder-1.jpg", 
    videoId: "dQw4w9WgXcQ", // Placeholder YouTube ID
  },
  {
    id: "testim-2",
    clientName: "Sarah K.",
    firm: "Family Law Practice, IL",
    quote: "The ROI we've seen since partnering with Mubashar is unmatched. Our practice area pages are now cited directly in Google AI Overviews.",
    thumbnail: "/images/video-placeholder-2.jpg",
    videoId: "dQw4w9WgXcQ", 
  },
  {
    id: "testim-3",
    clientName: "Michael R.",
    firm: "Criminal Defense, NY",
    quote: "What impressed me most was the E-E-A-T approach. They understand that legal marketing requires a completely different level of trust and authority.",
    thumbnail: "/images/video-placeholder-3.jpg",
    videoId: "dQw4w9WgXcQ",
  }
];

export default function VideoTestimonials() {
  return (
    <section className="py-24 bg-[#0a0f2e]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What our partners say"
          title={<span className="text-white">Hear directly from the firms we've scaled</span>}
          intro="Don't just take our word for it. Listen to how we've helped law firms reduce their reliance on paid ads and build durable organic lead generation systems."
          variant="center"
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testim, index) => (
            <motion.div
              key={testim.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`overflow-hidden bg-[#1a3c8f] flex flex-col ${radius.card}`}
            >
              {/* Video Thumbnail Area (Click to play placeholder) */}
              <div className="group relative aspect-video w-full bg-slate-800 cursor-pointer overflow-hidden">
                {/* Fallback gradient if image fails */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors group-hover:bg-black/20 z-10">
                  <PlayCircle className="h-16 w-16 text-white opacity-80 transition-transform group-hover:scale-110 group-hover:opacity-100" />
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <blockquote className="text-slate-200 text-sm italic leading-relaxed flex-1">
                  "{testim.quote}"
                </blockquote>
                <div className="mt-6 border-t border-white/10 pt-4">
                  <p className="font-bold text-white">{testim.clientName}</p>
                  <p className="text-xs text-slate-300">{testim.firm}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
