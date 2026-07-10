'use client'

import { useEffect, useState } from 'react'
import {
  Activity,
  CheckCircle2,
  XCircle,
  FileText,
  ChevronDown,
} from 'lucide-react'
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

// Metric Card — Semrush/NicheSEO style
function MetricCard({
  label,
  value,
  icon: Icon,
  iconColor,
  iconBg,
}: {
  label: string
  value: number | string
  icon: any
  iconColor: string
  iconBg: string
}) {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 hover:border-neutral-300 transition-colors duration-200">
      <div className="flex items-start justify-between mb-4">
        <p className="text-xs uppercase tracking-wider font-medium text-neutral-500">
          {label}
        </p>
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg}`}
        >
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
      </div>
      <p className="text-4xl font-bold text-neutral-900 tabular-nums tracking-tight">
        {value}
      </p>
    </div>
  )
}

export default function AutopilotDashboard() {
  const [runs, setRuns] = useState<Run[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [selectedClient, setSelectedClient] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved =
      typeof window !== 'undefined'
        ? localStorage.getItem('autopilot_selected_client')
        : null
    if (saved) setSelectedClient(saved)
  }, [])

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

  const successCount = runs.filter((r) => r.status === 'success').length
  const failedCount = runs.filter((r) => r.status === 'error').length
  const totalPages = runs.reduce((s, r) => s + (r.pagesGenerated || 0), 0)

  if (loading)
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <p className="text-neutral-500">Loading...</p>
      </div>
    )

  return (
    <div className="min-h-screen bg-neutral-50 px-4 sm:px-8 pt-28 pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              SEO Autopilot
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              {selectedClientName ? (
                <>
                  Viewing{' '}
                  <span className="text-neutral-900 font-medium">
                    {selectedClientName}
                  </span>
                </>
              ) : (
                'Overview of all client runs and pipelines'
              )}
            </p>
          </div>

          {clients.length > 0 && (
            <div className="relative">
              <select
                value={selectedClient}
                onChange={(e) => handleClientChange(e.target.value)}
                className="appearance-none bg-white border border-neutral-200 text-neutral-900 text-sm font-medium rounded-xl pl-4 pr-10 py-2.5 focus:outline-none focus:border-neutral-900 focus:ring-2 focus:ring-neutral-100 cursor-pointer min-w-[220px]"
              >
                <option value="">All Clients</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.companyName}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <MetricCard
            label="Total Runs"
            value={runs.length}
            icon={Activity}
            iconColor="text-neutral-700"
            iconBg="bg-neutral-100"
          />
          <MetricCard
            label="Successful"
            value={successCount}
            icon={CheckCircle2}
            iconColor="text-green-600"
            iconBg="bg-green-50"
          />
          <MetricCard
            label="Failed"
            value={failedCount}
            icon={XCircle}
            iconColor="text-red-600"
            iconBg="bg-red-50"
          />
          <MetricCard
            label="Pages Generated"
            value={totalPages}
            icon={FileText}
            iconColor="text-[#ff5e2e]"
            iconBg="bg-orange-50"
          />
        </div>

        {/* Recent Runs Table — abhi ke liye purana rakha hai, next section mein redesign hoga */}
        <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-neutral-200">
            <h2 className="text-lg font-bold text-neutral-900">Recent Runs</h2>
          </div>
          {runs.length === 0 ? (
            <p className="p-6 text-neutral-500 text-sm">
              {selectedClientName
                ? `No runs yet for ${selectedClientName}.`
                : 'No runs yet.'}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs uppercase tracking-wider font-medium text-neutral-500">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs uppercase tracking-wider font-medium text-neutral-500">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs uppercase tracking-wider font-medium text-neutral-500">
                      Pages
                    </th>
                    <th className="px-6 py-3 text-left text-xs uppercase tracking-wider font-medium text-neutral-500">
                      Started
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {runs.slice(0, 10).map((run) => (
                    <tr
                      key={run.id}
                      className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-neutral-900 font-medium">
                        {run.client?.companyName ?? run.clientId}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            run.status === 'success'
                              ? 'bg-green-50 text-green-700 border border-green-200'
                              : run.status === 'running'
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : 'bg-red-50 text-red-700 border border-red-200'
                          }`}
                        >
                          {run.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-700 tabular-nums">
                        {run.pagesGenerated || 0}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-500">
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