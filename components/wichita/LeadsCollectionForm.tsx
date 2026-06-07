"use client";
 
import { useState } from "react";
 
const NAVY   = "#0a0f2e";
const PURPLE = "#534AB7";
const GREEN  = "#2f9670";
const MUTED  = "#6b7090";
const LINE   = "#e7e9f1";
const FONT   = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif";
 
const PRACTICE_AREAS = [
  "Family Law / Divorce",
  "Child Custody",
  "Personal Injury",
  "Criminal Defense / DUI",
  "Workers Compensation",
  "Employment Law",
  "Estate Planning",
  "Other",
];
 
export default function LeadsCollectionForm() {
  const [form, setForm] = useState({ name: "", firm: "", practice: "", city: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
 
  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
 
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };
 
  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    border: `1.5px solid ${LINE}`,
    borderRadius: 9,
    fontSize: 14,
    color: NAVY,
    background: "#fff",
    outline: "none",
    boxSizing: "border-box" as const,
    fontFamily: FONT,
  };
 
  const labelStyle = {
    fontSize: 12,
    fontWeight: 700,
    color: MUTED,
    letterSpacing: ".3px",
    marginBottom: 5,
    display: "block",
  };
 
  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "32px 0", fontFamily: FONT }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#e1f5ee", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 26 }}>✓</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: NAVY, marginBottom: 8 }}>We got it — thank you!</div>
        <p style={{ fontSize: 14, color: MUTED, maxWidth: 400, margin: "0 auto", lineHeight: 1.6 }}>
          Mubashar will review your submission personally and reply within 24 hours with your free SEO audit findings.
        </p>
      </div>
    );
  }
 
  return (
    <form onSubmit={submit} style={{ fontFamily: FONT }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <div>
          <label style={labelStyle}>YOUR NAME *</label>
          <input required name="name" value={form.name} onChange={handle} placeholder="Jane Smith" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>LAW FIRM NAME *</label>
          <input required name="firm" value={form.firm} onChange={handle} placeholder="Smith & Associates" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>PRIMARY PRACTICE AREA *</label>
          <select required name="practice" value={form.practice} onChange={handle} style={inputStyle}>
            <option value="">Select practice area</option>
            {PRACTICE_AREAS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>CITY / AREA *</label>
          <input required name="city" value={form.city} onChange={handle} placeholder="Wichita, Derby, Andover..." style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>EMAIL *</label>
          <input required type="email" name="email" value={form.email} onChange={handle} placeholder="you@yourfirm.com" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>PHONE</label>
          <input type="tel" name="phone" value={form.phone} onChange={handle} placeholder="(316) 000-0000" style={inputStyle} />
        </div>
      </div>
 
      <div style={{ marginBottom: 18 }}>
        <label style={labelStyle}>WHAT IS YOUR BIGGEST SEO CHALLENGE RIGHT NOW?</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handle}
          rows={3}
          placeholder="e.g. Not showing in Google Maps, competitors outranking us, no leads from our website..."
          style={{ ...inputStyle, resize: "vertical" as const }}
        />
      </div>
 
      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          background: loading ? "#9aa0c4" : PURPLE,
          color: "#fff",
          border: "none",
          borderRadius: 10,
          padding: "13px 20px",
          fontSize: 15,
          fontWeight: 700,
          cursor: loading ? "not-allowed" : "pointer",
          fontFamily: FONT,
          transition: "background 0.2s ease",
        }}
      >
        {loading ? "Sending..." : "Get my free SEO audit →"}
      </button>
 
      <p style={{ fontSize: 12, color: MUTED, textAlign: "center", marginTop: 10 }}>
        No commitment · Reviewed personally by Mubashar · Reply within 24 hrs
      </p>
    </form>
  );
}
 