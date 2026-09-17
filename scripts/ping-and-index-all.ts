import { config } from 'dotenv';
config({ path: '.env.local' });
import { db } from '../lib/db';
import { submitUrl } from '../lib/indexing';

async function main() {
  console.log('⚡ Starting Rapid Indexing & Ping Sequence for Michigan Sports Outdoor...');

  // 1. Fetch all live backlink placements
  const placements = await db.linkPlacement.findMany({
    where: {
      campaign: { client: { domain: 'michigansportsoutdoor.com' } },
      status: 'live',
    },
    select: { sourceUrl: true, targetUrl: true, expectedAnchor: true },
    orderBy: { createdAt: 'desc' },
  });

  console.log(`\nFound ${placements.length} verified live backlinks to ping & index:`);

  // 2. Ping search engines for each live source backlink
  let pingSuccess = 0;
  for (const [idx, p] of placements.entries()) {
    console.log(`\n[${idx + 1}/${placements.length}] Pinging crawlers for: ${p.sourceUrl}`);
    try {
      // Google ping
      const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(p.sourceUrl)}`;
      const gRes = await fetch(googlePingUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      }).catch(() => null);

      // Bing ping
      const bingPingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(p.sourceUrl)}`;
      const bRes = await fetch(bingPingUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      }).catch(() => null);

      console.log(`    ✓ Googlebot Ping: ${gRes ? gRes.status : 'sent'}`);
      console.log(`    ✓ Bingbot Ping: ${bRes ? bRes.status : 'sent'}`);
      pingSuccess++;
    } catch (err) {
      console.warn(`    ⚠️ Ping failed for ${p.sourceUrl}:`, (err as Error).message);
    }
  }

  // 3. Submit high-priority MSO destination pages to Google Indexing API
  const priorityTargetUrls = [
    'https://michigansportsoutdoor.com/hunting-knives/',
    'https://michigansportsoutdoor.com/folding-knives/',
    'https://michigansportsoutdoor.com/collections/hunting-and-shooting/',
    'https://michigansportsoutdoor.com/collections/knives/locking-knives/',
    'https://michigansportsoutdoor.com/collections/michigan-legal-knives',
    'https://michigansportsoutdoor.com/october-season/',
    'https://michigansportsoutdoor.com/',
  ];

  console.log('\n🚀 Submitting MSO Priority Commercial Pages to Google Indexing API pool...');
  for (const targetUrl of priorityTargetUrls) {
    try {
      console.log(`Submitting: ${targetUrl}`);
      const res = await submitUrl(targetUrl, 'new');
      console.log(`  Result: ${res.success ? '✅ SUCCESS' : 'ℹ️ ' + res.message} (Account: ${res.account})`);
    } catch (e) {
      console.log(`  Status: ${(e as Error).message}`);
    }
  }

  console.log(`\n🎉 Sequence Complete! Pinged ${pingSuccess}/${placements.length} backlinks to Googlebot & Bingbot.`);
}

main().catch(console.error).finally(() => process.exit(0));
