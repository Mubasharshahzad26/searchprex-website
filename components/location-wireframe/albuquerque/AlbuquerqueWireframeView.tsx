"use client";

import React from "react";
import type { CityPage } from "@/lib/city-pages";
import AlbuquerqueHero from "./AlbuquerqueHero";
import AlbuquerquePainBanner from "./AlbuquerquePainBanner";
import AlbuquerqueQuickAnswer from "./AlbuquerqueQuickAnswer";
import AlbuquerqueDiagnosisTool from "./AlbuquerqueDiagnosisTool";
import AlbuquerqueEmotionalIntent from "./AlbuquerqueEmotionalIntent";
import AlbuquerqueTrustLadder from "./AlbuquerqueTrustLadder";
import AlbuquerqueBilingualCorridor from "./AlbuquerqueBilingualCorridor";
import AlbuquerqueBreakEvenCalculator from "./AlbuquerqueBreakEvenCalculator";
import AlbuquerqueRioGrandeCorridor from "./AlbuquerqueRioGrandeCorridor";
import AlbuquerqueDemographyMap from "./AlbuquerqueDemographyMap";
import AlbuquerqueHonestyPledge from "./AlbuquerqueHonestyPledge";
import AlbuquerqueProcess from "./AlbuquerqueProcess";
import AlbuquerqueFounderBio from "./AlbuquerqueFounderBio";
import AlbuquerqueNearbySubmarkets from "./AlbuquerqueNearbySubmarkets";
import AlbuquerqueKeywordCluster from "./AlbuquerqueKeywordCluster";
import AlbuquerqueFaqAndCta from "./AlbuquerqueFaqAndCta";
import TaglinePainBand from "../TaglinePainBand";

interface AlbuquerqueWireframeViewProps {
  page: CityPage;
}

export default function AlbuquerqueWireframeView({ page }: AlbuquerqueWireframeViewProps) {
  return (
    <div className="w-full bg-white text-slate-900 selection:bg-[#534AB7] selection:text-white">
      {/* 1. Hero with Bilingual Toggle & Sandia Mountain Hot Air Balloon SVG */}
      <AlbuquerqueHero page={page} />

      {/* Tagline band under hero */}
      <TaglinePainBand />

      {/* 2. Top Pain Banner ("Confused between choosing an SEO agency / Didn't get results") */}
      <AlbuquerquePainBanner id="painband-top" variant="top" />

      {/* 3. Quick Answer Card for Google AI Overviews */}
      <AlbuquerqueQuickAnswer />

      {/* 4. Interactive Diagnosis Tool with Gemini API & Reality Check Lead Magnet */}
      <AlbuquerqueDiagnosisTool />

      {/* 5. What Your Clients Feel (Emotional Intent Across 4 Practice Areas) */}
      <AlbuquerqueEmotionalIntent />

      {/* 6. The Trust Ladder: 5-Step Progress Bar & Client Journey */}
      <AlbuquerqueTrustLadder />

      {/* 7. Two Languages, One Community: Bilingual Spanish SEO Opportunity */}
      <AlbuquerqueBilingualCorridor />

      {/* 8. Feast or Famine vs. Steady Presence: 12-Month Bar Chart & Case ROI Calculator */}
      <AlbuquerqueBreakEvenCalculator />

      {/* 9. Beyond Albuquerque: Interactive Rio Grande Legal Corridor Map */}
      <AlbuquerqueRioGrandeCorridor />

      {/* 10. Albuquerque Demographics & Interactive Court District Google Map */}
      <AlbuquerqueDemographyMap />

      {/* 11. Our Honesty Pledge: Remote Founder-Led Transparency */}
      <AlbuquerqueHonestyPledge />

      {/* 12. Collaborative Process: Listen. Map. Build. Prove. */}
      <AlbuquerqueProcess />

      {/* 13. Mubashar Sharif, CEO & Principal Strategist Bio Card */}
      <AlbuquerqueFounderBio />

      {/* 14. Nearby Areas: Rio Rancho, Santa Fe, Los Lunas, Corrales, Las Cruces */}
      <AlbuquerqueNearbySubmarkets />

      {/* 15. Semantic Legal Keywords & Practice Silos */}
      <AlbuquerqueKeywordCluster />

      {/* 16. FAQs, High-Converting Final CTA, and Bottom Pain Band */}
      <AlbuquerqueFaqAndCta />

      {/* Tagline band above footer */}
      <TaglinePainBand />
    </div>
  );
}
