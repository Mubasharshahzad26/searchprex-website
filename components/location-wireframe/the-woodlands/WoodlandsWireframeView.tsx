'use client';

import React from 'react';
import type { CityPage } from "@/lib/city-pages";
import LocationLocalCaseStudies from "../LocationLocalCaseStudies";
import LocationBlogTeaser from "../LocationBlogTeaser";
import WoodlandsHero from './WoodlandsHero';
import WoodlandsPainBanner from './WoodlandsPainBanner';
import WoodlandsQuickAnswer from './WoodlandsQuickAnswer';
import WoodlandsDiagnosisTool from './WoodlandsDiagnosisTool';
import WoodlandsCountyCourts from './WoodlandsCountyCourts';
import WoodlandsVillages from './WoodlandsVillages';
import WoodlandsNearbySubmarkets from './WoodlandsNearbySubmarkets';
import WoodlandsEmotionalIntent from './WoodlandsEmotionalIntent';
import WoodlandsKeywords from './WoodlandsKeywords';
import WoodlandsReferralEconomy from './WoodlandsReferralEconomy';
import WoodlandsProcessSteps from './WoodlandsProcessSteps';
import WoodlandsPricingAndGuarantee from './WoodlandsPricingAndGuarantee';
import WoodlandsFounderBio from './WoodlandsFounderBio';
import WoodlandsDemographyMap from './WoodlandsDemographyMap';
import WoodlandsFaqAndCta from './WoodlandsFaqAndCta';
import TaglinePainBand from '../TaglinePainBand';

interface WoodlandsWireframeViewProps {
  page: CityPage;
}

export default function WoodlandsWireframeView({ page }: WoodlandsWireframeViewProps) {
  return (
    <div className="w-full bg-white text-slate-900 selection:bg-neutral-900 selection:text-white font-sans">
      {/* 1. Hero with Waterway & Pine Tree Vector, Montgomery & Harris Stats */}
      <WoodlandsHero />

      {/* Tagline band under hero */}
      <TaglinePainBand />

      {/* 2. Top Pain Banner ("Confused between choosing an SEO agency in The Woodlands") */}
      <WoodlandsPainBanner variant="confused" />

      {/* 3. Quick Answer Card for Google AI Overviews with Mubashar Sharif Attribution */}
      <WoodlandsQuickAnswer />

      {/* 4. Interactive SEO Diagnosis Tool with Live Gemini Engine & Issue Chips */}
      <WoodlandsDiagnosisTool />

      {/* 5. Montgomery County (Conroe) vs Harris County (Creekside) Court Jurisdictions */}
      <WoodlandsCountyCourts />

      {/* 6. One Page Per Village: 8 Woodlands Villages Interactive Hub */}
      <WoodlandsVillages />

      {/* 7. Nearby Submarkets: Conroe, Spring, Shenandoah, Tomball, Magnolia */}
      <WoodlandsNearbySubmarkets />

      {/* 8. Behind Every Search Is a Family at a Vulnerable Moment (Emotional Intent) */}
      <WoodlandsEmotionalIntent />

      {/* 9. Texas Statutory Semantic Keywords & Entity Clusters */}
      <WoodlandsKeywords />

      {/* 10. The Referral Economy & The SearchPrex Discretion Promise */}
      <WoodlandsReferralEconomy />

      {/* 11. Three Steps From Review to Referral-Ready (Process Roadmap) */}
      <WoodlandsProcessSteps />

      {/* 12. Transparent Pricing ($1,200 - $2,500/mo), 90-Day Guarantee & ROI Calculator */}
      <WoodlandsPricingAndGuarantee />

      {/* 13. Founder Bio: Mubashar Sharif, CEO & Principal Strategist */}
      <WoodlandsFounderBio />

      {/* 14. Demographics ($145k+ Income), Verified Photos & Embedded Woodlands Google Map */}
      <WoodlandsDemographyMap />

      {/* 15. Secondary Pain Banner ("Burnt by previous agencies with zero results") */}
      <WoodlandsPainBanner variant="burnt" />

      {/* 16. FAQs, Texas Legal Practice Network Directory & Closing CTA Banner */}
      <LocationLocalCaseStudies page={page} />
      <LocationBlogTeaser page={page} />
      <WoodlandsFaqAndCta />

      {/* Tagline band above footer */}
      <TaglinePainBand />
    </div>
  );
}
