"use client";
 
import { useState, useEffect, useRef } from "react";
import {
  Scale, Search, Bot, MapPin, FileText, ArrowRight,
  CheckCircle2, AlertTriangle, XCircle, Sparkles, Gauge, RefreshCw, Mail,
  type LucideIcon,
} from "lucide-react";
 
/* ────────────────────────────────────────────────────────────
   SearchPrex — Law Firm SEO Scorecard (client)
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
 
/* ── Ring gauge ──────────────────────────────────────────── */
function RingGauge({ score }: { score: number }) {
  const R = 84;
  const C = 2 * Math.PI * R;
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), 120);
    return () => clearTimeout(t);
  }, []);
  const pct = shown ? score : 0;
  const col = scoreColor(score);
  return (
    <div style={{ position: "relative", width: 200, height: 200 }}>
      <svg width="200" height="200" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r={R} fill="none" stroke="#eef0f6" strokeWidth="14" />
        <circle
          cx="100" cy="100" r={R} fill="none" stroke={col} strokeWidth="14" strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - pct / 100)}
          transform="rotate(-90 100 100)"
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 52, fontWeight: 900, lineHeight: 1, color: INK, letterSpacing: "-0.02em" }}>{score}</div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: MUTE, marginTop: 2 }}>OUT OF 100</div>
        <div style={{ marginTop: 8, padding: "2px 12px", borderRadius: 999, background: col, color: "#fff", fontSize: 13, fontWeight: 800, letterSpacing: "0.04em" }}>
          GRADE {gradeFor(score)}
        </div>
      </div>
    </div>
  );
}
 
/* ── Pillar card ─────────────────────────────────────────── */
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
    <div className="lfs-card" style={{ background: "#fff", border: `1px solid ${LINE}`, borderRadius: 16, padding: 18 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{ flexShrink: 0, width: 42, height: 42, borderRadius: 11, display: "grid", placeItems: "center", background: `${col}1a`, color: colD }}>
          <Icon size={20} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: INK }}>{meta.name}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: colD, lineHeight: 1 }}>{pillar.score}</div>
          </div>
          <div style={{ fontSize: 12, color: MUTE, marginTop: 1 }}>{meta.blurb}</div>
        </div>
      </div>
 
      <div style={{ height: 8, borderRadius: 999, background: "#eef0f6", marginTop: 14, overflow: "hidden" }}>
        <div style={{ height: "100%", borderRadius: 999, width: `${w}%`, background: `linear-gradient(90deg, ${col}, ${colD})`, transition: "width 1.2s cubic-bezier(0.22,1,0.36,1)" }} />
      </div>
 
      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12, padding: "3px 10px", borderRadius: 999, background: `${col}14`, color: colD, fontSize: 11.5, fontWeight: 800 }}>
        <StatusIcon st={pillar.status} color={colD} /> {statusLabel(pillar.status)}
      </div>
 
      <ul style={{ listStyle: "none", margin: "12px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 7 }}>
        {(pillar.findings || []).map((f, i) => (
          <li key={i} style={{ display: "flex", gap: 8, fontSize: 13, color: BODY, lineHeight: 1.45 }}>
            <span style={{ flexShrink: 0, width: 5, height: 5, borderRadius: 999, background: col, marginTop: 7 }} />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
 
/* ── Loading ─────────────────────────────────────────────── */
function Loading({ firm }: { firm: string }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep((s) => Math.min(s + 1, LOADING_STEPS.length - 1)), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ padding: "64px 24px", textAlign: "center" }}>
      <div style={{ position: "relative", width: 88, height: 88, margin: "0 auto 26px" }}>
        <div className="lfs-spin" style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `3px solid ${LINE}`, borderTopColor: PURPLE }} />
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: PURPLE }}>
          <Scale size={30} />
        </div>
      </div>
      <div style={{ fontSize: 19, fontWeight: 800, color: INK }}>Auditing {firm || "your firm"}…</div>
      <div style={{ marginTop: 10, fontSize: 14.5, color: BODY, minHeight: 22 }} key={step}>
        <span className="lfs-fade">{LOADING_STEPS[step]}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 22 }}>
        {LOADING_STEPS.map((_, i) => (
          <span key={i} style={{ width: i === step ? 22 : 6, height: 6, borderRadius: 999, background: i <= step ? PURPLE : "#dfe3ee", transition: "all .4s" }} />
        ))}
      </div>
      <div style={{ marginTop: 26, fontSize: 12.5, color: MUTE }}>Running live research — this takes ~20–40 seconds.</div>
    </div>
  );
}
 
/* ── Results ─────────────────────────────────────────────── */
function Results({ data, form, onReset }: { data: Scorecard; form: FormState; onReset: () => void }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const overall = data.overallScore;
 
  const pillars = PILLAR_ORDER
    .map((id) => (data.pillars || []).find((p) => p.id === id))
    .filter((p): p is Pillar => Boolean(p));
 
  return (
    <div>
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${PURPLE_DARK} 100%)`, borderRadius: 20, padding: "28px 26px", color: "#fff", position: "relative", overflow: "hidden" }}>
        <div className="lfs-aurora" style={{ position: "absolute", width: 320, height: 320, borderRadius: "50%", background: GREEN, opacity: 0.16, filter: "blur(70px)", top: -120, right: -80 }} />
        <div style={{ position: "relative", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 28, justifyContent: "space-between" }}>
          <div style={{ flex: "1 1 280px", minWidth: 0 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 12px", borderRadius: 999, background: "rgba(255,255,255,0.12)", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.06em" }}>
              <Sparkles size={13} color={GREEN} /> LAW FIRM SEO SCORECARD
            </div>
            <h2 style={{ margin: "14px 0 4px", fontSize: 26, fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.01em" }}>{data.firmName || form.website}</h2>
            <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
              {form.practiceArea} · {form.city}
            </div>
            <p style={{ marginTop: 14, fontSize: 15, lineHeight: 1.5, color: "rgba(255,255,255,0.9)", maxWidth: 460 }}>{data.verdict}</p>
          </div>
          <div style={{ flexShrink: 0, background: "#fff", borderRadius: 18, padding: 16, display: "grid", placeItems: "center" }}>
            <RingGauge score={overall} />
          </div>
        </div>
      </div>
 
      <div style={{ marginTop: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <Gauge size={18} color={PURPLE} />
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: INK }}>The 5 pillars of law firm visibility</h3>
        </div>
        <div className="lfs-grid">
          {pillars.map((p, i) => (
            <PillarCard key={p.id} pillar={p} delay={i * 90} />
          ))}
 
          <div style={{ borderRadius: 16, padding: 20, background: `linear-gradient(135deg, ${GREEN}14, ${PURPLE}14)`, border: `1px solid ${LINE}` }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "3px 10px", borderRadius: 999, background: "#fff", color: GREEN_DARK, fontSize: 11.5, fontWeight: 800, border: `1px solid ${LINE}` }}>
              <AlertTriangle size={13} /> WHAT THIS COSTS YOU
            </div>
            <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.55, color: INK, fontWeight: 500 }}>{data.caseImpact}</p>
          </div>
        </div>
      </div>
 
      <div style={{ marginTop: 26 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <ArrowRight size={18} color={GREEN_DARK} />
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: INK }}>Your top 5 priorities, in order</h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {(data.fixes || []).map((fx) => {
            const pm = PILLAR_META[fx.pillar];
            const impCol = fx.impact === "High" ? RED : fx.impact === "Medium" ? AMBER : GREEN_DARK;
            return (
              <div key={fx.priority} className="lfs-card" style={{ display: "flex", gap: 14, background: "#fff", border: `1px solid ${LINE}`, borderRadius: 14, padding: 16 }}>
                <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 9, background: PURPLE, color: "#fff", display: "grid", placeItems: "center", fontWeight: 900, fontSize: 15 }}>{fx.priority}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 15, fontWeight: 800, color: INK }}>{fx.title}</span>
                    <span style={{ padding: "2px 8px", borderRadius: 999, background: `${impCol}1a`, color: impCol, fontSize: 10.5, fontWeight: 800, letterSpacing: "0.03em" }}>{fx.impact.toUpperCase()} IMPACT</span>
                    {pm && <span style={{ fontSize: 11.5, color: MUTE, fontWeight: 600 }}>· {pm.name}</span>}
                  </div>
                  <p style={{ margin: "5px 0 0", fontSize: 13.5, color: BODY, lineHeight: 1.5 }}>{fx.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
 
      <div style={{ marginTop: 26, background: NAVY, borderRadius: 20, padding: "28px 26px", color: "#fff", position: "relative", overflow: "hidden" }}>
        <div className="lfs-aurora" style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: PURPLE_LT, opacity: 0.22, filter: "blur(70px)", bottom: -130, left: -60 }} />
        <div style={{ position: "relative", maxWidth: 540 }}>
          <h3 style={{ margin: 0, fontSize: 21, fontWeight: 900, lineHeight: 1.2 }}>Want the full report — and a plan to fix it?</h3>
          <p style={{ marginTop: 10, fontSize: 14.5, lineHeight: 1.55, color: "rgba(255,255,255,0.82)" }}>
            We&apos;ll send the complete PDF breakdown with competitor comparisons, then walk you through the 90-day roadmap on a free call.
          </p>
 
          {sent ? (
            <div style={{ marginTop: 18, display: "inline-flex", alignItems: "center", gap: 9, padding: "12px 16px", borderRadius: 12, background: "rgba(62,180,137,0.18)", border: `1px solid ${GREEN}`, fontSize: 14, fontWeight: 700 }}>
              <CheckCircle2 size={18} color={GREEN} /> Done — your report is on its way to {email}.
            </div>
          ) : (
            <div style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 10 }}>
              <div style={{ position: "relative", flex: "1 1 240px" }}>
                <Mail size={16} color={MUTE} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@yourfirm.com"
                  style={{ width: "100%", boxSizing: "border-box", padding: "13px 14px 13px 40px", borderRadius: 11, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 14.5, outline: "none" }}
                />
              </div>
              <button
                className="lfs-btn"
                onClick={() => { if (email.includes("@")) setSent(true); }}
                style={{ flexShrink: 0, padding: "13px 22px", borderRadius: 11, border: "none", cursor: "pointer", background: GREEN, color: "#fff", fontSize: 14.5, fontWeight: 800, display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                Email me the report <ArrowRight size={16} />
              </button>
            </div>
          )}
 
          <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center" }}>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="lfs-link" style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "#fff", fontWeight: 800, fontSize: 14.5, textDecoration: "none" }}>
              Or book a free strategy call <ArrowRight size={15} />
            </a>
            <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.6)" }}>No obligation · Reply in 24 hrs</span>
          </div>
        </div>
      </div>
 
      <div style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
        <button className="lfs-reset" onClick={onReset} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 10, border: `1px solid ${LINE}`, background: "#fff", color: INK, fontSize: 13.5, fontWeight: 700, cursor: "pointer" }}>
          <RefreshCw size={15} /> Audit another firm
        </button>
        <span style={{ fontSize: 11.5, color: MUTE, maxWidth: 420, lineHeight: 1.4 }}>
          AI-assisted assessment from live web research. Full SearchPrex audits add enterprise SERP, Map Pack &amp; backlink data for exact positions.
        </span>
      </div>
    </div>
  );
}
 
/* ── Input ───────────────────────────────────────────────── */
const inputStyle: React.CSSProperties = {
  width: "100%", boxSizing: "border-box", padding: "13px 14px", borderRadius: 11,
  border: `1px solid ${LINE}`, background: "#fff", color: INK, fontSize: 15, outline: "none",
};
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "block", flex: 1 }}>
      <span style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: INK, marginBottom: 7 }}>{label}</span>
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
      <div style={{ textAlign: "center", padding: "10px 8px 26px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", borderRadius: 999, background: "#fff", border: `1px solid ${LINE}`, fontSize: 12, fontWeight: 700, color: PURPLE }}>
          <span style={{ width: 7, height: 7, borderRadius: 999, background: GREEN }} /> Free · Founder-built · 2026-ready
        </div>
        <h1 style={{ margin: "18px 0 0", fontSize: 34, fontWeight: 900, lineHeight: 1.12, letterSpacing: "-0.02em", color: INK }}>
          Will Google <span style={{ color: PURPLE }}>and AI</span><br />recommend your law firm?
        </h1>
        <p style={{ margin: "14px auto 0", maxWidth: 520, fontSize: 16, lineHeight: 1.55, color: BODY }}>
          Grade your firm across the 5 things that decide who wins legal clients today — Map Pack, organic, AI answers, legal E-E-A-T, and content. Live research, real fixes.
        </p>
      </div>
 
      <div style={{ background: "#fff", border: `1px solid ${LINE}`, borderRadius: 20, padding: 24, boxShadow: "0 18px 48px -28px rgba(60,52,137,0.4)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Field label="Law firm website">
            <input className="lfs-input" value={form.website} onChange={set("website")} placeholder="yourfirm.com" style={inputStyle} />
          </Field>
          <div className="lfs-row">
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
            <div style={{ display: "flex", gap: 9, padding: "12px 14px", borderRadius: 11, background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", fontSize: 13.5, lineHeight: 1.45 }}>
              <AlertTriangle size={17} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>{error}{" "}
                <button onClick={onSample} style={{ background: "none", border: "none", color: "#b91c1c", fontWeight: 800, textDecoration: "underline", cursor: "pointer", padding: 0 }}>View a sample report instead →</button>
              </span>
            </div>
          )}
 
          <button
            className="lfs-btn lfs-btn-lg"
            disabled={!ready}
            onClick={onRun}
            style={{ marginTop: 4, padding: "16px 22px", borderRadius: 13, border: "none", cursor: ready ? "pointer" : "not-allowed", opacity: ready ? 1 : 0.5, background: `linear-gradient(135deg, ${PURPLE}, ${GREEN})`, color: "#fff", fontSize: 16, fontWeight: 800, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9 }}
          >
            <Sparkles size={18} /> Score my firm
          </button>
 
          <button onClick={onSample} className="lfs-ghost" style={{ background: "none", border: "none", color: BODY, fontSize: 13.5, fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}>
            Just show me a sample scorecard
          </button>
        </div>
      </div>
 
      <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 18 }}>
        {PILLAR_ORDER.map((id) => {
          const meta = PILLAR_META[id];
          const Icon = meta.Icon;
          return (
            <div key={id} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12.5, color: BODY, fontWeight: 600 }}>
              <Icon size={15} color={PURPLE} /> {meta.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
 
/* ── Root ────────────────────────────────────────────────── */
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
    <div style={{ background: BG, minHeight: "100%", padding: "28px 16px 40px", fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif" }}>
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
        .lfs-grid { display:grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .lfs-row { display:flex; gap:16px; }
        @media (max-width: 760px) { .lfs-grid { grid-template-columns: 1fr; } .lfs-row { flex-direction: column; } }
        @media (prefers-reduced-motion: reduce) { .lfs-aurora, .lfs-spin { animation: none; } }
      `}</style>
 
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, fontWeight: 900, fontSize: 18, letterSpacing: "-0.01em" }}>
            <span style={{ width: 30, height: 30, borderRadius: 9, background: `linear-gradient(135deg, ${PURPLE}, ${GREEN})`, display: "grid", placeItems: "center", color: "#fff" }}>
              <Scale size={17} />
            </span>
            <span style={{ color: INK }}>Search<span style={{ color: PURPLE }}>Prex</span></span>
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: MUTE, letterSpacing: "0.04em" }}>LAW FIRM SEO SCORECARD</span>
        </div>
 
        {stage === "input" && <InputForm form={form} setForm={setForm} onRun={runAudit} onSample={showSample} error={error} />}
        {stage === "loading" && <Loading firm={form.website} />}
        {stage === "results" && data && <Results data={data} form={lastForm.current} onReset={reset} />}
      </div>
    </div>
  );
}
