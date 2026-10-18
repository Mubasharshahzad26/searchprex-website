"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageSquare, X, ArrowRight, ShieldCheck } from "lucide-react";

export default function ChatWithFounderWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans print:hidden">
      {isOpen ? (
        <div className="w-[330px] sm:w-[360px] rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl animate-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 rounded-full overflow-hidden border-2 border-neutral-950 shrink-0">
                <Image
                  src="/images/mubashar-sharif.jpg"
                  alt="Mubashar Sharif — Founder of SearchPrex"
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-black text-neutral-950">Mubashar Sharif</h4>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Online &middot; Founder &amp; Lead Strategist</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-slate-400 hover:text-neutral-950 hover:bg-slate-100 transition"
              aria-label="Close chat dialog"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body Note */}
          <div className="py-3 text-xs text-slate-700 leading-relaxed">
            <p className="font-semibold text-neutral-950 mb-1">
              Have a question about your firm&apos;s local market or 7-Day Free Trial?
            </p>
            <p className="text-slate-600">
              I personally review every law firm inquiry and reply directly—no junior reps.
            </p>
            <div className="mt-2.5 rounded-lg bg-slate-50 border border-slate-200 p-2 text-[11px] font-bold text-neutral-900 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-950 shrink-0" />
              <span>Ranked #1 on Google in Ohio for &ldquo;Law Firm SEO Cleveland Ohio&rdquo;</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            <a
              href="https://wa.me/923059158010?text=Hi%20Mubashar,%20I'm%20a%20US%20managing%20partner%20interested%20in%20Law%20Firm%20SEO%20and%20the%207-Day%20Free%20Trial."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-between rounded-xl bg-neutral-950 hover:bg-neutral-800 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition"
            >
              <span>Chat on WhatsApp Directly</span>
              <ArrowRight className="h-3.5 w-3.5 text-white" />
            </a>

            <a
              href="#7-day-trial"
              onClick={() => setIsOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white hover:bg-slate-50 px-4 py-2 text-xs font-semibold text-neutral-900 transition"
            >
              <span>Claim 7-Day Free Trial on Page</span>
            </a>
          </div>

          {/* Footer Subtext */}
          <p className="mt-3 text-[10px] text-center text-slate-400">
            USA Hours: Mon–Fri 8:00 AM – 6:00 PM EST / CST / PST
          </p>
        </div>
      ) : (
        /* Floating Pill Button */
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-3 rounded-full border border-slate-300 bg-white p-2 pr-4 shadow-xl hover:shadow-2xl hover:border-neutral-950 transition-all cursor-pointer"
          aria-label="Chat with Mubashar Sharif"
        >
          <div className="relative h-10 w-10 rounded-full overflow-hidden border border-neutral-950 shrink-0">
            <Image
              src="/images/mubashar-sharif.jpg"
              alt="Mubashar Sharif"
              fill
              sizes="40px"
              className="object-cover"
            />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-black text-neutral-950 leading-tight flex items-center gap-1.5">
              <span>Chat with Mubashar</span>
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-950" />
            </p>
            <p className="text-[10px] text-slate-500 font-medium">Founder &middot; Live Strategy</p>
          </div>
          <div className="sm:hidden">
            <MessageSquare className="h-4 w-4 text-neutral-950" />
          </div>
        </button>
      )}
    </div>
  );
}
