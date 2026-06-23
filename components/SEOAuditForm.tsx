"use client";
 
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { CheckCircle2, Shield, Clock, Star } from "lucide-react";
 
interface FormData {
  businessType: string;
  problems: string[];
  fullName: string;
  email: string;
  phone: string;
  websiteUrl: string;
}
 
const BUSINESS_TYPES = [
  { id: "Law Firm", label: "Law Firm", sub: "Family, personal injury, criminal", icon: "⚖️" },
  { id: "Ecommerce / Shopify", label: "Ecommerce / Shopify", sub: "Online retail & DTC brands", icon: "🛒" },
  { id: "Local Service Provider", label: "Local Service Provider", sub: "Dentist, salon, restaurant", icon: "📍" },
  { id: "Home Services", label: "Home Services", sub: "Contractor, plumber, HVAC", icon: "🏠" },
  { id: "Small Business", label: "Small Business", sub: "Local brick & mortar", icon: "🏪" },
  { id: "Mid-Size / Enterprise", label: "Mid-Size / Enterprise", sub: "Multi-location or large-scale", icon: "🏢" },
];
 
const PROBLEMS = [
  { id: "Not ranking on Google", emoji: "📉" },
  { id: "Lost traffic recently", emoji: "⚠️" },
  { id: "Slow website / poor Core Web Vitals", emoji: "🐌" },
  { id: "Thin or duplicate content", emoji: "📄" },
  { id: "No leads from organic search", emoji: "🎯" },
  { id: "Want to outrank competitors", emoji: "🏆" },
  { id: "Need local SEO / GBP help", emoji: "📍" },
  { id: "Starting SEO from scratch", emoji: "🚀" },
];
 
function Orb({ cx, cy, r, color }: { cx: string; cy: string; r: string; color: string }) {
  return (
    <circle cx={cx} cy={cy} r={r} fill={color} style={{ filter: "blur(70px)", opacity: 0.18 }} />
  );
}
 
function ProgressBar({ step }: { step: number }) {
  const pct = step === 1 ? 33 : step === 2 ? 67 : 100;
  const labels = ["Business Type", "Your Details", "SEO Challenges"];
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#534AB7" }}>
          Step {step} of 3 — {labels[step - 1]}
        </span>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8" }}>{pct}%</span>
      </div>
      <div style={{ height: 5, background: "#e2e8f0", borderRadius: 99, overflow: "hidden" }}>
        <motion.div
          style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg, #534AB7, #3eb489)" }}
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>
      {/* Step dots */}
      <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
        {[1, 2, 3].map((s) => (
          <div key={s} style={{
            flex: 1, height: 3, borderRadius: 99,
            background: s <= step ? "linear-gradient(90deg, #534AB7, #3eb489)" : "#e2e8f0",
            transition: "background 0.3s"
          }} />
        ))}
      </div>
    </div>
  );
}
 
export default function SEOAuditForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });
 
  const [form, setForm] = useState<FormData>({
    businessType: "", problems: [], fullName: "",
    email: "", phone: "", websiteUrl: "",
  });
 
  const toggleProblem = (id: string) => {
    setForm((f) => ({
      ...f,
      problems: f.problems.includes(id) ? f.problems.filter((p) => p !== id) : [...f.problems, id],
    }));
  };
 
  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email address";
    if (!form.websiteUrl.trim()) e.websiteUrl = "Website URL is required";
    else if (!/^https?:\/\/.+/.test(form.websiteUrl)) e.websiteUrl = "URL must start with https://";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
 
  const handleSubmit = async () => {
    if (!validateStep2()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/seo-audit", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setSubmitted(true);
      else setErrors({ submit: "Something went wrong. Please try again." });
    } catch {
      setErrors({ submit: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: "linear-gradient(135deg, #e8eaf6 0%, #d4f5e9 55%, #e0e8ff 100%)",
        padding: "96px 24px",
        overflow: "hidden",
      }}
    >
      {/* Orbs — matching rest of site */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} aria-hidden>
        <Orb cx="10%" cy="20%" r="280" color="#534AB7" />
        <Orb cx="90%" cy="80%" r="240" color="#3eb489" />
        <Orb cx="50%" cy="5%"  r="200" color="#7c3aed" />
      </svg>
 
      <div style={{ position: "relative", zIndex: 10, maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
        }}
          className="audit-grid"
        >
 
          {/* ── LEFT COPY ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Eyebrow — same style as SEOAuditStrip */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              borderRadius: 999, border: "1px solid rgba(255,255,255,0.8)",
              background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)",
              padding: "6px 16px", marginBottom: 24,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3eb489", display: "inline-block" }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#534AB7", letterSpacing: "0.05em" }}>
                FREE SEO AUDIT
              </span>
            </div>
 
            <h2 style={{
              fontSize: 44, fontWeight: 900, lineHeight: 1.1,
              color: "#0a0f2e", margin: "0 0 20px", letterSpacing: "-0.03em",
            }}>
              See exactly why<br />
              <span style={{
                backgroundImage: "linear-gradient(90deg, #534AB7 0%, #3eb489 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                you're not ranking.
              </span>
            </h2>
 
            <p style={{ fontSize: 17, color: "#475569", lineHeight: 1.7, margin: "0 0 32px", maxWidth: 440 }}>
              Drop your site below. The founder personally reviews it and sends
              a prioritized fix list within 24 hours — free, no obligation, no sales pressure.
            </p>
 
            {/* Checklist */}
            {[
              "Technical issues, content gaps & competitor analysis",
              "A prioritized P1 / P2 / P3 fix list — not a generic PDF",
              "Reviewed by the founder, not a junior or a bot",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}
              >
                <CheckCircle2 size={20} color="#3eb489" style={{ flexShrink: 0, marginTop: 2 }} strokeWidth={2.5} />
                <span style={{ fontSize: 15, color: "#374151", fontWeight: 500, lineHeight: 1.5 }}>{item}</span>
              </motion.div>
            ))}
 
            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 12,
                marginTop: 32, padding: "12px 20px",
                background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)",
                borderRadius: 999, border: "1px solid rgba(255,255,255,0.8)",
              }}
            >
              <div style={{ display: "flex", gap: -8 }}>
                {["#534AB7", "#3eb489", "#d97706", "#ef4444"].map((c, i) => (
                  <div key={i} style={{
                    width: 30, height: 30, borderRadius: "50%", background: c,
                    border: "2px solid white", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 10, fontWeight: 800, color: "white",
                    marginLeft: i > 0 ? -8 : 0,
                  }}>
                    {["JD", "SM", "RK", "AL"][i]}
                  </div>
                ))}
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#475569" }}>
                <strong style={{ color: "#0a0f2e" }}>20+ firms</strong> audited this month
              </span>
            </motion.div>
          </motion.div>
 
          {/* ── RIGHT: FORM CARD ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            {submitted ? (
              /* Success */
              <div style={{
                background: "#fff", borderRadius: 20, padding: "40px 32px",
                boxShadow: "0 8px 48px rgba(15,23,42,0.12)", border: "1px solid rgba(255,255,255,0.8)",
                textAlign: "center",
              }}>
                <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontSize: 24, fontWeight: 900, color: "#0a0f2e", margin: "0 0 10px" }}>
                  You're all set, {form.fullName.split(" ")[0]}!
                </h3>
                <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.6, marginBottom: 24 }}>
                  Mubashar will personally audit <strong>{form.websiteUrl}</strong> and
                  send your report within <strong>48 hours</strong>.
                </p>
                <div style={{
                  background: "#f0fdf4", borderRadius: 12, padding: "16px 20px",
                  display: "flex", flexDirection: "column", gap: 8,
                }}>
                  {[`✔ Confirmation sent to ${form.email}`, "✔ No sales calls — just your audit", "✔ 100% free, no obligation"].map((t) => (
                    <span key={t} style={{ fontSize: 14, color: "#166534", fontWeight: 500 }}>{t}</span>
                  ))}
                </div>
              </div>
            ) : (
              /* Form */
              <div style={{
                background: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)",
                borderRadius: 20, padding: "36px 32px",
                boxShadow: "0 8px 48px rgba(15,23,42,0.12)",
                border: "1px solid rgba(255,255,255,0.9)",
              }}>
                <ProgressBar step={step} />
 
                <AnimatePresence mode="wait">
                  {/* STEP 1 */}
                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                      <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0a0f2e", margin: "0 0 6px" }}>
                        What type of business are you?
                      </h3>
                      <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 20px" }}>
                        Select the option that best describes your business
                      </p>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
                        {BUSINESS_TYPES.map((b) => (
                          <button key={b.id} onClick={() => setForm((f) => ({ ...f, businessType: b.id }))}
                            style={{
                              display: "flex", flexDirection: "column", alignItems: "flex-start",
                              padding: "14px 14px", border: `1.5px solid ${form.businessType === b.id ? "#534AB7" : "#e2e8f0"}`,
                              borderRadius: 12, background: form.businessType === b.id ? "#f5f3ff" : "#fff",
                              cursor: "pointer", textAlign: "left", transition: "all 0.15s",
                              boxShadow: form.businessType === b.id ? "0 0 0 3px rgba(83,74,183,0.12)" : "none",
                            }}
                          >
                            <span style={{ fontSize: 12, fontWeight: 700, color: "#0a0f2e", marginBottom: 2 }}>{b.label}</span>
                            <span style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.3 }}>{b.sub}</span>
                          </button>
                        ))}
                      </div>
                      <button
                        disabled={!form.businessType}
                        onClick={() => setStep(2)}
                        style={{
                          width: "100%", padding: "14px", fontSize: 14, fontWeight: 800,
                          color: "#fff", background: form.businessType
                            ? "linear-gradient(135deg, #534AB7 0%, #3eb489 100%)"
                            : "#cbd5e1",
                          border: "none", borderRadius: 12, cursor: form.businessType ? "pointer" : "not-allowed",
                          letterSpacing: "0.04em", transition: "all 0.2s",
                        }}
                      >
                        CONTINUE →
                      </button>
                      <p style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", marginTop: 12 }}>
                        By submitting, you agree to our <a href="/privacy" style={{ color: "#534AB7" }}>Privacy Policy</a>. We never share your information.
                      </p>
                    </motion.div>
                  )}
 
                  {/* STEP 2 */}
                  {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                      <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0a0f2e", margin: "0 0 6px" }}>
                        Your Contact Information
                      </h3>
                      <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 20px" }}>
                        We'll use this to deliver your audit and schedule a review call
                      </p>
 
                      {[
                        { key: "fullName", label: "Full Name", placeholder: "John Smith", type: "text", required: true },
                        { key: "email", label: "Work Email", placeholder: "john@company.com", type: "email", required: true },
                        { key: "phone", label: "Phone Number", placeholder: "(555) 123-4567", type: "tel", required: false },
                        { key: "websiteUrl", label: "Website URL", placeholder: "https://yourwebsite.com", type: "url", required: true },
                      ].map((field) => (
                        <div key={field.key} style={{ marginBottom: 16 }}>
                          <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
                            {field.label}{" "}
                            {field.required
                              ? <span style={{ color: "#ef4444" }}>*</span>
                              : <span style={{ color: "#94a3b8", fontWeight: 400, fontSize: 12 }}>(optional)</span>
                            }
                          </label>
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            value={form[field.key as keyof FormData] as string}
                            onChange={(e) => {
                              setForm((f) => ({ ...f, [field.key]: e.target.value }));
                              setErrors((er) => ({ ...er, [field.key]: "" }));
                            }}
                            style={{
                              width: "100%", padding: "11px 14px", fontSize: 14,
                              border: `1.5px solid ${errors[field.key] ? "#ef4444" : "#e2e8f0"}`,
                              borderRadius: 10, outline: "none", color: "#0a0f2e",
                              background: "#fff", boxSizing: "border-box", transition: "border-color 0.15s",
                            }}
                            onFocus={(e) => e.target.style.borderColor = "#534AB7"}
                            onBlur={(e) => e.target.style.borderColor = errors[field.key] ? "#ef4444" : "#e2e8f0"}
                          />
                          {errors[field.key] && (
                            <span style={{ fontSize: 12, color: "#ef4444", marginTop: 4, display: "block" }}>
                              {errors[field.key]}
                            </span>
                          )}
                        </div>
                      ))}
 
                      <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                        <button onClick={() => setStep(1)} style={{
                          padding: "13px 20px", fontSize: 14, fontWeight: 600,
                          color: "#475569", background: "#f1f5f9", border: "none",
                          borderRadius: 12, cursor: "pointer", whiteSpace: "nowrap",
                        }}>
                          ← Back
                        </button>
                        <button onClick={() => { if (validateStep2()) setStep(3); }} style={{
                          flex: 1, padding: "13px", fontSize: 14, fontWeight: 800,
                          color: "#fff", background: "linear-gradient(135deg, #534AB7 0%, #3eb489 100%)",
                          border: "none", borderRadius: 12, cursor: "pointer", letterSpacing: "0.04em",
                        }}>
                          CONTINUE →
                        </button>
                      </div>
                      <p style={{ fontSize: 11, color: "#94a3b8", textAlign: "center" }}>
                        By submitting, you agree to our <a href="/privacy" style={{ color: "#534AB7" }}>Privacy Policy</a>. We never share your information.
                      </p>
                    </motion.div>
                  )}
 
                  {/* STEP 3 */}
                  {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                      <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0a0f2e", margin: "0 0 6px" }}>
                        What's your biggest SEO challenge?
                      </h3>
                      <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 20px" }}>
                        Select all that apply — this helps Mubashar tailor your audit
                      </p>
 
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
                        {PROBLEMS.map((p) => {
                          const active = form.problems.includes(p.id);
                          return (
                            <button key={p.id} onClick={() => toggleProblem(p.id)} style={{
                              display: "flex", alignItems: "center", gap: 8, padding: "11px 12px",
                              border: `1.5px solid ${active ? "#534AB7" : "#e2e8f0"}`,
                              borderRadius: 10, background: active ? "#f5f3ff" : "#fff",
                              cursor: "pointer", textAlign: "left", position: "relative",
                              boxShadow: active ? "0 0 0 3px rgba(83,74,183,0.10)" : "none",
                              transition: "all 0.15s",
                            }}>
                              <span style={{ fontSize: 11, fontWeight: 600, color: "#0a0f2e", lineHeight: 1.3 }}>{p.id}</span>
                              {active && (
                                <span style={{ position: "absolute", top: 7, right: 9, fontSize: 10, color: "#534AB7", fontWeight: 800 }}>✓</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
 
                      {errors.submit && (
                        <p style={{ fontSize: 12, color: "#ef4444", textAlign: "center", marginBottom: 12 }}>{errors.submit}</p>
                      )}
 
                      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                        <button onClick={() => setStep(2)} style={{
                          padding: "13px 20px", fontSize: 14, fontWeight: 600,
                          color: "#475569", background: "#f1f5f9", border: "none",
                          borderRadius: 12, cursor: "pointer", whiteSpace: "nowrap",
                        }}>
                          ← Back
                        </button>
                        <button onClick={handleSubmit} disabled={loading} style={{
                          flex: 1, padding: "13px", fontSize: 14, fontWeight: 800,
                          color: "#fff", background: loading ? "#94a3b8" : "linear-gradient(135deg, #534AB7 0%, #3eb489 100%)",
                          border: "none", borderRadius: 12, cursor: loading ? "wait" : "pointer",
                          letterSpacing: "0.04em",
                        }}>
                          {loading ? "Sending..." : "GET MY FREE AUDIT →"}
                        </button>
                      </div>
 
                      {/* Trust badges */}
                      <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
                        {[
                          { icon: <Shield size={13} />, text: "100% Confidential" },
                          { icon: <Clock size={13} />, text: "48hr Turnaround" },
                          { icon: <Star size={13} />, text: "No Obligation" },
                        ].map((t) => (
                          <span key={t.text} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#64748b", fontWeight: 500 }}>
                            <span style={{ color: "#534AB7" }}>{t.icon}</span> {t.text}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>
      </div>
 
      {/* Responsive grid fix */}
      <style>{`
        @media (max-width: 768px) {
          .audit-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
      `}</style>
    </section>
  );
}
 