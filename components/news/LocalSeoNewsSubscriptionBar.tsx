"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

export default function LocalSeoNewsSubscriptionBar() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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
      setMessage("You’re on the list. Watch your inbox for Local SEO updates.");
      setEmail("");
    } catch {
      setError("Connection issue. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <section aria-label="Subscribe to Local SEO news" className="border-b border-slate-700 bg-[#2f3337]">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <p className="text-xs font-bold text-white sm:text-sm">Get the latest Local SEO updates</p>
        </div>
        {message ? (
          <p role="status" className="text-xs font-semibold text-white sm:text-sm">{message}</p>
        ) : (
          <form onSubmit={subscribe} className="flex w-full flex-wrap gap-2 sm:w-auto sm:flex-nowrap">
            <label className="sr-only" htmlFor="local-seo-news-subscribe-email">Email address</label>
            <input id="local-seo-news-subscribe-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15 sm:w-56 sm:flex-none sm:text-sm" />
            <button type="submit" disabled={pending} className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-slate-100 disabled:opacity-60 sm:px-4 sm:text-sm">
              {pending ? "Joining…" : "Subscribe"}<ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            {error && <p role="alert" className="w-full text-xs text-red-200">{error}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
