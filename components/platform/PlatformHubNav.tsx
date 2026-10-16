"use client";

import Link from "next/link";
import { Newspaper, MessageSquare, Wrench, GraduationCap, ShieldCheck, ExternalLink } from "lucide-react";

export type PlatformPillarId = "news" | "discussions" | "solutions" | "learning";

const PILLARS: Array<{
  id: PlatformPillarId;
  number: string;
  label: string;
  sublabel: string;
  href: string;
  Icon: any;
}> = [
  {
    id: "news",
    number: "01",
    label: "Industry News",
    sublabel: "SEO · Law · Ecommerce · Shopify · WP · AI · USA",
    href: "/resources/news",
    Icon: Newspaper,
  },
  {
    id: "discussions",
    number: "02",
    label: "Discussion Forum",
    sublabel: "Practitioner Q&A + US City & State Boards",
    href: "/resources/discussions",
    Icon: MessageSquare,
  },
  {
    id: "solutions",
    number: "03",
    label: "Issues & Solutions",
    sublabel: "Diagnostics, Error Fixes & Recovery Playbooks",
    href: "/resources/solutions",
    Icon: Wrench,
  },
  {
    id: "learning",
    number: "04",
    label: "Learning Hub",
    sublabel: "Masterclasses for SEO, Law, Shopify & WP",
    href: "/resources/learning-hub",
    Icon: GraduationCap,
  },
];

export default function PlatformHubNav({ active }: { active: PlatformPillarId }) {
  return (
    <div className="border-b border-[#e2e5eb] bg-[#f7f8fa]">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 text-[11px] text-[#6c727f]">
          <span className="font-semibold uppercase tracking-wider text-[#303440]">
            SearchPrex Intelligence &amp; Community Platform
          </span>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://nicheseopro.com/authority-checker"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#171a22] hover:text-[#534AB7]"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-[#2f9670]" />
              Free DA Checker
              <ExternalLink className="h-2.5 w-2.5 text-[#9aa0a6]" />
            </a>
            <span className="text-[#d5d9e0]">•</span>
            <Link href="/free-audit" className="font-semibold text-[#171a22] hover:underline">
              Get Free 48-Hr SEO Audit →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map(({ id, number, label, sublabel, href, Icon }) => {
            const isActive = active === id;
            return (
              <Link
                key={id}
                href={href}
                className={`group flex items-start gap-3 rounded-xl border p-3 transition-all ${
                  isActive
                    ? "border-[#171a22] bg-[#171a22] text-white shadow-sm"
                    : "border-[#e2e5eb] bg-white text-[#171a22] hover:border-[#b7bcc6] hover:shadow-xs"
                }`}
              >
                <span
                  className={`mt-0.5 grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg border text-xs font-bold ${
                    isActive
                      ? "border-white/20 bg-white/10 text-white"
                      : "border-[#e2e5eb] bg-[#f7f8fa] text-[#303440] group-hover:border-[#c5cad3]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="text-xs font-bold tracking-tight sm:text-[13px]">{label}</span>
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-semibold tabular-nums ${
                        isActive ? "bg-white/15 text-white/90" : "bg-[#f0f2f5] text-[#6c727f]"
                      }`}
                    >
                      {number}
                    </span>
                  </div>
                  <p
                    className={`mt-0.5 truncate text-[11px] ${
                      isActive ? "text-white/75" : "text-[#6c727f]"
                    }`}
                  >
                    {sublabel}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
