
"use client";
 
import { useState } from "react";
 
const NAVY   = "#0a0f2e";
const PURPLE = "#534AB7";
const GREEN  = "#2f9670";
const FONT   = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";
 
const steps = [
  {
    num: "01", icon: "🔍", title: "They search", short: "Google or AI assistant",
    detail: "A Wichita resident types 'divorce attorney near me' or asks ChatGPT 'best family law attorney in Wichita KS'. This is the moment everything starts — and where most firms are already invisible.",
    color: PURPLE,
    signals: ["divorce attorney Wichita KS", "family law lawyer near me", "child custody attorney Derby KS", "best divorce lawyer Sedgwick County"],
  },
  {
    num: "02", icon: "📍", title: "You appear", short: "Top 3 map pack + AI Overview",
    detail: "Your firm shows up in the top 3 of Google Maps AND in the AI Overview answer — the two spots that capture the majority of clicks before anyone scrolls to blue links. This is what we build for.",
    color: "#185FA5",
    signals: ["GBP in top 3 map pack", "AI Overview mentions your firm", "Practice-area page on page 1", "Star rating + reviews visible"],
  },
  {
    num: "03", icon: "🖱️", title: "They click", short: "Your page earns the trust",
    detail: "Your landing page is fast, mobile-optimized, and written for someone in crisis mode — not for bots. Within seconds they trust you. They read your credentials, see your reviews, and feel understood.",
    color: "#BA7517",
    signals: ["Page loads in under 2 seconds", "Attorney bio + credentials visible", "Client reviews front and center", "Clear Call now or Book consult CTA"],
  },
  {
    num: "04", icon: "📞", title: "They call", short: "Booked consult — tracked",
    detail: "The phone rings. A booked consultation. We track every lead back to its source so you know exactly which keyword and which page drove that call — no guessing.",
    color: GREEN,
    signals: ["Call tracked to keyword source", "Form submission logged", "Calendly booking recorded", "Monthly lead report delivered"],
  },
];
 
export default function BuyersJourneyInteractive() {
  const [active, setActive] = useState(0);
  const current = steps[active];
 
  return (
    <section style={{ padding: "64px 0", background: NAVY, fontFamily: FONT }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 26px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: GREEN, letterSpacing: ".5px", marginBottom: 8 }}>INTERACTIVE — CLICK EACH STEP</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", margin: "0 0 10px" }}>How a Wichita client finds and hires your firm</h2>
          <p style={{ fontSize: 15, color: "#9aa0c4", maxWidth: 500, margin: "0 auto", lineHeight: 1.6 }}>Four steps from search to signed client — we optimize every single one.</p>
        </div>
 
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 24 }}>
          {steps.map((s, i) => (
            <button key={s.num} onClick={() => setActive(i)} style={{ background: active === i ? s.color : "rgba(255,255,255,0.05)", border: `2px solid ${active === i ? s.color : "rgba(255,255,255,0.1)"}`, borderRadius: 12, padding: "14px 12px", cursor: "pointer", textAlign: "left", transition: "all 0.25s ease" }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: active === i ? "#fff" : "#c3c7df" }}>{s.title}</div>
              <div style={{ fontSize: 11, color: active === i ? "rgba(255,255,255,0.7)" : "#6b7090", marginTop: 2 }}>{s.short}</div>
            </button>
          ))}
        </div>
 
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderLeft: `4px solid ${current.color}`, borderRadius: 14, padding: "28px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: current.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{current.icon}</div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: current.color, letterSpacing: ".4px" }}>STEP {current.num}</div>
                <div style={{ fontSize: 17, fontWeight: 800, color: "#fff" }}>{current.title}</div>
              </div>
            </div>
            <p style={{ fontSize: 14.5, color: "#c3c7df", lineHeight: 1.7, margin: 0 }}>{current.detail}</p>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9aa0c4", letterSpacing: ".4px", marginBottom: 12 }}>WHAT WE BUILD / TRACK AT THIS STEP</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {current.signals.map((q) => (
                <div key={q} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "10px 14px" }}>
                  <span style={{ color: current.color, fontWeight: 700, fontSize: 14, flexShrink: 0 }}>→</span>
                  <span style={{ fontSize: 13, color: "#c3c7df" }}>{q}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
 
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
          {steps.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ width: active === i ? 24 : 8, height: 8, borderRadius: 99, background: active === i ? GREEN : "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0 }} />
          ))}
        </div>
      </div>
    </section>
  );
}
 