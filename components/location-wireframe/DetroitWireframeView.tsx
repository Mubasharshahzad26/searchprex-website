"use client";

// components/location-wireframe/DetroitWireframeView.tsx
//
// Sequence matching user's exact final layout specifications:
// 1. Hero Section:
//    - H1: Revenue First Approach SEO in Detroit, Michigan
//    - Subheading: Be the Firm Injured Clients See First
//    - Background: High-quality Detroit skyline & geography image (/images/locations/detroit-skyline-hero.jpg)
//    - Right column: Replicated service page Lead Collection Form (Website + Email inputs, 24h founder review)
// 2. Sub-Markets & Lead Problem:
//    - H2: Worried of Not Getting Qualified Law Firm Leads In Detroit, MI?
//    - H3: We Came With a Solution Instead of Traditional SEO Approach
//    - H2: Revenue First Approach All Over United States and Detroit, MI
//    - Highly relevant localized image (/images/locations/detroit-law-consultation.webp)
// 3. Why SearchPrex: Our Core Expertise:
//    - Adjusted higher up in the flow per user request
//    - 4 Interactive 3D Flip cards (Legal-only focus, Cases not clicks, Detroit-first locality, Proprietary stack)
// 4. See Our Approach:
//    - H2: See Our Approach (with unique high-resolution courtroom strategy image /images/locations/detroit-case-strategy.jpg)
//    - 3 Pillars: Be Found, Be Cited, Be Chosen
// 5. Strategy & Consultation:
//    - H2: Why Our Strategy is Successful for Law Firms in Detroit, Michigan
//    - H3: Book Your Free Consultation
// 6. Results & Local Map Pack Proof:
//    - H2: Results We Already Produced Across Detroit & Michigan (7x7 Rank Grid)
//    - H3: Download Free Local MAP Pack Checklist
// 7. The Problem -> The Fix:
//    - H2: Why Most Detroit Law Firm Sites Never Get the Call
// 8. Entity Architecture:
//    - H3: How Google and AI See Your Law Firm (Removed "Knowledge Graph:" prefix)
// 9. Comparison:
//    - H3: Comparison: SearchPrex vs Typical SEO Agency vs DIY
// 10. Other Areas We Serve & Google Map:
//    - H2: Other Areas We Serve Across Metro Detroit & Michigan
//    - Highly Relevant Image (/images/locations/detroit-legal-district.webp) + Google Map highlighting spots served
// 11. Technology We Used (Slider):
//    - H2: Technology We Used {Continuous infinite marquee with realistic official logos}
// 12. Blog Section:
//    - Dynamic Detroit & Law Firm relevant published articles
// 13. Office Concept & FAQs:
//    - Practice Coverage Corridor & Simple "Frequently Asked Questions"

import React from "react";
import type { CityPage } from "@/lib/city-pages";
import DetroitTopPromoBar from "./DetroitTopPromoBar";
import DetroitHero from "./DetroitHero";
import DetroitSubMarkets from "./DetroitSubMarkets";
import DetroitCoreExpertise from "./DetroitCoreExpertise";
import DetroitApproachAndPillars from "./DetroitApproachAndPillars";
import DetroitGrowthPlanForm from "./DetroitGrowthPlanForm";
import DetroitRankGridProof from "./DetroitRankGridProof";
import DetroitProblemFix from "./DetroitProblemFix";
import DetroitKnowledgeGraph from "./DetroitKnowledgeGraph";
import DetroitPromiseAndComparison from "./DetroitPromiseAndComparison";
import DetroitOtherAreasServed from "./DetroitOtherAreasServed";
import DetroitTechnologySlider from "./DetroitTechnologySlider";
import DetroitBlogSection from "./DetroitBlogSection";
import DetroitOfficeAndFaq from "./DetroitOfficeAndFaq";

interface DetroitWireframeViewProps {
  page: CityPage;
}

export default function DetroitWireframeView({ page }: DetroitWireframeViewProps) {
  return (
    <div className="w-full bg-white text-slate-900 selection:bg-[#534AB7]/20 selection:text-[#0a0f2e] font-sans">
      {/* 0. TOP ANNOUNCEMENT & CALL BAR (Limited-time 14-day free trial offer + Direct Call) */}
      <DetroitTopPromoBar />

      {/* 1. HERO SECTION (H1: Revenue First Approach SEO in Detroit, MI + Replicated Lead Form + Background) */}
      <DetroitHero page={page} />

      {/* 2. LEAD PROBLEM & NATIONWIDE AUTHORITY (H2: Worried of Not Getting Qualified Leads + detroit-law-consultation.webp) */}
      <DetroitSubMarkets page={page} />

      {/* 3. OUR CORE EXPERTISE (Adjusted higher up + Interactive 3D Flip Cards + Mobile Touch Swipes) */}
      <DetroitCoreExpertise page={page} />

      {/* 4. SEE OUR APPROACH (H2: See Our Approach + Unique detroit-case-strategy.jpg + 3 Pillars) */}
      <DetroitApproachAndPillars page={page} />

      {/* 5. WHY OUR STRATEGY IS SUCCESSFUL (H2: Why Strategy is Successful + H3: Book Your Free Consultation) */}
      <DetroitGrowthPlanForm page={page} />

      {/* 6. RESULTS WE ALREADY PRODUCED (H2: Results We Produced + H3: Download Free Map Pack Checklist) */}
      <DetroitRankGridProof page={page} />

      {/* 7. WHY MOST DETROIT LAW FIRM SITES NEVER GET THE CALL (The Problem -> The Fix) */}
      <DetroitProblemFix page={page} />

      {/* 8. HOW GOOGLE AND AI SEE YOUR LAW FIRM (Entity Architecture - Removed Knowledge Graph from heading) */}
      <DetroitKnowledgeGraph page={page} />

      {/* 9. COMPARISON (H3: Comparison: SearchPrex vs Typical SEO Agency vs DIY) */}
      <DetroitPromiseAndComparison page={page} />

      {/* 10. OTHER AREAS WE SERVE (H2: Other Areas We Serve + detroit-legal-district.webp + Google Map of Spots Served) */}
      <DetroitOtherAreasServed page={page} />

      {/* 11. TECHNOLOGY WE USED (H2: Technology We Used - Realistic official vector logos slider) */}
      <DetroitTechnologySlider page={page} />

      {/* 12. BLOG SECTION (Dynamic Detroit & Law Firm SEO Published Articles) */}
      <DetroitBlogSection page={page} />

      {/* 13. FAQS & PRACTICE COVERAGE */}
      <DetroitOfficeAndFaq page={page} />
    </div>
  );
}
