import KeywordTool from '@/components/keyword/keyword-tool'
import { getKeywords } from '@/lib/keyword-service'

export const dynamic = 'force-dynamic'

export default async function Page() {
  try {
    const initial = await getKeywords('running shoes', 'US')
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        <div className="max-w-7xl mx-auto">
          <KeywordTool initial={initial} />
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Error Loading Tool</h1>
          <p className="text-gray-600">{error instanceof Error ? error.message : 'Something went wrong'}</p>
        </div>
      </div>
    )
  }
}