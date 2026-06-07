"use client";
 
// components/wichita/RoiCalculator.tsx
// Fully self-contained — no backend needed. Adjust the SEO tiers to match your real packages.
 
import React, { useState } from "react";
 
const BRAND = {
  green: "#3eb489",
  greenSoft: "#7fcdb0",
  navy: "#0a0f2e",
  navyCard: "#16203f",
  navySave: "#123a2f",
  muted: "#9aa0c4",
  purpleText: "#7f77dd",
};
 
function seoTier(ppc: number): number {
  if (ppc <= 3000) return 1200;
  if (ppc <= 8000) return 1800;
  if (ppc <= 15000) return 2800;
  return 4000;
}
 
const fmt = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
 
export default function RoiCalculator() {
  const [ppc, setPpc] = useState(5000);
  const seoMonthly = seoTier(ppc);
  const ppcAnnual = ppc * 12;
  const seoAnnual = seoMonthly * 12;
  const saving = ppcAnnual - seoAnnual;
 
  return (
    <section
      style={{
        background: BRAND.navy,
        padding: "56px 26px",
        fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div
          style={{
            display: "inline-block",
            background: "#1c2547",
            color: BRAND.purpleText,
            fontSize: 11,
            fontWeight: 700,
            padding: "6px 13px",
            borderRadius: 999,
            letterSpacing: ".4px",
            marginBottom: 14,
          }}
        >
          ROI CALCULATOR
        </div>
        <h2
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#fff",
            margin: "0 0 6px",
            letterSpacing: "-0.5px",
          }}
        >
          How much PPC budget could you save?
        </h2>
        <p style={{ fontSize: 14.5, color: BRAND.muted, margin: "0 0 26px" }}>
          Slide your current monthly Google Ads spend to see what reallocating to
          SEO could look like over a year.
        </p>
 
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 26,
          }}
        >
          <span style={{ fontSize: 13, color: BRAND.muted, whiteSpace: "nowrap" }}>
            PPC / mo
          </span>
          <input
            type="range"
            min={1000}
            max={30000}
            step={500}
            value={ppc}
            onChange={(e) => setPpc(parseInt(e.target.value, 10))}
            aria-label="Monthly PPC spend"
            style={{ flex: 1, accentColor: BRAND.green }}
          />
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: BRAND.green,
              minWidth: 84,
              textAlign: "right",
            }}
          >
            {fmt(ppc)}
          </span>
        </div>
 
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
          }}
        >
          <div
            style={{
              background: BRAND.navyCard,
              borderRadius: 11,
              padding: 16,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>
              {fmt(ppcAnnual)}
            </div>
            <div style={{ fontSize: 11, color: BRAND.muted, marginTop: 4 }}>
              PPC / year
            </div>
          </div>
          <div
            style={{
              background: BRAND.navyCard,
              borderRadius: 11,
              padding: 16,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>
              {fmt(seoAnnual)}
            </div>
            <div style={{ fontSize: 11, color: BRAND.muted, marginTop: 4 }}>
              SEO program / yr
            </div>
          </div>
          <div
            style={{
              background: BRAND.navySave,
              borderRadius: 11,
              padding: 16,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, color: BRAND.green }}>
              {saving >= 0 ? fmt(saving) : "+ lasting traffic"}
            </div>
            <div style={{ fontSize: 11, color: BRAND.greenSoft, marginTop: 4 }}>
              year-1 saving
            </div>
          </div>
        </div>
 
        <p style={{ fontSize: 11.5, color: "#6b7090", marginTop: 16 }}>
          Illustrative estimate based on typical programs. SEO keeps driving
          traffic after you pause spend; PPC stops the moment you do. Your actual
          results depend on your market and starting point.
        </p>
      </div>
    </section>
  );
}
 
