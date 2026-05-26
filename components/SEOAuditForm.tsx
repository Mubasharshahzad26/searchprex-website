"use client";
 
import { useState } from "react";
 
// ─── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  businessType: string;
  problems: string[];
  fullName: string;
  email: string;
  phone: string;
  websiteUrl: string;
}
 
// ─── Step 1 Data ──────────────────────────────────────────────────────────────
const BUSINESS_TYPES = [
  { id: "Law Firm", label: "Law Firm", sub: "Family, personal injury, criminal" },
  { id: "Ecommerce / Shopify", label: "Ecommerce / Shopify", sub: "Online retail & DTC brands" },
  { id: "Local Service Provider", label: "Local Service Provider", sub: "Dentist, salon, restaurant" },
  { id: "Home Services", label: "Home Services", sub: "Contractor, plumber, HVAC" },
  { id: "Small Business", label: "Small Business", sub: "Local brick & mortar" },
  { id: "Mid-Size / Enterprise", label: "Mid-Size / Enterprise", sub: "Multi-location or large-scale" },
];
 
// ─── Step 3 Data ──────────────────────────────────────────────────────────────
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
 
// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ step }: { step: number }) {
  const pct = step === 1 ? 33 : step === 2 ? 67 : 100;
  return (
    <div className="progress-wrap">
      <div className="progress-meta">
        <span>Step {step} of 3</span>
        <span>{pct}% Complete</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
 
// ─── Main Component ───────────────────────────────────────────────────────────
export default function SEOAuditForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
 
  const [form, setForm] = useState<FormData>({
    businessType: "",
    problems: [],
    fullName: "",
    email: "",
    phone: "",
    websiteUrl: "",
  });
 
  // ── Helpers ────────────────────────────────────────────────────────────────
  const toggleProblem = (id: string) => {
    setForm((f) => ({
      ...f,
      problems: f.problems.includes(id)
        ? f.problems.filter((p) => p !== id)
        : [...f.problems, id],
    }));
  };
 
  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email address";
    if (!form.websiteUrl.trim()) e.websiteUrl = "Website URL is required";
    else if (!/^https?:\/\/.+/.test(form.websiteUrl))
      e.websiteUrl = "URL must start with https://";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
 
  const handleSubmit = async () => {
    if (!validateStep2()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/seo-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
 
  // ── Success State ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="form-card success-card">
        <div className="success-icon">✅</div>
        <h3 className="success-title">You're all set, {form.fullName.split(" ")[0]}!</h3>
        <p className="success-sub">
          Mubashar will personally audit <strong>{form.websiteUrl}</strong> and
          send your report within <strong>48 hours</strong>.
        </p>
        <div className="success-checks">
          <span>✔ Confirmation sent to {form.email}</span>
          <span>✔ No sales calls — just your audit</span>
          <span>✔ 100% free, no obligation</span>
        </div>
      </div>
    );
  }
 
  return (
    <div className="form-card">
      <ProgressBar step={step} />
 
      {/* ── STEP 1 — Business Type ── */}
      {step === 1 && (
        <>
          <h3 className="form-title">What type of business are you?</h3>
          <p className="form-sub">Select the option that best describes your business</p>
          <div className="biz-grid">
            {BUSINESS_TYPES.map((b) => (
              <button
                key={b.id}
                className={`biz-btn ${form.businessType === b.id ? "biz-btn--active" : ""}`}
                onClick={() => setForm((f) => ({ ...f, businessType: b.id }))}
              >
                <span className="biz-label">{b.label}</span>
                <span className="biz-sub">{b.sub}</span>
              </button>
            ))}
          </div>
          <button
            className={`cta-btn ${!form.businessType ? "cta-btn--disabled" : ""}`}
            disabled={!form.businessType}
            onClick={() => setStep(2)}
          >
            CONTINUE →
          </button>
          <p className="form-legal">
            By submitting, you agree to our{" "}
            <a href="/privacy">Privacy Policy</a>. We never share your information.
          </p>
        </>
      )}
 
      {/* ── STEP 2 — Contact Info ── */}
      {step === 2 && (
        <>
          <h3 className="form-title">Your Contact Information</h3>
          <p className="form-sub">We'll use this to deliver your audit and schedule a review call</p>
 
          <div className="field-group">
            <label className="field-label">Full Name <span className="req">*</span></label>
            <input
              className={`field-input ${errors.fullName ? "field-input--err" : ""}`}
              placeholder="John Smith"
              value={form.fullName}
              onChange={(e) => {
                setForm((f) => ({ ...f, fullName: e.target.value }));
                setErrors((er) => ({ ...er, fullName: "" }));
              }}
            />
            {errors.fullName && <span className="field-err">{errors.fullName}</span>}
          </div>
 
          <div className="field-group">
            <label className="field-label">Work Email <span className="req">*</span></label>
            <input
              className={`field-input ${errors.email ? "field-input--err" : ""}`}
              placeholder="john@company.com"
              type="email"
              value={form.email}
              onChange={(e) => {
                setForm((f) => ({ ...f, email: e.target.value }));
                setErrors((er) => ({ ...er, email: "" }));
              }}
            />
            {errors.email && <span className="field-err">{errors.email}</span>}
          </div>
 
          <div className="field-group">
            <label className="field-label">
              Phone Number{" "}
              <span className="optional">(optional)</span>
            </label>
            <input
              className="field-input"
              placeholder="(555) 123-4567"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            />
          </div>
 
          <div className="field-group">
            <label className="field-label">Website URL <span className="req">*</span></label>
            <input
              className={`field-input ${errors.websiteUrl ? "field-input--err" : ""}`}
              placeholder="https://yourwebsite.com"
              type="url"
              value={form.websiteUrl}
              onChange={(e) => {
                setForm((f) => ({ ...f, websiteUrl: e.target.value }));
                setErrors((er) => ({ ...er, websiteUrl: "" }));
              }}
            />
            {errors.websiteUrl && <span className="field-err">{errors.websiteUrl}</span>}
          </div>
 
          <div className="btn-row">
            <button className="back-btn" onClick={() => setStep(1)}>← Back</button>
            <button className="cta-btn" onClick={() => { if (validateStep2()) setStep(3); }}>
              CONTINUE →
            </button>
          </div>
          <p className="form-legal">
            By submitting, you agree to our <a href="/privacy">Privacy Policy</a>. We never share your information.
          </p>
        </>
      )}
 
      {/* ── STEP 3 — Problems / Goals ── */}
      {step === 3 && (
        <>
          <h3 className="form-title">What's your biggest SEO challenge?</h3>
          <p className="form-sub">Select all that apply — this helps Mubashar tailor your audit</p>
 
          <div className="problems-grid">
            {PROBLEMS.map((p) => (
              <button
                key={p.id}
                className={`problem-btn ${form.problems.includes(p.id) ? "problem-btn--active" : ""}`}
                onClick={() => toggleProblem(p.id)}
              >
                <span className="problem-emoji">{p.emoji}</span>
                <span className="problem-label">{p.id}</span>
                {form.problems.includes(p.id) && (
                  <span className="problem-check">✓</span>
                )}
              </button>
            ))}
          </div>
 
          {errors.submit && <p className="field-err" style={{ textAlign: "center", marginBottom: 12 }}>{errors.submit}</p>}
 
          <div className="btn-row">
            <button className="back-btn" onClick={() => setStep(2)}>← Back</button>
            <button
              className={`cta-btn ${loading ? "cta-btn--loading" : ""}`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Sending..." : "GET MY FREE AUDIT →"}
            </button>
          </div>
 
          <div className="trust-row">
            <span>🔒 100% Confidential</span>
            <span>⏱ 48hr Turnaround</span>
            <span>⭐ No Obligation</span>
          </div>
        </>
      )}
 
      {/* ── Styles ── */}
      <style jsx>{`
        .form-card {
          background: #fff;
          border-radius: 16px;
          padding: 32px 28px;
          box-shadow: 0 4px 32px rgba(15, 23, 42, 0.12);
          width: 100%;
          max-width: 480px;
        }
        .success-card { text-align: center; }
        .success-icon { font-size: 48px; margin-bottom: 16px; }
        .success-title {
          font-size: 22px; font-weight: 800; color: #0f172a; margin: 0 0 10px;
        }
        .success-sub {
          font-size: 15px; color: #475569; line-height: 1.6; margin-bottom: 20px;
        }
        .success-checks {
          display: flex; flex-direction: column; gap: 8px;
          background: #f0fdf4; border-radius: 10px; padding: 16px 20px;
          font-size: 14px; color: #166534; font-weight: 500;
        }
 
        /* Progress */
        .progress-wrap { margin-bottom: 24px; }
        .progress-meta {
          display: flex; justify-content: space-between;
          font-size: 13px; color: #64748b; font-weight: 600; margin-bottom: 8px;
        }
        .progress-track {
          height: 4px; background: #e2e8f0; border-radius: 4px; overflow: hidden;
        }
        .progress-fill {
          height: 100%; background: #2563eb; border-radius: 4px;
          transition: width 0.4s ease;
        }
 
        /* Title */
        .form-title {
          font-size: 20px; font-weight: 800; color: #0f172a;
          margin: 0 0 6px; letter-spacing: -0.02em;
        }
        .form-sub { font-size: 13px; color: #64748b; margin: 0 0 20px; }
 
        /* Business Type Grid */
        .biz-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
          margin-bottom: 20px;
        }
        .biz-btn {
          display: flex; flex-direction: column; align-items: flex-start;
          padding: 14px 16px; border: 1.5px solid #e2e8f0; border-radius: 10px;
          background: #fff; cursor: pointer; text-align: left;
          transition: all 0.15s ease;
        }
        .biz-btn:hover { border-color: #93c5fd; background: #eff6ff; }
        .biz-btn--active {
          border-color: #2563eb; background: #eff6ff;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
        }
        .biz-label { font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
        .biz-sub { font-size: 11px; color: #94a3b8; }
 
        /* Problems Grid */
        .problems-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
          margin-bottom: 20px;
        }
        .problem-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 12px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px;
          background: #fff; cursor: pointer; text-align: left;
          transition: all 0.15s ease; position: relative;
        }
        .problem-btn:hover { border-color: #93c5fd; background: #eff6ff; }
        .problem-btn--active {
          border-color: #2563eb; background: #eff6ff;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
        }
        .problem-emoji { font-size: 18px; flex-shrink: 0; }
        .problem-label { font-size: 12px; font-weight: 600; color: #0f172a; line-height: 1.3; }
        .problem-check {
          position: absolute; top: 8px; right: 10px;
          font-size: 11px; color: #2563eb; font-weight: 800;
        }
 
        /* Fields */
        .field-group { margin-bottom: 16px; }
        .field-label {
          display: block; font-size: 13px; font-weight: 700;
          color: #374151; margin-bottom: 6px;
        }
        .req { color: #ef4444; }
        .optional { color: #94a3b8; font-weight: 400; font-size: 12px; }
        .field-input {
          width: 100%; padding: 11px 14px; font-size: 14px;
          border: 1.5px solid #e2e8f0; border-radius: 8px;
          outline: none; transition: border-color 0.15s; color: #0f172a;
          background: #fff; box-sizing: border-box;
        }
        .field-input:focus { border-color: #2563eb; }
        .field-input--err { border-color: #ef4444; }
        .field-err { font-size: 12px; color: #ef4444; margin-top: 4px; display: block; }
 
        /* Buttons */
        .cta-btn {
          width: 100%; padding: 14px; font-size: 14px; font-weight: 800;
          color: #fff; background: #2563eb; border: none; border-radius: 10px;
          cursor: pointer; letter-spacing: 0.04em; transition: all 0.2s;
        }
        .cta-btn:hover:not(:disabled) { background: #1d4ed8; transform: translateY(-1px); }
        .cta-btn--disabled { background: #94a3b8; cursor: not-allowed; }
        .cta-btn--loading { background: #64748b; cursor: wait; }
        .btn-row { display: flex; gap: 10px; margin-bottom: 12px; }
        .btn-row .cta-btn { flex: 1; }
        .back-btn {
          padding: 14px 18px; font-size: 14px; font-weight: 600;
          color: #475569; background: #f1f5f9; border: none; border-radius: 10px;
          cursor: pointer; transition: background 0.15s; white-space: nowrap;
        }
        .back-btn:hover { background: #e2e8f0; }
 
        /* Trust + Legal */
        .trust-row {
          display: flex; justify-content: center; gap: 16px;
          font-size: 12px; color: #64748b; font-weight: 500;
          margin-top: 14px; flex-wrap: wrap;
        }
        .form-legal {
          font-size: 11px; color: #94a3b8; text-align: center; margin-top: 12px;
        }
        .form-legal a { color: #2563eb; text-decoration: none; }
      `}</style>
    </div>
  );
}