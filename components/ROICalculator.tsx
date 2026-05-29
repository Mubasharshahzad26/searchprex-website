"use client";
 
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TrendingDown, ArrowRight, Calculator } from "lucide-react";
 
interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}
 
function Slider({ label, value, min, max, step, display, onChange }: SliderProps) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <label className="text-[11px] font-bold uppercase tracking-widest text-[#94a3b8]">{label}</label>
        <span className="rounded-lg bg-[#f5f3ff] px-2.5 py-1 text-sm font-black text-[#534AB7]">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        className="sp-roi-slider w-full"
      />
    </div>
  );
}
 
export default function ROICalculator() {
  const [ppc, setPpc] = useState(3000);
  const [cpc, setCpc] = useState(45);
  const [cvr, setCvr] = useState(3);
  const [acv, setAcv] = useState(2000);
 
  const calc = useMemo(() => {
    const clicks = Math.round(ppc / cpc);
    const leads = Math.round(clicks * (cvr / 100));
    const rev = leads * acv;
    const cac = leads > 0 ? Math.round(ppc / leads) : 0;
    const annual = ppc * 12;
    return { clicks, leads, rev, cac, annual };
  }, [ppc, cpc, cvr, acv]);
 
  const fmt = (n: number) => "$" + n.toLocaleString();
 
  return (
    <section className="relative overflow-hidden bg-white py-20">
      <style>{`
        .sp-roi-slider { -webkit-appearance:none; appearance:none; height:4px; border-radius:2px; background:#e2e8f0; outline:none; }
        .sp-roi-slider::-webkit-slider-thumb { -webkit-appearance:none; width:20px; height:20px; border-radius:50%; background:#534AB7; cursor:pointer; box-shadow:0 2px 8px rgba(83,74,183,.4); transition:transform .15s; }
        .sp-roi-slider::-webkit-slider-thumb:hover { transform:scale(1.15); }
        .sp-roi-slider::-moz-range-thumb { width:20px; height:20px; border:none; border-radius:50%; background:#534AB7; cursor:pointer; box-shadow:0 2px 8px rgba(83,74,183,.4); }
      `}</style>
 
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-[#f5f3ff] px-4 py-1.5">
            <Calculator className="h-3.5 w-3.5 text-[#534AB7]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#534AB7]">ROI Simulator</span>
          </div>
          <h2 className="text-4xl font-black tracking-tight text-[#0a0f2e] sm:text-5xl">
            How much are you <span className="text-[#534AB7]">burning</span>
            <br />on rented clicks?
          </h2>
        </div>
 
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left — Sliders */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-[#e2e8f0] bg-white p-8 shadow-sm"
          >
            <Slider label="Monthly PPC Budget" value={ppc} min={500} max={20000} step={500} display={fmt(ppc)} onChange={setPpc} />
            <Slider label="Average Cost Per Click" value={cpc} min={5} max={200} step={5} display={fmt(cpc)} onChange={setCpc} />
            <Slider label="Lead Conversion Rate" value={cvr} min={0.5} max={15} step={0.5} display={cvr + "%"} onChange={setCvr} />
            <Slider label="Average Client Value" value={acv} min={100} max={25000} step={100} display={fmt(acv)} onChange={setAcv} />
          </motion.div>
 
          {/* Right — Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl border-2 border-[#534AB7]/15 bg-[#f8fafc] p-8 shadow-lg shadow-[#534AB7]/5"
          >
            {/* Big result */}
            <div className="mb-6 rounded-2xl border border-[#fecaca] bg-[#fef2f2] p-6">
              <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#b91c1c]">
                <TrendingDown className="h-3.5 w-3.5" />
                Annual PPC Spend (Zero Equity Built)
              </div>
              <div className="text-5xl font-black leading-none text-[#dc2626]">{fmt(calc.annual)}</div>
              <div className="mt-2 text-sm text-[#991b1b]">Burned on rented clicks per year</div>
            </div>
 
            {/* Breakdown */}
            <div className="space-y-3">
              {[
                { l: "Clicks purchased / month", v: calc.clicks.toLocaleString() },
                { l: "Leads generated / month", v: calc.leads.toLocaleString() },
                { l: "Revenue generated / month", v: fmt(calc.rev) },
                { l: "Cost per acquired client", v: calc.leads > 0 ? fmt(calc.cac) : "N/A" },
              ].map((row) => (
                <div key={row.l} className="flex items-center justify-between border-b border-[#e2e8f0] pb-2.5">
                  <span className="text-sm text-[#64748b]">{row.l}</span>
                  <span className="text-sm font-black text-[#0a0f2e]">{row.v}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-1">
                <span className="text-sm font-bold text-[#534AB7]">SearchPrex replaces this with</span>
                <span className="text-sm font-black text-[#534AB7]">{fmt(calc.annual)}/yr organic equity</span>
              </div>
            </div>
 
            <Link
              href="/free-audit"
              className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#534AB7] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#534AB7]/25 transition-all hover:bg-[#3C3489] hover:-translate-y-0.5"
            >
              Start Replacing Paid Traffic
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}