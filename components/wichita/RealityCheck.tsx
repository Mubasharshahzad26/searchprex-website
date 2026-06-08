// components/wichita/RealityCheck.tsx
// "Reality Check" section — direct messaging inspired by Dominate Marketing
// Place this AFTER the Hero / Family Law strip, BEFORE Market Snapshot
 
const NAVY        = "#0a0f2e";
const NAVY2       = "#111936";
const PURPLE      = "#534AB7";
const GREEN       = "#2f9670";
const RED         = "#d85a30";
const FONT        = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";
const CALENDLY    = "https://calendly.com/contact-searchprex/30min";
 
// ── The hard truths ───────────────────────────────────────────────────────────
const HARD_TRUTHS = [
  {
    num: "01",
    headline: "Your agency is sending reports — not results.",
    body: "Green checkmarks. Ranking graphs. Traffic screenshots. Every month, a beautiful PDF arrives. And every month, your phone rings the same amount. Vanity metrics are not cases. We report on calls, consults booked, and signed clients — nothing else matters.",
  },
  {
    num: "02",
    headline: "You are being managed by someone who learned SEO last year.",
    body: "You signed with the agency owner. You got handed to a junior account manager two weeks later. That junior follows a playbook built for restaurants and plumbers — not a Wichita family law firm competing in Sedgwick County. Founder-led means Mubashar does the work. Every time.",
  },
  {
    num: "03",
    headline: "When you leave, they take your website.",
    body: "Scorpion. FindLaw. Martindale. They build your website on their platform, lock you into a contract, and the moment you cancel — your site disappears. Every page, every review, every dollar of SEO equity: gone. We build everything on your domain. You own it forever.",
  },
  {
    num: "04",
    headline: "You are ranking — just for the wrong searches.",
    body: "Your firm name ranks #1. So what? No one searches your firm name unless they already know you. The cases come from 'divorce attorney Derby KS' and 'family law lawyer near McConnell AFB'. Those are the searches your current SEO is probably ignoring.",
  },
  {
    num: "05",
    headline: "AI is already answering your clients' questions — without you.",
    body: "Right now, someone is asking ChatGPT or Google AI 'best family law attorney in Wichita'. An attorney is being named. It is probably not you. Citation-based authority, proper schema, and E-E-A-T content are what get you into those answers. Most agencies have no plan for this.",
  },
];
 
// ── Comparison table data ─────────────────────────────────────────────────────
const COMPARE = [
  { label: "Who does the work",          them: "Junior account managers", us: "Mubashar — founder & strategist" },
  { label: "You own the website",        them: "No — they do",           us: "Yes — always, from day one" },
  { label: "What they report on",        them: "Traffic & keyword ranks", us: "Calls, consults & signed cases" },
  { label: "SEO strategy",               them: "Same playbook for all",   us: "Built for Wichita law specifically" },
  { label: "AI / LLM visibility",        them: "No plan",                 us: "GEO-ready from month one" },
  { label: "Contract lock-in",           them: "12-month minimum",        us: "Month-to-month after onboarding" },
  { label: "Suburb-level targeting",     them: "Rarely",                  us: "Derby, Andover, Bel Aire — all" },
  { label: "Map pack strategy",          them: "Generic GBP setup",       us: "Active weekly optimization" },
];
 
// ── Component ─────────────────────────────────────────────────────────────────
export default function RealityCheck() {
  return (
    <section style={{ fontFamily: FONT, background: NAVY, padding: "72px 0 0" }}>
 
      {/* ── Header ── */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 26px 48px" }}>
        <div style={{ maxWidth: 680 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: `${RED}18`, border: `1px solid ${RED}40`,
            borderRadius: 999, padding: "5px 14px", marginBottom: 18,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: RED, display: "inline-block" }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: RED, letterSpacing: ".5px" }}>
              REALITY CHECK — WICHITA LAW FIRMS
            </span>
          </div>
 
          <h2 style={{
            fontSize: 36, fontWeight: 900, color: "#fff",
            lineHeight: 1.1, letterSpacing: "-0.8px", margin: "0 0 16px",
          }}>
            The hard truths no SEO agency<br />
            <span style={{ color: GREEN }}>will ever tell you.</span>
          </h2>
 
          <p style={{ fontSize: 16, color: "#9aa0c4", lineHeight: 1.7, margin: 0 }}>
            After talking to dozens of Wichita law firms who wasted money on agencies,
            the same five problems come up every time. Here they are — unfiltered.
          </p>
        </div>
      </div>
 
      {/* ── Hard truth cards ── */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 26px 64px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {HARD_TRUTHS.map((t, i) => (
            <div
              key={t.num}
              style={{
                display: "grid",
                gridTemplateColumns: "72px 1fr",
                gap: 0,
                background: i % 2 === 0 ? "rgba(255,255,255,0.03)" : "transparent",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              {/* Number column */}
              <div style={{
                background: `${RED}15`,
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "24px 0",
                borderRight: `1px solid rgba(255,255,255,0.07)`,
              }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: RED }}>{t.num}</span>
              </div>
 
              {/* Content */}
              <div style={{ padding: "22px 26px" }}>
                <div style={{ fontSize: 15.5, fontWeight: 800, color: "#fff", marginBottom: 8, lineHeight: 1.3 }}>
                  {t.headline}
                </div>
                <div style={{ fontSize: 13.5, color: "#8b90ac", lineHeight: 1.7 }}>
                  {t.body}
                </div>
              </div>
            </div>
          ))}
        </div>
 
        {/* Mid CTA */}
        <div style={{
          marginTop: 32,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 16,
          background: `${GREEN}12`,
          border: `1px solid ${GREEN}35`,
          borderRadius: 14, padding: "20px 28px",
        }}>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>
              Sound familiar? You deserve better than this.
            </p>
            <p style={{ fontSize: 13, color: "#9aa0c4", margin: 0 }}>
              Book a free 30-min call — Mubashar will tell you exactly what is wrong and what it takes to fix it.
            </p>
          </div>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: GREEN, color: "#fff",
              fontSize: 13.5, fontWeight: 700,
              padding: "11px 24px", borderRadius: 10,
              textDecoration: "none", flexShrink: 0,
            }}
          >
            Book a reality check call →
          </a>
        </div>
      </div>
 
      {/* ── Comparison table ── */}
      <div style={{ background: NAVY2, borderTop: "1px solid rgba(255,255,255,0.07)", padding: "56px 0" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 26px" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: GREEN, letterSpacing: ".5px", marginBottom: 10 }}>
              SIDE-BY-SIDE
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", margin: 0 }}>
              Generic agency vs Searchprex
            </h2>
          </div>
 
          {/* Table header */}
          <div style={{
            display: "grid", gridTemplateColumns: "2fr 1fr 1fr",
            gap: 0, marginBottom: 4,
          }}>
            <div />
            <div style={{
              textAlign: "center", fontSize: 11, fontWeight: 700,
              color: "#6b7090", letterSpacing: ".4px", padding: "8px 0",
            }}>
              TYPICAL AGENCY
            </div>
            <div style={{
              textAlign: "center", fontSize: 11, fontWeight: 700,
              color: GREEN, letterSpacing: ".4px", padding: "8px 0",
            }}>
              SEARCHPREX
            </div>
          </div>
 
          {/* Rows */}
          <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
            {COMPARE.map((row, i) => (
              <div
                key={row.label}
                style={{
                  display: "grid", gridTemplateColumns: "2fr 1fr 1fr",
                  borderTop: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                }}
              >
                {/* Label */}
                <div style={{ padding: "14px 20px", fontSize: 13.5, fontWeight: 600, color: "#c3c7df" }}>
                  {row.label}
                </div>
 
                {/* Them */}
                <div style={{
                  padding: "14px 12px", textAlign: "center",
                  fontSize: 12.5, color: "#6b7090",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                }}>
                  <span style={{ color: RED, fontWeight: 700 }}>✕</span>
                  {row.them}
                </div>
 
                {/* Us */}
                <div style={{
                  padding: "14px 12px", textAlign: "center",
                  fontSize: 12.5, color: "#c3c7df", fontWeight: 600,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                  background: `${GREEN}08`,
                }}>
                  <span style={{ color: GREEN, fontWeight: 700 }}>✓</span>
                  {row.us}
                </div>
              </div>
            ))}
          </div>
 
          {/* Bottom CTA */}
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <p style={{ fontSize: 14, color: "#9aa0c4", margin: "0 0 16px" }}>
              Still with an agency that fails most of these? Let&apos;s fix that.
            </p>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: PURPLE, color: "#fff",
                fontSize: 14, fontWeight: 700,
                padding: "13px 28px", borderRadius: 10,
                textDecoration: "none",
              }}
            >
              Book a free strategy call →
            </a>
            <div style={{ fontSize: 12, color: "#6b7090", marginTop: 10 }}>
              Free 30-min call · No commitment · Reviewed by Mubashar personally
            </div>
          </div>
        </div>
      </div>
 
    </section>
  );
}
 






