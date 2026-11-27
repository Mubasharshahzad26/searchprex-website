/**
 * Fails the build if UTF-8 BOMs, U+FFFD replacement characters, or
 * Windows-1252 -> UTF-8 mojibake (e.g. â€”, â†’, Â·, ðŸ) appear in source files.
 *
 *   node scripts/check-encoding.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOTS = ["app", "components", "lib"];
const EXT_RE = /\.(ts|tsx|js|jsx|mjs)$/;
const MOJIBAKE_RE = /[\uFFFD]|â€|â†|âœ|âš|â­|â–|â‰|Ã[\x80-\xBF]|Â[\x80-\xBF]|ðŸ/;

const bomFiles = [];
const corruptedHits = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (!EXT_RE.test(entry.name)) continue;

    const buf = fs.readFileSync(full);
    if (buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
      bomFiles.push(full);
    }

    const lines = buf.toString("utf8").split(/\r?\n/);
    lines.forEach((line, idx) => {
      if (MOJIBAKE_RE.test(line)) {
        corruptedHits.push(`${full}:${idx + 1}: ${line.trim().slice(0, 100)}`);
      }
    });
  }
}

ROOTS.forEach(walk);

if (bomFiles.length || corruptedHits.length) {
  console.error("\ncheck-encoding: FAILED\n");
  if (bomFiles.length) {
    console.error(`${bomFiles.length} file(s) contain a UTF-8 BOM:\n  ${bomFiles.join("\n  ")}\n`);
  }
  if (corruptedHits.length) {
    console.error(`${corruptedHits.length} line(s) contain mojibake or replacement chars:\n  ${corruptedHits.slice(0, 20).join("\n  ")}\n`);
  }
  process.exit(1);
}

console.log("check-encoding: OK — zero BOMs or mojibake detected across app/, components/, and lib/.");
