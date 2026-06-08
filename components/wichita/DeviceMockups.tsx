// components/wichita/DeviceMockups.tsx
// Place BEFORE the Final CTA section in the Wichita page
 
const NAVY   = "#0a0f2e";
const PURPLE = "#534AB7";
const GREEN  = "#2f9670";
const FONT   = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";
const CALENDLY = "https://calendly.com/contact-searchprex/30min";
 
// ── Simulated law firm website (inside laptop screen) ─────────────────────────
function LawFirmScreen() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#0d1117", overflow: "hidden", fontFamily: FONT }}>
 
      {/* Nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", background: "#0a0f2e", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ fontSize: 9, fontWeight: 800, color: "#fff", letterSpacing: ".5px" }}>WICHITA LAW GROUP</div>
        <div style={{ display: "flex", gap: 8 }}>
          {["About", "Practice", "Results", "Contact"].map(n => (
            <div key={n} style={{ fontSize: 7, color: "#6b7090" }}>{n}</div>
          ))}
          <div style={{ fontSize: 7, fontWeight: 700, color: "#fff", background: GREEN, padding: "2px 7px", borderRadius: 3 }}>Free Call</div>
        </div>
      </div>
 
      {/* Hero */}
      <div style={{ padding: "16px 14px 12px", background: "linear-gradient(135deg, #0a0f2e 0%, #162460 100%)" }}>
        <div style={{ fontSize: 7, color: "#3eb489", fontWeight: 700, letterSpacing: ".5px", marginBottom: 5 }}>WICHITA · SEDGWICK COUNTY</div>
        <div style={{ fontSize: 13, fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: 6 }}>
          Wichita&apos;s<br />
          <span style={{ color: "#3eb489" }}>Family Law</span><br />
          Attorneys
        </div>
        <div style={{ fontSize: 7, color: "#9aa0c4", lineHeight: 1.5, marginBottom: 10, maxWidth: 160 }}>
          Divorce, custody & family law — serving Sedgwick County since 2008.
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          <div style={{ fontSize: 7, fontWeight: 700, color: "#fff", background: GREEN, padding: "4px 10px", borderRadius: 4 }}>Free Consultation</div>
          <div style={{ fontSize: 7, fontWeight: 600, color: "#fff", border: "1px solid rgba(255,255,255,0.25)", padding: "4px 10px", borderRadius: 4 }}>Our Results →</div>
        </div>
      </div>
 
      {/* Stats bar */}
      <div style={{ display: "flex", borderBottom: "1px solid #1e2337" }}>
        {[["500+", "Cases Won"], ["15yr", "Experience"], ["★4.9", "Google"]].map(([v, l]) => (
          <div key={l} style={{ flex: 1, textAlign: "center", padding: "7px 4px", borderRight: "1px solid #1e2337" }}>
            <div style={{ fontSize: 9, fontWeight: 800, color: GREEN }}>{v}</div>
            <div style={{ fontSize: 6, color: "#6b7090" }}>{l}</div>
          </div>
        ))}
      </div>
 
      {/* Practice areas row */}
      <div style={{ padding: "10px 14px" }}>
        <div style={{ fontSize: 7, fontWeight: 700, color: "#fff", marginBottom: 7 }}>Practice Areas</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
          {["Family Law & Divorce", "Child Custody", "Property Division", "Spousal Support"].map(p => (
            <div key={p} style={{ background: "#161c33", border: "1px solid #1e2847", borderRadius: 4, padding: "5px 7px", fontSize: 6.5, color: "#c3c7df" }}>
              {p}
            </div>
          ))}
        </div>
      </div>
 
      {/* Review strip */}
      <div style={{ margin: "0 14px", background: `${PURPLE}18`, border: `1px solid ${PURPLE}30`, borderRadius: 5, padding: "6px 8px" }}>
        <div style={{ fontSize: 7, color: "#fff", fontWeight: 700, marginBottom: 2 }}>★★★★★ — Google Review</div>
        <div style={{ fontSize: 6.5, color: "#9aa0c4", lineHeight: 1.4 }}>
          &ldquo;They handled my divorce with professionalism I didn&apos;t expect...&rdquo;
        </div>
      </div>
    </div>
  );
}
 
// ── Simulated Google Maps (inside phone screen) ───────────────────────────────
function GoogleMapsScreen() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#fff", overflow: "hidden", fontFamily: FONT }}>
 
      {/* Search bar */}
      <div style={{ padding: "7px 8px", background: "#fff", borderBottom: "1px solid #e8eaed" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#f1f3f4", borderRadius: 20, padding: "5px 10px" }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#5f6368" strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke="#5f6368" strokeWidth="2"/></svg>
          <span style={{ fontSize: 7, color: "#3c4043" }}>family law attorney wichita</span>
        </div>
      </div>
 
      {/* Map area (simulated) */}
      <div style={{ height: 60, background: "#e8f0fe", position: "relative", overflow: "hidden" }}>
        {/* Simulated map roads */}
        <div style={{ position: "absolute", inset: 0 }}>
          <div style={{ position: "absolute", top: "30%", left: 0, right: 0, height: 1.5, background: "#fff", opacity: 0.7 }} />
          <div style={{ position: "absolute", top: "65%", left: 0, right: 0, height: 1, background: "#fff", opacity: 0.5 }} />
          <div style={{ position: "absolute", left: "40%", top: 0, bottom: 0, width: 1.5, background: "#fff", opacity: 0.7 }} />
          <div style={{ position: "absolute", left: "70%", top: 0, bottom: 0, width: 1, background: "#fff", opacity: 0.5 }} />
        </div>
        {/* Map pins */}
        <div style={{ position: "absolute", top: "18%", left: "37%", fontSize: 11 }}>📍</div>
        <div style={{ position: "absolute", top: "40%", left: "58%", fontSize: 9, opacity: 0.6 }}>📍</div>
        <div style={{ position: "absolute", top: "55%", left: "25%", fontSize: 9, opacity: 0.6 }}>📍</div>
        {/* Label */}
        <div style={{ position: "absolute", bottom: 5, right: 8, fontSize: 6, color: "#5f6368", background: "rgba(255,255,255,0.9)", padding: "2px 5px", borderRadius: 2 }}>
          Sedgwick County, KS
        </div>
      </div>
 
      {/* Results label */}
      <div style={{ padding: "6px 8px 3px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 7, fontWeight: 700, color: "#3c4043" }}>Top 3 results</span>
        <span style={{ fontSize: 6, color: "#1a73e8" }}>View all</span>
      </div>
 
      {/* Result 1 — TOP / highlighted */}
      <div style={{ margin: "0 6px 4px", background: "#e8f5e9", border: "1.5px solid #2f9670", borderRadius: 8, padding: "8px 9px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 3 }}>
          <div>
            <div style={{ fontSize: 8, fontWeight: 800, color: "#0a0f2e" }}>Wichita Law Group</div>
            <div style={{ fontSize: 6.5, color: GREEN }}>★★★★★ 4.9 (87)</div>
          </div>
          <div style={{ background: GREEN, color: "#fff", fontSize: 6, fontWeight: 700, padding: "2px 5px", borderRadius: 3 }}>#1</div>
        </div>
        <div style={{ fontSize: 6, color: "#5f6368", marginBottom: 4 }}>Family law attorney · 525 N Main St</div>
        <div style={{ display: "flex", gap: 3 }}>
          <div style={{ fontSize: 6, background: GREEN, color: "#fff", padding: "2px 6px", borderRadius: 99, fontWeight: 600 }}>Call</div>
          <div style={{ fontSize: 6, background: "#fff", color: GREEN, border: `1px solid ${GREEN}`, padding: "2px 6px", borderRadius: 99 }}>Website</div>
          <div style={{ fontSize: 6, background: "#fff", color: "#5f6368", border: "1px solid #dadce0", padding: "2px 6px", borderRadius: 99 }}>Directions</div>
        </div>
      </div>
 
      {/* Result 2 */}
      <div style={{ margin: "0 6px 4px", background: "#fff", border: "1px solid #dadce0", borderRadius: 8, padding: "7px 9px" }}>
        <div style={{ fontSize: 7.5, fontWeight: 700, color: "#3c4043", marginBottom: 2 }}>Sedgwick Family Attorneys</div>
        <div style={{ fontSize: 6, color: "#fbbc04" }}>★★★★☆ 4.2 (43)</div>
        <div style={{ fontSize: 6, color: "#5f6368", marginTop: 1 }}>Family law attorney · East Wichita</div>
      </div>
 
      {/* Result 3 */}
      <div style={{ margin: "0 6px", background: "#fff", border: "1px solid #dadce0", borderRadius: 8, padding: "7px 9px" }}>
        <div style={{ fontSize: 7.5, fontWeight: 700, color: "#3c4043", marginBottom: 2 }}>Derby Law Associates</div>
        <div style={{ fontSize: 6, color: "#fbbc04" }}>★★★★☆ 4.1 (31)</div>
        <div style={{ fontSize: 6, color: "#5f6368", marginTop: 1 }}>Family law attorney · Derby, KS</div>
      </div>
    </div>
  );
}
 
// ── Laptop frame ──────────────────────────────────────────────────────────────
function LaptopMockup({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "relative", width: 420 }}>
      {/* Screen body */}
      <div style={{
        background: "#1a1f35",
        borderRadius: "12px 12px 0 0",
        padding: "10px 10px 0",
        boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}>
        {/* Camera dot */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#2d3352" }} />
        </div>
        {/* Browser chrome */}
        <div style={{
          background: "#0d1117",
          borderRadius: "6px 6px 0 0",
          overflow: "hidden",
        }}>
          {/* Browser top bar */}
          <div style={{
            background: "#161c2e",
            padding: "6px 10px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}>
            {/* Traffic lights */}
            <div style={{ display: "flex", gap: 4 }}>
              {["#ff5f57", "#febc2e", "#28c840"].map(c => (
                <div key={c} style={{ width: 7, height: 7, borderRadius: "50%", background: c }} />
              ))}
            </div>
            {/* URL bar */}
            <div style={{
              flex: 1, background: "#0a0f2e", borderRadius: 4, padding: "3px 8px",
              display: "flex", alignItems: "center", gap: 4,
            }}>
              <span style={{ fontSize: 6, color: "#3eb489" }}>🔒</span>
              <span style={{ fontSize: 6.5, color: "#6b7090" }}>wichitalawgroup.com</span>
            </div>
          </div>
          {/* Screen content */}
          <div style={{ height: 260, overflow: "hidden" }}>
            {children}
          </div>
        </div>
      </div>
      {/* Laptop base */}
      <div style={{
        height: 14,
        background: "linear-gradient(180deg, #1a1f35 0%, #0f1223 100%)",
        borderRadius: "0 0 4px 4px",
        border: "1px solid rgba(255,255,255,0.08)",
        borderTop: "none",
      }} />
      {/* Hinge line */}
      <div style={{
        height: 3,
        background: "#080c1a",
        borderRadius: "0 0 10px 10px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
      }} />
    </div>
  );
}
 
// ── Phone frame ───────────────────────────────────────────────────────────────
function PhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      width: 130,
      background: "#1a1f35",
      borderRadius: 22,
      padding: "10px 6px",
      boxShadow: "0 24px 60px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.1)",
      marginTop: 40,
      position: "relative",
      zIndex: 2,
    }}>
      {/* Notch */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
        <div style={{ width: 36, height: 5, background: "#0d1117", borderRadius: 99 }} />
      </div>
      {/* Screen */}
      <div style={{
        height: 240,
        borderRadius: 12,
        overflow: "hidden",
        background: "#fff",
      }}>
        {children}
      </div>
      {/* Home indicator */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
        <div style={{ width: 40, height: 3, background: "rgba(255,255,255,0.2)", borderRadius: 99 }} />
      </div>
    </div>
  );
}
 
// ── Main section ──────────────────────────────────────────────────────────────
export default function DeviceMockups() {
  return (
    <section style={{ fontFamily: FONT, background: NAVY, padding: "72px 0", overflow: "hidden" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 26px" }}>
 
        {/* Layout: text left, mockups right */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
 
          {/* LEFT — copy */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: `${GREEN}15`, border: `1px solid ${GREEN}35`,
              borderRadius: 999, padding: "4px 14px", marginBottom: 18,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: GREEN, display: "inline-block" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: GREEN, letterSpacing: ".5px" }}>WHAT WINNING LOOKS LIKE</span>
            </div>
 
            <h2 style={{
              fontSize: 32, fontWeight: 900, color: "#fff",
              lineHeight: 1.15, letterSpacing: "-0.6px", margin: "0 0 16px",
            }}>
              Your firm — at the top<br />
              <span style={{ color: GREEN }}>of every search.</span>
            </h2>
 
            <p style={{ fontSize: 15, color: "#9aa0c4", lineHeight: 1.7, margin: "0 0 28px" }}>
              A professionally optimized website plus a top-3 Google Maps placement — that&apos;s what every Wichita family law client sees when they search. This is what we build.
            </p>
 
            {/* Result stats */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
              {[
                { icon: "📍", stat: "Top 3", label: "Google Maps placement — Sedgwick County" },
                { icon: "★", stat: "4.9",   label: "Average client review score after 6 months" },
                { icon: "📞", stat: "3×",   label: "More qualified calls vs paid ads" },
                { icon: "🤖", stat: "Yes",  label: "AI Overview citations — ChatGPT & Google" },
              ].map(({ icon, stat, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 9,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, flexShrink: 0,
                  }}>{icon}</div>
                  <div>
                    <span style={{ fontSize: 15, fontWeight: 800, color: "#fff" }}>{stat} </span>
                    <span style={{ fontSize: 13, color: "#8b90ac" }}>{label}</span>
                  </div>
                </div>
              ))}
            </div>
 
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: GREEN, color: "#fff",
                fontSize: 14, fontWeight: 700,
                padding: "13px 26px", borderRadius: 10,
                textDecoration: "none",
              }}
            >
              Get this for your firm →
            </a>
          </div>
 
          {/* RIGHT — device mockups */}
          <div style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: 0, justifyContent: "flex-end" }}>
 
            {/* Glow behind */}
            <div style={{
              position: "absolute",
              top: "20%", left: "10%",
              width: 240, height: 240,
              borderRadius: "50%",
              background: `${PURPLE}20`,
              filter: "blur(60px)",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute",
              bottom: "10%", right: "5%",
              width: 160, height: 160,
              borderRadius: "50%",
              background: `${GREEN}15`,
              filter: "blur(50px)",
              pointerEvents: "none",
            }} />
 
            {/* Laptop */}
            <div style={{ position: "relative", zIndex: 1 }}>
              <LaptopMockup>
                <LawFirmScreen />
              </LaptopMockup>
 
              {/* Floating badge on laptop */}
              <div style={{
                position: "absolute",
                top: -14, left: -14,
                background: PURPLE,
                border: "2px solid rgba(255,255,255,0.15)",
                borderRadius: 10,
                padding: "8px 12px",
                boxShadow: "0 8px 24px rgba(83,74,183,0.35)",
              }}>
                <div style={{ fontSize: 8, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: ".4px", marginBottom: 1 }}>ORGANIC</div>
                <div style={{ fontSize: 15, fontWeight: 900, color: "#fff" }}>+320%</div>
                <div style={{ fontSize: 8, color: "rgba(255,255,255,0.6)" }}>leads in 8 months</div>
              </div>
            </div>
 
            {/* Phone — overlapping */}
            <div style={{ marginLeft: -30, position: "relative", zIndex: 3 }}>
              <PhoneMockup>
                <GoogleMapsScreen />
              </PhoneMockup>
 
              {/* Floating badge on phone */}
              <div style={{
                position: "absolute",
                bottom: 30, right: -20,
                background: GREEN,
                border: "2px solid rgba(255,255,255,0.2)",
                borderRadius: 10,
                padding: "7px 11px",
                boxShadow: "0 8px 24px rgba(47,150,112,0.4)",
              }}>
                <div style={{ fontSize: 8, fontWeight: 700, color: "rgba(255,255,255,0.7)", marginBottom: 1 }}>MAP PACK</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: "#fff" }}>#1</div>
                <div style={{ fontSize: 7.5, color: "rgba(255,255,255,0.7)" }}>Wichita KS</div>
              </div>
            </div>
          </div>
 
        </div>
      </div>
    </section>
  );
}
 






