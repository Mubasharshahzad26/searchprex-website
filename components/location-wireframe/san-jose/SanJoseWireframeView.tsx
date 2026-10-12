'use client';

import React from 'react';
import type { CityPage } from '@/lib/city-pages';
import TaglinePainBand from '../TaglinePainBand';
import SanJoseHero from './SanJoseHero';
import SanJosePainBanner from './SanJosePainBanner';
import SanJoseQuickAnswer from './SanJoseQuickAnswer';
import SanJoseReliefQuote from './SanJoseReliefQuote';
import SanJoseDiagnosisTool from './SanJoseDiagnosisTool';
import SanJoseCountyCourts from './SanJoseCountyCourts';
import SanJoseSubmarkets from './SanJoseSubmarkets';
import SanJosePracticeDemand from './SanJosePracticeDemand';
import SanJoseProblemTable from './SanJoseProblemTable';
import SanJoseProcessSteps from './SanJoseProcessSteps';
import SanJosePricingAndGuarantee from './SanJosePricingAndGuarantee';
import SanJoseFounderBio from './SanJoseFounderBio';
import SanJoseDemographyMap from './SanJoseDemographyMap';
import SanJoseFaqAndCta from './SanJoseFaqAndCta';

interface SanJoseWireframeViewProps {
  page: CityPage;
}

export default function SanJoseWireframeView({ page }: SanJoseWireframeViewProps) {
  return (
    <div className="w-full bg-white text-slate-900 selection:bg-neutral-900 selection:text-white font-sans">
      {/* 1. Hero Section: Pure white background, Semrush layout, floating elements, real WebP city image */}
      <SanJoseHero page={page} />

      {/* Universal Tagline Band under Hero */}
      <TaglinePainBand />

      {/* 2. Dual Pain Points: Out-of-Market SF Aggregators vs Burned by Annual Contracts */}
      <SanJosePainBanner />

      {/* 3. AEO Quick Answer for Google AI Overviews & ChatGPT */}
      <SanJoseQuickAnswer />

      {/* 4. Shakespeare Relief Quote: Easing the burden of law firm marketing anxiety */}
      <SanJoseReliefQuote />

      {/* 5. Interactive Practice Diagnosis & Reality Check Tool */}
      <SanJoseDiagnosisTool />

      {/* 6. Santa Clara County Court Jurisdictions & Statutory Silos */}
      <SanJoseCountyCourts />

      {/* 7. Six South Bay Tech Submarkets & Geo-Entity Targeting */}
      <SanJoseSubmarkets />

      {/* 8. Practice Demand Breakdown (Tech Employment, RSU Divorce, Startup IP, Injury) */}
      <SanJosePracticeDemand />

      {/* 9. Semrush-Style Problem Diagnosis & Fix Comparison Table */}
      <SanJoseProblemTable />

      {/* 10. 90-Day Systematic Process Steps */}
      <SanJoseProcessSteps />

      {/* 11. Transparent Pricing & Exclusivity Guarantees */}
      <SanJosePricingAndGuarantee />

      {/* 12. Founder-Led Accountability Bio */}
      <SanJoseFounderBio />

      {/* 13. San Jose Demographics, Real Consultation Photo, & Google Map */}
      <SanJoseDemographyMap />

      {/* 14. 8 PAA Accordion FAQs, Closing CTA Banner, and Bottom Tagline */}
      <SanJoseFaqAndCta faqs={page.faqs} />
    </div>
  );
}
