/**
 * scripts/fix-cms-title-suffix.ts
 *
 * The root layout declares `title.template = "%s | SearchPrex"`, so Next appends
 * the brand to every page title automatically. The CMS rows had the brand baked
 * in as well, which made 35 of 37 published pages render it twice:
 *
 *     "Law Firm SEO Services | ... | SearchPrex | SearchPrex"
 *
 * This strips the trailing brand so the template supplies the only copy. Five
 * rows carry the brand mid-string and cannot be fixed by a rule, so they are
 * rewritten explicitly below.
 *
 * Idempotent — rows already correct are skipped, so re-running is safe.
 *
 *   npx tsx scripts/fix-cms-title-suffix.ts --dry
 *   npx tsx scripts/fix-cms-title-suffix.ts
 */
import { db } from "../lib/db";

/** Matches the separators actually present in the data: | — – - , any casing. */
const TRAILING_BRAND = /\s*[|—–-]\s*Searchprex\s*$/i;

/**
 * Rows where the brand sits inside the title rather than at the end. Each was
 * reviewed individually; `/about` held a leftover "CMS PROBE TITLE" test value
 * that was live in production.
 */
const MANUAL: Record<string, string> = {
  // Not "About SearchPrex …" — the layout template already appends the brand,
  // so leading with it would print "SearchPrex" twice in the same title tag.
  "/about": "About Us — Founder-Led USA SEO Agency",
  "/experts": "Meet Our SEO Experts",
  "/pricing": "SEO Pricing Plans — USA SEO Agency",
  "/why-us": "Why Choose Us — Founder-Led USA SEO Agency",
};

async function main() {
  const dry = process.argv.includes("--dry");
  const rows = await db.page.findMany({
    select: { slug: true, title: true },
    orderBy: { slug: "asc" },
  });

  let updated = 0;
  let skipped = 0;

  for (const row of rows) {
    const current = row.title || "";
    const next = MANUAL[row.slug] ?? current.replace(TRAILING_BRAND, "").trim();

    if (next === current) {
      skipped++;
      continue;
    }

    console.log(`${row.slug}`);
    console.log(`   before: ${current}`);
    console.log(`   after : ${next}`);
    console.log(`   renders: ${next} | SearchPrex`);

    if (!dry) {
      await db.page.update({ where: { slug: row.slug }, data: { title: next } });
    }
    updated++;
  }

  console.log(
    `\n${dry ? "[DRY RUN] would update" : "updated"} ${updated} rows; ${skipped} already correct.`
  );
  await db.$disconnect();
}

main().catch(async (error) => {
  console.error("Failed:", error);
  await db.$disconnect();
  process.exit(1);
});
