/**
 * scripts/verify-dataforseo.ts
 *
 * Confirms DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD actually work before the SERP
 * Checker is exposed publicly. Without credentials the API route silently
 * returns invented "estimated" rankings, so a broken key looks identical to a
 * working one from the outside — this script is the difference.
 *
 * Makes exactly ONE live call (one keyword, depth 10) to keep the cost trivial.
 *
 *   npx tsx scripts/verify-dataforseo.ts
 *   npx tsx scripts/verify-dataforseo.ts "law firm seo" searchprex.com
 */
import { config } from "dotenv";
config({ path: ".env.local" });

const ENDPOINT = "https://api.dataforseo.com/v3/serp/google/organic/live/advanced";

async function main() {
  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;

  if (!login || !password) {
    console.error("✗ DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD are not set in .env.local");
    console.error("  The SERP Checker is serving ESTIMATED (invented) data until they are.");
    process.exit(1);
  }

  const keyword = process.argv[2] ?? "law firm seo";
  const domain = (process.argv[3] ?? "searchprex.com").replace(/^www\./, "").toLowerCase();

  console.log(`Checking "${keyword}" for ${domain} (United States, depth 10)…\n`);

  const auth = Buffer.from(`${login}:${password}`).toString("base64");
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
    body: JSON.stringify([
      { keyword, location_name: "United States", language_code: "en", device: "desktop", depth: 10 },
    ]),
  });

  if (res.status === 401) {
    console.error("✗ 401 Unauthorized — wrong credentials.");
    console.error("  DATAFORSEO_PASSWORD is the API password from Dashboard -> API Access,");
    console.error("  not the password you log into the website with.");
    process.exit(1);
  }

  if (!res.ok) {
    console.error(`✗ HTTP ${res.status} from DataForSEO`);
    process.exit(1);
  }

  const json = await res.json();
  const task = json?.tasks?.[0];

  if (!task || task.status_code !== 20000) {
    console.error(`✗ Task error ${task?.status_code}: ${task?.status_message}`);
    if (task?.status_code === 40200 || /balance|money/i.test(task?.status_message ?? "")) {
      console.error("  Looks like an account balance problem — top up at dataforseo.com.");
    }
    process.exit(1);
  }

  const items = task.result?.[0]?.items ?? [];
  const organic = items.filter((i: { type?: string }) => i?.type === "organic");
  const found = organic.findIndex((i: { url?: string }) =>
    (i.url ?? "").toLowerCase().includes(domain)
  );

  console.log("✓ Credentials valid, live SERP returned.");
  console.log(`  cost of this call: $${task.cost ?? "?"}`);
  console.log(`  organic results:   ${organic.length}`);
  console.log(`  ${domain}: ${found >= 0 ? `position ${found + 1}` : "not in top 10"}\n`);

  console.log("  Top 5 actually ranking:");
  organic.slice(0, 5).forEach((i: { url?: string }, n: number) => {
    let host = i.url ?? "";
    try {
      host = new URL(host).hostname.replace(/^www\./, "");
    } catch {
      /* leave the raw value if it isn't a parseable URL */
    }
    console.log(`    ${n + 1}. ${host}`);
  });

  console.log("\nThe SERP Checker will now return source:'dataforseo' instead of 'estimated'.");

  await checkStateLevelKeywords(auth);
}

/**
 * The law firm keyword tool asks for STATE-level volume ("Michigan,United
 * States"), not national. DataForSEO's docs don't state whether that granularity
 * is available, and the whole tool design assumes it is — so this proves it
 * before the page is trusted. If state-level fails but national works, the tool
 * must fall back to national rather than silently mislabel national data as
 * state data.
 */
async function checkStateLevelKeywords(auth: string) {
  const endpoint = "https://api.dataforseo.com/v3/dataforseo_labs/google/keyword_overview/live";
  const keywords = ["car accident lawyer michigan", "divorce lawyer michigan"];

  console.log("\n─────────────────────────────────────────────");
  console.log("Checking STATE-level keyword data (Michigan)…\n");

  for (const location of ["Michigan,United States", "United States"]) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
      body: JSON.stringify([{ keywords, location_name: location, language_code: "en" }]),
    });

    const json = await res.json().catch(() => ({}));
    const task = json?.tasks?.[0];

    if (!res.ok || !task || task.status_code !== 20000) {
      console.log(`  ✗ "${location}" — ${task?.status_code ?? res.status}: ${task?.status_message ?? "failed"}`);
      continue;
    }

    const items = task.result?.[0]?.items ?? [];
    const withVolume = items.filter(
      (i: { keyword_info?: { search_volume?: number | null } }) =>
        typeof i?.keyword_info?.search_volume === "number"
    );

    console.log(`  ✓ "${location}" — cost $${task.cost ?? "?"}, ${withVolume.length}/${keywords.length} keywords returned volume`);

    for (const item of withVolume) {
      const info = item.keyword_info;
      const kd = item.keyword_properties?.keyword_difficulty;
      console.log(
        `      ${item.keyword}: volume ${info.search_volume}, CPC $${info.cpc ?? "?"}, KD ${kd ?? "?"}`
      );
    }
  }

  console.log(
    "\nIf the Michigan numbers differ from the United States ones, state-level targeting works\n" +
      "and the law firm keyword tool is accurate as designed. If they are identical, the API is\n" +
      "silently falling back to national data and locationNameFor() in\n" +
      "app/api/law-firm-keywords/route.ts must be changed."
  );
}

main().catch((err) => {
  console.error("✗ Failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
