"use client";
 
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowLeft, CheckCircle, Loader2, ShieldCheck,
  Globe, Building2, Target, Sparkles, Mail, Phone, User,
  Store, Briefcase, MapPin, Rocket, TrendingUp,
} from "lucide-react";
 
/* ── Brand system (matches ecommerce-seo + case-studies) ── */
const ACCENT = "#3eb489";
const ACCENT_DARK = "#2f9670";
const INK = "#191a1f";
const LINE = "#e6e7eb";
const PAPER = "#f7f7f8";
 
/* ── Form state type ── */
interface FormData {
  // Step 1: Site info
  websiteUrl: string;
  industry: string;
  monthlyTraffic: string;
 
  // Step 2: Business info
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
 
  // Step 3: Goals & setup
  primaryGoal: string;
  currentSeoStatus: string;
  cmsType: string;
  gscConnected: string;
  message: string;
}
 
const INDUSTRIES = [
  { value: "ecommerce", label: "Ecommerce / Online Store", icon: Store },
  { value: "law_firm", label: "Law Firm / Legal Services", icon: Briefcase },
  { value: "local_service", label: "Local Service Business", icon: MapPin },
  { value: "saas", label: "SaaS / Software", icon: Rocket },
  { value: "content", label: "Content / Publisher / Blog", icon: TrendingUp },
  { value: "other", label: "Other", icon: Building2 },
];
 
const TRAFFIC_RANGES = [
  { value: "under_1k", label: "Under 1,000 / month" },
  { value: "1k_10k", label: "1,000 – 10,000 / month" },
  { value: "10k_50k", label: "10,000 – 50,000 / month" },
  { value: "50k_plus", label: "50,000+ / month" },
  { value: "unsure", label: "Not sure" },
];
 
const PRIMARY_GOALS = [
  { value: "rankings", label: "Improve keyword rankings" },
  { value: "traffic", label: "Grow organic traffic" },
  { value: "conversions", label: "Increase leads / sales" },
  { value: "technical", label: "Fix technical SEO issues" },
  { value: "indexing", label: "Fix indexing problems at scale" },
  { value: "recovery", label: "Recover from Google algorithm update" },
];
 
const SEO_STATUS = [
  { value: "none", label: "No SEO yet — starting fresh" },
  { value: "diy", label: "Doing SEO myself / in-house" },
  { value: "agency", label: "Working with another agency" },
  { value: "past_agency", label: "Left previous agency, need better results" },
];
 
const CMS_TYPES = [
  { value: "wordpress", label: "WordPress / WooCommerce" },
  { value: "shopify", label: "Shopify" },
  { value: "webflow", label: "Webflow" },
  { value: "custom", label: "Custom / Headless (Next.js, etc.)" },
  { value: "other", label: "Other" },
];
 
type FormState = "idle" | "sending" | "sent" | "error";
 
export default function GrowthPlanClient() {
  const [step, setStep] = useState(1);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
 
  const [form, setForm] = useState<FormData>({
    websiteUrl: "",
    industry: "",
    monthlyTraffic: "",
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    primaryGoal: "",
    currentSeoStatus: "",
    cmsType: "",
    gscConnected: "",
    message: "",
  });
 
  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));
 
  /* ── Validation per step ── */
  const canProceed = (): boolean => {
    if (step === 1) {
      return !!(form.websiteUrl && form.industry);
    }
    if (step === 2) {
      return !!(
        form.fullName &&
        form.email &&
        form.email.includes("@") &&
        form.companyName
      );
    }
    if (step === 3) {
      return !!(form.primaryGoal && form.currentSeoStatus);
    }
    return true;
  };
 
  const submit = async () => {
    setFormState("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/growth-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
 
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
 
      setFormState("sent");
      setStep(4);
    } catch (err) {
      setFormState("error");
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
    }
  };
 
  const inputCls =
    "w-full px-4 py-3 rounded-lg border border-[#e6e7eb] outline-none focus:ring-2 focus:ring-[#3eb489] focus:border-transparent transition-all text-sm bg-white";
 
  const labelCls = "block text-sm font-semibold text-[#191a1f] mb-2";
 
  return (
    <main className="min-h-screen bg-white">
 
      {/* ━━━ HERO ━━━ */}
      <section className="border-b border-[#e6e7eb] pt-24 pb-8">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e6e7eb] px-4 py-1.5"
          >
            <Sparkles className="h-3.5 w-3.5" style={{ color: ACCENT }} />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#65676e]">
              Free · 24-hour turnaround · No commitment
            </span>
          </motion.div>
 
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-4 text-3xl font-bold leading-tight tracking-tight text-[#191a1f] sm:text-4xl md:text-5xl"
          >
            Get your SEO growth plan
          </motion.h1>
 
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mx-auto max-w-xl text-base leading-relaxed text-[#65676e] sm:text-lg"
          >
            Founder-reviewed audit, competitor benchmark, and 90-day roadmap — delivered in your inbox within 24 hours.
          </motion.p>
        </div>
      </section>
 
      {/* ━━━ WIZARD ━━━ */}
      <section className="py-12 sm:py-16" style={{ background: PAPER }}>
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
 
          {/* Progress indicator */}
          {step < 4 && (
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#65676e]">
                  Step {step} of 3
                </span>
                <span className="text-xs font-medium text-[#65676e]">
                  ~{4 - step} min remaining
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e6e7eb]">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: ACCENT }}
                />
              </div>
            </div>
          )}
 
          <div className="rounded-2xl border border-[#e6e7eb] bg-white p-6 shadow-sm sm:p-8">
            <AnimatePresence mode="wait">
 
              {/* ━━━ STEP 1: SITE INFO ━━━ */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="mb-6 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ background: "rgba(62,180,137,0.12)" }}
                    >
                      <Globe className="h-5 w-5" style={{ color: ACCENT_DARK }} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[#191a1f]">Tell us about your site</h2>
                      <p className="text-sm text-[#65676e]">Which website should we audit?</p>
                    </div>
                  </div>
 
                  <div className="space-y-5">
                    <div>
                      <label className={labelCls}>
                        Website URL <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="url"
                        placeholder="https://yourwebsite.com"
                        className={inputCls}
                        value={form.websiteUrl}
                        onChange={(e) => update("websiteUrl", e.target.value)}
                        autoFocus
                      />
                    </div>
 
                    <div>
                      <label className={labelCls}>
                        Industry / Business type <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {INDUSTRIES.map((ind) => {
                          const Icon = ind.icon;
                          const selected = form.industry === ind.value;
                          return (
                            <button
                              key={ind.value}
                              onClick={() => update("industry", ind.value)}
                              className={`flex flex-col items-center gap-1.5 rounded-lg border p-3 text-center text-xs font-medium transition-all ${
                                selected
                                  ? "border-[#3eb489] bg-[#3eb489]/5 text-[#191a1f]"
                                  : "border-[#e6e7eb] bg-white text-[#65676e] hover:border-[#191a1f] hover:text-[#191a1f]"
                              }`}
                              type="button"
                            >
                              <Icon
                                className="h-4 w-4"
                                style={{ color: selected ? ACCENT_DARK : "#65676e" }}
                              />
                              <span className="leading-tight">{ind.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
 
                    <div>
                      <label className={labelCls}>
                        Current monthly organic traffic (optional)
                      </label>
                      <select
                        className={inputCls}
                        value={form.monthlyTraffic}
                        onChange={(e) => update("monthlyTraffic", e.target.value)}
                      >
                        <option value="">Select range...</option>
                        {TRAFFIC_RANGES.map((t) => (
                          <option key={t.value} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
 
              {/* ━━━ STEP 2: BUSINESS INFO ━━━ */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="mb-6 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ background: "rgba(62,180,137,0.12)" }}
                    >
                      <Building2 className="h-5 w-5" style={{ color: ACCENT_DARK }} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[#191a1f]">How can we reach you?</h2>
                      <p className="text-sm text-[#65676e]">
                        We'll send your growth plan here — no marketing spam.
                      </p>
                    </div>
                  </div>
 
                  <div className="space-y-5">
                    <div>
                      <label className={labelCls}>
                        Your full name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#65676e]" />
                        <input
                          type="text"
                          placeholder="John Smith"
                          className={`${inputCls} pl-10`}
                          value={form.fullName}
                          onChange={(e) => update("fullName", e.target.value)}
                          autoFocus
                        />
                      </div>
                    </div>
 
                    <div>
                      <label className={labelCls}>
                        Company name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#65676e]" />
                        <input
                          type="text"
                          placeholder="Acme Inc."
                          className={`${inputCls} pl-10`}
                          value={form.companyName}
                          onChange={(e) => update("companyName", e.target.value)}
                        />
                      </div>
                    </div>
 
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className={labelCls}>
                          Email <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#65676e]" />
                          <input
                            type="email"
                            placeholder="you@company.com"
                            className={`${inputCls} pl-10`}
                            value={form.email}
                            onChange={(e) => update("email", e.target.value)}
                          />
                        </div>
                      </div>
 
                      <div>
                        <label className={labelCls}>Phone (optional)</label>
                        <div className="relative">
                          <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#65676e]" />
                          <input
                            type="tel"
                            placeholder="+1 555 000 0000"
                            className={`${inputCls} pl-10`}
                            value={form.phone}
                            onChange={(e) => update("phone", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
 
              {/* ━━━ STEP 3: GOALS & SETUP ━━━ */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="mb-6 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ background: "rgba(62,180,137,0.12)" }}
                    >
                      <Target className="h-5 w-5" style={{ color: ACCENT_DARK }} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[#191a1f]">Your goals & setup</h2>
                      <p className="text-sm text-[#65676e]">
                        Helps us tailor the roadmap to your priorities.
                      </p>
                    </div>
                  </div>
 
                  <div className="space-y-5">
                    <div>
                      <label className={labelCls}>
                        Primary goal <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-2">
                        {PRIMARY_GOALS.map((g) => (
                          <label
                            key={g.value}
                            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition-all ${
                              form.primaryGoal === g.value
                                ? "border-[#3eb489] bg-[#3eb489]/5"
                                : "border-[#e6e7eb] bg-white hover:border-[#191a1f]"
                            }`}
                          >
                            <input
                              type="radio"
                              name="primaryGoal"
                              value={g.value}
                              checked={form.primaryGoal === g.value}
                              onChange={(e) => update("primaryGoal", e.target.value)}
                              className="h-4 w-4 accent-[#3eb489]"
                            />
                            <span
                              className={
                                form.primaryGoal === g.value
                                  ? "font-semibold text-[#191a1f]"
                                  : "text-[#65676e]"
                              }
                            >
                              {g.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
 
                    <div>
                      <label className={labelCls}>
                        Current SEO status <span className="text-red-500">*</span>
                      </label>
                      <select
                        className={inputCls}
                        value={form.currentSeoStatus}
                        onChange={(e) => update("currentSeoStatus", e.target.value)}
                      >
                        <option value="">Select...</option>
                        {SEO_STATUS.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>
 
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className={labelCls}>Your CMS / platform</label>
                        <select
                          className={inputCls}
                          value={form.cmsType}
                          onChange={(e) => update("cmsType", e.target.value)}
                        >
                          <option value="">Select...</option>
                          {CMS_TYPES.map((c) => (
                            <option key={c.value} value={c.value}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                      </div>
 
                      <div>
                        <label className={labelCls}>Google Search Console?</label>
                        <select
                          className={inputCls}
                          value={form.gscConnected}
                          onChange={(e) => update("gscConnected", e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="yes">Yes — active</option>
                          <option value="no">No — need help setting up</option>
                          <option value="unsure">Not sure</option>
                        </select>
                      </div>
                    </div>
 
                    <div>
                      <label className={labelCls}>
                        Anything else? (optional)
                      </label>
                      <textarea
                        placeholder="Specific pain points, competitors you'd like us to benchmark, or context we should know..."
                        className={`${inputCls} min-h-[80px] resize-y`}
                        rows={3}
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                      />
                    </div>
 
                    {/* Security note about credentials */}
                    <div className="rounded-lg border border-[#e6e7eb] bg-[#f7f7f8] p-4">
                      <div className="flex items-start gap-2">
                        <ShieldCheck
                          className="mt-0.5 h-4 w-4 flex-shrink-0"
                          style={{ color: ACCENT_DARK }}
                        />
                        <div className="text-xs leading-relaxed text-[#65676e]">
                          <span className="font-semibold text-[#191a1f]">
                            About GSC & CMS access:
                          </span>{" "}
                          We'll walk you through secure credential setup on your onboarding call — never share passwords in this form. Your data stays private.
                        </div>
                      </div>
                    </div>
 
                    {formState === "error" && errorMsg && (
                      <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                        <p className="text-sm font-medium text-red-700">{errorMsg}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
 
              {/* ━━━ STEP 4: SUCCESS ━━━ */}
              {step === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="py-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                    className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ background: "rgba(62,180,137,0.15)" }}
                  >
                    <CheckCircle className="h-8 w-8" style={{ color: ACCENT_DARK }} />
                  </motion.div>
 
                  <h2 className="mb-3 text-2xl font-bold text-[#191a1f]">
                    Request received — thanks {form.fullName.split(" ")[0]}!
                  </h2>
                  <p className="mx-auto mb-8 max-w-md text-[15px] leading-relaxed text-[#65676e]">
                    Your growth plan is being prepared. Expect a founder-reviewed audit report at{" "}
                    <span className="font-semibold text-[#191a1f]">{form.email}</span> within 24 hours.
                  </p>
 
                  <div className="mx-auto max-w-md rounded-xl border border-[#e6e7eb] bg-[#f7f7f8] p-5 text-left">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#65676e]">
                      What happens next
                    </p>
                    <ul className="space-y-2.5 text-sm text-[#191a1f]">
                      <li className="flex items-start gap-2">
                        <span
                          className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                          style={{ background: ACCENT }}
                        >
                          1
                        </span>
                        <span>We audit your site + benchmark 2 competitors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span
                          className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                          style={{ background: ACCENT }}
                        >
                          2
                        </span>
                        <span>Growth plan delivered to your inbox — within 24 hours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span
                          className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                          style={{ background: ACCENT }}
                        >
                          3
                        </span>
                        <span>Optional 30-min call to walk through findings</span>
                      </li>
                    </ul>
                  </div>
 
                  <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                      href="/case-studies"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-[#e6e7eb] bg-white px-6 py-3 text-sm font-semibold text-[#191a1f] transition-all hover:border-[#191a1f]"
                    >
                      Meanwhile, see case studies
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a
                      href="tel:+923106526316"
                      className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
                      style={{ background: INK }}
                    >
                      <Phone className="h-4 w-4" />
                      Call us now
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
 
            {/* Navigation buttons (hidden on success) */}
            {step < 4 && (
              <div className="mt-8 flex items-center justify-between border-t border-[#e6e7eb] pt-6">
                {step > 1 ? (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#65676e] transition-colors hover:text-[#191a1f]"
                    type="button"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                ) : (
                  <span />
                )}
 
                {step < 3 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    disabled={!canProceed()}
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                    style={{ background: INK }}
                    type="button"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={submit}
                    disabled={!canProceed() || formState === "sending"}
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                    style={{ background: INK }}
                    type="button"
                  >
                    {formState === "sending" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Get my growth plan
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
 
          {/* Trust bar below wizard */}
          {step < 4 && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#65676e]">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" style={{ color: ACCENT }} />
                No credit card required
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" style={{ color: ACCENT }} />
                24-hour delivery
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" style={{ color: ACCENT }} />
                Founder-reviewed
              </span>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
 