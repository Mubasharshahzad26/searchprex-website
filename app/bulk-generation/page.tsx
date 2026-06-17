import { BulkGenerator } from "@/app/components/bulk/bulk-generator";

export const metadata = {
  title: 'Bulk Content Generator — Searchprex',
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