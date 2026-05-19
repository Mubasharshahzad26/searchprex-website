"use client";
 
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radar,
  Map,
  Calendar,
  Globe,
  Zap,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ChevronRight,
  ArrowRight,
  Loader2,
  Send,
  Shield,
  Clock,
  Star,
  User,
  Mail,
  Building2,
  DollarSign,
} from "lucide-react";
 
// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type Tab = "audit" | "roadmap" | "consult";
type AuditPhase = "idle" | "scanning" | "done";
type RoadmapStep = "questions" | "result";
 
interface AuditItem {
  label: string;
  score: number;
  status: "good" | "warn" | "bad";
  detail: string;
}
 
// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────
const SCAN_MESSAGES = [
  "Fetching your page structure…",
  "Checking Core Web Vitals…",
  "Analysing title tags & meta…",
  "Scanning schema markup…",
  "Evaluating backlink profile…",
  "Reviewing mobile experience…",
  "Auditing content depth…",
  "Compiling your report…",
];
 
const MOCK_AUDIT: AuditItem[] = [
  { label: "Page Speed",     score: 44, status: "bad",  detail: "LCP > 4s — Core Web Vitals failing" },
  { label: "Title Tags",     score: 68, status: "warn", detail: "Missing on 3 pages" },
  { label: "Schema Markup",  score: 22, status: "bad",  detail: "No LocalBusiness / LegalService schema" },
  { label: "Backlinks",      score: 81, status: "good", detail: "48 referring domains — healthy" },
  { label: "Mobile UX",      score: 73, status: "warn", detail: "Minor CLS on homepage" },
  { label: "Content Depth",  score: 57, status: "warn", detail: "8 pages under 600 words" },
];
 
const OVERALL_SCORE = 58;
 
const INDUSTRIES = [
  { label: "Law Firm",       icon: "⚖️", color: "#534AB7", bg: "#EEEDFE" },
  { label: "Local Business", icon: "📍", color: "#1D9E75", bg: "#E1F5EE" },
  { label: "E-Commerce",     icon: "🛒", color: "#D85A30", bg: "#FAECE7" },
  { label: "Healthcare",     icon: "🏥", color: "#185FA5", bg: "#E6F1FB" },
  { label: "Real Estate",    icon: "🏠", color: "#BA7517", bg: "#FAEEDA" },
  { label: "Other",          icon: "💼", color: "#64748b", bg: "#f1f5f9" },
];
 
const GOALS = [
  "Rank on Page 1 in Chicago",
  "More local leads & calls",
  "More e-commerce sales",
  "Build brand authority",
];
 
const BUDGETS = [
  { label: "< $500 / mo",    value: "low"  },
  { label: "$500–$1,500",    value: "mid"  },
  { label: "$1,500–$3,000",  value: "high" },
  { label: "$3,000+",        value: "pro"  },
];
 
const ROADMAP = [
  { week: "Week 1–2",  title: "Technical SEO audit & fixes",         detail: "Core Web Vitals, crawlability, schema markup",          done: true  },
  { week: "Week 3–4",  title: "Keyword strategy & site structure",   detail: "Persona-based keyword mapping, content gap analysis",   done: true  },
  { week: "Week 5–8",  title: "Content & on-page optimisation",      detail: "E-E-A-T aligned articles, title rewrites, interlinking", done: false },
  { week: "Week 9–12", title: "Link building & authority growth",     detail: "Local citations, guest posts, PR links",                done: false },
  { week: "Week 12+",  title: "Monthly reporting & iteration",       detail: "GA4 + GSC dashboards, strategy adjustments",            done: false },
];
 
// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function scoreColor(status: AuditItem["status"]) {
  return status === "good" ? "#1D9E75" : status === "warn" ? "#BA7517" : "#E24B4A";
}
function scoreBg(status: AuditItem["status"]) {
  return status === "good" ? "#E1F5EE" : status === "warn" ? "#FAEEDA" : "#FCEBEB";
}
function scoreText(status: AuditItem["status"]) {
  return status === "good" ? "#085041" : status === "warn" ? "#633806" : "#791F1F";
}
function ScoreIcon({ status }: { status: AuditItem["status"] }) {
  if (status === "good") return <CheckCircle  className="w-3.5 h-3.5" style={{ color: "#1D9E75" }} />;
  if (status === "warn") return <AlertTriangle className="w-3.5 h-3.5" style={{ color: "#BA7517" }} />;
  return                        <XCircle       className="w-3.5 h-3.5" style={{ color: "#E24B4A" }} />;
}
 
// ─────────────────────────────────────────────
// Tab 1 — Instant SEO Audit
// ─────────────────────────────────────────────
function AuditTab() {
  const [url,   setUrl]   = useState("");
  const [phase, setPhase] = useState<AuditPhase>("idle");
  const [msgIdx, setMsg]  = useState(0);
  const [err,   setErr]   = useState(false);
 
  function startAudit() {
    if (!url.trim()) { setErr(true); return; }
    setErr(false);
    setPhase("scanning");
    setMsg(0);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      if (i < SCAN_MESSAGES.length) {
        setMsg(i);
      } else {
        clearInterval(iv);
        setPhase("done");
      }
    }, 550);
  }
 
  return (
    <div>
      {/* URL bar */}
      <div
        className="flex items-center gap-2 rounded-xl px-3 py-2 mb-3 transition-all"
        style={{
          border: `1.5px solid ${err ? "#E24B4A" : "#7F77DD"}`,
          background: "white",
          boxShadow: err ? "0 0 0 3px rgba(226,75,74,.1)" : "none",
        }}
      >
        <Globe className="w-4 h-4 flex-shrink-0" style={{ color: "#534AB7" }} />
        <input
          type="text"
          value={url}
          onChange={(e) => { setUrl(e.target.value); setErr(false); }}
          onKeyDown={(e) => e.key === "Enter" && startAudit()}
          placeholder="Enter your website URL — e.g. yoursite.com"
          className="flex-1 text-sm outline-none bg-transparent text-gray-800 placeholder:text-gray-400"
        />
        <button
          onClick={startAudit}
          disabled={phase === "scanning"}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white flex-shrink-0 transition-all disabled:opacity-60"
          style={{ background: "#534AB7" }}
        >
          {phase === "scanning"
            ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Scanning…</>
            : <><Radar className="w-3.5 h-3.5" /> Analyse now</>}
        </button>
      </div>
      {err && <p className="text-xs text-red-500 mb-3 -mt-1 pl-1">Please enter a website URL first</p>}
 
      {/* Scanning bar */}
      <AnimatePresence>
        {phase === "scanning" && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl mb-4"
            style={{ background: "#EEEDFE" }}
          >
            <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" style={{ color: "#534AB7" }} />
            <span className="text-sm font-medium" style={{ color: "#3C3489" }}>
              {SCAN_MESSAGES[msgIdx]}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
 
      {/* Results */}
      <AnimatePresence>
        {phase === "done" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Overall score ring */}
            <div
              className="flex items-center gap-4 p-4 rounded-xl border"
              style={{ background: "#EEEDFE", borderColor: "#AFA9EC" }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black text-white flex-shrink-0 shadow-sm"
                style={{
                  background:
                    OVERALL_SCORE >= 75 ? "#1D9E75"
                    : OVERALL_SCORE >= 50 ? "#BA7517"
                    : "#E24B4A",
                }}
              >
                {OVERALL_SCORE}
              </div>
              <div className="flex-1">
                <p className="font-black text-gray-900 text-sm mb-0.5">Overall SEO Score</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-2">
                  Several critical issues found — schema markup and page speed need urgent attention.
                </p>
                <button
                  className="text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                  style={{ color: "#534AB7" }}
                >
                  Book free call to fix these <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
 
            {/* Score grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {MOCK_AUDIT.map((item) => (
                <div
                  key={item.label}
                  className="p-3 rounded-xl border"
                  style={{ borderColor: "#eee", background: "#fafafa" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <ScoreIcon status={item.status} />
                      <span className="text-xs font-semibold text-gray-700">{item.label}</span>
                    </div>
                    <span
                      className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: scoreBg(item.status), color: scoreText(item.status) }}
                    >
                      {item.score}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden mb-1.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.score}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: scoreColor(item.status) }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 leading-snug">{item.detail}</p>
                </div>
              ))}
            </div>
 
            {/* CTA */}
            <button
              className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={{ background: "#534AB7" }}
            >
              <Calendar className="w-4 h-4" />
              Fix These Issues — Book Free 30-Min Call
            </button>
 
            <button
              onClick={() => { setPhase("idle"); setUrl(""); }}
              className="w-full text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              ← Scan a different URL
            </button>
          </motion.div>
        )}
      </AnimatePresence>
 
      {phase === "idle" && (
        <p className="text-center text-xs text-gray-400 mt-1">
          Instant results · No login · Powered by SearchPrex AI
        </p>
      )}
    </div>
  );
}
 
// ─────────────────────────────────────────────
// Tab 2 — SEO Roadmap
// ─────────────────────────────────────────────
function RoadmapTab() {
  const [step,     setStep]     = useState<RoadmapStep>("questions");
  const [industry, setIndustry] = useState("");
  const [goal,     setGoal]     = useState("");
  const [budget,   setBudget]   = useState("");
 
  const ready = industry && goal && budget;
 
  return (
    <div>
      <AnimatePresence mode="wait">
        {step === "questions" ? (
          <motion.div
            key="q"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-5"
          >
            {/* Industry */}
            <div>
              <p className="text-xs font-semibold text-gray-700 mb-2.5 uppercase tracking-wide">
                What industry are you in?
              </p>
              <div className="grid grid-cols-3 gap-2">
                {INDUSTRIES.map((ind) => (
                  <button
                    key={ind.label}
                    onClick={() => setIndustry(ind.label)}
                    className="flex flex-col items-center gap-1.5 py-3 rounded-xl border text-center transition-all text-xs font-medium"
                    style={
                      industry === ind.label
                        ? { background: ind.bg, borderColor: ind.color, color: ind.color, borderWidth: "1.5px" }
                        : { background: "white", borderColor: "#e5e7eb", color: "#64748b" }
                    }
                  >
                    <span className="text-lg">{ind.icon}</span>
                    {ind.label}
                  </button>
                ))}
              </div>
            </div>
 
            {/* Goal */}
            <div>
              <p className="text-xs font-semibold text-gray-700 mb-2.5 uppercase tracking-wide">
                What is yourFOUNDER-LED SEO. NO JUNIORS. NO FLUFF. SEO goal?
              </p>
              <div className="flex flex-col gap-2">
                {GOALS.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGoal(g)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border text-sm text-left transition-all"
                    style={
                      goal === g
                        ? { background: "#EEEDFE", borderColor: "#7F77DD", color: "#3C3489", borderWidth: "1.5px" }
                        : { background: "white", borderColor: "#e5e7eb", color: "#374151" }
                    }
                  >
                    <div
                      className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                      style={goal === g ? { borderColor: "#534AB7", background: "#534AB7" } : { borderColor: "#cbd5e1" }}
                    >
                      {goal === g && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    {g}
                  </button>
                ))}
              </div>
            </div>
 
            {/* Budget */}
            <div>
              <p className="text-xs font-semibold text-gray-700 mb-2.5 uppercase tracking-wide">
                Monthly SEO budget?
              </p>
              <div className="grid grid-cols-2 gap-2">
                {BUDGETS.map((b) => (
                  <button
                    key={b.value}
                    onClick={() => setBudget(b.value)}
                    className="py-3 rounded-xl border text-xs font-semibold transition-all"
                    style={
                      budget === b.value
                        ? { background: "#EEEDFE", borderColor: "#7F77DD", color: "#3C3489", borderWidth: "1.5px" }
                        : { background: "white", borderColor: "#e5e7eb", color: "#64748b" }
                    }
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
 
            <button
              onClick={() => ready && setStep("result")}
              disabled={!ready}
              className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all"
              style={{ background: ready ? "#534AB7" : "#c4c1e8", cursor: ready ? "pointer" : "not-allowed" }}
            >
              <Zap className="w-4 h-4" />
              Generate My 90-Day SEO Roadmap
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="r"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="space-y-4"
          >
            {/* Personalized tag */}
            <div
              className="px-3 py-2.5 rounded-xl text-xs font-medium"
              style={{ background: "#EEEDFE", border: "1px solid #AFA9EC", color: "#3C3489" }}
            >
              ✨ Personalised for: <strong>{industry}</strong> · {GOALS.find(g => g === goal)} · {BUDGETS.find(b => b.value === budget)?.label}
            </div>
 
            {/* Timeline */}
            <div className="relative pl-7">
              <div className="absolute left-3 top-2 bottom-2 w-px bg-gray-200" />
              {ROADMAP.map((item, i) => (
                <motion.div
                  key={item.week}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="relative mb-5 last:mb-0"
                >
                  <div
                    className="absolute -left-4 top-1 w-3 h-3 rounded-full border-2 flex-shrink-0"
                    style={
                      item.done
                        ? { background: "#534AB7", borderColor: "#534AB7" }
                        : { background: "white",   borderColor: "#cbd5e1" }
                    }
                  />
                  <p className="text-xs font-bold mb-0.5" style={{ color: "#534AB7" }}>{item.week}</p>
                  <p className="text-sm font-semibold text-gray-800 mb-0.5">{item.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.detail}</p>
                </motion.div>
              ))}
            </div>
 
            <button
              onClick={() => setStep("questions")}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              ← Change answers
            </button>
 
            <button
              className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={{ background: "#534AB7" }}
            >
              <Calendar className="w-4 h-4" />
              Let's Execute This — Book Free Call
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
 
// ─────────────────────────────────────────────
// Tab 3 — Book Consultation
// ─────────────────────────────────────────────
function ConsultTab() {
  const [form, setForm] = useState({
    name: "", email: "", website: "", business: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
 
  async function handleSubmit() {
    if (!form.name || !form.email) return;
    setStatus("loading");
    try {
      // ── Replace YOUR_FORM_ID with your Formspree form ID ──
      // Sign up free at formspree.io → New form → contact@searchprex.com
      const res = await fetch("https://formspree.io/f/mqejawpd", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...form,
          _subject: "New Consultation Request — SearchPrex",
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }
 
  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-lg font-black text-gray-900 mb-2">Request received!</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          We'll reply to <strong>{form.email}</strong> within 24 hours to confirm your free 30-min strategy call.
        </p>
      </motion.div>
    );
  }
 
  return (
    <div className="space-y-3">
      {/* Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="relative">
          <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-300" />
          <input
            type="text"
            placeholder="Your full name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full pl-9 pr-4 py-3 rounded-xl border text-sm outline-none transition-colors bg-white"
            style={{ borderColor: "#e5e7eb" }}
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-300" />
          <input
            type="email"
            placeholder="Email address *"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full pl-9 pr-4 py-3 rounded-xl border text-sm outline-none transition-colors bg-white"
            style={{ borderColor: "#e5e7eb" }}
          />
        </div>
      </div>
      <div className="relative">
        <Globe className="absolute left-3 top-3.5 w-4 h-4 text-gray-300" />
        <input
          type="text"
          placeholder="Website URL"
          value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
          className="w-full pl-9 pr-4 py-3 rounded-xl border text-sm outline-none transition-colors bg-white"
          style={{ borderColor: "#e5e7eb" }}
        />
      </div>
      <div className="relative">
        <Building2 className="absolute left-3 top-3.5 w-4 h-4 text-gray-300" />
        <select
          value={form.business}
          onChange={(e) => setForm({ ...form, business: e.target.value })}
          className="w-full pl-9 pr-4 py-3 rounded-xl border text-sm outline-none transition-colors bg-white appearance-none"
          style={{ borderColor: "#e5e7eb", color: form.business ? "#111" : "#9ca3af" }}
        >
          <option value="">Business type…</option>
          <option>Law Firm</option>
          <option>Local Business</option>
          <option>E-Commerce</option>
          <option>Healthcare</option>
          <option>Real Estate</option>
          <option>Other</option>
        </select>
      </div>
      <textarea
        placeholder="What are your main SEO goals? (optional)"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        rows={3}
        className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors resize-none bg-white"
        style={{ borderColor: "#e5e7eb" }}
      />
 
      <button
        onClick={handleSubmit}
        disabled={status === "loading" || !form.name || !form.email}
        className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-50"
        style={{ background: "#534AB7" }}
      >
        {status === "loading" ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
        ) : (
          <><Send className="w-4 h-4" /> Book Free 30-Min Consultation</>
        )}
      </button>
 
      {status === "error" && (
        <p className="text-xs text-red-500 text-center">
          Something went wrong. Email us directly:{" "}
          <a href="mailto:contact@searchprex.com" className="underline">
            contact@searchprex.com
          </a>
        </p>
      )}
 
      {/* Trust pills */}
      <div className="flex flex-wrap justify-center gap-3 pt-1">
        {[
          { icon: Shield, text: "Free 30-min call" },
          { icon: Clock,  text: "Reply in 24hrs"  },
          { icon: Star,   text: "No commitment"   },
        ].map((item) => (
          <div key={item.text} className="flex items-center gap-1.5 text-xs text-gray-400">
            <item.icon className="w-3.5 h-3.5" style={{ color: "#1D9E75" }} />
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}
 
// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────
const TABS: { id: Tab; label: string; sub: string; Icon: React.ElementType }[] = [
  { id: "audit",   label: "Instant SEO audit",  sub: "Enter URL · see results", Icon: Radar    },
  { id: "roadmap", label: "SEO roadmap",         sub: "Your 90-day plan",        Icon: Map      },
  { id: "consult", label: "Book Consultation",   sub: "Talk to an expert",       Icon: Calendar },
];
 
export default function AITool() {
  const [active, setActive] = useState<Tab>("audit");
 
  return (
    <section id="ai-tool" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
 
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-5"
            style={{ background: "#EEEDFE", border: "1px solid #AFA9EC", color: "#3C3489" }}
          >
            <Zap className="w-3.5 h-3.5" />
            AI-powered · Instant results · No login needed
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3 tracking-tight">
            See exactly what's holding<br className="hidden sm:block" /> your website back
          </h2>
          <p className="text-gray-500">
            Free instant audit · Get your SEO roadmap · Or book a strategy call
          </p>
        </motion.div>
 
        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl p-6 shadow-xl"
          style={{ border: "2px solid #7F77DD", background: "white" }}
        >
          {/* Tab bar */}
          <div
            className="grid grid-cols-3 gap-2 p-1 rounded-xl mb-6"
            style={{ background: "#f5f5f7" }}
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className="relative rounded-xl py-3 px-2 text-center transition-all"
                style={
                  active === tab.id
                    ? { background: "white", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", border: "0.5px solid #ebebeb" }
                    : { background: "transparent" }
                }
              >
                <tab.Icon
                  className="w-4 h-4 mx-auto mb-1.5"
                  style={{ color: active === tab.id ? "#534AB7" : "#9ca3af" }}
                />
                <span
                  className="block text-xs font-semibold mb-0.5"
                  style={{ color: active === tab.id ? "#0a0f2e" : "#6b7280" }}
                >
                  {tab.label}
                </span>
                <span className="block text-xs" style={{ color: "#9ca3af" }}>
                  {tab.sub}
                </span>
              </button>
            ))}
          </div>
 
          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {active === "audit"   && <AuditTab   />}
              {active === "roadmap" && <RoadmapTab />}
              {active === "consult" && <ConsultTab />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
 
      </div>
    </section>
  );
}
 




