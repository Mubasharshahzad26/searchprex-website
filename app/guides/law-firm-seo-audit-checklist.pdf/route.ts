// app/guides/law-firm-seo-audit-checklist.pdf/route.ts
//
// The printable PDF of the law firm SEO audit checklist — the download behind
// the GuideMagnet on the law firm pages.
//
// Built from lib/law-firm-checklist.ts at build time (force-static), so the PDF
// can never drift from the web version at /resources/law-firm-seo-audit-
// checklist. What the PDF adds over the page is the workbook part: a scoring
// sheet per pillar and a tick box per check, for a firm running the audit on
// paper with its team.
//
// The web checklist stays free and ungated ("No Email" is in its title); only
// this printable version is offered in exchange for an email, on other pages.

import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { CHECKLIST_PILLARS, CRITICAL_CHECKS, TOTAL_CHECKS } from "@/lib/law-firm-checklist";

export const dynamic = "force-static";

const W = 612; // US Letter
const HGT = 792;
const M = 54; // margins
const INK = rgb(0.04, 0.06, 0.18);
const BODY = rgb(0.36, 0.39, 0.45);
const PURPLE = rgb(0.33, 0.29, 0.72);
const RED = rgb(0.72, 0.07, 0.23);
const LINE = rgb(0.85, 0.87, 0.91);

// The standard fonts only encode Windows-1252. Map the few characters the
// checklist uses outside it, and drop anything else rather than failing the build.
const REPLACE: Record<string, string> = { "→": "->", "≈": "~", "×": "x", "✓": "v", " ": " ", " ": " " };

function clean(font: PDFFont, s: string): string {
  let out = "";
  for (const ch of s) {
    const c = REPLACE[ch] ?? ch;
    try {
      font.widthOfTextAtSize(c, 10);
      out += c;
    } catch {
      // not encodable in WinAnsi — skip it
    }
  }
  return out;
}

function wrap(font: PDFFont, text: string, size: number, width: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (font.widthOfTextAtSize(next, size) > width && line) {
      lines.push(line);
      line = w;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export async function GET() {
  const doc = await PDFDocument.create();
  doc.setTitle(`The ${TOTAL_CHECKS}-Point Law Firm SEO Audit Checklist`);
  doc.setAuthor("Mubashar Sharif, SearchPrex");
  doc.setSubject("Law firm SEO audit checklist and scoring sheet");
  doc.setCreator("searchprex.com");

  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  let page: PDFPage = doc.addPage([W, HGT]);
  let y = HGT - M;

  const newPage = () => {
    page = doc.addPage([W, HGT]);
    y = HGT - M;
  };
  const ensure = (h: number) => {
    if (y - h < M + 30) newPage();
  };
  const text = (s: string, opts: { font?: PDFFont; size?: number; color?: ReturnType<typeof rgb>; x?: number; width?: number; gap?: number }) => {
    const font = opts.font ?? regular;
    const size = opts.size ?? 10;
    const x = opts.x ?? M;
    const width = opts.width ?? W - M - x;
    const lines = wrap(font, clean(font, s), size, width);
    for (const l of lines) {
      ensure(size + 4);
      page.drawText(l, { x, y: y - size, size, font, color: opts.color ?? INK });
      y -= size + (opts.gap ?? 4);
    }
  };

  // ── Cover ──
  text("SEARCHPREX · FREE GUIDE", { font: bold, size: 9, color: PURPLE });
  y -= 6;
  text(`The ${TOTAL_CHECKS}-Point Law Firm SEO Audit Checklist`, { font: bold, size: 24, gap: 6 });
  y -= 4;
  text(
    `The checks I run on a law firm's site across five pillars: the Map Pack, organic rankings, AI visibility, legal E-E-A-T and practice-area content. Every check is something you can verify yourself in a few minutes, without buying a tool.`,
    { size: 11, color: BODY, gap: 5 },
  );
  y -= 10;
  text("How to use it", { font: bold, size: 12 });
  y -= 2;
  for (const line of [
    `Start with the ${CRITICAL_CHECKS} checks marked CRITICAL — they gate the rest of their pillar.`,
    "Tick each check that is true for your firm today, then total each pillar on the scoring sheet below.",
    "The lowest-scoring pillar is usually where the fastest gains are.",
  ]) {
    text(`•  ${line}`, { size: 10, color: BODY, x: M + 6 });
  }

  // ── Scoring sheet ──
  y -= 14;
  text("Scoring sheet", { font: bold, size: 12 });
  y -= 4;
  const colX = [M, M + 300, M + 390];
  ensure(24);
  page.drawText("Pillar", { x: colX[0], y: y - 10, size: 9, font: bold, color: BODY });
  page.drawText("Checks", { x: colX[1], y: y - 10, size: 9, font: bold, color: BODY });
  page.drawText("Ticked", { x: colX[2], y: y - 10, size: 9, font: bold, color: BODY });
  y -= 18;
  for (const p of CHECKLIST_PILLARS) {
    ensure(22);
    page.drawLine({ start: { x: M, y: y + 4 }, end: { x: W - M, y: y + 4 }, thickness: 0.5, color: LINE });
    page.drawText(clean(regular, p.name), { x: colX[0], y: y - 10, size: 11, font: regular, color: INK });
    page.drawText(String(p.checks.length), { x: colX[1], y: y - 10, size: 11, font: regular, color: INK });
    page.drawText("______", { x: colX[2], y: y - 10, size: 11, font: regular, color: LINE });
    y -= 22;
  }
  page.drawLine({ start: { x: M, y: y + 4 }, end: { x: W - M, y: y + 4 }, thickness: 0.5, color: LINE });
  page.drawText("Total", { x: colX[0], y: y - 10, size: 11, font: bold, color: INK });
  page.drawText(String(TOTAL_CHECKS), { x: colX[1], y: y - 10, size: 11, font: bold, color: INK });
  page.drawText("______", { x: colX[2], y: y - 10, size: 11, font: bold, color: LINE });
  y -= 30;

  // ── The checks, pillar by pillar ──
  CHECKLIST_PILLARS.forEach((p, pi) => {
    newPage();
    text(`PILLAR ${pi + 1} OF ${CHECKLIST_PILLARS.length}`, { font: bold, size: 9, color: PURPLE });
    y -= 2;
    text(p.name, { font: bold, size: 18, gap: 6 });
    text(p.blurb, { size: 10, color: BODY, gap: 4 });
    y -= 10;

    for (const c of p.checks) {
      const titleLines = wrap(bold, clean(bold, c.title), 11, W - M * 2 - 26);
      const howLines = wrap(regular, clean(regular, c.how), 9, W - M * 2 - 26);
      ensure(titleLines.length * 15 + Math.min(howLines.length, 3) * 12 + 14);

      // tick box
      page.drawRectangle({ x: M, y: y - 12, width: 11, height: 11, borderColor: INK, borderWidth: 1 });
      let cy = y;
      titleLines.forEach((l, i) => {
        page.drawText(l, { x: M + 22, y: cy - 11, size: 11, font: bold, color: INK });
        if (i === titleLines.length - 1 && c.critical) {
          const w = bold.widthOfTextAtSize(l, 11);
          page.drawText("CRITICAL", { x: M + 22 + w + 8, y: cy - 10, size: 7.5, font: bold, color: RED });
        }
        cy -= 15;
      });
      y = cy;
      for (const l of howLines) {
        ensure(12);
        page.drawText(l, { x: M + 22, y: y - 9, size: 9, font: regular, color: BODY });
        y -= 12;
      }
      y -= 10;
    }
  });

  // ── Close ──
  ensure(90);
  y -= 10;
  page.drawLine({ start: { x: M, y }, end: { x: W - M, y }, thickness: 0.5, color: LINE });
  y -= 16;
  text("Want it run against your firm instead?", { font: bold, size: 13 });
  text(
    "Send your site to searchprex.com/free-audit and I will check it against the firms above you in your city, and send back what to fix first — free, within 24 hours. — Mubashar Sharif",
    { size: 10, color: BODY, gap: 5 },
  );

  // ── Footer on every page ──
  const pages = doc.getPages();
  pages.forEach((pg, i) => {
    pg.drawText(clean(regular, "searchprex.com/resources/law-firm-seo-audit-checklist"), { x: M, y: 30, size: 8, font: regular, color: BODY });
    const label = `${i + 1} / ${pages.length}`;
    pg.drawText(label, { x: W - M - regular.widthOfTextAtSize(label, 8), y: 30, size: 8, font: regular, color: BODY });
  });

  const bytes = await doc.save();
  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="law-firm-seo-audit-checklist.pdf"',
      "Cache-Control": "public, max-age=86400",
    },
  });
}
