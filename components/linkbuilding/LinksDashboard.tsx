'use client';

import { useState } from 'react';
import {
  AlertTriangle, CheckCircle2, ExternalLink, Link2, Mail, MapPin,
  Search, ShieldAlert, TrendingDown, Globe, HelpCircle,
} from 'lucide-react';
import type { DashboardData } from '@/lib/linkbuilding/dashboard-data';

type Tab = 'overview' | 'links' | 'prospects' | 'citations' | 'outreach' | 'properties';

const TABS: Array<{ id: Tab; label: string; icon: typeof Link2 }> = [
  { id: 'overview', label: 'Overview', icon: TrendingDown },
  { id: 'links', label: 'Links', icon: Link2 },
  { id: 'prospects', label: 'Prospects', icon: Search },
  { id: 'citations', label: 'Citations', icon: MapPin },
  { id: 'outreach', label: 'Outreach', icon: Mail },
  { id: 'properties', label: 'Properties', icon: Globe },
];

/** Status → colour. `unreachable` is deliberately neutral, not red. */
const STATUS_STYLE: Record<string, string> = {
  live: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  nofollowed: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  changed: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
  lost: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
  page_gone: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
  unreachable: 'text-slate-400 bg-white/[0.04] border-slate-200',
  pending: 'text-slate-400 bg-white/[0.04] border-slate-200',
  consistent: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  inconsistent: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
  unverified: 'text-slate-400 bg-white/[0.04] border-slate-200',
  not_found: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
};

function Pill({ status }: { status: string }) {
  const style = STATUS_STYLE[status] ?? 'text-slate-400 bg-white/[0.04] border-slate-200';
  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium ${style}`}>
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
    tone === 'good' ? 'text-emerald-400'
      : tone === 'bad' ? 'text-rose-400'
        : tone === 'muted' ? 'text-slate-400'
          : 'text-slate-900';

  return (
    <div className="rounded-xl border border-white/[0.06] bg-slate-50 p-4">
      <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400">{label}</div>
      <div className={`mt-1.5 text-2xl font-semibold tabular-nums ${valueColor}`}>{value}</div>
      {hint && <div className="mt-1 text-[11px] leading-snug text-white/30">{hint}</div>}
    </div>
  );
}

function Panel({
  title, note, children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-white/[0.06] bg-slate-50">
      <header className="border-b border-white/[0.06] px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        {note && <p className="mt-0.5 text-[11px] leading-snug text-white/35">{note}</p>}
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}

function Empty({ text, hint }: { text: string; hint?: string }) {
  return (
    <div className="py-8 text-center">
      <p className="text-sm text-slate-400">{text}</p>
      {hint && <p className="mt-1 text-[11px] text-white/25">{hint}</p>}
    </div>
  );
}

function host(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export default function LinksDashboard({ data }: { data: DashboardData }) {
  const [tab, setTab] = useState<Tab>('overview');
  const { links, prospects, citations, outreach, properties } = data;

  if (data.dbError) {
    return (
      <div className="p-6 lg:p-8">
        <div className="mx-auto max-w-2xl rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-6">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-400" />
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Database unreachable</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-white/50">
                The dashboard could not read its data. Nothing is broken in the link
                building module itself — this is the database connection.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-lg border border-white/[0.06] bg-black/30 p-3 text-[11px] leading-relaxed text-amber-200/70">
                {data.dbError}
              </pre>
              <p className="mt-3 text-[11px] leading-relaxed text-white/30">
                If this mentions a compute quota, the Neon endpoint is suspended and will
                come back when the quota resets or the plan is upgraded.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //  Health is measured over placements we actually got a verdict on. Both
  //  `pending` (never checked) and `unreachable` (checked, but the page would
  //  not answer) are excluded — counting an unreadable page against the score
  //  would contradict the rule the whole module is built on, that failing to
  //  look is not the same as finding the link gone.
  const verdicts = links.total - links.pending - links.unreachable;
  const healthPct = verdicts > 0 ? Math.round((links.live / verdicts) * 100) : null;

  return (
    <div className="p-6 lg:p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Link Building</h1>
        <p className="mt-1 text-sm text-slate-400">
          {data.campaigns.length} campaign{data.campaigns.length === 1 ? '' : 's'} ·{' '}
          {links.total} tracked placement{links.total === 1 ? '' : 's'}
        </p>
      </header>

      <nav className="mb-6 flex flex-wrap gap-1 border-b border-white/[0.06]">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-sm transition-colors ${
              tab === id
                ? 'border-[#818cf8] text-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </nav>

      {tab === 'overview' && (
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Stat
              label="Verified live"
              value={links.live}
              tone={links.live > 0 ? 'good' : 'default'}
              hint="Present, followable, pointing where expected"
            />
            <Stat
              label="Lost this month"
              value={links.lostThisMonth}
              tone={links.lostThisMonth > 0 ? 'bad' : 'default'}
              hint="Page loaded, link was not on it"
            />
            <Stat
              label="Nofollowed"
              value={links.nofollowed}
              tone={links.nofollowed > 0 ? 'default' : 'muted'}
              hint="Present but passing no signal"
            />
            <Stat
              label="Link health"
              value={healthPct === null ? '—' : `${healthPct}%`}
              hint={
                verdicts === 0
                  ? 'Nothing verified yet'
                  : `${links.live} live of ${verdicts} verified${
                      links.unreachable > 0 ? ` · ${links.unreachable} unreadable, excluded` : ''
                    }`
              }
            />
          </div>

          {links.unreachable > 0 && (
            <div className="flex items-start gap-2.5 rounded-xl border border-white/[0.06] bg-slate-50 px-4 py-3">
              <HelpCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-white/30" />
              <p className="text-[12px] leading-relaxed text-slate-400">
                <span className="font-medium text-slate-500">
                  {links.unreachable} placement{links.unreachable === 1 ? '' : 's'} could not be
                  checked
                </span>{' '}
                — a bot wall, timeout or server error. This is not the same as lost, and none
                of them have been counted as lost.
              </p>
            </div>
          )}

          <div className="grid gap-5 lg:grid-cols-2">
            <Panel
              title="Pipeline"
              note="Prospects found and assessed. Nothing here has been contacted."
            >
              <dl className="space-y-2.5 text-sm">
                {[
                  ['Discovered, not yet assessed', prospects.discovered, 'text-slate-500'],
                  ['Qualified', prospects.qualified, 'text-emerald-400'],
                  ['Rejected', prospects.rejected, 'text-slate-400'],
                  ['Contacted', prospects.contacted, 'text-sky-400'],
                ].map(([label, value, color]) => (
                  <div key={label as string} className="flex justify-between">
                    <dt className="text-slate-400">{label as string}</dt>
                    <dd className={`font-medium tabular-nums ${color as string}`}>{value as number}</dd>
                  </div>
                ))}
                {prospects.averageScore !== null && (
                  <div className="flex justify-between border-t border-white/[0.06] pt-2.5">
                    <dt className="text-slate-400">Average quality score</dt>
                    <dd className="font-medium tabular-nums text-slate-900">
                      {prospects.averageScore.toFixed(0)}/100
                    </dd>
                  </div>
                )}
              </dl>
            </Panel>

            <Panel
              title="Citations"
              note="Directory listings. Counted separately from links — most pass no ranking signal."
            >
              <dl className="space-y-2.5 text-sm">
                {[
                  ['To submit', citations.queued],
                  ['Consistent', citations.consistent],
                  ['Inconsistent', citations.inconsistent],
                  ['Could not read', citations.unverified],
                ].map(([label, value]) => (
                  <div key={label as string} className="flex justify-between">
                    <dt className="text-slate-400">{label as string}</dt>
                    <dd className="font-medium tabular-nums text-slate-900">{value as number}</dd>
                  </div>
                ))}
                <div className="flex justify-between border-t border-white/[0.06] pt-2.5">
                  <dt className="text-slate-400">Followable links among them</dt>
                  <dd className="font-medium tabular-nums text-slate-900">{citations.followableLinks}</dd>
                </div>
              </dl>
            </Panel>
          </div>

          <Panel title="Campaigns">
            {data.campaigns.length === 0 ? (
              <Empty
                text="No campaigns yet"
                hint="Create one: npx tsx scripts/run-link-discovery.ts --create <clientId>"
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06] text-left text-[11px] uppercase tracking-wider text-white/30">
                      <th className="pb-2 font-medium">Campaign</th>
                      <th className="pb-2 font-medium">Target</th>
                      <th className="pb-2 text-right font-medium">Links</th>
                      <th className="pb-2 text-right font-medium">Prospects</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {data.campaigns.map((c) => (
                      <tr key={c.id}>
                        <td className="py-2.5">
                          <span className="text-slate-900">{c.name}</span>
                          <span className="ml-2 text-[11px] text-white/30">{c.clientName}</span>
                          {!c.enabled && (
                            <span className="ml-2 text-[11px] text-amber-400/70">paused</span>
                          )}
                        </td>
                        <td className="py-2.5 text-white/50">{c.targetDomain}</td>
                        <td className="py-2.5 text-right tabular-nums text-slate-600">{c.placements}</td>
                        <td className="py-2.5 text-right tabular-nums text-slate-600">{c.prospects}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Panel>
        </div>
      )}

      {tab === 'links' && (
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <Stat label="Live" value={links.live} tone="good" />
            <Stat label="In article" value={links.inContent} hint="Not footer or nav" />
            <Stat label="Nofollowed" value={links.nofollowed} />
            <Stat label="Changed" value={links.changed} hint="Anchor or target drifted" />
            <Stat label="Lost" value={links.lost + links.pageGone} tone="bad" />
            <Stat label="Not checked" value={links.unreachable + links.pending} tone="muted" />
          </div>

          <Panel title="Recent checks" note="Most recently verified placements, newest first.">
            {data.recentChecks.length === 0 ? (
              <Empty
                text="No placements checked yet"
                hint="Import known links, then run: npx tsx scripts/run-link-verify.ts --campaign <id>"
              />
            ) : (
              <div className="space-y-2.5">
                {data.recentChecks.map((c, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-white/[0.05] bg-white/[0.015] px-3.5 py-3"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <Pill status={c.status} />
                      {c.linkType && c.linkType !== 'dofollow' && (
                        <span className="text-[11px] text-amber-400/80">{c.linkType}</span>
                      )}
                      {c.region && c.region !== 'content' && (
                        <span className="text-[11px] text-white/30">in {c.region}</span>
                      )}
                      <a
                        href={c.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto flex items-center gap-1 text-[11px] text-white/30 hover:text-slate-500"
                      >
                        {host(c.sourceUrl)}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <div className="mt-1.5 truncate text-[12px] text-white/50">
                      → {c.targetUrl}
                      {c.anchor && <span className="ml-2 text-white/30">“{c.anchor}”</span>}
                    </div>
                    {c.reasons.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {c.reasons.slice(0, 5).map((r) => (
                          <span
                            key={r}
                            className="rounded bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-white/35"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Panel>
        </div>
      )}

      {tab === 'prospects' && (
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Awaiting assessment" value={prospects.discovered} />
            <Stat label="Qualified" value={prospects.qualified} tone="good" />
            <Stat label="Rejected" value={prospects.rejected} tone="muted" />
            <Stat
              label="No contact found"
              value={prospects.noContact}
              tone="muted"
              hint="Published no address — never guessed"
            />
          </div>

          <Panel
            title="Top qualified prospects"
            note="Best first. A score with unmeasured signals is a cautious score, not a bad site."
          >
            {data.topProspects.length === 0 ? (
              <Empty
                text="Nothing qualified yet"
                hint="Run discovery, then qualification, from scripts/run-link-discovery.ts"
              />
            ) : (
              <div className="space-y-2">
                {data.topProspects.map((p) => (
                  <div
                    key={p.domain}
                    className="flex flex-wrap items-center gap-3 rounded-lg border border-white/[0.05] bg-white/[0.015] px-3.5 py-2.5"
                  >
                    <span className="w-10 text-right text-sm font-semibold tabular-nums text-[#818cf8]">
                      {p.score ?? '—'}
                    </span>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-900 hover:text-[#818cf8]"
                    >
                      {p.domain}
                    </a>
                    <span className="text-[11px] text-white/30">{p.discoveredVia}</span>
                    {p.missingSignals.length > 0 && (
                      <span className="ml-auto text-[10px] text-white/25">
                        unmeasured: {p.missingSignals.join(', ')}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Panel>

          {prospects.topRejects.length > 0 && (
            <Panel
              title="Why prospects were rejected"
              note="A channel producing mostly rejects is a channel worth switching off."
            >
              <div className="flex flex-wrap gap-2">
                {prospects.topRejects.map((r) => (
                  <span
                    key={r.reason}
                    className="rounded-lg border border-white/[0.06] bg-slate-50 px-2.5 py-1 text-[12px] text-white/50"
                  >
                    {r.reason} <span className="ml-1 tabular-nums text-white/30">{r.count}</span>
                  </span>
                ))}
              </div>
            </Panel>
          )}
        </div>
      )}

      {tab === 'citations' && (
        <div className="space-y-5">
          <div className="rounded-xl border border-sky-400/15 bg-sky-400/[0.03] px-4 py-3">
            <p className="text-[12px] leading-relaxed text-white/50">
              <span className="font-medium text-sky-300">Citations are not links.</span> Most
              carry nofollow and Google Business Profile carries no link at all. Their value is
              entity confirmation through consistency — never add these to a link count.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="To submit" value={citations.queued} hint="A person submits these" />
            <Stat label="Consistent" value={citations.consistent} tone="good" />
            <Stat label="Inconsistent" value={citations.inconsistent} tone="bad" />
            <Stat
              label="Average NAP"
              value={citations.averageNap === null ? '—' : `${citations.averageNap.toFixed(0)}%`}
              hint="Across comparable fields only"
            />
          </div>

          <Panel title="Needs fixing" note="Listings whose details differ from the canonical record.">
            {citations.problems.length === 0 ? (
              <Empty text="No inconsistencies found" hint="Or nothing has been verified yet" />
            ) : (
              <div className="space-y-2">
                {citations.problems.map((p, i) => (
                  <div
                    key={i}
                    className="flex flex-wrap items-center gap-3 rounded-lg border border-white/[0.05] bg-white/[0.015] px-3.5 py-2.5"
                  >
                    <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0 text-rose-400/70" />
                    <span className="text-sm text-slate-900">{p.directory}</span>
                    <span className="text-[11px] text-rose-300/70">
                      {p.mismatches.join(', ')}
                    </span>
                    {p.listingUrl && (
                      <a
                        href={p.listingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto flex items-center gap-1 text-[11px] text-white/30 hover:text-slate-500"
                      >
                        open <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Panel>
        </div>
      )}

      {tab === 'outreach' && (
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <Stat label="Awaiting approval" value={outreach.awaitingApproval} />
            <Stat label="Approved, unsent" value={outreach.approved} />
            <Stat label="Sent" value={outreach.sent} />
            <Stat label="Replied" value={outreach.replied} tone="good" />
            <Stat label="Suppressed" value={outreach.suppressed} tone="muted" hint="Do not contact" />
          </div>

          <Panel title="Sending mailboxes" note="Nothing sends automatically. There is no send cron.">
            {outreach.mailboxes.length === 0 ? (
              <Empty
                text="No mailbox configured"
                hint="Create one: npx tsx scripts/outreach.ts --mailbox-add"
              />
            ) : (
              <div className="space-y-2">
                {outreach.mailboxes.map((m) => (
                  <div
                    key={m.id}
                    className="flex flex-wrap items-center gap-3 rounded-lg border border-white/[0.05] bg-white/[0.015] px-3.5 py-2.5"
                  >
                    {m.active ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="h-3.5 w-3.5 text-white/30" />
                    )}
                    <span className="text-sm text-slate-900">{m.fromEmail}</span>
                    {m.warmingUp && (
                      <span className="rounded bg-amber-400/10 px-1.5 py-0.5 text-[10px] text-amber-400">
                        warming up
                      </span>
                    )}
                    <span className="ml-auto text-[11px] tabular-nums text-slate-400">
                      {m.sentToday} / {m.dailyCap} today
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Panel>

          <Panel
            title="Approval queue"
            note="Read every one. Approving without reading is how this mails something embarrassing."
          >
            {data.approvalQueue.length === 0 ? (
              <Empty text="Nothing waiting for approval" />
            ) : (
              <div className="space-y-3">
                {data.approvalQueue.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-lg border border-white/[0.05] bg-white/[0.015] p-3.5"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="text-slate-500">{m.contactEmail}</span>
                      <span className="text-white/25">about {m.domain}</span>
                      {m.problems.length > 0 && (
                        <span className="rounded bg-rose-400/10 px-1.5 py-0.5 text-rose-300/80">
                          {m.problems.length} problem{m.problems.length === 1 ? '' : 's'}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 text-sm font-medium text-slate-900">{m.subject}</div>
                    <pre className="mt-1.5 whitespace-pre-wrap font-sans text-[12px] leading-relaxed text-white/45">
                      {m.body}
                    </pre>
                    {m.problems.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.problems.map((p) => (
                          <span
                            key={p}
                            className="rounded bg-rose-400/[0.08] px-1.5 py-0.5 text-[10px] text-rose-300/70"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="mt-2.5 font-mono text-[10px] text-white/25">
                      npx tsx scripts/outreach.ts --approve {m.id} --by &quot;your name&quot;
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Panel>
        </div>
      )}

      {tab === 'properties' && (
        <div className="space-y-5">
          <div className="rounded-xl border border-sky-400/15 bg-sky-400/[0.03] px-4 py-3">
            <p className="text-[12px] leading-relaxed text-white/50">
              <span className="font-medium text-sky-300">Excluded from the link KPI.</span>{' '}
              Branded properties exist for brand SERP control and referral traffic. Built for
              PageRank, they are a link scheme — which is why the cap is hard.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Properties" value={properties.total} hint={`${properties.capRemaining} below the cap`} />
            <Stat label="Live" value={properties.live} />
            <Stat label="Posts" value={properties.posts} />
            <Stat
              label="Empty"
              value={properties.empty}
              tone={properties.empty > 0 ? 'bad' : 'muted'}
              hint="Unused properties are a liability"
            />
          </div>

          <Panel title="Footprint audit" note="Run monthly — it finds what an investigator would.">
            <Empty
              text="Run the audit from the CLI"
              hint="npx tsx scripts/properties.ts --audit <clientId>"
            />
          </Panel>
        </div>
      )}
    </div>
  );
}

