"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { color, radius } from "@/lib/design-tokens";

export default function EmotionalLeadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [issue, setIssue] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue || !email) return;
    setStatus("loading");
    // Simulate network delay
    setTimeout(() => setStatus("success"), 1500);
  };

  return (
    <section className="bg-slate-50 py-24 sm:py-32 border-y border-slate-200">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`bg-white p-8 sm:p-12 shadow-xl ring-1 ring-slate-900/5 ${radius.card}`}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
              Stop guessing. Just tell me your issue.
            </h2>
            <p className="mt-4 text-lg text-[#5b6472]">
              Don&apos;t know what package you need? You don&apos;t have to. Tell me exactly what is happening to your traffic or revenue right now, and I will give you the most suitable solution.
            </p>
          </div>

          {status === "success" ? (
            <div className="rounded-xl bg-[#e1f5ee] p-8 text-center ring-1 ring-[#3eb489]/30">
              <h3 className="text-xl font-bold text-[#196b4d] mb-2">Message received.</h3>
              <p className="text-[#1a7d59]">
                I&apos;ll review your issue personally and get back to you with a concrete action plan shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="issue" className="block text-sm font-bold text-[#0a0f2e] mb-2">
                  What is happening to your business online?
                </label>
                <textarea
                  id="issue"
                  required
                  rows={4}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-[#0a0f2e] placeholder:text-slate-400 focus:border-[#534AB7] focus:outline-none focus:ring-2 focus:ring-[#534AB7]/20 transition-all resize-none"
                  placeholder="e.g. 'We just dropped out of the local map pack entirely...' or 'My PPC costs in New York are bleeding us dry...'"
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-[#0a0f2e] mb-2">
                  Where should I send the solution?
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-[#0a0f2e] placeholder:text-slate-400 focus:border-[#534AB7] focus:outline-none focus:ring-2 focus:ring-[#534AB7]/20 transition-all"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#534AB7] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#534AB7]/20 transition-all hover:-translate-y-0.5 hover:bg-[#433b9b] disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {status === "loading" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>Get My Custom Solution <Send className="h-4 w-4" /></>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
