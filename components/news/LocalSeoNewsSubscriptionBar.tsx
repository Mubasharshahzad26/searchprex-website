"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, X } from "lucide-react";

export default function LocalSeoNewsSubscriptionBar() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem("local-seo-news-bar-dismissed") === "1");
    } catch {
      // Keep the bar available when browser storage is disabled.
    }
  }, []);

  const dismiss = () => {
    try {
      sessionStorage.setItem("local-seo-news-bar-dismissed", "1");
    } catch {
      // Dismiss for this render even when browser storage is disabled.
    }
    setDismissed(true);
  };

  const subscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "local-seo-news-subscription", categories: ["Local SEO"] }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) {
        setError(data.error || "We could not subscribe you. Please try again.");
        return;
      }
      setMessage("You’re subscribed to Local SEO updates.");
      setEmail("");
    } catch {
      setError("Connection issue. Please try again.");
    } finally {
      setPending(false);
    }
  };

  if (dismissed) return null;

  return (
    <section aria-label="Subscribe to Local SEO updates" className="border-b border-slate-700 bg-[#2f3337]">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-1.5 sm:gap-4 sm:px-6 lg:px-8">
        <p className="shrink-0 text-[11px] font-bold leading-tight text-white sm:text-sm">Local SEO updates</p>
        {message ? (
          <p role="status" className="min-w-0 flex-1 text-xs font-semibold leading-tight text-white sm:text-sm">{message}</p>
        ) : (
          <form onSubmit={subscribe} className="flex min-w-0 flex-1 items-center gap-1.5 sm:flex-none sm:gap-2">
            <label className="sr-only" htmlFor="local-seo-news-subscribe-email">Email address</label>
            <input id="local-seo-news-subscribe-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" className="h-9 min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-2.5 text-xs text-slate-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15 sm:w-56 sm:flex-none sm:px-3 sm:text-sm" />
            <button type="submit" disabled={pending} className="inline-flex h-9 shrink-0 items-center justify-center gap-1 rounded-lg bg-white px-2.5 text-[11px] font-semibold text-slate-950 transition hover:bg-slate-100 disabled:opacity-60 sm:px-3 sm:text-xs">
              {pending ? "Joining…" : "Subscribe"}<ArrowRight className="h-3 w-3" aria-hidden="true" />
            </button>
          </form>
        )}
        <button type="button" onClick={dismiss} aria-label="Dismiss Local SEO updates bar" className="inline-flex h-9 w-8 shrink-0 items-center justify-center rounded-md text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      {error && <p role="alert" className="mx-auto max-w-7xl px-3 pb-1.5 text-xs text-red-200 sm:px-6 lg:px-8">{error}</p>}
    </section>
  );
}
