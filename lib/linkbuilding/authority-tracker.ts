// ═══════════════════════════════════════════════════════════
//  authority-tracker.ts — live DA & referring domains tracking
//
//  NOT PORTABLE. Prisma + DataForSEO Backlinks API.
//
//  Tracks domain rank, referring domains, and backlinks over time
//  for campaigns to measure progress towards target DA (e.g. DA 6 -> 25+).
// ═══════════════════════════════════════════════════════════

import { db } from '@/lib/db';
import { withRetry } from '@/lib/db-retry';
import { hasDataForSeoCredentials } from './core/discovery/dataforseo';

export interface AuthoritySnapshot {
  domain: string;
  rank: number | null;
  backlinks: number;
  referringDomains: number;
  referringDomainsNofollow: number;
  fetchedAt: string;
}

export interface AuthoritySyncStats {
  campaigns: number;
  updated: number;
  skipped: number;
  snapshots: AuthoritySnapshot[];
  elapsedMs: number;
}

function getCredentials() {
  return {
    login: process.env.DATAFORSEO_LOGIN,
    password: process.env.DATAFORSEO_PASSWORD,
  };
}

export async function fetchDomainAuthority(domain: string): Promise<AuthoritySnapshot | null> {
  const creds = getCredentials();
  if (!hasDataForSeoCredentials(creds)) {
    return null;
  }

  const cleanDomain = domain.toLowerCase().replace(/^www\./, '').trim();
  const auth = Buffer.from(`${creds.login}:${creds.password}`).toString('base64');

  try {
    const res = await fetch('https://api.dataforseo.com/v3/backlinks/summary/live', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        {
          target: cleanDomain,
          include_subdomains: true,
        },
      ]),
    });

    if (!res.ok) {
      console.warn(`[authority-tracker] DataForSEO API error: ${res.status}`);
      return null;
    }

    const data = await res.json();
    const item = data.tasks?.[0]?.result?.[0];

    if (!item) return null;

    return {
      domain: cleanDomain,
      rank: item.rank ?? null,
      backlinks: item.backlinks ?? 0,
      referringDomains: item.referring_domains ?? 0,
      referringDomainsNofollow: item.referring_domains_nofollow ?? 0,
      fetchedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.error(`[authority-tracker] failed for ${domain}:`, err);
    return null;
  }
}

export async function syncAuthority(options?: {
  campaignId?: string;
  clientId?: string;
}): Promise<AuthoritySyncStats> {
  const startedAt = Date.now();
  const stats: AuthoritySyncStats = {
    campaigns: 0,
    updated: 0,
    skipped: 0,
    snapshots: [],
    elapsedMs: 0,
  };

  const campaigns = await withRetry(() =>
    db.linkCampaign.findMany({
      where: {
        enabled: true,
        ...(options?.campaignId ? { id: options.campaignId } : {}),
        ...(options?.clientId ? { clientId: options.clientId } : {}),
      },
      select: { id: true, targetDomain: true, name: true },
    })
  );

  stats.campaigns = campaigns.length;

  for (const campaign of campaigns) {
    const snapshot = await fetchDomainAuthority(campaign.targetDomain);

    if (snapshot) {
      stats.snapshots.push(snapshot);
      stats.updated++;
    } else {
      stats.skipped++;
    }
  }

  stats.elapsedMs = Date.now() - startedAt;
  return stats;
}
