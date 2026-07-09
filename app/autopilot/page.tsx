'use client'

import { useEffect, useState } from 'react'
import PendingReview from '@/components/autopilot/PendingReview'
import IndexingStats from '@/components/autopilot/IndexingStats'
import AuditStats from '@/components/autopilot/AuditStats'
import RoadmapWidget from '@/components/autopilot/RoadmapWidget'

interface Client {
  id: string
  companyName: string
  domain: string
}

interface Run {
  id: string
  clientId: string
  client?: Client | null
  status: string
  pagesGenerated?: number
  startedAt: string
}

export default function AutopilotDashboard() {
  const [runs, setRuns] = useState<Run[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [selectedClient, setSelectedClient] = useState<string>('')
  const [loading, setLoading] = useState(true)

  // localStorage se saved client load
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('autopilot_selected_client') : null
    if (saved) setSelectedClient(saved)
  }, [])

  // Data fetch (selectedClient badalne pe bhi)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = selectedClient
          ? `/api/autopilot/status?clientId=${encodeURIComponent(selectedClient)}`
          : '/api/autopilot/status'
        const res = await fetch(url)
        const data = await res.json()
        setRuns(data.runs || [])
        setClients(data.clients || [])
      } catch {
        setRuns([])
        setClients([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [selectedClient])

  const handleClientChange = (id: string) => {
    setSelectedClient(id)
    if (typeof window !== 'undefined') {
      if (id) localStorage.setItem('autopilot_selected_client', id)
      else localStorage.removeItem('autopilot_selected_client')
    }
  }

  const selectedClientName =
    selectedClient && clients.find((c) => c.id === selectedClient)?.companyName

  if (loading) return <div className="p-8 text-white">Loading...</div>

  return (
    <div className="min-h-screen bg-[#08080f] px-4 sm:px-8 pt-28 pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Header + Client Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">SEO Autopilot Dashboard</h1>
            {selectedClientName && (
              <p className="text-sm text-white/50 mt-1">
                Viewing: <span className="text-[#818cf8]">{selectedClientName}</span>
              </p>
            )}
          </div>

          {clients.length > 0 && (
            <div className="flex items-center gap-2">
              <label className="text-sm text-white/60">Client:</label>
              <select
  value={selectedClient}
  onChange={(e) => handleClientChange(e.target.value)}
  className="bg-[#1a1a2e] border border-white/[0.1] text-white text-sm rounded-lg px-4 py-2 focus:outline-none focus:border-[#818cf8] cursor-pointer"
  style={{ colorScheme: 'dark' }}
>
              
                <option value="">All Clients</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.companyName}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Summary Cards */}
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

        {/* Recent Runs Table */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/[0.06]">
            <h2 className="text-lg font-bold text-white">Recent Runs</h2>
          </div>
          {runs.length === 0 ? (
            <p className="p-6 text-white/30 text-sm">
              {selectedClientName
                ? `No runs yet for ${selectedClientName}.`
                : 'No runs yet. Database setup pending or no autopilot runs triggered.'}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
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
                      <td className="px-6 py-4 text-sm text-white/70">
                        {run.client?.companyName ?? run.clientId}
                      </td>
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
            </div>
          )}
        </div>

        <PendingReview />
        <IndexingStats />
        <AuditStats />
        <RoadmapWidget />
      </div>
    </div>
  )
}