"use client";

import { useId, useState } from "react";

type Tab = { label: string; title: string; body: string };

export default function DocketHubPreview({ items }: { items: Tab[] }) {
  const [active, setActive] = useState(0);
  const id = useId().replace(/:/g, "");
  const current = items[active];
  if (!current) return null;

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div role="tablist" aria-label="Docket hub sections" className="flex gap-2 overflow-x-auto border-b border-slate-200 bg-slate-50 p-3">
        {items.map((item, index) => (
          <button
            key={item.label}
            id={`${id}-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls={`${id}-panel`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition ${active === index ? "bg-slate-950 text-white" : "text-slate-700 hover:bg-white"}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} className="min-h-36 p-6 sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">{current.label}</p>
        <h3 className="mt-2 text-xl font-black text-slate-950">{current.title}</h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700">{current.body}</p>
      </div>
    </div>
  );
}
