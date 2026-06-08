"use client";
 
import { useState } from "react";
 
// ── Brand ────────────────────────────────────────────────────────────────────
const NAVY   = "#0a0f2e";
const PURPLE = "#534AB7";
const GREEN  = "#2f9670";
const MUTED  = "#6b7090";
const LINE   = "#e7e9f1";
const SOFT   = "#f7f8fb";
const FONT   = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";
 
// ── Step data ────────────────────────────────────────────────────────────────
const PRACTICE_AREAS = [
  "Personal Injury",
  "Family Law",
  "Criminal Defense",
  "Workers Compensation",
  "Employment Law",
  "Immigration Law",
  "Estate Planning",
  "Other",
];
 
const REVENUE_OPTIONS = [
  "Less than $500K",
  "$500K – $1M",
  "$1M – $2M",
  "$2M – $5M",
  "$5M – $10M",
  "More than $10M",
];
 
const HELP_OPTIONS = [
  { label: "Law Firm SEO",     icon: "🔍" },
  { label: "Family Law SEO",   icon: "⚖️" },
  { label: "Google Maps Pack", icon: "📍" },
  { label: "Technical Audit",  icon: "🛠️" },
  { label: "GBP Optimization", icon: "🗺️" },
  { label: "AI / LLM Ranking", icon: "🤖" },
];
 
// ── Step progress bar ─────────────────────────────────────────────────────────
function StepBar({ step, total }: { step: number; total: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 28 }}>
      {Array.from({ length: total }).map((_, i) => {
        const done    = i < step - 1;
        const current = i === step - 1;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: i < total - 1 ? 1 : "none" }}>
            {/* Circle */}
            <div style={{
              width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 800,
              background: done ? GREEN : current ? NAVY : "#fff",
              border: `2px solid ${done ? GREEN : current ? NAVY : LINE}`,
              color: done || current ? "#fff" : MUTED,
              transition: "all 0.3s ease",
            }}>
              {done ? "✓" : i + 1}
            </div>
            {/* Connector line */}
            {i < total - 1 && (
              <div style={{
                flex: 1, height: 2, margin: "0 4px",
                background: done ? GREEN : LINE,
                transition: "background 0.4s ease",
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}
 
// ── Multi-select chips ────────────────────────────────────────────────────────
function Chips({
  options,
  selected,
  onToggle,
  icon,
}: {
  options: string[] | { label: string; icon: string }[];
  selected: string[];
  onToggle: (v: string) => void;
  icon?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
      {options.map((opt) => {
        const label  = typeof opt === "string" ? opt : opt.label;
        const ico    = typeof opt === "string" ? null : opt.icon;
        const active = selected.includes(label);
        return (
          <button
            key={label}
            type="button"
            onClick={() => onToggle(label)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "10px 18px",
              borderRadius: 10,
              border: `2px solid ${active ? NAVY : LINE}`,
              background: active ? NAVY : "#fff",
              color: active ? "#fff" : NAVY,
              fontSize: 13.5, fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
              fontFamily: FONT,
            }}
          >
            {ico && <span style={{ fontSize: 15 }}>{ico}</span>}
            {label}
          </button>
        );
      })}
    </div>
  );
}
 
// ── Revenue grid ──────────────────────────────────────────────────────────────
function RevenueGrid({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
      {REVENUE_OPTIONS.map((opt) => {
        const active = selected === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onSelect(opt)}
            style={{
              padding: "14px 16px",
              borderRadius: 10,
              border: `2px solid ${active ? NAVY : LINE}`,
              background: active ? NAVY : "#fff",
              color: active ? "#fff" : NAVY,
              fontSize: 14, fontWeight: 600,
              cursor: "pointer",
              textAlign: "center",
              transition: "all 0.2s ease",
              fontFamily: FONT,
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
 
// ── Main component ────────────────────────────────────────────────────────────
export default function LeadsCollectionForm() {
  const [step,      setStep]      = useState(1);
  const [practices, setPractices] = useState<string[]>([]);
  const [revenue,   setRevenue]   = useState("");
  const [services,  setServices]  = useState<string[]>([]);
  const [contact,   setContact]   = useState({ name: "", firm: "", email: "", phone: "", city: "" });
  const [loading,   setLoading]   = useState(false);
  const [done,      setDone]      = useState(false);
 
  const togglePractice = (v: string) =>
    setPractices((p) => p.includes(v) ? p.filter((x) => x !== v) : [...p, v]);
 
  const toggleService = (v: string) =>
    setServices((s) => s.includes(v) ? s.filter((x) => x !== v) : [...s, v]);
 
  const next = () => setStep((s) => Math.min(s + 1, 4));
 
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setDone(true);
  };
 
  const canNext1 = practices.length > 0;
  const canNext2 = revenue !== "";
  const canNext3 = services.length > 0;
 
  // ── Success ────────────────────────────────────────────────────────────────
  if (done) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px", fontFamily: FONT }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: `${GREEN}18`,
          border: `2px solid ${GREEN}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px", fontSize: 28,
        }}>✓</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: NAVY, marginBottom: 8 }}>
          We got it — thank you!
        </div>
        <p style={{ fontSize: 14.5, color: MUTED, maxWidth: 420, margin: "0 auto 20px", lineHeight: 1.65 }}>
          Mubashar will review your submission personally and reply within 24 hours with a free 15-point audit of your Wichita firm.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          {[["⚡", "Reply in 24 hrs"], ["👤", "Reviewed by Mubashar"], ["📊", "Free 15-point audit"]].map(([icon, label]) => (
            <div key={label as string} style={{
              display: "flex", alignItems: "center", gap: 6,
              background: SOFT, border: `1px solid ${LINE}`,
              borderRadius: 8, padding: "7px 12px",
              fontSize: 12.5, fontWeight: 600, color: NAVY,
            }}>
              <span>{icon}</span>{label}
            </div>
          ))}
        </div>
      </div>
    );
  }
 
  return (
    <div style={{ fontFamily: FONT }}>
      {/* Progress */}
      <StepBar step={step} total={4} />
 
      {/* ── STEP 1 ── */}
      {step === 1 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: PURPLE, letterSpacing: ".5px", marginBottom: 6 }}>
            STEP 1 OF 4
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY, margin: "0 0 6px" }}>
            What type of law do you practice?
          </h3>
          <p style={{ fontSize: 13.5, color: MUTED, margin: "0 0 20px" }}>Select all that apply</p>
          <Chips options={PRACTICE_AREAS} selected={practices} onToggle={togglePractice} />
          <button
            onClick={next}
            disabled={!canNext1}
            style={{
              marginTop: 24, padding: "13px 32px",
              background: canNext1 ? NAVY : "#cbd5e1",
              color: "#fff", border: "none", borderRadius: 10,
              fontSize: 14.5, fontWeight: 700, cursor: canNext1 ? "pointer" : "not-allowed",
              fontFamily: FONT, transition: "background 0.2s ease",
            }}
          >
            Next →
          </button>
        </div>
      )}
 
      {/* ── STEP 2 ── */}
      {step === 2 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: PURPLE, letterSpacing: ".5px", marginBottom: 6 }}>
            STEP 2 OF 4
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY, margin: "0 0 6px" }}>
            Firm Revenue
          </h3>
          <p style={{ fontSize: 13.5, color: MUTED, margin: "0 0 20px" }}>
            Select the option that most accurately fits your firm
          </p>
          <RevenueGrid selected={revenue} onSelect={setRevenue} />
          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            <button
              onClick={() => setStep(1)}
              style={{
                padding: "13px 24px", background: "#fff",
                border: `2px solid ${LINE}`, borderRadius: 10,
                fontSize: 14, fontWeight: 600, cursor: "pointer",
                color: MUTED, fontFamily: FONT,
              }}
            >
              ← Back
            </button>
            <button
              onClick={next}
              disabled={!canNext2}
              style={{
                padding: "13px 32px",
                background: canNext2 ? NAVY : "#cbd5e1",
                color: "#fff", border: "none", borderRadius: 10,
                fontSize: 14.5, fontWeight: 700, cursor: canNext2 ? "pointer" : "not-allowed",
                fontFamily: FONT, transition: "background 0.2s ease",
              }}
            >
              Almost there →
            </button>
          </div>
        </div>
      )}
 
      {/* ── STEP 3 ── */}
      {step === 3 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: PURPLE, letterSpacing: ".5px", marginBottom: 6 }}>
            STEP 3 OF 4
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY, margin: "0 0 6px" }}>
            How can we help you?
          </h3>
          <p style={{ fontSize: 13.5, color: MUTED, margin: "0 0 20px" }}>Select all that apply</p>
          <Chips options={HELP_OPTIONS} selected={services} onToggle={toggleService} icon />
          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            <button
              onClick={() => setStep(2)}
              style={{
                padding: "13px 24px", background: "#fff",
                border: `2px solid ${LINE}`, borderRadius: 10,
                fontSize: 14, fontWeight: 600, cursor: "pointer",
                color: MUTED, fontFamily: FONT,
              }}
            >
              ← Back
            </button>
            <button
              onClick={next}
              disabled={!canNext3}
              style={{
                padding: "13px 32px",
                background: canNext3 ? NAVY : "#cbd5e1",
                color: "#fff", border: "none", borderRadius: 10,
                fontSize: 14.5, fontWeight: 700, cursor: canNext3 ? "pointer" : "not-allowed",
                fontFamily: FONT, transition: "background 0.2s ease",
              }}
            >
              Last step →
            </button>
          </div>
        </div>
      )}
 
      {/* ── STEP 4 ── */}
      {step === 4 && (
        <form onSubmit={submit}>
          <div style={{ fontSize: 11, fontWeight: 700, color: GREEN, letterSpacing: ".5px", marginBottom: 6 }}>
            STEP 4 OF 4 — ALMOST THERE
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY, margin: "0 0 6px" }}>
            Where should we send your free audit?
          </h3>
          <p style={{ fontSize: 13.5, color: MUTED, margin: "0 0 20px" }}>
            Mubashar reviews every submission personally — reply in 24 hrs
          </p>
 
          {/* Summary pills */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20, padding: "12px 14px", background: SOFT, borderRadius: 10, border: `1px solid ${LINE}` }}>
            {practices.slice(0, 3).map((p) => (
              <span key={p} style={{ fontSize: 11, fontWeight: 700, color: PURPLE, background: `${PURPLE}12`, padding: "3px 9px", borderRadius: 999 }}>{p}</span>
            ))}
            {revenue && <span style={{ fontSize: 11, fontWeight: 700, color: "#0f6e56", background: `${GREEN}15`, padding: "3px 9px", borderRadius: 999 }}>{revenue}</span>}
            {services.slice(0, 2).map((s) => (
              <span key={s} style={{ fontSize: 11, fontWeight: 700, color: NAVY, background: `${NAVY}0c`, padding: "3px 9px", borderRadius: 999 }}>{s}</span>
            ))}
          </div>
 
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            {[
              { key: "name",  label: "YOUR NAME *",     ph: "Jane Smith",           type: "text",  req: true  },
              { key: "firm",  label: "LAW FIRM NAME *",  ph: "Smith & Associates",   type: "text",  req: true  },
              { key: "email", label: "EMAIL *",          ph: "you@yourfirm.com",     type: "email", req: true  },
              { key: "phone", label: "PHONE",            ph: "(316) 000-0000",       type: "tel",   req: false },
            ].map(({ key, label, ph, type, req }) => (
              <div key={key}>
                <label style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: ".3px", marginBottom: 5, display: "block" }}>
                  {label}
                </label>
                <input
                  required={req}
                  type={type}
                  placeholder={ph}
                  value={contact[key as keyof typeof contact]}
                  onChange={(e) => setContact((c) => ({ ...c, [key]: e.target.value }))}
                  style={{
                    width: "100%", padding: "11px 13px",
                    border: `1.5px solid ${LINE}`, borderRadius: 9,
                    fontSize: 14, color: NAVY, background: "#fff",
                    outline: "none", boxSizing: "border-box" as const,
                    fontFamily: FONT,
                  }}
                />
              </div>
            ))}
          </div>
 
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: ".3px", marginBottom: 5, display: "block" }}>
              CITY / AREA
            </label>
            <input
              type="text"
              placeholder="Wichita, Derby, Andover..."
              value={contact.city}
              onChange={(e) => setContact((c) => ({ ...c, city: e.target.value }))}
              style={{
                width: "100%", padding: "11px 13px",
                border: `1.5px solid ${LINE}`, borderRadius: 9,
                fontSize: 14, color: NAVY, background: "#fff",
                outline: "none", boxSizing: "border-box" as const,
                fontFamily: FONT,
              }}
            />
          </div>
 
          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="button"
              onClick={() => setStep(3)}
              style={{
                padding: "13px 24px", background: "#fff",
                border: `2px solid ${LINE}`, borderRadius: 10,
                fontSize: 14, fontWeight: 600, cursor: "pointer",
                color: MUTED, fontFamily: FONT,
              }}
            >
              ← Back
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1, padding: "13px 20px",
                background: loading ? "#9aa0c4" : GREEN,
                color: "#fff", border: "none", borderRadius: 10,
                fontSize: 15, fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: FONT, transition: "background 0.2s ease",
              }}
            >
              {loading ? "Sending..." : "Get my free SEO audit →"}
            </button>
          </div>
 
          <p style={{ fontSize: 11.5, color: MUTED, textAlign: "center", marginTop: 10 }}>
            No commitment · Reviewed personally by Mubashar · Reply within 24 hrs
          </p>
        </form>
      )}
    </div>
  );
}
 






