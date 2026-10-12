'use client';

import React from 'react';
import type { CityPage } from '@/lib/city-pages';
import TaglinePainBand from '../TaglinePainBand';
import BatonRougeHero from './BatonRougeHero';
import BatonRougePainBanner from './BatonRougePainBanner';
import BatonRougeQuickAnswer from './BatonRougeQuickAnswer';
import BatonRougeReliefQuote from './BatonRougeReliefQuote';
import BatonRougeDiagnosisTool from './BatonRougeDiagnosisTool';
import BatonRougeCountyCourts from './BatonRougeCountyCourts';
import BatonRougeSubmarkets from './BatonRougeSubmarkets';
import BatonRougePracticeDemand from './BatonRougePracticeDemand';
import BatonRougeProblemTable from './BatonRougeProblemTable';
import BatonRougeProcessSteps from './BatonRougeProcessSteps';
import BatonRougePricingAndGuarantee from './BatonRougePricingAndGuarantee';
import BatonRougeFounderBio from './BatonRougeFounderBio';
import BatonRougeDemographyMap from './BatonRougeDemographyMap';
import BatonRougeFaqAndCta from './BatonRougeFaqAndCta';

interface BatonRougeWireframeViewProps {
  page: CityPage;
}

export default function BatonRougeWireframeView({ page }: BatonRougeWireframeViewProps) {
  return (
    <div className="w-full bg-white text-slate-900 selection:bg-[#4338ca] selection:text-white font-sans">
      {/* 1. Hero Section: Pure white background, Semrush layout, floating elements, real WebP city image */}
      <BatonRougeHero page={page} />

      {/* Universal Tagline Band under Hero */}
      <TaglinePainBand />

      {/* 2. Dual Pain Points: Out-of-Parish Aggregators vs Burned by Annual Contracts */}
      <BatonRougePainBanner />

      {/* 3. AEO Quick Answer for Google AI Overviews & ChatGPT */}
      <BatonRougeQuickAnswer />

      {/* 4. Shakespeare Relief Quote: Easing the burden of law firm marketing anxiety */}
      <BatonRougeReliefQuote />

      {/* 5. Interactive Practice Diagnosis & Reality Check Tool */}
      <BatonRougeDiagnosisTool />

      {/* 6. East Baton Rouge Parish Court Jurisdictions & Statutory Silos */}
      <BatonRougeCountyCourts />

      {/* 7. Six Capital Area Submarkets & Geo-Entity Targeting */}
      <BatonRougeSubmarkets />

      {/* 8. Practice Demand Breakdown (Freeway Injury, Plant Torts, Succession, Family) */}
      <BatonRougePracticeDemand />

      {/* 9. Semrush-Style Problem Diagnosis & Fix Comparison Table */}
      <BatonRougeProblemTable />

      {/* 10. 90-Day Systematic Process Steps */}
      <BatonRougeProcessSteps />

      {/* 11. Transparent Pricing & Exclusivity Guarantees */}
      <BatonRougePricingAndGuarantee />

      {/* 12. Founder-Led Accountability Bio */}
      <BatonRougeFounderBio />

      {/* 13. Baton Rouge Demographics, Real Consultation Photo, & Google Map */}
      <BatonRougeDemographyMap />

      {/* 14. 8 PAA Accordion FAQs, Closing CTA Banner, and Bottom Tagline */}
      <BatonRougeFaqAndCta faqs={page.faqs} />
    </div>
  );
}
