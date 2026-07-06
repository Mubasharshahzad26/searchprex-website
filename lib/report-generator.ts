import { db } from './db'
import { fetchSiteKPIs } from './gsc-client'

function pct(current: number, previous: number): string {
  if (previous === 0) return current > 0 ? '+100%' : '0%'
  const change = ((current - previous) / previous) * 100
  return `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`
}

function arrow(current: number, previous: number, inverse = false): string {
  const up = current > previous
  const good = inverse ? !up : up
  if (current === previous) return '→'
  return good ? '▲' : '▼'
}

function color(current: number, previous: number, inverse = false): string {
  const up = current > previous
  const good = inverse ? !up : up
  if (current === previous) return '#888888'
  return good ? '#16803c' : '#c02626'
}

export async function generateReport(clientId: string) {
  const client = await db.client.findUnique({
    where: { id: clientId },
    include: { gscConnections: true, reportConfig: true },
  })
  if (!client) throw new Error('Client not found')
  const gsc = client.gscConnections[0]
  if (!gsc) throw new Error('No GSC connection for client')
  const config = client.reportConfig
  const periodDays = config?.frequency === 'monthly' ? 30 : 7
  const periodLabel = config?.frequency === 'monthly' ? 'Monthly' : 'Weekly'

  const kpis = await fetchSiteKPIs(gsc.siteUrl, gsc.serviceAccountJson, periodDays)

  const since = new Date(Date.now() - periodDays * 24 * 60 * 60 * 1000)
  const runs = await db.autopilotRun.findMany({
    where: { clientId, startedAt: { gte: since } },
    include: { pages: true },
  })
  const allPages = runs.flatMap((r) => r.pages)
  const autopilot = {
    runs: runs.length,
    generated: allPages.length,
    approved: allPages.filter((p) => p.status === 'approved').length,
    pending: allPages.filter((p) => p.status === 'pending').length,
    published: allPages.filter((p) => p.status === 'published').length,
  }

  const c = kpis.current
  const p = kpis.previous
  const row = (label: string, cur: string, prev: string, curN: number, prevN: number, inverse = false) => `
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #eee;color:#555;">${label}</td>
      <td style="padding:12px 16px;border-bottom:1px solid #eee;font-weight:700;color:#111;">${cur}</td>
      <td style="padding:12px 16px;border-bottom:1px solid #eee;color:#888;">${prev}</td>
      <td style="padding:12px 16px;border-bottom:1px solid #eee;font-weight:700;color:${color(curN, prevN, inverse)};">${arrow(curN, prevN, inverse)} ${pct(curN, prevN)}</td>
    </tr>`

  const clicksPct = pct(c.clicks, p.clicks)
  const isPositive = c.clicks >= p.clicks
  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#eef0f6;font-family:'Segoe UI',Arial,Helvetica,sans-serif;">
  <div style="max-width:640px;margin:0 auto;padding:32px 16px;">

    <!-- HEADER -->
    <div style="background:linear-gradient(135deg,#0f0f1a 0%,#1e1b4b 100%);border-radius:20px 20px 0 0;padding:36px 36px 32px;">
      <table style="width:100%;"><tr>
        <td><p style="margin:0;color:#818cf8;font-size:12px;font-weight:800;letter-spacing:2px;">SEARCHPREX</p></td>
        <td style="text-align:right;"><span style="background:rgba(129,140,248,0.15);color:#a5b4fc;font-size:11px;font-weight:700;padding:6px 14px;border-radius:999px;">${periodLabel.toUpperCase()} REPORT</span></td>
      </tr></table>
      <h1 style="margin:18px 0 0;color:#ffffff;font-size:26px;font-weight:800;">SEO Performance Report</h1>
      <p style="margin:10px 0 0;color:#9999b3;font-size:14px;">${client.companyName} &nbsp;·&nbsp; ${kpis.dateRange.start} → ${kpis.dateRange.end}</p>
    </div>

    <!-- HIGHLIGHT BANNER -->
    <div style="background:${isPositive ? 'linear-gradient(135deg,#065f46,#047857)' : 'linear-gradient(135deg,#7c2d12,#9a3412)'};padding:20px 36px;">
      <p style="margin:0;color:#ffffff;font-size:15px;font-weight:600;">
        ${isPositive ? '📈' : '📊'} Clicks ${isPositive ? 'up' : 'down'} <span style="font-size:18px;font-weight:800;">${clicksPct}</span> vs. previous ${periodLabel === 'Monthly' ? 'month' : 'week'} — ${autopilot.generated} pages optimized by Autopilot
      </p>
    </div>

    <!-- BODY -->
    <div style="background:#ffffff;padding:36px;">

      <h2 style="margin:0 0 6px;font-size:17px;color:#0f0f1a;font-weight:800;">Search Performance</h2>
      <p style="margin:0 0 18px;font-size:12px;color:#94a3b8;">vs. previous period · ${kpis.prevDateRange.start} → ${kpis.prevDateRange.end}</p>

      <!-- KPI CARDS -->
      <table style="width:100%;border-collapse:separate;border-spacing:0 10px;">
        <tr>
          <td style="width:50%;padding:18px 20px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;">
            <p style="margin:0;font-size:11px;color:#64748b;font-weight:700;letter-spacing:0.5px;">CLICKS</p>
            <p style="margin:6px 0 2px;font-size:28px;font-weight:800;color:#0f0f1a;">${c.clicks}</p>
            <p style="margin:0;font-size:13px;font-weight:700;color:${color(c.clicks, p.clicks)};">${arrow(c.clicks, p.clicks)} ${pct(c.clicks, p.clicks)} <span style="color:#94a3b8;font-weight:400;">(was ${p.clicks})</span></p>
          </td>
          <td style="width:12px;"></td>
          <td style="width:50%;padding:18px 20px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;">
            <p style="margin:0;font-size:11px;color:#64748b;font-weight:700;letter-spacing:0.5px;">IMPRESSIONS</p>
            <p style="margin:6px 0 2px;font-size:28px;font-weight:800;color:#0f0f1a;">${c.impressions}</p>
            <p style="margin:0;font-size:13px;font-weight:700;color:${color(c.impressions, p.impressions)};">${arrow(c.impressions, p.impressions)} ${pct(c.impressions, p.impressions)} <span style="color:#94a3b8;font-weight:400;">(was ${p.impressions})</span></p>
          </td>
        </tr>
        <tr>
          <td style="width:50%;padding:18px 20px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;">
            <p style="margin:0;font-size:11px;color:#64748b;font-weight:700;letter-spacing:0.5px;">AVG CTR</p>
            <p style="margin:6px 0 2px;font-size:28px;font-weight:800;color:#0f0f1a;">${(c.ctr * 100).toFixed(2)}%</p>
            <p style="margin:0;font-size:13px;font-weight:700;color:${color(c.ctr, p.ctr)};">${arrow(c.ctr, p.ctr)} ${pct(c.ctr, p.ctr)} <span style="color:#94a3b8;font-weight:400;">(was ${(p.ctr * 100).toFixed(2)}%)</span></p>
          </td>
          <td style="width:12px;"></td>
          <td style="width:50%;padding:18px 20px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;">
            <p style="margin:0;font-size:11px;color:#64748b;font-weight:700;letter-spacing:0.5px;">AVG POSITION</p>
            <p style="margin:6px 0 2px;font-size:28px;font-weight:800;color:#0f0f1a;">${c.position.toFixed(1)}</p>
            <p style="margin:0;font-size:13px;font-weight:700;color:${color(c.position, p.position, true)};">${arrow(c.position, p.position, true)} ${pct(c.position, p.position)} <span style="color:#94a3b8;font-weight:400;">(was ${p.position.toFixed(1)})</span></p>
          </td>
        </tr>
      </table>

      <!-- AUTOPILOT -->
      <h2 style="margin:32px 0 14px;font-size:17px;color:#0f0f1a;font-weight:800;">🤖 SEO Autopilot Activity</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:18px;background:linear-gradient(135deg,#eef2ff,#e0e7ff);border-radius:14px;text-align:center;">
            <p style="margin:0;font-size:26px;font-weight:800;color:#4f46e5;">${autopilot.generated}</p>
            <p style="margin:6px 0 0;font-size:10px;color:#6366f1;font-weight:700;letter-spacing:1px;">PAGES OPTIMIZED</p>
          </td>
          <td style="width:12px;"></td>
          <td style="padding:18px;background:linear-gradient(135deg,#ecfdf5,#d1fae5);border-radius:14px;text-align:center;">
            <p style="margin:0;font-size:26px;font-weight:800;color:#059669;">${autopilot.approved + autopilot.published}</p>
            <p style="margin:6px 0 0;font-size:10px;color:#10b981;font-weight:700;letter-spacing:1px;">APPROVED</p>
          </td>
          <td style="width:12px;"></td>
          <td style="padding:18px;background:linear-gradient(135deg,#fffbeb,#fef3c7);border-radius:14px;text-align:center;">
            <p style="margin:0;font-size:26px;font-weight:800;color:#d97706;">${autopilot.pending}</p>
            <p style="margin:6px 0 0;font-size:10px;color:#f59e0b;font-weight:700;letter-spacing:1px;">IN REVIEW</p>
          </td>
        </tr>
      </table>

      <!-- TOP PAGES -->
      <h2 style="margin:32px 0 14px;font-size:17px;color:#0f0f1a;font-weight:800;">🏆 Top Pages</h2>
      <div style="border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
        ${c.topPages.map((tp, i) => `
        <div style="padding:14px 18px;${i > 0 ? 'border-top:1px solid #f1f5f9;' : ''}background:${i % 2 === 0 ? '#ffffff' : '#fafbfd'};">
          <p style="margin:0;font-size:13px;color:#4f46e5;font-weight:600;word-break:break-all;">${tp.url.replace(/^https?:\/\/[^/]+/, '') || '/'}</p>
          <p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">${tp.clicks} clicks · ${tp.impressions} impressions</p>
        </div>`).join('')}
      </div>

      <!-- TOP QUERIES -->
      <h2 style="margin:32px 0 14px;font-size:17px;color:#0f0f1a;font-weight:800;">🔍 Top Search Queries</h2>
      <div style="border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
        ${c.topQueries.map((tq, i) => `
        <div style="padding:14px 18px;${i > 0 ? 'border-top:1px solid #f1f5f9;' : ''}background:${i % 2 === 0 ? '#ffffff' : '#fafbfd'};">
          <p style="margin:0;font-size:13px;color:#0f0f1a;font-weight:600;">${tq.query}</p>
          <p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">${tq.clicks} clicks · ${tq.impressions} impressions</p>
        </div>`).join('')}
      </div>

    </div>

    <!-- FOOTER -->
    <div style="background:#0f0f1a;border-radius:0 0 20px 20px;padding:24px 36px;">
      <table style="width:100%;"><tr>
        <td><p style="margin:0;color:#9999b3;font-size:12px;">Generated automatically by <span style="color:#818cf8;font-weight:700;">SearchPrex SEO Autopilot</span></p></td>
        <td style="text-align:right;"><p style="margin:0;color:#64748b;font-size:12px;">searchprex.com</p></td>
      </tr></table>
    </div>

  </div>
</body>
</html>`

  return {
    html,
    subject: `${periodLabel} SEO Report — ${client.companyName} (${kpis.dateRange.start} to ${kpis.dateRange.end})`,
    client,
    kpis,
    autopilot,
  }
}