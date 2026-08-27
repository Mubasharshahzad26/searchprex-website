import MarkdownIt from "markdown-it";

/**
 * Turns a stored article body into styled HTML for the post renderer.
 *
 * Two things were wrong before this existed.
 *
 * 1. Articles are authored as Markdown. The editor at /content-admin ships a
 *    Markdown toolbar and its placeholder literally says "Write your content
 *    here in Markdown...", but the renderer handed the raw string straight to
 *    html-react-parser. Every post written through the admin therefore reached
 *    visitors with "## Heading" and "[text](/url)" showing as literal text.
 *
 * 2. Tailwind's preflight removes the browser's default styling from every
 *    element, so any tag without an explicit style rendered as flat body copy --
 *    headings, lists and tables included.
 *
 * markdown-it runs with `html: true` so both formats coexist: posts authored in
 * the admin convert normally, and posts stored as raw HTML pass through
 * untouched. Both exist in MarketingBlog today, so this is a requirement rather
 * than a convenience.
 *
 * Note on trust: bodies come from the authenticated admin, and the renderer
 * already parsed stored HTML before this module existed, so enabling `html`
 * adds no exposure that was not already present. It does mean article bodies
 * must stay an admin-only field -- never render untrusted input through here.
 */
const md = new MarkdownIt({
  html: true,
  linkify: false,
  breaks: false,
  typographer: false,
});

/**
 * Inline styles rather than classes: html-react-parser inserts these nodes
 * outside Tailwind's content-scanning, so utility classes added here would be
 * purged from the production build.
 */
const TAG_STYLES: Record<string, string> = {
  // h1 is the page title, rendered by the layout. A body-level h1 is a
  // duplicate, so it is styled to match h2 rather than dominating the page.
  h1: "font-size:1.5rem;font-weight:900;color:#0a0f2e;margin:2.5rem 0 1rem;padding-bottom:0.5rem;border-bottom:2px solid #e5e7eb",
  h2: "font-size:1.5rem;font-weight:900;color:#0a0f2e;margin:2.5rem 0 1rem;padding-bottom:0.5rem;border-bottom:2px solid #e5e7eb",
  h3: "font-size:1.1875rem;font-weight:800;color:#0a0f2e;margin:2rem 0 0.75rem",
  h4: "font-size:1.0625rem;font-weight:700;color:#0a0f2e;margin:1.5rem 0 0.5rem",
  p: "font-size:1.0625rem;color:#374151;margin-bottom:1.25rem;line-height:1.85",
  ul: "list-style:disc;padding-left:1.5rem;margin:0 0 1.25rem;font-size:1.0625rem;color:#374151;line-height:1.85",
  ol: "list-style:decimal;padding-left:1.5rem;margin:0 0 1.25rem;font-size:1.0625rem;color:#374151;line-height:1.85",
  li: "margin-bottom:0.5rem",
  strong: "font-weight:700;color:#0a0f2e",
  em: "font-style:italic",
  a: "color:#534AB7;font-weight:600;text-decoration:underline;text-underline-offset:2px",
  blockquote:
    "border-left:4px solid #3eb489;background:#f8f9fc;border-radius:0 8px 8px 0;padding:1rem 1.25rem;margin:1.5rem 0;font-size:1.0625rem;color:#374151;font-style:italic",
  table: "width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:0.9375rem",
  th: "text-align:left;padding:0.65rem 0.75rem;background:#f8f9fc;border:1px solid #e5e7eb;font-weight:700;color:#0a0f2e",
  td: "padding:0.65rem 0.75rem;border:1px solid #e5e7eb;color:#374151;vertical-align:top",
  code: "background:#f1f5f9;border-radius:4px;padding:2px 6px;font-size:0.875rem;color:#0a0f2e",
};

const STYLED_TAGS = Object.keys(TAG_STYLES).join("|");

// Matches an opening tag only -- "</p>" cannot match because "/" is not part of
// the tag group. The optional attribute group is preserved so links keep their
// href and images keep their src.
const OPEN_TAG = new RegExp(`<(${STYLED_TAGS})(\\s[^>]*)?>`, "g");

/**
 * The editor's callout is authored as a literal <div class="callout"> because
 * Markdown has no syntax for it.
 */
const CALLOUT_STYLE =
  "background:#EEEDFE;border-left:4px solid #534AB7;border-radius:8px;padding:1rem 1.25rem;margin:1.5rem 0;font-size:0.9375rem;color:#3C3489";

export function styleArticleHtml(html: string): string {
  return html
    .replace(
      /<div class="callout">/g,
      `<div class="callout" style="${CALLOUT_STYLE}">`
    )
    .replace(OPEN_TAG, (_match, tag: string, attrs?: string) => {
      // An author-supplied style wins; overwriting it would silently discard
      // deliberate formatting.
      if (attrs && /\sstyle=/.test(attrs)) return _match;
      return `<${tag}${attrs ?? ""} style="${TAG_STYLES[tag]}">`;
    });
}

/**
 * Strips the shared leading indentation from a body.
 *
 * Required, not cosmetic. The file-based blog posts store their HTML inside
 * indented template literals, so every line begins with six spaces. Markdown
 * treats four or more leading spaces as an indented code block, which rendered
 * those posts as one grey <pre> full of visible <p> tags. Removing the common
 * indent leaves deliberate relative indentation (nested list items) intact.
 */
function dedent(source: string): string {
  const lines = source.split("\n");
  const indents = lines
    .filter((line) => line.trim() !== "")
    .map((line) => line.match(/^[ \t]*/)?.[0].length ?? 0);

  if (!indents.length) return source;

  const common = Math.min(...indents);
  return common > 0 ? lines.map((line) => line.slice(common)).join("\n") : source;
}

/** Markdown (or raw HTML) in, styled HTML out. */
export function renderArticle(source?: string | null): string {
  if (!source) return "";
  return styleArticleHtml(md.render(dedent(source)));
}
