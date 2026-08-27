/**
 * Narrow HTML -> Markdown converter for article bodies.
 *
 * Scoped deliberately to the tag set the article renderer styles. It is not a
 * general converter and should not be pointed at arbitrary HTML.
 *
 * Why this exists: the SEO News spokes were seeded as HTML, but the editor at
 * /content-admin is Markdown (toolbar + "Write your content here in Markdown"),
 * so an HTML body is effectively uneditable there. Converting once means the
 * stored body is the same format the editor writes.
 *
 * External links keep their raw <a target rel> form: Markdown link syntax
 * cannot express those attributes, and markdown-it passes inline HTML through.
 */

const BLOCK_TAGS = ["h2", "h3", "h4", "p", "ul", "ol", "table"];

/** Inline HTML -> inline Markdown. Runs on the text inside a block. */
function inline(html) {
  return (
    html
      .replace(/<strong>(.*?)<\/strong>/g, "**$1**")
      .replace(/<em>(.*?)<\/em>/g, "*$1*")
      .replace(/<code>(.*?)<\/code>/g, "`$1`")
      // Internal links carry no target/rel, so Markdown syntax is lossless.
      .replace(/<a href="(\/[^"]*)">(.*?)<\/a>/g, "[$2]($1)")
      .trim()
  );
}

function convertList(html, ordered) {
  const items = [...html.matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) => inline(m[1]));
  return items
    .map((item, i) => (ordered ? `${i + 1}. ${item}` : `- ${item}`))
    .join("\n");
}

function convertTable(html) {
  const rows = [...html.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((m) => m[1]);
  if (!rows.length) return "";

  const cells = (row) =>
    [...row.matchAll(/<(?:th|td)>([\s\S]*?)<\/(?:th|td)>/g)].map((m) => inline(m[1]));

  const header = cells(rows[0]);
  const body = rows.slice(1).map(cells);

  return [
    `| ${header.join(" | ")} |`,
    `| ${header.map(() => "---").join(" | ")} |`,
    ...body.map((r) => `| ${r.join(" | ")} |`),
  ].join("\n");
}

export function htmlToMarkdown(html) {
  // The seeded bodies are a single line, so blocks are located by pattern
  // rather than by line.
  const src = html.trim();

  const blocks = [];
  const pattern = new RegExp(
    `<div class="callout">([\\s\\S]*?)<\\/div>|<(${BLOCK_TAGS.join("|")})>([\\s\\S]*?)<\\/\\2>`,
    "g"
  );

  let match;
  while ((match = pattern.exec(src)) !== null) {
    const [full, calloutInner, tag, inner] = match;

    if (calloutInner !== undefined) {
      // No Markdown equivalent — keep the literal HTML block. markdown-it
      // passes it through and the renderer styles it.
      blocks.push(`<div class="callout">${calloutInner}</div>`);
      continue;
    }

    switch (tag) {
      case "h2":
        blocks.push(`## ${inline(inner)}`);
        break;
      case "h3":
        blocks.push(`### ${inline(inner)}`);
        break;
      case "h4":
        blocks.push(`#### ${inline(inner)}`);
        break;
      case "p":
        blocks.push(inline(inner));
        break;
      case "ul":
        blocks.push(convertList(inner, false));
        break;
      case "ol":
        blocks.push(convertList(inner, true));
        break;
      case "table":
        blocks.push(convertTable(inner));
        break;
      default:
        blocks.push(full);
    }
  }

  return blocks.filter(Boolean).join("\n\n") + "\n";
}
