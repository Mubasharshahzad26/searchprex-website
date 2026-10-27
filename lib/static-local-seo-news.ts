import { readFileSync } from "node:fs";
import { join } from "node:path";

/** Full, source-reviewed Local SEO News article kept in the repository. */
export function getStaticLocalSeoNewsContent(): string {
  return readFileSync(
    join(process.cwd(), "scripts", "seo-news-content", "local-seo-updates.md"),
    "utf8",
  ).trim();
}
