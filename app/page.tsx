import { PersonaProvider } from "@/context/PersonaContext";
 
// ── Existing components ──
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Results from "@/components/Results";
import Reviews from "@/components/Reviews";
import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
 
// ── New components ──
import PersonaSwitcher from "@/components/PersonaSwitcher";
import AudienceSections from "@/components/AudienceSections";
import AnxietyResolver from "@/components/AnxietyResolver";
import Comparison from "@/components/Comparison";
import ROICalculator from "@/components/ROICalculator";
 
export default function Home() {
  return (
    <PersonaProvider>
      {/* ═══ 1. HOOK — grab attention + capture lead ═══ */}
      <Hero />
      <PersonaSwitcher />
 
      {/* ═══ 2. CONNECT — speak to their exact situation ═══ */}
      <AudienceSections />
 
      {/* ═══ 3. EDUCATE — what we do + why it matters ═══ */}
      <Services />
      <Process />
 
      {/* ═══ 4. CONVINCE — logic, trust, math ═══ */}
      <Comparison />
      <ROICalculator />
      <AnxietyResolver />
 
      {/* ═══ 5. PROVE — results + social proof ═══ */}
      <Results />
      <Reviews />
 
      {/* ═══ 6. CONVERT — price + objections + final push ═══ */}
      <Pricing />
      <FAQ />
      <CTA />
    </PersonaProvider>
  );
}
 