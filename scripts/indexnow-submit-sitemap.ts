// ─────────────────────────────────────────────────────────────────────────────
//  Submit every URL in the live sitemap to IndexNow.
//
//  Posts are submitted when they are published (lib/indexnow.ts), but location
//  and service pages ship with code, not through a publish action. Run this
//  after a deploy that adds or changes pages:
//
//    npx tsx scripts/indexnow-submit-sitemap.ts
// ─────────────────────────────────────────────────────────────────────────────

import { submitToIndexNow } from "../lib/indexnow";

async function main() {
  const res = await fetch("https://www.searchprex.com/sitemap.xml");
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
  console.log(`sitemap: ${urls.length} URLs`);
  const result = await submitToIndexNow(urls);
  console.log(`IndexNow: ${result.ok ? "accepted" : "NOT accepted"} (HTTP ${result.status ?? "no response"}), ${result.submitted} URLs`);
  if (!result.ok) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
