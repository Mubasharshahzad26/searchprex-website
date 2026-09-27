import type { Metadata } from "next";
import { BulkGenerator } from "@/app/components/bulk/bulk-generator";

import { getPageSEO } from "@/lib/admin-seo";
const baseMetadata: Metadata = {
  title: 'Bulk Content Generator — Searchprex',
};

// Metadata comes from the CMS row for this route; the object above is the
// fallback when that row is missing, unpublished, or the database is down.
export async function generateMetadata(): Promise<Metadata> {
  // noindex: a thin utility/tool page that should not compete in search (SEO audit,
  // Sept 2026). Applied after getPageSEO so a published CMS row cannot reset it.
  const meta = await getPageSEO("/bulk-generation", baseMetadata);
  return { ...meta, robots: { index: false, follow: true } };
}

export default function BulkGenerationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <div className="max-w-7xl mx-auto">
        <BulkGenerator />
      </div>
    </div>
  )
}