import { Shell } from "@/app/components/dashboard/shell";
import { BulkGenerator } from "@/app/components/bulk/bulk-generator";

export const metadata = {
  title: 'Bulk Content Generator — Rankforge',
}

export default function BulkGenerationPage() {
  return (
    <Shell>
      <BulkGenerator />
    </Shell>
  )
}