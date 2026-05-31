"use client";
 
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { Check, ArrowRight, ArrowLeft, Shield, Clock, Star, Phone } from "lucide-react";
 
/* Toptal green accent */
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
 
type FormData = {
  businessType: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  monthlyBudget: string;
  timeline: string;
  currentChallenges: string;
  heardAboutUs: string;
};
 
const businessTypes = [
  { value: "law-firm", label: "Law Firm", description: "Family, personal injury, criminal" },
  { value: "ecommerce", label: "Ecommerce / Shopify", description: "Online retail & DTC brands" },
  { value: "local-service", label: "Local Service Provider", description: "Dentist, salon, restaurant" },
  { value: "home-services", label: "Home Services", description: "Contractor, plumber, HVAC" },
  { value: "small-business", label: "Small Business", description: "Local brick & mortar" },
  { value: "enterprise", label: "Mid-Size / Enterprise", description: "Multi-location or large-scale" },
];
 
const budgetOptions = [
  { value: "under-2k", label: "Under $2,000/mo" },
  { value: "2k-5k", label: "$2,000 - $5,000/mo" },
  { value: "5k-10k", label: "$5,000 - $10,000/mo" },
  { value: "10k-plus", label: "$10,000+/mo" },
  { value: "not-sure", label: "Not sure yet" },
];
 
const timelineOptions = [
  { value: "asap", label: "ASAP - Ready to start" },
  { value: "1-month", label: "Within 1 month" },
  { value: "1-3-months", label: "1-3 months" },
  { value: "exploring", label: "Just exploring" },
];
 
const challengeOptions = [
  { value: "low-traffic", label: "Low organic traffic" },
  { value: "poor-rankings", label: "Poor keyword rankings" },
  { value: "local-visibility", label: "Local visibility issues" },
  { value: "technical-issues", label: "Technical SEO problems" },
  { value: "content-strategy", label: "Need content strategy" },
  { value: "competitor-gap", label: "Competitors outranking us" },
];
 
const sourceOptions = [
  { value: "google", label: "Google Search" },
  { value: "referral", label: "Referral" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "twitter", label: "Twitter/X" },
  { value: "other", label: "Other" },
];
 
const benefits = [
  "Full technical SEO analysis",
  "Top keyword opportunities for your niche",
  "Competitor gap analysis",
  "Actionable recommendations - not generic advice",
  "Delivered in 48 hours, completely free",
];
 
const trustSignals = [
  { icon: Shield, text: "100% Confidential" },
  { icon: Clock, text: "48hr Turnaround" },
  { icon: Star, text: "No Obligation" },
];
 
export default function CTA() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
 
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm<FormData>({ mode: "onChange" });
 
  const selectedBusinessType = watch("businessType");
 
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await fetch("/api/send-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          website: data.website,
          business: data.businessType,
          phone: data.phone,
          budget: data.monthlyBudget,
          timeline: data.timeline,
          challenges: data.currentChallenges,
          source: data.heardAboutUs,
        }),
      });
    } catch (error) {
      console.error("Submit error:", error);
    }
    setIsSubmitting(false);
    setIsSubmitted(true);
  };
 
  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    if (step === 1) fieldsToValidate = ["businessType"];
    else if (step === 2) fieldsToValidate = ["name", "email", "phone", "website"];
    const isValid = await trigger(fieldsToValidate);
    if (isValid) setStep(step + 1);
  };
 
  const prevStep = () => { if (step > 1) setStep(step - 1); };
 
  return (
    <section id="cta" className="bg-[#0a0f2e] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
 
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24"
          >
            <span
              className="mb-6 inline-block rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest text-white"
              style={{ background: "rgba(62,180,137,0.18)" }}
            >
              Free SEO Audit
            </span>
            <h2 className="mb-6 text-4xl font-black leading-tight text-white sm:text-5xl">
              <span className="text-balance">Dominate Your Market in 2026</span>
            </h2>
            <p className="mb-8 text-lg text-white/70">
              Get a comprehensive SEO audit tailored to Google&apos;s 2026 core updates. We&apos;ll analyze your site&apos;s technical health, content quality, E-E-A-T signals, and competitor positions.
            </p>
 
            <ul className="mb-8 space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full" style={{ background: GREEN }}>
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-white/90">{benefit}</span>
                </li>
              ))}
            </ul>
 
            <div className="mb-8 flex flex-wrap gap-4">
              {trustSignals.map((signal) => (
                <div key={signal.text} className="flex items-center gap-2">
                  <signal.icon className="h-4 w-4" style={{ color: GREEN }} />
                  <span className="text-sm font-medium text-white/80">{signal.text}</span>
                </div>
              ))}
            </div>
 
            <div className="rounded-xl border p-4" style={{ borderColor: "rgba(62,180,137,0.3)", background: "rgba(62,180,137,0.1)" }}>
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: GREEN }} />
                  <span className="relative inline-flex h-3 w-3 rounded-full" style={{ background: GREEN }} />
                </span>
                <div>
                  <p className="text-sm font-bold" style={{ color: GREEN }}>Only 3 Audit Spots Remaining This Month</p>
                  <p className="text-xs text-white/60">Due to high demand, we limit audits to ensure quality</p>
                </div>
              </div>
            </div>
 
            <div className="mt-6 flex items-center gap-3">
              <Phone className="h-5 w-5 text-white/60" />
              <span className="text-sm text-white/60">
                Prefer to talk? Call us at{" "}
                <a href="tel:+923106526316" className="font-medium text-white underline">+92 310 652 6316</a>
              </span>
            </div>
          </motion.div>
 
          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl bg-white p-6 sm:p-8"
          >
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-[#0a0f2e]">Step {step} of 3</span>
                <span className="text-[#64748b]">{Math.round((step / 3) * 100)}% Complete</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#f1f3f9]">
                <motion.div
                  className="h-full"
                  style={{ background: GREEN }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
 
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-12 text-center"
                >
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: GREEN }}>
                    <Check className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-[#0a0f2e]">Audit Request Received!</h3>
                  <p className="mb-6 text-[#64748b]">
                    We&apos;ll deliver your comprehensive SEO audit within 48 hours. Check your email for confirmation.
                  </p>
                  <p className="text-sm text-[#64748b]">
                    Questions? Email us at{" "}
                    <a href="mailto:hello@searchprex.com" className="underline" style={{ color: GREEN_DARK }}>hello@searchprex.com</a>
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
 
                  {/* Step 1 */}
                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <h3 className="mb-2 text-xl font-bold text-[#0a0f2e]">What type of business are you?</h3>
                      <p className="mb-6 text-sm text-[#64748b]">Select the option that best describes your business</p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {businessTypes.map((type) => (
                          <label
                            key={type.value}
                            className="flex cursor-pointer flex-col rounded-xl border-2 p-4 transition-all"
                            style={
                              selectedBusinessType === type.value
                                ? { borderColor: GREEN, background: "rgba(62,180,137,0.06)" }
                                : { borderColor: "#e5e7eb" }
                            }
                          >
                            <input type="radio" value={type.value} {...register("businessType", { required: "Please select a business type" })} className="sr-only" />
                            <span className="font-bold text-[#0a0f2e]">{type.label}</span>
                            <span className="text-xs text-[#64748b]">{type.description}</span>
                          </label>
                        ))}
                      </div>
                      {errors.businessType && <p className="mt-2 text-sm text-red-500">{errors.businessType.message}</p>}
                    </motion.div>
                  )}
 
                  {/* Step 2 */}
                  {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <h3 className="mb-2 text-xl font-bold text-[#0a0f2e]">Your Contact Information</h3>
                      <p className="mb-6 text-sm text-[#64748b]">We&apos;ll use this to deliver your audit and schedule a review call</p>
 
                      <div>
                        <label className="mb-1 block text-sm font-medium text-[#0a0f2e]">Full Name *</label>
                        <input {...register("name", { required: "Name is required" })} type="text" placeholder="John Smith"
                          className="w-full rounded-lg border border-[#e5e7eb] px-4 py-3 text-[#0a0f2e] placeholder:text-[#94a3b8] focus:border-[#3eb489] focus:outline-none focus:ring-2 focus:ring-[#3eb489]/20" />
                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                      </div>
 
                      <div>
                        <label className="mb-1 block text-sm font-medium text-[#0a0f2e]">Work Email *</label>
                        <input {...register("email", { required: "Email is required", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" } })}
                          type="email" placeholder="john@company.com"
                          className="w-full rounded-lg border border-[#e5e7eb] px-4 py-3 text-[#0a0f2e] placeholder:text-[#94a3b8] focus:border-[#3eb489] focus:outline-none focus:ring-2 focus:ring-[#3eb489]/20" />
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                      </div>
 
                      <div>
                        <label className="mb-1 block text-sm font-medium text-[#0a0f2e]">Phone Number *</label>
                        <input {...register("phone", { required: "Phone is required", pattern: { value: /^[\d\s\-\(\)\+]+$/, message: "Invalid phone number" } })}
                          type="tel" placeholder="(555) 123-4567"
                          className="w-full rounded-lg border border-[#e5e7eb] px-4 py-3 text-[#0a0f2e] placeholder:text-[#94a3b8] focus:border-[#3eb489] focus:outline-none focus:ring-2 focus:ring-[#3eb489]/20" />
                        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
                      </div>
 
                      <div>
                        <label className="mb-1 block text-sm font-medium text-[#0a0f2e]">Website URL *</label>
                        <input {...register("website", { required: "Website URL is required" })} type="url" placeholder="https://yourwebsite.com"
                          className="w-full rounded-lg border border-[#e5e7eb] px-4 py-3 text-[#0a0f2e] placeholder:text-[#94a3b8] focus:border-[#3eb489] focus:outline-none focus:ring-2 focus:ring-[#3eb489]/20" />
                        {errors.website && <p className="mt-1 text-sm text-red-500">{errors.website.message}</p>}
                      </div>
                    </motion.div>
                  )}
 
                  {/* Step 3 */}
                  {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <h3 className="mb-2 text-xl font-bold text-[#0a0f2e]">Tell us about your SEO goals</h3>
                      <p className="mb-6 text-sm text-[#64748b]">This helps us tailor your audit to your specific needs</p>
 
                      <div>
                        <label className="mb-2 block text-sm font-medium text-[#0a0f2e]">Monthly SEO Budget</label>
                        <select {...register("monthlyBudget")} className="w-full rounded-lg border border-[#e5e7eb] px-4 py-3 text-[#0a0f2e] focus:border-[#3eb489] focus:outline-none focus:ring-2 focus:ring-[#3eb489]/20">
                          <option value="">Select a range</option>
                          {budgetOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                      </div>
 
                      <div>
                        <label className="mb-2 block text-sm font-medium text-[#0a0f2e]">When do you want to start?</label>
                        <select {...register("timeline")} className="w-full rounded-lg border border-[#e5e7eb] px-4 py-3 text-[#0a0f2e] focus:border-[#3eb489] focus:outline-none focus:ring-2 focus:ring-[#3eb489]/20">
                          <option value="">Select timeline</option>
                          {timelineOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                      </div>
 
                      <div>
                        <label className="mb-2 block text-sm font-medium text-[#0a0f2e]">Current SEO Challenges (Select all that apply)</label>
                        <div className="grid grid-cols-2 gap-2">
                          {challengeOptions.map((option) => (
                            <label key={option.value} className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#e5e7eb] p-2 text-sm hover:border-[#3eb489]/50">
                              <input type="checkbox" value={option.value} {...register("currentChallenges")} className="h-4 w-4 rounded border-[#e5e7eb] text-[#3eb489] focus:ring-[#3eb489]" />
                              <span className="text-[#374151]">{option.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
 
                      <div>
                        <label className="mb-2 block text-sm font-medium text-[#0a0f2e]">How did you hear about us?</label>
                        <select {...register("heardAboutUs")} className="w-full rounded-lg border border-[#e5e7eb] px-4 py-3 text-[#0a0f2e] focus:border-[#3eb489] focus:outline-none focus:ring-2 focus:ring-[#3eb489]/20">
                          <option value="">Select an option</option>
                          {sourceOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                      </div>
                    </motion.div>
                  )}
 
                  {/* Navigation */}
                  <div className="mt-8 flex gap-3">
                    {step > 1 && (
                      <button type="button" onClick={prevStep}
                        className="flex items-center justify-center gap-2 rounded-lg border-2 border-[#e5e7eb] px-6 py-3 text-sm font-bold text-[#374151] transition-all hover:border-[#0a0f2e] hover:text-[#0a0f2e]">
                        <ArrowLeft className="h-4 w-4" /> Back
                      </button>
                    )}
                    {step < 3 ? (
                      <button type="button" onClick={nextStep}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all"
                        style={{ background: GREEN }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = GREEN_DARK)}
                        onMouseLeave={(e) => (e.currentTarget.style.background = GREEN)}>
                        Continue <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button type="submit" disabled={isSubmitting}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all disabled:cursor-not-allowed disabled:opacity-70"
                        style={{ background: GREEN }}
                        onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.background = GREEN_DARK)}
                        onMouseLeave={(e) => (e.currentTarget.style.background = GREEN)}>
                        {isSubmitting ? (
                          <><svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Submitting...</>
                        ) : (
                          <>Get My Free Audit <ArrowRight className="h-4 w-4" /></>
                        )}
                      </button>
                    )}
                  </div>
 
                  <p className="mt-4 text-center text-xs text-[#64748b]">
                    By submitting, you agree to our{" "}
                    <a href="/privacy" className="underline">Privacy Policy</a>. We never share your information.
                  </p>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
 




























