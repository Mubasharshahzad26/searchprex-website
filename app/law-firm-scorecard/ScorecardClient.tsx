"use client";
 
import { useState, useEffect, useRef } from "react";
import {
  Scale, Search, Bot, MapPin, FileText, ArrowRight,
  CheckCircle2, AlertTriangle, XCircle, Sparkles, Gauge, RefreshCw, Mail,
  type LucideIcon,
} from "lucide-react";
 
/* ────────────────────────────────────────────────────────────
   SearchPrex — Law Firm SEO Scorecard (FULLY RESPONSIVE)
   ──────────────────────────────────────────────────────────── */
 
const PURPLE = "#534AB7";
const PURPLE_DARK = "#3C3489";
const PURPLE_LT = "#7F77DD";
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
const NAVY = "#0a0f2e";
const INK = "#1c1c24";
const BODY = "#5b6472";
const MUTE = "#94a3b8";
const LINE = "#e9ecf5";
const BG = "#f7f8fc";
const RED = "#ef4444";
const AMBER = "#f59e0b";
 
const CALENDLY = "https://calendly.com/contact-searchprex/30min";
 
type Status = "strong" | "moderate" | "weak";
type Impact = "High" | "Medium" | "Low";
type Pillar = { id: string; score: number; status: Status; findings: string[] };
type Fix = { priority: number; pillar: string; impact: Impact; title: string; detail: string };
type Scorecard = {
  firmName: string;
  overallScore: number;
  verdict: string;
  caseImpact: string;
  pillars: Pillar[];
  fixes: Fix[];
};
type FormState = { website: string; city: string; practiceArea: string };
type PillarMeta = { name: string; Icon: LucideIcon; blurb: string };
 
const PILLAR_META: Record<string, PillarMeta> = {
  "map-pack":      { name: "Map Pack Power",        Icon: MapPin,   blurb: "Google local 3-pack visibility, reviews & citations" },
  "organic":       { name: "Organic Rankings",      Icon: Search,   blurb: "Practice-area + city keyword positions vs competitors" },
  "ai-visibility": { name: "AI Visibility (AEO)",   Icon: Bot,      blurb: "Do ChatGPT, Gemini & Perplexity recommend you?" },
  "eeat-schema":   { name: "Legal E-E-A-T & Schema",Icon: Scale,    blurb: "Attorney bios, bar citations & structured data" },
  "content":       { name: "Practice-Area Content", Icon: FileText, blurb: "Page depth & topic gaps vs ranking firms" },
};
const PILLAR_ORDER = ["map-pack", "organic", "ai-visibility", "eeat-schema", "content"];
 
const PRACTICE_AREAS = [
  "Personal Injury", "Car Accident", "Criminal Defense", "DUI / DWI",
  "Family Law", "Divorce", "Estate Planning", "Bankruptcy", "Immigration",
  "Employment Law", "Workers' Compensation", "Medical Malpractice",
  "Wrongful Death", "Real Estate", "Business Law",
];
 
const LOADING_STEPS = [
  "Researching the firm's web presence…",
  "Checking Google Map Pack & review signals…",
  "Querying AI engines for your practice area…",
  "Auditing legal E-E-A-T & schema markup…",
  "Comparing practice-area content vs competitors…",
  "Scoring all five pillars…",
  "Building your scorecard…",
];
 
const SAMPLE: Scorecard & { city: string; practiceArea: string } = {
  firmName: "Sterling & Hayes Injury Law",
  city: "Chicago, IL",
  practiceArea: "Personal Injury",
  overallScore: 54,
  verdict: "A capable firm with real cases won, but largely invisible where high-intent clients now search — local maps, AI answers, and structured trust signals.",
  caseImpact: "For \"personal injury lawyer Chicago\" (~5,400 searches/mo), missing the Map Pack and AI answers can divert 30–40 high-intent leads each month to competitors. At a conservative signed-case value, that's six figures in fees leaking annually.",
  pillars: [
    { id: "map-pack",      score: 41, status: "weak",     findings: ["Not in the local 3-pack for core practice-area searches in your city.", "Review volume trails the top three competing firms by a wide margin."] },
    { id: "organic",       score: 58, status: "moderate", findings: ["Ranking page 2 for \"personal injury lawyer Chicago\"; competitors hold page 1.", "Strong homepage authority, but practice-area pages under-optimized."] },
    { id: "ai-visibility", score: 28, status: "weak",     findings: ["Not named when AI engines are asked for the best PI lawyers in your city.", "Thin entity signals — no consistent citations AI models can trust."] },
    { id: "eeat-schema",   score: 62, status: "moderate", findings: ["Attorney bios present but missing bar admissions & credential schema.", "No LegalService / Attorney / Review structured data detected."] },
    { id: "content",       score: 71, status: "moderate", findings: ["Good top-level pages, but few city + practice-area landing pages.", "Missing FAQ and case-result content competitors rank with."] },
  ],
  fixes: [
    { priority: 1, pillar: "ai-visibility", impact: "High",   title: "Build AI-citation signals (AEO)", detail: "Earn consistent NAP citations, legal directory listings and structured bios so ChatGPT, Gemini & Perplexity can surface the firm." },
    { priority: 2, pillar: "map-pack",      impact: "High",   title: "Optimize Google Business Profile", detail: "Complete every field, add practice-area services, and launch a steady review-generation routine to break into the 3-pack." },
    { priority: 3, pillar: "eeat-schema",   impact: "High",   title: "Deploy legal schema + bar citations", detail: "Add Attorney, LegalService, FAQPage and Review schema, and cite bar admissions and credentials on every attorney bio." },
    { priority: 4, pillar: "organic",       impact: "Medium", title: "Rebuild practice-area pages", detail: "Expand each core practice-area page with people-first depth, internal links and the questions competitors are ranking for." },
    { priority: 5, pillar: "content",       impact: "Medium", title: "Add city + practice-area landing pages", detail: "Create dedicated pages for each service in each target city to capture geo-intent searches you currently miss." },
  ],
};
 
/* ── helpers ─────────────────────────────────────────────── */
const scoreColor = (s: number) => (s >= 75 ? GREEN : s >= 50 ? AMBER : RED);
const scoreColorDark = (s: number) => (s >= 75 ? GREEN_DARK : s >= 50 ? "#b45309" : "#b91c1c");
const gradeFor = (s: number) => (s >= 90 ? "A" : s >= 80 ? "B" : s >= 70 ? "C" : s >= 60 ? "D" : "F");
const statusLabel = (st: string) =>
  (({ strong: "Strong", moderate: "Needs work", weak: "Critical gap" } as Record<string, string>)[st] || "Needs work");
 
function StatusIcon({ st, color }: { st: Status; color: string }) {
  if (st === "strong") return <CheckCircle2 size={15} color={color} />;
  if (st === "weak") return <XCircle size={15} color={color} />;
  return <AlertTriangle size={15} color={color} />;
}
 
/* ── Ring gauge (RESPONSIVE) ──────────────────────────────── */
function RingGauge({ score }: { score: number }) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);
  
  const size = isMobile ? 140 : 200;
  const R = size / 2 - 8;
  const C = 2 * Math.PI * R;
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 120);
    return () => clearTimeout(t);
  }, []);
  const pct = shown ? score : 0;
  const col = scoreColor(score);
  const fontSize = isMobile ? 36 : 52;
  const badgeFontSize = isMobile ? 11 : 13;
  
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={R} fill="none" stroke="#eef0f6" strokeWidth="12" />
        <circle
          cx={size/2} cy={size/2} r={R} fill="none" stroke={col} strokeWidth="12" strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - pct / 100)}
          transform={`rotate(-90 ${size/2} ${size/2})`}
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize, fontWeight: 900, lineHeight: 1, color: INK, letterSpacing: "-0.02em" }}>{score}</div>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", color: MUTE, marginTop: 4 }}>OUT OF 100</div>
        <div style={{ marginTop: 6, padding: "2px 10px", borderRadius: 999, background: col, color: "#fff", fontSize: badgeFontSize, fontWeight: 800, letterSpacing: "0.04em" }}>
          GRADE {gradeFor(score)}
        </div>
      </div>
    </div>
  );
}
 
/* ── Pillar card (RESPONSIVE) ─────────────────────────────── */
function PillarCard({ pillar, delay }: { pillar: Pillar; delay: number }) {
  const meta = PILLAR_META[pillar.id] || { name: pillar.id, Icon: Gauge, blurb: "" };
  const Icon = meta.Icon;
  const col = scoreColor(pillar.score);
  const colD = scoreColorDark(pillar.score);
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(pillar.score), 180 + delay);
    return () => clearTimeout(t);
  }, [pillar.score, delay]);
 
  return (
    <div className="lfs-card" style={{ background: "#fff", border: `1px solid ${LINE}`, borderRadius: 16, padding: "16px 14px", minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, minWidth: 0 }}>
        <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: 10, display: "grid", placeItems: "center", background: `${col}1a`, color: colD }}>
          <Icon size={18} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
            <div style={{ fontSize: "clamp(13px, 4vw, 15px)", fontWeight: 800, color: INK }}>{meta.name}</div>
            <div style={{ fontSize: "clamp(18px, 5vw, 22px)", fontWeight: 900, color: colD, lineHeight: 1 }}>{pillar.score}</div>
          </div>
          <div style={{ fontSize: "clamp(11px, 2.5vw, 12px)", color: MUTE, marginTop: 2, lineHeight: 1.3 }}>{meta.blurb}</div>
        </div>
      </div>
 
      <div style={{ height: 7, borderRadius: 999, background: "#eef0f6", marginTop: 12, overflow: "hidden" }}>
        <div style={{ height: "100%", borderRadius: 999, width: `${w}%`, background: `linear-gradient(90deg, ${col}, ${colD})`, transition: "width 1.2s cubic-bezier(0.22,1,0.36,1)" }} />
      </div>
 
      <div style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: 11, padding: "3px 9px", borderRadius: 999, background: `${col}14`, color: colD, fontSize: "clamp(10px, 2.5vw, 11.5px)", fontWeight: 800 }}>
        <StatusIcon st={pillar.status} color={colD} /> {statusLabel(pillar.status)}
      </div>
 
      <ul style={{ listStyle: "none", margin: "10px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
        {(pillar.findings || []).map((f, i) => (
          <li key={i} style={{ display: "flex", gap: 8, fontSize: "clamp(12px, 2.5vw, 13px)", color: BODY, lineHeight: 1.45 }}>
            <span style={{ flexShrink: 0, width: 4, height: 4, borderRadius: 999, background: col, marginTop: 6 }} />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
 
/* ── Loading (RESPONSIVE) ──────────────────────────────────── */
function Loading({ firm }: { firm: string }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep((s) => Math.min(s + 1, LOADING_STEPS.length - 1)), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ padding: "clamp(40px, 10vw, 64px) 16px", textAlign: "center" }}>
      <div style={{ position: "relative", width: "clamp(70px, 20vw, 88px)", height: "clamp(70px, 20vw, 88px)", margin: "0 auto 20px" }}>
        <div className="lfs-spin" style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `3px solid ${LINE}`, borderTopColor: PURPLE }} />
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: PURPLE }}>
          <Scale size={24} />
        </div>
      </div>
      <div style={{ fontSize: "clamp(16px, 5vw, 19px)", fontWeight: 800, color: INK }}>Auditing {firm || "your firm"}…</div>
      <div style={{ marginTop: 10, fontSize: "clamp(13px, 3vw, 14.5px)", color: BODY, minHeight: 22 }} key={step}>
        <span className="lfs-fade">{LOADING_STEPS[step]}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 18, flexWrap: "wrap" }}>
        {LOADING_STEPS.map((_, i) => (
          <span key={i} style={{ width: i === step ? 20 : 6, height: 6, borderRadius: 999, background: i <= step ? PURPLE : "#dfe3ee", transition: "all .4s" }} />
        ))}
      </div>
      <div style={{ marginTop: 20, fontSize: "clamp(11px, 2.5vw, 12.5px)", color: MUTE }}>Running live research — this takes ~20–40 seconds.</div>
    </div>
  );
}
 
/* ── Results (RESPONSIVE) ──────────────────────────────────── */
function Results({ data, form, onReset }: { data: Scorecard; form: FormState; onReset: () => void }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const overall = data.overallScore;
 
  const pillars = PILLAR_ORDER
    .map((id) => (data.pillars || []).find((p) => p.id === id))
    .filter((p): p is Pillar => Boolean(p));
 
  return (
    <div>
      {/* Hero card */}
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${PURPLE_DARK} 100%)`, borderRadius: "clamp(12px, 4vw, 20px)", padding: "clamp(20px, 5vw, 28px)", color: "#fff", position: "relative", overflow: "hidden", marginBottom: "clamp(16px, 4vw, 22px)" }}>
        <div className="lfs-aurora" style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: GREEN, opacity: 0.16, filter: "blur(70px)", top: -100, right: -80 }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "clamp(16px, 4vw, 28px)" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 999, background: "rgba(255,255,255,0.12)", fontSize: "clamp(9px, 2.5vw, 11.5px)", fontWeight: 700, letterSpacing: "0.06em", marginBottom: 12 }}>
              <Sparkles size={12} color={GREEN} /> LAW FIRM SEO SCORECARD
            </div>
            <h2 style={{ margin: "0 0 6px", fontSize: "clamp(20px, 6vw, 26px)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.01em" }}>{data.firmName || form.website}</h2>
            <div style={{ fontSize: "clamp(12px, 3vw, 13.5px)", color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>
              {form.practiceArea} · {form.city}
            </div>
            <p style={{ marginTop: 10, fontSize: "clamp(13px, 3vw, 15px)", lineHeight: 1.5, color: "rgba(255,255,255,0.9)", maxWidth: 480 }}>{data.verdict}</p>
          </div>
          <div style={{ background: "#fff", borderRadius: "clamp(12px, 3vw, 18px)", padding: "clamp(12px, 3vw, 16px)", display: "grid", placeItems: "center", width: "fit-content" }}>
            <RingGauge score={overall} />
          </div>
        </div>
      </div>
 
      {/* 5 Pillars */}
      <div style={{ marginTop: "clamp(18px, 4vw, 22px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "clamp(12px, 3vw, 14px)" }}>
          <Gauge size={18} color={PURPLE} />
          <h3 style={{ margin: 0, fontSize: "clamp(15px, 4vw, 17px)", fontWeight: 800, color: INK }}>The 5 pillars of law firm visibility</h3>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(150px, 40vw, 280px), 1fr))", gap: "clamp(12px, 3vw, 14px)" }}>
          {pillars.map((p, i) => (
            <PillarCard key={p.id} pillar={p} delay={i * 90} />
          ))}
 
          <div style={{ borderRadius: "clamp(12px, 4vw, 16px)", padding: "clamp(16px, 4vw, 20px)", background: `linear-gradient(135deg, ${GREEN}14, ${PURPLE}14)`, border: `1px solid ${LINE}` }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 9px", borderRadius: 999, background: "#fff", color: GREEN_DARK, fontSize: "clamp(10px, 2.5vw, 11.5px)", fontWeight: 800, border: `1px solid ${LINE}` }}>
              <AlertTriangle size={13} /> WHAT THIS COSTS YOU
            </div>
            <p style={{ marginTop: 10, fontSize: "clamp(12px, 3vw, 14px)", lineHeight: 1.55, color: INK, fontWeight: 500 }}>{data.caseImpact}</p>
          </div>
        </div>
      </div>
 
      {/* Top 5 Priorities */}
      <div style={{ marginTop: "clamp(18px, 4vw, 26px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "clamp(12px, 3vw, 14px)" }}>
          <ArrowRight size={18} color={GREEN_DARK} />
          <h3 style={{ margin: 0, fontSize: "clamp(15px, 4vw, 17px)", fontWeight: 800, color: INK }}>Your top 5 priorities, in order</h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(8px, 2vw, 10px)" }}>
          {(data.fixes || []).map((fx) => {
            const pm = PILLAR_META[fx.pillar];
            const impCol = fx.impact === "High" ? RED : fx.impact === "Medium" ? AMBER : GREEN_DARK;
            return (
              <div key={fx.priority} className="lfs-card" style={{ display: "flex", gap: "clamp(10px, 3vw, 14px)", background: "#fff", border: `1px solid ${LINE}`, borderRadius: "clamp(12px, 3vw, 14px)", padding: "clamp(12px, 3vw, 16px)" }}>
                <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 9, background: PURPLE, color: "#fff", display: "grid", placeItems: "center", fontWeight: 900, fontSize: 15 }}>{fx.priority}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(6px, 2vw, 8px)" }}>
                    <span style={{ fontSize: "clamp(13px, 3.5vw, 15px)", fontWeight: 800, color: INK }}>{fx.title}</span>
                    <span style={{ padding: "2px 8px", borderRadius: 999, background: `${impCol}1a`, color: impCol, fontSize: "clamp(9px, 2vw, 10.5px)", fontWeight: 800, letterSpacing: "0.03em" }}>{fx.impact.toUpperCase()} IMPACT</span>
                    {pm && <span style={{ fontSize: "clamp(10px, 2.5vw, 11.5px)", color: MUTE, fontWeight: 600 }}>· {pm.name}</span>}
                  </div>
                  <p style={{ margin: "5px 0 0", fontSize: "clamp(12px, 3vw, 13.5px)", color: BODY, lineHeight: 1.5 }}>{fx.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
 
      {/* CTA Section */}
      <div style={{ marginTop: "clamp(18px, 4vw, 26px)", background: NAVY, borderRadius: "clamp(12px, 4vw, 20px)", padding: "clamp(20px, 5vw, 28px)", color: "#fff", position: "relative", overflow: "hidden" }}>
        <div className="lfs-aurora" style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: PURPLE_LT, opacity: 0.22, filter: "blur(70px)", bottom: -130, left: -60 }} />
        <div style={{ position: "relative", maxWidth: 540 }}>
          <h3 style={{ margin: 0, fontSize: "clamp(18px, 5vw, 21px)", fontWeight: 900, lineHeight: 1.2 }}>Want the full report — and a plan to fix it?</h3>
          <p style={{ marginTop: 10, fontSize: "clamp(13px, 3vw, 14.5px)", lineHeight: 1.55, color: "rgba(255,255,255,0.82)" }}>
            We&apos;ll send the complete PDF breakdown with competitor comparisons, then walk you through the 90-day roadmap on a free call.
          </p>
 
          {sent ? (
            <div style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 11, background: "rgba(62,180,137,0.18)", border: `1px solid ${GREEN}`, fontSize: "clamp(12px, 3vw, 14px)", fontWeight: 700, flexWrap: "wrap" }}>
              <CheckCircle2 size={16} color={GREEN} /> Done — your report is on its way to {email}.
            </div>
          ) : (
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: "clamp(10px, 3vw, 12px)", width: "100%" }}>
              <div style={{ position: "relative", display: "flex", gap: "clamp(8px, 2vw, 10px)", flexWrap: "wrap" }}>
                <div style={{ position: "relative", flex: "1 1 clamp(200px, 100%, 280px)", minWidth: 0 }}>
                  <Mail size={16} color={MUTE} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                  <input
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@yourfirm.com"
                    style={{ width: "100%", boxSizing: "border-box", padding: "11px 12px 11px 38px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: "clamp(13px, 3vw, 14.5px)", outline: "none" }}
                  />
                </div>
                <button
                  className="lfs-btn"
                  onClick={() => { if (email.includes("@")) setSent(true); }}
                  style={{ flexShrink: 0, padding: "11px 18px", borderRadius: 10, border: "none", cursor: "pointer", background: GREEN, color: "#fff", fontSize: "clamp(12px, 3vw, 14.5px)", fontWeight: 800, display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}
                >
                  Email report <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}
 
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: "clamp(8px, 2vw, 12px)" }}>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="lfs-link" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#fff", fontWeight: 800, fontSize: "clamp(12px, 3vw, 14.5px)", textDecoration: "none", width: "fit-content" }}>
              Or book a free strategy call <ArrowRight size={14} />
            </a>
            <span style={{ fontSize: "clamp(11px, 2.5vw, 12.5px)", color: "rgba(255,255,255,0.6)" }}>No obligation · Reply in 24 hrs</span>
          </div>
        </div>
      </div>
 
      {/* Footer buttons */}
      <div style={{ marginTop: "clamp(14px, 3vw, 18px)", display: "flex", flexDirection: "column", gap: "clamp(10px, 3vw, 14px)", alignItems: "flex-start" }}>
        <button className="lfs-reset" onClick={onReset} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 14px", borderRadius: 10, border: `1px solid ${LINE}`, background: "#fff", color: INK, fontSize: "clamp(12px, 3vw, 13.5px)", fontWeight: 700, cursor: "pointer" }}>
          <RefreshCw size={14} /> Audit another firm
        </button>
        <span style={{ fontSize: "clamp(10px, 2.5vw, 11.5px)", color: MUTE, maxWidth: 420, lineHeight: 1.4 }}>
          AI-assisted assessment from live web research. Full SearchPrex audits add enterprise SERP, Map Pack &amp; backlink data for exact positions.
        </span>
      </div>
    </div>
  );
}
 
/* ── Input (RESPONSIVE) ───────────────────────────────────── */
const inputStyle: React.CSSProperties = {
  width: "100%", boxSizing: "border-box", padding: "11px 12px", borderRadius: 10,
  border: `1px solid ${LINE}`, background: "#fff", color: INK, fontSize: "clamp(13px, 3vw, 15px)", outline: "none",
};
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "block", flex: 1 }}>
      <span style={{ display: "block", fontSize: "clamp(11px, 2.5vw, 12.5px)", fontWeight: 700, color: INK, marginBottom: 6 }}>{label}</span>
      {children}
    </label>
  );
}
 
function InputForm({
  form, setForm, onRun, onSample, error,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  onRun: () => void;
  onSample: () => void;
  error: string;
}) {
  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));
  const ready = form.website.trim() && form.city.trim() && form.practiceArea.trim();
  return (
    <div>
      <div style={{ textAlign: "center", padding: "clamp(8px, 3vw, 10px) 8px clamp(18px, 4vw, 26px)" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 999, background: "#fff", border: `1px solid ${LINE}`, fontSize: "clamp(10px, 2.5vw, 12px)", fontWeight: 700, color: PURPLE }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: GREEN }} /> Free · Founder-built · 2026-ready
        </div>
        <h1 style={{ margin: "14px 0 0", fontSize: "clamp(22px, 6vw, 34px)", fontWeight: 900, lineHeight: 1.12, letterSpacing: "-0.02em", color: INK }}>
          Will Google <span style={{ color: PURPLE }}>and AI</span><br />recommend your law firm?
        </h1>
        <p style={{ margin: "10px auto 0", maxWidth: 520, fontSize: "clamp(13px, 3.5vw, 16px)", lineHeight: 1.55, color: BODY }}>
          Grade your firm across the 5 things that decide who wins legal clients today — Map Pack, organic, AI answers, legal E-E-A-T, and content.
        </p>
      </div>
 
      <div style={{ background: "#fff", border: `1px solid ${LINE}`, borderRadius: "clamp(12px, 4vw, 20px)", padding: "clamp(16px, 4vw, 24px)", boxShadow: "0 18px 48px -28px rgba(60,52,137,0.4)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(12px, 3vw, 16px)" }}>
          <Field label="Law firm website">
            <input className="lfs-input" value={form.website} onChange={set("website")} placeholder="yourfirm.com" style={inputStyle} />
          </Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(12px, 3vw, 16px)" }}>
            <Field label="City / market">
              <input className="lfs-input" value={form.city} onChange={set("city")} placeholder="Chicago, IL" style={inputStyle} />
            </Field>
            <Field label="Primary practice area">
              <select className="lfs-input" value={form.practiceArea} onChange={set("practiceArea")} style={{ ...inputStyle, appearance: "none", background: "#fff" }}>
                <option value="">Select…</option>
                {PRACTICE_AREAS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </Field>
          </div>
 
          {error && (
            <div style={{ display: "flex", gap: 8, padding: "10px 12px", borderRadius: 10, background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", fontSize: "clamp(12px, 3vw, 13.5px)", lineHeight: 1.45 }}>
              <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
              <span>{error}{" "}
                <button onClick={onSample} style={{ background: "none", border: "none", color: "#b91c1c", fontWeight: 800, textDecoration: "underline", cursor: "pointer", padding: 0 }}>View sample →</button>
              </span>
            </div>
          )}
 
          <button
            className="lfs-btn lfs-btn-lg"
            disabled={!ready}
            onClick={onRun}
            style={{ marginTop: 4, padding: "clamp(12px, 3vw, 16px) clamp(16px, 4vw, 22px)", borderRadius: 12, border: "none", cursor: ready ? "pointer" : "not-allowed", opacity: ready ? 1 : 0.5, background: `linear-gradient(135deg, ${PURPLE}, ${GREEN})`, color: "#fff", fontSize: "clamp(13px, 3vw, 16px)", fontWeight: 800, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", minHeight: "44px" }}
          >
            <Sparkles size={16} /> Score my firm
          </button>
 
          <button onClick={onSample} className="lfs-ghost" style={{ background: "none", border: "none", color: BODY, fontSize: "clamp(12px, 3vw, 13.5px)", fontWeight: 600, cursor: "pointer", textDecoration: "underline", padding: "8px 0" }}>
            Just show me a sample scorecard
          </button>
        </div>
      </div>
 
      <div style={{ marginTop: "clamp(12px, 3vw, 16px)", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "clamp(12px, 3vw, 18px)" }}>
        {PILLAR_ORDER.map((id) => {
          const meta = PILLAR_META[id];
          const Icon = meta.Icon;
          return (
            <div key={id} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "clamp(10px, 2.5vw, 12.5px)", color: BODY, fontWeight: 600 }}>
              <Icon size={14} color={PURPLE} /> {meta.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
 
/* ── Root (RESPONSIVE) ────────────────────────────────────── */
export default function ScorecardClient() {
  const [stage, setStage] = useState<"input" | "loading" | "results">("input");
  const [form, setForm] = useState<FormState>({ website: "", city: "", practiceArea: "" });
  const [data, setData] = useState<Scorecard | null>(null);
  const [error, setError] = useState("");
  const lastForm = useRef<FormState>(form);
 
  async function runAudit() {
    setError("");
    lastForm.current = { ...form };
    setStage("loading");
    try {
      const res = await fetch("/api/scorecard", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("api");
      const parsed = (await res.json()) as Scorecard;
      if (!parsed || !Array.isArray(parsed.pillars)) throw new Error("parse");
      setData(parsed);
      setStage("results");
    } catch {
      setStage("input");
      setError("We couldn't complete the live audit just now — the research service may be busy.");
    }
  }
 
  function showSample() {
    setError("");
    lastForm.current = { website: "sterlinghayeslaw.com", city: SAMPLE.city, practiceArea: SAMPLE.practiceArea };
    setData(SAMPLE);
    setStage("results");
  }
 
  function reset() {
    setData(null);
    setError("");
    setStage("input");
  }
 
  return (
    <div style={{ background: BG, minHeight: "100dvh", padding: "clamp(18px, 5vw, 28px) 16px clamp(28px, 7vw, 40px)", fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif" }}>
      <style>{`
        @keyframes lfsSpin { to { transform: rotate(360deg); } }
        @keyframes lfsFade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
        @keyframes lfsDrift { from { transform: translate(0,0) scale(1); } to { transform: translate(18px,14px) scale(1.12); } }
        .lfs-spin { animation: lfsSpin 1s linear infinite; }
        .lfs-fade { display:inline-block; animation: lfsFade .4s ease both; }
        .lfs-aurora { animation: lfsDrift 9s ease-in-out infinite alternate; }
        .lfs-card { transition: transform .2s ease, box-shadow .2s ease; }
        .lfs-card:hover { transform: translateY(-3px); box-shadow: 0 16px 36px -22px rgba(60,52,137,0.45); }
        .lfs-btn { transition: transform .15s ease, filter .15s ease; }
        .lfs-btn:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(1.05); }
        .lfs-input:focus { border-color: ${PURPLE} !important; box-shadow: 0 0 0 3px ${PURPLE}22; }
        .lfs-link:hover, .lfs-ghost:hover, .lfs-reset:hover { opacity: .85; }
        @media (max-width: 640px) {
          .lfs-grid { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) { 
          .lfs-aurora, .lfs-spin { animation: none; } 
        }
      `}</style>
 
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "clamp(16px, 4vw, 22px)", flexWrap: "wrap", gap: "clamp(12px, 3vw, 16px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(6px, 2vw, 9px)", fontWeight: 900, fontSize: "clamp(14px, 4vw, 18px)", letterSpacing: "-0.01em" }}>
            <span style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg, ${PURPLE}, ${GREEN})`, display: "grid", placeItems: "center", color: "#fff" }}>
              <Scale size={15} />
            </span>
            <span style={{ color: INK }}>Search<span style={{ color: PURPLE }}>Prex</span></span>
          </div>
          <span style={{ fontSize: "clamp(10px, 2.5vw, 12px)", fontWeight: 700, color: MUTE, letterSpacing: "0.04em" }}>LAW FIRM SEO SCORECARD</span>
        </div>
 
        {stage === "input" && <InputForm form={form} setForm={setForm} onRun={runAudit} onSample={showSample} error={error} />}
        {stage === "loading" && <Loading firm={form.website} />}
        {stage === "results" && data && <Results data={data} form={lastForm.current} onReset={reset} />}
      </div>
    </div>
  );
}
 