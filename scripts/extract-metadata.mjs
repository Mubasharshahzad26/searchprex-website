// scripts/extract-metadata.mjs
// One-off audit helper: reports the current hardcoded metadata for every public
// route so prisma/seed-pages.ts can be written from real values rather than
// invented ones. Run with: node scripts/extract-metadata.mjs
import fs from "node:fs";
import path from "node:path";

const SKIP = [/^\/\(admin\)/, /^\/\(auth\)/, /^\/dashboard/, /^\/studio/, /^\/api/, /\[/];

const files = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === "page.tsx") files.push(full);
  }
})("app");

const rows = [];
for (const file of files) {
  const rel = path.relative("app", file).split(path.sep).join("/");
  const route = "/" + rel.replace(/\/?page\.tsx$/, "");
  const clean = route === "/" ? "/" : route;
  if (SKIP.some((re) => re.test(clean))) continue;

  const src = fs.readFileSync(file, "utf8");
  const isClient = /^\s*["']use client["']/m.test(src.slice(0, 200));
  const hasStatic = /export const metadata\b/.test(src);
  const hasGenerate = /export (async )?function generateMetadata/.test(src);

  let title = null;
  let description = null;
  const at = src.search(/export (const metadata|(async )?function generateMetadata)/);
  if (at >= 0) {
    const block = src.slice(at, at + 3000);
    const t = block.match(/\btitle:\s*(["'`])([\s\S]*?)\1/);
    const d = block.match(/\bdescription:\s*(["'`])([\s\S]*?)\1/);
    if (t) title = t[2];
    if (d) description = d[2];
  }

  rows.push({ route: clean, isClient, hasStatic, hasGenerate, title, description });
}

rows.sort((a, b) => a.route.localeCompare(b.route));
fs.writeFileSync("scripts/metadata-audit.json", JSON.stringify(rows, null, 1));

const missing = rows.filter((r) => !r.hasStatic && !r.hasGenerate);
console.log(`routes: ${rows.length} | missing metadata: ${missing.length}`);
for (const r of missing) console.log(`  NONE   ${r.route}${r.isClient ? "  (client component)" : ""}`);
console.log("\nwrote scripts/metadata-audit.json");
