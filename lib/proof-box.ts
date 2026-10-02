// lib/proof-box.ts
//
// A case-study "proof box" for article bodies, rendered as an HTML string so
// it can sit inside any post's content — file-based posts in
// app/blog/[slug]/posts.ts or CMS rows — without changes to the renderer.
//
// Every figure comes from app/case-studies/data.ts, the one place case-study
// numbers are kept and checked against screenshots. Posts used to restate
// results by hand, and four of them drifted: SMK Store was credited with
// Michigan Outdoor Sports' indexing figures and a revenue number nothing
// supported. Pulling from the data file means a post can only quote what the
// case study itself says.
//
// Output is one line on purpose. markdown-it ends an HTML block at the first
// blank line, so a multi-line block with gaps would spill raw markup into the
// article. Every element carries an inline style because styleArticleHtml
// adds its own styles to bare tags and leaves styled ones alone.

import { caseStudies, detailUrl } from "@/app/case-studies/data";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * @param client  the case study's `slug.client`, e.g. "smk-store"
 * @param context optional one-line note on why this result is relevant here
 */
export function proofBoxHtml(client: string, context?: string): string {
  const cs = caseStudies.find((c) => c.slug.client === client);
  // Fail the build rather than ship an empty box or a stale claim.
  if (!cs) throw new Error(`proofBoxHtml: no case study with slug.client "${client}"`);

  const metrics = cs.metrics
    .slice(0, 3)
    .map(
      (m) =>
        `<div style="flex:1 1 120px;min-width:0"><span style="display:block;font-size:1.5rem;font-weight:800;line-height:1.1;color:#0a0f2e">${esc(m.v)}</span><span style="display:block;font-size:0.8125rem;color:#64748b;margin-top:2px">${esc(m.l)}</span></div>`
    )
    .join("");

  const basis = [cs.period, cs.verifiedVia ? `verified via ${cs.verifiedVia}` : ""].filter(Boolean).join(" · ");

  return [
    `<div class="proof-box" style="border:1px solid #d9d6fb;background:#f7f6ff;border-radius:14px;padding:1.25rem 1.375rem;margin:2rem 0">`,
    `<span style="display:block;font-size:0.6875rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#534AB7">Case study · ${esc(cs.seoType)} · ${esc(cs.location)}</span>`,
    `<span style="display:block;font-size:1.0625rem;font-weight:700;color:#0a0f2e;margin-top:6px">${esc(cs.client)}</span>`,
    `<span style="display:block;font-size:0.9375rem;line-height:1.6;color:#374151;margin-top:4px">${esc(cs.headline)}</span>`,
    context ? `<span style="display:block;font-size:0.9375rem;line-height:1.6;color:#374151;margin-top:8px">${esc(context)}</span>` : "",
    `<div style="display:flex;flex-wrap:wrap;gap:12px 20px;margin-top:14px">${metrics}</div>`,
    `<span style="display:block;font-size:0.8125rem;color:#64748b;margin-top:12px">${esc(basis)}${basis ? " · " : ""}<a href="${detailUrl(cs)}" style="color:#534AB7;font-weight:700;text-decoration:underline">Read the ${esc(cs.client)} case study</a></span>`,
    `</div>`,
  ].join("");
}
