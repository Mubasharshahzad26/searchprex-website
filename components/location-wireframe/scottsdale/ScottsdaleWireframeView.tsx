'use client';

import React from 'react';
import type { CityPage } from '@/lib/city-pages';
import TaglinePainBand from '../TaglinePainBand';
import ScottsdaleHero from './ScottsdaleHero';
import ScottsdalePainBanner from './ScottsdalePainBanner';
import ScottsdaleQuickAnswer from './ScottsdaleQuickAnswer';
import ScottsdaleReliefQuote from './ScottsdaleReliefQuote';
import ScottsdaleDiagnosisTool from './ScottsdaleDiagnosisTool';
import ScottsdaleCountyCourts from './ScottsdaleCountyCourts';
import ScottsdaleSubmarkets from './ScottsdaleSubmarkets';
import ScottsdalePracticeDemand from './ScottsdalePracticeDemand';
import ScottsdaleProblemTable from './ScottsdaleProblemTable';
import ScottsdaleProcessSteps from './ScottsdaleProcessSteps';
import ScottsdalePricingAndGuarantee from './ScottsdalePricingAndGuarantee';
import ScottsdaleFounderBio from './ScottsdaleFounderBio';
import ScottsdaleDemographyMap from './ScottsdaleDemographyMap';
import ScottsdaleFaqAndCta from './ScottsdaleFaqAndCta';

interface ScottsdaleWireframeViewProps {
  page: CityPage;
}

export default function ScottsdaleWireframeView({ page }: ScottsdaleWireframeViewProps) {
  return (
    <div className="w-full bg-white text-slate-900 selection:bg-neutral-900 selection:text-white font-sans">
      {/* 1. Hero Section: Pure white background, Semrush layout, floating elements, real WebP city image */}
      <ScottsdaleHero page={page} />

      {/* Universal Tagline Band under Hero */}
      <TaglinePainBand />

      {/* 2. Dual Pain Points: Vanity Traffic vs Burned by Annual Contracts */}
      <ScottsdalePainBanner />

      {/* 3. AEO Quick Answer for Google AI Overviews & ChatGPT */}
      <ScottsdaleQuickAnswer />

      {/* 4. Shakespeare Relief Quote: Easing the burden of law firm marketing anxiety */}
      <ScottsdaleReliefQuote />

      {/* 5. Interactive Practice Diagnosis & Reality Check Tool */}
      <ScottsdaleDiagnosisTool />

      {/* 6. Maricopa County Court Jurisdictions & Statutory Silos */}
      <ScottsdaleCountyCourts />

      {/* 7. Six Affluent Submarkets & Geo-Entity Targeting */}
      <ScottsdaleSubmarkets />

      {/* 8. Practice Demand Breakdown (High-Asset Divorce, Old Town DUI, Estates, Injury) */}
      <ScottsdalePracticeDemand />

      {/* 9. Semrush-Style Problem Diagnosis & Fix Comparison Table */}
      <ScottsdaleProblemTable />

      {/* 10. 90-Day Systematic Process Steps */}
      <ScottsdaleProcessSteps />

      {/* 11. Transparent Pricing & Exclusivity Guarantees */}
      <ScottsdalePricingAndGuarantee />

      {/* 12. Founder-Led Accountability Bio */}
      <ScottsdaleFounderBio />

      {/* 13. Scottsdale Demographics, Real Consultation Photo, & Google Map */}
      <ScottsdaleDemographyMap />

      {/* 14. 8 PAA Accordion FAQs, Closing CTA Banner, and Bottom Tagline */}
      <ScottsdaleFaqAndCta faqs={page.faqs} />
    </div>
  );
}
