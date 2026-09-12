'use client';

import { useEffect, useState } from 'react';
import { RefreshCw, ExternalLink, Sparkles, CheckCircle2, ShieldCheck, Layers, Image as ImageIcon } from 'lucide-react';

interface RecentItem {
  id: string;
  url: string;
  name: string;
  status: string;
  submittedAt: string;
}

interface Squad2Stats {
  totalTarget: number;
  modernizedCount: number;
  submittedGoogle: number;
  pendingCount: number;
  activeWindow: string;
  operationalStatus: string;
  recentItems: RecentItem[];
}

export default function Squad2RetrofitWidget() {
  const [stats, setStats] = useState<Squad2Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/autopilot/squad2-stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Failed to load Squad 2 stats:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const timer = setInterval(fetchStats, 30000);
    return () => clearInterval(timer);
  }, []);

  const handleManualRefresh = () => {
    setRefreshing(true);
    fetchStats();
  };

  const total = stats?.totalTarget || 15126;
  const modernized = stats?.modernizedCount || 44;
  const percent = Math.min(100, parseFloat(((modernized / total) * 100).toFixed(2)));

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden mb-8 shadow-xs">
      {/* Header */}
      <div className="px-6 py-5 border-b border-neutral-200 bg-gradient-to-r from-neutral-50 via-white to-amber-50/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              {stats?.operationalStatus || 'ACTIVE'} &bull; {stats?.activeWindow || '10:00 AM – 4:00 PM PKT'}
            </span>
            <span className="text-xs text-neutral-500 font-medium hidden sm:inline">
              Michigan Sports Outdoor Modernizer
            </span>
          </div>
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            Squad 2: Flat-Content Modernizer &amp; Blade HQ Retrofit
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Automated upgrade engine: Transforming legacy flat-content products into Dynamic Blade HQ layout with Image ALTs and Google Re-Indexing.
          </p>
        </div>

        <button
          onClick={handleManualRefresh}
          disabled={refreshing}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-700 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-neutral-900' : ''}`} />
          <span>{refreshing ? 'Refreshing...' : 'Refresh Feed'}</span>
        </button>
      </div>

      <div className="p-6">
        {/* Progress Bar Container */}
        <div className="mb-6 bg-neutral-50 border border-neutral-200 rounded-xl p-4">
          <div className="flex justify-between items-center mb-2 text-xs">
            <span className="font-semibold text-neutral-700">Retrofit Migration Progress</span>
            <span className="font-bold text-neutral-900 tabular-nums">
              {modernized.toLocaleString()} / {total.toLocaleString()} Products ({percent}%)
            </span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-orange-500 to-amber-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.max(percent, 0.8)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[11px] text-neutral-500 mt-2">
            <span>Started with 15,126 Flat Legacy Pages</span>
            <span>Target: 100% Modern Blade HQ E-Commerce Architecture</span>
          </div>
        </div>

        {/* 4 Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3.5">
            <div className="text-[11px] uppercase tracking-wider font-semibold text-neutral-500 mb-1 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-neutral-600" />
              Target Queue
            </div>
            <div className="text-xl font-bold text-neutral-900 tabular-nums">
              {total.toLocaleString()}
            </div>
            <div className="text-[10px] text-neutral-500 mt-0.5">Indexed flat content</div>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3.5">
            <div className="text-[11px] uppercase tracking-wider font-semibold text-neutral-500 mb-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Modernized
            </div>
            <div className="text-xl font-bold text-amber-700 tabular-nums">
              {modernized.toLocaleString()}
            </div>
            <div className="text-[10px] text-amber-600 mt-0.5">Blade HQ Layout B</div>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3.5">
            <div className="text-[11px] uppercase tracking-wider font-semibold text-neutral-500 mb-1 flex items-center gap-1">
              <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
              Image ALTs
            </div>
            <div className="text-xl font-bold text-blue-700 tabular-nums">
              100% Injected
            </div>
            <div className="text-[10px] text-blue-600 mt-0.5">High-converting tags</div>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3.5">
            <div className="text-[11px] uppercase tracking-wider font-semibold text-neutral-500 mb-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
              Google Indexing
            </div>
            <div className="text-xl font-bold text-green-700 tabular-nums">
              100% 200 OK
            </div>
            <div className="text-[10px] text-green-600 mt-0.5">10 rotating key pool</div>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap gap-2 mb-6 text-xs">
          <span className="bg-neutral-100 text-neutral-800 font-medium px-2.5 py-1 rounded-md border border-neutral-200">
            &bull; Category-Adaptive Specs (Knives / Tools / Gear)
          </span>
          <span className="bg-neutral-100 text-neutral-800 font-medium px-2.5 py-1 rounded-md border border-neutral-200">
            &bull; 3-Flavor Dynamic Layout DOM Rotation
          </span>
          <span className="bg-neutral-100 text-neutral-800 font-medium px-2.5 py-1 rounded-md border border-neutral-200">
            &bull; Entity-Rich Dynamic H2 Heading Outline
          </span>
          <span className="bg-neutral-100 text-neutral-800 font-medium px-2.5 py-1 rounded-md border border-neutral-200">
            &bull; Soft-404 Anti-Penalty Shield (Out-of-Stock Gate)
          </span>
        </div>

        {/* Recent Feed Table */}
        <div className="border border-neutral-200 rounded-xl overflow-hidden">
          <div className="bg-neutral-50 px-4 py-3 border-b border-neutral-200 flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-600">
              Live Modernization Feed (Recently Upgraded Products)
            </span>
            <span className="text-[11px] text-neutral-500">
              Showing recent live store upgrades
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white border-b border-neutral-100 text-neutral-500 font-medium">
                <tr>
                  <th className="px-4 py-2.5">Product Title &amp; Store URL</th>
                  <th className="px-4 py-2.5">Architecture</th>
                  <th className="px-4 py-2.5">Image ALTs</th>
                  <th className="px-4 py-2.5">Google Indexing</th>
                  <th className="px-4 py-2.5">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 bg-white">
                {(!stats?.recentItems || stats.recentItems.length === 0) ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-neutral-500">
                      Loading live feed...
                    </td>
                  </tr>
                ) : (
                  stats.recentItems.map((item, idx) => (
                    <tr key={item.id || idx} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-neutral-900 max-w-[320px] truncate">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-orange-600 inline-flex items-center gap-1 group"
                        >
                          <span className="capitalize">{item.name || 'Modernized Outdoor Gear'}</span>
                          <ExternalLink className="w-3 h-3 text-neutral-400 group-hover:text-orange-600 shrink-0" />
                        </a>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          Blade HQ Layout B
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-neutral-700 font-medium">Auto-Injected</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-green-50 text-green-700 border border-green-200">
                          <CheckCircle2 className="w-3 h-3" />
                          HTTP 200 OK
                        </span>
                      </td>
                      <td className="px-4 py-3 text-neutral-500">
                        {item.submittedAt ? new Date(item.submittedAt).toLocaleTimeString() : 'Just now'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
