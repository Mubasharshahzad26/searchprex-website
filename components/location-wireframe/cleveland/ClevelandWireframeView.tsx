"use client";

import React, { useState, useEffect } from "react";
import type { CityPage } from "@/lib/city-pages";
import ClevelandHero from "./ClevelandHero";
import ClevelandPainBanner from "./ClevelandPainBanner";
import ClevelandQuickAnswer from "./ClevelandQuickAnswer";
import ClevelandDiagnosisTool from "./ClevelandDiagnosisTool";
import ClevelandBurnedByAgencies from "./ClevelandBurnedByAgencies";
import ClevelandFourPillars from "./ClevelandFourPillars";
import ClevelandGrowthGoals from "./ClevelandGrowthGoals";
import ClevelandPpcVsSeoTable from "./ClevelandPpcVsSeoTable";
import ClevelandCostLedger from "./ClevelandCostLedger";
import ClevelandRealityCheckForm from "./ClevelandRealityCheckForm";
import ClevelandProcessAndAI from "./ClevelandProcessAndAI";
import ClevelandDurationResults from "./ClevelandDurationResults";
import ClevelandPricingTiers from "./ClevelandPricingTiers";
import ClevelandAgencyComparison from "./ClevelandAgencyComparison";
import ClevelandFounderBio from "./ClevelandFounderBio";
import ClevelandDemographyMap from "./ClevelandDemographyMap";
import ClevelandSubMarkets from "./ClevelandSubMarkets";
import ClevelandEmotionalIntent from "./ClevelandEmotionalIntent";
import ClevelandKeywordCluster from "./ClevelandKeywordCluster";
import ClevelandFaqAndCta from "./ClevelandFaqAndCta";
import TaglinePainBand from "../TaglinePainBand";
import LocationLocalCaseStudies from "../LocationLocalCaseStudies";
import LocationBlogTeaser from "../LocationBlogTeaser";
import ClevelandBlackFridayStickyBar from "./ClevelandBlackFridayStickyBar";
import ClevelandBlackFridayModal from "./ClevelandBlackFridayModal";
import { isBlackFridayOfferLive } from "@/lib/black-friday-offer";

interface ClevelandWireframeViewProps {
  page: CityPage;
}

export default function ClevelandWireframeView({ page }: ClevelandWireframeViewProps) {
  const [isBfModalOpen, setIsBfModalOpen] = useState(false);

  // Automatically show Black Friday modal on page open after 2 seconds
  useEffect(() => {
    if (!isBlackFridayOfferLive()) return;
    try {
      const shown = window.sessionStorage.getItem("spx_cleveland_bf_modal_shown_2026");
      if (!shown) {
        const timer = setTimeout(() => {
          setIsBfModalOpen(true);
        }, 2000);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="w-full bg-white text-slate-900 selection:bg-neutral-900 selection:text-white font-sans">
      {/* Black Friday Sticky Bar */}
      <ClevelandBlackFridayStickyBar onOpenModal={() => setIsBfModalOpen(true)} />

      {/* Black Friday Entrance / Action Modal */}
      <ClevelandBlackFridayModal
        isOpen={isBfModalOpen}
        onClose={() => setIsBfModalOpen(false)}
      />

      {/* 1. Hero with Demand Ledger */}
      <ClevelandHero page={page} onOpenBfModal={() => setIsBfModalOpen(true)} />

      {/* Tagline band under hero */}
      <TaglinePainBand />

      {/* Verified Local Case Studies (Brought Higher Up For Immediate Proof) */}
      <LocationLocalCaseStudies page={page} />

      {/* Black Friday Pricing Tiers (Brought Higher Up For Maximum Conversion) */}
      <ClevelandPricingTiers onOpenModal={() => setIsBfModalOpen(true)} />

      {/* 2. Top Pain Band */}
      <ClevelandPainBanner id="painband-top" variant="top" />

      {/* 3. Quick Answer Card */}
      <ClevelandQuickAnswer />

      {/* 4. AI Problem Diagnosis Tool (Powered by Gemini Pool) + 7-Day Trial Lead Form */}
      <ClevelandDiagnosisTool />

      {/* 5. Burned by Previous SEO Agencies? Real Results & Attribution */}
      <ClevelandBurnedByAgencies />

      {/* 6. 01 · What you actually want (Four Pillars) */}
      <ClevelandFourPillars />

      {/* 7. 02 · How you want to grow (Growth Goals) */}
      <ClevelandGrowthGoals />

      {/* 8. 03 · Why SEO instead of PPC (Comparative Table) */}
      <ClevelandPpcVsSeoTable />

      {/* 9. 04 · The cost ledger (Interactive Budget Visualizer) */}
      <ClevelandCostLedger />

      {/* 10. Free 24h Reality Check Intake Form */}
      <ClevelandRealityCheckForm />

      {/* 11. 05 · Our process (6-Step Roadmap, AI Prompts & Citation Rate Gauge) */}
      <ClevelandProcessAndAI />

      {/* 12. 06 · Results by duration (Milestones & Benchmark Progression Table) */}
      <ClevelandDurationResults />

      {/* 14. Confused Between Choosing an SEO Agency in Cleveland? Decision Matrix */}
      <ClevelandAgencyComparison />

      {/* 15. The Brain Behind It (Founder Bio: Mubashar Sharif, CEO) + Semrush Certifications */}
      <ClevelandFounderBio />

      {/* 16. Cleveland Demography & Local Interactive Map */}
      <ClevelandDemographyMap />

      {/* 17. 08 · Cleveland coverage & Nearby Submarkets (Lakewood, Parma, Beachwood, etc.) */}
      <ClevelandSubMarkets />

      {/* 18. What your clients feel (Emotional Intent & Conversion Tone) */}
      <ClevelandEmotionalIntent />

      {/* 19. Legal keywords & semantics (Ohio BWC, Injury, OVI Clusters) */}
      <ClevelandKeywordCluster />

      {/* 20. FAQ Accordion + Closing High-Contrast CTA Banner + Bottom Pain Band */}
      <LocationBlogTeaser page={page} />
      <ClevelandFaqAndCta />

      {/* Tagline band above footer */}
      <TaglinePainBand />
    </div>
  );
}
