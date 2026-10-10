"use client";

// components/location-wireframe/DetroitKnowledgeGraph.tsx
//
// Matches Page 4:
// "ENTITY AND KNOWLEDGE GRAPH: How Google and AI See Your Law Firm: The Knowledge Graph We Build"
// Interactive node cluster visualization + live entity node inspector.

import React, { useState } from "react";
import { Network, Sparkles, CheckCircle2 } from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

export default function DetroitKnowledgeGraph({ page }: { page: CityPage }) {
  const [selectedNode, setSelectedNode] = useState<string>("Attorneys");

  const nodes: Record<
    string,
    {
      relation: string;
      title: string;
      learn: string;
      action: string;
    }
  > = {
    Attorneys: {
      relation: "FIRM EMPLOYS →",
      title: "Attorneys",
      learn: "Named legal practitioners with bar admissions, court admissions and verified trial history, supporting trust (E-E-A-T) in a YMYL high-stakes legal niche.",
      action: "Detailed attorney bio pages, Person schema with sameAs links to State Bar of Michigan, and consistent external citations.",
    },
    "Practice areas": {
      relation: "FIRM PRACTICES →",
      title: "Practice areas",
      learn: "Specific sub-statutory disciplines (Michigan no-fault auto claims, catastrophic injury, criminal defense) rather than generic legal services.",
      action: "Dedicated practice-area silos answering Michigan statutory requirements with internal linking to relevant case results and court venues.",
    },
    "Detroit area": {
      relation: "FIRM LOCATED IN →",
      title: `${page.city} area`,
      learn: "Physical nexus to Detroit, Wayne County courts, local corridors and municipal boundaries.",
      action: `Geofenced Google Business Profile, local courthouse directions, and localized landing pages for Downtown, Midtown, Dearborn, and Southfield.`,
    },
    "Business Profile": {
      relation: "FIRM OWNS →",
      title: "Business Profile",
      learn: "Primary NAP verification, operational hours, reviews, and primary Google Maps categorical taxonomy.",
      action: "Complete GBP optimization with primary category 'Personal Injury Attorney' or 'Law Firm' and secondary statutory categories.",
    },
    Website: {
      relation: "FIRM PUBLISHES →",
      title: "Website",
      learn: "Technical crawl health, mobile Core Web Vitals, authoritative legal content and primary entity hub.",
      action: "Next.js performance architecture, fast server-rendered pages, LegalService JSON-LD schema, and clear attorney attribution.",
    },
    Reviews: {
      relation: "CLIENTS EVALUATE →",
      title: "Reviews",
      learn: "Real client sentiment, case-specific review text co-occurring with practice keywords, and firm response velocity.",
      action: "Automated review generation sequences and strategic keyword-rich owner responses compliant with Michigan bar advertising rules.",
    },
    "Bar and directories": {
      relation: "VERIFIED BY →",
      title: "Bar and directories",
      learn: "State Bar of Michigan standing, American Bar Association accreditation, Martindale-Hubbell, and local county bar listings.",
      action: "Harmonized directory sync across 40+ premier legal directories with identical NAP details and partner attorney profile links.",
    },
    "Press and mentions": {
      relation: "CITED IN →",
      title: "Press and mentions",
      learn: "Third-party earned media, local news quotations (Detroit Free Press, Crain's Detroit Business), and legal commentary.",
      action: "Digital PR campaigns and localized legal commentary establishing the firm as a primary quote source for Michigan legal news.",
    },
  };

  const current = nodes[selectedNode] || nodes["Attorneys"];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#534AB7] block">
            ENTITY ARCHITECTURE
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#0a0f2e] leading-tight">
            Entity SEO for Detroit Law Firms: How Google and AI Understand Your Practice
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Google and AI assistants answer from connected entities, not isolated pages. When your firm, attorneys, practice areas and Detroit location are clearly linked and confirmed by trusted sources, you become easier to cite and recommend. Tap a node below.
          </p>
        </div>

        {/* Node Visualizer Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Node Diagram */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-[#f8fafc] p-6 sm:p-8 shadow-xs">
            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Interactive Entity Relationship Cluster
              </span>
            </div>

            {/* Central Hub with surrounding pills */}
            <div className="relative flex flex-col items-center justify-center py-6 min-h-[320px]">
              {/* Surrounding Node Pills */}
              <div className="flex flex-wrap justify-center gap-2.5 max-w-lg mb-8">
                {Object.keys(nodes).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedNode(key)}
                    className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                      selectedNode === key
                        ? "bg-[#534AB7] text-white shadow-xs scale-105 font-bold"
                        : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>

              {/* Central Node */}
              <div className="rounded-2xl bg-[#0a0f2e] text-white px-8 py-5 text-center shadow-xl border-2 border-slate-700 max-w-xs">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#a594fd] block">
                  Core Legal Entity
                </span>
                <span className="text-base sm:text-lg font-black text-white mt-0.5 block">
                  Your Law Firm (Detroit, MI)
                </span>
              </div>
            </div>

            <div className="text-center pt-4 border-t border-slate-200 space-y-1">
              <p className="text-xs text-slate-600 font-medium">
                Tap any node above to inspect how Google &amp; AI evaluate that entity link.
              </p>
              <p className="text-[11px] text-slate-400">
                We strengthen the signals that help search engines understand your firm. We cannot guarantee a Knowledge Panel or any AI platform&apos;s output.
              </p>
            </div>
          </div>

          {/* Right: Selected Node Detail Inspector */}
          <div className="lg:col-span-5 rounded-2xl border-2 border-[#534AB7] bg-white p-6 sm:p-8 shadow-xs space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7] block">
                {current.relation}
              </span>
              <h3 className="text-2xl font-black text-[#0a0f2e] mt-1">
                {current.title}
              </h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                <span className="font-bold text-slate-900 block mb-1">
                  What Google and AI learn:
                </span>
                <p className="text-slate-600 leading-relaxed">
                  {current.learn}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                <span className="font-bold text-slate-900 block mb-1">
                  What we do:
                </span>
                <p className="text-slate-600 leading-relaxed">
                  {current.action}
                </p>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-500 leading-normal">
              We strengthen the signals that help search engines understand your firm. We cannot guarantee a Knowledge Panel or any third-party AI platform output.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
