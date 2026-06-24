"use client";
 
import { motion } from "framer-motion";
import {
  Search,
  BarChart3,
  Link2,
  MapPin,
  FileSearch,
  TrendingUp,
  ArrowRight,
  Check,
  Sparkles
} from "lucide-react";
import Link from "next/link";
 
const features = [
  {
    icon: FileSearch,
    title: "Comprehensive Site Audits",
    description: "200+ technical SEO checks to identify and fix issues holding your site back.",
  },
  {
    icon: Search,
    title: "Keyword Research & Tracking",
    description: "Discover high-intent keywords and track your rankings in real-time.",
  },
  {
    icon: BarChart3,
    title: "Competitor Analysis",
    description: "See exactly what your competitors are doing and how to outrank them.",
  },
  {
    icon: Link2,
    title: "Backlink Monitoring",
    description: "Track your backlink profile and discover new link opportunities.",
  },
  {
    icon: MapPin,
    title: "Local SEO Tracking",
    description: "Monitor your local pack rankings across multiple locations.",
  },
  {
    icon: TrendingUp,
    title: "ROI Dashboard",
    description: "See the direct impact of SEO on your leads and revenue.",
  },
];
 
export default function NicheSEOPro() {
  return (
    <section className="relative overflow-hidden bg-[#0a0f2e] py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>
 
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#2563eb]/20 px-4 py-1.5">
              <Sparkles className="h-4 w-4 text-[#2563eb]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#2563eb]">
                Introducing NicheSEOPro
              </span>
            </div>
 
            <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              The SEO Tool Built for{" "}
              <span className="text-[#2563eb]">Niche Businesses</span>
            </h2>
 
            <p className="mt-6 text-lg text-white/70 leading-relaxed">
              NicheSEOPro is our proprietary SEO platform designed specifically for
              law firms, ecommerce stores, and local businesses. Unlike generic SEO tools,
              NicheSEOPro understands your industry and delivers actionable insights.
            </p>
 
            {/* Features Grid */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#2563eb]/20">
                    <feature.icon className="h-4 w-4 text-[#2563eb]" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{feature.title}</p>
                    <p className="mt-0.5 text-sm text-white/50">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
 
            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="https://nicheseopro.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[#1a3c8f]"
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="https://nicheseopro.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:border-white hover:bg-white hover:text-[#0a0f2e]"
              >
                Get Free Demo
              </Link>
            </div>
 
            {/* Trial Info */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/50">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-400" />
                14-Day Free Trial
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-400" />
                No Credit Card Required
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-400" />
                Cancel Anytime
              </span>
            </div>
          </motion.div>
 
          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#1a1f3e] p-4 shadow-2xl">
              {/* Browser Header */}
              <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
                <div className="ml-4 flex-1 rounded-lg bg-[#0a0f2e] px-4 py-2 text-xs text-white/50">
                  app.nicheseopro.com/dashboard
                </div>
              </div>
 
              {/* Dashboard Content */}
              <div className="space-y-4">
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-[#0a0f2e] p-4">
                    <p className="text-xs text-white/50">Organic Traffic</p>
                    <p className="mt-1 text-2xl font-bold text-white">24.5K</p>
                    <p className="text-xs text-green-400">+32% this month</p>
                  </div>
                  <div className="rounded-xl bg-[#0a0f2e] p-4">
                    <p className="text-xs text-white/50">Keywords Ranked</p>
                    <p className="mt-1 text-2xl font-bold text-white">847</p>
                    <p className="text-xs text-green-400">+56 new</p>
                  </div>
                  <div className="rounded-xl bg-[#0a0f2e] p-4">
                    <p className="text-xs text-white/50">Domain Authority</p>
                    <p className="mt-1 text-2xl font-bold text-white">58</p>
                    <p className="text-xs text-green-400">+4 points</p>
                  </div>
                </div>
 
                {/* Chart Placeholder */}
                <div className="rounded-xl bg-[#0a0f2e] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-medium text-white">Traffic Overview</p>
                    <span className="text-xs text-white/50">Last 30 days</span>
                  </div>
                  <div className="flex h-32 items-end gap-1">
                    {[40, 55, 45, 60, 50, 70, 65, 80, 75, 90, 85, 95].map(
                      (height, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t bg-[#2563eb]"
                          style={{ height: `${height}%` }}
                        />
                      )
                    )}
                  </div>
                </div>
 
                {/* Keyword Table */}
                <div className="rounded-xl bg-[#0a0f2e] p-4">
                  <p className="mb-3 text-sm font-medium text-white">Top Keywords</p>
                  <div className="space-y-2">
                    {[
                      { keyword: "family lawyer los angeles", pos: 2, change: "+3" },
                      { keyword: "divorce attorney near me", pos: 4, change: "+5" },
                      { keyword: "best injury lawyer CA", pos: 1, change: "0" },
                    ].map((item) => (
                      <div
                        key={item.keyword}
                        className="flex items-center justify-between rounded-lg bg-[#1a1f3e] px-3 py-2 text-xs"
                      >
                        <span className="text-white/70">{item.keyword}</span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-white">#{item.pos}</span>
                          <span className="text-green-400">{item.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
 
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 rounded-xl bg-[#2563eb] px-4 py-2 shadow-lg">
              <p className="text-xs font-bold text-white">Free 14-Day Trial</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}