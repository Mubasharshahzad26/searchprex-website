"use client";

// components/EmotionalLeadForm.tsx
//
// The primary capture on the homepage: someone describing, in their own words,
// what is going wrong with their traffic or revenue.
//
// SUBMIT LOGIC IS LOAD-BEARING — DO NOT REPLACE IT WITH A TIMER. This form
// used to fake its own success: a setTimeout flipped state to "Message
// received. I'll review your issue personally" and nothing was ever sent
// anywhere. Every high-intent lead was silently discarded while the visitor
// was told the opposite. It now posts to /api/leads and reports failure
// honestly, keeping what the visitor typed.
//
// VISUAL LANGUAGE. The Semrush app shell supplies the LAYOUT — light ground,
// white card with a hairline border and a very soft shadow, and a right rail
// that frames this as opening a ticket rather than filling in a marketing
// form. The TYPE is SearchPrex's own, not Semrush's: h2 at text-3xl/4xl/5xl
// font-black tracking-tight, eyebrows at text-xs font-bold uppercase
// tracking-widest, body at text-lg. Borrowing Semrush's weight-600 headings
// made this section read as a different site's page dropped into this one.

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle2, MessageSquareText, Clock, ShieldCheck } from "lucide-react";

// What the visitor gets, stated next to the field rather than after it.
const assurances = [
  { icon: Clock, label: "Reply within 24 hours", detail: "From me, not an autoresponder" },
  { icon: MessageSquareText, label: "A concrete next step", detail: "Not a discovery-call funnel" },
  { icon: ShieldCheck, label: "No obligation", detail: "One client per city, per practice area" },
];

export default function EmotionalLeadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [issue, setIssue] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue.trim() || !email.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "",
          email,
          message: issue,
          source: "homepage-emotional-form",
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="tell-me-your-issue"
      className="border-y border-[#e6e8f0] bg-white py-20 sm:py-24"
      aria-labelledby="lead-form-heading"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-xl border border-[#e6e8f0] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)]"
        >
          <div className="grid lg:grid-cols-[1fr_380px]">
            {/* ── The request ── */}
            <div className="border-b border-[#eef0f6] p-7 sm:p-10 lg:border-b-0 lg:border-r">
              {/* Semrush's page-ending treatment, measured off their own
                  video: a very large uppercase headline at weight 600 with
                  heavy negative tracking, one short reassurance line beneath
                  it, and a pill CTA. Theirs reads "GET STARTED WITH SEMRUSH
                  TODAY / Try Semrush free for seven days. Cancel anytime." */}
              <h2
                id="lead-form-heading"
                className="text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl lg:text-5xl"
              >
                Tell me
                <br />
                what broke
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-[#566070]">
                No package to choose, no discovery call to sit through. Describe what is
                happening to your traffic or revenue, and I&apos;ll tell you what I&apos;d
                actually do about it — within 24 hours.
              </p>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 rounded-xl border border-[#1a7d59]/25 bg-[#1a7d59]/[0.06] p-6"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#196b4d]" />
                    <div>
                      <p className="text-sm font-bold text-[#0a0f2e]">Message received.</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#566070]">
                        I&apos;ll read this myself and come back with a concrete action plan —
                        not a calendar link.
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div>
                    <label
                      htmlFor="issue"
                      className="mb-2 block text-sm font-bold text-[#0a0f2e]"
                    >
                      What is happening to your business online?
                    </label>
                    <textarea
                      id="issue"
                      required
                      rows={4}
                      className="w-full resize-none rounded-xl border border-[#dfe3ec] bg-[#fbfcfe] px-4 py-3 text-sm leading-relaxed text-[#0a0f2e] transition-all placeholder:text-[#9aa3b2] focus:border-[#5b52c4] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#5b52c4]/10"
                      placeholder="e.g. 'We just dropped out of the local map pack entirely...' or 'My PPC costs in New York are bleeding us dry...'"
                      value={issue}
                      onChange={(e) => setIssue(e.target.value)}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-bold text-[#0a0f2e]"
                    >
                      Where should I send the solution?
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full rounded-xl border border-[#dfe3ec] bg-[#fbfcfe] px-4 py-3 text-sm text-[#0a0f2e] transition-all placeholder:text-[#9aa3b2] focus:border-[#5b52c4] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#5b52c4]/10"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {/* An honest failure: the visitor keeps everything they typed
                      and gets a route to me that does not depend on this form. */}
                  {status === "error" && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm"
                    >
                      <p className="font-semibold text-red-900">That didn&apos;t send.</p>
                      <p className="mt-1 leading-relaxed text-red-800">
                        Something went wrong on my end — your message is still in the box, so
                        try again in a moment. If it keeps failing, email me directly at{" "}
                        <a
                          href="mailto:contact@searchprex.com"
                          className="font-semibold underline"
                        >
                          contact@searchprex.com
                        </a>
                        .
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#5b52c4] px-8 py-3.5 text-sm font-bold text-white shadow-[0_2px_12px_rgba(91,82,196,0.25)] transition-all hover:-translate-y-0.5 hover:bg-[#4a42a8] disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Get my custom solution
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* ── What happens next ── */}
            <div className="bg-[#fafbfd] p-7 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-widest text-[#5f6a78]">
                What happens next
              </p>
              <div className="mt-6 space-y-6">
                {assurances.map((a) => {
                  const Icon = a.icon;
                  return (
                    <div key={a.label} className="flex items-start gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#5b52c4]/10">
                        <Icon className="h-4 w-4 text-[#5b52c4]" />
                      </span>
                      <div>
                        <p className="text-sm font-bold text-[#0a0f2e]">
                          {a.label}
                        </p>
                        <p className="mt-0.5 text-sm leading-snug text-[#566070]">
                          {a.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 border-t border-[#e6e8f0] pt-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[#5f6a78]">
                  Handled by
                </p>
                <p className="mt-2 text-sm font-bold text-[#0a0f2e]">Mubashar Shahzad</p>
                <p className="mt-0.5 text-sm text-[#566070]">
                  Founder — every account, personally
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
