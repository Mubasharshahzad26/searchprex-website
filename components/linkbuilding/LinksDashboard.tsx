'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle, CheckCircle2, ExternalLink, Link2, Mail, MapPin,
  Search, ShieldAlert, TrendingDown, Globe, HelpCircle, BarChart3, Clock,
  ArrowUpRight, ArrowDownRight, Activity, Sparkles, RefreshCw, Zap,
  Target, ShieldCheck, Play
} from 'lucide-react';
import type { DashboardData } from '@/lib/linkbuilding/dashboard-data';

type Tab = 'overview' | 'links' | 'prospects' | 'citations' | 'outreach' | 'properties';

const TABS: Array<{ id: Tab; label: string; icon: typeof Link2 }> = [
  { id: 'overview', label: 'Overview', icon: Activity },
  { id: 'links', label: 'Links', icon: Link2 },
  { id: 'prospects', label: 'Prospects', icon: Search },
  { id: 'citations', label: 'Citations', icon: MapPin },
  { id: 'outreach', label: 'Outreach', icon: Mail },
  { id: 'properties', label: 'Properties', icon: Globe },
];

const STATUS_STYLE: Record<string, string> = {
  live: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  nofollowed: 'text-amber-700 bg-amber-50 border-amber-200',
  changed: 'text-sky-700 bg-sky-50 border-sky-200',
  lost: 'text-rose-700 bg-rose-50 border-rose-200',
  page_gone: 'text-rose-700 bg-rose-50 border-rose-200',
  unreachable: 'text-slate-600 bg-slate-50 border-slate-200',
  pending: 'text-slate-600 bg-slate-50 border-slate-200',
  consistent: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  inconsistent: 'text-rose-700 bg-rose-50 border-rose-200',
  unverified: 'text-slate-600 bg-slate-50 border-slate-200',
  not_found: 'text-rose-700 bg-rose-50 border-rose-200',
};

function Pill({ status }: { status: string }) {
  const style = STATUS_STYLE[status] ?? 'text-slate-600 bg-slate-50 border-slate-200';
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium shadow-sm ${style}`}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}

function Stat({
  label, value, hint, tone = 'default',
}: {
  label: string;
  value: string | number;
  hint?: string;
  tone?: 'default' | 'good' | 'bad' | 'muted';
}) {
  const valueColor =
    tone === 'good' ? 'text-emerald-600'
      : tone === 'bad' ? 'text-rose-600'
        : tone === 'muted' ? 'text-slate-400'
          : 'text-slate-900';

  return (
    <motion.div 
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</div>
      <div className={`mt-2 text-3xl font-bold tabular-nums tracking-tight ${valueColor}`}>{value}</div>
      {hint && <div className="mt-2 text-xs font-medium text-slate-400">{hint}</div>}
      <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-slate-50 opacity-50" />
    </motion.div>
  );
}

function Panel({
  title, note, children, action,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
    >
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/50 px-5 py-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          {note && <p className="mt-1 text-xs font-medium text-slate-500">{note}</p>}
        </div>
        {action && <div>{action}</div>}
      </header>
      <div className="p-5">{children}</div>
    </motion.section>
  );
}

function Empty({ text, hint }: { text: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 mb-3">
        <HelpCircle className="h-6 w-6 text-slate-400" />
      </div>
      <p className="text-sm font-medium text-slate-600">{text}</p>
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

export default function LinksDashboard({
  data,
  currentCampaignId,
}: {
  data: DashboardData;
  currentCampaignId?: string;
}) {
  const [tab, setTab] = useState<Tab>('overview');
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(currentCampaignId || '');
  const [actionStatus, setActionStatus] = useState<string | null>(null);
  const [isRunningAction, setIsRunningAction] = useState<boolean>(false);

  // Initialize selected campaign from URL or storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const paramCampaign = urlParams.get('campaign');
      if (paramCampaign) {
        setSelectedCampaignId(paramCampaign);
        localStorage.setItem('links_selected_campaign', paramCampaign);
      } else {
        const saved = localStorage.getItem('links_selected_campaign');
        if (saved && data.campaigns.some(c => c.id === saved)) {
          // If in storage but not in URL, update URL
          window.location.search = `?campaign=${encodeURIComponent(saved)}`;
        }
      }
    }
  }, [data.campaigns]);

  if (data.dbError) {
    return (
      <div className="mx-auto max-w-lg p-6">
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-6 w-6 text-rose-500" />
            <h2 className="text-base font-semibold text-rose-900">Dashboard Unavailable</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-rose-700">
            The link building database could not be reached. The cron jobs will continue 
            to fail until the connection is restored.
          </p>
          <pre className="mt-4 rounded-lg bg-white p-3 text-xs text-rose-600 shadow-inner overflow-x-auto">
            {data.dbError}
          </pre>
        </div>
      </div>
    );
  }

  const { campaigns, links, prospects, citations, outreach, properties } = data;
  const activeCampaign = campaigns.find((c) => c.id === selectedCampaignId);

  const handleCampaignChange = (newId: string) => {
    setSelectedCampaignId(newId);
    if (typeof window !== 'undefined') {
      if (newId) {
        localStorage.setItem('links_selected_campaign', newId);
        window.location.search = `?campaign=${encodeURIComponent(newId)}`;
      } else {
        localStorage.removeItem('links_selected_campaign');
        window.location.search = '';
      }
    }
  };

  const handleRunAction = async (action: 'discover' | 'qualify' | 'verify' | 'followup' | 'authority') => {
    setIsRunningAction(true);
    setActionStatus(`Running ${action} pipeline...`);
    try {
      const targetCampaign = selectedCampaignId || undefined;
      const endpoint =
        action === 'followup'
          ? '/api/cron/outreach-followup'
          : action === 'authority'
          ? '/api/cron/authority-sync'
          : '/api/cron/backlinks-autopilot';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: action === 'followup' || action === 'authority' ? undefined : action,
          campaignId: targetCampaign,
        }),
      });
      const resData = await res.json();
      if (res.ok && resData.ok) {
        setActionStatus(`✓ Successfully completed ${action}! Refreshing dashboard...`);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setActionStatus(`Failed to execute: ${resData.error || 'Server error'}`);
      }
    } catch (err) {
      setActionStatus(`Error triggering ${action}: ${err instanceof Error ? err.message : 'Network error'}`);
    } finally {
      setIsRunningAction(false);
    }
  };

  const isMSO = activeCampaign?.targetDomain?.includes('michigansportsoutdoor.com');

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8 font-sans">
      {/* Top Header with Multi-Client Switcher */}
      <header className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                Link Building Autopilot
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-700 shadow-sm">
                <Zap className="h-3 w-3 fill-emerald-600 text-emerald-600" /> Daily Cadence Active
              </span>
            </div>
            <p className="mt-1.5 text-sm text-slate-500 font-medium">
              Autonomous discovery, AI relevance qualification & live placement monitoring.
            </p>
          </div>

          {/* Client & Campaign Dropdown Switcher */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Client:</span>
            <div className="relative">
              <select
                value={selectedCampaignId}
                onChange={(e) => handleCampaignChange(e.target.value)}
                className="rounded-xl border border-slate-300 bg-white py-2.5 pl-3.5 pr-8 text-sm font-bold text-slate-800 shadow-sm transition hover:border-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="">All Campaigns ({campaigns.length})</option>
                {campaigns.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.clientName} ({c.targetDomain})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-2 rounded-xl">
              <Clock className="h-3.5 w-3.5 text-blue-600" /> Live Data
            </div>
          </div>
        </div>

        {/* Dynamic Aggressive Authority Banner (When MSO or any campaign is active) */}
        {activeCampaign && (
          <div className={`mt-6 rounded-2xl border p-5 shadow-sm transition-all ${
            isMSO 
              ? 'border-blue-200 bg-gradient-to-r from-blue-50/80 via-indigo-50/60 to-sky-50/80' 
              : 'border-slate-200 bg-slate-50/70'
          }`}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-blue-600 px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider text-white">
                    {isMSO ? 'Aggressive Growth Campaign' : 'Active Client'}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">Target Domain:</span>
                  <a 
                    href={`https://${activeCampaign.targetDomain}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline"
                  >
                    {activeCampaign.targetDomain} <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <h3 className="text-lg font-black text-slate-900">
                  {activeCampaign.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                  {isMSO 
                    ? 'Engine targets High-DA outdoor/knife blogs, competitor backlink gaps (BladeHQ, KnifeCenter), and Web 2.0 authority hubs with safe anchor text distribution.'
                    : 'Engine monitors backlinks, qualified prospect pipeline, and local directory listings.'
                  }
                </p>
              </div>

              {/* Authority Goals for MSO */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-center shadow-xs">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Authority</div>
                  <div className="text-xl font-black text-slate-800">{isMSO ? 'DA 6' : 'Active'}</div>
                </div>
                {isMSO && (
                  <>
                    <div className="text-blue-500 font-black text-base hidden sm:block">➔</div>
                    <div className="rounded-xl border border-blue-200 bg-blue-600 px-4 py-2.5 text-center shadow-sm text-white">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-blue-200">Target Goal</div>
                      <div className="text-xl font-black">DA 25+</div>
                    </div>
                  </>
                )}
                <div className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-center shadow-xs">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Autopilot Cadence</div>
                  <div className="text-xs font-black text-emerald-600">Daily Runs</div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-4 pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs font-semibold text-slate-600">
                Trigger On-Demand Actions for <span className="font-bold text-slate-900">{activeCampaign.clientName}</span>:
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleRunAction('discover')}
                  disabled={isRunningAction}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 active:scale-95 transition disabled:opacity-50"
                >
                  <Search className="h-3.5 w-3.5 text-blue-600" /> Run Discovery Now
                </button>
                <button
                  onClick={() => handleRunAction('qualify')}
                  disabled={isRunningAction}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 active:scale-95 transition disabled:opacity-50"
                >
                  <Sparkles className="h-3.5 w-3.5 text-purple-600" /> Run AI Qualify
                </button>
                <button
                  onClick={() => handleRunAction('verify')}
                  disabled={isRunningAction}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 active:scale-95 transition disabled:opacity-50"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Verify Live Links
                </button>
                <button
                  onClick={() => handleRunAction('followup')}
                  disabled={isRunningAction}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 active:scale-95 transition disabled:opacity-50"
                >
                  <Mail className="h-3.5 w-3.5 text-indigo-600" /> Auto Follow-ups
                </button>
                <button
                  onClick={() => handleRunAction('authority')}
                  disabled={isRunningAction}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 active:scale-95 transition disabled:opacity-50"
                >
                  <BarChart3 className="h-3.5 w-3.5 text-amber-600" /> Sync DA Metrics
                </button>
              </div>
            </div>

            {/* Action status notification */}
            {actionStatus && (
              <div className="mt-3 rounded-lg bg-blue-100/70 border border-blue-200 px-3 py-2 text-xs font-medium text-blue-900 flex items-center gap-2">
                {isRunningAction ? <RefreshCw className="h-3.5 w-3.5 animate-spin text-blue-600" /> : <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />}
                {actionStatus}
              </div>
            )}
          </div>
        )}
      </header>

      {/* Tabs Navigation */}
      <nav className="mb-8 flex space-x-1 overflow-x-auto rounded-xl bg-slate-100 p-1 shadow-inner hide-scrollbar">
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = tab === id;
          return (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`relative flex min-w-max items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive 
                  ? 'text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              {isActive && (
                <motion.div layoutId="active-tab" className="absolute inset-0 rounded-lg bg-white" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className={`h-4 w-4 ${isActive ? 'text-blue-600' : 'opacity-70'}`} /> {label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Tabs Content */}
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
          {tab === 'overview' && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Stat label="Live Links" value={links.live} tone="good" hint="Total active placements" />
                <Stat label="Lost (This Month)" value={links.lostThisMonth} tone={links.lostThisMonth > 0 ? 'bad' : 'good'} hint="Requires replacement" />
                <Stat label="Pending Outreach" value={outreach.sent} hint="Emails sent, awaiting reply" />
                <Stat label="Total Prospects" value={prospects.discovered} hint="In the pipeline" />
              </div>

              <Panel 
                title="Active Campaigns" 
                note="Click any campaign to focus the dashboard exclusively on its pipeline."
                action={
                  selectedCampaignId ? (
                    <button 
                      onClick={() => handleCampaignChange('')} 
                      className="text-xs font-semibold text-blue-600 hover:underline"
                    >
                      Clear Filter (Show All)
                    </button>
                  ) : null
                }
              >
                {campaigns.length === 0 ? <Empty text="No active campaigns" hint="Create one via the CLI." /> : (
                  <div className="space-y-3">
                    {campaigns.map((c, i) => {
                      const isSelected = selectedCampaignId === c.id;
                      return (
                        <motion.div 
                          key={c.id} 
                          initial={{ opacity: 0, x: -10 }} 
                          animate={{ opacity: 1, x: 0 }} 
                          transition={{ delay: i * 0.05 }} 
                          onClick={() => handleCampaignChange(c.id)}
                          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border p-4 cursor-pointer transition-all ${
                            isSelected 
                              ? 'border-blue-500 bg-blue-50/50 shadow-xs ring-2 ring-blue-500/20' 
                              : 'border-slate-100 bg-slate-50 hover:bg-slate-100/80 hover:border-slate-200'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-slate-900">{c.clientName}</h4>
                              {!c.enabled && <Pill status="paused" />}
                              {isSelected && (
                                <span className="rounded-md bg-blue-600 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                                  Selected
                                </span>
                              )}
                            </div>
                            <div className="mt-1 text-xs text-slate-500">{c.targetDomain}</div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <div className="text-xs text-slate-400">Placements</div>
                              <div className="text-base font-bold text-slate-800">{c.placements}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-slate-400">Prospects</div>
                              <div className="text-base font-bold text-slate-800">{c.prospects}</div>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-bold text-blue-600 hover:underline">
                                {isSelected ? 'Focused' : 'Filter ➔'}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </Panel>
            </div>
          )}

          {tab === 'links' && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Stat label="Total Monitored" value={links.total} />
                <Stat label="Live & Followed" value={links.live} tone="good" />
                <Stat label="Nofollowed" value={links.nofollowed} tone="muted" hint="Still passes traffic" />
                <Stat label="Pending Check" value={links.pending} hint="Awaiting next daily cron" />
              </div>
              <Panel title="Recent Checks" note="Verification results for active placements.">
                {data.recentChecks.length === 0 ? (
                  <Empty text="No live checks run yet" hint="The verification cron runs daily to inspect backlinks." />
                ) : (
                  <div className="space-y-3">
                    {data.recentChecks.map((c, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="flex flex-col md:flex-row md:items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3">
                            <Pill status={c.status} />
                            <span className="text-xs text-slate-400 truncate">Checked {new Date(c.checkedAt).toLocaleDateString()}</span>
                          </div>
                          <a href={c.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block truncate text-sm font-semibold hover:text-blue-600">{c.sourceUrl}</a>
                        </div>
                        {c.reasons && c.reasons.length > 0 && <div className="rounded-lg border border-rose-100 bg-rose-50/50 px-3 py-2 text-xs text-rose-700">{c.reasons.join(', ')}</div>}
                      </motion.div>
                    ))}
                  </div>
                )}
              </Panel>
            </div>
          )}

          {tab === 'prospects' && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Stat label="Discovered" value={prospects.discovered} />
                <Stat label="Qualified" value={prospects.qualified} tone="good" />
                <Stat label="Rejected" value={prospects.rejected} tone="bad" />
                <Stat label="Average Score" value={prospects.averageScore === null ? 'N/A' : `${prospects.averageScore.toFixed(0)}/100`} />
              </div>
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Panel title="Top Qualified Prospects" note="The highest scored opportunities awaiting outreach.">
                    {data.topProspects.length === 0 ? <Empty text="No qualified prospects found yet" hint="Click 'Run AI Qualify' to evaluate discovered domains." /> : (
                      <div className="space-y-3">
                        {data.topProspects.map((p, i) => (
                          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 hover:border-blue-200 transition">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-black shadow-2xs">
                                  {p.score ?? 70}
                                </span>
                                <h4 className="text-sm font-bold truncate text-slate-900">{p.domain}</h4>
                              </div>
                              <p className="mt-1.5 text-xs text-slate-500 truncate">Source: {p.discoveredVia}</p>
                            </div>
                            <a href={p.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold shadow-2xs border border-slate-200 hover:bg-slate-50">
                              Visit <ExternalLink className="h-3 w-3" />
                            </a>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </Panel>
                </div>
                <div>
                  <Panel title="Rejection Filter Reasons" note="Why domains fail our quality gates.">
                    {prospects.topRejects.length === 0 ? <Empty text="No rejected prospects yet" /> : (
                      <div className="space-y-2">
                        {prospects.topRejects.map((r, i) => (
                          <div key={i} className="flex items-center justify-between rounded-lg bg-slate-50 p-3 border border-slate-100">
                            <span className="text-xs font-medium text-slate-700">{r.reason.replace(/_/g, ' ')}</span>
                            <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-bold text-slate-600">{r.count}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </Panel>
                </div>
              </div>
            </div>
          )}

          {tab === 'outreach' && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <Stat label="Awaiting Approval" value={outreach.awaitingApproval} />
                <Stat label="Approved, Unsent" value={outreach.approved} />
                <Stat label="Sent" value={outreach.sent} />
                <Stat label="Replied" value={outreach.replied} tone="good" />
                <Stat label="Suppressed" value={outreach.suppressed} tone="muted" />
              </div>
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Panel title="Approval Queue" note="Read every pitch. Never send cold emails without review.">
                    {data.approvalQueue.length === 0 ? (
                      <Empty text="Nothing waiting for approval" hint="Drafts will appear here once outreach batches are generated." />
                    ) : (
                      <div className="space-y-4">
                        {data.approvalQueue.map((m) => (
                          <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
                            <div className="border-b border-slate-100 bg-slate-50/80 p-4">
                              <div className="text-xs font-semibold text-slate-600">To: {m.contactEmail}</div>
                              <div className="mt-1 text-sm font-bold text-slate-900">{m.subject}</div>
                            </div>
                            <div className="p-4">
                              <pre className="whitespace-pre-wrap font-sans text-[13px] text-slate-700 leading-relaxed">{m.body}</pre>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </Panel>
                </div>
                <div>
                  <Panel title="Outreach Mailboxes" note="Warming up or Active.">
                    {outreach.mailboxes.length === 0 ? (
                      <Empty text="No mailbox configured" hint="Configure a secondary domain mailbox for cold sending." />
                    ) : (
                      <div className="space-y-3">
                        {outreach.mailboxes.map((m) => (
                          <div key={m.id} className="rounded-xl border border-slate-200 bg-white p-4">
                            <div className="flex items-center gap-2">
                              {m.active ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <AlertTriangle className="h-4 w-4 text-amber-500" />}
                              <span className="text-sm font-bold">{m.fromEmail}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </Panel>
                </div>
              </div>
            </div>
          )}

          {tab === 'properties' && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Stat label="Branded Properties" value={properties.total} />
                <Stat label="Live Properties" value={properties.live} tone="good" />
                <Stat label="Published Posts" value={properties.posts} />
                <Stat label="Empty Properties" value={properties.empty} tone={properties.empty > 0 ? 'bad' : 'muted'} />
              </div>
              <Panel title="Tier-1 Branded Properties (Web 2.0 Authority Hubs)" note="Foundational high-DA backlinks from Medium, Substack, LinkedIn Pulse and Telegra.ph.">
                <div className="rounded-xl bg-slate-50 p-5 border border-slate-100 text-sm text-slate-700 leading-relaxed">
                  <p className="font-semibold text-slate-900">Foundational Tier-1 Backlinks Strategy:</p>
                  <p className="mt-2 text-xs text-slate-600">
                    Authoritative pillar articles published on high-authority platforms linking to MSO collection hubs and product guides.
                    Enforces strict footprint audits to keep the portfolio natural, varied, and safe.
                  </p>
                </div>
              </Panel>
            </div>
          )}

          {tab === 'citations' && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Stat label="Directories to Submit" value={citations.queued} />
                <Stat label="Consistent Citations" value={citations.consistent} tone="good" />
                <Stat label="Inconsistent" value={citations.inconsistent} tone="bad" />
                <Stat label="Average NAP Score" value={citations.averageNap === null ? '-' : `${citations.averageNap.toFixed(0)}%`} />
              </div>
              <Panel title="Local & Niche Directory Citations" note="High-authority business registries and outdoor trade directories.">
                <div className="rounded-xl bg-slate-50 p-5 border border-slate-100 text-sm text-slate-700 leading-relaxed">
                  <p className="font-semibold text-slate-900">Foundational Authority Submissions:</p>
                  <p className="mt-2 text-xs text-slate-600">
                    Guarantees consistent Name, Address, and Phone across high-trust directories (DA 40–70+), establishing baseline entity trust for Google.
                  </p>
                </div>
              </Panel>
            </div>
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  );
}