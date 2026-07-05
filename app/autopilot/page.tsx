'use client'

import { useEffect, useState } from 'react'
import PendingReview from '@/components/autopilot/PendingReview'

export default function AutopilotDashboard() {
  const [runs, setRuns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRuns = async () => {
      try {
        const res = await fetch('/api/autopilot/status')
        const data = await res.json()
        setRuns(data.runs || [])
      } catch {
        setRuns([])
      } finally {
        setLoading(false)
      }
    }
    fetchRuns()
    const interval = setInterval(fetchRuns, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) return <div className="p-8 text-white">Loading...</div>

  return (
    <div className="min-h-screen bg-[#08080f] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">SEO Autopilot Dashboard</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/[0.03] border border-white/[0.08] p-6 rounded-2xl">
            <p className="text-white/40 text-sm">Total Runs</p>
            <p className="text-3xl font-bold text-white">{runs.length}</p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.08] p-6 rounded-2xl">
            <p className="text-white/40 text-sm">Successful</p>
            <p className="text-3xl font-bold text-green-400">
              {runs.filter((r) => r.status === 'success').length}
            </p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.08] p-6 rounded-2xl">
            <p className="text-white/40 text-sm">Failed</p>
            <p className="text-3xl font-bold text-red-400">
              {runs.filter((r) => r.status === 'error').length}
            </p>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.08] p-6 rounded-2xl">
            <p className="text-white/40 text-sm">Pages Generated</p>
            <p className="text-3xl font-bold text-[#818cf8]">
              {runs.reduce((s, r) => s + (r.pagesGenerated || 0), 0)}
            </p>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/[0.06]">
            <h2 className="text-lg font-bold text-white">Recent Runs</h2>
          </div>
          {runs.length === 0 ? (
            <p className="p-6 text-white/30 text-sm">
              No runs yet. Database setup pending or no autopilot runs triggered.
            </p>
          ) : (
            <table className="w-full">
              <thead className="border-b border-white/[0.06]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-white/40 uppercase">Client</th>
                  <th className="px-6 py-3 text-left text-xs text-white/40 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs text-white/40 uppercase">Pages</th>
                  <th className="px-6 py-3 text-left text-xs text-white/40 uppercase">Started</th>
                </tr>
              </thead>
              <tbody>
                {runs.slice(0, 10).map((run) => (
                  <tr key={run.id} className="border-b border-white/[0.04]">
                    <td className="px-6 py-4 text-sm text-white/70">{run.clientId}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          run.status === 'success'
                            ? 'bg-green-500/10 text-green-400'
                            : run.status === 'running'
                              ? 'bg-blue-500/10 text-blue-400'
                              : 'bg-red-500/10 text-red-400'
                        }`}
                      >
                        {run.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/70">{run.pagesGenerated || 0}</td>
                    <td className="px-6 py-4 text-sm text-white/40">
                      {new Date(run.startedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <PendingReview />
      </div>
    </div>
  )
}