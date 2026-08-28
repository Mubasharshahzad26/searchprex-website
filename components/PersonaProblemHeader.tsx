"use client";

import { motion } from "framer-motion";
import { Store, MapPin, Scale, ArrowDown, AlertTriangle } from "lucide-react";
import { color } from "@/lib/design-tokens";

interface PersonaProblemProps {
  audience: string;
  painPoint: string;
  children: React.ReactNode;
  iconName: "Store" | "MapPin" | "Scale" | "AlertTriangle";
  accentColor: string;
}

const ICONS = {
  Store,
  MapPin,
  Scale,
  AlertTriangle
};

export default function PersonaProblemHeader({ audience, painPoint, children, iconName, accentColor }: PersonaProblemProps) {
  const Icon = ICONS[iconName];
  
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center pt-24 pb-12">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl shadow-sm" style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}30` }}>
          <Icon className="h-7 w-7" style={{ color: accentColor }} />
        </div>
        <p className="mb-4 text-xs font-black uppercase tracking-widest" style={{ color: accentColor }}>
          {audience}
        </p>
        <h2 className="text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl lg:text-5xl mb-6 leading-[1.15]">
          {painPoint}
        </h2>
        <div className="text-lg text-[#5b6472] leading-relaxed max-w-3xl mx-auto">
          {children}
        </div>
        <div className="mt-8 flex justify-center">
          <ArrowDown className="h-6 w-6 animate-bounce" style={{ color: accentColor }} />
        </div>
      </motion.div>
    </div>
  );
}
