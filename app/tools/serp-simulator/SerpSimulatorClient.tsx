"use client";

// app/tools/serp-simulator/SerpSimulatorClient.tsx
//
// The SERP simulator. Everything runs in the browser: nothing typed here is
// sent anywhere, so there is no API cost and nothing to store.
//
// Truncation is measured in pixels with a canvas, because Google cuts titles
// and descriptions by rendered width, not by character count ("WWW" is three
// times wider than "iii"). Google publishes no limits; the ones below are the
// approximations the page explains, and the page says so.

import { useEffect, useMemo, useState } from "react";
import { Check, Copy, Link2, Monitor, RotateCcw, Smartphone, Star, AlertTriangle, CheckCircle2 } from "lucide-react";

type Device = "desktop" | "mobile";

const LIMITS = {
  desktop: { title: { font: "20px Arial", px: 600 }, desc: { font: "14px Arial", px: 990 } },
  mobile: { title: { font: "18px Arial", px: 650 }, desc: { font: "14px Arial", px: 680 } },
} as const;

const EXAMPLE = {
  title: "Free SERP Simulator & Google Snippet Generator | SearchPrex",
  desc: "Free SERP simulator: preview your title and meta description as Google shows them on desktop and mobile, with pixel-width checks and keyword bolding.",
  url: "https://www.searchprex.com/tools/serp-simulator",
  siteName: "SearchPrex",
  keyword: "serp simulator",
};

// Average Arial advance widths (em) — used before the canvas is available, so
// the server render and the first client render agree (no hydration mismatch).
const AVG_EM = 0.52;

let canvas: HTMLCanvasElement | null = null;
function measure(text: string, font: string, precise: boolean): number {
  const size = parseInt(font, 10);
  if (!precise || typeof document === "undefined") return text.length * size * AVG_EM;
  canvas ??= document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return text.length * size * AVG_EM;
  ctx.font = font;
  return ctx.measureText(text).width;
}

/** Cut at a word boundary so the text plus " ..." fits, the way Google does. */
function truncate(text: string, font: string, limit: number, precise: boolean) {
  const width = measure(text, font, precise);
  if (width <= limit) return { shown: text, cut: false, width };
  const words = text.split(" ");
  let shown = "";
  for (const w of words) {
    const next = shown ? `${shown} ${w}` : w;
    if (measure(`${next} ...`, font, precise) > limit) break;
    shown = next;
  }
  return { shown: `${shown.replace(/[\s,.;:|–—-]+$/, "")} ...`, cut: true, width };
}

function breadcrumb(raw: string) {
  try {
    const u = new URL(raw.startsWith("http") ? raw : `https://${raw}`);
    const host = u.hostname.replace(/^www\./, "");
    const parts = u.pathname.split("/").filter(Boolean).map(decodeURIComponent);
    return { host, full: u.origin, trail: parts };
  } catch {
    return { host: raw || "example.com", full: raw, trail: [] as string[] };
  }
}

/** Bold the keyword's words in the snippet, as Google bolds query terms. */
function Bolded({ text, keyword }: { text: string; keyword: string }) {
  const terms = keyword
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 1)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (!terms.length) return <>{text}</>;
  const re = new RegExp(`\\b(${terms.join("|")})\\b`, "gi");
  const parts = text.split(re);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <b key={i} className="font-bold text-[#5f6368]">
            {p}
          </b>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

function Meter({ label, used, limit, chars }: { label: string; used: number; limit: number; chars: number }) {
  const pct = Math.min(100, (used / limit) * 100);
  const over = used > limit;
  const tone = over ? "#b8123a" : pct > 85 ? "#b45309" : "#1a7d59";
  return (
    <div>
      <div className="flex items-baseline justify-between text-xs">
        <span className="font-bold text-[#0a0f2e]">{label}</span>
        <span style={{ color: tone }} className="font-semibold tabular-nums">
          {Math.round(used)} / {limit} px · {chars} chars
        </span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#e5e7eb]" role="presentation">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: tone }} />
      </div>
    </div>
  );
}

export default function SerpSimulatorClient() {
  const [title, setTitle] = useState(EXAMPLE.title);
  const [desc, setDesc] = useState(EXAMPLE.desc);
  const [url, setUrl] = useState(EXAMPLE.url);
  const [siteName, setSiteName] = useState(EXAMPLE.siteName);
  const [keyword, setKeyword] = useState(EXAMPLE.keyword);
  const [device, setDevice] = useState<Device>("desktop");
  const [showDate, setShowDate] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const [rating, setRating] = useState("4.8");
  const [reviews, setReviews] = useState("127");
  const [precise, setPrecise] = useState(false);
  const [copied, setCopied] = useState<"" | "html" | "link">("");

  // Canvas measurement is client-only; switch to it after mount. A shared link
  // (?t=&d=&u=&s=&k=) pre-fills the fields.
  useEffect(() => {
    setPrecise(true);
    const q = new URLSearchParams(window.location.search);
    if (q.get("t") !== null) setTitle(q.get("t") ?? "");
    if (q.get("d") !== null) setDesc(q.get("d") ?? "");
    if (q.get("u") !== null) setUrl(q.get("u") ?? "");
    if (q.get("s") !== null) setSiteName(q.get("s") ?? "");
    if (q.get("k") !== null) setKeyword(q.get("k") ?? "");
  }, []);

  const lim = LIMITS[device];
  const dateText = useMemo(
    () => new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    [],
  );
  const descWithDate = showDate ? `${dateText} — ${desc}` : desc;

  const t = useMemo(() => truncate(title.trim(), lim.title.font, lim.title.px, precise), [title, lim, precise]);
  const d = useMemo(() => truncate(descWithDate.trim(), lim.desc.font, lim.desc.px, precise), [descWithDate, lim, precise]);
  const dShown = showDate ? d.shown.replace(`${dateText} — `, "") : d.shown;
  const crumb = breadcrumb(url);
  const shownSite = siteName.trim() || crumb.host;

  // The desktop limits drive the checks: they are the tighter title limit.
  const dt = useMemo(() => truncate(title.trim(), LIMITS.desktop.title.font, LIMITS.desktop.title.px, precise), [title, precise]);
  const dd = useMemo(() => truncate(desc.trim(), LIMITS.desktop.desc.font, LIMITS.desktop.desc.px, precise), [desc, precise]);

  const checks = useMemo(() => {
    const out: { ok: boolean; text: string }[] = [];
    const kw = keyword.trim().toLowerCase();
    if (!title.trim()) out.push({ ok: false, text: "The title is empty. Google will write one from your page." });
    else if (dt.cut) out.push({ ok: false, text: "The title is wider than desktop results show. The end will be cut — put the words that matter first." });
    else if (title.trim().length < 30) out.push({ ok: false, text: "The title is short. There is room for the service, the place or a reason to click." });
    else out.push({ ok: true, text: "The title fits on desktop." });

    if (!desc.trim()) out.push({ ok: false, text: "No meta description. Google will pick text from the page instead." });
    else if (dd.cut) out.push({ ok: false, text: "The description is longer than Google usually shows. The end will be cut." });
    else if (desc.trim().length < 70) out.push({ ok: false, text: "The description is short. Google may fill the snippet from your page text instead." });
    else out.push({ ok: true, text: "The description fits on desktop." });

    if (kw) {
      out.push(
        title.toLowerCase().includes(kw)
          ? { ok: true, text: `The title contains "${keyword.trim()}".` }
          : { ok: false, text: `The title does not contain "${keyword.trim()}". Searchers scan for the words they typed.` },
      );
      const kwWords = kw.split(/\s+/).filter((w) => w.length > 1);
      const inDesc = kwWords.every((w) => desc.toLowerCase().includes(w));
      out.push(
        inDesc
          ? { ok: true, text: "The description contains your keyword, so Google can bold it." }
          : { ok: false, text: "The description does not contain every word of your keyword, so less of it will be bold." },
      );
    }

    const words = title.toLowerCase().match(/[a-z0-9']+/g) ?? [];
    const counts = words.reduce<Record<string, number>>((a, w) => ((a[w] = (a[w] ?? 0) + 1), a), {});
    const stuffed = Object.entries(counts).find(([w, n]) => n >= 3 && w.length > 2);
    if (stuffed) out.push({ ok: false, text: `"${stuffed[0]}" appears ${stuffed[1]} times in the title. Google may rewrite titles that repeat keywords.` });

    if (title.trim() && title === title.toUpperCase() && /[A-Z]/.test(title)) {
      out.push({ ok: false, text: "The title is all capitals, which reads as shouting and may be rewritten." });
    }
    return out;
  }, [title, desc, keyword, dt.cut, dd.cut]);

  const html = `<title>${title.replace(/</g, "&lt;")}</title>\n<meta name="description" content="${desc.replace(/"/g, "&quot;")}">`;

  const copy = async (what: "html" | "link") => {
    const value =
      what === "html"
        ? html
        : `${window.location.origin}${window.location.pathname}?${new URLSearchParams({ t: title, d: desc, u: url, s: siteName, k: keyword })}`;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(what);
      setTimeout(() => setCopied(""), 1800);
    } catch {
      /* clipboard blocked — nothing to do */
    }
  };

  const reset = () => {
    setTitle(EXAMPLE.title);
    setDesc(EXAMPLE.desc);
    setUrl(EXAMPLE.url);
    setSiteName(EXAMPLE.siteName);
    setKeyword(EXAMPLE.keyword);
    setShowDate(false);
    setShowStars(false);
  };

  const ratingNum = Math.max(0, Math.min(5, parseFloat(rating) || 0));
  const input =
    "mt-1 w-full rounded-lg border border-[#d1d5db] bg-white px-3 py-2 text-sm text-[#0a0f2e] focus:border-[#534AB7] focus:outline-none focus:ring-2 focus:ring-[#534AB7]/20";

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      {/* ── Inputs ── */}
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()} aria-label="Snippet details">
        <label className="block text-sm font-bold text-[#0a0f2e]">
          Title tag
          <input className={input} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Your page title" />
        </label>
        <label className="block text-sm font-bold text-[#0a0f2e]">
          Meta description
          <textarea className={`${input} min-h-[96px]`} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Your meta description" />
        </label>
        <label className="block text-sm font-bold text-[#0a0f2e]">
          Page URL
          <input className={input} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/page" inputMode="url" />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-bold text-[#0a0f2e]">
            Site name
            <input className={input} value={siteName} onChange={(e) => setSiteName(e.target.value)} placeholder="Your brand" />
          </label>
          <label className="block text-sm font-bold text-[#0a0f2e]">
            Keyword <span className="font-normal text-[#5b6472]">(to bold)</span>
            <input className={input} value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="what people search" />
          </label>
        </div>

        <fieldset className="rounded-xl border border-[#e5e7eb] p-4">
          <legend className="px-1 text-xs font-bold uppercase tracking-widest text-[#5b6472]">Extras</legend>
          <label className="flex items-center gap-2 text-sm text-[#374151]">
            <input type="checkbox" checked={showDate} onChange={(e) => setShowDate(e.target.checked)} />
            Show a date (it uses part of the description space)
          </label>
          <label className="mt-2 flex items-center gap-2 text-sm text-[#374151]">
            <input type="checkbox" checked={showStars} onChange={(e) => setShowStars(e.target.checked)} />
            Show review stars
          </label>
          {showStars ? (
            <div className="mt-3 grid grid-cols-2 gap-3">
              <label className="text-xs font-bold text-[#0a0f2e]">
                Rating
                <input className={input} value={rating} onChange={(e) => setRating(e.target.value)} inputMode="decimal" />
              </label>
              <label className="text-xs font-bold text-[#0a0f2e]">
                Reviews
                <input className={input} value={reviews} onChange={(e) => setReviews(e.target.value)} inputMode="numeric" />
              </label>
              <p className="col-span-2 text-xs leading-relaxed text-[#5b6472]">
                Google shows stars only for some page types (products, recipes, software and others), and not for reviews a
                business publishes about itself.
              </p>
            </div>
          ) : null}
        </fieldset>

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => copy("html")} className="inline-flex items-center gap-1.5 rounded-lg bg-[#534AB7] px-4 py-2 text-sm font-bold text-white hover:bg-[#433a9e]">
            {copied === "html" ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
            {copied === "html" ? "Copied" : "Copy HTML tags"}
          </button>
          <button type="button" onClick={() => copy("link")} className="inline-flex items-center gap-1.5 rounded-lg border border-[#d1d5db] bg-white px-4 py-2 text-sm font-bold text-[#0a0f2e] hover:border-[#534AB7]">
            {copied === "link" ? <Check className="h-4 w-4" aria-hidden /> : <Link2 className="h-4 w-4" aria-hidden />}
            {copied === "link" ? "Link copied" : "Copy share link"}
          </button>
          <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-[#5b6472] hover:text-[#0a0f2e]">
            <RotateCcw className="h-4 w-4" aria-hidden /> Example
          </button>
        </div>
      </form>

      {/* ── Preview + checks ── */}
      <div className="min-w-0">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-widest text-[#5b6472]">Google preview</p>
          <div className="inline-flex rounded-lg border border-[#e5e7eb] bg-[#f8f9fc] p-1" role="tablist" aria-label="Device">
            {(["desktop", "mobile"] as const).map((dv) => (
              <button
                key={dv}
                type="button"
                role="tab"
                aria-selected={device === dv}
                onClick={() => setDevice(dv)}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-bold ${
                  device === dv ? "bg-white text-[#0a0f2e] shadow-sm" : "text-[#5b6472]"
                }`}
              >
                {dv === "desktop" ? <Monitor className="h-3.5 w-3.5" aria-hidden /> : <Smartphone className="h-3.5 w-3.5" aria-hidden />}
                {dv === "desktop" ? "Desktop" : "Mobile"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 overflow-x-auto rounded-2xl border border-[#e5e7eb] bg-white p-5">
          <div
            className="mx-auto"
            style={{ width: device === "desktop" ? 600 : 360, maxWidth: "100%", fontFamily: "Arial, sans-serif" }}
            aria-live="polite"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[#dadce0] bg-[#f1f3f4] text-xs font-bold text-[#5f6368]">
                {shownSite.charAt(0).toUpperCase() || "?"}
              </span>
              <div className="min-w-0 leading-tight">
                <p className="truncate text-sm text-[#202124]">{shownSite}</p>
                <p className="truncate text-xs text-[#4d5156]">
                  {crumb.full.replace(/\/$/, "")}
                  {crumb.trail.length ? ` › ${crumb.trail.join(" › ")}` : ""}
                </p>
              </div>
            </div>
            <p
              className="mt-1.5 text-[#1a0dab] hover:underline"
              style={{
                fontSize: device === "desktop" ? 20 : 18,
                lineHeight: device === "desktop" ? "26px" : "24px",
                whiteSpace: device === "desktop" ? "nowrap" : "normal",
              }}
            >
              {t.shown || <span className="text-[#9aa0a6]">Your title</span>}
            </p>
            {showStars ? (
              <p className="mt-1 flex items-center gap-1 text-sm text-[#70757a]">
                <span className="text-[#202124]">{ratingNum.toFixed(1)}</span>
                <span className="flex" aria-label={`${ratingNum.toFixed(1)} out of 5 stars`}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5" aria-hidden fill={i < Math.round(ratingNum) ? "#fbbc04" : "none"} color="#fbbc04" />
                  ))}
                </span>
                <span>({reviews || "0"})</span>
              </p>
            ) : null}
            <p className="mt-1 text-[#4d5156]" style={{ fontSize: 14, lineHeight: "22px" }}>
              {showDate ? <span className="text-[#70757a]">{dateText} — </span> : null}
              {dShown ? <Bolded text={dShown} keyword={keyword} /> : <span className="text-[#9aa0a6]">Your description</span>}
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3 rounded-2xl border border-[#e5e7eb] bg-[#f8f9fc] p-5">
          <Meter label={`Title · ${device}`} used={t.width} limit={lim.title.px} chars={title.trim().length} />
          <Meter label={`Description · ${device}`} used={d.width} limit={lim.desc.px} chars={descWithDate.trim().length} />
          <p className="text-xs leading-relaxed text-[#5b6472]">
            Measured in pixels in Arial. Google publishes no fixed limits; these are close approximations, and Google may
            still rewrite your title or snippet.
          </p>
        </div>

        <ul className="mt-5 space-y-2" aria-label="Checks">
          {checks.map((c) => (
            <li key={c.text} className="flex items-start gap-2 text-sm leading-relaxed text-[#374151]">
              {c.ok ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1a7d59]" aria-hidden />
              ) : (
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#b45309]" aria-hidden />
              )}
              {c.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
