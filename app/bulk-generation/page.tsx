import type { Metadata } from "next";
import { BulkGenerator } from "@/app/components/bulk/bulk-generator";

import { getPageSEO } from "@/lib/admin-seo";
const baseMetadata: Metadata = {
  title: 'Bulk Content Generator — Searchprex',
};

// Metadata comes from the CMS row for this route; the object above is the
// fallback when that row is missing, unpublished, or the database is down.
export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("/bulk-generation", baseMetadata);
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