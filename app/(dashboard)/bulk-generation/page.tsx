import { Shell } from '@/components/dashboard/shell'
import { BulkGenerator } from '@/components/bulk/bulk-generator'

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
