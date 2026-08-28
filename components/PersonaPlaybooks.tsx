"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Scale, Store, MapPin } from "lucide-react";
import { color, radius } from "@/lib/design-tokens";

const playbooks = [
  {
    id: "law-firms",
    icon: Scale,
    audience: "Law Firms Across All 50 US States",
    painPoint: "Bleeding budget on $150+ PPC clicks in highly competitive markets like NY, CA & FL.",
    solution: "Personal Injury and Family Law clicks will bankrupt you on Google Ads. Whether you are in California, New York, or anywhere across the 50 states, I build localized entity authority that ranks your firm organically for high-intent cases, so you stop renting your traffic and start owning it.",
    cta: "See how I rank local businesses",
    href: "#results"
  },
  {
    id: "ecommerce",
    icon: Store,
    audience: "Large Ecommerce Stores",
    painPoint: "Burning cash on high PPC campaigns while suffering from mass de-indexing.",
    solution: "When a large catalog drops out of Google, running expensive PPC to cover the gap destroys your margins. I fix faceted navigation traps, rebuild canonical architecture, and force Google to re-index your revenue-driving URLs using the Indexing API.",
    cta: "See how I grew SMK Store by 227%",
    href: "#results"
  },
  {
    id: "local-seo",
    icon: MapPin,
    audience: "Small US Local Service Businesses",
    painPoint: "Getting buried by Yelp, Angi, and AI Overviews, resulting in zero local phone calls.",
    solution: "Traditional local SEO is dead. If directories and AI are stealing your leads, I restructure your site and GBP profile so Google explicitly recommends your business as the single best local entity for the job in your specific city.",
    cta: "See how I got HVAC into the Top 3",
    href: "#results"
  }
];

export default function PersonaPlaybooks() {
  return (
    <section className="bg-[#0a0f2e] py-24 sm:py-32 relative overflow-hidden border-y border-white/10">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#534AB7]/20 via-[#0a0f2e] to-[#0a0f2e]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <p className="mb-4 text-xs font-black uppercase tracking-widest text-[#3eb489]">
            A Solution-Oriented Approach
          </p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl mb-6">
            Burning cash on Law Firm PPC? Worried about local growth? Stuck with zero store visibility?
          </h2>
          <p className="text-lg text-slate-400">
            I don&apos;t sell &quot;generic SEO packages.&quot; I partner with business owners who are exhausted by failing marketing channels, and I deploy specific, battle-tested solutions to rescue their revenue.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {playbooks.map((playbook, i) => {
            const Icon = playbook.icon;
            return (
              <motion.div
                key={playbook.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative flex flex-col rounded-2xl bg-[#0f172a]/80 p-8 ring-1 ring-white/10 transition-all hover:bg-[#0f172a] hover:ring-[#3eb489]/50 hover:shadow-2xl hover:shadow-[#3eb489]/10"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#3eb489]/10 ring-1 ring-[#3eb489]/20 transition-transform group-hover:scale-110 group-hover:bg-[#3eb489]/20">
                  <Icon className="h-6 w-6 text-[#3eb489]" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">
                  {playbook.audience}
                </h3>
                <p className="text-sm font-semibold text-[#ef4444] mb-6">
                  Your Pain: {playbook.painPoint}
                </p>
                
                <p className="text-sm leading-relaxed text-slate-300 mb-8 flex-grow">
                  <strong className="text-[#3eb489]">My Solution:</strong> {playbook.solution}
                </p>

                <Link
                  href={playbook.href}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#3eb489] transition-colors hover:text-white mt-auto group-hover:gap-3"
                >
                  See how I fix this <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
