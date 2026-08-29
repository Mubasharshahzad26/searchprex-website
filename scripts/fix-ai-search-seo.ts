/**
 * scripts/fix-ai-search-seo.ts
 *
 * Repoints the CMS row for /ai-search at what the page actually is.
 *
 * The row's title and description describe a URL-input audit tool — "enter your
 * URL", an SEO score out of 100, Core Web Vitals, a backlink profile, a 90-day
 * roadmap. /ai-search is none of those. It is a free-form question box that
 * returns an AI answer grounded in live Google Search (see
 * app/api/seo-search/route.ts). Searchers clicking that promise landed on a
 * different product and left.
 *
 * app/ai-search/page.tsx already carries the corrected copy, but getPageSEO()
 * lets a non-empty CMS field win, so the published row overrides the file. That
 * is why this script exists rather than a redeploy.
 *
 * Scope is deliberately one row. `npm run seed:pages -- --force` would also fix
 * this, but it rewrites title/metaDescription/robots for EVERY row from
 * prisma/seed-pages.ts, and those seed titles still carry the "| SearchPrex"
 * suffix that scripts/fix-cms-title-suffix.ts stripped out of the database. A
 * forced reseed would reintroduce the doubled brand across the whole site.
 *
 * No brand suffix in the title below: the root layout's `title.template`
 * appends " | SearchPrex" on its own.
 *
 * Idempotent — a row already holding these values is left untouched, so
 * re-running is safe.
 *
 *   npx tsx scripts/fix-ai-search-seo.ts --dry    # print the change, write nothing
 *   npx tsx scripts/fix-ai-search-seo.ts          # apply it
 *
 * NOTE: .env.local points at the production database, so without --dry this
 * writes to production. It does NOT change the live page on its own.
 *
 * /ai-search is statically prerendered and has no `revalidate` export, so
 * generateMetadata() — and the getPageSEO() database read inside it — runs at
 * BUILD time, not per request. Live responses come back
 * `X-Nextjs-Prerender: 1` / `X-Vercel-Cache: HIT` with an Age well past any
 * stale window and no background regeneration. The row this script writes is
 * picked up by the next deploy.
 *
 * That applies to every CMS-backed route, which means editing SEO in
 * /admin/pages is also build-time-only: the panel implies a live change and
 * does not deliver one until something triggers a rebuild.
 */
import { db } from "../lib/db";

const SLUG = "/ai-search";

const NEXT = {
  title: "Ask Any SEO Question — Free AI SEO Answer Engine",
  metaDescription:
    "Ask any SEO question and get an instant AI answer grounded in live Google Search results, with sources. Built for US law firms, ecommerce stores & local businesses. Free, no login.",
};

async function main() {
  const dry = process.argv.includes("--dry");

  const row = await db.page.findUnique({ where: { slug: SLUG } });

  if (!row) {
    // Not an error worth a non-zero exit: with no row, getPageSEO falls back to
    // baseMetadata in app/ai-search/page.tsx, which is already correct.
    console.log(`No CMS row for ${SLUG}. The page's own metadata is already live — nothing to do.`);
    return;
  }

  const alreadyCorrect =
    row.title === NEXT.title && row.metaDescription === NEXT.metaDescription;

  if (alreadyCorrect) {
    console.log(`${SLUG} already holds the corrected copy. Nothing to do.`);
    return;
  }

  console.log(`${SLUG}  (status: ${row.status})\n`);
  console.log("  title");
  console.log(`    before: ${row.title}`);
  console.log(`    after:  ${NEXT.title}\n`);
  console.log("  metaDescription");
  console.log(`    before: ${row.metaDescription}`);
  console.log(`    after:  ${NEXT.metaDescription}\n`);

  if (dry) {
    console.log("--dry: nothing written.");
    return;
  }

  await db.page.update({ where: { slug: SLUG }, data: NEXT });
  console.log(
    "Row updated.\n\n" +
      "The live page will NOT change yet: /ai-search is statically prerendered, so\n" +
      "getPageSEO reads this row at build time. Redeploy to publish the new title\n" +
      "and description."
  );

  if (row.status !== "published") {
    // getPageSEO ignores non-published rows entirely, so a draft row means the
    // file's metadata was already what shipped and this edit changes nothing
    // visible yet.
    console.log(
      `\nHeads up: this row is "${row.status}", not "published", so getPageSEO is ` +
        `ignoring it and serving the page's own metadata. Publish it in /admin/pages ` +
        `if the CMS copy is meant to be live.`
    );
  }
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await db.$disconnect();
    process.exit(1);
  });
