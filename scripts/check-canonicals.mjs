/**
 * Fails the build if a public route ships without its own canonical URL.
 *
 * Why this exists: app/layout.tsx used to set `alternates.canonical` at the
 * root. Root metadata is inherited, so every route that forgot to declare its
 * own silently shipped `<link rel="canonical" href="https://www.searchprex.com">`
 * — telling Google the page was a duplicate of the homepage. /pricing-plan and
 * /tools/schema-generator were both doing it, and nothing surfaced it.
 *
 * The root canonical is gone, so a page that declares none now emits none and
 * Google self-canonicalises. That is a safe default rather than a correct one:
 * an explicit canonical still protects against parameter and trailing-slash
 * variants. This check keeps every new page honest.
 *
 * A route passes if it either:
 *   - sets `alternates: { canonical: ... }` in metadata or generateMetadata, or
 *   - returns getPageSEO(), which fills in `${siteUrl}${slug}` as a fallback.
 *
 * Static analysis, not a crawl: it runs before a server exists and catches the
 * one failure mode that matters — a page declaring nothing at all.
 *
 *   node scripts/check-canonicals.mjs
 */
import fs from "node:fs";
import path from "node:path";

const APP = "app";

/**
 * Route groups that are never indexed, so a canonical is meaningless: admin and
 * auth screens, API handlers, the Sanity studio, and signed-in dashboards.
 */
const SKIP = [
  "(admin)", "(auth)", "(dashboard)",
  `${path.sep}api${path.sep}`,
  `${path.sep}studio${path.sep}`,
  `${path.sep}content-admin${path.sep}`,
  `${path.sep}dashboard${path.sep}`,
];

/** Pages that opt out with `robots: { index: false }` need no canonical. */
const NOINDEX = /robots\s*:\s*{[^}]*index\s*:\s*false/s;

const HAS_CANONICAL = /canonical\s*:/;
const USES_HELPER = /getPageSEO\s*\(/;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name === "page.tsx" || entry.name === "page.jsx") out.push(full);
  }
  return out;
}

const pages = walk(APP).filter((f) => !SKIP.some((s) => f.includes(s)));
const failures = [];

for (const file of pages) {
  const src = fs.readFileSync(file, "utf8");
  if (NOINDEX.test(src)) continue;
  if (HAS_CANONICAL.test(src) || USES_HELPER.test(src)) continue;

  const route =
    "/" +
    path.relative(APP, path.dirname(file)).split(path.sep).join("/").replace(/\\/g, "/");
  failures.push({ route: route === "/." ? "/" : route, file });
}

// A directory name containing a space produces a real, crawlable %20 route that
// duplicates its hyphenated sibling. app/tools/schema generator/ shipped one.
const spaced = pages.filter((f) => path.dirname(f).includes(" "));

if (failures.length || spaced.length) {
  console.error("\ncheck-canonicals: FAILED\n");

  if (failures.length) {
    console.error(`${failures.length} public route(s) declare no canonical:\n`);
    for (const f of failures) console.error(`  ${f.route.padEnd(42)} ${f.file}`);
    console.error(
      "\nFix: add `alternates: { canonical: \"https://www.searchprex.com<route>\" }`" +
      "\n     to the page's metadata, or return getPageSEO(\"<route>\", baseMetadata)." +
      "\n     If the page should not be indexed, set robots: { index: false }.\n"
    );
  }

  if (spaced.length) {
    console.error(`${spaced.length} route director(y/ies) contain a space:\n`);
    for (const f of spaced) console.error(`  ${f}`);
    console.error("\nFix: rename to a hyphenated slug. A space becomes a %20 duplicate route.\n");
  }

  process.exit(1);
}

console.log(`check-canonicals: OK — ${pages.length} public routes, all canonical-safe.`);
