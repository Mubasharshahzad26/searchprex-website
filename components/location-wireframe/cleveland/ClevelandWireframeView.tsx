"use client";

import React from "react";
import type { CityPage } from "@/lib/city-pages";
import ClevelandHero from "./ClevelandHero";
import ClevelandPainBanner from "./ClevelandPainBanner";
import ClevelandQuickAnswer from "./ClevelandQuickAnswer";
import ClevelandDiagnosisTool from "./ClevelandDiagnosisTool";
import ClevelandFourPillars from "./ClevelandFourPillars";
import ClevelandGrowthGoals from "./ClevelandGrowthGoals";
import ClevelandPpcVsSeoTable from "./ClevelandPpcVsSeoTable";
import ClevelandCostLedger from "./ClevelandCostLedger";
import ClevelandRealityCheckForm from "./ClevelandRealityCheckForm";
import ClevelandProcessAndAI from "./ClevelandProcessAndAI";
import ClevelandDurationResults from "./ClevelandDurationResults";
import ClevelandPricingTiers from "./ClevelandPricingTiers";
import ClevelandFounderBio from "./ClevelandFounderBio";
import ClevelandSubMarkets from "./ClevelandSubMarkets";
import ClevelandEmotionalIntent from "./ClevelandEmotionalIntent";
import ClevelandKeywordCluster from "./ClevelandKeywordCluster";
import ClevelandFaqAndCta from "./ClevelandFaqAndCta";

interface ClevelandWireframeViewProps {
  page: CityPage;
}

export default function ClevelandWireframeView({ page }: ClevelandWireframeViewProps) {
  return (
    <div className="w-full bg-white text-slate-900 selection:bg-[#534AB7] selection:text-white">
      {/* 1. Hero with Demand Ledger */}
      <ClevelandHero page={page} />

      {/* 2. Top Pain Band */}
      <ClevelandPainBanner id="painband-top" variant="top" />

      {/* 3. Quick Answer Card */}
      <ClevelandQuickAnswer />

      {/* 4. AI Problem Diagnosis Tool (Powered by Gemini Pool) + 7-Day Trial Lead Form */}
      <ClevelandDiagnosisTool />

      {/* 5. 01 · What you actually want (Four Pillars) */}
      <ClevelandFourPillars />

      {/* 6. 02 · How you want to grow (Growth Goals) */}
      <ClevelandGrowthGoals />

      {/* 7. 03 · Why SEO instead of PPC (Comparative Table) */}
      <ClevelandPpcVsSeoTable />

      {/* 8. 04 · The cost ledger (Interactive Budget Visualizer) */}
      <ClevelandCostLedger />

      {/* 9. Free 24h Reality Check Intake Form */}
      <ClevelandRealityCheckForm />

      {/* 10. 05 · Our process (6-Step Roadmap, AI Prompts & Citation Rate Gauge) */}
      <ClevelandProcessAndAI />

      {/* 11. 06 · Results by duration (Milestones & Benchmark Progression Table) */}
      <ClevelandDurationResults />

      {/* 12. 07 · What you pay (Solo, Growth, Firm Pricing Tiers) */}
      <ClevelandPricingTiers />

      {/* 13. The Brain Behind It (Founder Bio: Mubashar Shahzad) */}
      <ClevelandFounderBio />

      {/* 14. 08 · Cleveland coverage & Nearby Submarkets (Lakewood, Parma, Beachwood, etc.) */}
      <ClevelandSubMarkets />

      {/* 15. What your clients feel (Emotional Intent & Conversion Tone) */}
      <ClevelandEmotionalIntent />

      {/* 16. Legal keywords & semantics (Ohio BWC, Injury, OVI Clusters) */}
      <ClevelandKeywordCluster />

      {/* 17. FAQ Accordion + Closing High-Contrast CTA Banner + Bottom Pain Band */}
      <ClevelandFaqAndCta />
    </div>
  );
}
