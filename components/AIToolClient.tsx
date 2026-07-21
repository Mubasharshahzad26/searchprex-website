"use client";
 
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radar, Map, Calendar, Globe, Zap, CheckCircle, AlertTriangle,
  XCircle, ArrowRight, ChevronRight, Loader2, Send, Shield, Clock,
  Star, User, Mail, Building2,
} from "lucide-react";
 
/* ════════════ CONFIG ════════════ */
// FormSubmit.co — submissions land in this inbox. No API key needed.
// First real submission triggers a one-time activation email — click the link once.
const FORM_ENDPOINT = "https://formsubmit.co/ajax/mubasharshahzad726@gmail.com";
const AUDIT_CTA_HREF = "/free-audit"; // all "book a call / fix issues" buttons point here
 
/* ════════════ TYPES ════════════ */
type Tab = "audit" | "roadmap" | "consult";
type AuditPhase = "idle" | "scanning" | "done";
type RoadmapStep = "questions" | "result";
 
interface AuditItem {
  label: string;
  score: number;
  status: "good" | "warn" | "bad";
  detail: string;
}
 
/* ════════════ CONSTANTS ════════════ */
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
  { label: "Page Speed",    score: 44, status: "bad",  detail: "LCP > 4s — Core Web Vitals failing" },
  { label: "Title Tags",    score: 68, status: "warn", detail: "Missing on 3 pages" },
  { label: "Schema Markup", score: 22, status: "bad",  detail: "No LocalBusiness / LegalService schema" },
  { label: "Backlinks",     score: 81, status: "good", detail: "48 referring domains — healthy" },
  { label: "Mobile UX",     score: 73, status: "warn", detail: "Minor CLS on homepage" },
  { label: "Content Depth", score: 57, status: "warn", detail: "8 pages under 600 words" },
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
  "Rank on Page 1 locally",
  "More local leads & calls",
  "More e-commerce sales",
  "Build brand authority",
];
 
const BUDGETS = [
  { label: "< $500 / mo",   value: "low"  },
  { label: "$500–$1,500",   value: "mid"  },
  { label: "$1,500–$3,000", value: "high" },
  { label: "$3,000+",       value: "pro"  },
];
 
const ROADMAP = [
  { week: "Week 1–2",  title: "Technical SEO audit & fixes",       detail: "Core Web Vitals, crawlability, schema markup",           done: true  },
  { week: "Week 3–4",  title: "Keyword strategy & site structure", detail: "Persona-based keyword mapping, content gap analysis",    done: true  },
  { week: "Week 5–8",  title: "Content & on-page optimisation",    detail: "E-E-A-T aligned articles, title rewrites, interlinking", done: false },
  { week: "Week 9–12", title: "Link building & authority growth",  detail: "Local citations, guest posts, PR links",                 done: false },
  { week: "Week 12+",  title: "Monthly reporting & iteration",     detail: "GA4 + GSC dashboards, strategy adjustments",             done: false },
];
 
/* ════════════ HELPERS ════════════ */
const scoreColor = (s: AuditItem["status"]) => (s === "good" ? "#1D9E75" : s === "warn" ? "#BA7517" : "#E24B4A");
const scoreBg    = (s: AuditItem["status"]) => (s === "good" ? "#E1F5EE" : s === "warn" ? "#FAEEDA" : "#FCEBEB");
const scoreText  = (s: AuditItem["status"]) => (s === "good" ? "#085041" : s === "warn" ? "#633806" : "#791F1F");
 
function ScoreIcon({ status }: { status: AuditItem["status"] }) {
  if (status === "good") return <CheckCircle className="h-3.5 w-3.5" style={{ color: "#1D9E75" }} />;
  if (status === "warn") return <AlertTriangle className="h-3.5 w-3.5" style={{ color: "#BA7517" }} />;
  return <XCircle className="h-3.5 w-3.5" style={{ color: "#E24B4A" }} />;
}
 
/* Reusable CTA button that links to /free-audit */
function AuditCTA({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href={AUDIT_CTA_HREF}
      className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-all hover:opacity-90"
      style={{ background: "#534AB7" }}
    >
      {children}
    </Link>
  );
}
 
/* ════════════ TAB 1 — INSTANT AUDIT ════════════ */
function AuditTab() {
  const [url, setUrl] = useState("");
  const [phase, setPhase] = useState<AuditPhase>("idle");
  const [msgIdx, setMsg] = useState(0);
  const [err, setErr] = useState(false);
 
  function startAudit() {
    if (!url.trim()) { setErr(true); return; }
    setErr(false);
    setPhase("scanning");
    setMsg(0);
    let i = 0;
    const iv = setInterval(() => {
      i++;
      if (i < SCAN_MESSAGES.length) setMsg(i);
      else { clearInterval(iv); setPhase("done"); }
    }, 550);
  }
 
  return (
    <div>
      {/* URL bar */}
      <div
        className="mb-3 flex items-center gap-2 rounded-xl bg-white px-3 py-2 transition-all"
        style={{
          border: `1.5px solid ${err ? "#E24B4A" : "#7F77DD"}`,
          boxShadow: err ? "0 0 0 3px rgba(226,75,74,.1)" : "none",
        }}
      >
        <Globe className="h-4 w-4 flex-shrink-0" style={{ color: "#534AB7" }} />
        <input
          type="text"
          value={url}
          onChange={(e) => { setUrl(e.target.value); setErr(false); }}
          onKeyDown={(e) => e.key === "Enter" && startAudit()}
          placeholder="Enter your website URL — e.g. yoursite.com"
          className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
        />
        <button
          onClick={startAudit}
          disabled={phase === "scanning"}
          className="flex flex-shrink-0 items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold text-white transition-all disabled:opacity-60"
          style={{ background: "#534AB7" }}
        >
          {phase === "scanning"
            ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Scanning…</>
            : <><Radar className="h-3.5 w-3.5" /> Analyse now</>}
        </button>
      </div>
      {err && <p className="-mt-1 mb-3 pl-1 text-xs text-red-500">Please enter a website URL first</p>}
 
      {/* Scanning */}
      <AnimatePresence>
        {phase === "scanning" && (
          <motion.div
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mb-4 flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: "#EEEDFE" }}
          >
            <Loader2 className="h-4 w-4 flex-shrink-0 animate-spin" style={{ color: "#534AB7" }} />
            <span className="text-sm font-medium" style={{ color: "#3C3489" }}>{SCAN_MESSAGES[msgIdx]}</span>
          </motion.div>
        )}
      </AnimatePresence>
 
      {/* Results */}
      <AnimatePresence>
        {phase === "done" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {/* score ring */}
            <div className="flex items-center gap-4 rounded-xl border p-4" style={{ background: "#EEEDFE", borderColor: "#AFA9EC" }}>
              <div
                className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full text-2xl font-black text-white shadow-sm"
                style={{ background: OVERALL_SCORE >= 75 ? "#1D9E75" : OVERALL_SCORE >= 50 ? "#BA7517" : "#E24B4A" }}
              >
                {OVERALL_SCORE}
              </div>
              <div className="flex-1">
                <p className="mb-0.5 text-sm font-black text-gray-900">Overall SEO Score</p>
                <p className="mb-2 text-xs leading-relaxed text-gray-500">
                  Several critical issues found — schema markup and page speed need urgent attention.
                </p>
                <Link href={AUDIT_CTA_HREF} className="flex items-center gap-1 text-xs font-semibold transition-all hover:gap-2" style={{ color: "#534AB7" }}>
                  Get the full audit & fix plan <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
 
            {/* grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {MOCK_AUDIT.map((item) => (
                <div key={item.label} className="rounded-xl border p-3" style={{ borderColor: "#eee", background: "#fafafa" }}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <ScoreIcon status={item.status} />
                      <span className="text-xs font-semibold text-gray-700">{item.label}</span>
                    </div>
                    <span className="rounded-full px-1.5 py-0.5 text-xs font-bold" style={{ background: scoreBg(item.status), color: scoreText(item.status) }}>
                      {item.score}
                    </span>
                  </div>
                  <div className="mb-1.5 h-1.5 overflow-hidden rounded-full bg-gray-200">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${item.score}%` }} transition={{ duration: 0.8, ease: "easeOut" }} className="h-full rounded-full" style={{ background: scoreColor(item.status) }} />
                  </div>
                  <p className="text-xs leading-snug text-gray-400">{item.detail}</p>
                </div>
              ))}
            </div>
 
            <AuditCTA><Calendar className="h-4 w-4" /> Fix These Issues — Get Free Audit</AuditCTA>
 
            <button onClick={() => { setPhase("idle"); setUrl(""); }} className="w-full text-xs text-gray-400 transition-colors hover:text-gray-600">
              ← Scan a different URL
            </button>
          </motion.div>
        )}
      </AnimatePresence>
 
      {phase === "idle" && (
        <p className="mt-1 text-center text-xs text-gray-400">Instant results · No login · Powered by SearchPrex AI</p>
      )}
    </div>
  );
}
 
/* ════════════ TAB 2 — ROADMAP ════════════ */
function RoadmapTab() {
  const [step, setStep] = useState<RoadmapStep>("questions");
  const [industry, setIndustry] = useState("");
  const [goal, setGoal] = useState("");
  const [budget, setBudget] = useState("");
  const ready = industry && goal && budget;
 
  return (
    <AnimatePresence mode="wait">
      {step === "questions" ? (
        <motion.div key="q" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-5">
          {/* Industry */}
          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-gray-700">What industry are you in?</p>
            <div className="grid grid-cols-3 gap-2">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind.label}
                  onClick={() => setIndustry(ind.label)}
                  className="flex flex-col items-center gap-1.5 rounded-xl border py-3 text-center text-xs font-medium transition-all"
                  style={industry === ind.label
                    ? { background: ind.bg, borderColor: ind.color, color: ind.color, borderWidth: "1.5px" }
                    : { background: "white", borderColor: "#e5e7eb", color: "#64748b" }}
                >
                  <span className="text-lg">{ind.icon}</span>
                  {ind.label}
                </button>
              ))}
            </div>
          </div>
 
          {/* Goal — FIXED heading */}
          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-gray-700">What is your SEO goal?</p>
            <div className="flex flex-col gap-2">
              {GOALS.map((g) => (
                <button
                  key={g}
                  onClick={() => setGoal(g)}
                  className="flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all"
                  style={goal === g
                    ? { background: "#EEEDFE", borderColor: "#7F77DD", color: "#3C3489", borderWidth: "1.5px" }
                    : { background: "white", borderColor: "#e5e7eb", color: "#374151" }}
                >
                  <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2"
                    style={goal === g ? { borderColor: "#534AB7", background: "#534AB7" } : { borderColor: "#cbd5e1" }}>
                    {goal === g && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </div>
                  {g}
                </button>
              ))}
            </div>
          </div>
 
          {/* Budget */}
          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-gray-700">Monthly SEO budget?</p>
            <div className="grid grid-cols-2 gap-2">
              {BUDGETS.map((b) => (
                <button
                  key={b.value}
                  onClick={() => setBudget(b.value)}
                  className="rounded-xl border py-3 text-xs font-semibold transition-all"
                  style={budget === b.value
                    ? { background: "#EEEDFE", borderColor: "#7F77DD", color: "#3C3489", borderWidth: "1.5px" }
                    : { background: "white", borderColor: "#e5e7eb", color: "#64748b" }}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
 
          <button
            onClick={() => ready && setStep("result")}
            disabled={!ready}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-all"
            style={{ background: ready ? "#534AB7" : "#c4c1e8", cursor: ready ? "pointer" : "not-allowed" }}
          >
            <Zap className="h-4 w-4" /> Generate My 90-Day SEO Roadmap <ChevronRight className="h-4 w-4" />
          </button>
        </motion.div>
      ) : (
        <motion.div key="r" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4">
          <div className="rounded-xl px-3 py-2.5 text-xs font-medium" style={{ background: "#EEEDFE", border: "1px solid #AFA9EC", color: "#3C3489" }}>
            ✨ Personalised for: <strong>{industry}</strong> · {goal} · {BUDGETS.find((b) => b.value === budget)?.label}
          </div>
 
          <div className="relative pl-7">
            <div className="absolute bottom-2 left-3 top-2 w-px bg-gray-200" />
            {ROADMAP.map((item, i) => (
              <motion.div key={item.week} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="relative mb-5 last:mb-0">
                <div className="absolute -left-4 top-1 h-3 w-3 flex-shrink-0 rounded-full border-2"
                  style={item.done ? { background: "#534AB7", borderColor: "#534AB7" } : { background: "white", borderColor: "#cbd5e1" }} />
                <p className="mb-0.5 text-xs font-bold" style={{ color: "#534AB7" }}>{item.week}</p>
                <p className="mb-0.5 text-sm font-semibold text-gray-800">{item.title}</p>
                <p className="text-xs leading-relaxed text-gray-500">{item.detail}</p>
              </motion.div>
            ))}
          </div>
 
          <button onClick={() => setStep("questions")} className="text-xs text-gray-400 transition-colors hover:text-gray-600">← Change answers</button>
          <AuditCTA><Calendar className="h-4 w-4" /> Let&apos;s Execute This — Get Free Audit</AuditCTA>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
 
/* ════════════ TAB 3 — CONSULTATION (FormSubmit) ════════════ */
function ConsultTab() {
  const [form, setForm] = useState({ name: "", email: "", website: "", business: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
 
  async function handleSubmit() {
    if (!form.name || !form.email) return;
    setStatus("loading");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          website: form.website || "—",
          business: form.business || "—",
          message: form.message || "—",
          _subject: "New Consultation Request — SearchPrex",
          _template: "table",
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }
 
  if (status === "sent") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="py-8 text-center">
        <div className="mb-4 text-5xl">🎉</div>
        <h3 className="mb-2 text-lg font-black text-gray-900">Request received!</h3>
        <p className="text-sm leading-relaxed text-gray-500">
          We&apos;ll reply to <strong>{form.email}</strong> within 24 hours to confirm your free 30-min strategy call.
        </p>
      </motion.div>
    );
  }
 
  const inputCls = "w-full rounded-xl border bg-white py-3 pl-9 pr-4 text-sm outline-none transition-colors focus:border-[#534AB7]";
 
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="relative">
          <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-300" />
          <input type="text" placeholder="Your full name *" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} style={{ borderColor: "#e5e7eb" }} />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-300" />
          <input type="email" placeholder="Email address *" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} style={{ borderColor: "#e5e7eb" }} />
        </div>
      </div>
      <div className="relative">
        <Globe className="absolute left-3 top-3.5 h-4 w-4 text-gray-300" />
        <input type="text" placeholder="Website URL" value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })} className={inputCls} style={{ borderColor: "#e5e7eb" }} />
      </div>
      <div className="relative">
        <Building2 className="absolute left-3 top-3.5 h-4 w-4 text-gray-300" />
        <select value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })}
          className={`${inputCls} appearance-none`} style={{ borderColor: "#e5e7eb", color: form.business ? "#111" : "#9ca3af" }}>
          <option value="">Business type…</option>
          <option>Law Firm</option>
          <option>Local Business</option>
          <option>E-Commerce</option>
          <option>Healthcare</option>
          <option>Real Estate</option>
          <option>Other</option>
        </select>
      </div>
      <textarea placeholder="What are your main SEO goals? (optional)" value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })} rows={3}
        className="w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[#534AB7]" style={{ borderColor: "#e5e7eb" }} />
 
      <button
        onClick={handleSubmit}
        disabled={status === "loading" || !form.name || !form.email}
        className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-50"
        style={{ background: "#534AB7" }}
      >
        {status === "loading"
          ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
          : <><Send className="h-4 w-4" /> Book Free 30-Min Consultation</>}
      </button>
 
      {status === "error" && (
        <p className="text-center text-xs text-red-500">
          Something went wrong. Email us directly:{" "}
          <a href="mailto:mubasharshahzad726@gmail.com" className="underline">mubasharshahzad726@gmail.com</a>
        </p>
      )}
 
      <div className="flex flex-wrap justify-center gap-3 pt-1">
        {[{ icon: Shield, text: "Free 30-min call" }, { icon: Clock, text: "Reply in 24hrs" }, { icon: Star, text: "No commitment" }].map((item) => (
          <div key={item.text} className="flex items-center gap-1.5 text-xs text-gray-400">
            <item.icon className="h-3.5 w-3.5" style={{ color: "#1D9E75" }} /> {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}
 
/* ════════════ MAIN ════════════ */
const TABS: { id: Tab; label: string; sub: string; Icon: React.ElementType }[] = [
  { id: "audit",   label: "Instant SEO audit", sub: "Enter URL · see results", Icon: Radar },
  { id: "roadmap", label: "SEO roadmap",        sub: "Your 90-day plan",        Icon: Map },
  { id: "consult", label: "Book Consultation",  sub: "Talk to an expert",       Icon: Calendar },
];
 
export default function AIToolClient() {
  const [active, setActive] = useState<Tab>("audit");
 
  return (
    <section id="ai-tool" className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold" style={{ background: "#EEEDFE", border: "1px solid #AFA9EC", color: "#3C3489" }}>
            <Zap className="h-3.5 w-3.5" /> AI-powered · Instant results · No login needed
          </div>
          <h2 className="mb-3 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
            See exactly what&apos;s holding<br className="hidden sm:block" /> your website back
          </h2>
          <p className="text-gray-500">Free instant audit · Get your SEO roadmap · Or book a strategy call</p>
        </motion.div>
 
        {/* Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-2xl p-6 shadow-xl" style={{ border: "2px solid #7F77DD", background: "white" }}>
          {/* Tabs */}
          <div className="mb-6 grid grid-cols-3 gap-2 rounded-xl p-1" style={{ background: "#f5f5f7" }}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className="relative rounded-xl px-2 py-3 text-center transition-all"
                style={active === tab.id ? { background: "white", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", border: "0.5px solid #ebebeb" } : { background: "transparent" }}
              >
                <tab.Icon className="mx-auto mb-1.5 h-4 w-4" style={{ color: active === tab.id ? "#534AB7" : "#9ca3af" }} />
                <span className="mb-0.5 block text-xs font-semibold" style={{ color: active === tab.id ? "#0a0f2e" : "#6b7280" }}>{tab.label}</span>
                <span className="block text-xs" style={{ color: "#9ca3af" }}>{tab.sub}</span>
              </button>
            ))}
          </div>
 
          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              {active === "audit" && <AuditTab />}
              {active === "roadmap" && <RoadmapTab />}
              {active === "consult" && <ConsultTab />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
 
















