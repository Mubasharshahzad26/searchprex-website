import type { Metadata } from "next";
import CaseCalculator from "@/app/components/case-calculator/case-calculator";
import { getPageSEO } from "@/lib/admin-seo";
const baseMetadata: Metadata = {
  title: "Personal Injury Lost Case Calculator",
  description:
    "See how much revenue your personal injury firm is leaking from SEO visibility gaps and slow client intake. Free, instant estimate based on real local search demand.",
};

// Metadata comes from the CMS row for this route; the object above is the
// fallback when that row is missing, unpublished, or the database is down.
export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("/case-calculator", baseMetadata);
}
 
export default function CaseCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <div className="mx-auto max-w-4xl">
        <CaseCalculator />
      </div>
    </div>
  );
}
 